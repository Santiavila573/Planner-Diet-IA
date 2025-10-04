import OpenAI from 'openai';
import { NutritionFormData, PlanResponse } from '../types';

if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error("La variable de entorno VITE_OPENAI_API_KEY no está configurada.");
}

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const mealSchema = {
    type: "object",
    properties: {
        description: { type: "string", description: 'Descripción del plato.' },
        preparation: { type: "string", description: 'Sugerencias simples de preparación.' },
    },
    required: ["description", "preparation"],
    additionalProperties: false,
};

const foodGlossaryItemSchema = {
    type: "object",
    properties: {
        food: { type: "string", description: 'Nombre del alimento o ingrediente.' },
        amount: { type: "string", description: 'Cantidad o porción (ej. "100g", "1 taza").' },
        protein: { type: "number", description: 'Gramos de proteína.' },
        carbohydrates: { type: "number", description: 'Gramos de carbohidratos.' },
        fats: { type: "number", description: 'Gramos de grasas.' },
        calories: { type: "number", description: 'Total de kilocalorías.' },
    },
    required: ["food", "amount", "protein", "carbohydrates", "fats", "calories"],
    additionalProperties: false,
};

const dailyTotalsSchema = {
    type: "object",
    properties: {
        protein: { type: "number", description: 'Suma total de gramos de proteína para el día.' },
        carbohydrates: { type: "number", description: 'Suma total de gramos de carbohidratos para el día.' },
        fats: { type: "number", description: 'Suma total de gramos de grasas para el día.' },
        calories: { type: "number", description: 'Suma total de kilocalorías para el día.' },
    },
    required: ["protein", "carbohydrates", "fats", "calories"],
    additionalProperties: false,
};

const weeklyPlanSchema = {
    type: "array",
    description: "El plan de comidas detallado para los 7 días de la semana.",
    items: {
        type: "object",
        properties: {
            day: { type: "string", description: 'El día de la semana (ej. "Lunes").' },
            breakfast: mealSchema,
            lunch: mealSchema,
            dinner: mealSchema,
            snacks: mealSchema,
            foodGlossary: {
                type: "array",
                description: 'Lista de alimentos principales del día con su desglose nutricional.',
                items: foodGlossaryItemSchema,
            },
            dailyTotals: {
                ...dailyTotalsSchema,
                description: 'Resumen de los totales nutricionales para el día.',
            },
        },
        required: ["day", "breakfast", "lunch", "dinner", "snacks", "foodGlossary", "dailyTotals"],
        additionalProperties: false,
    },
};

const planResponseSchema = {
    type: "object",
    properties: {
        weeklyPlan: weeklyPlanSchema,
        sleepRecommendation: {
            type: "string",
            description: "Una recomendación personalizada y concisa sobre la cantidad de horas de sueño, basada en los objetivos y el perfil del usuario."
        }
    },
    required: ["weeklyPlan", "sleepRecommendation"],
    additionalProperties: false,
};


export const generateMealPlan = async (
    formData: NutritionFormData,
    onProgressUpdate: (message: string) => void
): Promise<PlanResponse> => {
    const { age, weight, height, gender, activityLevel, goal, portionSize, preferences, sleepHours } = formData;

    const prompt = `
        Basado en el siguiente perfil de usuario, genera un plan de nutrición detallado y equilibrado para 7 días en español:
        - Edad: ${age} años
        - Peso: ${weight} kg
        - Altura: ${height} cm
        - Género: ${gender}
        - Nivel de actividad: ${activityLevel}
        - Horas de sueño actuales por noche: ${sleepHours} horas
        - Objetivo: ${goal}
        - Tamaño de porción deseado: ${portionSize}
        - Preferencias o restricciones alimentarias: ${preferences || 'Ninguna'}

        Para tu respuesta, proporciona lo siguiente:
        1.  **Plan Semanal**: Un plan de 7 días. Para cada día, incluye sugerencias de comidas (desayuno, almuerzo, cena, snacks) con descripción y preparación, un glosario nutricional detallado (alimento, cantidad, macros, calorías) y los totales diarios de macros y calorías.
        2.  **Recomendación de Sueño**: Basado en todos los datos del usuario, especialmente su objetivo, proporciona una recomendación concisa (1-2 frases) sobre la cantidad ideal de horas de sueño que debería aspirar a tener y por qué es importante para su meta.

        Es crucial que la respuesta siga estrictamente el formato JSON definido en el schema. Las comidas deben ser creativas y apetitosas. Considera las horas de sueño actuales como un factor para la recuperación y energía al crear el plan.
    `;

    console.log('Prompt sent to AI:', prompt);

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // or gpt-4o for better performance
            messages: [
                {
                    role: "system",
                    content: "Eres un asistente de nutrición IA. Tu única función es generar un plan de comidas respondiendo con un JSON válido que se adhiere estrictamente al schema proporcionado. No incluyas texto adicional, explicaciones ni formato markdown fuera de la estructura JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: { type: "json_schema", json_schema: { name: "plan_response", schema: planResponseSchema, strict: true } },
            temperature: 0.7,
            stream: true,
        });

        let fullText = '';
        let daysFound = 0;
        const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

        for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
                fullText += content;

                const newDaysFound = (fullText.match(/"day":/g) || []).length;
                if (newDaysFound > daysFound && newDaysFound <= 7) {
                    daysFound = newDaysFound;
                    onProgressUpdate(`Generando el plan para ${weekDays[daysFound - 1]}...`);
                }
            }
        }

        console.log('Full AI response:', fullText);
        onProgressUpdate('Finalizando y validando el plan...');
        const result = JSON.parse(fullText) as PlanResponse;
        console.log('Parsed result:', result);

        if (!result.weeklyPlan || !Array.isArray(result.weeklyPlan) || result.weeklyPlan.length !== 7 || !result.sleepRecommendation) {
            console.log('Validation failed. weeklyPlan:', result.weeklyPlan, 'isArray:', Array.isArray(result.weeklyPlan), 'length:', result.weeklyPlan?.length, 'sleepRecommendation:', result.sleepRecommendation);
            throw new Error("La respuesta de la IA no tiene el formato de plan semanal esperado.");
        }

        return result;

    } catch (error) {
        console.error("Error al generar el plan de comidas:", error);
        throw new Error("No se pudo generar el plan de comidas. Por favor, revisa tu solicitud e inténtalo de nuevo.");
    }
};
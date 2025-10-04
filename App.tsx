import React, { useState, useCallback, useEffect } from 'react';
import { NutritionFormData, WeeklyPlan, PlanResponse } from './types';
import NutritionForm from './components/NutritionForm';
import MealPlanDisplay from './components/MealPlanDisplay';
import { generateMealPlan } from './services/openaiService';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
    const [formData, setFormData] = useState<NutritionFormData>({
        age: 30,
        weight: 70,
        height: 175,
        sleepHours: 8,
        gender: 'Masculino',
        activityLevel: 'Moderado',
        goal: 'Mantener peso',
        portionSize: 'Mediana',
        preferences: ''
    });

    const [mealPlan, setMealPlan] = useState<WeeklyPlan | null>(null);
    const [sleepRecommendation, setSleepRecommendation] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [loadingMessage, setLoadingMessage] = useState<string>('Generando tu plan personalizado...');

    useEffect(() => {
        try {
            const savedData = localStorage.getItem('savedMealPlan');
            if (savedData) {
                const { plan, recommendation } = JSON.parse(savedData);
                if (plan && Array.isArray(plan)) {
                    setMealPlan(plan);
                }
                if(recommendation) {
                    setSleepRecommendation(recommendation);
                }
            }
        } catch (err) {
            console.error("Error al cargar el plan guardado:", err);
            localStorage.removeItem('savedMealPlan');
        }
    }, []);

    const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }, [formErrors]);

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        const { age, weight, height, sleepHours } = formData;

        if (!age || age <= 0 || age > 120) {
            newErrors.age = 'Por favor, introduce una edad válida (1-120).';
        }
        if (!weight || weight <= 1 || weight > 500) {
            newErrors.weight = 'Por favor, introduce un peso válido (1-500 kg).';
        }
        if (!height || height <= 50 || height > 300) {
            newErrors.height = 'Por favor, introduce una altura válida (50-300 cm).';
        }
        if (!sleepHours || sleepHours < 1 || sleepHours > 24) {
            newErrors.sleepHours = 'Por favor, introduce un número de horas válido (1-24).';
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        
        setIsLoading(true);
        setError(null);
        setMealPlan(null);
        setSleepRecommendation(null);
        setLoadingMessage('Iniciando la generación de tu plan...');

        try {
            const response: PlanResponse = await generateMealPlan(formData, (progressMessage) => {
                setLoadingMessage(progressMessage);
            });
            setMealPlan(response.weeklyPlan);
            setSleepRecommendation(response.sleepRecommendation);
        } catch (err) {
            console.error(err);
            setError('Hubo un error al generar el plan de nutrición. Por favor, inténtelo de nuevo más tarde.');
        } finally {
            setIsLoading(false);
        }
    }, [formData]);
    
    const handleSavePlan = useCallback(() => {
        if (mealPlan) {
            try {
                const dataToSave = {
                    plan: mealPlan,
                    recommendation: sleepRecommendation,
                };
                localStorage.setItem('savedMealPlan', JSON.stringify(dataToSave));
                alert('¡Plan de nutrición guardado con éxito!');
            } catch (err) {
                console.error("Error al guardar el plan:", err);
                setError('No se pudo guardar el plan. El almacenamiento local podría estar lleno.');
            }
        }
    }, [mealPlan, sleepRecommendation]);

    const WelcomeMessage: React.FC = () => (
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg border border-green-800">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">Bienvenido a NutriGenius</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
                Completa el formulario con tus datos personales y objetivos para que nuestra inteligencia artificial genere un plan de comidas semanal, delicioso y equilibrado, exclusivamente para ti.
            </p>
        </div>
    );

    console.log('App component rendered');
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
            <header className="bg-gray-800 shadow-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center max-w-screen-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 mr-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 14.19L6 11.3l1.42-1.42 4.77 4.77 6.2-6.2L19.8 10l-7.61 6.19z" clipRule="evenodd" fillRule="evenodd"/>
                        <path d="M12.01 2.01c5.52.0 9.99 4.47 9.99 9.99s-4.47 9.99-9.99 9.99-9.99-4.47-9.99-9.99S6.49 2.01 12.01 2.01M12.01 0C5.38 0 0 5.38 0 12.01s5.38 12.01 12.01 12.01 12.01-5.38 12.01-12.01S18.64 0 12.01 0z" opacity="0.3"/>
                        <path d="M11.23,4.52 C10.15,5.82 9.78,7.63 10.22,9.25 C10.66,10.87 11.87,12.11 13.49,12.56 C15.11,13.01 16.89,12.68 18.15,11.66 C19.41,10.64 20,9 19.48,7.52 C18.96,6.04 17.5,4.78 15.89,4.22 C14.28,3.66 12.31,3.22 11.23,4.52z"/>
                    </svg>

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 tracking-tight">
                        NutriGenius
                    </h1>
                </div>
            </header>

            <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-screen-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <NutritionForm
                            formData={formData}
                            onFormChange={handleFormChange}
                            onFormSubmit={handleFormSubmit}
                            isLoading={isLoading}
                            errors={formErrors}
                        />
                    </div>
                    <div className="lg:col-span-8">
                        {isLoading && <LoadingSpinner message={loadingMessage} />}
                        {error && <ErrorMessage message={error} />}
                        {mealPlan && <MealPlanDisplay plan={mealPlan} onSavePlan={handleSavePlan} sleepRecommendation={sleepRecommendation} />}
                        {!isLoading && !error && !mealPlan && <WelcomeMessage />}
                    </div>
                </div>
            </main>

            <footer className="text-center py-4 text-gray-400 text-sm mt-8">
                <p>Generado con IA de Google. Creado con React y Tailwind CSS.</p>
            </footer>
        </div>
    );
};

export default App;
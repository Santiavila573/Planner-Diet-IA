
export interface NutritionFormData {
  age: number;
  weight: number;
  height: number;
  sleepHours: number;
  gender: 'Masculino' | 'Femenino' | 'Otro';
  activityLevel: 'Sedentario' | 'Ligero' | 'Moderado' | 'Activo' | 'Muy Activo';
  goal: 'Perder peso' | 'Mantener peso' | 'Ganar músculo';
  portionSize: 'Pequeña' | 'Mediana' | 'Grande';
  preferences: string;
}

export interface Meal {
  description: string;
  preparation: string;
}

export interface FoodGlossaryItem {
  food: string;
  amount: string;
  protein: number;
  carbohydrates: number;
  fats: number;
  calories: number;
}

export interface DailyTotals {
  protein: number;
  carbohydrates: number;
  fats: number;
  calories: number;
}

export interface DailyPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal;
  foodGlossary: FoodGlossaryItem[];
  dailyTotals: DailyTotals;
}

export type WeeklyPlan = DailyPlan[];

export interface PlanResponse {
  weeklyPlan: WeeklyPlan;
  sleepRecommendation: string;
}

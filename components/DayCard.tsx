import React from 'react';
import { DailyPlan, Meal } from '../types';

interface DayCardProps {
    dailyPlan: DailyPlan;
}

const MealSection: React.FC<{ title: string; meal: Meal; icon: JSX.Element }> = ({ title, meal, icon }) => (
    <div>
        <div className="flex items-center mb-2">
            <div className="flex-shrink-0 h-6 w-6 text-green-400">{icon}</div>
            <h4 className="ml-3 text-md font-semibold text-gray-200">{title}</h4>
        </div>
        <div className="pl-9">
            <p className="text-sm text-gray-300 font-medium">{meal.description}</p>
            <p className="mt-1 text-xs text-gray-400 italic">
                <span className="font-semibold">Preparación:</span> {meal.preparation}
            </p>
        </div>
    </div>
);

const TotalsStat: React.FC<{ label: string; value: number; unit: string; color: string; icon: JSX.Element }> = ({ label, value, unit, color, icon }) => (
    <div className={`bg-gray-800 p-2 rounded-lg flex items-center`}>
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 ${color} bg-opacity-20`}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-bold text-gray-100">{value} <span className="font-normal text-xs">{unit}</span></p>
            <p className="text-xs text-gray-400">{label}</p>
        </div>
    </div>
);


const DayCard: React.FC<DayCardProps> = ({ dailyPlan }) => {
    const { dailyTotals, foodGlossary } = dailyPlan;
    return (
        <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-700 overflow-hidden flex flex-col">
            <div className="bg-green-600 p-4">
                <h3 className="text-xl font-bold text-white text-center">{dailyPlan.day}</h3>
            </div>
            <div className="p-4 space-y-4 flex-grow">
                <MealSection 
                    title="Desayuno" 
                    meal={dailyPlan.breakfast} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
                <MealSection 
                    title="Almuerzo" 
                    meal={dailyPlan.lunch}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                />
                <MealSection 
                    title="Cena" 
                    meal={dailyPlan.dinner}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
                />
                 <MealSection 
                    title="Snacks" 
                    meal={dailyPlan.snacks}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477a2 2 0 01-.547-1.806zM15 9a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                />
            </div>

            <div className="p-4 bg-gray-900/50">
                 <h4 className="text-md font-semibold text-gray-200 mb-3 text-center">Resumen Nutricional</h4>
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <TotalsStat label="Calorías" value={dailyTotals.calories} unit="kcal" color="text-green-400" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L13 4.414V17a1 1 0 11-2 0V4.414L7.707 7.707a1 1 0 01-1.414-1.414l4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>} />
                    <TotalsStat label="Proteínas" value={dailyTotals.protein} unit="g" color="text-sky-400" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V4.25A.75.75 0 0110 3.5zM10 8.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V9.25a.75.75 0 01.75-.75zM7 7.25a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM13 7.25a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5z" /></svg>} />
                    <TotalsStat label="Carbs" value={dailyTotals.carbohydrates} unit="g" color="text-emerald-400" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.25 8.25a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z" clipRule="evenodd" /></svg>} />
                    <TotalsStat label="Grasas" value={dailyTotals.fats} unit="g" color="text-amber-400" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M.2 10a11.9 11.9 0 0119.6 0A11.9 11.9 0 01.2 10zM10 3a7 7 0 100 14 7 7 0 000-14z" /></svg>} />
                 </div>
            </div>

            <div className="p-4">
                <h4 className="text-md font-semibold text-gray-200 mb-2 text-center">Glosario Nutricional</h4>
                <div className="overflow-x-auto max-h-48">
                     <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-gray-700 sticky top-0">
                            <tr>
                                <th scope="col" className="px-4 py-2">Alimento</th>
                                <th scope="col" className="px-2 py-2 text-right">Prot.</th>
                                <th scope="col" className="px-2 py-2 text-right">Carb.</th>
                                <th scope="col" className="px-2 py-2 text-right">Grasa</th>
                                <th scope="col" className="px-2 py-2 text-right">Kcal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {foodGlossary.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-700/50">
                                    <th scope="row" className="px-4 py-2 font-medium text-gray-200 whitespace-nowrap">
                                        {item.food} <span className="text-gray-500 font-normal">({item.amount})</span>
                                    </th>
                                    <td className="px-2 py-2 text-right">{item.protein}</td>
                                    <td className="px-2 py-2 text-right">{item.carbohydrates}</td>
                                    <td className="px-2 py-2 text-right">{item.fats}</td>
                                    <td className="px-2 py-2 text-right">{item.calories}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DayCard;
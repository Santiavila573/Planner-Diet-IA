
import React from 'react';
import { NutritionFormData } from '../types';

interface NutritionFormProps {
    formData: NutritionFormData;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onFormSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    errors: { [key: string]: string };
}

const InputField = <T,>({ label, name, type = "number", value, onChange, required = true, min, step, error }: {
    label: string;
    name: keyof T;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    min?: number;
    step?: number;
    error?: string;
}) => (
    <div>
        <label htmlFor={name as string} className="block text-sm font-medium text-gray-300">{label}</label>
        <input
            type={type}
            id={name as string}
            name={name as string}
            value={value}
            onChange={onChange}
            required={required}
            min={min}
            step={step}
            className={`mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-600'}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${name as string}-error` : undefined}
        />
        {error && <p id={`${name as string}-error`} className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
);


const SelectField = <T,>({ label, name, value, onChange, options }: {
    label: string;
    name: keyof T;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}) => (
    <div>
        <label htmlFor={name as string} className="block text-sm font-medium text-gray-300">{label}</label>
        <select
            id={name as string}
            name={name as string}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
        >
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
);


const NutritionForm: React.FC<NutritionFormProps> = ({ formData, onFormChange, onFormSubmit, isLoading, errors }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 sticky top-8">
            <h2 className="text-xl font-bold mb-4 text-gray-100">Crea tu Plan Personalizado</h2>
            <form onSubmit={onFormSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField<NutritionFormData> label="Edad" name="age" value={formData.age} onChange={onFormChange} min={1} error={errors.age} />
                    <InputField<NutritionFormData> label="Peso (kg)" name="weight" value={formData.weight} onChange={onFormChange} min={1} step={0.1} error={errors.weight} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField<NutritionFormData> label="Altura (cm)" name="height" value={formData.height} onChange={onFormChange} min={1} error={errors.height} />
                    <InputField<NutritionFormData> label="Horas de Sueño / noche" name="sleepHours" value={formData.sleepHours} onChange={onFormChange} min={1} step={0.5} error={errors.sleepHours} />
                </div>

                <SelectField<NutritionFormData>
                    label="Género"
                    name="gender"
                    value={formData.gender}
                    onChange={onFormChange}
                    options={['Masculino', 'Femenino', 'Otro']}
                />
                <SelectField<NutritionFormData>
                    label="Nivel de Actividad"
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={onFormChange}
                    options={['Sedentario', 'Ligero', 'Moderado', 'Activo', 'Muy Activo']}
                />
                <SelectField<NutritionFormData>
                    label="Objetivo Principal"
                    name="goal"
                    value={formData.goal}
                    onChange={onFormChange}
                    options={['Perder peso', 'Mantener peso', 'Ganar músculo']}
                />
                <SelectField<NutritionFormData>
                    label="Tamaño de la Porción"
                    name="portionSize"
                    value={formData.portionSize}
                    onChange={onFormChange}
                    options={['Pequeña', 'Mediana', 'Grande']}
                />
                <div>
                    <label htmlFor="preferences" className="block text-sm font-medium text-gray-300">
                        Preferencias / Alergias
                    </label>
                    <textarea
                        id="preferences"
                        name="preferences"
                        rows={3}
                        value={formData.preferences}
                        onChange={onFormChange}
                        placeholder="Ej: vegetariano, sin lactosa, alérgico a las nueces..."
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Generando...' : 'Generar Plan'}
                </button>
            </form>
        </div>
    );
};

export default NutritionForm;
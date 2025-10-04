
import React from 'react';

interface LoadingSpinnerProps {
    message: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <div className="w-12 h-12 border-4 border-t-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-gray-200">{message}</p>
            <p className="mt-2 text-sm text-gray-400">Esto puede tardar unos segundos.</p>
        </div>
    );
};

export default LoadingSpinner;

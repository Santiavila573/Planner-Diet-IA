
import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="bg-red-900 border-l-4 border-red-500 text-red-200 p-4 rounded-md shadow-md" role="alert">
            <div className="flex">
                <div className="py-1">
                    <svg className="fill-current h-6 w-6 text-red-400 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-4a1 1 0 110 2 1 1 0 010-2z"/></svg>
                </div>
                <div>
                    <p className="font-bold text-red-100">Error</p>
                    <p className="text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;

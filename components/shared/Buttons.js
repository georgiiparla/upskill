import React from 'react';
import { Loader2 } from 'lucide-react';

export const ActionButton = ({ icon, text, shortText, colorScheme = 'orange', onClick, isActive = false }) => {
    const colorClasses = {
        orange: 'text-csway-orange dark:text-csway-orange ring-csway-orange',
        blue: 'text-blue-600 dark:text-blue-500 ring-blue-500',
        green: 'text-csway-green dark:text-csway-green ring-csway-green',
        gray: 'text-gray-600 dark:text-gray-400 ring-gray-500',
    };
    const selectedColor = colorClasses[colorScheme] || colorClasses.orange;

    return (
        <button
            className={`
                flex items-center justify-center px-3 py-1.5 text-sm font-semibold
                rounded-md transition-colors focus:outline-none
                
                bg-gray-100/50
                dark:bg-gray-800
                
                ${selectedColor}
                
                ${isActive
                    ? 'ring-2'
                    : 'focus:ring-2'
                }
            `}
            onClick={onClick}
        >
            {icon}
            {shortText ? (
                <>
                    <span className="hidden md:inline">{text}</span>
                    <span className="inline md:hidden">{shortText}</span>
                </>
            ) : (
                <span>{text}</span>
            )}
        </button>
    );
};

export const DetailActionButton = ({
    icon: Icon,
    text,
    onClick,
    colorScheme = 'gray',
    isLoading = false,
    disabled = false,
    title = ''
}) => {
    const colorClasses = {
        orange: 'hover:bg-csway-orange/10 hover:text-csway-orange dark:hover:text-csway-orange',
        blue:   'hover:bg-blue-500/10 hover:text-blue-500 dark:hover:text-blue-500',
        red:    'hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-500',
        gray:   'hover:bg-gray-500/10 dark:hover:bg-gray-700',
    };

    const selectedColor = colorClasses[colorScheme] || colorClasses.gray;

    return (
        <button
            title={title}
            className={`
                flex items-center px-4 py-2 rounded-md transition-colors text-sm font-medium 
                disabled:opacity-50 disabled:cursor-not-allowed 
                text-gray-500 dark:text-gray-400
                ${selectedColor}
            `}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Icon className="h-4 w-4 mr-2" />}
            <span>{text}</span>
        </button>
    );
};

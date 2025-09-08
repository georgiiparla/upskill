import React from 'react';

const ActionButton = ({ icon, text, shortText, colorScheme = 'orange', onClick, isActive = false }) => {
    const colorClasses = {
        orange: 'text-csway-orange dark:text-csway-orange ring-csway-orange',
        blue: 'text-blue-600 dark:text-blue-500 ring-blue-500',
        green: 'text-csway-green dark:text-csway-green ring-csway-green',
        gray: 'text-gray-600 dark:text-gray-400 ring-gray-500', // Added gray style
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

export { ActionButton };

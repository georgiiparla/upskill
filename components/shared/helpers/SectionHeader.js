import React from 'react';

export const SectionHeader = ({
    icon: Icon,
    title,
    subtitle,
    iconAccentColor = "text-blue-600 dark:text-blue-400",
    className = ""
}) => {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <div className="flex-shrink-0">
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm`}>
                    <Icon className={`h-5 w-5 ${iconAccentColor}`} />
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};
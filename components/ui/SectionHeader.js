import React from 'react';

export const SectionHeader = ({
    title,
    subtitle,
    className = ""
}) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                {title}
            </h2>
            {subtitle && (
                <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    {subtitle}
                </p>
            )}
        </div>
    );
};
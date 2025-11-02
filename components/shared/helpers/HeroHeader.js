"use client";
import React from 'react';

export const HeroHeader = ({
    icon: Icon,
    title,
    subtitle,
    iconSize = "w-14 h-14",
    iconBg = "from-blue-500 to-blue-600",
    alignment = "left",
    className = ""
}) => {
    const alignmentClasses = alignment === "center"
        ? "text-center"
        : "flex items-center gap-6";

    const containerClasses = `
        ${alignmentClasses}
        ${alignment === "center" ? "py-8" : "py-2"}
        ${className}
    `.trim();

    if (alignment === "center") {
        return (
            <div className={containerClasses}>
                <div className="space-y-4">
                    <div className={`inline-flex items-center justify-center ${iconSize} bg-gradient-to-br ${iconBg} rounded-xl shadow-lg mb-6`}>
                        <Icon className="h-7 w-7 text-white" />
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Left-aligned version
    return (
        <div className={containerClasses}>
            <div className="flex-shrink-0">
                <div className={`${iconSize} bg-gradient-to-br ${iconBg} rounded-xl shadow-lg flex items-center justify-center`}>
                    <Icon className="h-7 w-7 text-white" />
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

"use client";
import React from 'react';

export const HeroHeader = ({
    icon: Icon,
    title,
    subtitle,
    iconSize = "w-14 h-14",
    iconBg = "from-blue-500 to-blue-600",
    iconAccentColor = "text-blue-600 dark:text-blue-400",
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
                    <div className={`inline-flex items-center justify-center ${iconSize} bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-xl mb-6`}>
                        {/* Tabler icons look best with 1.5 stroke */}
                        <Icon className={`h-7 w-7 ${iconAccentColor}`} stroke={1.5} />
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

    return (
        <div className={containerClasses}>
            <div className="flex-shrink-0">
                <div className={`${iconSize} bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-xl flex items-center justify-center`}>
                    <Icon className={`h-7 w-7 ${iconAccentColor}`} stroke={1.5} />
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-base sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
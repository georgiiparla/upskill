import React from 'react';

const CardSkeleton = ({ children, className = '', innerClassName = '', glass = true }) => {
    // Matches the variant logic in Helper.js -> Card
    const variantClasses = glass
        ? 'bg-gradient-to-br from-white to-slate-50/30 dark:from-slate-900 dark:to-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 shadow-sm'
        : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm';

    const defaultPadding = 'p-6';

    return (
        <div className={`rounded-xl ${variantClasses} ${className} ${defaultPadding}`}>
            {innerClassName ? (
                <div className={innerClassName}>{children}</div>
            ) : (
                children
            )}
        </div>
    );
};

const TextSkeleton = ({ className = '' }) => (
    <div className={`bg-slate-200/60 dark:bg-slate-700/60 rounded-md ${className}`} />
);

const SectionTitleSkeleton = () => (
    <div className="flex items-center mb-4">
        <div className="h-6 w-6 bg-slate-200/60 dark:bg-slate-700/60 rounded-md mr-3"></div>
        <div className="h-7 w-48 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
    </div>
);

// Matches HeroHeader structure
const HeroHeaderSkeleton = () => (
    <div className="flex items-center gap-6 animate-pulse py-2">
        <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-xl flex items-center justify-center">
                <div className="h-7 w-7 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
            </div>
        </div>

        <div className="flex-1 min-w-0">
            <div className="space-y-3">
                <div className="h-8 w-64 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                <div className="h-6 w-96 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
            </div>
        </div>
    </div>
);

export { CardSkeleton, TextSkeleton, SectionTitleSkeleton, HeroHeaderSkeleton }
const CardSkeleton = ({ children, className = '' }) => (
    <div className={`p-6 bg-gradient-to-br from-white to-slate-50/30 dark:from-slate-900 dark:to-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60 ${className}`}>
        {children}
    </div>
);

const TextSkeleton = ({ className = '' }) => (
    <div className={`bg-slate-200/60 dark:bg-slate-700/60 rounded-md ${className}`} />
);

const SectionTitleSkeleton = () => (
    <div className="h-7 w-1/4 bg-slate-200/60 dark:bg-slate-700/60 rounded mb-4"></div>
);

export { CardSkeleton, TextSkeleton, SectionTitleSkeleton }
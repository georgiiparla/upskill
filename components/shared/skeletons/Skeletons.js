const CardSkeleton = ({ children, className = '' }) => (
    <div className={`p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
        {children}
    </div>
);

const TextSkeleton = ({ className = '' }) => (
    <div className={`bg-gray-200 dark:bg-gray-700 rounded-md ${className}`} />
);

const SectionTitleSkeleton = () => (
    <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
);

export { CardSkeleton, TextSkeleton, SectionTitleSkeleton }
import { formatRelativeTime } from "@/lib/helper_func";

export const SectionTitle = ({ icon, title, className = '' }) => (
    <div className={`flex items-center mb-4 ${className}`}>

        {icon}

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 ml-3">{title}</h2>

    </div>
);

export const Card = ({ children, className = '', innerClassName = '' }) => (
    <div className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl border border-white/20 shadow-md transition-all duration-300 ${className}`}>
        <div className={`p-6 ${innerClassName}`}>{children}</div>
    </div>
);

export const InfoCard = ({ icon, title, items, renderItem, listClassName = "space-y-3" }) => {
    return (
        <Card className="flex flex-col ">
            <SectionTitle icon={icon} title={title} />
            {/* //!Technical debt with Height */}
            <div className="flex-grow overflow-y-auto no-scrollbar max-h-[210px]">
                {items && items.length > 0 ? (
                    <ul className={listClassName}>
                        {items.map(item => renderItem(item))}
                    </ul>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                        <p>No items to display.</p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export const HistoryListItem = ({ subject, createdAt, content, borderColorClass }) => {
    return (
        <li
            className={`
                bg-gray-50 dark:bg-gray-800/60 p-4 rounded-lg
                transition-colors hover:bg-gray-100 dark:hover:bg-gray-700/80
                border-l-2 ${borderColorClass}
            `}
        >
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{subject}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">{formatRelativeTime(createdAt)}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                {content}
            </p>
        </li>
    );
};
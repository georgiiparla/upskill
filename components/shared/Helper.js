import { formatRelativeTime } from "@/lib/helper_func";
import Link from "next/link";

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

            <div className="flex-grow overflow-y-auto no-scrollbar max-h-[210px] sm:max-h-[210px]">
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

export const HistoryListItem = ({
    subject,
    createdAt,
    content,
    href,
    variant = 'border',
    color = 'gray',
}) => {

    const borderColorMap = {
        teal: 'border-teal-500',
        green: 'border-green-500',
        red: 'border-red-500',
        amber: 'border-yellow-400',
        blue: 'border-blue-500',
        gray: 'border-gray-500',
    };

    const backgroundColorMap = {
        teal: 'bg-teal-500/10 hover:bg-teal-500/20 dark:bg-teal-500/15 dark:hover:bg-teal-500/25',
        green: 'bg-green-500/10 hover:bg-green-500/20 dark:bg-green-500/15 dark:hover:bg-green-500/25',
        red: 'bg-red-500/10 hover:bg-red-500/20 dark:bg-red-500/15 dark:hover:bg-red-500/25',
        amber: 'bg-yellow-400/25 hover:bg-yellow-400/35 dark:bg-yellow-400/30 dark:hover:bg-yellow-400/40',
        blue: 'bg-blue-500/10 hover:bg-blue-500/20 dark:bg-blue-500/15 dark:hover:bg-blue-500/25',
        gray: 'bg-gray-500/10 hover:bg-gray-500/20 dark:bg-gray-500/15 dark:hover:bg-gray-500/25',
    };

    const getContainerClasses = () => {
        const baseClasses = "py-4 px-5 rounded-lg group transition-all";

        if (variant === 'background') {
            return `${baseClasses} ${backgroundColorMap[color] || backgroundColorMap.gray}`;
        }

        const defaultBg = "bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-700/80";
        return `${baseClasses} ${defaultBg} border-l-4 ${borderColorMap[color] || borderColorMap.gray}`;
    };

    const itemContent = (
        <>
            <div className="flex justify-between items-center mb-1">
                <h4 className="truncate text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{subject}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{formatRelativeTime(createdAt)}</span>
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate">
                {content}
            </p>
        </>
    );

    const contentWrapperClasses = "flex-grow w-full min-w-0";

    return (
        <li className={getContainerClasses()}>

            {href ? (
                <Link href={href} className={contentWrapperClasses}>
                    {itemContent}
                </Link>
            ) : (
                <div className={contentWrapperClasses}>
                    {itemContent}
                </div>
            )}
        </li>
    );
};
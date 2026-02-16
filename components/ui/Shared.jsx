import { formatRelativeTime } from "@/lib/helper-func";
import Link from "next/link";

export const SectionTitle = ({ icon, title, className = '' }) => (
    <div className={`flex items-center mb-4 ${className}`}>

        {icon}
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 ml-3">{title}</h2>

    </div>
);

export const Card = ({ children, className = '', innerClassName = '', glass = true, variant = glass ? 'glass' : 'default', mobileSpaceless = false }) => {
    const getVariantClasses = () => {
        switch (variant) {
            case 'glass':
                return 'bg-gradient-to-br from-white to-slate-50/30 dark:from-slate-900 dark:to-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 shadow-sm';
            case 'custom':
                return 'border border-slate-200/60 dark:border-slate-700/60 shadow-sm';
            case 'ghost':
                return 'bg-transparent border-none shadow-none';
            default:
                return 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm';
        }
    };

    const baseVariant = getVariantClasses();
    const basePadding = variant === 'ghost' ? '' : 'p-6';
    const baseRounded = 'rounded-xl';

    let finalVariant = baseVariant;
    let finalPadding = basePadding;
    let finalRounded = baseRounded;

    if (mobileSpaceless) {
        finalVariant = baseVariant.split(' ').map(c => `md:${c}`).join(' ');
        finalPadding = basePadding ? `md:${basePadding}` : '';
        finalRounded = `md:${finalRounded}`;
    }

    const containerClasses = `${finalRounded} ${finalVariant} ${className} ${finalPadding}`;

    return (
        <div className={containerClasses}>
            {innerClassName ? (
                <div className={innerClassName}>{children}</div>
            ) : (
                children
            )}
        </div>
    );
};

export const InfoCard = ({ icon, title, items, renderItem, listClassName = "space-y-3" }) => {
    return (
        <Card className="flex flex-col " glass={false}>
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
        teal: 'bg-teal-500/8 hover:bg-teal-500/15 dark:bg-teal-500/12 dark:hover:bg-teal-500/20',
        green: 'bg-green-500/8 hover:bg-green-500/15 dark:bg-green-500/12 dark:hover:bg-green-500/20',
        red: 'bg-red-500/8 hover:bg-red-500/15 dark:bg-red-500/12 dark:hover:bg-red-500/20',
        amber: 'bg-yellow-500/8 hover:bg-yellow-500/15 dark:bg-yellow-500/12 dark:hover:bg-yellow-500/20',
        blue: 'bg-blue-500/8 hover:bg-blue-500/15 dark:bg-blue-500/12 dark:hover:bg-blue-500/20',
        gray: 'bg-slate-500/8 hover:bg-slate-500/15 dark:bg-slate-500/12 dark:hover:bg-slate-500/20',
    };

    const getContainerClasses = () => {
        const baseClasses = "py-4 px-5 rounded-lg group transition-all duration-300 ease-out";

        if (variant === 'background') {
            return `${baseClasses} ${backgroundColorMap[color] || backgroundColorMap.gray}`;
        }

        const defaultBg = "bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-700/60";
        return `${baseClasses} ${defaultBg} border-l-4 ${borderColorMap[color] || borderColorMap.gray}`;
    };

    const itemContent = (
        <>
            <div className="flex justify-between items-center mb-1">
                <h4 className={`truncate text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 transition-colors`}>{subject}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{formatRelativeTime(createdAt)}</span>
            </div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate">
                {content}
            </div>
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
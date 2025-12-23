"use client";
import Link from 'next/link';

const ActivityText = ({ userName, eventType, targetInfo }) => {
    const targetLink = targetInfo?.tag ? `/feedback/request/${targetInfo.tag}` : null;
    const targetTitle = targetInfo?.title ? `"${targetInfo.title}"` : 'an item';

    const renderActionText = () => {
        switch (eventType) {
            case 'feedback_requested':
                return <>requested feedback on {targetLink ? <Link href={targetLink} className="font-semibold text-blue-500 hover:underline">{targetTitle}</Link> : targetTitle}.</>;
            case 'feedback_closed':
                return <>closed the feedback request for {targetLink ? <Link href={targetLink} className="font-semibold text-blue-500 hover:underline">{targetTitle}</Link> : targetTitle}.</>;
            case 'agenda_updated':
                return <>updated the agenda item {targetTitle}.</>;
            default:
                return <>performed an action.</>;
        }
    };

    return (
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <span className="font-bold text-gray-900 dark:text-white">{userName}</span> {renderActionText()}
        </p>
    );
};

export { ActivityText };

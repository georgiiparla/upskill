"use client";

export const ActivityStream = ({ activityStream }) => {

    const getActionColor = (type) => {
        switch (type) {
            case 'feedback_submitted': return 'text-csway-green';
            case 'feedback_request_created': return 'text-blue-400';
            case 'feedback_liked': return 'text-purple-400';
            default: return 'text-slate-400';
        }
    };

    const getActionText = (type) => {
        switch (type) {
            case 'feedback_submitted': return 'submitted feedback';
            case 'feedback_request_created': return 'created a request';
            case 'feedback_liked': return 'liked feedback';
            case 'agenda_updated': return 'changed';
            default: return 'performed an action';
        }
    };

    const getTargetLink = (targetInfo, eventType) => {
        if (!targetInfo) return null;

        if (targetInfo.type === 'feedback_request' && targetInfo.tag) {
            return `/feedback/request/${targetInfo.tag}`;
        }
        if (targetInfo.type === 'feedback_submission' && targetInfo.id) {
            return `/feedback?id=${targetInfo.id}`;
        }
        return null;
    };

    const getTargetText = (targetInfo) => {
        if (!targetInfo) return null;
        if (typeof targetInfo === 'string') return targetInfo;
        if (targetInfo.type === 'agenda_item') return 'Agenda Item';
        if (targetInfo.title) return targetInfo.title;
        if (targetInfo.tag) return `#${targetInfo.tag}`;
        return null;
    };

    return (
        <>
            {activityStream.map((activity, index) => (
                <div
                    key={activity.id}
                    className="text-slate-700 dark:text-slate-300 flex items-start gap-2"
                >
                    <div className="flex-shrink-0 min-w-[45px]">
                        {activity.isNew ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700">
                                NEW
                            </span>
                        ) : (
                            <span className="text-slate-500 dark:text-slate-600 text-xs font-mono">{activity.formatted_date}</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <span className="text-slate-500 dark:text-slate-400">{new Date(activity.created_at).toLocaleTimeString()}</span>
                        {' '}
                        <span className="text-slate-400 dark:text-slate-500">›</span>
                        {' '}
                        <br className="md:hidden" />
                        <span className=" text-slate-500 dark:text-slate-400">{activity.user_name}</span>
                        {' '}
                        <span className={`${getActionColor(activity.event_type)} font-medium`}>
                            {getActionText(activity.event_type)}
                        </span>
                        {getTargetText(activity.target_info) && (
                            <>
                                {' '}
                                <span className="text-slate-400 dark:text-slate-500">›</span>
                                {' '}
                                {getTargetLink(activity.target_info, activity.event_type) ? (
                                    <a
                                        href={getTargetLink(activity.target_info, activity.event_type)}
                                        className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
                                    >
                                        {getTargetText(activity.target_info)}
                                    </a>
                                ) : (
                                    <span className="font-semibold text-slate-900 dark:text-white">{getTargetText(activity.target_info)}</span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

"use client";

import React from 'react';
import Link from 'next/link';
import {
    MessageSquarePlus,
    MessageSquare,
    FileText,
    Heart,
    Zap,
    CheckCircle2
} from 'lucide-react';

// Helper to map event types to icons, colors, and short verbs
const getEventStyle = (type) => {
    switch (type) {
        case 'feedback_submitted':
            return {
                icon: MessageSquare,
                color: 'text-emerald-600 dark:text-emerald-400',
                verb: 'replied to'
            };
        case 'feedback_request_created':
            return {
                icon: MessageSquarePlus,
                color: 'text-blue-600 dark:text-blue-400',
                verb: 'requested'
            };
        case 'feedback_liked':
            return {
                icon: Heart,
                color: 'text-rose-500 dark:text-rose-400',
                verb: 'liked'
            };
        case 'agenda_updated':
            return {
                icon: FileText,
                color: 'text-amber-600 dark:text-amber-400',
                verb: 'edited'
            };
        case 'quest_completed':
            return {
                icon: CheckCircle2,
                color: 'text-purple-600 dark:text-purple-400',
                verb: 'completed'
            };
        default:
            return {
                icon: Zap,
                color: 'text-slate-500 dark:text-slate-400',
                verb: 'acted on'
            };
    }
};

export const ActivityStream = ({ activityStream }) => {

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
        if (targetInfo.type === 'agenda_item') return 'Agenda';
        if (targetInfo.title) return targetInfo.title;
        if (targetInfo.tag) return `#${targetInfo.tag}`;
        return 'Item';
    };

    if (!activityStream || activityStream.length === 0) {
        return (
            <div className="py-8 text-center text-slate-400 italic opacity-60 text-xs md:text-sm">
                // System idle. No recent activity.
            </div>
        );
    }

    return (
        <div className="w-full">
            {activityStream.map((activity) => {
                const style = getEventStyle(activity.event_type);
                const Icon = style.icon;
                const dateStr = activity.formatted_date || new Date(activity.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

                return (
                    <div
                        key={activity.id}
                        className="
                            group relative 
                            flex flex-col md:flex-row md:items-center 
                            gap-1 md:gap-3 
                            py-2 px-2 md:px-3
                            rounded-md
                            transition-all duration-200
                            hover:bg-slate-100/50 dark:hover:bg-slate-800/50
                        "
                    >
                        {/* New Indicator (Absolute positioned to stay out of flow) */}
                        {activity.isNew && (
                            <div className="absolute left-0 top-3 md:top-1/2 md:-translate-y-1/2 w-0.5 h-6 md:h-4 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                        )}

                        {/* Meta Column: Date & Icon */}
                        <div className="flex items-center gap-3 md:w-28 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                            {/* Kept small on mobile */}
                            <span className="text-[10px] md:text-xs font-mono text-slate-400 dark:text-slate-500 min-w-[45px]">
                                {dateStr}
                            </span>
                            <Icon className={`w-3.5 h-3.5 ${style.color}`} />
                        </div>

                        {/* Main Content Flow */}
                        {/* UPDATED: Changed text-sm to text-xs md:text-sm for better mobile fit */}
                        <div className="flex flex-wrap items-center gap-x-2 text-xs md:text-sm leading-relaxed">
                            {/* User */}
                            <span className="font-semibold text-slate-700 dark:text-slate-200">
                                {activity.user_name}
                            </span>

                            {/* Verb (The "Action") */}
                            {/* UPDATED: Reduced padding and font size slightly for mobile */}
                            <span className={`text-[10px] md:text-xs font-medium ${style.color} bg-slate-50 dark:bg-slate-800/50 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700/50`}>
                                {style.verb}
                            </span>

                            {/* Target (The "Object") */}
                            {getTargetText(activity.target_info) && (
                                <>
                                    {getTargetLink(activity.target_info, activity.event_type) ? (
                                        <Link
                                            href={getTargetLink(activity.target_info, activity.event_type)}
                                            className="
                                                font-medium text-slate-600 dark:text-slate-300 
                                                hover:text-blue-600 dark:hover:text-blue-400 
                                                hover:underline decoration-blue-500/30 underline-offset-2
                                                truncate max-w-[150px] md:max-w-[300px] /* Tightened mobile truncate limit */
                                            "
                                        >
                                            {getTargetText(activity.target_info)}
                                        </Link>
                                    ) : (
                                        <span className="font-medium text-slate-500 dark:text-slate-400 truncate max-w-[150px] md:max-w-[300px]">
                                            {getTargetText(activity.target_info)}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
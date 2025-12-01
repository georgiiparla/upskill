"use client";

import React from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react'; // ONE universal minimal icon

// Helper to map event types to colors and short verbs
// Note: Icons have been removed from here to keep the stream minimal
const getEventStyle = (type) => {
    switch (type) {
        case 'feedback_submitted':
            return {
                color: 'text-emerald-600 dark:text-emerald-400',
                verb: 'replied to'
            };
        case 'feedback_request_created':
            return {
                color: 'text-blue-600 dark:text-blue-400',
                verb: 'requested'
            };
        case 'feedback_liked':
            return {
                color: 'text-rose-500 dark:text-rose-400',
                verb: 'liked'
            };
        case 'agenda_updated':
            return {
                color: 'text-amber-600 dark:text-amber-400',
                verb: 'edited'
            };
        case 'quest_completed':
            return {
                color: 'text-purple-600 dark:text-purple-400',
                verb: 'completed'
            };
        default:
            return {
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
                            <div className="absolute left-0 top-3 md:top-1/2 md:-translate-y-1/2 w-0.5 h-2 md:h-4 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                        )}

                        {/* Meta Column: Date & Universal Icon */}
                        <div className="flex items-center gap-3 md:w-28 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] md:text-xs font-mono text-slate-400 dark:text-slate-500 min-w-[45px]">
                                {dateStr}
                            </span>

                            {/* UNIVERSAL MINIMAL ICON: 
                                - Uses 'Activity' (pulse) for everything
                                - Neutral slate color to recede into background
                            */}
                            <Activity className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700" />
                        </div>

                        {/* Main Content Flow */}
                        <div className="flex flex-wrap items-center gap-x-2 text-xs md:text-sm leading-relaxed">
                            {/* User */}
                            <span className="font-semibold text-slate-700 dark:text-slate-200">
                                {activity.user_name}
                            </span>

                            {/* Verb (The "Action") - Retained color for scanability, but simplified */}
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
                                                hover:underline decoration-blue-500/30 underline-offset-2 truncate
                                            "
                                        >
                                            {getTargetText(activity.target_info)}
                                        </Link>
                                    ) : (
                                        <span className="font-medium text-slate-500 dark:text-slate-400 truncate">
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
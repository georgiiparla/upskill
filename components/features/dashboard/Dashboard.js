"use client";
import React, { useState } from 'react';
import {
    Zap
} from 'lucide-react';
import { MantraHero } from './MantraHero';
import { AgendaItem } from './AgendaItem';

// const StatCard = ({ icon: Icon, label, value, trend, color }) => (
//     <div className="group relative overflow-hidden rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 p-5 transition-all duration-300">
//         <div className="flex items-start justify-between">
//             <div className="space-y-2">
//                 <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
//                 <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
//                 {trend && (
//                     <p className={`text-xs font-medium flex items-center gap-1 ${color}`}>
//                         <TrendingUp className="h-3 w-3" />
//                         {trend}
//                     </p>
//                 )}
//             </div>
//             <div className={`p-3 rounded-lg bg-gradient-to-br ${color === 'text-green-600 dark:text-green-400' ? 'from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/30' : color === 'text-blue-600 dark:text-blue-400' ? 'from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30' : 'from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/30'} transition-transform duration-300`}>
//                 <Icon className={`h-5 w-5 ${color}`} />
//             </div>
//         </div>
//     </div>
// );
//
// const ActivityStreamItem = ({ activity }) => {
//     const getActionColor = (type) => {
//         switch(type) {
//             case 'feedback_submitted': return 'text-csway-green';
//             case 'feedback_request_created': return 'text-blue-600 dark:text-blue-400';
//             case 'feedback_liked': return 'text-purple-600 dark:text-purple-400';
//             default: return 'text-slate-600 dark:text-slate-400';
//         }
//     };
//
//     const getActionText = (type) => {
//         switch(type) {
//             case 'feedback_submitted': return 'submitted feedback';
//             case 'feedback_request_created': return 'created a request';
//             case 'feedback_liked': return 'liked feedback';
//             default: return 'performed an action';
//         }
//     };
//
//     const getTargetText = (targetInfo) => {
//         if (!targetInfo) return null;
//         if (typeof targetInfo === 'string') return targetInfo;
//         if (targetInfo.title) return targetInfo.title;
//         if (targetInfo.tag) return `#${targetInfo.tag}`;
//         return null;
//     };
//
//     return (
//         <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-200">
//             <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center border border-slate-200/50 dark:border-slate-600/50">
//                 <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
//                     {activity.user_name.charAt(0).toUpperCase()}
//                 </span>
//             </div>
//             <div className="flex-1 min-w-0">
//                 <p className="text-sm text-slate-900 dark:text-white">
//                     <span className="font-semibold">{activity.user_name}</span>
//                     {' '}
//                     <span className={`${getActionColor(activity.event_type)} font-medium`}>
//                         {getActionText(activity.event_type)}
//                     </span>
//                 </p>
//                 {getTargetText(activity.target_info) && (
//                     <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
//                         {getTargetText(activity.target_info)}
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

export default function Dashboard({ initialData }) {
    const [agendaItems, setAgendaItems] = useState(initialData.agendaItems);
    const [editingItemId, setEditingItemId] = useState(null);

    const handleUpdateAgendaItem = (updatedItem) => {
        setAgendaItems(currentItems =>
            currentItems.map(item => item.id === updatedItem.id ? updatedItem : item)
        );
    };

    // const stats = [
    //     {
    //         icon: Sparkles,
    //         label: 'Feedback Given',
    //         value: initialData.activityData.userFeedbackSubmitted || 0,
    //         trend: `${initialData.activityData.userFeedbackSubmittedThisWeek || 0} this week`,
    //         color: 'text-green-600 dark:text-green-400'
    //     },
    //     {
    //         icon: Target,
    //         label: 'Feedback Requested',
    //         value: initialData.activityData.userFeedbackRequested || 0,
    //         trend: `${initialData.activityData.userFeedbackRequestedThisWeek || 0} this week`,
    //         color: 'text-blue-600 dark:text-blue-400'
    //     },
    //     {
    //         icon: Users,
    //         label: 'Team Activity',
    //         value: initialData.activityData.totalFeedbackSubmitted || 0,
    //         trend: `${initialData.activityData.totalFeedbackSubmittedThisWeek || 0} this week`,
    //         color: 'text-purple-600 dark:text-purple-400'
    //     }
    // ];

    return (
        <div>
            {/* This Week's Focus - Full Width */}
            <div className="mb-12">
                <div className="">
                    <MantraHero />
                </div>

                <div className="space-y-3">
                    {agendaItems.map((item, index) => (
                        <AgendaItem
                            key={item.id}
                            item={item}
                            onUpdate={handleUpdateAgendaItem}
                            isEditing={item.id === editingItemId}
                            setEditingItemId={setEditingItemId}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Stats Grid - REMOVED, integrated into console */}

            {/* Activity Stream Console */}
            <div className={`transition-opacity duration-300 ${editingItemId ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-100/50 dark:bg-purple-900/30 border border-purple-200/50 dark:border-purple-700/30">
                        <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Live Activity Stream</h2>
                </div>

                <div className="bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 font-mono text-xs h-[500px] lg:h-[250px] overflow-y-auto no-scrollbar">
                    <div className="space-y-1">
                        {/* Pinned metrics section */}
                        <div className="mb-3 pb-3 border-b border-slate-300 dark:border-slate-700">
                            <div className="text-slate-600 dark:text-slate-400">
                                <span className="text-slate-500 dark:text-slate-600">[metric]</span>
                                {' '}
                                <span className="font-semibold text-slate-900 dark:text-slate-300">Feedback Given:</span>
                                {' '}
                                <span className="text-csway-green font-bold">{initialData.activityData.userFeedbackSubmitted || 0}</span>
                                {' '}
                                <span className="text-slate-500 dark:text-slate-600">({initialData.activityData.userFeedbackSubmittedThisWeek || 0} this week)</span>
                            </div>
                            <div className="text-slate-600 dark:text-slate-400 mt-1">
                                <span className="text-slate-500 dark:text-slate-600">[metric]</span>
                                {' '}
                                <span className="font-semibold text-slate-900 dark:text-slate-300">Feedback Requested:</span>
                                {' '}
                                <span className="text-blue-600 dark:text-blue-400 font-bold">{initialData.activityData.userFeedbackRequested || 0}</span>
                                {' '}
                                <span className="text-slate-500 dark:text-slate-600">({initialData.activityData.userFeedbackRequestedThisWeek || 0} this week)</span>
                            </div>
                            <div className="text-slate-600 dark:text-slate-400 mt-1">
                                <span className="text-slate-500 dark:text-slate-600">[metric]</span>
                                {' '}
                                <span className="font-semibold text-slate-900 dark:text-slate-300">Team Activity:</span>
                                {' '}
                                <span className="text-purple-600 dark:text-purple-400 font-bold">{initialData.activityData.totalFeedbackSubmitted || 0}</span>
                                {' '}
                                <span className="text-slate-500 dark:text-slate-600">({initialData.activityData.totalFeedbackSubmittedThisWeek || 0} this week)</span>
                            </div>
                        </div>

                        {/* Activity stream */}
                        {initialData.activityStream.map((activity, index) => {
                            const getActionColor = (type) => {
                                switch(type) {
                                    case 'feedback_submitted': return 'text-csway-green';
                                    case 'feedback_request_created': return 'text-blue-400';
                                    case 'feedback_liked': return 'text-purple-400';
                                    default: return 'text-slate-400';
                                }
                            };

                            const getActionText = (type) => {
                                switch(type) {
                                    case 'feedback_submitted': return 'submitted feedback';
                                    case 'feedback_request_created': return 'created a request';
                                    case 'feedback_liked': return 'liked feedback';
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
                                if (targetInfo.title) return targetInfo.title;
                                if (targetInfo.tag) return `#${targetInfo.tag}`;
                                return null;
                            };

                            return (
                                <div key={activity.id} className="text-slate-300">
                                    <span className="text-slate-600">[{String(index + 1).padStart(3, '0')}]</span>
                                    {' '}
                                    <span className="text-slate-400">{new Date(activity.created_at).toLocaleTimeString()}</span>
                                    {' '}
                                    <span className="text-slate-500">›</span>
                                    {' '}
                                    <span className="font-semibold">{activity.user_name}</span>
                                    {' '}
                                    <span className={`${getActionColor(activity.event_type)} font-medium`}>
                                        {getActionText(activity.event_type)}
                                    </span>
                                    {getTargetText(activity.target_info) && (
                                        <>
                                            {' '}
                                            <span className="text-slate-500">›</span>
                                            {' '}
                                            {getTargetLink(activity.target_info, activity.event_type) ? (
                                                <a 
                                                    href={getTargetLink(activity.target_info, activity.event_type)} 
                                                    className="text-cyan-400 hover:text-cyan-300 hover:underline truncate transition-colors"
                                                >
                                                    {getTargetText(activity.target_info)}
                                                </a>
                                            ) : (
                                                <span className="text-cyan-400 truncate">{getTargetText(activity.target_info)}</span>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
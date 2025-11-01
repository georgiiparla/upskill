"use client";
import React, { useState } from 'react';
import {
    TrendingUp, 
    Users, 
    Sparkles,
    Calendar,
    Target,
    Zap
} from 'lucide-react';
import { MantraHero } from './MantraHero';
import { AgendaItem } from './AgendaItem';

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <div className="group relative overflow-hidden rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        <div className="flex items-start justify-between">
            <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
                {trend && (
                    <p className={`text-xs font-medium flex items-center gap-1 ${color}`}>
                        <TrendingUp className="h-3 w-3" />
                        {trend}
                    </p>
                )}
            </div>
            <div className={`p-3 rounded-lg bg-gradient-to-br ${color === 'text-green-600 dark:text-green-400' ? 'from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/30' : color === 'text-blue-600 dark:text-blue-400' ? 'from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30' : 'from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/30'} transition-transform duration-300 group-hover:scale-110`}>
                <Icon className={`h-5 w-5 ${color}`} />
            </div>
        </div>
    </div>
);

const ActivityStreamItem = ({ activity }) => {
    const getActionColor = (type) => {
        switch(type) {
            case 'feedback_submitted': return 'text-csway-green';
            case 'feedback_request_created': return 'text-blue-600 dark:text-blue-400';
            case 'feedback_liked': return 'text-purple-600 dark:text-purple-400';
            default: return 'text-slate-600 dark:text-slate-400';
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

    const getTargetText = (targetInfo) => {
        if (!targetInfo) return null;
        if (typeof targetInfo === 'string') return targetInfo;
        if (targetInfo.title) return targetInfo.title;
        if (targetInfo.tag) return `#${targetInfo.tag}`;
        return null;
    };

    return (
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-200">
            <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center border border-slate-200/50 dark:border-slate-600/50">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {activity.user_name.charAt(0).toUpperCase()}
                </span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900 dark:text-white">
                    <span className="font-semibold">{activity.user_name}</span>
                    {' '}
                    <span className={`${getActionColor(activity.event_type)} font-medium`}>
                        {getActionText(activity.event_type)}
                    </span>
                </p>
                {getTargetText(activity.target_info) && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {getTargetText(activity.target_info)}
                    </p>
                )}
            </div>
        </div>
    );
};

export default function Dashboard({ initialData }) {
    const [agendaItems, setAgendaItems] = useState(initialData.agendaItems);
    const [editingItemId, setEditingItemId] = useState(null);

    const handleUpdateAgendaItem = (updatedItem) => {
        setAgendaItems(currentItems =>
            currentItems.map(item => item.id === updatedItem.id ? updatedItem : item)
        );
    };

    const stats = [
        {
            icon: Sparkles,
            label: 'Feedback Given',
            value: initialData.activityData.userFeedbackSubmitted || 0,
            trend: `${initialData.activityData.userFeedbackSubmittedThisWeek || 0} this week`,
            color: 'text-green-600 dark:text-green-400'
        },
        {
            icon: Target,
            label: 'Feedback Requested',
            value: initialData.activityData.userFeedbackRequested || 0,
            trend: `${initialData.activityData.userFeedbackRequestedThisWeek || 0} this week`,
            color: 'text-blue-600 dark:text-blue-400'
        },
        {
            icon: Users,
            label: 'Team Activity',
            value: initialData.activityData.totalFeedbackSubmitted || 0,
            trend: `${initialData.activityData.totalFeedbackSubmittedThisWeek || 0} this week`,
            color: 'text-purple-600 dark:text-purple-400'
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <div className="mb-8">
                <MantraHero />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Agenda Section - Takes 2 columns */}
                <div className={`lg:col-span-2 transition-opacity duration-300 ${editingItemId ? '' : ''}`}>
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-csway-green/10 dark:bg-csway-green/20 border border-csway-green/20 dark:border-csway-green/30">
                            <Calendar className="h-5 w-5 text-csway-green" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">This Week's Focus</h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Key priorities and action items</p>
                        </div>
                    </div>

                    <div className="space-y-3 max-h-[320px] overflow-y-auto no-scrollbar flex flex-col justify-between">
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

                {/* Activity Stream - Takes 1 column */}
                <div className={`transition-opacity duration-300 ${editingItemId ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-100/50 dark:bg-purple-900/30 border border-purple-200/50 dark:border-purple-700/30">
                            <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Live Activity</h2>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Recent team updates</p>
                        </div>
                    </div>

                    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-4 max-h-[320px] overflow-y-auto no-scrollbar">
                        <div className="space-y-2">
                            {initialData.activityStream.map((activity) => (
                                <ActivityStreamItem key={activity.id} activity={activity} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
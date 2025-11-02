"use client";
import React, { useState, useMemo } from 'react';
import {
    Compass,
    ChevronDown
} from 'lucide-react';
import { AgendaItem } from './AgendaItem';
import { HeroHeader } from '../../shared/helpers/HeroHeader';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';


export default function Dashboard({ initialData }) {
    const [agendaItems, setAgendaItems] = useState(initialData.agendaItems);
    const [editingItemId, setEditingItemId] = useState(null);
    const [isConsoleOpen, setIsConsoleOpen] = useState(false);

    // Mantra logic
    const mantras = [
        "Your journey is uniquely yours—celebrate every milestone",
        "Excellence is the sum of consistent effort",
        "Progress over perfection, always",
        "Stay focused, stay present, stay great...",
        "Momentum is real—keep pushing forward",
        "Build it better, live it fuller",
        "Consistency is the ultimate differentiator",
        "Your growth matters, your effort counts",
        "Transform intentions into achievements",
        "You are capable of extraordinary things",
    ];

    const mantra = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * mantras.length);
        return mantras[randomIndex];
    }, []);

    const handleUpdateAgendaItem = (updatedItem) => {
        setAgendaItems(currentItems =>
            currentItems.map(item => item.id === updatedItem.id ? updatedItem : item)
        );
    };

    return (
        <div className="space-y-10">
            {/* Page Hero Header */}
            <HeroHeader
                icon={Compass}
                title="Public Board"
                subtitle="Stay updated with real-time team activity"
                iconBg="from-indigo-500 to-purple-600"
                alignment="left"
                className="mt-6"
            />

            {/* This Week's Agenda - No header, just padding */}
            <section className="pt-0">
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
            </section>

            {/* Activity Stream Console - Card Dropdown */}
            <section className={`transition-opacity duration-300 ${editingItemId ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                <button
                    onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                    className="w-full text-left"
                >
                    <div className="bg-white/60 dark:bg-slate-800/20 border border-slate-300/60 dark:border-slate-600/60 rounded-xl p-6">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Show Activity Stream Log</h2>
                            </div>
                            <ChevronDown className={`mr-1 h-5 w-5 text-slate-600 dark:text-slate-400 flex-shrink-0 transition-transform ${isConsoleOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                </button>

                {isConsoleOpen && (
                    <div className="mt-6 bg-white/60 dark:bg-slate-800/20 border border-slate-300/60 dark:border-slate-600/60 rounded-lg p-4 md:p-8 text-sm md:text-sm overflow-x-hidden" style={{ fontFamily: "'JetBrains Mono', monospace", wordBreak: "break-word" }}>
                        <div className="space-y-8">
                            {/* Mantra Section with ASCII styling */}
                            <div className="mb-4 pb-4 border-b border-slate-300 dark:border-slate-700">
                                <div className="text-center mb-3">
                                    <div className="text-purple-500 dark:text-purple-400 font-bold leading-tight">
                                        <span className="text-slate-400">╔══════════════════════════════╗</span><br/>
                                        <span className="text-slate-400">║ </span>
                                        <span className="text-indigo-500 dark:text-indigo-300">✧  MANTRA OF THE WEEK  ✧</span>
                                        <span className="text-slate-400"> ║</span><br/>
                                        <span className="text-slate-400">╚══════════════════════════════╝</span>
                                    </div>
                                </div>
                                <div className="text-center px-4">
                                    <p className="text-slate-700 dark:text-slate-300 italic font-semibold leading-relaxed">
                                        <span className="text-purple-600 dark:text-purple-400">&gt;&gt; </span>
                                        <span className="text-transparent bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 dark:from-purple-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text">
                                            {mantra}
                                        </span>
                                        <span className="text-purple-600 dark:text-purple-400"> &lt;&lt;</span>
                                    </p>
                                </div>
                            </div>

                            {/* Pinned metrics section */}
                            <div className="mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                                <div className="text-slate-600 dark:text-slate-400">
                                    <span className="text-slate-500 dark:text-slate-600">[metric]</span>
                                    {' '}
                                    <span className="font-semibold text-slate-900 dark:text-slate-300">Feedback Given:</span>
                                    {' '}
                                    <span className="text-csway-green font-bold">{initialData.activityData.personal.feedback.allTime || 0}</span>
                                    {' '}
                                    <span className="text-slate-500 dark:text-slate-600">({initialData.activityData.personal.feedback.thisWeek || 0} this week)</span>
                                </div>
                                <div className="text-slate-600 dark:text-slate-400 mt-1">
                                    <span className="text-slate-500 dark:text-slate-600">[metric]</span>
                                    {' '}
                                    <span className="font-semibold text-slate-900 dark:text-slate-300">Feedback Requested:</span>
                                    {' '}
                                    <span className="text-blue-600 dark:text-blue-400 font-bold">{initialData.activityData.personal.requests.allTime || 0}</span>
                                    {' '}
                                    <span className="text-slate-500 dark:text-slate-600">({initialData.activityData.personal.requests.thisWeek || 0} this week)</span>
                                </div>
                                <div className="text-slate-600 dark:text-slate-400 mt-1">
                                    <span className="text-slate-500 dark:text-slate-600">[metric]</span>
                                    {' '}
                                    <span className="font-semibold text-slate-900 dark:text-slate-300">Team Activity:</span>
                                    {' '}
                                    <span className="text-purple-600 dark:text-purple-400 font-bold">{initialData.activityData.team.feedback.allTime || 0}</span>
                                    {' '}
                                    <span className="text-slate-500 dark:text-slate-600">({initialData.activityData.team.feedback.thisWeek || 0} this week)</span>
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
                                    <div key={activity.id} className="text-slate-700 dark:text-slate-300">
                                        <span className="text-slate-500 dark:text-slate-600">[{String(index + 1).padStart(3, '0')}]</span>
                                        {' '}
                                        <span className="text-slate-500 dark:text-slate-400">{new Date(activity.created_at).toLocaleTimeString()}</span>
                                        {' '}
                                        <span className="text-slate-400 dark:text-slate-500">›</span>
                                        {' '}
                                        <span className="font-semibold text-slate-900 dark:text-white">{activity.user_name}</span>
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
                                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
                                                    >
                                                        {getTargetText(activity.target_info)}
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-900 dark:text-white">{getTargetText(activity.target_info)}</span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
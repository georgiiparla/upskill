"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Activity as ActivityIcon, Timer, MessageSquarePlus, ThumbsUp, BookOpen } from 'lucide-react';
import { Card, SectionTitle, InfoCard } from "../../shared/helpers/Helper";
import SimpleToggleSwitch from '../../core/ui/SimpleToggleSwitch';
import { formatRelativeTime } from '@/lib/helper-func';
import { AgendaItem } from './AgendaItem';

const MetricItem = ({ icon, label, allTime, thisWeek }) => (
    <div className="group bg-gradient-to-br from-slate-50/80 to-slate-100/60 dark:from-slate-800/80 dark:to-slate-700/60 p-5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1 p-1.5 bg-white/80 dark:bg-slate-900/80 rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200">{icon}</div>
            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</span>
                <div className="flex items-baseline space-x-3">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{allTime.toLocaleString()}</span>
                    {Number(thisWeek) > 0 && (
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">+{thisWeek.toLocaleString()} this week</span>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const ActivityCard = ({ activityData }) => {
    const [activeView, setActiveView] = useState('personal');
    const currentData = activityData[activeView];

    const toggleOptions = [
        { id: 'personal', label: 'Me' },
        { id: 'team', label: 'Team' },
    ];

    return (
        <Card
            className='h-full min-h-[320px]'
            innerClassName='h-full flex flex-col'
        >
            <div className="mb-6">
                <SimpleToggleSwitch
                    options={toggleOptions}
                    activeOption={activeView}
                    setActiveOption={setActiveView}
                />
            </div>

            {/* Enhanced Metrics Grid */}
            <div className="grid grid-cols-1 gap-5 flex-1">
                <MetricItem
                    icon={<MessageSquarePlus className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                    label="Requests Created"
                    allTime={currentData.requests.allTime}
                    thisWeek={currentData.requests.thisWeek}
                />
                <MetricItem
                    icon={<ThumbsUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    label="Feedback Given"
                    allTime={currentData.feedback.allTime}
                    thisWeek={currentData.feedback.thisWeek}
                />
            </div>
        </Card>
    );
};

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
        <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-bold text-gray-900 dark:text-white">{userName}</span> {renderActionText()}
        </p>
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

    return (
        <div className="space-y-8">
            {/* Enhanced This Week's Agenda */}
            <Card className="relative z-[45]">
                <SectionTitle icon={<BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />} title="This Week's Agenda" className={'mb-5'} />
                <ol className="relative border-l border-slate-200 dark:border-slate-700 ml-3">
                    {agendaItems.map((item) => (
                        <AgendaItem
                            key={item.id}
                            item={item}
                            onUpdate={handleUpdateAgendaItem}
                            isEditing={item.id === editingItemId}
                            setEditingItemId={setEditingItemId}
                        />
                    ))}
                </ol>
            </Card>

            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${editingItemId ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                <div className="lg:col-span-1">
                    <ActivityCard activityData={initialData.activityData} />
                </div>
                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <div className="h-full flex flex-col">
                            <SectionTitle
                                icon={<Timer className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
                                title="Activity Stream"
                                className="mb-6"
                            />

                            <div className="flex-1 space-y-4 overflow-y-auto max-h-[450px] sm:max-h-[250px] no-scrollbar">
                                {initialData.activityStream.map((item) => (
                                    <div key={item.id} className="flex items-start p-3 rounded-lg transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                        <div className="flex-shrink-0 mt-1 p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                            <ActivityIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <div className="ml-4 flex-grow">
                                            <ActivityText
                                                userName={item.user_name}
                                                eventType={item.event_type}
                                                targetInfo={item.target_info}
                                            />
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{formatRelativeTime(item.created_at)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
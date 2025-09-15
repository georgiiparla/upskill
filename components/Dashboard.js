// File: components/Dashboard.js
"use client";
import React, { useState } from 'react';
import { Activity as ActivityIcon, Timer, Shield, ThumbsUp, BookOpen } from 'lucide-react';
import { Card, SectionTitle, InfoCard } from "./shared/Helper";
import SimpleToggleSwitch from './SimpleToggleSwitch';
import { formatRelativeTime } from '@/lib/helper_func';
import { AgendaItem } from './AgendaItem';

const MetricItem = ({ icon, label, allTime, thisWeek }) => (
    <div className="bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">{icon}</div>
            <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
                <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{allTime.toLocaleString()}</span>
                    {Number(thisWeek) > 0 && (
                        <span className="text-sm font-semibold text-green-500">+{thisWeek.toLocaleString()} this week</span>
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
            className='h-full min-h-[300px]'
            innerClassName='h-full flex flex-col justify-between'
        >
            <SimpleToggleSwitch
                options={toggleOptions}
                activeOption={activeView}
                setActiveOption={setActiveView}
            />
            <div className="grid grid-cols-1 gap-4">
                <MetricItem
                    icon={<Shield className="h-6 w-6 text-csway-green" />}
                    label="Quests Completed"
                    allTime={currentData.quests.allTime}
                    thisWeek={currentData.quests.thisWeek}
                />
                <MetricItem
                    icon={<ThumbsUp className="h-6 w-6 text-csway-red" />}
                    label="Feedback Given"
                    allTime={currentData.feedback.allTime}
                    thisWeek={currentData.feedback.thisWeek}
                />
            </div>
        </Card>
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
            <Card className="relative z-[45]">
                <SectionTitle icon={<BookOpen className="h-6 w-6 text-csway-orange" />} title="This Week's Agenda" className={'mb-7'} />
                <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-3">
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

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-300 ${editingItemId ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                <div className="md:col-span-1">
                    <ActivityCard activityData={initialData.activityData} />
                </div>
                <div className="md:col-span-2">
                    <InfoCard
                        icon={<Timer className="h-6 w-6 text-csway-orange" />}
                        title="Live Activity Stream"
                        items={initialData.activityStream}
                        listClassName="space-y-4"
                        renderItem={(item) => (
                            <li key={item.id} className="flex items-start p-3 rounded-lg transition-colors hover:bg-gray-500/10">
                                <div className="flex-shrink-0 mt-1"><ActivityIcon className="h-5 w-5 text-csway-red" /></div>
                                <div className="ml-4 flex-grow">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        <span className="font-bold text-gray-900 dark:text-white">{item.user_name}</span> {item.action}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{formatRelativeTime(item.created_at)}</p>
                                </div>
                            </li>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
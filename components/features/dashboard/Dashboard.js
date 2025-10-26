"use client";
import React, { useState } from 'react';
import { Activity as ActivityIcon, Timer, BookOpen } from 'lucide-react';
import { Card, SectionTitle } from "../../shared/helpers/Helper";
import { formatRelativeTime } from '@/lib/helper-func';
import { AgendaItem } from './AgendaItem';
import { ActivityCard } from './ActivityCard';
import { ActivityText } from './ActivityText';


const AgendaSection = ({ agendaItems, handleUpdateAgendaItem, editingItemId, setEditingItemId }) => (
    <Card className="relative z-[45] px-6">
        <SectionTitle icon={<BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />} title="This Week's Agenda" className={'mb-8'} />
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
);

const ActivitySection = ({ activityData }) => (
    <div className="lg:col-span-4">
        <ActivityCard activityData={activityData} />
    </div>
);

const ActivityStreamSection = ({ activityStream }) => (
    <div className="lg:col-span-8">
        <Card className="h-full">
            <div className="h-full flex flex-col">
                <SectionTitle
                    icon={<Timer className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
                    title="Activity Stream"
                    className="mb-6"
                />

                <div className="flex-1 space-y-4 overflow-y-auto max-h-[270px] sm:max-h-[250px] no-scrollbar">
                    {activityStream.map((item) => (
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
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{formatRelativeTime(item.created_at)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    </div>
);

export default function Dashboard({ initialData }) {
    const [agendaItems, setAgendaItems] = useState(initialData.agendaItems);
    const [editingItemId, setEditingItemId] = useState(null);

    const handleUpdateAgendaItem = (updatedItem) => {
        setAgendaItems(currentItems =>
            currentItems.map(item => item.id === updatedItem.id ? updatedItem : item)
        );
    };

    return (
        <div className="space-y-4">
            <AgendaSection
                agendaItems={agendaItems}
                handleUpdateAgendaItem={handleUpdateAgendaItem}
                editingItemId={editingItemId}
                setEditingItemId={setEditingItemId}
            />
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 transition-opacity duration-300 ${editingItemId ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                <ActivitySection activityData={initialData.activityData} />
                <ActivityStreamSection activityStream={initialData.activityStream} />
            </div>
        </div>
    );
}
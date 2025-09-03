"use client";
import React, { useState } from 'react';
import {
    Activity as ActivityIcon, Calendar, BookOpen,
    Timer, Shield, ThumbsUp
} from 'lucide-react';
import { Card, SectionTitle, InfoCard } from "./shared/Helper";
import HypedToggleSwitch from './HypedToggleSwitch';
import { formatRelativeTime } from '@/lib/helper_func';

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
            <HypedToggleSwitch
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
    return (
        <div className="space-y-8">
            <Card>
                <SectionTitle icon={<BookOpen className="h-6 w-6 text-csway-orange" />} title="This Week's Agenda" className={'mb-7'} />
                <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-3">
                    {initialData.agendaItems.map((item) => (
                        <li key={item.id} className="mb-6 ml-6">
                            <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${item.type === 'article' ? 'bg-purple-200 dark:bg-purple-900' : 'bg-csway-red/20 dark:bg-csway-red/20'}`}>
                                {item.type === 'article' ? <BookOpen className="w-3 h-3 text-purple-600 dark:text-purple-300" /> : <Calendar className="w-3 h-3 text-csway-red dark:text-csway-red" />}
                            </span>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm group hover:bg-csway-green/10 dark:hover:bg-gray-700 transition-all cursor-pointer">
                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-1">{item.type === 'article' ? `Learning: ${item.category}` : `Meeting: ${item.due_date}`}</p>
                                <a href="#" className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-csway-green dark:group-hover:text-csway-green transition-colors">{item.title}</a>
                            </div>
                        </li>
                    ))}
                </ol>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
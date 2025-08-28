"use client";
import { React, useState, useEffect } from 'react';
import {
    AlertTriangle, Activity as ActivityIcon, Calendar, BookOpen,
    Timer, Shield, ThumbsUp, Star, Flame
} from 'lucide-react';
import { Card, SectionTitle, InfoCard } from "./Helper";

import HypedToggleSwitch from './HypedToggleSwitch';

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
    // const isPersonal = activeView === 'personal';     // streak feature

    const toggleOptions = [
        { id: 'personal', label: 'Me' },
        { id: 'team', label: 'Team' },
    ];

    return (
        <Card
            className='h-full'
            // Pass the layout classes to the new prop
            innerClassName='h-full flex flex-col justify-between'
        >
            {/* No extra wrapper div needed! */}

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

// --- Main Display Component ---
const DashboardContent = ({ data }) => {
    return (
        <div className="space-y-8">

            <Card>
                <SectionTitle icon={<BookOpen className="h-6 w-6 text-csway-orange" />} title="This Week's Agenda" className={'mb-7'} />
                <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-3">
                    {data.agendaItems.map((item) => (
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
                    <ActivityCard activityData={data.activityData} />
                </div>

                <div className="md:col-span-2">
                    <InfoCard
                        icon={<Timer className="h-6 w-6 text-csway-orange" />}
                        title="Live Activity Stream"
                        items={data.activityStream}
                        listClassName="space-y-4"
                        renderItem={(item) => (
                            <li key={item.id} className="flex items-start p-3 rounded-lg transition-colors hover:bg-gray-500/10">
                                <div className="flex-shrink-0 mt-1"><ActivityIcon className="h-5 w-5 text-csway-red" /></div>
                                <div className="ml-4 flex-grow">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        <span className="font-bold text-gray-900 dark:text-white">{item.user_name}</span> {item.action}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.created_at}</p>
                                </div>
                            </li>
                        )}
                    />
                </div>

            </div>

        </div>
    );
};

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, { credentials: 'include' });
                if (!response.ok) throw new Error(`Server responded with status: ${response.status}`);
                const dashboardData = await response.json();
                setData(dashboardData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);


    if (loading) return <DashboardSkeleton />;


    if (error) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Could not load dashboard data</h3>
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>
            </div>
        );
    }


    return <DashboardContent data={data} />;
}

// --- Skeleton Loader Component ---

const DashboardSkeleton = () => (
    <div className="space-y-8 animate-pulse">
        {/* Skeleton for "This Week's Agenda" Card */}
        <Card>
            <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-7"></div>
            <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-6">
                {/* Skeleton for a timeline item */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="ml-6 flex items-center space-x-4">
                        <div className="absolute w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full -left-3"></div>
                        <div className="p-4 bg-gray-200 dark:bg-gray-700/50 rounded-lg h-16 w-full"></div>
                    </div>
                ))}
            </div>
        </Card>

        {/* Skeleton for the two-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">



            {/* Column 1: Accurate Skeleton for Original ActivityCard */}
            <div className="md:col-span-1">
                <Card className='h-full' innerClassName='h-full flex flex-col justify-between'>
                    <div className='h-full flex flex-col justify-between'>

                        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

                        <div className="space-y-4 w-full">

                            <div className="bg-slate-200/50 dark:bg-slate-700/50 p-4 rounded-lg h-[88px]"></div>

                            <div className="bg-slate-200/50 dark:bg-slate-700/50 p-4 rounded-lg h-[88px]"></div>
                        </div>

                    </div>
                </Card>
            </div>

            {/* Column 2: Live Activity Stream (InfoCard) Skeleton */}
            <div className="md:col-span-2">
                <Card>
                    {/* Title skeleton */}
                    <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                    {/* List items skeleton */}
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-start space-x-4 p-3">
                                <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full mt-1"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    </div>
);

"use client";
import {
    RadarChart, PolarGrid, PolarAngleAxis, Radar,
    Tooltip, ResponsiveContainer
} from 'recharts';
import {
    Activity, Users, User, Calendar, BookOpen, NotebookText, AlertTriangle, Timer
} from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react'; // Import hooks

import { Card, SectionTitle } from "./Helper";

// --- Style Definitions (Unchanged) ---
const DASHBOARD_STYLES = {
    agendaTimeline: `relative border-l border-gray-200 dark:border-gray-700 ml-3`,
    agendaIconWrapperBase: `absolute flex items-center justify-center w-6 h-6 rounded-full -left-3`,
    agendaIconWrapperArticle: `bg-purple-200 dark:bg-purple-900`,
    agendaIconWrapperMeeting: `bg-blue-200 dark:bg-blue-900`,
    agendaIconArticle: `w-3 h-3 text-purple-600 dark:text-purple-300`,
    agendaIconMeeting: `w-3 h-3 text-blue-600 dark:text-blue-300`,
    agendaCard: `p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm group hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all cursor-pointer`,
    agendaDetails: `text-sm font-normal text-gray-500 dark:text-gray-400 mb-1`,
    agendaTitle: `text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors`,
    agendaNotesButton: `flex items-center justify-center h-8 w-8 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors`,
    agendaNotesIcon: `h-5 w-5 text-indigo-500 dark:text-indigo-400`,
    cardScrollableContent: `flex-grow overflow-y-auto no-scrollbar max-h-[350px]`,
    activityListItem: `flex items-start p-3 rounded-lg transition-colors hover:bg-gray-500/10`,
    activityUser: `font-bold text-gray-900 dark:text-white`,
    activityTime: `text-xs text-gray-500 dark:text-gray-400 mt-0.5`,
    meetingsListItem: `flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-gray-500/10`,
    meetingsStatusBase: `text-xs font-semibold mr-4 px-2 py-1 rounded-full`,
    meetingsStatusUpcoming: `bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`,
    meetingsStatusRecent: `bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`,
    meetingsTitle: `font-semibold text-gray-800 dark:text-white`,
    meetingsDate: `text-xs text-gray-500 dark:text-gray-400`,
};

// --- NEW: Skeleton Components ---

const AgendaSkeleton = () => (
    <Card>
        <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-7"></div>
        <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-6">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="ml-6">
                    <div className="absolute w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full -left-3"></div>
                    <div className="p-4 bg-gray-200 dark:bg-gray-700/50 rounded-lg">
                        <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                        <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

const ChartSkeleton = () => (
    <Card>
        <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-700/50 rounded-lg"></div>
    </Card>
);

const ListSkeleton = ({ title }) => (
    <Card className="flex flex-col">
        <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="flex-grow space-y-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
            ))}
        </div>
    </Card>
);


// --- Chart Component (Unchanged) ---
const EngagementChart = ({ data, title, icon, color }) => {
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
    return (
        <Card>
            <SectionTitle icon={icon} title={title} />
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                    <PolarAngleAxis dataKey="category" stroke={tickColor} fontSize={12} />
                    <Radar name="Engagement" dataKey="value" stroke={color} fill={color} fillOpacity={0.6} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '0.5rem',
                            border: '1px solid',
                            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                        }}
                        itemStyle={{ color: theme === 'dark' ? '#e5e7eb' : '#1f2937' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </Card>
    );
};


// --- Main Dashboard Component ---
export const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                // MODIFIED LINE
                const response = await fetch('http://localhost:9292/dashboard', { credentials: 'include' });
                if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }
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

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <AgendaSkeleton />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ChartSkeleton />
                    <ChartSkeleton />
                    <ListSkeleton />
                    <ListSkeleton />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Could not load dashboard data</h3>
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* This Week's Agenda */}
            <div>
                <Card>
                    <SectionTitle icon={<BookOpen className="h-6 w-6 text-indigo-500" />} title="This Week's Agenda" className={'mb-7'} />
                    <ol className={DASHBOARD_STYLES.agendaTimeline}>
                        {data.agendaItems.map((item) => (
                            <li key={item.id} className="mb-6 ml-6">
                                <span className={`${DASHBOARD_STYLES.agendaIconWrapperBase} ${item.type === 'article' ? DASHBOARD_STYLES.agendaIconWrapperArticle : DASHBOARD_STYLES.agendaIconWrapperMeeting}`}>
                                    {item.type === 'article' ? <BookOpen className={DASHBOARD_STYLES.agendaIconArticle} /> : <Calendar className={DASHBOARD_STYLES.agendaIconMeeting} />}
                                </span>
                                <div className={DASHBOARD_STYLES.agendaCard}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className={DASHBOARD_STYLES.agendaDetails}>{item.type === 'article' ? `Learning: ${item.category}` : `Meeting: ${item.due_date}`}</p>
                                            <a href="#" className={DASHBOARD_STYLES.agendaTitle}>{item.title}</a>
                                        </div>
                                        <button aria-label="View notes" className={DASHBOARD_STYLES.agendaNotesButton}>
                                            <NotebookText className={DASHBOARD_STYLES.agendaNotesIcon} />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </Card>
            </div>

            {/* 2x2 Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EngagementChart data={data.teamEngagement} title="Team Engagement" icon={<Users className="h-6 w-6 text-purple-500" />} color="#a78bfa" />
                <EngagementChart data={data.personalEngagement} title="Personal Focus" icon={<User className="h-6 w-6 text-green-500" />} color="#22c55e" />

                {/* Live Activity Stream */}
                <Card className="flex flex-col">
                    <SectionTitle icon={<Timer className="h-6 w-6 text-blue-500" />} title="Live Activity Stream" />
                    <div className={DASHBOARD_STYLES.cardScrollableContent}>
                        <ul className="space-y-4">
                            {data.activityStream.map(item => (
                                <li key={item.id} className={DASHBOARD_STYLES.activityListItem}>
                                    <div className="flex-shrink-0 mt-1"><Activity className="h-5 w-5 text-gray-400" /></div>
                                    <div className="ml-4 flex-grow">
                                        <p className="text-sm text-gray-700 dark:text-gray-300"><span className={DASHBOARD_STYLES.activityUser}>{item.user_name}</span> {item.action}</p>
                                        <p className={DASHBOARD_STYLES.activityTime}>{item.created_at}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>

                {/* Upcoming & Recent Meetings */}
                <Card className="flex flex-col">
                    <SectionTitle icon={<Calendar className="h-6 w-6 text-purple-500" />} title="Upcoming & Recent Meetings" />
                    <div className={DASHBOARD_STYLES.cardScrollableContent}>
                        <ul className="space-y-3">
                            {data.meetings.map(item => (
                                <li key={item.id} className={DASHBOARD_STYLES.meetingsListItem}>
                                    <div className="flex items-center">
                                        <span className={`${DASHBOARD_STYLES.meetingsStatusBase} ${item.status === 'Upcoming' ? DASHBOARD_STYLES.meetingsStatusUpcoming : DASHBOARD_STYLES.meetingsStatusRecent}`}>
                                            {item.status}
                                        </span>
                                        <div>
                                            <p className={DASHBOARD_STYLES.meetingsTitle}>{item.title}</p>
                                            <p className={DASHBOARD_STYLES.meetingsDate}>{item.meeting_date}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    );
};

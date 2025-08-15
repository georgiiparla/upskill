"use client";
import {
    RadarChart, PolarGrid, PolarAngleAxis, Radar,
    Tooltip, ResponsiveContainer
} from 'recharts';
import {
    Activity, Users, User, Clock, BookOpen, Calendar, NotebookText
} from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

import { Card, SectionTitle } from "./Helper";

import { 
    MOCK_ACTIVITY_STREAM, 
    MOCK_AGENDA_ITEMS, 
    MOCK_MEETINGS, 
    MOCK_TEAM_ENGAGEMENT_DATA,
    MOCK_PERSONAL_ENGAGEMENT_DATA
} from "../mock/mock_data";


const DASHBOARD_STYLES = {
    agendaTimeline: `
        relative 
        border-l 
        border-gray-200 dark:border-gray-700 
        ml-3
    `,
    agendaIconWrapperBase: `
        absolute 
        flex items-center justify-center 
        w-6 h-6 
        rounded-full 
        -left-3 
    `,
    agendaIconWrapperArticle: `
        bg-purple-200 dark:bg-purple-900
    `,
    agendaIconWrapperMeeting: `
        bg-blue-200 dark:bg-blue-900
    `,
    agendaIconArticle: `
        w-3 h-3 text-purple-600 dark:text-purple-300
    `,
    agendaIconMeeting: `
        w-3 h-3 text-blue-600 dark:text-blue-300
    `,
    agendaCard: `
        p-4 
        bg-gray-50 dark:bg-gray-700/50 
        rounded-lg 
        border border-gray-200 dark:border-gray-600 
        shadow-sm 
        group 
        hover:bg-indigo-50 dark:hover:bg-gray-700 
        transition-all 
        cursor-pointer
    `,
    agendaDetails: `
        text-sm 
        font-normal 
        text-gray-500 dark:text-gray-400 
        mb-1
    `,
    agendaTitle: `
        text-sm 
        font-semibold 
        text-gray-900 dark:text-white 
        group-hover:text-indigo-600 dark:group-hover:text-indigo-400 
        transition-colors
    `,
    agendaNotesButton: `
        flex items-center justify-center 
        h-8 w-8 
        rounded-full 
        hover:bg-indigo-100 dark:hover:bg-indigo-900/30 
        transition-colors
    `,
    agendaNotesIcon: `
        h-5 w-5 
        text-indigo-500 dark:text-indigo-400
    `,
    cardScrollableContent: `
        flex-grow 
        overflow-y-auto 
        pr-2 
        max-h-[350px]
    `,
    // UPDATED STYLE: Removed background, added subtle hover effect
    activityListItem: `
        flex items-start 
        p-3 
        rounded-lg
        transition-colors
        hover:bg-gray-500/10
    `,
    activityUser: `
        font-bold 
        text-gray-900 dark:text-white
    `,
    activityTime: `
        text-xs 
        text-gray-500 dark:text-gray-400 
        mt-0.5
    `,
    // UPDATED STYLE: Removed background, added subtle hover effect
    meetingsListItem: `
        flex items-center justify-between 
        p-3 
        rounded-lg 
        transition-colors
        hover:bg-gray-500/10
    `,
    meetingsStatusBase: `
        text-xs 
        font-semibold 
        mr-4 px-2 py-1 
        rounded-full
    `,
    meetingsStatusUpcoming: `
        bg-blue-100 text-blue-800 
        dark:bg-blue-900 dark:text-blue-200
    `,
    meetingsStatusRecent: `
        bg-green-100 text-green-800 
        dark:bg-green-900 dark:text-green-200
    `,
    meetingsTitle: `
        font-semibold 
        text-gray-800 dark:text-white
    `,
    meetingsDate: `
        text-xs 
        text-gray-500 dark:text-gray-400
    `,
};


// --- Chart Components ---

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
    return (
        <div className="space-y-6">
            {/* --- This Week's Agenda Section (Full Width) --- */}
            <div>
                <Card>
                  <SectionTitle 
                    icon={<BookOpen className="h-6 w-6 text-indigo-500" />} 
                    title="This Week's Agenda" 
                  />
                  <br />
                  <ol className={DASHBOARD_STYLES.agendaTimeline}>
                    {MOCK_AGENDA_ITEMS.map((item) => (
                      <li key={item.id} className="mb-6 ml-6">              
                        <span className={`${DASHBOARD_STYLES.agendaIconWrapperBase} ${
                          item.type === 'article' ? DASHBOARD_STYLES.agendaIconWrapperArticle : DASHBOARD_STYLES.agendaIconWrapperMeeting
                        }`}>
                          {item.type === 'article' ? 
                            <BookOpen className={DASHBOARD_STYLES.agendaIconArticle} /> : 
                            <Calendar className={DASHBOARD_STYLES.agendaIconMeeting} />}
                        </span>
                        <div className={DASHBOARD_STYLES.agendaCard}>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className={DASHBOARD_STYLES.agendaDetails}>
                                {item.type === 'article' ? `Learning: ${item.category}` : `Meeting: ${item.date}`}
                              </p>
                              <a href="#" className={DASHBOARD_STYLES.agendaTitle}>
                                {item.title}
                              </a>
                            </div>
                            <button 
                              aria-label="View notes"
                              className={DASHBOARD_STYLES.agendaNotesButton}
                            >
                              <NotebookText className={DASHBOARD_STYLES.agendaNotesIcon} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Card>
            </div>

            {/* --- 2x2 Grid Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Team Engagement */}
                <EngagementChart 
                    data={MOCK_TEAM_ENGAGEMENT_DATA} 
                    title="Team Engagement" 
                    icon={<Users className="h-6 w-6 text-purple-500" />}
                    color="#a78bfa"
                />

                {/* Personal Focus */}
                <EngagementChart 
                    data={MOCK_PERSONAL_ENGAGEMENT_DATA} 
                    title="Personal Focus" 
                    icon={<User className="h-6 w-6 text-green-500" />}
                    color="#22c55e"
                />

                {/* Live Activity Stream */}
                <Card className="flex flex-col">
                    <SectionTitle icon={<Activity className="h-6 w-6 text-blue-500" />} title="Live Activity Stream" />
                    <div className={DASHBOARD_STYLES.cardScrollableContent}>
                        <ul className="space-y-4">
                            {MOCK_ACTIVITY_STREAM.map(item => (
                                <li key={item.id} className={DASHBOARD_STYLES.activityListItem}>
                                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                                    <div className="ml-4 flex-grow">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            <span className={DASHBOARD_STYLES.activityUser}>{item.user}</span> {item.action}
                                        </p>
                                        <p className={DASHBOARD_STYLES.activityTime}>{item.time}</p>
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
                            {MOCK_MEETINGS.map(item => (
                                <li key={item.id} className={DASHBOARD_STYLES.meetingsListItem}>
                                    <div className="flex items-center">
                                        <span className={`${DASHBOARD_STYLES.meetingsStatusBase} ${
                                            item.status === 'Upcoming' 
                                            ? DASHBOARD_STYLES.meetingsStatusUpcoming 
                                            : DASHBOARD_STYLES.meetingsStatusRecent
                                        }`}>
                                            {item.status}
                                        </span>
                                        <div>
                                            <p className={DASHBOARD_STYLES.meetingsTitle}>{item.title}</p>
                                            <p className={DASHBOARD_STYLES.meetingsDate}>{item.date}</p>
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
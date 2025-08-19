"use client";
import { React, useState, useEffect } from 'react';
import { 
    Loader2, AlertTriangle, Activity as ActivityIcon, Calendar, BookOpen, 
    Timer, Shield, ThumbsUp, Star, Flame 
} from 'lucide-react';
import { Card, SectionTitle } from "./Helper";

// --- Style Definitions ---
const DASHBOARD_STYLES = {
    agendaTimeline: `relative border-l border-gray-200 dark:border-gray-700 ml-3`,
    agendaIconWrapperBase: `absolute flex items-center justify-center w-6 h-6 rounded-full -left-3`,
    agendaIconWrapperArticle: `bg-purple-200 dark:bg-purple-900`,
    agendaIconWrapperMeeting: `bg-blue-200 dark:bg-blue-900`,
    agendaCard: `p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm group hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all cursor-pointer`,
    agendaDetails: `text-sm font-normal text-gray-500 dark:text-gray-400 mb-1`,
    agendaTitle: `text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors`,
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

// --- Reusable Metric Component ---
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

// --- NEW: Reusable iOS-style Toggle Switch Component ---
const ToggleSwitch = ({ options, activeOption, setActiveOption }) => (
    <div className="relative flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1">
        {/* Sliding background element */}
        <div
            className="absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] bg-blue-600 rounded-full shadow-md transition-transform duration-300 ease-in-out"
            style={{ transform: activeOption === options[0].id ? 'translateX(0%)' : 'translateX(100%)' }}
        />
        {options.map(option => (
            <button
                key={option.id}
                onClick={() => setActiveOption(option.id)}
                className={`relative z-10 w-24 py-1.5 text-sm font-semibold text-center transition-colors duration-300 rounded-full ${
                    activeOption === option.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                }`}
            >
                {option.label}
            </button>
        ))}
    </div>
);


// --- Toggled Activity Card Component ---
const ActivityCard = ({ activityData }) => {
    const [activeView, setActiveView] = useState('personal');
    const currentData = activityData[activeView];
    const isPersonal = activeView === 'personal';

    const toggleOptions = [
        { id: 'personal', label: 'You' },
        { id: 'team', label: 'Team' },
    ];

    return (
        <Card>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <SectionTitle icon={<ActivityIcon className="h-6 w-6 text-indigo-500" />} title="Activity Overview" />
                <div className="mt-4 sm:mt-0">
                    {/* MODIFIED: Using the new ToggleSwitch component */}
                    <ToggleSwitch options={toggleOptions} activeOption={activeView} setActiveOption={setActiveView} />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricItem icon={<Shield className="h-6 w-6 text-green-500" />} label="Quests Completed" allTime={currentData.quests.allTime} thisWeek={currentData.quests.thisWeek} />
                <MetricItem icon={<ThumbsUp className="h-6 w-6 text-blue-500" />} label="Feedback Given" allTime={currentData.feedback.allTime} thisWeek={currentData.feedback.thisWeek} />
                {currentData.points && <MetricItem icon={<Star className="h-6 w-6 text-yellow-500" />} label="Total Points" allTime={currentData.points.allTime} thisWeek={currentData.points.thisWeek} />}
                {currentData.streak !== undefined && <MetricItem icon={<Flame className="h-6 w-6 text-orange-500" />} label={isPersonal ? "Current Streak" : "Avg. Streak"} allTime={`${currentData.streak} days`} thisWeek={0} />}
            </div>
        </Card>
    );
};

// --- Main Display Component ---
const DashboardContent = ({ data }) => {
    return (
        <div className="space-y-8">
            <Card>
                <SectionTitle icon={<BookOpen className="h-6 w-6 text-indigo-500" />} title="This Week's Agenda" className={'mb-7'} />
                <ol className={DASHBOARD_STYLES.agendaTimeline}>
                    {data.agendaItems.map((item) => (
                        <li key={item.id} className="mb-6 ml-6">
                            <span className={`${DASHBOARD_STYLES.agendaIconWrapperBase} ${item.type === 'article' ? DASHBOARD_STYLES.agendaIconWrapperArticle : DASHBOARD_STYLES.agendaIconWrapperMeeting}`}>
                                {item.type === 'article' ? <BookOpen className="w-3 h-3 text-purple-600 dark:text-purple-300" /> : <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-300" />}
                            </span>
                            <div className={DASHBOARD_STYLES.agendaCard}>
                                <p className={DASHBOARD_STYLES.agendaDetails}>{item.type === 'article' ? `Learning: ${item.category}` : `Meeting: ${item.due_date}`}</p>
                                <a href="#" className={DASHBOARD_STYLES.agendaTitle}>{item.title}</a>
                            </div>
                        </li>
                    ))}
                </ol>
            </Card>

            <ActivityCard activityData={data.activityData} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="flex flex-col">
                    <SectionTitle icon={<Timer className="h-6 w-6 text-blue-500" />} title="Live Activity Stream" />
                    <div className={DASHBOARD_STYLES.cardScrollableContent}>
                        <ul className="space-y-4">
                            {data.activityStream.map(item => (
                                <li key={item.id} className={DASHBOARD_STYLES.activityListItem}>
                                    <div className="flex-shrink-0 mt-1"><ActivityIcon className="h-5 w-5 text-gray-400" /></div>
                                    <div className="ml-4 flex-grow">
                                        <p className="text-sm text-gray-700 dark:text-gray-300"><span className={DASHBOARD_STYLES.activityUser}>{item.user_name}</span> {item.action}</p>
                                        <p className={DASHBOARD_STYLES.activityTime}>{item.created_at}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>

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

// --- Page Level Component (Handles Fetching and States) ---
export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await fetch('http://localhost:9292/dashboard', { credentials: 'include' });
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
        <Card>
            <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-7"></div>
            <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-6">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="ml-6">
                        <div className="absolute w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full -left-3"></div>
                        <div className="p-4 bg-gray-200 dark:bg-gray-700/50 rounded-lg h-14"></div>
                    </div>
                ))}
            </div>
        </Card>
        <Card>
            <div className="flex justify-between items-center mb-4">
                <div className="h-7 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-9 w-48 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-slate-100/50 dark:bg-slate-800/50 p-4 rounded-lg h-[88px]"></div>
                ))}
            </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex-grow space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-3 h-8">
                            <div className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                            <div className="h-4 flex-1 rounded bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                    ))}
                </div>
            </Card>
            <Card>
                <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex-grow space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-3 h-8">
                            <div className="h-5 w-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                            <div className="h-4 flex-1 rounded bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </div>
);
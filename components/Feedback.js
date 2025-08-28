"use client"
import { useState } from 'react';
import { PlusCircle, Send, BarChart2, MessageSquare, ChevronDown, Check, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

import { Card, SectionTitle } from "./Helper";
import { MOCK_FEEDBACK_HISTORY, MOCK_FEEDBACK_REQUESTS } from "@/mock/mock_data";

import Link from 'next/link';

// *Reusable button
const ActionButton = ({ icon, text, shortText, colorScheme = 'orange' }) => {
    const colorClasses = {
        orange: 'text-csway-orange focus:ring-csway-orange',
        blue: 'text-blue-500 dark:text-blue-400 focus:ring-blue-500',
    };

    const selectedColor = colorClasses[colorScheme] || colorClasses.orange;

    return (
        <button className={`
            flex items-center justify-center px-3 py-1.5 text-xs font-semibold
            bg-gray-200/50 hover:bg-gray-200
            dark:bg-gray-700/50 dark:hover:bg-gray-700
            rounded-md transition-colors focus:outline-none focus:ring-2
            focus:ring-offset-2 dark:focus:ring-offset-gray-800
            ${selectedColor}
        `}>
            {icon}
            {shortText ? (
                <>
                    <span className="hidden md:inline">{text}</span>
                    <span className="inline md:hidden">{shortText}</span>
                </>
            ) : (
                <span>{text}</span>
            )}
        </button>
    );
};


// ^Reusable History List Item Component
const HistoryListItem = ({ subject, createdAt, content, borderColorClass }) => {
    return (
        <li
            className={`
                bg-gray-50 dark:bg-gray-800/60 p-4 rounded-lg
                transition-colors hover:bg-gray-100 dark:hover:bg-gray-700/80
                border-l-2 ${borderColorClass}
            `}
        >
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{subject}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">{createdAt}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                {content}
            </p>
        </li>
    );
};

const FocusActivityCard = ({ title, data, className = '' }) => {
    const ICONS = {
        "Requests Sent": <Send className="h-5 w-5 text-blue-500" />,
        "Requests Answered": <Check className="h-5 w-5 text-teal-500" />,
        "Requests Ignored": <MessageSquare className="h-5 w-5 text-gray-500" />,
    };

    return (
        <Card className={className}>
            <SectionTitle className='mb-7' icon={<TrendingUp className="h-5 w-5 text-csway-green" />} title={title} />
            <div className="mt-4 space-y-2">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
                                {ICONS[item.name] || <BarChart2 className="h-5 w-5 text-gray-500" />}
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800 dark:text-gray-100">{item.value}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const FeedbackSentimentChart = ({ title, givenData, receivedData, givenColors, receivedColors, className }) => {
    const [view, setView] = useState('given'); // 'given' or 'received'
    const { theme } = useTheme();

    const isGivenView = view === 'given';
    const currentData = isGivenView ? givenData : receivedData;
    const currentColors = isGivenView ? givenColors : receivedColors;
    const total = currentData.reduce((acc, entry) => acc + entry.value, 0);

    const Legend = () => (
        <div className="mt-4 space-y-2">
            {currentData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: currentColors[index % currentColors.length] }}
                        />
                        <span className="text-gray-600 dark:text-gray-400">{entry.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.value}</span>
                </div>
            ))}
        </div>
    );

    return (
        <Card className={className}>
             <div className="flex justify-between items-center">
                <SectionTitle icon={<BarChart2 className="h-5 w-5 text-csway-green" />} title={title} />
                <div className="relative">
                    <select
                        value={view}
                        onChange={(e) => setView(e.target.value)}
                        className="
                            appearance-none bg-gray-200/50 dark:bg-gray-700/50 text-xs font-semibold
                            text-gray-700 dark:text-gray-300 py-1.5 pl-3 pr-8 rounded-md
                            focus:outline-none focus:ring-2 focus:ring-csway-orange
                        "
                    >
                        <option value="given">Feedback Given</option>
                        <option value="received">Feedback Received</option>
                    </select>
                    <ChevronDown className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
            </div>

            <div className="mt-4">
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={currentData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            isAnimationActive={false}
                        >
                            {currentData.map((entry, index) => (
                                <Cell
                                    key={`cell-${view}-${index}`}
                                    fill={currentColors[index % currentColors.length]}
                                    stroke={theme === 'dark' ? '#1f2937' : '#ffffff'}
                                    strokeWidth={2}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                             contentStyle={{
                                backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(4px)',
                                borderRadius: '0.5rem',
                                border: '1px solid',
                                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                                
                            }}
                            itemStyle={{
                                color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
                            }}
                        />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-current text-gray-800 dark:text-gray-200">
                            {total}
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <Legend />
        </Card>
    );
};


export const Feedback = () => {
    const givenSentimentData = [
        { name: 'Exceeds Expectations', value: 21 },
        { name: 'Meets Expectations', value: 45 },
        { name: 'Needs Improvement', value: 8 },
    ];
    const receivedSentimentData = [
        { name: 'Exceeds Expectations', value: 2 },
        { name: 'Meets Expectations', value: 20 },
        { name: 'Needs Improvement', value: 3 },
    ];
    const focusData = [
        { name: 'Requests Sent', value: 12 },
        { name: 'Requests Answered', value: 38 },
        { name: 'Requests Ignored', value: 5 },
    ];

    const GIVEN_SENTIMENT_COLORS = ['#14b8a6', '#f59e0b', '#f43f5e'];
    const RECEIVED_SENTIMENT_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899'];

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case 'Positive': return 'border-green-500';
            case 'Negative': return 'border-red-500';
            default: return 'border-amber-500';
        }
    }
    const getRequestStatusColor = (status) => {
        switch (status) {
            case 'Posted': return 'border-blue-500';
            case 'Pending': return 'border-gray-500';
            default: return 'border-gray-400';
        }
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <Card className="flex flex-col lg:col-span-8">
                    <div className="flex justify-between items-center mb-6">
                        <SectionTitle icon={<MessageSquare className="h-6 w-6 text-csway-orange" />} title="Feedback History" />
                        <Link href="/feedback/new"> {/* Or whatever your route is */}
                            <ActionButton icon={<PlusCircle className="h-4 w-4 mr-1.5" />} text="Add Feedback" shortText="Add" colorScheme="orange" />
                        </Link>
                    </div>
                    <div className="flex-grow overflow-y-auto no-scrollbar max-h-[270px]">
                        <ul className="space-y-4">
                            {MOCK_FEEDBACK_HISTORY.map((item, index) => (
                                <HistoryListItem key={`${item.id}-feedback-${index}`} subject={item.subject} createdAt={item.created_at} content={item.content} borderColorClass={getSentimentColor(item.sentiment)} />
                            ))}
                        </ul>
                    </div>
                </Card>


                <FeedbackSentimentChart
                    title="Feedback"
                    givenData={givenSentimentData}
                    receivedData={receivedSentimentData}
                    givenColors={GIVEN_SENTIMENT_COLORS}
                    receivedColors={RECEIVED_SENTIMENT_COLORS}
                    className="lg:col-span-4"
                />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <Card className="flex flex-col lg:col-span-8">
                    <div className="flex justify-between items-center mb-6">
                        <SectionTitle icon={<MessageSquare className="h-6 w-6 text-blue-500" />} title="Requests History" />
                        <ActionButton icon={<PlusCircle className="h-4 w-4 mr-1.5" />} text="Request New" shortText="Request" colorScheme="blue" />
                    </div>
                    <div className="flex-grow overflow-y-auto no-scrollbar max-h-[184px]">
                        <ul className="space-y-4">
                            {MOCK_FEEDBACK_REQUESTS.map((item) => (
                                <HistoryListItem key={item.id} subject={item.subject} createdAt={item.requested_at} content={item.question} borderColorClass={getRequestStatusColor(item.status)} />
                            ))}
                        </ul>
                    </div>
                </Card>

                
                <FocusActivityCard
                    title="Overview"
                    data={focusData}
                    className="lg:col-span-4"
                />
            </div>
        </div>
    );
};
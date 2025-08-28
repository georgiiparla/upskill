"use client"
import { PlusCircle, Send, BarChart2, MessageSquare } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTheme } from 'next-themes';

import { Card, SectionTitle } from "./Helper";
import { MOCK_FEEDBACK_HISTORY, MOCK_FEEDBACK_REQUESTS } from "@/mock/mock_data";

// --- Reusable Action Button Component ---
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


// --- Reusable History List Item Component ---
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

// --- NEW Focus Bar Chart Component ---
const FocusBarChart = ({ title, data, colors, className = '' }) => { // 1. Add className here
    const { theme } = useTheme();

    return (
        // 2. Apply the className to the root Card element
        <Card className={className}>
            <SectionTitle icon={<BarChart2 className="h-5 w-5 text-csway-green" />} title={title} />
            <div className="mt-4">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                        <XAxis
                            dataKey="name"
                            stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(229, 231, 235, 0.5)' }}
                            contentStyle={{
                                backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(4px)',
                                borderRadius: '0.5rem',
                                border: '1px solid',
                                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                            }}
                            itemStyle={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};


// --- NEW Component for the combined feedback charts ---
const FeedbackAnalysisCard = ({ givenData, receivedData, givenColors, receivedColors, className, title }) => {
    const { theme } = useTheme();
    const totalGiven = givenData.reduce((acc, entry) => acc + entry.value, 0);
    const totalReceived = receivedData.reduce((acc, entry) => acc + entry.value, 0);

    const DualLegend = () => (
        <div className="mt-6 pt-4 text-sm">
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-3 px-2">
                <span>Category</span>
                <div className="flex space-x-8">
                    <span>Given</span>
                    <span>Received</span>
                </div>
            </div>
            <ul className="space-y-2">
                {givenData.map((entry, index) => (
                    <li key={`legend-${index}`} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50">
                        <span className="text-gray-600 dark:text-gray-400">{entry.name}</span>
                        <div className="flex items-center space-x-10">
                            <span className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: givenColors[index] }} />
                                {entry.value}
                            </span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: receivedColors[index] }} />
                                {receivedData[index].value}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <Card className={className}>
            <SectionTitle icon={<BarChart2 className="h-5 w-5 text-csway-green" />} title={title} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 items-center">
                {/* Given Chart */}
                <div className="text-center">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={givenData} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" isAnimationActive={false}>
                                {givenData.map((entry, index) => <Cell key={`cell-given-${index}`} fill={givenColors[index]} stroke={theme === 'dark' ? '#1f2937' : '#ffffff'} />)}
                            </Pie>
                            <Tooltip />
                            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-current text-gray-800 dark:text-gray-200">{totalGiven}</text>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="text-center">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={receivedData} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" isAnimationActive={false}>
                                {receivedData.map((entry, index) => <Cell key={`cell-received-${index}`} fill={receivedColors[index]} stroke={theme === 'dark' ? '#1f2937' : '#ffffff'} />)}
                            </Pie>
                            <Tooltip />
                            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-current text-gray-800 dark:text-gray-200">{totalReceived}</text>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <DualLegend />
        </Card>
    );
};


// --- Main Feedback Component ---
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

    const GIVEN_SENTIMENT_COLORS = ['#14b8a6', '#f59e0b', '#f43f5e']; // Teal, Amber, Rose

    const RECEIVED_SENTIMENT_COLORS = ['#D1D5DB', '#6B7280', '#374151']; // Light Gray, Medium Gray, Dark Gray

    const FOCUS_COLORS = ['#3b82f6', '#14b8a6', '#6B7280'];

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

                {/* Focus chart taking the remaining column */}
                <FocusBarChart
                    title="Focus Activity"
                    data={focusData}
                    colors={FOCUS_COLORS}
                    className="lg:col-span-6"
                />

                {/* Merged chart card spanning two columns */}
                <FeedbackAnalysisCard
                    givenData={givenSentimentData}
                    receivedData={receivedSentimentData}
                    givenColors={GIVEN_SENTIMENT_COLORS}
                    receivedColors={RECEIVED_SENTIMENT_COLORS}
                    className="lg:col-span-6"
                    title="Feedback summary"
                />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feedback and Requests History cards remain the same */}
                <Card className="flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <SectionTitle icon={<MessageSquare className="h-6 w-6 text-blue-500" />} title="Requests History" />
                        <ActionButton icon={<PlusCircle className="h-4 w-4 mr-1.5" />} text="Request New" shortText="Request" colorScheme="blue" />
                    </div>
                    <div className="flex-grow overflow-y-auto no-scrollbar max-h-[180]">
                        <ul className="space-y-4">
                            {MOCK_FEEDBACK_REQUESTS.map((item) => (
                                <HistoryListItem key={item.id} subject={item.subject} createdAt={item.requested_at} content={item.question} borderColorClass={getRequestStatusColor(item.status)} />
                            ))}
                        </ul>
                    </div>
                </Card>

                <Card className="flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <SectionTitle icon={<MessageSquare className="h-6 w-6 text-csway-orange" />} title="Feedback History" />
                        <ActionButton icon={<PlusCircle className="h-4 w-4 mr-1.5" />} text="Add Feedback" shortText="Add" colorScheme="orange" />
                    </div>
                    <div className="flex-grow overflow-y-auto no-scrollbar max-h-[180]">
                        <ul className="space-y-4">
                            {MOCK_FEEDBACK_HISTORY.map((item, index) => (
                                <HistoryListItem key={`${item.id}-feedback-${index}`} subject={item.subject} createdAt={item.created_at} content={item.content} borderColorClass={getSentimentColor(item.sentiment)} />
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    );
};
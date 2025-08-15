"use client"
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { ThumbsUp, PieChart as PieChartIcon } from 'lucide-react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

import { Card, SectionTitle } from "./Helper";

// --- Chart Components ---

// Mock Data for Feedback Charts
const sentimentData = [
    { name: 'Positive', value: 400 },
    { name: 'Neutral', value: 120 },
    { name: 'Negative', value: 80 },
];

const feedbackTrendsData = [
    { name: 'Communication', value: 15 },
    { name: 'Leadership', value: 25 },
    { name: 'Tools', value: 18 },
    { name: 'Workload', value: 12 },
];

const SENTIMENT_COLORS = ['#22c55e', '#f59e0b', '#ef4444']; // Green, Amber, Red
const TRENDS_COLORS = ['#818cf8', '#a78bfa', '#c084fc', '#f472b6']; // Indigo, Purple, Fuchsia, Pink

// A new, list-style custom legend for better styling and information
const CustomLegend = ({ data, colors }) => (
    <ul className="mt-4 space-y-2 text-sm">
        {data.map((entry, index) => (
            <li key={`item-${index}`} className="flex items-center justify-between">
                <div className="flex items-center">
                    <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <span className="text-gray-600 dark:text-gray-400">{entry.name}</span>
                </div>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.value}</span>
            </li>
        ))}
    </ul>
);

const SentimentChart = () => {
    const { theme } = useTheme();
    const totalValue = sentimentData.reduce((acc, entry) => acc + entry.value, 0);

    return (
        <div>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        isAnimationActive={false}
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        paddingAngle={5}
                    >
                        {sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} stroke={theme === 'dark' ? '#1f2937' : '#ffffff'} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '0.5rem',
                            border: '1px solid',
                            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                        }}
                        itemStyle={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
                    />
                    {/* Reverted to a single <text> element for perfect centering */}
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                        className="text-3xl font-bold fill-current text-gray-800 dark:text-gray-200">
                        {totalValue}
                    </text>
                </PieChart>
            </ResponsiveContainer>
            <CustomLegend data={sentimentData} colors={SENTIMENT_COLORS} />
        </div>
    );
};

const FeedbackTrendsChart = () => {
    const { theme } = useTheme();
    const totalValue = feedbackTrendsData.reduce((acc, entry) => acc + entry.value, 0);

    return (
        <div>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={feedbackTrendsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        paddingAngle={5}
                        isAnimationActive={false}
                    >
                        {feedbackTrendsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={TRENDS_COLORS[index % TRENDS_COLORS.length]} stroke={theme === 'dark' ? '#1f2937' : '#ffffff'} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '0.5rem',
                            border: '1px solid',
                            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                        }}
                        itemStyle={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
                    />
                    {/* Reverted to a single <text> element for perfect centering */}
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                        className="text-3xl font-bold fill-current text-gray-800 dark:text-gray-200">
                        {totalValue}
                    </text>
                </PieChart>
            </ResponsiveContainer>
            <CustomLegend data={feedbackTrendsData} colors={TRENDS_COLORS} />
        </div>
    );
};


// --- Main Feedback Component ---

export const Feedback = () => {
    const [isAnonymous, setIsAnonymous] = useState(false);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Feedback Submission Form */}
            <div className="flex flex-col h-full">
                <SectionTitle icon={<ThumbsUp className="h-6 w-6 text-indigo-500" />} title="Your Feedback" />
                <Card className="flex-grow flex flex-col">
                    <form className="flex flex-col flex-grow" onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4 flex-grow">
                            <label htmlFor="feedback-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What do you think?</label>
                            <textarea 
                                id="feedback-text" 
                                className="block p-2.5 w-full h-full min-h-[200px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Provide constructive feedback..."
                            ></textarea>
                        </div>
                        <div className="flex items-center mb-4">
                            <input id="anonymous-checkbox" type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="anonymous-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Submit Anonymously</label>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Feedback</button>
                    </form>
                </Card>
            </div>
            {/* Feedback Analytics */}
            <div className="flex flex-col h-full">
                <SectionTitle icon={<PieChartIcon className="h-6 w-6 text-indigo-500" />} title="Feedback Analytics" />
                <Card className="flex-grow">
                    {/* This grid will be 2 columns on medium screens and up, and 1 column on mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start h-full">
                        <div className="h-full">
                            <h4 className="text-center font-semibold text-gray-600 dark:text-gray-400 mb-2">Sentiment Analysis</h4>
                            <div className="h-[calc(100%-28px)]"> {/* Adjust for title height */}
                                <SentimentChart />
                            </div>
                        </div>
                        <div className="h-full">
                            <h4 className="text-center font-semibold text-gray-600 dark:text-gray-400 mb-2">Feedback Trends</h4>
                            <div className="h-[calc(100%-28px)]"> {/* Adjust for title height */}
                                <FeedbackTrendsChart />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
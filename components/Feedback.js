"use client"

import dynamic from 'next/dynamic';
import { PlusCircle, Send, BarChart2, MessageSquare, Check, TrendingUp } from 'lucide-react';

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

const FeedbackSentimentChart = dynamic(
    () => import('./FeedbackSentimentChart'),
    {
        ssr: false,
        loading: () => <div className="h-[400px] w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
    }
);

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
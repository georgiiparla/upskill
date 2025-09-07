"use client"

import dynamic from 'next/dynamic';
import { PlusCircle, Send, BarChart2, MessageSquare, Check, TrendingUp } from 'lucide-react';
import { Card, SectionTitle, HistoryListItem } from "../shared/Helper";
import Link from 'next/link';
import { CardSkeleton, TextSkeleton } from "@/components/shared/skeletons/Skeletons";
import { ActionButton } from '../shared/Buttons';

// Focus activity card (Overview) component for overview feedback page
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

// Unique sentiment chart skeleton (required only for client side first time chart rendering)
const SentimentChartSkeleton = () => {
    return (
        <CardSkeleton className="lg:col-span-4">
            <div className="flex justify-between items-center">
                <TextSkeleton className="h-5 w-36" />
            </div>
            <div className="relative flex justify-center items-center my-4 h-[200px]">
                <div className="h-48 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="absolute h-40 w-40 rounded-full bg-white dark:bg-gray-800/50" />
                <TextSkeleton className="absolute h-8 w-10" />
            </div>
            <div className="mt-14 space-y-3">
                {[...Array(3)].map((_, i) => (
                    <div key={`legend-${i}`} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                            <TextSkeleton className="h-4 w-32" />
                        </div>
                        <TextSkeleton className="h-4 w-6" />
                    </div>
                ))}
            </div>
        </CardSkeleton>
    )
}

// Chart rendering (dynamic to not slow a webpage)
const FeedbackSentimentChart = dynamic(
    () => import('./FeedbackSentimentChart'),
    {
        ssr: false,
        loading: () => <SentimentChartSkeleton />
    }
);

export const Feedback = ({
    initialSubmissions,
    initialPrompts,
    givenSentimentData,
    receivedSentimentData,
    focusData
}) => {

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
            case 'pending': return 'border-gray-500';
            case 'completed': return 'border-green-500';
            default: return 'border-blue-500';
        }
    }

    return (
        <div className="space-y-8">
            {/* First row-section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Feedback card */}
                <Card className="flex flex-col lg:col-span-8">
                    <div className="flex justify-between items-center mb-6">
                        <SectionTitle icon={<MessageSquare className="h-6 w-6 text-csway-orange" />} title="Feedback Submissions" />
                        <Link href="/feedback/new">
                            <ActionButton icon={<PlusCircle className="h-4 w-4 mr-1.5" />} text="Send Feedback" shortText="Send" colorScheme="orange" />
                        </Link>
                    </div>
                    <div className="flex-grow overflow-y-auto no-scrollbar max-h-[365px]">
                        <ul className="space-y-4">
                            {initialSubmissions.map((item, index) => (
                                <HistoryListItem key={`${item.id}-feedback-${index}`} subject={item.subject} createdAt={item.created_at} content={item.content} borderColorClass={getSentimentColor(item.sentiment)} />
                            ))}
                        </ul>
                    </div>
                </Card>

                {/* Sentiment chart */}
                <FeedbackSentimentChart
                    title="Sentiment"
                    givenData={givenSentimentData}
                    receivedData={receivedSentimentData}
                    givenColors={GIVEN_SENTIMENT_COLORS}
                    receivedColors={RECEIVED_SENTIMENT_COLORS}
                    className="lg:col-span-4"
                />
            </div>

            {/* Second row-section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Requests card */}
                <Card className="flex flex-col lg:col-span-8">
                    <div className="flex justify-between items-center mb-6">
                        <SectionTitle icon={<MessageSquare className="h-6 w-6 text-blue-500" />} title="Feedback Prompts" />
                        <Link href="/feedback/request">
                            <ActionButton icon={<PlusCircle className="h-4 w-4 mr-1.5" />} text="Request New" shortText="Request" colorScheme="blue" />
                        </Link>
                    </div>
                    <div className="flex-grow overflow-y-auto no-scrollbar max-h-[184px]">
                        <ul className="space-y-4">
                            {initialPrompts.map((item) => (
                                <HistoryListItem
                                    key={item.id}
                                    subject={item.topic}
                                    createdAt={item.created_at}
                                    content={item.details}
                                    borderColorClass={getRequestStatusColor(item.status)}
                                />
                            ))}
                        </ul>
                    </div>
                </Card>

                {/* Focus Activity Card */}
                <FocusActivityCard
                    title="Overview"
                    data={focusData}
                    className="lg:col-span-4"
                />
            </div>
        </div>
    );
};
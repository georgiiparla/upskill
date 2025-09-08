"use client"

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { PlusCircle, Send, BarChart2, MessageSquare, Check, TrendingUp } from 'lucide-react';
import { Card, SectionTitle, HistoryListItem } from "../shared/Helper";
import Link from 'next/link';
import { CardSkeleton, TextSkeleton } from "@/components/shared/skeletons/Skeletons";
import { ActionButton } from '../shared/Buttons';

//givenSentimentData,
//receivedSentimentData,
//focusData

//const GIVEN_SENTIMENT_COLORS = ['#14b8a6', '#f59e0b', '#f43f5e'];
//const RECEIVED_SENTIMENT_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899'];

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

{/* Sentiment chart */ }
{/*<FeedbackSentimentChart
                    title="Sentiment"
                    givenData={givenSentimentData}
                    receivedData={receivedSentimentData}
                    givenColors={GIVEN_SENTIMENT_COLORS}
                    receivedColors={RECEIVED_SENTIMENT_COLORS}
                    className="lg:col-span-4"
                />*/}


{/* Focus Activity Card */ }
{/*<FocusActivityCard
                    title="Overview"
                    data={focusData}
                    className="lg:col-span-4"
                />*/}

<Link href="/feedback/new">
    <ActionButton icon={<PlusCircle className="h-4 w-4 mr-1.5" />} text="Send Feedback" shortText="Send" colorScheme="orange" />
</Link>

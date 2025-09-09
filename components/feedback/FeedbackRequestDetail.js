"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { clientFetch } from '@/lib/client-api';

// Import components
import { RequestDetailsCard } from './shared/RequestDetailsCard';
import { FeedbackCommentItem } from './shared/FeedbackCommentItem';
import { RequestSentimentDonutChart } from './shared/RequestSentimentDonutChart';
import { CardSkeleton, TextSkeleton } from '@/components/shared/skeletons/Skeletons';

// A simple skeleton for the detail page while data is loading
const DetailPageSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-pulse">
        <div className="lg:col-span-1 space-y-8">
            <CardSkeleton className="h-48" />
            <CardSkeleton className="h-64" />
        </div>
        <div className="lg:col-span-2 space-y-6">
            <TextSkeleton className="h-7 w-48" />
            <CardSkeleton className="h-32" />
            <CardSkeleton className="h-32" />
        </div>
    </div>
);


export default function FeedbackRequestDetail() {
    const pathname = usePathname();
    const currentTag = pathname.split('/').pop();

    const [requestData, setRequestData] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!currentTag) return;

        const fetchRequestDetails = async () => {
            setLoading(true);
            setError('');

            const response = await clientFetch(`/feedback_requests/${currentTag}`);

            if (response.success) {
                setRequestData(response.data.requestData);
                setSubmissions(response.data.submissions);
            } else {
                setError(response.error || 'Failed to load feedback details.');
            }
            setLoading(false);
        };

        fetchRequestDetails();
    }, [currentTag]);

    if (loading) {
        return <DetailPageSkeleton />;
    }

    if (error) {
        return (
            <div className="text-center text-red-500 dark:text-red-400">
                Error: {error}
            </div>
        );
    }

    if (!requestData) {
        return (
             <div className="text-center text-gray-500 dark:text-gray-400">
                No request data found.
            </div>
        );
    }

    // Calculate sentiment breakdown for the chart
    const sentimentBreakdown = submissions.reduce((acc, sub) => {
        const sentiment = sub.sentiment || 'Neutral';
        acc[sentiment] = (acc[sentiment] || 0) + 1;
        return acc;
    }, {});

    const sentimentChartData = [
        { name: 'Positive', count: sentimentBreakdown.Positive || 0 },
        { name: 'Neutral', count: sentimentBreakdown.Neutral || 0 },
        { name: 'Negative', count: sentimentBreakdown.Negative || 0 }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Left Column: Request Details and Sentiment Analysis */}
            <div className="lg:col-span-1 space-y-8 lg:sticky top-24 self-start">
                <RequestDetailsCard requestData={requestData} />
                <RequestSentimentDonutChart
                    title="Sentiment Breakdown"
                    data={sentimentChartData}
                />
            </div>

            {/* Right Column: Feedback List */}
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 ml-1">
                    Received Feedback ({submissions.length})
                </h2>
                {submissions.length > 0 ? submissions.map((feedbackItem) => (
                    <FeedbackCommentItem key={feedbackItem.id} feedback={feedbackItem} />
                )) : (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No feedback submissions received for this request yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
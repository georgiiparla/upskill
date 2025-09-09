"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { clientFetch } from '@/lib/client-api';

import { RequestDetailsCard } from './shared/RequestDetailsCard';
import { FeedbackCommentItem } from './shared/FeedbackCommentItem';
import { RequestSentimentDonutChart } from './shared/RequestSentimentDonutChart';
import { CardSkeleton, TextSkeleton } from '@/components/shared/skeletons/Skeletons';

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

    const sentimentBreakdown = submissions.reduce((acc, sub) => {
        const sentiment = sub.sentiment_text || 'Meets Expectations';
        acc[sentiment] = (acc[sentiment] || 0) + 1;
        return acc;
    }, );

    const sentimentChartData = [
        { name: 'Far Exceeds Expectations', count: sentimentBreakdown['Far Exceeds Expectations'] || 0 },
        { name: 'Exceeds Expectations', count: sentimentBreakdown['Exceeds Expectations'] || 0 },
        { name: 'Meets Expectations', count: sentimentBreakdown['Meets Expectations'] || 0 },
        { name: 'Needs Improvement', count: sentimentBreakdown['Needs Improvement'] || 0 }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            <div className="lg:col-span-1 space-y-8 lg:sticky top-24 self-start">
                <RequestDetailsCard requestData={requestData} />

                
                {requestData.isOwner && (
                    <RequestSentimentDonutChart
                        title="Sentiment Breakdown"
                        data={sentimentChartData}
                    />
                )}
            </div>

            
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
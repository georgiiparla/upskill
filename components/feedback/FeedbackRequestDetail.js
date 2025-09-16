"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { clientFetch } from '@/lib/client-api';

import { RequestDetailsCard } from './shared/RequestDetailsCard';
import { Loader2, Lock, Eye } from 'lucide-react';
import { FeedbackCommentItem } from './shared/FeedbackCommentItem';
import { RequestSentimentDonutChart } from './shared/RequestSentimentDonutChart';

// VisibilityBadge component is now defined here
const VisibilityBadge = ({ visibility }) => {
    const isPublic = visibility === 'public';
    const Icon = isPublic ? Eye : Lock;
    const tooltipText = isPublic ? 'Public: Feedback is visible to everyone' : 'Requester Only: Feedback is visible only to the requester';
    const color = isPublic ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-500';

    return (
        <div title={tooltipText} className={`p-1 rounded-full ${color}`}>
            <Icon className="h-5 w-5" />
        </div>
    );
};

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

    const handleDeleteSuccess = (deletedId) => {
        setSubmissions(currentSubmissions =>
            currentSubmissions.filter(sub => sub.id !== deletedId)
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-10 w-10 animate-spin text-gray-500 dark:text-gray-400" />
            </div>
        );
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

    const isOwner = requestData.isOwner;
    const isPrivate = requestData.visibility === 'requester_only';
    const feedbackIsHidden = isPrivate && !isOwner;

    const sentimentBreakdown = submissions.reduce((acc, sub) => {
        const sentiment = sub.sentiment_text || 'Meets Expectations';
        acc[sentiment] = (acc[sentiment] || 0) + 1;
        return acc;
    }, {});

    const sentimentChartData = [
        { name: 'Far Exceeds Expectations', count: sentimentBreakdown['Far Exceeds Expectations'] || 0 },
        { name: 'Exceeds Expectations', count: sentimentBreakdown['Exceeds Expectations'] || 0 },
        { name: 'Meets Expectations', count: sentimentBreakdown['Meets Expectations'] || 0 },
        { name: 'Needs Improvement', count: sentimentBreakdown['Needs Improvement'] || 0 }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

            <div className="lg:col-span-1 space-y-8 lg:sticky top-16 self-start z-20">
                <RequestDetailsCard requestData={requestData} />


                {isOwner && (
                    <RequestSentimentDonutChart
                        title="Sentiment Breakdown"
                        data={sentimentChartData}
                    />
                )}
            </div>


            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Received Feedback ({feedbackIsHidden ? 0 : submissions.length})
                    </h2>
                    <VisibilityBadge visibility={requestData.visibility} />
                </div>
                {feedbackIsHidden ? (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-center py-12">
                        <Lock className="h-8 w-8 mx-auto text-gray-400 mb-3" />
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Feedback is Private</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            The feedback for this request is only visible to the requester.
                        </p>
                    </div>
                ) : submissions.length > 0 ? (
                    submissions.map((feedbackItem) => (
                        <FeedbackCommentItem
                            key={feedbackItem.id}
                            feedback={feedbackItem}
                            onDeleteSuccess={handleDeleteSuccess}
                        />
                    ))
                ) : (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No feedback submissions received for this request yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
// components/feedback/FeedbackPromptDetail.js

"use client";

import { usePathname } from 'next/navigation';
import { MOCK_FEEDBACK_PROMPTS, MOCK_FEEDBACK_SUBMISSIONS } from "@/mock/mock_data";

// Import components for layout and list items
import { PromptDetailsCard } from './shared/PromptDetailsCard';
import { FeedbackCommentItem } from './shared/FeedbackCommentItem';

// Import the new donut chart component
import { PromptSentimentDonutChart } from './shared/PromptSentimentDonutChart';

export default function FeedbackPromptDetail() {
    // --- Data Simulation Logic ---
    const pathname = usePathname();
    const currentTag = pathname.split('/').pop();
    const promptData = MOCK_FEEDBACK_PROMPTS.items.find(p => p.tag === currentTag);
    const relatedFeedbackList = MOCK_FEEDBACK_SUBMISSIONS.items.filter(s => s.promptTag === currentTag);

    // Calculate sentiment breakdown for the chart
    const sentimentBreakdown = relatedFeedbackList.reduce((acc, submission) => {
        acc[submission.sentiment] = (acc[submission.sentiment] || 0) + 1;
        return acc;
    }, {});

    // Format data for the chart component. Key names 'name' and 'count' match props for Pie/Legend.
    const sentimentChartData = [
        { name: 'Positive', count: sentimentBreakdown.Positive || 0 },
        { name: 'Neutral', count: sentimentBreakdown.Neutral || 0 },
        { name: 'Negative', count: sentimentBreakdown.Negative || 0 }
    ];

    if (!promptData) {
        return (
            <div className="text-center text-red-500 dark:text-red-400">
                Error: Prompt not found for tag "{currentTag}". Check mock data links.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

            {/* Left Column: Prompt Details and Sentiment Analysis */}
            <div className="lg:col-span-1 space-y-8 lg:sticky top-24 self-start">
                <PromptDetailsCard promptData={promptData} />

                {/* Replace Bar Chart with Donut Chart */}
                <PromptSentimentDonutChart
                    title="Sentiment Breakdown"
                    data={sentimentChartData}
                />
            </div>

            {/* Right Column: Feedback List */}
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 ml-1">
                    Received Feedback ({relatedFeedbackList.length})
                </h2>
                {relatedFeedbackList.length > 0 ? relatedFeedbackList.map((feedbackItem) => (
                    <FeedbackCommentItem key={feedbackItem.id} feedback={feedbackItem} />
                )) : (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No feedback submissions received for this prompt yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
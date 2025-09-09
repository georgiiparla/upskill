"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { Star, Check, ThumbsDown, Send, Loader2, Lightbulb, ChevronDown, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { clientFetch } from '@/lib/client-api';

import { Card } from "@/components/shared/Helper";
import { MOCK_FEEDBACK_TOPICS } from '@/mock/mock_data';

const SentimentPicker = ({ selected, onSelect }) => {
    const sentiments = [
        { name: 'Exceeds Expectations', icon: <Star className="h-8 w-8" />, color: 'text-green-500', bgColor: 'hover:bg-teal-500/10' },
        { name: 'Meets Expectations', icon: <Check className="h-8 w-8" />, color: 'text-amber-500', bgColor: 'hover:bg-amber-500/10' },
        { name: 'Needs Improvement', icon: <ThumbsDown className="h-8 w-8" />, color: 'text-red-500', bgColor: 'hover:bg-red-500/10' },
    ];

    return (
        <div>
            <label className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">Assessment</label>
            <div className="grid grid-cols-3 gap-3">
                {sentiments.map(sentiment => (
                    <button
                        key={sentiment.name}
                        type="button"
                        onClick={() => onSelect(sentiment.name)}
                        className={`
                            flex flex-col items-center justify-center p-3 h-[80px] rounded-lg border-2 transition-all
                            ${selected === sentiment.name
                                ? `${sentiment.color} border-current`
                                : `text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 ${sentiment.bgColor}`
                            }
                        `}
                    >
                        {sentiment.icon}
                    </button>
                ))}
            </div>
        </div>
    );
};

const NewFeedbackForm = ({ requestTag }) => {
    const [topic, setTopic] = useState(MOCK_FEEDBACK_TOPICS[0]);
    const [requestTopic, setRequestTopic] = useState('');
    const [sentiment, setSentiment] = useState('Meets Expectations');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (requestTag) {
            const fetchRequestTopic = async () => {
                const response = await clientFetch(`/feedback_requests/${requestTag}`);
                if (response.success) {
                    setRequestTopic(response.data.requestData.topic);
                } else {
                    toast.error('Could not load request topic.');
                }
            };
            fetchRequestTopic();
        }
    }, [requestTag]);
    
    const mapSentimentForApi = (formSentiment) => {
        switch(formSentiment) {
            case 'Exceeds Expectations': return 'Positive';
            case 'Meets Expectations': return 'Neutral';
            case 'Needs Improvement': return 'Negative';
            default: return 'Neutral';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content.trim().length < 10) {
            toast.error('Please provide more detailed feedback.');
            return;
        }
        setIsSubmitting(true);
        const toastId = toast.loading('Submitting your feedback...');

        if (requestTag) {
            const response = await clientFetch('/feedback_submissions', {
                method: 'POST',
                body: {
                    request_tag: requestTag,
                    content: content,
                    sentiment: mapSentimentForApi(sentiment)
                }
            });

            if (response.success) {
                toast.success('Feedback submitted successfully!', { id: toastId });
                // Redirect back to the detail page after a short delay
                setTimeout(() => router.push(`/feedback/request/${requestTag}`), 1000);
            } else {
                toast.error(`Error: ${response.error}`, { id: toastId });
            }
        } else {
            // Mock submission for general feedback page
            console.log({ topic, sentiment, content });
            toast.success('Mock feedback submitted successfully!', { id: toastId });
        }

        setIsSubmitting(false);
    };

    return (
        <>
            <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl mx-auto"
            >
                <form onSubmit={handleSubmit}>
                    <Card className="mt-4">
                        <div className="flex flex-col gap-10">
                            <div>
                                <label htmlFor="feedback-topic" className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                    Topic
                                </label>
                                {requestTag ? (
                                    <div className="block w-full px-4 py-3 bg-gray-100 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-lg">
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{requestTopic || "Loading topic..."}</p>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <select
                                            id="feedback-topic"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            className="appearance-none block w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-csway-orange focus:border-csway-orange transition-colors"
                                        >
                                            {MOCK_FEEDBACK_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        <ChevronDown className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                )}
                            </div>

                            <SentimentPicker selected={sentiment} onSelect={setSentiment} />
                            
                            <details className="group">
                                <summary className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer list-none select-none">
                                    <HelpCircle className="h-4 w-4 text-sky-500" />
                                    What do these ratings mean?
                                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                                </summary>
                                <ul className="mt-3 pl-6 text-xs text-gray-600 dark:text-gray-400 space-y-2">
                                    <li className="list-disc"><strong>Exceeds Expectations:</strong> For work that is truly exceptional and goes above and beyond.</li>
                                    <li className="list-disc"><strong>Meets Expectations:</strong> For work that is solid and meets all requirements.</li>
                                    <li className="list-disc"><strong>Needs Improvement:</strong> For work that could use some revisions.</li>
                                </ul>
                            </details>

                            <div>
                                <label htmlFor="feedback-text" className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                    What are your thoughts?
                                </label>
                                <textarea
                                    id="feedback-text"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="block w-full min-h-[200px] p-4 bg-gray-50 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-csway-orange focus:border-csway-orange transition-colors resize-y"
                                    placeholder="Be specific and provide examples..."
                                ></textarea>
                            </div>

                            <details className="group">
                                <summary className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer list-none select-none">
                                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                                    Tips for effective feedback
                                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                                </summary>
                                <ul className="mt-4 pl-6 text-xs text-gray-600 dark:text-gray-400 space-y-2">
                                    <li className="list-disc">Focus on specific behaviors and their impact, not on personality.</li>
                                    <li className="list-disc">Offer actionable suggestions for improvement.</li>
                                    <li className="list-disc">Ensure your feedback is timely and constructive.</li>
                                </ul>
                            </details>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-csway-orange rounded-lg shadow-sm hover:bg-csway-orange/90 focus:outline-none focus:ring-2 focus:ring-csway-orange/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Submit Feedback
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </Card>
                </form>
            </motion.div>
        </>
    );
};

export default function FeedbackHub({ requestTag }) {
    return (
        <div className="container mx-auto px-4">
            <NewFeedbackForm requestTag={requestTag} />
        </div>
    );
}
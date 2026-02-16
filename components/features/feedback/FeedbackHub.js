"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { clientFetch } from '@/lib/client-api';
import { useAuthStore } from '@/store/authStore';

import { Card } from "@/components/ui/Shared";

const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const formItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
        },
    },
};

const SentimentPicker = ({ selected, onSelect }) => {
    const sentiments = [
        { name: 'Below Expectations', value: 1, color: 'text-red-500', bgColor: 'hover:bg-red-500/10' },
        { name: 'Approaching Expectations', value: 2, color: 'text-yellow-500', bgColor: 'hover:bg-yellow-500/10' },
        { name: 'Meets Expectations', value: 3, color: 'text-green-500', bgColor: 'hover:bg-green-500/10' },
        { name: 'Exceeds Expectations', value: 4, color: 'text-teal-500', bgColor: 'hover:bg-teal-500/10' },
    ];

    return (
        <div>
            <label className="block mb-2 text-lg font-medium text-slate-700 dark:text-slate-200">Assessment</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sentiments.map(sentiment => (
                    <button
                        key={sentiment.name}
                        type="button"
                        onClick={() => onSelect(sentiment.value)}
                        className={`
                            flex flex-col items-center justify-center p-3 h-[100px] rounded-lg border-2 transition-all duration-200
                            ${selected === sentiment.value
                                ? `${sentiment.color} border-current bg-slate-50 dark:bg-slate-900/50`
                                : `text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 ${sentiment.bgColor}`
                            }
                        `}
                    >
                        <div className="flex items-center justify-center h-8 w-8 text-2xl font-bold">
                            {sentiment.value}
                        </div>
                        <span className="text-sm text-center mt-2">{sentiment.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const NewFeedbackForm = ({ requestTag }) => {
    const [requestTopic, setRequestTopic] = useState('');
    const [sentiment, setSentiment] = useState(3);
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const isSubmittingRef = useRef(false); // Synchronous lock
    const { refreshNavbarPoints } = useAuthStore();

    const MAX_CONTENT_LENGTH = 3000;

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmittingRef.current) {
            return;
        }

        if (content.trim().length < 10) {
            toast.error('Please provide more detailed feedback.');
            return;
        }

        isSubmittingRef.current = true;
        setIsSubmitting(true);
        const toastId = toast.loading('Submitting your feedback...');

        try {
            const response = await clientFetch('/feedback_submissions', {
                method: 'POST',
                body: {
                    request_tag: requestTag,
                    content: content,
                    sentiment: sentiment
                }
            });

            if (response.success) {
                toast.success('Feedback submitted successfully!', { id: toastId });
                refreshNavbarPoints();
                setTimeout(() => {
                    router.push(`/feedback/request/${requestTag}`);
                }, 1000);
            } else {
                toast.error(`Error: ${response.error}`, { id: toastId });
                // Release the lock if the API call fails
                isSubmittingRef.current = false;
                setIsSubmitting(false);
            }
        } catch (error) {
            toast.error('An unexpected error occurred.', { id: toastId });
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <motion.div
                        variants={formContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Card className="mt-4" mobileSpaceless={true}>
                            <div className="flex flex-col gap-10">

                                <motion.div variants={formItemVariants}>
                                    <label htmlFor="feedback-topic" className="block mb-2 text-lg font-medium text-slate-700 dark:text-slate-200">
                                        Topic
                                    </label>
                                    <div className="block w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg">
                                        <p className="font-semibold text-lg text-slate-800 dark:text-slate-200">{requestTopic || "Loading topic..."}</p>
                                    </div>
                                </motion.div>

                                <motion.div variants={formItemVariants}>
                                    <SentimentPicker selected={sentiment} onSelect={setSentiment} />
                                </motion.div>

                                <motion.div variants={formItemVariants}>
                                    <div className="flex justify-between items-center mb-2">
                                        <label htmlFor="feedback-text" className="block text-lg font-medium text-slate-700 dark:text-slate-200">
                                            What are your thoughts?
                                        </label>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                            {content.length}/{MAX_CONTENT_LENGTH}
                                        </span>
                                    </div>
                                    <textarea
                                        id="feedback-text"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        maxLength={MAX_CONTENT_LENGTH}
                                        className="block w-full min-h-[200px] p-5 text-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-csway-orange focus:border-csway-orange transition-colors resize-y"
                                        placeholder="Be specific and provide examples..."
                                    ></textarea>
                                </motion.div>

                                <motion.div variants={formItemVariants}>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full inline-flex items-center justify-center px-6 py-4 font-semibold text-lg text-white bg-csway-orange/90 rounded-lg shadow-sm hover:bg-csway-orange focus:outline-none focus:ring-2 focus:ring-csway-orange/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Submit Feedback
                                            </>
                                        )}
                                    </button>
                                </motion.div>
                            </div>
                        </Card>
                    </motion.div>
                </form>
            </div>
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
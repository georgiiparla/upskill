"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { ThumbsUp, ThumbsDown, Meh, Send, Loader2, Lightbulb, ChevronDown } from 'lucide-react';

import { Card, SectionTitle } from "@/components/Helper";
import { MOCK_FEEDBACK_TOPICS } from '@/mock/mock_data';

const SentimentPicker = ({ selected, onSelect }) => {
    const sentiments = [
        { name: 'Positive', icon: <ThumbsUp className="h-5 w-5" />, color: 'text-teal-500', bgColor: 'hover:bg-teal-500/10' },
        { name: 'Neutral', icon: <Meh className="h-5 w-5" />, color: 'text-amber-500', bgColor: 'hover:bg-amber-500/10' },
        { name: 'Negative', icon: <ThumbsDown className="h-5 w-5" />, color: 'text-red-500', bgColor: 'hover:bg-red-500/10' },
    ];

    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Sentiment</label>
            <div className="grid grid-cols-3 gap-3">
                {sentiments.map(sentiment => (
                    <button
                        key={sentiment.name}
                        type="button"
                        onClick={() => onSelect(sentiment.name)}
                        className={`
                            flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                            ${selected === sentiment.name
                                ? `${sentiment.color} border-current`
                                : `text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 ${sentiment.bgColor}`
                            }
                        `}
                    >
                        {sentiment.icon}
                        <span className="text-xs mt-1 font-semibold">{sentiment.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const NewFeedbackForm = () => {
    const [topic, setTopic] = useState(MOCK_FEEDBACK_TOPICS[0]);
    const [sentiment, setSentiment] = useState('Positive');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content.trim().length < 10) {
            toast.error('Please provide more detailed feedback.');
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading('Submitting your feedback...');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // On success
        toast.success('Feedback submitted successfully!', { id: toastId });
        console.log({ topic, sentiment, content });
        
        // Reset form
        setContent('');
        setSentiment('Positive');
        setIsSubmitting(false);

        // On error (example)
        // toast.error('Something went wrong.', { id: toastId });
    };

    return (
        <>
            {/* --- Toaster provider for notifications --- */}
            {/* Place this in your root layout for global access */}
            <Toaster position="bottom-right" toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                },
            }} />
        
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
            >
                <SectionTitle icon={<ThumbsUp className="h-6 w-6 text-csway-orange" />} title="Provide Constructive Feedback" />

                <form onSubmit={handleSubmit}>
                    <Card className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Side: Topic & Sentiment */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="feedback-topic" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Topic
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="feedback-topic"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            className="
                                                appearance-none block w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/60
                                                border border-gray-300 dark:border-gray-700 rounded-lg
                                                focus:ring-2 focus:ring-csway-orange focus:border-csway-orange
                                                transition-colors
                                            "
                                        >
                                            {MOCK_FEEDBACK_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        <ChevronDown className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <SentimentPicker selected={sentiment} onSelect={setSentiment} />
                            </div>

                            {/* Right Side: Text Area */}
                            <div>
                                <label htmlFor="feedback-text" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    What are your thoughts?
                                </label>
                                <textarea
                                    id="feedback-text"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="
                                        block w-full h-full min-h-[165px] p-4 bg-gray-50 dark:bg-gray-800/60
                                        border border-gray-300 dark:border-gray-700 rounded-lg
                                        focus:ring-2 focus:ring-csway-orange focus:border-csway-orange
                                        transition-colors resize-none
                                    "
                                    placeholder="Be specific and provide examples..."
                                ></textarea>
                            </div>
                        </div>

                        {/* --- Tips Section --- */}
                        <details className="mt-8 group">
                            <summary className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer list-none">
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

                        {/* --- Submit Button --- */}
                        <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 text-right">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="
                                    inline-flex items-center justify-center px-6 py-2.5 font-semibold text-white
                                    bg-csway-green rounded-lg shadow-sm
                                    hover:bg-csway-green/90 focus:outline-none focus:ring-2
                                    focus:ring-csway-green/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                                    disabled:bg-gray-400 disabled:cursor-not-allowed
                                "
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
                    </Card>
                </form>
            </motion.div>
        </>
    );
};

export default function NewFeedbackPage() {
  // This page component simply renders your form
  return (
    <main className="container mx-auto px-4 py-8">
      <NewFeedbackForm />
    </main>
  );
}
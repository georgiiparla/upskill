"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { Send, Loader2, RefreshCw, Clipboard } from 'lucide-react';
import { sleep } from '@/lib/delay';

import { Card } from '../shared/Helper';
import { generateRandomTag } from '@/lib/helper_func';

// --- Animation Variants for Framer Motion ---

// 1. Variant for the main container to orchestrate staggering
const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Time delay between each child animation
            delayChildren: 0.2,   // Wait 0.2s before the first child starts
        },
    },
};

// 2. Variant for each form item (label, input, button)
const formItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",    // Use a spring animation for a more natural feel
            stiffness: 100,
            damping: 12,
        },
    },
};

// Request form component
const RequestFeedbackForm = () => {

    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [generatedTag, setGeneratedTag] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setGeneratedTag(generateRandomTag());
    }, []);

    const handleRegenerateTag = () => {
        setGeneratedTag(generateRandomTag());
        toast('New tag generated!', { icon: '✨' });
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(generatedTag).then(() => {
            toast.success('Tag copied to clipboard!');
        }, () => {
            toast.error('Failed to copy tag.');
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (topic.trim().length < 3) {
            toast.error('Please enter a more descriptive topic.');
            return;
        }
        setIsSubmitting(true);
        const toastId = toast.loading('Generating your request...');
        await sleep(1500);
        console.log("Feedback Request Submitted:", { topic, description, tag: generatedTag });
        toast.success('Feedback request created!', { id: toastId });
        setTopic('');
        setDescription('');
        setGeneratedTag(generateRandomTag());
        setIsSubmitting(false);
    };

    return (
        <>
            <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />

            <div className="max-w-xl mx-auto">
                <form onSubmit={handleSubmit}>
                    {/* Apply container variants here. It controls the children's animations. */}
                    <motion.div
                        variants={formContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Card className="mt-4">
                            <div className="flex flex-col gap-8">
                                {/* Each form section is now a motion component with item variants */}
                                <motion.div variants={formItemVariants}>
                                    <label className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                        Your Unique Share Tag
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-grow px-4 py-3 bg-gray-100 dark:bg-gray-700/50 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center font-mono tracking-wider text-gray-800 dark:text-gray-200">
                                            {generatedTag}
                                        </div>
                                        <button type="button" onClick={handleCopyToClipboard} className="p-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Copy to Clipboard">
                                            <Clipboard className="h-5 w-5" />
                                        </button>
                                        <button type="button" onClick={handleRegenerateTag} className="p-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Generate New Tag">
                                            <RefreshCw className="h-5 w-5" />
                                        </button>
                                    </div>
                                </motion.div>

                                <motion.div variants={formItemVariants}>
                                    <label htmlFor="feedback-topic" className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                        Topic <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="feedback-topic"
                                        type="text"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        className="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 transition-colors"
                                        placeholder="e.g., Q3 Project Proposal"
                                        required
                                    />
                                </motion.div>

                                <motion.div variants={formItemVariants}>
                                    <label htmlFor="feedback-desc" className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                        Description (Optional)
                                    </label>
                                    <textarea
                                        id="feedback-desc"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="block w-full min-h-[200px] p-4 bg-gray-50 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 transition-colors resize-y"
                                        placeholder="Add any context or specific questions..."
                                    ></textarea>
                                </motion.div>

                                <motion.div variants={formItemVariants} className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full inline-flex items-center justify-center px-6 py-3.5 font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
                                    >
                                        {isSubmitting ? (
                                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Submitting...</>
                                        ) : (
                                            <><Send className="mr-2 h-4 w-4" />Create Request</>
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


export default function RequestFeedbackPage() {
    return (
        <div className="container mx-auto px-4">
            <RequestFeedbackForm />
        </div>
    );
}

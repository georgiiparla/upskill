"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, Loader2, RefreshCw } from 'lucide-react';

import { clientFetch } from '@/lib/client-api';
import { Card } from '../../shared/helpers/Helper';
import { generateRandomTag } from '@/lib/helper-func';
import SimpleToggleSwitch from '../../core/ui/SimpleToggleSwitch';

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

const CreateRequestForm = () => {
    const router = useRouter();
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [generatedTag, setGeneratedTag] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const visibilityOptions = [
        { id: 'public', label: 'Public' },
        { id: 'requester_only', label: 'Requester Only' }
    ];

    useEffect(() => {
        setGeneratedTag(generateRandomTag());
    }, []);

    const handleRegenerateTag = () => {
        setGeneratedTag(generateRandomTag());
        toast('New tag generated!', { icon: '✨' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (topic.trim().length < 3) {
            toast.error('Please enter a more descriptive topic.');
            return;
        }
        setIsSubmitting(true);
        const toastId = toast.loading('Submitting your request...');

        const response = await clientFetch('/feedback_requests', {
            method: 'POST',
            body: {
                topic: topic,
                details: description,
                tag: generatedTag,
                visibility: visibility
            }
        });

        if (response.success) {
            toast.success('Feedback request created!', { id: toastId });
            const newRequestTag = response.data.tag;
            setTimeout(() => router.push(`/feedback/request/${newRequestTag}`), 1000);

        } else {
            toast.error(`Error: ${response.error}`, { id: toastId });
            setIsSubmitting(false); // Re-enable form on error
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit}>
                <motion.div variants={formContainerVariants} initial="hidden" animate="visible">
                    <Card className="mt-4">
                        <div className="flex flex-col gap-8">
                            <motion.div variants={formItemVariants}>
                                <label className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                    Your Unique Share Tag
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="flex-grow px-4 py-3 bg-gray-100 dark:bg-gray-700/50 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center font-mono tracking-wider text-gray-800 dark:text-gray-200">
                                        {generatedTag}
                                    </div>
                                    <button type="button" onClick={handleRegenerateTag} disabled={isSubmitting} className="p-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50" title="Generate New Tag">
                                        <RefreshCw className="h-5 w-5" />
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div variants={formItemVariants}>
                                <label htmlFor="feedback-topic" className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                    Topic <span className="text-red-500">*</span>
                                </label>
                                <input id="feedback-topic" type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
                                    className="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 transition-colors disabled:opacity-50"
                                    placeholder="e.g., Q3 Project Proposal" required disabled={isSubmitting} />
                            </motion.div>

                            <motion.div variants={formItemVariants}>
                                <label className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                    Feedback Visibility
                                </label>
                                <SimpleToggleSwitch options={visibilityOptions} activeOption={visibility} setActiveOption={setVisibility} />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 pl-1">
                                    {visibility === 'public'
                                        ? 'All feedback will be visible to anyone with the link.'
                                        : 'Only you will be able to see the feedback submitted.'
                                    }
                                </p>
                            </motion.div>

                            <motion.div variants={formItemVariants}>
                                <label htmlFor="feedback-desc" className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                    Description (Optional)
                                </label>
                                <textarea id="feedback-desc" value={description} onChange={(e) => setDescription(e.target.value)}
                                    className="block w-full min-h-[200px] p-4 bg-gray-50 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 transition-colors resize-y disabled:opacity-50"
                                    placeholder="Add any context or specific questions..."
                                    disabled={isSubmitting}></textarea>
                            </motion.div>

                            <motion.div variants={formItemVariants} className="pt-2">
                                <button type="submit" disabled={isSubmitting}
                                    className="w-full inline-flex items-center justify-center px-6 py-3.5 font-semibold text-white bg-csway-green rounded-lg shadow-sm hover:bg-green-500/70 focus:outline-none focus:ring-2 focus:ring-csway-green/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all">
                                    {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Submitting...</> : <>Create Request</>}
                                </button>
                            </motion.div>
                        </div>
                    </Card>
                </motion.div>
            </form>
        </div>
    );
};

export default function RequestHub() {
    return (
        <div className="container mx-auto px-4">
            <CreateRequestForm />
        </div>
    );
}
"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { IconLoader2, IconRefresh } from '@tabler/icons-react';
import { clientFetch } from '@/lib/client-api';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Shared';
import { generateRandomTag } from '@/lib/helper-func';
import SimpleToggleSwitch from '@/components/ui/SimpleToggleSwitch';
import UserSearchCombobox from '@/components/ui/UserSearchCombobox';

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

export default function CreateRequestForm() {
    const router = useRouter();
    const { refreshNavbarPoints } = useAuth();
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [pairUsername, setPairUsername] = useState('');
    const [generatedTag, setGeneratedTag] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const MAX_TOPIC_LENGTH = 100;
    const MAX_DESC_LENGTH = 1000;

    const visibilityOptions = [
        { id: 'public', label: 'Public' },
        { id: 'requester_only', label: 'Private' }
    ];

    useEffect(() => {
        setGeneratedTag(generateRandomTag());
    }, []);

    const handleRegenerateTag = () => {
        setGeneratedTag(generateRandomTag());
        toast('New tag generated!', { icon: '✨' });
    };

    const [pairSearchQuery, setPairSearchQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: If user typed something but didn't select a valid user
        if (pairSearchQuery.trim() && !pairUsername) {
            toast.error('Please select a valid user from the dropdown list, or clear the search to proceed solo.');
            return;
        }

        if (topic.trim().length < 3) {
            toast.error('Please enter a more descriptive topic.');
            return;
        }
        setIsSubmitting(true);
        const toastId = toast.loading('Submitting your request...');

        const payload = {
            topic: topic,
            details: description,
            tag: generatedTag,
            visibility: visibility
        };

        if (pairUsername.trim()) {
            payload.pair_username = pairUsername.trim();
        }

        const response = await clientFetch('/feedback_requests', {
            method: 'POST',
            body: payload
        });

        if (response.success) {
            toast.success('Feedback request created!', { id: toastId });
            refreshNavbarPoints();
            const newRequestTag = response.data.tag;
            setTimeout(() => router.push(`/feedback/request/${newRequestTag}`), 1000);
        } else {
            toast.error(`Error: ${response.error}`, { id: toastId });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
                <motion.div variants={formContainerVariants} initial="hidden" animate="visible">
                    <Card className="mt-4" mobileSpaceless={true}>
                        <div className="flex flex-col gap-8">
                            <motion.div variants={formItemVariants}>
                                <label className="block mb-2 text-lg font-medium text-slate-700 dark:text-slate-200">
                                    Your Unique Share Tag
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="flex-grow px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-center font-mono tracking-wider text-lg text-slate-800 dark:text-slate-200">
                                        {generatedTag}
                                    </div>
                                    <button type="button" onClick={handleRegenerateTag} disabled={isSubmitting} className="p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50" title="Generate New Tag">
                                        <IconRefresh className="h-5 w-5" />
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div variants={formItemVariants}>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="feedback-topic" className="block text-lg font-medium text-slate-700 dark:text-slate-200">
                                        Topic <span className="text-red-500">*</span>
                                    </label>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        {topic.length}/{MAX_TOPIC_LENGTH}
                                    </span>
                                </div>
                                <input
                                    id="feedback-topic"
                                    type="text"
                                    value={topic}
                                    autoComplete="off"
                                    onChange={(e) => setTopic(e.target.value)}
                                    maxLength={MAX_TOPIC_LENGTH}
                                    className="block w-full px-5 py-4 text-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 transition-colors disabled:opacity-50"
                                    placeholder="e.g., Q3 Project Proposal"
                                    required
                                    disabled={isSubmitting}
                                />
                            </motion.div>

                            <motion.div variants={formItemVariants}>
                                <label htmlFor="pair-requester" className="block mb-2 text-lg font-medium text-slate-700 dark:text-slate-200">
                                    Pair Requester (Optional)
                                </label>
                                <UserSearchCombobox
                                    id="pair-requester"
                                    onSelect={(user) => setPairUsername(user ? user.username : '')}
                                    onSearchChange={setPairSearchQuery}
                                />
                            </motion.div>

                            <motion.div variants={formItemVariants}>
                                <label className="block mb-2 text-lg font-medium text-slate-700 dark:text-slate-200">
                                    Feedback Visibility
                                </label>
                                <SimpleToggleSwitch options={visibilityOptions} activeOption={visibility} setActiveOption={setVisibility} />
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 pl-1">
                                    {visibility === 'public'
                                        ? 'All feedback will be visible to anyone with the link.'
                                        : 'Only you will be able to see the feedback submitted.'
                                    }
                                </p>
                            </motion.div>

                            <motion.div variants={formItemVariants}>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="feedback-desc" className="block text-lg font-medium text-slate-700 dark:text-slate-200">
                                        Description (Optional)
                                    </label>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        {description.length}/{MAX_DESC_LENGTH}
                                    </span>
                                </div>
                                <textarea
                                    id="feedback-desc"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    maxLength={MAX_DESC_LENGTH}
                                    className="block w-full min-h-[200px] p-5 text-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 transition-colors resize-y disabled:opacity-50"
                                    placeholder="Add any context or specific questions..."
                                    disabled={isSubmitting}
                                ></textarea>
                            </motion.div>

                            <motion.div variants={formItemVariants} className="pt-2">
                                <button type="submit" disabled={isSubmitting}
                                    className="w-full inline-flex items-center justify-center px-6 py-4 font-semibold text-lg text-white bg-csway-green rounded-lg shadow-sm hover:bg-green-500/70 focus:outline-none focus:ring-2 focus:ring-csway-green/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all">
                                    {isSubmitting ? <><IconLoader2 className="mr-2 h-5 w-5 animate-spin" />Submitting...</> : <>Create Request</>}
                                </button>
                            </motion.div>
                        </div>
                    </Card>
                </motion.div>
            </form>
        </div>
    );
};

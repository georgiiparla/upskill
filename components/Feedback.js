"use client"
import React, { useState } from 'react';
import { ThumbsUp, Lightbulb } from 'lucide-react';

import { Card, SectionTitle } from "./Helper";
import { FeedbackHistory } from './feedback/FeedbackHistory';
import { MOCK_FEEDBACK_TOPICS } from '@/mock/mock_data';

// --- Style Definitions ---
const MAIN_STYLES = {
    formLabel: `block mb-2 text-sm font-medium text-gray-900 dark:text-white`,
    formSelect: `block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500`,
    formTextArea: `block px-4 py-3 w-full h-full min-h-[200px] text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 dark:placeholder-gray-400`,
    formCheckBox: `w-4 h-4 text-blue-600 rounded bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:ring-offset-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600`,
    formCheckBoxLabel: `ml-2 text-sm font-medium text-gray-900 dark:text-gray-300`,
    submitButton: `w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white font-medium text-sm text-center rounded-lg`,
};

// --- Merged Feedback Form & Tips Component ---
const FeedbackHub = () => {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [topic, setTopic] = useState(MOCK_FEEDBACK_TOPICS[0]);

    const tips = [
        "Be specific: Provide concrete examples instead of vague statements.",
        "Focus on behavior, not personality. Describe the action and its impact.",
        "Offer solutions: If you identify a problem, suggest a potential improvement.",
        "Be timely: Provide feedback as soon as possible after the event.",
        "Keep it constructive: The goal is to help and improve, not to criticize."
    ];

    return (
        <div>
            <SectionTitle icon={<ThumbsUp className="h-6 w-6 text-indigo-500" />} title="Provide Feedback" />
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side: Form */}
                    <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label htmlFor="feedback-topic" className={MAIN_STYLES.formLabel}>Topic</label>
                            <select
                                id="feedback-topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className={MAIN_STYLES.formSelect}
                            >
                                {MOCK_FEEDBACK_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="mb-4 flex-grow">
                            <label htmlFor="feedback-text" className={MAIN_STYLES.formLabel}>What do you think?</label>
                            <textarea
                                id="feedback-text"
                                className={MAIN_STYLES.formTextArea}
                                placeholder="Provide constructive feedback..."
                            ></textarea>
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                id="anonymous-checkbox"
                                type="checkbox" checked={isAnonymous}
                                onChange={() => setIsAnonymous(!isAnonymous)}
                                className={MAIN_STYLES.formCheckBox}
                            />
                            <label htmlFor="anonymous-checkbox" className={MAIN_STYLES.formCheckBoxLabel}>Submit Anonymously</label>
                        </div>
                        <button type="submit" className={MAIN_STYLES.submitButton}>Submit Feedback</button>
                    </form>

                    {/* Right Side: Tips */}
                    <div className="flex flex-col">
                        <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            <Lightbulb className="h-6 w-6 text-indigo-500 mr-3" />
                            Tips for Effective Feedback
                        </h3>
                        <ul className="space-y-4">
                            {tips.map((tip, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                    <span className="mt-1 mr-3 flex-shrink-0 h-2 w-2 rounded-full bg-indigo-400"></span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};


// --- Main Feedback Component ---
export const Feedback = () => {
    return (
        <div className="space-y-8">
            {/* --- Top Section: Merged Hub --- */}
            <FeedbackHub />

            {/* --- Bottom Section: Full-Width History --- */}
            <div>
                <FeedbackHistory />
            </div>
        </div>
    );
};

"use client"
import React, { useState } from 'react';
import { ThumbsUp, Lightbulb } from 'lucide-react';

import { Card, SectionTitle } from "./Helper";
import { FeedbackHistory } from './feedback/FeedbackHistory';
import { MOCK_FEEDBACK_TOPICS } from '@/mock/mock_data';

// --- Style Definitions ---
const MAIN_STYLES = {
    formLabel: `
                block 
                mb-2 
                text-sm 
                font-medium 
                text-gray-900 
                dark:text-white
                `,
    formSelect: `
                block 
                w-full 
                px-4 
                py-3 
                text-sm 
                text-gray-900 
                dark:text-white 
                bg-gray-50 dark:bg-gray-700 
                rounded-lg 
                border border-gray-300 dark:border-gray-600 
                focus:ring-csway-green dark:focus:ring-csway-green
                focus:border-csway-green dark:focus:border-csway-green
                `,
    formTextArea: `
                block 
                px-4 
                py-3 
                w-full min-h-[200px] 
                text-sm text-gray-900 dark:text-white 
                bg-gray-50 dark:bg-gray-700 rounded-lg 
                border border-gray-300 dark:border-gray-600 
                focus:ring-csway-green dark:focus:ring-csway-green 
                focus:border-csway-green dark:focus:border-csway-green 
                dark:placeholder-gray-400
                `,
    formCheckBox: `
                w-4 h-4 
                text-csway-green 
                rounded 
                bg-gray-100 
                dark:bg-gray-700 b
                order-gray-300 
                dark:border-gray-600 dark:ring-offset-gray-800 
                focus:ring-2 focus:ring-csway-green 
                dark:focus:ring-csway-green/80`,
    formCheckBoxLabel: `
                ml-2 
                text-sm 
                font-medium 
                text-gray-900 
                dark:text-gray-300
                `,
    submitButton: `
                w-full 
                px-5 py-2.5 
                bg-csway-green hover:bg-opacity-90 
                focus:ring-4 focus:outline-none focus:ring-csway-green/50 
                dark:bg-csway-green dark:hover:bg-opacity-90 dark:focus:ring-csway-green/80 
                text-white font-medium text-sm text-center rounded-lg
                `,
};

// --- Merged Feedback Form & Tips Component ---
const FeedbackHub = () => {
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
            <SectionTitle icon={<ThumbsUp className="h-6 w-6 text-csway-orange" />} title="Provide Feedback" />
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
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
                        <div className="flex-grow">
                            <label htmlFor="feedback-text" className={MAIN_STYLES.formLabel}>What do you think?</label>
                            <textarea
                                id="feedback-text"
                                className={MAIN_STYLES.formTextArea}
                                placeholder="Provide constructive feedback..."
                            ></textarea>
                        </div>
                        <button type="submit" className={MAIN_STYLES.submitButton}>Submit Feedback</button>
                    </form>

                    <div className="flex flex-col">
                        <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            <Lightbulb className="h-6 w-6 text-yellow-500 mr-3" />
                            Tips for Effective Feedback
                        </h3>
                        <ul className="space-y-4">
                            {tips.map((tip, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                    <span className="ml-2 mt-1 mr-5 flex-shrink-0 h-2 w-2 rounded-full bg-csway-orange"></span>
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
            <FeedbackHub />
            <div>
                <FeedbackHistory />
            </div>
        </div>
    );
};
"use client"
import React, { useState } from 'react';
import { ThumbsUp, PieChart as PieChartIcon } from 'lucide-react';

import { Card, SectionTitle } from "./Helper";
import { SentimentChart, FeedbackTrendsChart } from './feedback/FeedbackCharts';

// --- Main Feedback Component ---

const MAIN_STYLES = {
    feedbackGrid: `
        grid
        grid-cols-1 lg:grid-cols-2 
        gap-6
    `,
    feedbackSubmFormCont: `
        flex
        flex-col 
        h-full
    `,
    formLabel: `
        block 
        mb-4
        text-sm 
        font-medium 
        text-gray-900 dark:text-white
    `,
    formTextArea: `
        block 
        px-4
        py-3
        w-full h-full 
        min-h-[200px]

        text-sm 
        text-gray-900 dark:text-white 
        bg-gray-50 dark:bg-gray-700 
        rounded-lg

        border 
        border-gray-300 dark:border-gray-600 
        focus:ring-blue-500 dark:focus:ring-blue-500 
        focus:border-blue-500 dark:focus:border-blue-500
        dark:placeholder-gray-400 
    `,
    formCheckBox: `
        w-4 h-4 
        text-blue-600
        rounded 
        bg-gray-100 dark:bg-gray-700 
        border-gray-300 dark:border-gray-600
        dark:ring-offset-gray-800 
        focus:ring-2 
        focus:ring-blue-500 dark:focus:ring-blue-600
    `,
    formCheckBoxLabel: `
        ml-2 
        text-sm 
        font-medium 
        text-gray-900 dark:text-gray-300
    `,
    submitButton: `
        w-full 
        px-5 py-2.5 
        
        bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 
        focus:ring-4 
        focus:outline-none 
        focus:ring-blue-300 dark:focus:ring-blue-800

        text-white 
        font-medium   
        text-sm 
        text-center

        rounded-lg 
    `,
    gridChartsCont: `
        grid
        items-start 
        grid-cols-1 md:grid-cols-2 
        gap-12 
        h-full
    `,
    h4: `
        text-center 
        font-semibold 
        text-gray-600 dark:text-gray-400 
        mb-2
    `
}

export const Feedback = () => {
    const [isAnonymous, setIsAnonymous] = useState(false);

    return (
        <div className={MAIN_STYLES.feedbackGrid}>
            {/* Feedback Submission Form */}
            <div className={MAIN_STYLES.feedbackSubmFormCont}>

                <SectionTitle icon={<ThumbsUp className="h-6 w-6 text-indigo-500" />} title="Your Feedback" />

                <Card className="flex-grow flex flex-col">
                    <form className="flex flex-col flex-grow" onSubmit={(e) => e.preventDefault()}>

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
                </Card>

            </div>

            {/* Feedback Analytics */}
            <div className="flex flex-col h-full">

                <SectionTitle icon={<PieChartIcon className="h-6 w-6 text-indigo-500" />} title="Feedback Analytics" />

                <Card className="flex-grow">
                    {/* This grid will be 2 columns on medium screens and up, and 1 column on mobile */}
                    <div className={MAIN_STYLES.gridChartsCont}>

                        <div className="h-full">
                            <h4 className={MAIN_STYLES.h4}>Sentiment Analysis</h4>
                            <div className="h-[calc(100%-28px)]">

                                <SentimentChart />

                            </div>
                        </div>

                        <div className="h-full">
                            <h4 className={MAIN_STYLES.h4}>Feedback Trends</h4>
                            <div className="h-[calc(100%-28px)]">

                                <FeedbackTrendsChart />

                            </div>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};
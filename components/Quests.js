// -----------------------------------------------------------------------------
// File: components/Quests.js (MODIFIED with Skeleton Loader)
// -----------------------------------------------------------------------------
"use client"
import { Shield, Target } from 'lucide-react';
import { Card, SectionTitle } from "./Helper";
import React, { useState, useEffect } from 'react';

// --- Style Definitions ---
const QUESTS_STYLES = {
    pageDescription: `
        mb-6 
        text-gray-600 dark:text-gray-400
    `,
    questsGrid: `
        grid 
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
        gap-6
    `,
    cardCompleted: `
        opacity-60 
        bg-gray-50 dark:bg-gray-800/50
    `,
    questTitle: `
        text-lg 
        font-bold 
        text-gray-900 dark:text-white
    `,
    pointsBadge: `
        bg-yellow-100 text-yellow-800 
        text-xs font-semibold 
        px-2.5 py-0.5 
        rounded-full 
        dark:bg-yellow-900 dark:text-yellow-300
    `,
    questDescription: `
        mt-2 
        text-sm 
        text-gray-600 dark:text-gray-400
    `,
    progressLabel: `
        text-sm 
        font-medium 
        text-gray-700 dark:text-gray-300
    `,
    progressBarContainer: `
        w-full 
        bg-gray-200 
        rounded-full 
        h-2.5 
        dark:bg-gray-700
    `,
    progressBarFill: `
        bg-blue-600 
        h-2.5 
        rounded-full
    `,
    completedBadge: `
        mt-4 
        flex items-center 
        text-green-600 dark:text-green-400
    `,
    completedLabel: `
        ml-2 
        text-sm 
        font-semibold
    `
};

// --- NEW: Skeleton Component for a single Quest Card ---
const QuestCardSkeleton = () => {
    return (
        <Card className="animate-pulse">
            <div className="flex justify-between items-start">
                {/* Title Placeholder */}
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                {/* Points Placeholder */}
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-full w-12"></div>
            </div>
            {/* Description Placeholder */}
            <div className="mt-3 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
            <div className="mt-5">
                <div className="flex justify-between mb-1">
                    {/* Progress Label Placeholder */}
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                    {/* Progress Percentage Placeholder */}
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/6"></div>
                </div>
                {/* Progress Bar Placeholder */}
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2.5"></div>
            </div>
        </Card>
    );
};


export const Quests = () => {
    const [quests, setQuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuests = async () => {
            try {
                // Simulate a slightly longer network request to see the skeleton
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const response = await fetch('http://localhost:9292/quests');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setQuests(data);
            } catch (e) {
                console.error("Failed to fetch quests:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuests();
    }, []);

    // --- UPDATED: Loading state now renders the skeleton grid ---
    if (loading) {
        return (
            <div>
                <SectionTitle icon={<Target className="h-6 w-6 text-indigo-500" />} title="Challenges & Quests" />
                <p className={QUESTS_STYLES.pageDescription}>Engage in challenges to earn points, unlock badges, and grow your skills.</p>
                <div className={QUESTS_STYLES.questsGrid}>
                    {/* Render a few skeleton cards to show the layout */}
                    <QuestCardSkeleton />
                    <QuestCardSkeleton />
                    <QuestCardSkeleton />
                </div>
            </div>
        );
    }

    if (error) {
        return (
             <div>
                <SectionTitle icon={<Target className="h-6 w-6 text-indigo-500" />} title="Challenges & Quests" />
                <p className="text-red-500">Could not load quests: {error}</p>
            </div>
        )
    }

    return (
        <div>
            <SectionTitle icon={<Target className="h-6 w-6 text-indigo-500" />} title="Challenges & Quests" />
            <p className={QUESTS_STYLES.pageDescription}>Engage in challenges to earn points, unlock badges, and grow your skills.</p>
            <div className={QUESTS_STYLES.questsGrid}>
                {quests.map(quest => (
                    <Card key={quest.id} className={quest.completed ? QUESTS_STYLES.cardCompleted : ''}>
                        <div className="flex justify-between items-start">
                            <h3 className={QUESTS_STYLES.questTitle}>{quest.title}</h3>
                            <span className={QUESTS_STYLES.pointsBadge}>{quest.points} PTS</span>
                        </div>
                        <p className={QUESTS_STYLES.questDescription}>{quest.description}</p>
                        <div className="mt-4">
                            <div className="flex justify-between mb-1">
                                <span className={QUESTS_STYLES.progressLabel}>Progress</span>
                                <span className={QUESTS_STYLES.progressLabel}>{quest.progress}%</span>
                            </div>
                            <div className={QUESTS_STYLES.progressBarContainer}>
                                <div className={QUESTS_STYLES.progressBarFill} style={{ width: `${quest.progress}%` }}></div>
                            </div>
                        </div>
                        {quest.completed && (
                            <div className={QUESTS_STYLES.completedBadge}>
                                <Shield className="h-5 w-5" />
                                <span className={QUESTS_STYLES.completedLabel}>Completed</span>
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

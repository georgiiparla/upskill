import { Shield, Target } from 'lucide-react';
import { Card, SectionTitle } from "./Helper";

import { MOCK_QUESTS } from "../mock/mock_data";

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


export const Quests = () => {
    return (
        <div>
            <SectionTitle icon={<Target className="h-6 w-6 text-indigo-500" />} title="Challenges & Quests" />

            <p className={QUESTS_STYLES.pageDescription}>Engage in challenges to earn points, unlock badges, and grow your skills.</p>

            <div className={QUESTS_STYLES.questsGrid}>
                {MOCK_QUESTS.map(quest => (
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
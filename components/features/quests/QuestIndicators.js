"use client";
import { motion } from 'framer-motion';

export const QuestIndicators = ({ quests, currentIndex, onIndicatorClick }) => {
    if (!quests || quests.length <= 1) return null;

    // Helper to determine the color based on Card Type + The "New Progress" Trick
    const getIndicatorColor = (quest) => {
        if (!quest) return '#64748b'; // Default Slate-500

        const isAlwaysType = quest.quest_type === 'always';
        const isCompleted = quest.user_completed ?? quest.completed;

        // The "Trick": Check for new progress (Confetti state)
        // This matches the logic in QuestCard.js and QuestCarousel.js
        // 1. Check backend flag 'has_new_progress'
        // 2. Check client-side timestamp 'last_triggered_at' (within 5 seconds)
        const isNewProgress = quest.has_new_progress || (
            quest.last_triggered_at &&
            (Date.now() - new Date(quest.last_triggered_at).getTime() < 5000)
        );

        // Logic for "Always" (Active/Blue-edged) Cards
        if (isAlwaysType) {
            // If the confetti/reward is active (The Trick), show Green
            if (isNewProgress) {
                return '#10b981'; // Emerald-500
            }
            // Otherwise, Always cards are "Active" (Blue) by default, ready to be done again.
            // They typically ignore the persistent 'isCompleted' status for styling.
            return '#3b82f6'; // Blue-500
        }

        // Logic for Standard (Interval-based) Cards
        // These use the standard Completion = Green, Incomplete = Gray pattern
        if (isCompleted) {
            return '#10b981'; // Emerald-500
        }

        return '#64748b'; // Slate-500 (Gray)
    };

    return (
        <div className="flex items-center gap-1.5 p-1.5 rounded-full transition-all duration-300 ">
            {quests.map((quest, index) => {
                const isActive = index === currentIndex;
                const indicatorColor = getIndicatorColor(quest);

                return (
                    <button
                        key={quest.id || index}
                        onClick={(e) => {
                            e.stopPropagation();
                            onIndicatorClick(index);
                        }}
                        className="relative group focus:outline-none p-1"
                        aria-label={`Go to quest ${index + 1}`}
                    >
                        <motion.div
                            initial={false}
                            animate={{
                                width: isActive ? 24 : 6,
                                backgroundColor: isActive
                                    ? 'var(--indicator-active)'
                                    : 'var(--indicator-inactive)',
                            }}
                            style={{
                                '--indicator-active': indicatorColor,
                                '--indicator-inactive': 'rgba(148, 163, 184, 0.4)',
                            }}
                            className="h-1.5 rounded-full transition-colors duration-300"
                        />
                    </button>
                );
            })}
        </div>
    );
};
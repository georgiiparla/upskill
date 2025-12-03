"use client";
import { motion } from 'framer-motion';

export const QuestIndicators = ({ quests, currentIndex, onIndicatorClick }) => {
    if (!quests || quests.length <= 1) return null;

    const getIndicatorColor = (quest) => {
        if (!quest) return '#64748b';

        const isAlwaysType = quest.quest_type === 'always';
        const isCompleted = quest.user_completed ?? quest.completed;

        // FIX: Use server-provided relative time check
        // We consider it "New Progress" if the backend flag is set OR if it happened recently
        const isRecentTrigger = quest.seconds_since_trigger !== null && quest.seconds_since_trigger < 10;

        const isNewProgress = quest.has_new_progress || isRecentTrigger;

        if (isAlwaysType) {
            if (isNewProgress) {
                return '#10b981'; // Emerald-500
            }
            return '#3b82f6'; // Blue-500
        }

        if (isCompleted) {
            return '#10b981';
        }

        return '#64748b'; // Slate-500
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
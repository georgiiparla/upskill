"use client";
import { motion } from 'framer-motion';

export const QuestIndicators = ({ quests, currentIndex, onIndicatorClick }) => {
    if (quests.length <= 1) return null;

    const currentQuest = quests[currentIndex];
    const isCompleted = currentQuest?.user_completed ?? currentQuest?.completed;
    const isInProgress = !isCompleted && ((currentQuest?.user_progress ?? 0) > 0 || currentQuest?.in_progress);

    // Determine outline styling based on quest status
    const getIndicatorStyle = () => {
        if (isCompleted) {
            return "bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300";
        } else if (isInProgress) {
            return "bg-sky-50/50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300";
        } else {
            return "bg-slate-50/50 dark:bg-slate-900/20 text-slate-700 dark:text-slate-300";
        }
    };

    const getHoverStyle = () => {
        if (isCompleted) {
            return {
                scale: 1.05,
                backgroundColor: "rgba(16,185,129,0.15)"
            };
        } else if (isInProgress) {
            return {
                scale: 1.05,
                backgroundColor: "rgba(14,165,233,0.15)"
            };
        } else {
            return {
                scale: 1.05,
                backgroundColor: "rgba(100,116,139,0.15)"
            };
        }
    };

    return (
        <div className="flex justify-center">
            <motion.div
                className={`cursor-pointer px-2 py-0.5 md:px-3 md:py-1 backdrop-blur-sm rounded-full font-mono transition-all shadow-sm ${getIndicatorStyle()}`}
                onClick={() => onIndicatorClick(currentIndex)}
                whileHover={getHoverStyle()}
                whileTap={{ scale: 0.95 }}
                aria-label={`Quest ${currentIndex + 1} of ${quests.length}: ${currentQuest?.title}`}
            >
                <span className="text-xs md:text-sm font-medium">
                    {currentIndex + 1}/{quests.length}
                </span>
            </motion.div>
        </div>
    );
};

"use client";
import { motion } from 'framer-motion';

export const QuestIndicators = ({ quests, currentIndex, onIndicatorClick }) => {
    if (quests.length <= 1) return null;

    return (
        <div className="flex justify-center space-x-6 mt-12">
            {quests.map((quest, index) => (
                <div key={index} className="flex flex-col items-center">
                    <motion.div
                        className="cursor-pointer relative"
                        onClick={() => onIndicatorClick(index)}
                        whileHover={{
                            scale: 1.15,
                            rotate: [0, -5, 5, 0],
                            transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Go to quest ${index + 1}: ${quest.title}`}
                    >
                        {/* Glow effect on hover */}
                        <motion.div
                            className={`absolute inset-0 rounded-full opacity-0 blur-sm ${
                                quest.completed
                                    ? 'bg-emerald-500/30'
                                    : quest.in_progress
                                    ? 'bg-sky-500/30'
                                    : 'bg-slate-400/20'
                            }`}
                            whileHover={{
                                opacity: 1,
                                scale: 1.5,
                                transition: { duration: 0.2 }
                            }}
                        />

                        {quest.completed ? (
                            <div className="w-4 h-4 rounded-full bg-transparent border-2 border-emerald-500 dark:border-emerald-400 shadow-lg shadow-emerald-500/40 relative z-10" />
                        ) : quest.in_progress ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="relative z-10"
                            >
                                <div className="w-4 h-4 rounded-full bg-transparent border-2 border-sky-500 dark:border-sky-400 shadow-lg shadow-sky-500/40" />
                            </motion.div>
                        ) : (
                            <motion.div
                                animate={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10"
                            >
                                <div className="w-4 h-4 rounded-full bg-transparent border-2 border-slate-500 dark:border-slate-400 shadow-lg shadow-slate-500/30" />
                            </motion.div>
                        )}
                    </motion.div>
                    {index === currentIndex && (
                        <motion.div
                            className={`h-0.5 mt-1 rounded-full ${
                                quest.completed
                                    ? 'bg-emerald-600 dark:bg-emerald-500'
                                    : quest.in_progress
                                    ? 'bg-sky-500 dark:bg-sky-400'
                                    : 'bg-slate-500 dark:bg-slate-400'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from "../../shared/helpers/Helper";
import { Confetti } from "./Confetti";
import { QuestIndicators } from "./QuestIndicators";
import { PointsBadge } from "./PointsBadge";

export const QuestCard = ({
    quest,
    showConfetti,
    direction,
    onDragEnd,
    quests,
    currentIndex,
    onIndicatorClick,
    isCompleted,
    isInProgress
}) => {
    const [showConfettiOnTrigger, setShowConfettiOnTrigger] = useState(false);

    const isAlwaysType = quest?.quest_type === 'always';

    useEffect(() => {
        // For always-type quests, show confetti only if the quest was just triggered
        // (last_triggered_at is very recent, indicating user just completed an action)
        if (isAlwaysType && quest?.last_triggered_at) {
            const lastTriggeredTime = new Date(quest.last_triggered_at).getTime();
            const currentTime = Date.now();
            const timeDiffMs = currentTime - lastTriggeredTime;
            
            // Show confetti only if triggered within the last 5 seconds (and not a future timestamp)
            if (timeDiffMs >= 0 && timeDiffMs < 5000) {
                setShowConfettiOnTrigger(true);
                
                // Auto-hide confetti after animation
                const timer = setTimeout(() => setShowConfettiOnTrigger(false), 2000);
                return () => clearTimeout(timer);
            }
        }
    }, [quest?.last_triggered_at, isAlwaysType]);

    // Animation variants for quest card transitions
    const questVariants = {
        enter: (enterDirection) => ({
            opacity: 0,
            x: (enterDirection === 0) ? 0 : ((enterDirection > 0) ? 120 : -120),
            scale: 0.9,
            rotateY: (enterDirection === 0) ? 0 : ((enterDirection > 0) ? -15 : 15)
        }),
        center: {
            opacity: 1,
            x: 0,
            scale: 1,
            rotateY: 0
        },
        exit: (exitDirection) => ({
            opacity: 0,
            x: (exitDirection === 0) ? 0 : ((exitDirection > 0) ? -120 : 120),
            scale: 0.9,
            rotateY: (exitDirection === 0) ? 0 : ((exitDirection > 0) ? 15 : -15),
            transition: {
                duration: 0.2
            }
        })
    };

    // Determine card styling based on quest status and type
    const completed = isCompleted ?? quest?.completed;
    const inProgress = isInProgress ?? quest?.in_progress;

    const getCardStyles = () => {
        // Always-type quests: always purple
        if (isAlwaysType) {
            return 'bg-gradient-to-br from-violet-50/60 via-purple-50/40 to-indigo-50/80 dark:from-violet-900/20 dark:via-purple-900/10 dark:to-indigo-900/30 border-violet-300/60 dark:border-violet-700/60 shadow-lg shadow-violet-500/20';
        }
        
        // Interval-based quests original styling
        if (completed) {
            return 'bg-gradient-to-br from-emerald-50/60 via-yellow-50/40 to-green-50/80 dark:from-emerald-900/20 dark:via-yellow-900/10 dark:to-green-900/30 border-emerald-300/60 dark:border-emerald-700/60 shadow-lg shadow-emerald-500/20';
        } else if (inProgress) {
            return 'bg-gradient-to-br from-sky-50/60 via-purple-50/40 to-blue-50/80 dark:from-sky-900/20 dark:via-purple-900/10 dark:to-blue-900/30 border-sky-300/60 dark:border-sky-700/60 shadow-lg shadow-purple-500/20';
        } else {
            return 'bg-gradient-to-br from-slate-50/60 via-pink-50/40 to-gray-50/80 dark:from-slate-900/20 dark:via-pink-900/10 dark:to-gray-900/30 border-slate-300/60 dark:border-slate-700/60 shadow-lg shadow-pink-500/20';
        }
    };

    const getTextColors = () => {
        // Always-type quests: violet text
        if (isAlwaysType) {
            return {
                title: 'text-violet-900 dark:text-violet-100',
                description: 'text-violet-700 dark:text-violet-300'
            };
        }
        
        // Completed quests: emerald text
        if (completed) {
            return {
                title: 'text-emerald-900 dark:text-emerald-100',
                description: 'text-emerald-700 dark:text-emerald-300'
            };
        }
        
        // In-progress quests: sky text
        if (inProgress) {
            return {
                title: 'text-sky-900 dark:text-sky-100',
                description: 'text-sky-700 dark:text-sky-300'
            };
        }
        
        // Default: slate text
        return {
            title: 'text-slate-900 dark:text-slate-100',
            description: 'text-slate-700 dark:text-slate-300'
        };
    };

    return (
        <motion.div
            variants={questVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8
            }}
            className="relative cursor-grab active:cursor-grabbing"
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            whileDrag={{
                scale: 1.05,
                rotateY: 5,
                zIndex: 10
            }}
            onDragEnd={onDragEnd}
        >
            <Card variant="custom" className={`group transition-all duration-300 relative min-h-[320px] md:min-h-[400px] max-h-[400px] md:max-h-[500px] flex flex-col w-full overflow-hidden ${getCardStyles()}`}>
                {/* Confetti overlay for completed quests and triggered always-quests */}
                <Confetti isActive={showConfetti || showConfettiOnTrigger} color={isAlwaysType ? 'purple' : undefined} />

                {/* Quest Position Indicator - Top Right Corner */}
                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20">
                    <QuestIndicators
                        quests={quests}
                        currentIndex={currentIndex}
                        onIndicatorClick={onIndicatorClick}
                    />
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-8 py-4 md:py-6 relative z-10">
                    <div className="space-y-4 md:space-y-6 max-w-3xl w-full">
                    {/* Quest title with playful animation */}
                        <motion.h2
                            className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-tight font-mono ${getTextColors().title}`}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {quest.title}
                        </motion.h2>

                        {/* Quest description */}
                        <motion.p
                            className={`text-base md:text-lg lg:text-xl leading-relaxed font-mono ${getTextColors().description}`}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {quest.description}
                        </motion.p>

                        {/* Points Display - Enhanced */}
                        <PointsBadge
                            points={quest.points}
                            status={completed ? "completed" : isAlwaysType ? "always" : inProgress ? "in_progress" : "default"}
                            isAlwaysType={isAlwaysType}
                        />
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

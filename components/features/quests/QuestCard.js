"use client";
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/Shared";
import { Confetti } from "@/registry/magicui/Confetti";
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


    const confettiRef = useRef(null);

    const isAlwaysType = quest?.quest_type === 'always';



    useEffect(() => {
        if (showConfetti) {
            confettiRef.current?.fire({
                colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
            });
        }
    }, [showConfetti]);

    const isNewProgress = quest?.has_new_progress;

    const questVariants = {
        enter: (d) => ({ opacity: 0, x: d > 0 ? 120 : -120, scale: 0.95 }),
        center: { opacity: 1, x: 0, scale: 1 },
        exit: (d) => ({ opacity: 0, x: d > 0 ? -120 : 120, scale: 0.95 })
    };

    const completed = isCompleted ?? quest?.completed;
    const inProgress = isInProgress ?? quest?.in_progress;

    const getCardStyles = () => {
        if (isNewProgress) return 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200/50 dark:border-emerald-800/50';
        if (isAlwaysType) return 'bg-white/80 dark:bg-slate-900/80 border-slate-200/60 dark:border-slate-800/60 shadow-sm backdrop-blur-md';
        if (completed) return 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200/50 dark:border-emerald-800/50';
        if (inProgress) return 'bg-sky-50/50 dark:bg-sky-900/10 border-sky-200/50 dark:border-sky-800/50';
        return 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800';
    };

    return (
        <motion.div
            variants={questVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative cursor-grab active:cursor-grabbing w-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={onDragEnd}
        >
            <Card variant="custom" className={`group relative min-h-[320px] flex flex-col w-full overflow-hidden transition-colors duration-500 ${getCardStyles()}`}>



                <Confetti
                    ref={confettiRef}
                    className="absolute inset-0 z-30 pointer-events-none w-full h-full"
                    manualstart={true}
                />

                <div className="relative z-10 flex flex-col w-full h-full p-6 md:p-8">

                    <div className="w-full flex justify-center mb-8">
                        <QuestIndicators
                            quests={quests}
                            currentIndex={currentIndex}
                            onIndicatorClick={onIndicatorClick}
                        />
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                        <motion.h2
                            layoutId={`title-${quest.id}`}
                            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
                        >
                            {quest.title}
                        </motion.h2>

                        <motion.p
                            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-light"
                        >
                            {quest.description}
                        </motion.p>

                        <div className="pt-4">
                            <PointsBadge
                                points={quest.points}
                                status={completed ? "completed" : inProgress ? "in_progress" : "default"}
                                isAlwaysType={isAlwaysType}
                                isNewProgress={isNewProgress}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};
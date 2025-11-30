"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from "../../shared/helpers/Helper";
import { Confetti } from "./Confetti";
import { QuestIndicators } from "./QuestIndicators";
import { PointsBadge } from "./PointsBadge";

// --- Samsung-Style "Pending" Edge Lighting ---
// Updated to accept isNewProgress to toggle colors
const EdgeLighting = ({ isActive, isNewProgress }) => {
    if (!isActive) return null;

    // Default: Blue/Purple blend for "Ready/Pending" state
    const defaultGradient = `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 200deg, #a855f7 300deg, #3b82f6 340deg, transparent 360deg)`;

    // Success: Emerald/Green blend for "Just Completed" state
    const successGradient = `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 200deg, #34d399 300deg, #10b981 340deg, transparent 360deg)`;

    // Switch gradient based on the "trick" state
    const gradientColors = isNewProgress ? successGradient : defaultGradient;

    return (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-xl pointer-events-none">
            {/* CONE FIX: mask-composite excludes the content-box from the mask */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    padding: '2px', // Ultra-thin, elegant border
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                }}
            >
                {/* Slow, calm rotation (8s) */}
                <motion.div
                    className="absolute inset-[-100%] top-[-100%]"
                    style={{ background: gradientColors }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 8,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />

                {/* Blur layer for the "Glow" effect */}
                <motion.div
                    className="absolute inset-[-100%] top-[-100%] blur-lg"
                    style={{ background: gradientColors, opacity: 0.6 }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 8,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />
            </div>
        </div>
    );
};

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
    const isAlwaysType = quest?.quest_type === 'always'; //

    // Logic to detect "Just Triggered" state matching Confetti logic
    useEffect(() => {
        if (isAlwaysType && quest?.last_triggered_at) {
            const lastTriggeredTime = new Date(quest.last_triggered_at).getTime();
            const currentTime = Date.now();
            // 5 second window to consider it "new" on the client side
            if (currentTime - lastTriggeredTime < 5000) {
                setShowConfettiOnTrigger(true);
                const timer = setTimeout(() => setShowConfettiOnTrigger(false), 2000);
                return () => clearTimeout(timer);
            }
        }
    }, [quest?.last_triggered_at, isAlwaysType]);

    // Mirroring Confetti logic: Use backend flag OR local trigger
    const isNewProgress = quest?.has_new_progress || showConfettiOnTrigger;

    const questVariants = {
        enter: (d) => ({ opacity: 0, x: d > 0 ? 120 : -120, scale: 0.95 }),
        center: { opacity: 1, x: 0, scale: 1 },
        exit: (d) => ({ opacity: 0, x: d > 0 ? -120 : 120, scale: 0.95 })
    };

    const completed = isCompleted ?? quest?.completed; //
    const inProgress = isInProgress ?? quest?.in_progress; //

    // Minimalist Card Styles
    const getCardStyles = () => {
        if (isAlwaysType) return 'bg-white/80 dark:bg-slate-900/80 border-slate-200/60 dark:border-slate-800/60 shadow-sm backdrop-blur-md'; //
        if (completed) return 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200/50 dark:border-emerald-800/50'; //
        if (inProgress) return 'bg-sky-50/50 dark:bg-sky-900/10 border-sky-200/50 dark:border-sky-800/50'; //
        return 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800'; //
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

                {/* Apply Glow ONLY to Always type cards, passing the dynamic state */}
                <EdgeLighting isActive={isAlwaysType} isNewProgress={isNewProgress} />

                <Confetti isActive={showConfetti || showConfettiOnTrigger} color={isAlwaysType ? 'default' : undefined} />

                {/* Content Layer (z-10 sits above the mask/glow) */}
                <div className="relative z-10 flex flex-col w-full h-full p-6 md:p-8">

                    {/* Top Row: Transparent Glass Indicators */}
                    <div className="w-full flex justify-center mb-8">
                        <QuestIndicators
                            quests={quests}
                            currentIndex={currentIndex}
                            onIndicatorClick={onIndicatorClick}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                        <motion.h2
                            layoutId={`title-${quest.id}`}
                            className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
                        >
                            {quest.title}
                        </motion.h2>

                        <motion.p
                            className="text-base text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-light"
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
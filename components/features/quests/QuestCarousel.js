"use client";
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { QuestCard } from "./QuestCard";

export const QuestCarousel = ({ quests }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState(null);

    const swipeThreshold = 80;

    useEffect(() => {
        const currentQuest = quests[currentIndex];
        if (!currentQuest) return;

        const isAlwaysType = currentQuest?.quest_type === 'always';
        const isCompleted = currentQuest?.user_completed ?? currentQuest?.completed;
        const hasNewProgress = currentQuest?.has_new_progress;

        if (isAlwaysType && hasNewProgress) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }

        // For interval-based quests: show confetti when completed
        if (!isAlwaysType && isCompleted) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }

        setShowConfetti(false);
    }, [currentIndex, quests]);

    // Execute pending navigation after direction update
    useEffect(() => {
        if (pendingNavigation) {
            pendingNavigation();
            setPendingNavigation(null);
        }
    }, [direction, pendingNavigation]);

    const paginate = (step) => {
        if (!quests.length) return;
        setCurrentIndex((prev) => (prev + step + quests.length) % quests.length);
    };

    const nextQuest = () => {
        paginate(1);
    };

    const prevQuest = () => {
        paginate(-1);
    };

    const handleDragEnd = (event, info) => {
        if (Math.abs(info.offset.x) > swipeThreshold) {
            const dragDirection = info.offset.x > 0 ? -1 : 1;
            setDirection(dragDirection);
            setPendingNavigation(() => () => {
                if (info.offset.x > 0) {
                    prevQuest();
                } else {
                    nextQuest();
                }
            });
        }
    };

    const currentQuest = quests[currentIndex];

    const isCompleted = currentQuest?.user_completed ?? currentQuest?.completed;
    const isInProgress = !isCompleted && ((currentQuest?.user_progress ?? 0) > 0);

    if (!currentQuest) {
        return null;
    }

    return (
        <div className="relative w-full">
            <AnimatePresence mode="wait">
                <QuestCard
                    key={currentIndex}
                    quest={currentQuest}
                    showConfetti={showConfetti}
                    direction={direction}
                    onDragEnd={handleDragEnd}
                    quests={quests}
                    currentIndex={currentIndex}
                    onIndicatorClick={setCurrentIndex}
                    isCompleted={isCompleted}
                    isInProgress={isInProgress}
                />
            </AnimatePresence>
        </div>
    );
};

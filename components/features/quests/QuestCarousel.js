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

    // Trigger confetti when quest is completed
    useEffect(() => {
        const currentQuest = quests[currentIndex];
        const isCompleted = currentQuest?.user_completed ?? currentQuest?.completed;

        if (isCompleted) {
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
            {/* Main Quest Card with Touch/Click Navigation */}
            <AnimatePresence mode="wait">
                <QuestCard
                    key={currentIndex}
                    quest={currentQuest}
                    showConfetti={showConfetti && isCompleted}
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

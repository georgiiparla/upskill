"use client";
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { QuestCard } from "./QuestCard";
import { QuestIndicators } from "./QuestIndicators";

export const QuestCarousel = ({ quests }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const swipeThreshold = 80;

    // Trigger confetti when quest is completed
    useEffect(() => {
        const currentQuest = quests[currentIndex];
        if (currentQuest?.completed) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, quests]);

    const paginate = (step) => {
        if (!quests.length) return;
        setDirection(step);
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
            if (info.offset.x > 0) {
                prevQuest();
            } else {
                nextQuest();
            }
        }
    };

    const currentQuest = quests[currentIndex];

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
                    showConfetti={showConfetti}
                    direction={direction}
                    onDragEnd={handleDragEnd}
                />
            </AnimatePresence>

            {/* Position Indicators */}
            <QuestIndicators
                quests={quests}
                currentIndex={currentIndex}
                onIndicatorClick={setCurrentIndex}
            />
        </div>
    );
};

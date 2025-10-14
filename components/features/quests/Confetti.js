"use client";
import { motion } from 'framer-motion';

// Confetti component for celebrations
export const Confetti = ({ isActive }) => {
    if (!isActive) return null;

    const confettiItems = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][i % 6],
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confettiItems.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                        backgroundColor: item.color,
                        left: item.left,
                        top: '-10px',
                    }}
                    initial={{ y: -10, rotate: 0 }}
                    animate={{
                        y: window.innerHeight + 10,
                        rotate: 360,
                        x: [0, Math.random() * 100 - 50, 0]
                    }}
                    transition={{
                        duration: item.duration,
                        delay: item.delay,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    );
};

"use client";
import { motion } from 'framer-motion';

// Confetti component for celebrations
export const Confetti = ({ isActive, color = 'default' }) => {
    if (!isActive) return null;

    const colorPalettes = {
        default: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
        purple: ['#A78BFA', '#C084FC', '#D8B4FE', '#E9D5FF', '#B794F6', '#9F7AEA']
    };

    const palette = colorPalettes[color] || colorPalettes.default;

    const confettiItems = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        color: palette[i % palette.length],
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
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
                        y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
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

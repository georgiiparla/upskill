"use client";
import { motion } from 'framer-motion';
import { Star, Sparkles, Zap, Trophy } from 'lucide-react';

// Floating decorative elements
export const FloatingDecorations = () => {
    const decorations = [
        { icon: Star, color: 'text-yellow-400', size: 'w-4 h-4', delay: 0 },
        { icon: Sparkles, color: 'text-purple-400', size: 'w-5 h-5', delay: 1 },
        { icon: Zap, color: 'text-blue-400', size: 'w-3 h-3', delay: 2 },
        { icon: Trophy, color: 'text-orange-400', size: 'w-4 h-4', delay: 0.5 },
    ];

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {decorations.map((decoration, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${decoration.color} opacity-20`}
                    initial={{ y: '100vh', x: `${Math.random() * 100}%` }}
                    animate={{
                        y: '-10vh',
                        rotate: 360,
                    }}
                    transition={{
                        duration: 8,
                        delay: decoration.delay,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <decoration.icon className={decoration.size} />
                </motion.div>
            ))}
        </div>
    );
};

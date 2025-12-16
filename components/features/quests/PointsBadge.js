"use client";
import { motion } from 'framer-motion';
import { Repeat, Check, Flame, Sparkles, Clock } from 'lucide-react';

export const PointsBadge = ({
    points,
    status,
    isAlwaysType = false,
    isNewProgress = false
}) => {

    // Determine configuration based on State + Type
    const getConfig = () => {
        // CASE 1: Always Type Quests (Pending/Recurring)
        if (isAlwaysType) {
            // STATE: Just Completed / New Progress (Mirrors Confetti)
            // Shows Green Tick only momentarily or on first view of completion
            if (isNewProgress) {
                return {
                    icon: <Check className="w-3.5 h-3.5" />,
                    style: 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-900/20',
                    text: `${points} PTS`
                };
            }
            // STATE: Pending / Refresh (Default for Always)
            // Reverts to Gray to indicate it can be done again
            return {
                icon: <Repeat className="w-3.5 h-3.5" />,
                style: 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20',
                text: `${points} PTS`
            };
        }

        // CASE 2: Standard Interval Quests
        if (status === 'completed') {
            return {
                icon: <Check className="w-3.5 h-3.5" />,
                style: 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-900/20',
                text: 'COMPLETED'
            };
        }

        // Default / Implicit
        return {
            icon: <Clock className="w-3.5 h-3.5" />,
            style: 'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30',
            text: `${points} PTS`
        };
    };

    const config = getConfig();

    return (
        <motion.div
            key={`${isAlwaysType}-${isNewProgress}-${status}`} // Key triggers re-animation on state change
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`
                inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-sm
                text-xs font-semibold tracking-wider transition-colors duration-500
                ${config.style}
            `}
        >
            {config.icon}
            <span>{config.text}</span>
        </motion.div>
    );
};
"use client";
import { motion } from 'framer-motion';
// [!] Swapping Lucide for Tabler
import { IconRepeat, IconCheck, IconClock } from '@tabler/icons-react';

export const PointsBadge = ({
    points,
    status,
    isAlwaysType = false,
    isNewProgress = false
}) => {
    const getConfig = () => {
        if (isAlwaysType) {
            if (isNewProgress) {
                return {
                    icon: <IconCheck className="w-4 h-4" stroke={2} />,
                    style: 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-900/20',
                    text: `${points} PTS`
                };
            }
            return {
                icon: <IconRepeat className="w-4 h-4" stroke={2} />,
                style: 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20',
                text: `${points} PTS`
            };
        }
        if (status === 'completed') {
            return {
                icon: <IconCheck className="w-4 h-4" stroke={2} />,
                style: 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-900/20',
                text: 'COMPLETED'
            };
        }
        return {
            icon: <IconClock className="w-4 h-4" stroke={2} />,
            style: 'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30',
            text: `${points} PTS`
        };
    };

    const config = getConfig();

    return (
        <motion.div
            key={`${isAlwaysType}-${isNewProgress}-${status}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`
                inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-sm
                text-sm font-semibold tracking-wider transition-colors duration-500
                ${config.style}
            `}
        >
            {config.icon}
            <span>{config.text}</span>
        </motion.div>
    );
};
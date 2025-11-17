"use client";
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Infinity } from 'lucide-react';

export const PointsBadge = ({
    points,
    status,
    size = "default",
    showIcon = true,
    className = "",
    isAlwaysType = false
}) => {
    // Determine styling based on quest status
    const getBadgeStyles = () => {
        const baseStyles = "inline-flex items-center gap-3 rounded-lg font-bold shadow-lg text-black dark:text-white";

        const sizeStyles = {
            small: "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm",
            default: "px-4 py-2 text-xs sm:px-6 sm:py-3 sm:text-base",
            large: "px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-lg"
        };

        // For always-type quests, always use purple regardless of completion state
        if (isAlwaysType) {
            return `${baseStyles} ${sizeStyles[size] || sizeStyles.default} bg-violet-50/70 dark:bg-violet-900/30 border border-violet-200/50 dark:border-violet-700/50 shadow-violet-600/20 backdrop-blur-sm`;
        }

        const statusStyles = {
            completed: "bg-emerald-50/70 dark:bg-emerald-900/30 border border-emerald-200/50 dark:border-emerald-700/50 shadow-emerald-600/20 backdrop-blur-sm",
            in_progress: "bg-sky-50/70 dark:bg-sky-900/30 border border-sky-200/50 dark:border-sky-700/50 shadow-sky-500/20 backdrop-blur-sm",
            default: "bg-slate-50/70 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-700/50 shadow-slate-500/20 backdrop-blur-sm"
        };

        return `${baseStyles} ${sizeStyles[size] || sizeStyles.default} ${statusStyles[status] || statusStyles.default}`;
    };

    // Determine icon based on quest status
    const renderIcon = () => {
        if (!showIcon) return null;

        const iconSize = size === "small" ? "h-3 w-3 sm:h-4 sm:w-4" : size === "large" ? "h-5 w-5 sm:h-6 sm:w-6" : "h-4 w-4 sm:h-5 sm:w-5";

        // Always-type quest icon
        if (isAlwaysType) {
            return (
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Infinity className={iconSize} />
                </motion.div>
            );
        }

        if (status === "completed") {
            return <CheckCircle2 className={iconSize} />;
        } else if (status === "in_progress") {
            return (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <Clock className={iconSize} />
                </motion.div>
            );
        } else {
            return (
                <motion.div
                    animate={{ rotate: [0, -20, 20, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Clock className={iconSize} />
                </motion.div>
            );
        }
    };

    return (
        <motion.div
            className={`pt-4 ${className}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
        >
            <div className={getBadgeStyles()}>
                {renderIcon()}
                <span className={`font-mono ${size === "small" ? "text-xs sm:text-sm" : size === "large" ? "text-sm sm:text-lg" : "text-xs sm:text-base"}`}>
                    {status === "completed" ? "" : "+"}{points} pts
                </span>
            </div>
        </motion.div>
    );
};

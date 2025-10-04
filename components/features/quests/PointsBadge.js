"use client";
import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';

export const PointsBadge = ({
    points,
    status,
    size = "default",
    showIcon = true,
    className = ""
}) => {
    // Determine styling based on quest status
    const getBadgeStyles = () => {
        const baseStyles = "inline-flex items-center gap-3 rounded-full font-bold shadow-lg";

        const sizeStyles = {
            small: "px-4 py-2 text-sm sm:px-4 sm:py-2 sm:text-sm",
            default: "px-6 py-3 text-sm sm:px-6 sm:py-3 sm:text-base",
            large: "px-8 py-4 text-base sm:px-8 sm:py-4 sm:text-lg"
        };

        const statusStyles = {
            completed: "bg-emerald-600 text-white border border-emerald-400/50 shadow-emerald-600/30",
            in_progress: "bg-gradient-to-r from-sky-400 to-blue-500 text-white border border-sky-300/50 shadow-sky-500/30",
            default: "bg-slate-500 text-white border border-slate-300/50 shadow-slate-500/30"
        };

        return `${baseStyles} ${sizeStyles[size] || sizeStyles.default} ${statusStyles[status] || statusStyles.default}`;
    };

    // Determine icon based on quest status
    const renderIcon = () => {
        if (!showIcon) return null;

        const iconSize = size === "small" ? "h-4 w-4 sm:h-4 sm:w-4" : size === "large" ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5 sm:h-5 sm:w-5";

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
                <span className={`font-mono ${size === "small" ? "text-sm sm:text-sm" : size === "large" ? "text-base sm:text-lg" : "text-sm sm:text-base"}`}>
                    {status === "completed" ? "" : "+"}{points} pts
                </span>
            </div>
        </motion.div>
    );
};

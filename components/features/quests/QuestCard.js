"use client";
import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';
import { Card } from "../../shared/helpers/Helper";
import { Confetti } from "./Confetti";

export const QuestCard = ({ quest, showConfetti, onDragEnd, onQuestComplete }) => {
    const questVariants = {
        enter: (enterDirection) => ({
            opacity: 0,
            x: enterDirection === 0 ? 0 : enterDirection > 0 ? 120 : -120,
            scale: 0.9,
            rotateY: enterDirection === 0 ? 0 : enterDirection > 0 ? -15 : 15
        }),
        center: {
            opacity: 1,
            x: 0,
            scale: 1,
            rotateY: 0
        },
        exit: (exitDirection) => ({
            opacity: 0,
            x: exitDirection === 0 ? 0 : exitDirection > 0 ? -120 : 120,
            scale: 0.9,
            rotateY: exitDirection === 0 ? 0 : exitDirection > 0 ? 15 : -15,
            transition: {
                duration: 0.2
            }
        })
    };

    return (
        <motion.div
            variants={questVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8
            }}
            className="relative cursor-grab active:cursor-grabbing"
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            whileDrag={{
                scale: 1.05,
                rotateY: 5,
                zIndex: 10
            }}
            onDragEnd={onDragEnd}
        >
            <Card variant="custom" className={`group transition-all duration-300 relative min-h-[400px] max-h-[500px] flex flex-col mx-auto max-w-5xl overflow-hidden ${
                quest.completed
                    ? 'bg-gradient-to-br from-emerald-50/60 via-yellow-50/40 to-green-50/80 dark:from-emerald-900/20 dark:via-yellow-900/10 dark:to-green-900/30 border-emerald-300/60 dark:border-emerald-700/60 shadow-lg shadow-emerald-500/20'
                    : quest.in_progress
                    ? 'bg-gradient-to-br from-sky-50/60 via-purple-50/40 to-blue-50/80 dark:from-sky-900/20 dark:via-purple-900/10 dark:to-blue-900/30 border-sky-300/60 dark:border-sky-700/60 shadow-lg shadow-purple-500/20'
                    : 'bg-gradient-to-br from-slate-50/60 via-pink-50/40 to-gray-50/80 dark:from-slate-900/20 dark:via-pink-900/10 dark:to-gray-900/30 border-slate-300/60 dark:border-slate-700/60 shadow-lg shadow-pink-500/20'
            }`}>
                {/* Confetti overlay */}
                <Confetti isActive={showConfetti && quest.completed} />

                <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-6 relative z-10">
                    <div className="space-y-6 max-w-3xl w-full">
                        {/* Quest title with playful animation */}
                        <motion.h2
                            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight font-['Poppins']"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {quest.title}
                        </motion.h2>

                        {/* Quest description */}
                        <motion.p
                            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-['Poppins']"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {quest.description}
                        </motion.p>

                        {/* Points Display - Enhanced */}
                        <motion.div
                            className="pt-4"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold shadow-lg ${
                                quest.completed
                                    ? 'bg-emerald-600 text-white border border-emerald-400/50 shadow-emerald-600/30'
                                    : quest.in_progress
                                    ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white border border-sky-300/50 shadow-sky-500/30'
                                    : 'bg-slate-500 text-white border border-slate-300/50 shadow-slate-500/30'
                            }`}>
                                {quest.completed ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                ) : quest.in_progress ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Clock className="h-5 w-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        animate={{ rotate: [0, -20, 20, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Clock className="h-5 w-5" />
                                    </motion.div>
                                )}
                                <span className="text-lg font-['Poppins']">+{quest.points} pts</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

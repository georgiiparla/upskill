"use client";
import { Target, CheckCircle2, Clock, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from "../../shared/helpers/Helper";
import { HeroHeader } from "../../shared/helpers/HeroHeader";
import { questContainerVariants, questItemVariants } from './animations';

export const Quests = ({ initialQuests }) => {
    return (
        <div className="space-y-6">
            {/* Hero Section Header */}
            <HeroHeader
                icon={Target}
                title="Challenges"
                subtitle="Choose the favorite one and start completing"
                iconBg="from-blue-500 to-blue-600"
            />

            {/* Animated Quest Grid */}
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                variants={questContainerVariants}
                initial="hidden"
                animate="visible"
            >
                {initialQuests.map(quest => (
                    <motion.div key={quest.id} variants={questItemVariants}>
                        <Card
                            className={`group transition-all duration-200 hover:shadow-md relative min-h-[200px] max-h-[280px] flex flex-col ${quest.completed ? 'bg-green-50/30 dark:bg-green-900/5 border-green-200/30 dark:border-green-800/30' : 'hover:bg-gray-50/30 dark:hover:bg-gray-800/20'}`}
                        >
                            {/* Transparent Play Button in top-right corner */}
                            {!quest.completed && (
                                <div className="absolute top-4 right-4">
                                    <button className="flex items-center justify-center w-8 h-8 bg-transparent hover:bg-blue-500 dark:hover:bg-blue-500 text-blue-600 dark:text-blue-400 hover:text-white border border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-600 rounded-lg transition-all duration-200">
                                        <Play className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            <div className="space-y-6 flex-1 flex flex-col justify-between">
                                {/* Enhanced Header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white truncate mb-1 leading-tight">
                                            {quest.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Clean Description */}
                                <div className="flex-1 min-h-0">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm overflow-hidden">
                                        {quest.description}
                                    </p>
                                </div>

                                {/* Action Area */}
                                {quest.completed ? (
                                    /* Completed State */
                                    <div className="flex items-center gap-2 py-2 px-3 bg-green-50 dark:bg-green-900/10 rounded-md border border-green-200/50 dark:border-green-800/50">
                                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        <span className="text-green-700 dark:text-green-300 font-medium text-sm">Completed (+{quest.points} pts)</span>
                                    </div>
                                ) : (
                                    /* Available State */
                                    <div className="flex items-center justify-between py-2 px-3 bg-blue-50 dark:bg-blue-900/10 rounded-md border border-blue-200/50 dark:border-blue-800/50">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">Available to start</span>
                                        </div>
                                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                                            +{quest.points} pts
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Minimal Empty State */}
            {initialQuests.length === 0 && (
                <Card className="text-center py-12 min-h-[200px] flex items-center justify-center">
                    <div className="space-y-4">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                            <Target className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">No quests available</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Check back later for new challenges.</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};
"use client";
import { Shield, Target } from 'lucide-react';
import { Card, SectionTitle } from "../../shared/helpers/Helper";

export const Quests = ({ initialQuests }) => {
    return (
        <div>
            <SectionTitle icon={<Target className="h-6 w-6 text-csway-orange" />} title="Challenges & Quests" />
            <p className="mb-6 text-gray-600 dark:text-gray-400">Engage in challenges to earn points, unlock badges, and grow your skills.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialQuests.map(quest => (
                    <Card key={quest.id} className={quest.completed ? 'opacity-60 bg-gray-50 dark:bg-gray-800/50' : ''}>
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{quest.title}</h3>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">{quest.points} PTS</span>
                        </div>
                        
                        
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{quest.description}</p>
                        
                        <div className="mt-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{quest.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-csway-green h-2.5 rounded-full" style={{ width: `${quest.progress}%` }}></div>
                            </div>
                        </div>
                        {quest.completed && (
                            <div className="mt-4 flex items-center text-green-600 dark:text-green-400">
                                <Shield className="h-5 w-5" />
                                <span className="ml-2 text-sm font-semibold">Completed</span>
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};
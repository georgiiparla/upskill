"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { getRankColors } from './utils';
import { leaderboardItemVariantsFadeUp } from './animations';
import { Avatar } from '@/components/core/ui/Avatar';

export const LeaderboardItem = ({ user, maxPoints, isDesktop = true }) => {
    const barWidth = `${Math.max((user.points / maxPoints) * 100, 8)}%`;

    if (isDesktop) {
        return (
            <motion.div
                key={user.id}
                className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transition-all duration-300 hover:shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70"
                variants={leaderboardItemVariantsFadeUp}
            >
                <div className="flex items-center">
                    {/* Left Side: Rank, Avatar, Name - Fixed Width */}
                    <div className="flex items-center gap-4 w-80 flex-shrink-0">
                        {/* Avatar */}
                        <Avatar
                            username={user.name}
                            className="w-12 h-12 text-lg shadow-md"
                        />

                        {/* Name */}
                        <span className="font-semibold text-gray-900 dark:text-white min-w-[100px]">
                            {user.name}
                        </span>
                    </div>

                    {/* Center: Progress Bar - Full remaining width */}
                    <div className="flex-1 mx-8">
                        <div className="relative">
                            {/* Background bar */}
                            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                                {/* Progress bar - all start from left, different lengths */}
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ease-out`}
                                    style={{
                                        width: barWidth,
                                        background: `linear-gradient(90deg, ${user.rank === 1 ? 'rgba(0, 255, 255, 0.6)' : user.rank === 2 ? 'rgba(255, 0, 255, 0.6)' : user.rank === 3 ? 'rgba(255, 255, 0, 0.6)' : 'rgba(0, 255, 150, 0.6)'}, ${user.rank === 1 ? 'rgba(0, 150, 255, 0.6)' : user.rank === 2 ? 'rgba(150, 0, 255, 0.6)' : user.rank === 3 ? 'rgba(255, 150, 0, 0.6)' : 'rgba(0, 255, 100, 0.6)'})`,
                                        boxShadow: `0 0 8px ${user.rank === 1 ? 'rgba(0, 255, 255, 0.4)' : user.rank === 2 ? 'rgba(255, 0, 255, 0.4)' : user.rank === 3 ? 'rgba(255, 255, 0, 0.4)' : 'rgba(0, 255, 150, 0.4)'}`
                                    }}
                                />
                            </div>

                            {/* Trophy icons for top 3 */}
                            {user.rank <= 3 && (
                                <div className="absolute -top-1 text-lg" style={{ left: `calc(${barWidth} - 12px)` }}>
                                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Points - Fixed Width */}
                    <div className="text-right w-20 flex-shrink-0">
                        <div className={`font-bold text-xl ${user.rank === 1 ? 'text-amber-600 dark:text-amber-400' : user.rank === 2 ? 'text-slate-600 dark:text-slate-400' : user.rank === 3 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-white'}`}>
                            {user.points.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            pts
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Mobile version
    return (
        <motion.div
            key={user.id}
            className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-4 transition-all duration-200 hover:shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70"
            variants={leaderboardItemVariantsFadeUp}
        >
            <div className="flex items-center justify-between">
                {/* Left Side: Rank Badge, Avatar, and Name */}
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <Avatar
                        username={user.name}
                        className="w-10 h-10 text-sm font-semibold"
                    />

                    {/* Clean Name Display */}
                    <span className="font-medium text-gray-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {user.name}
                    </span>
                </div>

                {/* Platform-style Points Display */}
                <div className="text-right">
                    <div className="font-bold text-lg text-gray-900 dark:text-white">
                        {user.points.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

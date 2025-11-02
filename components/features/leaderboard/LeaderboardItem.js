"use client";
import React from 'react';
import { Avatar } from '@/components/core/ui/Avatar';

export const LeaderboardItem = ({ user, maxPoints, isDesktop = true }) => {
    // Safe bar width calculation: avoid division by zero when maxPoints is 0
    const barWidth = (() => {
        if (!maxPoints || maxPoints <= 0) return '8%';
        const width = Math.max((user.points / maxPoints) * 100, 8);
        return `${width}%`;
    })();

    const isGhost = user.rank > 5; // ranks 6 and below should be grayish

    if (isDesktop) {
        return (
            <div
                key={user.id}
                className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transition-all duration-300 hover:shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70"
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
                                        background: isGhost
                                            ? 'linear-gradient(90deg, rgba(203,213,225,0.7), rgba(148,163,184,0.7))'
                                            : `linear-gradient(90deg, ${user.rank === 1 ? 'rgba(255, 20, 147, 0.7)' : user.rank === 2 ? 'rgba(34, 165, 94, 0.6)' : user.rank === 3 ? 'rgba(243, 183, 90, 0.6)' : user.rank === 4 ? 'rgba(147, 51, 234, 0.6)' : user.rank === 5 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(0, 255, 150, 0.6)'}, ${user.rank === 1 ? 'rgba(255, 0, 100, 0.7)' : user.rank === 2 ? 'rgba(20, 140, 80, 0.6)' : user.rank === 3 ? 'rgba(220, 160, 70, 0.6)' : user.rank === 4 ? 'rgba(168, 85, 247, 0.6)' : user.rank === 5 ? 'rgba(96, 165, 250, 0.6)' : 'rgba(0, 255, 100, 0.6)'})`,
                                        boxShadow: isGhost
                                            ? '0 0 6px rgba(148,163,184,0.35)'
                                            : `0 0 8px ${user.rank === 1 ? 'rgba(255, 20, 147, 0.5)' : user.rank === 2 ? 'rgba(34, 165, 94, 0.4)' : user.rank === 3 ? 'rgba(243, 183, 90, 0.4)' : user.rank === 4 ? 'rgba(147, 51, 234, 0.4)' : user.rank === 5 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(0, 255, 150, 0.4)'}`
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
            </div>
        );
    }

    // Mobile version
    return (
        <div
            key={user.id}
            className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-4 transition-all duration-200 hover:shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70"
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
        </div>
    );
};

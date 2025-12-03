"use client";
import React from 'react';
import { Avatar } from '@/components/core/ui/Avatar';
import { useAuth } from '@/context/AuthContext';
import { getRankColors } from './utils';

export const LeaderboardItem = ({ user, maxPoints, isDesktop = true }) => {
    const { user: currentUser } = useAuth();

    // Check if this leaderboard entry belongs to the logged-in user
    const isMe = currentUser?.id === user.user_id;

    // Safe bar width calculation
    const barWidth = (() => {
        if (!maxPoints || maxPoints <= 0) return '0%';
        // Ensure at least a tiny sliver is visible if they have points
        const percentage = (user.points / maxPoints) * 100;
        return `${Math.max(percentage, 1)}%`;
    })();

    const colors = getRankColors(user.rank);

    if (isDesktop) {
        return (
            <div
                key={user.id}
                className={`group relative bg-white dark:bg-slate-900 rounded-xl border p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
                ${isMe
                        ? 'border-l-4 border-l-csway-green border-y-slate-200 border-r-slate-200 dark:border-y-slate-800 dark:border-r-slate-800 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
            >
                <div className="flex items-center">
                    {/* Rank Section */}
                    <div className="w-12 flex justify-center flex-shrink-0">
                        <span className={`text-sm font-bold ${colors.text}`}>
                            #{user.rank}
                        </span>
                    </div>

                    {/* User Section */}
                    <div className="flex items-center gap-3 w-64 flex-shrink-0">
                        <Avatar
                            username={user.name}
                            className="w-10 h-10 text-sm font-semibold"
                        />
                        <span className={`font-medium truncate ${isMe ? 'text-csway-green' : 'text-slate-900 dark:text-white'}`}>
                            {user.name}
                        </span>
                    </div>

                    {/* Progress Bar Section */}
                    <div className="flex-1 px-6">
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${colors.bar}`}
                                style={{ width: barWidth }}
                            />
                        </div>
                    </div>

                    {/* Points Section */}
                    <div className="w-24 text-right flex-shrink-0">
                        <span className="text-lg font-bold font-mono tracking-tight text-slate-900 dark:text-white">
                            {user.points.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    // Mobile Version
    return (
        <div
            key={user.id}
            className={`group relative bg-white dark:bg-slate-900 rounded-xl border p-4 transition-all duration-200
            ${isMe
                    ? 'border-l-4 border-l-csway-green border-y-slate-200 border-r-slate-200 dark:border-y-slate-800 dark:border-r-slate-800 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold w-6 ${colors.text}`}>
                        #{user.rank}
                    </span>

                    <Avatar
                        username={user.name}
                        className="w-8 h-8 text-xs"
                    />

                    <span className={`text-sm font-medium ${isMe ? 'text-csway-green' : 'text-slate-900 dark:text-white'}`}>
                        {user.name}
                    </span>
                </div>

                <div className="text-right">
                    <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                        {user.points.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Slim progress bar at bottom of card for mobile context */}
            <div className="mt-3 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${colors.bar}`}
                    style={{ width: barWidth }}
                />
            </div>
        </div>
    );
};
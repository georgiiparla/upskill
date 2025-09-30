"use client";
import React from 'react';
import { Trophy } from 'lucide-react';
import { SectionTitle } from '../../shared/helpers/Helper';

export const Leaderboard = ({ initialData }) => {
    // We only need the top 5 users for this component
    const topFive = initialData.slice(0, 5);

    // Add a rank property to each user object
    const rankedUsers = topFive.map((user, index) => ({
        ...user,
        rank: index + 1
    }));

    // Platform-style color scheme - balanced and professional
    const getRankColors = (rank) => {
        switch (rank) {
            case 1:
                return {
                    badge: 'bg-amber-100 text-amber-800 border-amber-200',
                    avatar: 'bg-amber-500',
                    podium: 'from-amber-50 to-yellow-50 border-amber-200',
                    bar: 'bg-gradient-to-r from-amber-400 to-yellow-500'
                };
            case 2:
                return {
                    badge: 'bg-slate-100 text-slate-700 border-slate-200',
                    avatar: 'bg-slate-500',
                    podium: 'from-slate-50 to-gray-50 border-slate-200',
                    bar: 'bg-gradient-to-r from-slate-400 to-gray-500'
                };
            case 3:
                return {
                    badge: 'bg-orange-100 text-orange-800 border-orange-200',
                    avatar: 'bg-orange-500',
                    podium: 'from-orange-50 to-amber-50 border-orange-200',
                    bar: 'bg-gradient-to-r from-orange-400 to-red-400'
                };
            default:
                return {
                    badge: 'bg-blue-50 text-blue-700 border-blue-100',
                    avatar: 'bg-blue-500',
                    podium: 'from-blue-50 to-indigo-50 border-blue-100',
                    bar: 'bg-gradient-to-r from-blue-400 to-indigo-500'
                };
        }
    };

    // Get max points for bar scaling
    const maxPoints = Math.max(...rankedUsers.map(user => user.points));

    return (
        <div className="mx-auto w-full max-w-6xl space-y-8">
            {/* Header Section - Using SectionTitle Component */}
            <SectionTitle
                icon={<Trophy className="h-6 w-6 text-amber-500" />}
                title="Weekly Leaderboard"
                subtitle="Top performers this week"
                className="mb-8"
            />

            {/* Desktop Minimalistic Bars Layout */}
            <div className="hidden lg:block space-y-4">
                {rankedUsers.map((user, index) => {
                    const colors = getRankColors(user.rank);
                    const barWidth = `${Math.max((user.points / maxPoints) * 100, 15)}%`; // Min 15% width

                    return (
                        <div
                            key={user.id}
                            className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transition-all duration-300 hover:shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animation: 'slideInLeft 0.5s ease-out forwards'
                            }}
                        >
                            <div className="flex items-center justify-between">
                                {/* Left Side: Rank, Avatar, Name */}
                                <div className="flex items-center gap-4">
                                    {/* Rank Badge */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${colors.badge} shadow-sm`}>
                                        {user.rank}
                                    </div>

                                    {/* Avatar */}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${colors.avatar} shadow-md`}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>

                                    {/* Name */}
                                    <span className="font-semibold text-gray-900 dark:text-white min-w-[100px]">
                                        {user.name}
                                    </span>
                                </div>

                                {/* Center: Progress Bar */}
                                <div className="flex-1 max-w-md mx-8">
                                    <div className="relative">
                                        {/* Background bar */}
                                        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            {/* Progress bar */}
                                            <div
                                                className={`h-full ${colors.bar} rounded-full transition-all duration-700 ease-out relative`}
                                                style={{ width: barWidth }}
                                            >
                                                {/* Shine effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                                            </div>
                                        </div>

                                        {/* Trophy icons for top 3 */}
                                        {user.rank <= 3 && (
                                            <div className="absolute -top-1 text-lg" style={{ left: `calc(${barWidth} - 12px)` }}>
                                                {user.rank === 1 ? '🏆' : user.rank === 2 ? '🥈' : '🥉'}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Side: Points */}
                                <div className="text-right min-w-[80px]">
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
                })}
            </div>

            {/* Mobile Version - Clean and Simple */}
            <div className="lg:hidden space-y-3">
                {rankedUsers.map((user, index) => {
                    const colors = getRankColors(user.rank);

                    return (
                        <div
                            key={user.id}
                            className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-4 transition-all duration-200 hover:shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70"
                            style={{
                                animationDelay: `${index * 50}ms`,
                                animation: 'fadeInUp 0.4s ease-out forwards'
                            }}
                        >
                            <div className="flex items-center justify-between">
                                {/* Left Side: Rank Badge, Avatar, and Name */}
                                <div className="flex items-center gap-3">
                                    {/* Platform-style Rank Badge */}
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${colors.badge} transition-transform duration-200 group-hover:scale-105`}>
                                        {user.rank}
                                    </div>

                                    {/* Platform-style Avatar */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${colors.avatar} transition-transform duration-200 group-hover:scale-105`}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>

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
                                        pts
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Platform-style CSS animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                        to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
};
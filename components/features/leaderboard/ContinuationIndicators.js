"use client";
import React from 'react';

export const ContinuationIndicators = ({ isDesktop = true }) => {
    const ranks = [6, 7, 8];

    return (
        <div className="relative">
            {/* Gradient overlay for fade effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 dark:to-gray-900/80 pointer-events-none z-10"></div>

            {ranks.map((rank, index) => {
                const opacity = Math.max(0.6 - index * 0.25, 0.1);
                const scale = Math.max(1 - index * 0.05, 0.85);

                return (
                    <div
                        key={`continuation${isDesktop ? '' : '-mobile'}-${rank}`}
                        className={`group ${isDesktop
                            ? 'bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-700/30 p-6'
                            : 'bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-700/30 p-4'
                            } transition-all duration-${isDesktop ? '300' : '200'} hover:shadow-lg hover:bg-white/50 dark:hover:bg-gray-800/50`}
                        style={{
                            opacity: opacity,
                            transform: `scale(${scale})`,
                            marginTop: index > 0 ? (isDesktop ? '-8px' : '-4px') : '0',
                            zIndex: 8 - index
                        }}
                    >
                        <div className={`flex items-center ${isDesktop ? '' : 'justify-between'}`}>
                            {/* Left Side: Rank, Avatar, Name - Fixed Width */}
                            <div className={`flex items-center gap-${isDesktop ? '4' : '3'} ${isDesktop ? 'w-80 flex-shrink-0' : ''}`}>
                                {/* Rank Badge - very subtle */}
                                <div className={`w-${isDesktop ? '8' : '6'} h-${isDesktop ? '8' : '6'} rounded-full flex items-center justify-center text-xs font-bold bg-gray-100/50 dark:bg-gray-700/50 text-gray-400/70 dark:text-gray-500/70 shadow-sm`}>
                                    {rank}
                                </div>

                                {/* Avatar - ghost like */}
                                <div className={`w-${isDesktop ? '12' : '10'} h-${isDesktop ? '12' : '10'} rounded-full bg-gray-200/40 dark:bg-gray-700/40 shadow-md`}></div>

                                {/* Name - very faded */}
                                <span className={`font-medium text-gray-400/60 dark:text-gray-500/60 ${isDesktop ? 'min-w-[100px]' : ''}`}>
                                    ...
                                </span>
                            </div>

                            {/* Center: Progress Bar - faded (desktop only) */}
                            {isDesktop && (
                                <div className="flex-1 mx-8">
                                    <div className="relative">
                                        {/* Background bar */}
                                        <div className="w-full h-3 bg-gray-200/50 dark:bg-gray-700/50 rounded-full">
                                            {/* Progress bar - decreasing width and opacity */}
                                            <div
                                                className={`h-full rounded-full bg-gray-300/30 dark:bg-gray-600/30`}
                                                style={{
                                                    width: `${Math.max(50 - index * 15, 15)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Right Side: Points - faded */}
                            <div className={`text-right ${isDesktop ? 'w-20 flex-shrink-0' : ''}`}>
                                <div className={`font-bold text-${isDesktop ? 'xl' : 'lg'} text-gray-400/60 dark:text-gray-500/60`}>
                                    ...
                                </div>
                                <div className={`text-xs ${isDesktop ? 'text-gray-400/50 dark:text-gray-500/50' : 'text-gray-400/50 dark:text-gray-500/50 font-medium'} uppercase tracking-wide`}>
                                    pts
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

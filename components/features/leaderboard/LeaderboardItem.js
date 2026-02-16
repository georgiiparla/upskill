"use client";
import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Avatar } from '@/components/ui/Avatar';
import { useAuthStore } from '@/store/authStore';
import { getRankColors } from './utils';
import { BackgroundGradientAnimation } from '@/components/ui/BackgroundGradientAnimation';
import { generateGradientTheme } from '../dashboard/agenda-shared';

const RANK_HEX_COLORS = {
    1: '#ef4444', // Red 500
    2: '#22c55e', // Green 500
    3: '#f59e0b', // Amber 500 (Yellow/Orange)
    4: '#0ea5e9', // Sky 500 (Light Blue)
    5: '#0ea5e9'  // Sky 500 (Light Blue)
};

export const LeaderboardItem = ({ user, maxPoints, isDesktop = true }) => {
    const { user: currentUser } = useAuthStore();
    const { theme, systemTheme } = useTheme();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const isDark = mounted ? (theme === 'system' ? systemTheme === 'dark' : theme === 'dark') : true;

    const isMe = currentUser?.id === user.user_id;

    const barWidth = (() => {
        if (!maxPoints || maxPoints <= 0) return '0%';
        const percentage = (user.points / maxPoints) * 100;
        return `${Math.max(percentage, 1)}%`;
    })();

    const colors = getRankColors(user.rank);

    const isTop5 = user.rank <= 5;
    const gradientConfig = useMemo(() => {
        if (!isTop5) return null;
        const baseColor = RANK_HEX_COLORS[user.rank] || '#64748b';
        return generateGradientTheme(baseColor, isDark);
    }, [isTop5, user.rank, isDark]);

    const GradientBackground = () => (
        <div className={`absolute inset-0 z-0 overflow-hidden rounded-xl transition-opacity duration-700 ease-in-out pointer-events-none 
            ${isDark ? 'opacity-10 group-hover:opacity-100' : 'opacity-[0.02] group-hover:opacity-40'}`}>
            <BackgroundGradientAnimation
                containerClassName="h-full w-full"
                size="130%"
                interactive={false}
                {...gradientConfig}
            />
        </div>
    );

    const heightClass = (() => {
        if (user.rank === 1) return 'py-10';
        if (user.rank === 2) return 'py-9';
        if (user.rank === 3) return 'py-8';
        if (user.rank === 4) return 'py-6';
        if (user.rank === 5) return 'py-5';
        return 'py-4';
    })();

    const sizeConfig = (() => {
        if (user.rank === 1) return {
            rankText: 'text-3xl',
            nameText: 'text-xl',
            pointsText: 'text-3xl',
            avatarSize: 'w-16 h-16 text-xl'
        };
        if (user.rank === 2) return {
            rankText: 'text-2xl',
            nameText: 'text-lg',
            pointsText: 'text-2xl',
            avatarSize: 'w-14 h-14 text-lg'
        };
        if (user.rank === 3) return {
            rankText: 'text-xl',
            nameText: 'text-lg',
            pointsText: 'text-xl',
            avatarSize: 'w-12 h-12 text-base'
        };
        if (user.rank === 4 || user.rank === 5) return {
            rankText: 'text-lg',
            nameText: 'text-base',
            pointsText: 'text-lg',
            avatarSize: 'w-10 h-10 text-sm'
        };
        return {
            rankText: 'text-sm',
            nameText: 'text-sm',
            pointsText: 'text-base',
            avatarSize: 'w-10 h-10 text-sm'
        };
    })();

    if (isDesktop) {
        return (
            <div
                key={user.id}
                className={`group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 px-4 ${heightClass} transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
            >
                {isTop5 && gradientConfig && <GradientBackground />}

                <div className="flex items-center relative z-10">
                    <div className="w-16 flex justify-center flex-shrink-0">
                        <span className={`font-bold ${sizeConfig.rankText} ${colors.text}`}>
                            #{user.rank}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 w-72 flex-shrink-0">
                        <Avatar
                            username={user.name}
                            className={`${sizeConfig.avatarSize} font-bold`}
                        />
                        <div className="flex items-center gap-2 truncate">
                            <span className={`font-medium text-slate-900 dark:text-white truncate ${sizeConfig.nameText}`}>
                                {user.name}
                            </span>
                            {isMe && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                    You
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 px-6">
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${colors.bar}`}
                                style={{ width: barWidth }}
                            />
                        </div>
                    </div>

                    <div className="w-32 text-right flex-shrink-0">
                        <span className={`font-bold font-mono tracking-tight text-slate-900 dark:text-white ${sizeConfig.pointsText}`}>
                            {user.points.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            key={user.id}
            className={`group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 px-4 ${heightClass} transition-all duration-200`}
        >
            {isTop5 && gradientConfig && <GradientBackground />}

            <div className="relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className={`font-bold w-8 ${colors.text} ${user.rank <= 3 ? 'text-lg' : 'text-xs'}`}>
                            #{user.rank}
                        </span>

                        <Avatar
                            username={user.name}
                            className={`${isTop5 ? 'w-10 h-10' : 'w-8 h-8'} text-xs`}
                        />

                        <div className="flex items-center gap-2">
                            <span className={`font-medium text-slate-900 dark:text-white ${isTop5 ? 'text-base' : 'text-sm'}`}>
                                {user.name}
                            </span>
                            {isMe && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                    You
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="text-right">
                        <span className={`font-bold font-mono text-slate-900 dark:text-white ${isTop5 ? 'text-lg' : 'text-base'}`}>
                            {user.points.toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="mt-3 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${colors.bar}`}
                        style={{ width: barWidth }}
                    />
                </div>
            </div>
        </div>
    );
};
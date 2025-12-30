"use client";
import React from 'react';
// [!] Swapping Lucide Trophy for Tabler IconTrophy
import { IconTrophy } from '@tabler/icons-react';
import { HeroHeader } from '@/components/ui/HeroHeader';
import { DesktopLeaderboard } from './DesktopLeaderboard';
import { MobileLeaderboard } from './MobileLeaderboard';
import { processLeaderboardData } from './utils';

export const Leaderboard = ({ initialData }) => {
    const { rankedUsers, maxPoints, lastUpdated } = processLeaderboardData(initialData);

    const subtitle = lastUpdated
        ? `Last points update: ${new Date(lastUpdated).toLocaleString()}`
        : "See who's leading the pack this week";

    return (
        <div className="mx-auto w-full space-y-8">
            <HeroHeader
                icon={IconTrophy} // [!] Updated
                title="Leaderboard"
                subtitle={subtitle}
                iconBg="from-amber-500 to-yellow-600"
                iconAccentColor="text-amber-600 dark:text-amber-400"
            />
            <DesktopLeaderboard rankedUsers={rankedUsers} maxPoints={maxPoints} />
            <MobileLeaderboard rankedUsers={rankedUsers} maxPoints={maxPoints} />
        </div>
    );
};
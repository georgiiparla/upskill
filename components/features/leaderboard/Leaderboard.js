"use client";
import React from 'react';
import { Trophy } from 'lucide-react';
import { HeroHeader } from '../../shared/helpers/HeroHeader';
import { DesktopLeaderboard } from './DesktopLeaderboard';
import { MobileLeaderboard } from './MobileLeaderboard';
import { processLeaderboardData } from './utils';

export const Leaderboard = ({ initialData }) => {
    // Process data using utility function
    const { rankedUsers, maxPoints, lastUpdated } = processLeaderboardData(initialData);

    // Format the subtitle string
    const subtitle = lastUpdated
        ? `Last points update: ${new Date(lastUpdated).toLocaleString()}`
        : "See who's leading the pack this week";

    return (
        <div className="mx-auto w-full space-y-8">
            {/* Hero Section Header */}
            <HeroHeader
                icon={Trophy}
                title="Leaderboard"
                subtitle={subtitle}
                iconBg="from-amber-500 to-yellow-600"
                iconAccentColor="text-amber-600 dark:text-amber-400"
            />

            {/* Desktop Layout */}
            <DesktopLeaderboard rankedUsers={rankedUsers} maxPoints={maxPoints} />

            {/* Mobile Layout */}
            <MobileLeaderboard rankedUsers={rankedUsers} maxPoints={maxPoints} />
        </div>
    );
};
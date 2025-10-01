"use client";
import React from 'react';
import { Trophy } from 'lucide-react';
import { HeroHeader } from '../../shared/helpers/HeroHeader';
import { DesktopLeaderboard } from './DesktopLeaderboard';
import { MobileLeaderboard } from './MobileLeaderboard';
import { processLeaderboardData } from './utils';

export const Leaderboard = ({ initialData }) => {
    // Process data using utility function
    const { rankedUsers, maxPoints } = processLeaderboardData(initialData);

    return (
        <div className="mx-auto w-full max-w-6xl space-y-8">
            {/* Hero Section Header */}
            <HeroHeader
                icon={Trophy}
                title="Leaderboard"
                subtitle="See who's leading the pack this week"
                iconBg="from-amber-500 to-yellow-600"
            />

            {/* Desktop Layout */}
            <DesktopLeaderboard rankedUsers={rankedUsers} maxPoints={maxPoints} />

            {/* Mobile Layout */}
            <MobileLeaderboard rankedUsers={rankedUsers} maxPoints={maxPoints} />
        </div>
    );
};
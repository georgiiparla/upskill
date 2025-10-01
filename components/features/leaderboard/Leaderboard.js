"use client";
import React from 'react';
import { Trophy } from 'lucide-react';
import { SectionTitle } from '../../shared/helpers/Helper';
import { DesktopLeaderboard } from './DesktopLeaderboard';
import { MobileLeaderboard } from './MobileLeaderboard';
import { processLeaderboardData } from './utils';

export const Leaderboard = ({ initialData }) => {
    // Process data using utility function
    const { rankedUsers, maxPoints } = processLeaderboardData(initialData);

    return (
        <div className="mx-auto w-full max-w-6xl space-y-8">
            {/* Header Section */}
            <SectionTitle
                icon={<Trophy className="h-6 w-6 text-amber-500" />}
                title="Weekly Leaderboard"
                subtitle="Top performers this week"
            />

            {/* Desktop Layout */}
            <DesktopLeaderboard rankedUsers={rankedUsers} maxPoints={maxPoints} />

            {/* Mobile Layout */}
            <MobileLeaderboard rankedUsers={rankedUsers} maxPoints={maxPoints} />
        </div>
    );
};
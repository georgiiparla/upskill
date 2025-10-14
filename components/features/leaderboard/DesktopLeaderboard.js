"use client";
import React from 'react';
import { LeaderboardItem } from './LeaderboardItem';
import { ContinuationIndicators } from './ContinuationIndicators';

export const DesktopLeaderboard = ({ rankedUsers, maxPoints }) => (
    <div
        className="hidden lg:block space-y-4"
    >
        {rankedUsers.map((user) => (
            <LeaderboardItem key={user.id} user={user} maxPoints={maxPoints} isDesktop={true} />
        ))}
        {/* <ContinuationIndicators isDesktop={true} /> */}
    </div>
);

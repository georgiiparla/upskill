"use client";
import React from 'react';
import { LeaderboardItem } from './LeaderboardItem';
import { ContinuationIndicators } from './ContinuationIndicators';

export const MobileLeaderboard = ({ rankedUsers, maxPoints }) => (
    <div
        className="lg:hidden space-y-3"
    >
        {rankedUsers.map((user) => (
            <LeaderboardItem key={user.id} user={user} maxPoints={maxPoints} isDesktop={false} />
        ))}
        {/* <ContinuationIndicators isDesktop={false} /> */}
    </div>
);

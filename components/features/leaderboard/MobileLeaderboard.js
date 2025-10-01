"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { LeaderboardItem } from './LeaderboardItem';
import { ContinuationIndicators } from './ContinuationIndicators';
import { leaderboardContainerVariants } from './animations';

export const MobileLeaderboard = ({ rankedUsers, maxPoints }) => (
    <motion.div
        className="lg:hidden space-y-3"
        variants={leaderboardContainerVariants}
        initial="hidden"
        animate="visible"
    >
        {rankedUsers.map((user) => (
            <LeaderboardItem key={user.id} user={user} maxPoints={maxPoints} isDesktop={false} />
        ))}
        <ContinuationIndicators isDesktop={false} />
    </motion.div>
);

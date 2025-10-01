"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { LeaderboardItem } from './LeaderboardItem';
import { ContinuationIndicators } from './ContinuationIndicators';
import { leaderboardContainerVariants } from './animations';

export const DesktopLeaderboard = ({ rankedUsers, maxPoints }) => (
    <motion.div
        className="hidden lg:block space-y-4"
        variants={leaderboardContainerVariants}
        initial="hidden"
        animate="visible"
    >
        {rankedUsers.map((user) => (
            <LeaderboardItem key={user.id} user={user} maxPoints={maxPoints} isDesktop={true} />
        ))}
        <ContinuationIndicators isDesktop={true} />
    </motion.div>
);

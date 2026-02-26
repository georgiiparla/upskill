"use client";
import React, { useState, useEffect } from 'react';
import { IconTrophy } from '@tabler/icons-react';
import { HeroHeader } from '@/components/ui/HeroHeader';
import { DesktopLeaderboard } from './DesktopLeaderboard';
import { MobileLeaderboard } from './MobileLeaderboard';
import { SeasonFilter } from './SeasonFilter';
import { processLeaderboardData } from './utils';

export const Leaderboard = ({ initialData, availableSeasons = [] }) => {
    const [currentSeason, setCurrentSeason] = useState("current");
    const [leaderboardData, setLeaderboardData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentSeason !== "current") {
            setLoading(true);
            fetch(`/api/proxy/leaderboard?season=${currentSeason}`)
                .then(res => res.json())
                .then(data => {
                    setLeaderboardData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch season data:", err);
                    setLoading(false);
                });
        } else {
            setLeaderboardData(initialData);
        }
    }, [currentSeason, initialData]);

    const { rankedUsers, maxPoints, lastUpdated } = processLeaderboardData(leaderboardData);

    let subtitle = lastUpdated
        ? `Last points update: ${new Date(lastUpdated).toLocaleString()}`
        : "See who's leading the pack this week";

    if (currentSeason !== "current") {
        const seasonObj = availableSeasons.find(s => s.season_number.toString() === currentSeason);
        if (seasonObj && seasonObj.start_date && seasonObj.end_date) {
            const start = new Date(seasonObj.start_date).toLocaleDateString();
            const end = new Date(seasonObj.end_date).toLocaleDateString();
            subtitle = `Duration: ${start} - ${end}`;
        } else {
            subtitle = `Final results for Season ${currentSeason}`;
        }
    }

    return (
        <div className="mx-auto w-full space-y-8">
            <div className="relative z-50 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <HeroHeader
                    icon={IconTrophy}
                    title={currentSeason === "current" ? "Leaderboard" : `Leaderboard Season ${currentSeason}`}
                    subtitle={subtitle}
                    iconBg="from-amber-500 to-yellow-600"
                    iconAccentColor="text-amber-600 dark:text-amber-400"
                />

                {availableSeasons.length > 0 && (
                    <div className="flex justify-start md:justify-end w-full md:w-auto mt-2 md:mt-0">
                        <SeasonFilter
                            currentSeason={currentSeason}
                            availableSeasons={availableSeasons}
                            onSeasonChange={setCurrentSeason}
                        />
                    </div>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                </div>
            ) : (
                <>
                    <DesktopLeaderboard rankedUsers={rankedUsers} maxPoints={maxPoints} />
                    <MobileLeaderboard rankedUsers={rankedUsers} maxPoints={maxPoints} />
                </>
            )}
        </div>
    );
};
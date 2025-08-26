"use client"

import React, { useState, useEffect } from 'react';
import { Trophy, Award, AlertTriangle } from 'lucide-react';
import { Card, SectionTitle } from "./Helper";

const tailwind = {
    
    podiumGrid: `
                grid 
                grid-cols-1 md:grid-cols-3 
                gap-4 items-end
                `,

    cardBase: `
                border-2 
                text-center 
                p-4
                `,

    card2nd: `
            border-gray-300 
            dark:border-gray-600
            `,

    card1st: `
                border-csway-orange dark:border-csway-orange 
                p-6 
                transform md:scale-110 
                shadow-lg
                `,

    card3rd: `
                border-csway-red/50 dark:border-csway-red/80
                `,

    podiumTrophy1st: `
                        h-12 w-12 
                        text-csway-orange 
                        mx-auto 
                        mb-2
                        `,

    podiumTrophy2nd3rd: `
                        h-10 w-10 
                        mx-auto mb-2
                        `,

    podiumName1st: `
                    font-bold 
                    text-xl 
                    text-gray-800 
                    dark:text-white
                    `,

    podiumName2nd3rd: `
                        font-bold text-lg 
                        text-gray-800 dark:text-white`,

    podiumPlace1st: `
                    font-semibold 
                    text-csway-orange
                    `,

    podiumPlace2nd: `
                    font-semibold 
                    text-gray-500 dark:text-gray-400
                    `,

    podiumPlace3rd: `
                    font-semibold 
                    text-csway-red
                    `,

    podiumPoints1st: `
                    text-3xl 
                    font-bold 
                    text-csway-green mt-2
                    `,

    podiumPoints2nd3rd: `
                        text-2xl 
                        font-bold 
                        text-csway-green 
                        mt-2`,

    table: `
            w-full 
            text-sm 
            text-left 
            text-gray-500 dark:text-gray-400
            `,

    tableHead: `
                text-xs 
                text-gray-700 
                uppercase 
                bg-gray-50 dark:bg-gray-700 
                dark:text-gray-400
                `,

    tableHeadCell: `
                    px-6 
                    py-3
                    `,

    tableRow: `
                bg-white 
                border-b 
                dark:bg-gray-800 
                dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600
                `,

    tableCell: `px-6 py-4`,

    tableCellRank: `
                    text-gray-500 
                    dark:text-gray-400 
                    font-bold 
                    w-6 
                    text-center`,

    tableCellUser: `
                    font-medium 
                    text-gray-900 
                    whitespace-nowrap 
                    dark:text-white
                    `,

    tableCellPoints: `
                    text-right 
                    font-bold 
                    text-gray-800 
                    dark:text-white
                    `,

};

const PodiumSkeleton = () => (
    <div className={tailwind.podiumGrid}>
        {/* 2nd Place Skeleton */}
        <div className="md:order-1 animate-pulse">
            <Card className={`${tailwind.cardBase} ${tailwind.card2nd}`}>
                <div className="h-10 w-10 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-1/2 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-1/3 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </Card>
        </div>
        {/* 1st Place Skeleton */}
        <div className="md:order-2 relative z-10 animate-pulse">
            <Card className={`${tailwind.cardBase} ${tailwind.card1st}`}>
                <div className="h-12 w-12 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-7 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-5 w-1/2 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-9 w-1/3 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </Card>
        </div>
        {/* 3rd Place Skeleton */}
        <div className="md:order-3 animate-pulse">
            <Card className={`${tailwind.cardBase} ${tailwind.card3rd}`}>
                <div className="h-10 w-10 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-1/2 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-1/3 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </Card>
        </div>
    </div>
);

const LadderSkeleton = () => (
    <Card>
        <div className="overflow-x-auto animate-pulse">
            <div className="space-y-4 p-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 flex-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    </Card>
);

export const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard`, { credentials: 'include' });
                if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }
                const data = await response.json();
                setLeaderboard(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const getTrophyIcon = (rank) => {
        if (rank === 1) return <Trophy className="h-6 w-6 text-csway-orange" />;
        if (rank === 2) return <Trophy className="h-6 w-6 text-gray-400" />;
        if (rank === 3) return <Trophy className="h-6 w-6 text-csway-red" />;
        return <span className={tailwind.tableCellRank}>{rank}</span>;
    };

    if (loading) {
        return (
            <div className="space-y-12">
                <div>
                    <SectionTitle icon={<Award className="h-6 w-6 text-csway-orange" />} title="COMMS Podium Finishers" />
                    <PodiumSkeleton />
                </div>
                <div>
                    <SectionTitle icon={<Trophy className="h-6 w-6 text-csway-orange" />} title="Ladder" />
                    <LadderSkeleton />
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Could not load the leaderboard</h3>
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>
            </div>
        );
    }

    const topThree = leaderboard.slice(0, 3);
    const restOfLeaderboard = leaderboard.slice(3);

    return (
        <div className="space-y-12">
            <div>
                <SectionTitle icon={<Award className="h-6 w-6 text-csway-orange" />} title="COMMS Podium Finishers" />
                <div className={tailwind.podiumGrid}>
                    <div className="md:order-1">
                        {topThree[1] && (
                            <Card className={`${tailwind.cardBase} ${tailwind.card2nd}`}>
                                <Trophy className={`${tailwind.podiumTrophy2nd3rd} text-gray-400`} />
                                <h3 className={tailwind.podiumName2nd3rd}>{topThree[1].name}</h3>
                                <p className={tailwind.podiumPlace2nd}>2nd Place</p>
                                <p className={tailwind.podiumPoints2nd3rd}>{topThree[1].points.toLocaleString()} PTS</p>
                            </Card>
                        )}
                    </div>

                    <div className="md:order-2 relative z-10">
                         {topThree[0] && (
                            <Card className={`${tailwind.cardBase} ${tailwind.card1st}`}>
                                <Trophy className={tailwind.podiumTrophy1st} />
                                <h3 className={tailwind.podiumName1st}>{topThree[0].name}</h3>
                                <p className={tailwind.podiumPlace1st}>1st Place</p>
                                <p className={tailwind.podiumPoints1st}>{topThree[0].points.toLocaleString()} PTS</p>
                            </Card>
                        )}
                    </div>

                    <div className="md:order-3">
                        {topThree[2] && (
                             <Card className={`${tailwind.cardBase} ${tailwind.card3rd}`}>
                                <Trophy className={`${tailwind.podiumTrophy2nd3rd} text-csway-red`} />
                                <h3 className={tailwind.podiumName2nd3rd}>{topThree[2].name}</h3>
                                <p className={tailwind.podiumPlace3rd}>3rd Place</p>
                                <p className={tailwind.podiumPoints2nd3rd}>{topThree[2].points.toLocaleString()} PTS</p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <SectionTitle icon={<Trophy className="h-6 w-6 text-csway-orange" />} title="Ladder" />
                <div className="hidden md:block">
                    <Card>
                        <div className="overflow-x-auto">
                            <table className={tailwind.table}>
                                <thead className={tailwind.tableHead}>
                                    <tr>
                                        <th scope="col" className={tailwind.tableHeadCell}>Rank</th>
                                        <th scope="col" className={tailwind.tableHeadCell}>User</th>
                                        <th scope="col" className={tailwind.tableHeadCell}>Badges</th>
                                        <th scope="col" className={`${tailwind.tableHeadCell} text-right`}>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {restOfLeaderboard.map((user, index) => (
                                        <tr key={user.id} className={tailwind.tableRow}>
                                            <td className={tailwind.tableCell}>{getTrophyIcon(index + 4)}</td>
                                            <th scope="row" className={`${tailwind.tableCell} ${tailwind.tableCellUser}`}>{user.name}</th>
                                            <td className={tailwind.tableCell}><div className="flex space-x-2">{user.badges.map((badge, i) => <span key={i} className="text-xl">{badge}</span>)}</div></td>
                                            <td className={`${tailwind.tableCell} ${tailwind.tableCellPoints}`}>{user.points.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
"use client"

import { Trophy, Award } from 'lucide-react';
import { Card, SectionTitle } from "./Helper";

// Assuming MOCK_LEADERBOARD is imported from a mock data file
import { MOCK_LEADERBOARD } from "../mock/mock_data";

// --- Style Definitions ---

const LEADERBOARD_STYLES = {
    // Podium Cards
    podiumGrid: `
        grid 
        grid-cols-1 md:grid-cols-3 
        gap-4 
        items-end
    `,
    cardBase: `
        border-2 text-center p-4
    `,
    card2nd: `
        border-gray-300 dark:border-gray-600
    `,
    card1st: `
        border-yellow-400 dark:border-yellow-500 
        p-6 
        transform md:scale-110 
        shadow-lg
    `,
    card3rd: `
        border-yellow-600/50 dark:border-yellow-800/80
    `,
    podiumTrophy1st: `
        h-12 w-12 text-yellow-400 mx-auto mb-2
    `,
    podiumTrophy2nd3rd: `
        h-10 w-10 mx-auto mb-2
    `,
    podiumName1st: `
        font-bold text-xl text-gray-800 dark:text-white
    `,
    podiumName2nd3rd: `
        font-bold text-lg text-gray-800 dark:text-white
    `,
    podiumPlace1st: `
        font-semibold text-yellow-500 dark:text-yellow-400
    `,
    podiumPlace2nd: `
        font-semibold text-gray-500 dark:text-gray-400
    `,
    podiumPlace3rd: `
        font-semibold text-yellow-700 dark:text-yellow-800
    `,
    podiumPoints1st: `
        text-3xl font-bold text-indigo-500 dark:text-indigo-400 mt-2
    `,
    podiumPoints2nd3rd: `
        text-2xl font-bold text-indigo-500 dark:text-indigo-400 mt-2
    `,
    // Table Styles
    table: `
        w-full 
        text-sm text-left 
        text-gray-500 dark:text-gray-400
    `,
    tableHead: `
        text-xs 
        text-gray-700 
        uppercase 
        bg-gray-50 dark:bg-gray-700 dark:text-gray-400
    `,
    tableHeadCell: `
        px-6 py-3
    `,
    tableRow: `
        bg-white border-b 
        dark:bg-gray-800 dark:border-gray-700 
        hover:bg-gray-50 dark:hover:bg-gray-600
    `,
    tableCell: `
        px-6 py-4
    `,
    tableCellRank: `
        text-gray-500 dark:text-gray-400 
        font-bold 
        w-6 text-center
    `,
    tableCellUser: `
        font-medium 
        text-gray-900 
        whitespace-nowrap dark:text-white
    `,
    tableCellPoints: `
        text-right 
        font-bold 
        text-gray-800 dark:text-white
    `,
    // Mobile List Styles
    mobileCardContainer: `
        flex items-center justify-between
    `,
    mobileUserInfo: `
        ml-3 font-bold text-gray-900 dark:text-white
    `,
    mobilePoints: `
        font-bold text-indigo-600 dark:text-indigo-400
    `,
    mobileBadgeDivider: `
        mt-4 pt-4 
        border-t 
        border-gray-200 dark:border-gray-700
    `,
};


// --- Main Leaderboard Component ---

export const Leaderboard = () => {
    const getTrophyIcon = (rank) => {
        if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-400" />;
        if (rank === 2) return <Trophy className="h-6 w-6 text-gray-400" />;
        if (rank === 3) return <Trophy className="h-6 w-6 text-yellow-600" />;
        return <span className={LEADERBOARD_STYLES.tableCellRank}>{rank}</span>;
    };

    const topThree = MOCK_LEADERBOARD.slice(0, 3);
    const restOfLeaderboard = MOCK_LEADERBOARD.slice(3);

    return (
        <div className="space-y-12">
            {/* --- Top 3 Podium Section --- */}
            <div>
                <SectionTitle icon={<Award className="h-6 w-6 text-indigo-500" />} title="COMMS Podium Finishers" />
                <div className={LEADERBOARD_STYLES.podiumGrid}>
                    {/* 2nd Place */}
                    <div className="md:order-1">
                        {topThree[1] && (
                            <Card className={`${LEADERBOARD_STYLES.cardBase} ${LEADERBOARD_STYLES.card2nd}`}>
                                <Trophy className={`${LEADERBOARD_STYLES.podiumTrophy2nd3rd} text-gray-400`} />
                                <h3 className={LEADERBOARD_STYLES.podiumName2nd3rd}>{topThree[1].name}</h3>
                                <p className={LEADERBOARD_STYLES.podiumPlace2nd}>2nd Place</p>
                                <p className={LEADERBOARD_STYLES.podiumPoints2nd3rd}>{topThree[1].points.toLocaleString()} PTS</p>
                            </Card>
                        )}
                    </div>

                    {/* 1st Place */}
                    <div className="md:order-2 relative z-10"> {/* <-- THE FIX IS HERE */}
                         {topThree[0] && (
                            <Card className={`${LEADERBOARD_STYLES.cardBase} ${LEADERBOARD_STYLES.card1st}`}>
                                <Trophy className={LEADERBOARD_STYLES.podiumTrophy1st} />
                                <h3 className={LEADERBOARD_STYLES.podiumName1st}>{topThree[0].name}</h3>
                                <p className={LEADERBOARD_STYLES.podiumPlace1st}>1st Place</p>
                                <p className={LEADERBOARD_STYLES.podiumPoints1st}>{topThree[0].points.toLocaleString()} PTS</p>
                            </Card>
                        )}
                    </div>

                    {/* 3rd Place */}
                    <div className="md:order-3">
                        {topThree[2] && (
                             <Card className={`${LEADERBOARD_STYLES.cardBase} ${LEADERBOARD_STYLES.card3rd}`}>
                                <Trophy className={`${LEADERBOARD_STYLES.podiumTrophy2nd3rd} text-yellow-700 dark:text-yellow-800`} />
                                <h3 className={LEADERBOARD_STYLES.podiumName2nd3rd}>{topThree[2].name}</h3>
                                <p className={LEADERBOARD_STYLES.podiumPlace3rd}>3rd Place</p>
                                <p className={LEADERBOARD_STYLES.podiumPoints2nd3rd}>{topThree[2].points.toLocaleString()} PTS</p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Full Leaderboard Table (for the rest) --- */}
            <div>
                <SectionTitle icon={<Trophy className="h-6 w-6 text-indigo-500" />} title="Ladder" />
                
                {/* --- Desktop Table --- */}
                <div className="hidden md:block">
                    <Card>
                        <div className="overflow-x-auto">
                            <table className={LEADERBOARD_STYLES.table}>
                                <thead className={LEADERBOARD_STYLES.tableHead}>
                                    <tr>
                                        <th scope="col" className={LEADERBOARD_STYLES.tableHeadCell}>Rank</th>
                                        <th scope="col" className={LEADERBOARD_STYLES.tableHeadCell}>User</th>
                                        <th scope="col" className={LEADERBOARD_STYLES.tableHeadCell}>Badges</th>
                                        <th scope="col" className={`${LEADERBOARD_STYLES.tableHeadCell} text-right`}>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {restOfLeaderboard.map((user, index) => (
                                        <tr key={user.id} className={LEADERBOARD_STYLES.tableRow}>
                                            <td className={LEADERBOARD_STYLES.tableCell}>{getTrophyIcon(index + 4)}</td>
                                            <th scope="row" className={`${LEADERBOARD_STYLES.tableCell} ${LEADERBOARD_STYLES.tableCellUser}`}>{user.name}</th>
                                            <td className={LEADERBOARD_STYLES.tableCell}><div className="flex space-x-2">{user.badges.map((badge, i) => <span key={i} className="text-xl">{badge}</span>)}</div></td>
                                            <td className={`${LEADERBOARD_STYLES.tableCell} ${LEADERBOARD_STYLES.tableCellPoints}`}>{user.points.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* --- Mobile Card List --- */}
                <div className="md:hidden space-y-4">
                    {restOfLeaderboard.map((user, index) => (
                        <Card key={user.id}>
                            <div className={LEADERBOARD_STYLES.mobileCardContainer}>
                                <div className="flex items-center">
                                    <div className="w-8">{getTrophyIcon(index + 4)}</div>
                                    <p className={LEADERBOARD_STYLES.mobileUserInfo}>{user.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className={LEADERBOARD_STYLES.mobilePoints}>{user.points.toLocaleString()} PTS</p>
                                </div>
                            </div>
                            {user.badges.length > 0 && (
                                <div className={LEADERBOARD_STYLES.mobileBadgeDivider}>
                                    <div className="flex space-x-2">{user.badges.map((badge, i) => <span key={i} className="text-2xl">{badge}</span>)}</div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
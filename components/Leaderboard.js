"use client"

import { Trophy, Award } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Card, SectionTitle } from "./Helper";

// Assuming MOCK_LEADERBOARD is imported from a mock data file
import { MOCK_LEADERBOARD } from "../mock/mock_data";

// --- Main Leaderboard Component ---

export const Leaderboard = () => {
	const getTrophyIcon = (rank) => {
		if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-400" />;
		if (rank === 2) return <Trophy className="h-6 w-6 text-gray-400" />;
		if (rank === 3) return <Trophy className="h-6 w-6 text-yellow-600" />;
		return <span className="text-gray-500 dark:text-gray-400 font-bold w-6 text-center">{rank}</span>;
	};

    // Separate the top 3 from the rest of the list
    const topThree = MOCK_LEADERBOARD.slice(0, 3);
    const restOfLeaderboard = MOCK_LEADERBOARD.slice(3);

	return (
		<div className="space-y-12">
            {/* --- Top 3 Podium Section --- */}
            <div>
                <SectionTitle icon={<Award className="h-6 w-6 text-indigo-500" />} title="COMMS Podium Finishers" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    {/* 2nd Place */}
                    <div className="md:order-1">
                        {topThree[1] && (
                            <Card className="border-2 border-gray-300 dark:border-gray-600 text-center p-4">
                                <Trophy className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{topThree[1].name}</h3>
                                <p className="font-semibold text-gray-500 dark:text-gray-400">2nd Place</p>
                                <p className="text-2xl font-bold text-indigo-500 dark:text-indigo-400 mt-2">{topThree[1].points.toLocaleString()} PTS</p>
                            </Card>
                        )}
                    </div>

                    {/* 1st Place */}
                    <div className="md:order-2">
                         {topThree[0] && (
                            <Card className="border-2 border-yellow-400 dark:border-yellow-500 text-center p-6 transform md:scale-110 shadow-lg">
                                <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
                                <h3 className="font-bold text-xl text-gray-800 dark:text-white">{topThree[0].name}</h3>
                                <p className="font-semibold text-yellow-500 dark:text-yellow-400">1st Place</p>
                                <p className="text-3xl font-bold text-indigo-500 dark:text-indigo-400 mt-2">{topThree[0].points.toLocaleString()} PTS</p>
                            </Card>
                        )}
                    </div>

                    {/* 3rd Place */}
                    <div className="md:order-3">
                        {topThree[2] && (
                             <Card className="border-2 border-yellow-600/50 dark:border-yellow-800/80 text-center p-4">
                                <Trophy className="h-10 w-10 text-yellow-700 dark:text-yellow-800 mx-auto mb-2" />
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{topThree[2].name}</h3>
                                <p className="font-semibold text-yellow-700 dark:text-yellow-800">3rd Place</p>
                                <p className="text-2xl font-bold text-indigo-500 dark:text-indigo-400 mt-2">{topThree[2].points.toLocaleString()} PTS</p>
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
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Rank</th>
                                        <th scope="col" className="px-6 py-3">User</th>
                                        <th scope="col" className="px-6 py-3">Badges</th>
                                        <th scope="col" className="px-6 py-3 text-right">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {restOfLeaderboard.map((user, index) => (
                                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">{getTrophyIcon(index + 4)}</td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
                                            <td className="px-6 py-4"><div className="flex space-x-2">{user.badges.map((badge, i) => <span key={i} className="text-xl">{badge}</span>)}</div></td>
                                            <td className="px-6 py-4 text-right font-bold text-gray-800 dark:text-white">{user.points.toLocaleString()}</td>
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-8">{getTrophyIcon(index + 4)}</div>
                                    <p className="ml-3 font-bold text-gray-900 dark:text-white">{user.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-indigo-600 dark:text-indigo-400">{user.points.toLocaleString()} PTS</p>
                                </div>
                            </div>
                            {user.badges.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
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

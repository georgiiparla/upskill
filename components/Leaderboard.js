import { Trophy } from 'lucide-react';

import { Card, SectionTitle } from "./Helper";

// Assuming MOCK_LEADERBOARD is imported from a mock data file
import { MOCK_LEADERBOARD } from "../mock/mock_data";

export const Leaderboard = () => {
	const getTrophyIcon = (rank) => {
		if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-400" />;
		if (rank === 2) return <Trophy className="h-6 w-6 text-gray-400" />;
		if (rank === 3) return <Trophy className="h-6 w-6 text-yellow-600" />;
		return <span className="text-gray-500 dark:text-gray-400 font-bold w-6 text-center">{rank}</span>;
	};

	return (
		<div>
			{/* The SectionTitle component is now correctly used here */}
			<SectionTitle icon={<Trophy className="h-6 w-6 text-indigo-500" />} title="Current Leaderboard" />

			<p className="mb-6 text-gray-600 dark:text-gray-400">Recognizing top performers and active participants.</p>

			{/* --- Desktop Table: Hidden on mobile, visible on medium screens and up --- */}
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
								{MOCK_LEADERBOARD.map((user, index) => (
									<tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
										<td className="px-6 py-4">
											{getTrophyIcon(index + 1)}
										</td>
										<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{user.name}
										</th>
										<td className="px-6 py-4">
											<div className="flex space-x-2">
												{user.badges.map((badge, i) => <span key={i} className="text-xl">{badge}</span>)}
											</div>
										</td>
										<td className="px-6 py-4 text-right font-bold text-gray-800 dark:text-white">
											{user.points.toLocaleString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Card>
			</div>

			{/* --- Mobile Card List: Visible on mobile, hidden on medium screens and up --- */}
			<div className="md:hidden space-y-4">
				{MOCK_LEADERBOARD.map((user, index) => (
					<Card key={user.id}>
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<div className="w-8">{getTrophyIcon(index + 1)}</div>
								<p className="ml-3 font-bold text-gray-900 dark:text-white">{user.name}</p>
							</div>
							<div className="text-right">
								<p className="font-bold text-indigo-600 dark:text-indigo-400">{user.points.toLocaleString()} PTS</p>
							</div>
						</div>
						{user.badges.length > 0 && (
							<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
								<div className="flex space-x-2">
									{user.badges.map((badge, i) => <span key={i} className="text-2xl">{badge}</span>)}
								</div>
							</div>
						)}
					</Card>
				))}
			</div>
		</div>
	);
};

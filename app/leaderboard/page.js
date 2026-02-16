import { Leaderboard } from "@/components/features/leaderboard/Leaderboard";
import { serverFetch } from "@/lib/server-api";


async function getLeaderboardData() {

    return serverFetch('/leaderboard');
}

export default async function LeaderboardPage() {
    const leaderboardData = await getLeaderboardData();
    return <Leaderboard initialData={leaderboardData} />;
}
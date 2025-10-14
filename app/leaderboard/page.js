import { Leaderboard } from "@/components/features/leaderboard/Leaderboard";
import { serverFetch } from "@/lib/server-api";
import { sleep } from "@/lib/delay";

async function getLeaderboardData() {
    await sleep(2000);
    return serverFetch('/leaderboard');
}

export default async function LeaderboardPage() {
    const leaderboardData = await getLeaderboardData();
    return <Leaderboard initialData={leaderboardData} />;
}
import { Leaderboard } from "@/components/Leaderboard";
import { serverFetch } from "@/lib/server-api"; // Import the centralized fetcher

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getLeaderboardData() {
    await sleep(2000);
    // Use the clean, centralized fetcher.
    return serverFetch('/leaderboard');
}

export default async function LeaderboardPage() {
    const leaderboardData = await getLeaderboardData();
    return <Leaderboard initialData={leaderboardData} />;
}
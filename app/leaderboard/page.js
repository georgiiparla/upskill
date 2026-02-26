import { Leaderboard } from "@/components/features/leaderboard/Leaderboard";
import { serverFetch } from "@/lib/server-api";

async function getLeaderboardData() {
    return serverFetch('/leaderboard');
}

async function getSeasonsData() {
    try {
        const data = await serverFetch('/leaderboard/seasons');
        return Array.isArray(data) ? data : [];
    } catch (e) {
        return [];
    }
}

export default async function LeaderboardPage() {
    const leaderboardData = await getLeaderboardData();
    const seasonsData = await getSeasonsData();
    return <Leaderboard initialData={leaderboardData} availableSeasons={seasonsData} />;
}
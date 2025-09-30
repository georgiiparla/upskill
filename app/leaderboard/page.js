import { redirect } from 'next/navigation';
import { Leaderboard } from "@/components/features/leaderboard/Leaderboard";
import { serverFetch } from "@/lib/server-api"; 
import { sleep } from "@/lib/delay";

async function getLeaderboardData() {
    await sleep(2000);
    return serverFetch('/leaderboard');
}

export default async function LeaderboardPage() {
    try {
        const leaderboardData = await getLeaderboardData();
        return <Leaderboard initialData={leaderboardData} />;
    } catch (error) {
        if (error.message === 'Unauthorized') {
            redirect('/login');
        }
        throw error;
    }
}
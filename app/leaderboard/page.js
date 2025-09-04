import { redirect } from 'next/navigation';
import { Leaderboard } from "@/components/Leaderboard";
import { serverFetch } from "@/lib/server-api"; 
import { sleep } from "@/lib/delay";
import { MOCK_LEADERBOARD } from "@/mock/mock_data";

async function getLeaderboardData() {
    await sleep(2000);
    if (process.env.NEXT_PUBLIC_USE_MOCK_LEADERBOARD === 'true') {
        return MOCK_LEADERBOARD;
    }
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

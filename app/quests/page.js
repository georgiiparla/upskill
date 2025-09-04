import { redirect } from 'next/navigation';
import { Quests } from "@/components/Quests";
import { serverFetch } from "@/lib/server-api";
import { sleep } from "@/lib/delay";
import { MOCK_QUESTS } from "@/mock/mock_data";

async function getQuestsData() {
    await sleep(2000);
    if (process.env.NEXT_PUBLIC_USE_MOCK_QUESTS === 'true') {
        return MOCK_QUESTS;
    }
    return serverFetch('/quests');
}

export default async function QuestsPage() {
    try {
        const questsData = await getQuestsData();
        return <Quests initialQuests={questsData} />;
    } catch (error) {
        if (error.message === 'Unauthorized') {
            redirect('/login');
        }
        throw error;
    }
}

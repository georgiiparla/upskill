import { redirect } from 'next/navigation';
import { Quests } from "@/components/Quests";
import { serverFetch } from "@/lib/server-api";
import { sleep } from "@/lib/delay";

async function getQuestsData() {
    await sleep(2000);
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
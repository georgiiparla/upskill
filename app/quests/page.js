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
    const questsData = await getQuestsData();
    return <Quests initialQuests={questsData} />;
}
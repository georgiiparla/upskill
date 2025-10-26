import { Quests } from "@/components/features/quests/Quests";
import { serverFetch } from "@/lib/server-api";
import { sleep } from "@/lib/delay";

async function getQuestsData() {
    await sleep(2000);
    return serverFetch('/quests?explicit_only=true');
}

export default async function QuestsPage() {
    const questsData = await getQuestsData();
    return <Quests initialQuests={questsData} />;
}
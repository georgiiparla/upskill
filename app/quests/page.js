import { Quests } from "@/components/Quests";
import { serverFetch } from "@/lib/server-api";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getQuestsData() {
    await sleep(2000);
    return serverFetch('/quests');
}

export default async function QuestsPage() {
    const questsData = await getQuestsData();
    return <Quests initialQuests={questsData} />;
}
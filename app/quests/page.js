import { Quests } from "@/components/features/quests/Quests";
import { serverFetch } from "@/lib/server-api";


async function getQuestsData() {

    return serverFetch('/quests?explicit_only=true');
}

export default async function QuestsPage() {
    const questsData = await getQuestsData();
    return <Quests initialQuests={questsData} />;
}
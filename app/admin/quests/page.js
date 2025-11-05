import { serverFetch } from '@/lib/server-api';
import { AdminQuestsView } from '@/components/features/admin/quests/AdminQuestsView';

export default async function AdminQuestsPage() {
    const quests = await serverFetch('/quests/admin');
    return <AdminQuestsView initialQuests={quests} />;
}

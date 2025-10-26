import { serverFetch } from '@/lib/server-api';
import { AdminQuestsView } from '@/components/features/admin/AdminQuestsView';

export default async function AdminQuestsPage() {
    const quests = await serverFetch('/quests');
    return <AdminQuestsView initialQuests={quests} />;
}

import { serverFetch } from '@/lib/server-api';
import { AdminQuestsView } from '@/components/features/admin/quests/AdminQuestsView';
import { AdminRoute } from '@/components/common/AdminRoute';

export default async function AdminQuestsPage() {
    const quests = await serverFetch('/quests/admin');
    return (
        <AdminRoute>
            <AdminQuestsView initialQuests={quests} />
        </AdminRoute>
    );
}

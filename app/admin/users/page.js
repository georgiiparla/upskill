// app/admin/users/page.js
import { redirect } from 'next/navigation';
import { serverFetch } from "@/lib/server-api";
import { UsersList } from "@/components/admin/UsersList";
import { AliasManager } from '@/components/admin/AliasManager';

async function getDirectoryData() {
    // Fetch both users and the current user's aliases in parallel
    const [users, aliases] = await Promise.all([
        serverFetch('/admin/users'),
        serverFetch('/me/aliases')
    ]);
    return { users, aliases };
}

export default async function AdminUsersPage() {
    try {
        const { users, aliases } = await getDirectoryData();
        return (
            <div className="space-y-8">
                <AliasManager initialAliases={aliases} />
                <UsersList initialUsers={users} />
            </div>
        );
    } catch (error) {
        if (error.message === 'Unauthorized') {
            redirect('/login');
        }
        throw error;
    }
}
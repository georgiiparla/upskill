import { redirect } from 'next/navigation';
import { serverFetch } from "@/lib/server-api";
import { UsersList } from "@/components/admin/UsersList";

async function getDirectoryData() {
    const users = await serverFetch('/admin/users');
    return { users };
}

export default async function AdminUsersPage() {
    try {
        const { users } = await getDirectoryData();
        return (
            <div className="space-y-8">
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
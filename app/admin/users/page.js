import { redirect } from 'next/navigation';
import { serverFetch } from "@/lib/server-api";
import { UsersList } from "@/components/admin/UsersList";

async function getUsersData() {
    return serverFetch('/admin/users');
}

export default async function AdminUsersPage() {
    try {
        const usersData = await getUsersData();
        return <UsersList initialUsers={usersData} />;
    } catch (error) {
        if (error.message === 'Unauthorized') {
            redirect('/login');
        }
        throw error;
    }
}
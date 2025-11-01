import { serverFetch } from "@/lib/server-api";
import { UsersList } from "@/components/features/admin/users/UsersList";

async function getDirectoryData() {
    const users = await serverFetch('/admin/users');
    return { users };
}

export default async function AdminUsersPage() {
    const { users } = await getDirectoryData();
    return (
        <div className="space-y-8">
            <UsersList initialUsers={users} />
        </div>
    );
}
import { redirect } from 'next/navigation';
import { serverFetch } from "@/lib/server-api";
import { AccountView } from '@/components/account/AccountView';

async function getAliases() {
    const aliases = await serverFetch('/me/aliases');
    return aliases;
}

export default async function AccountPage() {
    try {
        const aliases = await getAliases();

        return <AccountView initialAliases={aliases} />;

    } catch (error) {
        if (error.message === 'Unauthorized') {
            redirect('/login');
        }
        throw error;
    }
}
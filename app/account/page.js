import { serverFetch } from "@/lib/server-api";
import { AccountView } from '@/components/features/account/AccountView';
import { sleep } from "@/lib/delay";


export const dynamic = 'force-dynamic';

async function getAliases() {
    const aliases = await serverFetch('/me/aliases');
    await sleep(2000);
    return aliases;
}

async function getStats() {
    return serverFetch('/auth/stats');
}

export default async function AccountPage() {
    const [aliases, stats] = await Promise.all([
        getAliases(),
        getStats()
    ]);

    return <AccountView initialAliases={aliases} stats={stats} />;
}
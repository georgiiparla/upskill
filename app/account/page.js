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
    try {
        const stats = await serverFetch('/auth/stats');
        return stats;
    } catch (e) {
        console.error("Failed to fetch stats", e);
        return { likes_given: 0, likes_received: 0 };
    }
}

export default async function AccountPage() {
    const [aliases, stats] = await Promise.all([
        getAliases(),
        getStats()
    ]);

    return <AccountView initialAliases={aliases} stats={stats} />;
}
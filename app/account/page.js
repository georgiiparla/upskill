import { serverFetch } from "@/lib/server-api";
import { AccountView } from '@/components/features/account/AccountView';

async function getAliases() {
    const aliases = await serverFetch('/me/aliases');
    return aliases;
}

// NEW: Fetch user stats
async function getStats() {
    try {
        const stats = await serverFetch('/auth/stats');
        return stats;
    } catch (e) {
        console.error("Failed to fetch stats", e);
        // Fallback stats
        return { likes_given: 0, likes_received: 0 };
    }
}

export default async function AccountPage() {
    // Parallel data fetching
    const [aliases, stats] = await Promise.all([
        getAliases(),
        getStats()
    ]);

    return <AccountView initialAliases={aliases} stats={stats} />;
}
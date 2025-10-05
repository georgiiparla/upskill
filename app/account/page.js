import { serverFetch } from "@/lib/server-api";
import { AccountView } from '@/components/features/account/AccountView';

async function getAliases() {
    const aliases = await serverFetch('/me/aliases');
    return aliases;
}

export default async function AccountPage() {
    const aliases = await getAliases();
    return <AccountView initialAliases={aliases} />;
}
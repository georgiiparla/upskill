import Dashboard from "@/components/features/dashboard/Dashboard";
import { serverFetch } from "@/lib/server-api";


async function getDashboardData() {

    return serverFetch('/dashboard');
}

export default async function HomePage() {
    const dashboardData = await getDashboardData();
    return <Dashboard initialData={dashboardData} />;
}
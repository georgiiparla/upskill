import Dashboard from "@/components/features/dashboard/Dashboard";
import { serverFetch } from "@/lib/server-api";
import { sleep } from "@/lib/delay";

async function getDashboardData() {
    await sleep(2000);
    return serverFetch('/dashboard');
}

export default async function HomePage() {
    try {
        const dashboardData = await getDashboardData();
        return <Dashboard initialData={dashboardData} />;
    } catch (error) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">Dashboard Error</h1>
                <p className="mt-4 text-gray-700">{error.message}</p>
                <p className="mt-2 text-sm text-gray-500">Check Vercel logs for [ServerFetch] details.</p>
            </div>
        );
    }
}
import Dashboard from "@/components/features/dashboard/Dashboard";
import { serverFetch } from "@/lib/server-api";
import { isRedirectError } from "next/dist/client/components/redirect-error";
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
        if (isRedirectError(error)) {
            throw error;
        }
        console.error("Dashboard RSC Error:", error);
        // Return Dashboard with empty/error state
        // This allows the client-side to potentially recover or show a specific error
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">Error Loading Dashboard</h1>
                <p className="mt-4 text-gray-700">Unable to fetch server data.</p>
                <p className="mt-2 text-sm text-gray-500">{error.message}</p>
            </div>
        );
    }
}
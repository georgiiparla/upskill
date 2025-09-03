import Dashboard from "@/components/Dashboard";
import { serverFetch } from "@/lib/server-api";
import { sleep } from "@/lib/delay";
import { MOCK_DASHBOARD } from "@/mock/mock_data";

async function getDashboardData() {
    await sleep(2000);
    if (process.env.NEXT_PUBLIC_USE_MOCK_DASHBOARD === 'true') {
        return MOCK_DASHBOARD;
    }
    return serverFetch('/dashboard');
}

export default async function HomePage() {
  const dashboardData = await getDashboardData();
  
  return <Dashboard initialData={dashboardData} />;
}
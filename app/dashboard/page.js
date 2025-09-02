import Dashboard from "@/components/Dashboard";
import { serverFetch } from "@/lib/server-api";
import { sleep } from "@/lib/delay";

async function getDashboardData() {
    await sleep(2000);
    return serverFetch('/dashboard');
}

export default async function HomePage() {
  const dashboardData = await getDashboardData();
  
  return <Dashboard initialData={dashboardData} />;
}
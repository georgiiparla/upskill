import { redirect } from 'next/navigation';
import Dashboard from "@/components/Dashboard";
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
    if (error.message === 'Unauthorized') {
      redirect('/login'); 
    }
    throw error;
  }
}
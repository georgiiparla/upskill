import { redirect } from 'next/navigation';
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
  try {
    const dashboardData = await getDashboardData();
    return <Dashboard initialData={dashboardData} />;
  } catch (error) {
    if (error.message === 'Unauthorized') {
      // If unauthorized, redirect to the new login page.
      redirect('/login'); 
    }
    // For other errors, let the Next.js error boundary handle it.
    throw error;
  }
}

import Dashboard from "../../components/Dashboard";
import { serverFetch } from "@/lib/server-api"; // Import the centralized fetcher

// Helper for testing
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getDashboardData() {
    await sleep(2000); // Simulate network delay
    // Use the clean, centralized fetcher. Cookies are handled automatically.
    return serverFetch('/dashboard');
}

export default async function HomePage() {
  const dashboardData = await getDashboardData();
  
  return <Dashboard initialData={dashboardData} />;
}
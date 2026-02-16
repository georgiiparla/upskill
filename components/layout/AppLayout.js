"use client";

import { useAuthStore } from '@/store/authStore';
import { AppSidebar } from './navigation/AppSidebar';
import { usePathname } from 'next/navigation';

export default function AppLayout({ children }) {
    const { isAuthenticated } = useAuthStore();
    const pathname = usePathname();

    // Pages that don't show the sidebar (login, signup)
    const isPublicRoute = ['/login', '/signup'].includes(pathname);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col lg:flex-row">
            {isAuthenticated && !isPublicRoute && (
                <div className="h-full lg:h-screen lg:sticky lg:top-0 lg:left-0 z-40">
                    <AppSidebar />
                </div>
            )}

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}

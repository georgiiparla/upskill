"use client"

import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/shared/navbar/Navbar';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PUBLIC_ROUTES = ['/login', '/signup'];

/**
 * A layout component that acts as a client-side route guard.
 * It shows the main navigation and layout for authenticated users on protected routes.
 * It redirects unauthenticated users to the login page.
 * It renders public routes (like login/signup) without the main layout.
 */

export default function AppLayout({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    useEffect(() => {
        if (!loading && !isAuthenticated && !isPublicRoute) {
            router.push('/login');
        }
    }, [loading, isAuthenticated, isPublicRoute, router, pathname]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-csway-green" />
            </div>
        );
    }

    if (isPublicRoute) {
        return <>{children}</>;
    }

    if (isAuthenticated && !isPublicRoute) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <Navbar />
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Loader2 className="h-12 w-12 animate-spin text-csway-green" />
        </div>
    );
}

"use client"

import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/shared/Navbar';
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
        // If loading is finished and the user is NOT authenticated on a PROTECTED route,
        // redirect them to the login page.
        if (!loading && !isAuthenticated && !isPublicRoute) {
            router.push('/login');
        }
    }, [loading, isAuthenticated, isPublicRoute, router, pathname]);

    // Show a global loading screen while checking auth state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-csway-green" />
            </div>
        );
    }
    
    // For public routes, just render the page content.
    if (isPublicRoute) {
        return <>{children}</>;
    }

    // For authenticated users on protected routes, render the full app layout.
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

    // This renders a loader for the brief moment before the redirect effect kicks in for unauthenticated users.
    return (
         <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Loader2 className="h-12 w-12 animate-spin text-csway-green" />
        </div>
    );
}

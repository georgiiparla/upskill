"use client";

import { useAuth } from '@/context/AuthContext';
import { Navbar } from '../navigation/Navbar';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PUBLIC_ROUTES = ['/login', '/signup'];

export default function AppLayout({ children }) {
    const { isAuthenticated, isLoading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isCallbackRoute = pathname.startsWith('/auth/callback');

    useEffect(() => {
        if (isLoading) return;

        // Redirect authenticated users from public routes
        if (isAuthenticated && (isPublicRoute || isCallbackRoute)) {
            router.replace('/dashboard');
        }

        // Redirect unauthenticated users from protected routes
        if (!isAuthenticated && !isPublicRoute && !isCallbackRoute) {
            router.replace('/login');
        }
    }, [isLoading, isAuthenticated, isPublicRoute, isCallbackRoute, router]);

    // Show a global loader during auth checks or redirects
    if (isLoading ||
        (isAuthenticated && (isPublicRoute || isCallbackRoute)) ||
        (!isAuthenticated && !isPublicRoute && !isCallbackRoute)) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-csway-green" />
            </div>
        );
    }

    // Render the appropriate layout once auth state is resolved and no redirect is pending
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {isAuthenticated && <Navbar />}
            <main className={isAuthenticated ? "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8" : ""}>
                {children}
            </main>
        </div>
    );
}
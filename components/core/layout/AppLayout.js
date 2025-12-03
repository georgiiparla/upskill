"use client";

import { useAuth } from '@/context/AuthContext';
import { Navbar } from '../navigation/Navbar';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PUBLIC_ROUTES = ['/login', '/signup'];

export default function AppLayout({ children }) {
    const { isAuthenticated, isLoading, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isCallbackRoute = pathname.startsWith('/auth/callback');

    // --- CRITICAL FIX: TIMEOUT GUARD ---
    // If the app is stuck loading for > 5 seconds, it's likely a loop.
    // Force a logout to clear state and return to login.
    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                console.error("Authentication timeout detected - Forcing state reset.");
                logout();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isLoading, logout]);

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

    // Render the layout with a loading overlay if needed
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative">
            {/* Global Loader Overlay */}
            {(isLoading ||
                (isAuthenticated && (isPublicRoute || isCallbackRoute)) ||
                (!isAuthenticated && !isPublicRoute && !isCallbackRoute)) && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                        <Loader2 className="h-12 w-12 animate-spin text-csway-green" />
                    </div>
                )}

            {/* Main Content - Always mounted to preserve state */}
            <div className={isLoading ? "invisible" : ""}>
                {isAuthenticated && <Navbar />}
                <main className={isAuthenticated ? "mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8" : ""}>
                    {children}
                </main>
            </div>
        </div>
    );
}
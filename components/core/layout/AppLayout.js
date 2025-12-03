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

    }, [isAuthenticated, isLoading, isPublicRoute, isCallbackRoute, router]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {isAuthenticated && <Navbar />}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
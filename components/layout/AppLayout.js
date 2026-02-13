"use client";

import { useAuth } from '@/context/AuthContext';
import { AppSidebar } from './navigation/AppSidebar';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PUBLIC_ROUTES = ['/login', '/signup'];

export default function AppLayout({ children }) {
    const { isAuthenticated, isLoading, logout, loadingMessage, setIsLoading, setLoadingMessage } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isCallbackRoute = pathname.startsWith('/auth/callback');

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                console.error("Authentication timeout detected - Forcing state reset.");
                logout();
            }, 15000);
            return () => clearTimeout(timer);
        }
    }, [isLoading, logout]);

    useEffect(() => {
        if (pathname === '/login' && isLoading && !isAuthenticated) {
            const t = setTimeout(() => {
                setIsLoading(false);
                if (setLoadingMessage) setLoadingMessage('');
            }, 500);
            return () => clearTimeout(t);
        }
    }, [pathname, isLoading, isAuthenticated, setIsLoading, setLoadingMessage]);

    useEffect(() => {
        if (isLoading) return;

        if (isAuthenticated && (isPublicRoute || isCallbackRoute)) {
            router.replace('/dashboard');
        }

    }, [isAuthenticated, isLoading, isPublicRoute, isCallbackRoute, router]);


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col lg:flex-row">
            {isLoading ? (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                    <Loader2 className="h-10 w-10 animate-spin text-csway-green mb-4" />
                    {loadingMessage && (
                        <p className="text-gray-600 dark:text-gray-300 font-medium animate-pulse">
                            {loadingMessage}
                        </p>
                    )}
                </div>
            ) : (
                <>
                    {isAuthenticated && (
                        <div className="h-full lg:h-screen lg:sticky lg:top-0 lg:left-0 z-40">
                            <AppSidebar />
                        </div>
                    )}

                    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </main>
                </>
            )}
        </div>
    );
}
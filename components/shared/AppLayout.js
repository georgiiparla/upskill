// components/shared/AppLayout.js

"use client"

import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/shared/navbar/Navbar';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PUBLIC_ROUTES = ['/login', '/signup'];

export default function AppLayout({ children }) {
    const { isAuthenticated, loading, isAuthenticating } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isCallbackRoute = pathname.startsWith('/auth/callback');

    console.log("7. AppLayout is rendering.", { pathname, isAuthenticated, loading, isAuthenticating });

    useEffect(() => {
        // While the app is validating the session or a token, show the loader.
        console.log("8. AppLayout useEffect is running.", { pathname, isAuthenticated, loading, isAuthenticating });
        if (loading || isAuthenticating) {
            return;
        }

        // Logic for authenticated (logged-in) users
        if (isAuthenticated) {
            // If the user is logged in but on the login or callback page,
            // redirect them to the main dashboard.
            if (isPublicRoute || isCallbackRoute) {
                router.push('/dashboard');
            }
            return;
        }

        // Logic for unauthenticated users
        if (!isAuthenticated) {
            // If the user is NOT on a public page AND NOT on the callback page,
            // they must be sent to the login page.
            console.log("123213131312")
            if (!isPublicRoute && !isCallbackRoute) {
                router.push('/login');
            }
        }

    }, [loading, isAuthenticated, isPublicRoute, isCallbackRoute, isAuthenticating, router, pathname]);

    // Show a global loader when the session is first loading or during the callback authentication
    if (loading || isAuthenticating) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-csway-green" />
            </div>
        );
    }

    // If authenticated or on a public route, show the content
    if (isAuthenticated || isPublicRoute || isCallbackRoute) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                {isAuthenticated && <Navbar />}
                <main className={isAuthenticated ? "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8" : ""}>
                    {children}
                </main>
            </div>
        );
    }

    // Fallback loader
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Loader2 className="h-12 w-12 animate-spin text-csway-green" />
        </div>
    );
}
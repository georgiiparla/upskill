"use client"

import { useAuth } from '@/context/AuthContext';
import { Auth } from '@/components/Auth';
import { Navbar } from '@/components/Navbar';
import { Loader2 } from 'lucide-react';

export default function AppLayout({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-csway-green" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Auth />;
    }

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
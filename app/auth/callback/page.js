// app/auth/callback/page.js

"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
    const searchParams = useSearchParams();
    const { handleTokenLogin } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            // Just call the function. The AppLayout will handle the redirect.
            handleTokenLogin(token);
        }
        // No need for an else, AppLayout will handle unauthorized access.
    }, [searchParams, handleTokenLogin]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 animate-spin text-csway-green mb-4" />
                <p className="text-gray-600 dark:text-gray-300">Finalizing login...</p>
            </div>
        </div>
    );
}
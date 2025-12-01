"use client";

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { handleTokenLogin } = useAuth();
    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current === true) return;

        const token = searchParams.get('token');

        if (token) {
            // Remove token from URL immediately for security
            window.history.replaceState({}, document.title, window.location.pathname);

            handleTokenLogin(token).then(() => {
                router.replace('/dashboard');
            });
        } else {
            router.replace('/login');
        }

        effectRan.current = true;
    }, [searchParams, handleTokenLogin, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 animate-spin text-csway-green mb-4" />
                <p className="text-gray-600 dark:text-gray-300">Finalizing secure login...</p>
            </div>
        </div>
    );
}
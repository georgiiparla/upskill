// app/auth/callback/page.js
"use client";

import { useEffect, useRef } from 'react'; // 1. Import useRef
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
    const searchParams = useSearchParams();
    const { handleTokenLogin } = useAuth();
    const hasRun = useRef(false); // 2. Create a ref to track execution

    useEffect(() => {
        // 3. Only run if the effect has not run before
        if (!hasRun.current) {
            const token = searchParams.get('token');
            if (token) {
                handleTokenLogin(token);
            }
            hasRun.current = true; // 4. Mark it as run
        }
    }, []); // The empty array is still correct

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 animate-spin text-csway-green mb-4" />
                <p className="text-gray-600 dark:text-gray-300">Finalizing login...</p>
            </div>
        </div>
    );
}
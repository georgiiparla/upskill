"use client";

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

import { Suspense } from 'react';

function AuthCallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { handleTokenLogin } = useAuth();
    const processedRef = useRef(false);
    const [status, setStatus] = useState('initializing'); // initializing, processing, success, error

    useEffect(() => {
        // Prevent double execution
        if (processedRef.current) return;

        const token = searchParams.get('token');

        if (token) {
            processedRef.current = true;
            setStatus('processing');

            // Remove token from URL immediately for security
            // We use replaceState so we don't trigger a navigation event that might unmount us
            window.history.replaceState({}, document.title, window.location.pathname);

            handleTokenLogin(token)
                .then(() => {
                    setStatus('success');
                    router.replace('/dashboard');
                })
                .catch((err) => {
                    console.error("Login failed in callback:", err);
                    setStatus('error');
                    // Optional: redirect to login with error
                    router.replace('/login?error=callback_failed');
                });
        } else {
            // If no token and we haven't processed yet, it's an error or direct access
            // But we need to be careful about re-renders where token was just removed
            // Since we set processedRef.current = true BEFORE removing token, 
            // the next render (if any) will hit the first check and return.

            // However, if we mount for the first time without a token:
            if (!processedRef.current) {
                console.warn("No token found in callback URL");
                router.replace('/login');
            }
        }
    }, [searchParams, handleTokenLogin, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 animate-spin text-csway-green mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                    {status === 'processing' ? 'Finalizing secure login...' :
                        status === 'success' ? 'Redirecting...' :
                            status === 'error' ? 'Login failed.' : 'Initializing...'}
                </p>
            </div>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-csway-green" />
            </div>
        }>
            <AuthCallbackContent />
        </Suspense>
    );
}
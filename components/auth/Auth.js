"use client";
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 8.841C34.524 5.105 29.582 3 24 3C12.438 3 3 12.438 3 24s9.438 21 21 21s21-9.438 21-21c0-1.328-.135-2.618-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691L12.01 19.085C13.686 13.02 18.431 9.087 24 9.087c3.059 0 5.842 1.154 7.961 3.039L38.804 8.841C34.524 5.105 29.582 3 24 3C16.634 3 10.273 6.948 6.306 12.691z"></path>
        <path fill="#4CAF50" d="M24 45c5.582 0 10.524-1.883 14.193-5.187l-6.024-4.57C30.344 38.337 27.352 40 24 40c-5.569 0-10.314-3.933-11.99-9.258l-5.694 4.391C10.273 41.052 16.634 45 24 45z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.024 4.57C39.993 34.61 44 28.711 44 24c0-1.328-.135-2.618-.389-3.917z"></path>
    </svg>
);

export const Auth = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9292';

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900/50 p-4">

            <div className="flex items-center gap-3 mb-8">
                <Image src="/csway-logo.png" alt="Upskill Logo" width={40} height={40} />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 tracking-tight">
                    Upskill
                </h1>
            </div>

            {error && (
                <p className="text-sm text-center text-red-500 bg-red-50 dark:bg-red-900/20 py-2 px-3 rounded-md mb-8">
                    {error}
                </p>
            )}

            <div className="flex justify-center">
                <a
                    href={`${backendUrl}/auth/google/login`}
                    className="w-auto flex items-center justify-center px-6 py-2.5 font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-csway-green/50 transition-colors"
                >
                    <GoogleIcon />
                    Sign in
                </a>
            </div>

        </div>
    );
};
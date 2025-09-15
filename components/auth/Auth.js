"use client";
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 8.841C34.524 5.105 29.582 3 24 3C12.438 3 3 12.438 3 24s9.438 21 21 21s21-9.438 21-21c0-1.328-.135-2.618-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691L12.01 19.085C13.686 13.02 18.431 9.087 24 9.087c3.059 0 5.842 1.154 7.961 3.039L38.804 8.841C34.524 5.105 29.582 3 24 3C16.634 3 10.273 6.948 6.306 12.691z"></path>
        <path fill="#4CAF50" d="M24 45c5.582 0 10.524-1.883 14.193-5.187l-6.024-4.57C30.344 38.337 27.352 40 24 40c-5.569 0-10.314-3.933-11.99-9.258l-5.694 4.391C10.273 41.052 16.634 45 24 45z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.024 4.57C39.993 34.61 44 28.711 44 24c0-1.328-.135-2.618-.389-3.917z"></path>
    </svg>
);

const LogoAnimation = () => {
    return (
        <div className="relative flex items-center justify-center w-48 h-48">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-csway-green/30"
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                        delay: i * 0.7,
                        ease: 'easeOut',
                    }}
                />
            ))}
            <Image src="/csway-logo.png" alt="Upskill Logo" width={64} height={64} className="opacity-80" />
        </div>
    );
};

const ErrorMessage = () => {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    if (!error) return null;

    let message;
    switch (error) {
        case 'unauthorized_email':
            message = 'This account is not authorized to access the platform.';
            break;
        case 'account_creation_failed':
            message = 'Failed to create an account. Please try again.';
            break;
        default:
            message = 'An unknown error occurred.';
    }

    return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-md text-sm flex items-center gap-3 mb-4">
            <AlertTriangle className="h-5 w-5" />
            <span>{message}</span>
        </div>
    );
};


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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm min-h-[450px] p-8 bg-white rounded-2xl shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col justify-between"
            >
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        Welcome to Upskill
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Sign in with Google to continue
                    </p>
                </div>

                <div className="my-4">
                    {/* Render the ErrorMessage component here */}
                    <ErrorMessage />
                    <div className="flex justify-center items-center">
                        <LogoAnimation />
                    </div>
                </div>


                <a
                    href={`${backendUrl}/auth/google/login`}
                    className="inline-flex items-center justify-center px-4 py-2 font-medium text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-csway-green/50 transition-colors"
                >
                    <GoogleIcon />
                    Sign in
                </a>


            </motion.div>
        </div>
    );
};
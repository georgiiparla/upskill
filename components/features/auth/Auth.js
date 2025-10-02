"use client";
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Card } from '../../shared/helpers/Helper';

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
            {/* Circular swirl particles only */}
            {[...Array(18)].map((_, i) => (
                <motion.div
                    key={`swirl-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-green-300/40"
                    animate={{
                        x: [
                            Math.cos(i * 30 * Math.PI / 180) * 80,
                            Math.cos((i * 30 + 180) * Math.PI / 180) * 100,
                            Math.cos(i * 30 * Math.PI / 180) * 80
                        ],
                        y: [
                            Math.sin(i * 30 * Math.PI / 180) * 80,
                            Math.sin((i * 30 + 180) * Math.PI / 180) * 100,
                            Math.sin(i * 30 * Math.PI / 180) * 80
                        ],
                        opacity: [0, 0.6, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 1.5,
                        repeat: Infinity,
                        delay: i * 0.15 + Math.random() * 1,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Centered spinning logo */}
            <motion.div
                className="relative z-10"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 12, // Slow spin
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                <Image
                    src="/csway-logo.png"
                    alt="Upskill Logo"
                    width={60}
                    height={60}
                    className="opacity-90"
                />
            </motion.div>
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
            <Card className="w-full max-w-sm min-h-[450px] !p-8 !rounded-2xl flex flex-col justify-between">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        Welcome to upskill
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Sign in with Google to continue
                    </p>
                </div>

                <div className="my-4">
                    <ErrorMessage />
                    <div className="flex justify-center items-center">
                        <LogoAnimation />
                    </div>
                </div>

                <a
                    href={`${backendUrl}/auth/google/login`}
                    className="inline-flex items-center justify-center px-4 py-2 font-medium text-gray-700 dark:text-gray-200 rounded-lg hover:bg-slate-50/80 dark:hover:bg-slate-700/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-csway-green/50 transition-all duration-200 bg-transparent"
                >
                    <GoogleIcon />
                    Sign in
                </a>
            </Card>
        </div>
);}
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Shared';

import { LogoAnimation } from './components/LogoAnimation';
import { InlineErrorButton } from './components/InlineErrorButton';
import { SignInButton } from './components/SignInButton';



export const Auth = () => {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    const [isRedirecting, setIsRedirecting] = useState(false);
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9292';

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (isRedirecting) return;

        setIsRedirecting(true);

        setTimeout(() => {
            window.location.href = `${backendUrl}/auth/google/login`;
        }, 800);
    };

    const handleRetry = () => {
        router.replace(pathname);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-sm min-h-[450px] !p-8 !rounded-2xl flex flex-col justify-between overflow-hidden">
                <div className="text-center relative z-20">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        Welcome to Upskill
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Sign in with Google to continue
                    </p>
                </div>

                <div className="my-4 flex justify-center items-center relative z-10">
                    <LogoAnimation isRedirecting={isRedirecting} />
                </div>

                <div className="min-h-[42px]">
                    <AnimatePresence mode="wait">
                        {error ? (
                            <InlineErrorButton
                                key="error-banner"
                                errorCode={error}
                                onRetry={handleRetry}
                            />
                        ) : (
                            <SignInButton
                                key="signin-btn"
                                handleLogin={handleLogin}
                                isRedirecting={isRedirecting}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </Card>
        </div>
    );
};
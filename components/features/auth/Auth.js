"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { AlertCircle, Loader2, X, ArrowRight } from 'lucide-react';
import { Card } from '../../shared/helpers/Helper';

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 8.841C34.524 5.105 29.582 3 24 3C12.438 3 3 12.438 3 24s9.438 21 21 21s21-9.438 21-21c0-1.328-.135-2.618-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691L12.01 19.085C13.686 13.02 18.431 9.087 24 9.087c3.059 0 5.842 1.154 7.961 3.039L38.804 8.841C34.524 5.105 29.582 3 24 3C16.634 3 10.273 6.948 6.306 12.691z"></path>
        <path fill="#4CAF50" d="M24 45c5.582 0 10.524-1.883 14.193-5.187l-6.024-4.57C30.344 38.337 27.352 40 24 40c-5.569 0-10.314-3.933-11.99-9.258l-5.694 4.391C10.273 41.052 16.634 45 24 45z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.024 4.57C39.993 34.61 44 28.711 44 24c0-1.328-.135-2.618-.389-3.917z"></path>
    </svg>
);

const LogoAnimation = ({ isRedirecting }) => {
    // Parallax Effect Setup
    const x = useSpring(0, { stiffness: 40, damping: 15 });
    const y = useSpring(0, { stiffness: 40, damping: 15 });

    // Track mouse for subtle 3D tilt
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const xPct = (e.clientX / innerWidth - 0.5) * 10;
            const yPct = (e.clientY / innerHeight - 0.5) * 10;
            x.set(xPct);
            y.set(yPct);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    const rotateX = useTransform(y, (val) => -val);
    const rotateY = useTransform(x, (val) => val);

    const orbPalette = [
        { fill: 'rgba(16, 185, 129, 0.82)', shadow: '0 0 12px rgba(16,185,129,0.5)' },
        { fill: 'rgba(59, 130, 246, 0.82)', shadow: '0 0 12px rgba(59,130,246,0.5)' },
        { fill: 'rgba(251, 191, 36, 0.86)', shadow: '0 0 12px rgba(251,191,36,0.5)' },
        { fill: 'rgba(239, 68, 68, 0.8)', shadow: '0 0 12px rgba(239,68,68,0.48)' },
    ];

    const orbConfigs = [
        { key: 'orb-1', radius: 74, size: 2, duration: 7.6, delay: 0 },
        { key: 'orb-2', radius: 60, size: 1.5, duration: 6, delay: 0.9 },
        { key: 'orb-3', radius: 68, size: 1.7, duration: 6.6, delay: 1.8 },
        { key: 'orb-4', radius: 52, size: 1.3, duration: 5.4, delay: 2.7 },
        { key: 'orb-5', radius: 84, size: 2.1, duration: 8.2, delay: 3.6 },
        { key: 'orb-6', radius: 56, size: 1.4, duration: 6.2, delay: 4.5 },
        { key: 'orb-7', radius: 70, size: 1.8, duration: 7.1, delay: 5.4 },
        { key: 'orb-8', radius: 62, size: 1.45, duration: 5.8, delay: 6.3 },
        { key: 'orb-9', radius: 76, size: 1.9, duration: 7.8, delay: 7.2 },
    ];

    return (
        <motion.div
            className="relative flex items-center justify-center w-48 h-48"
            style={{
                rotateX,
                rotateY,
                perspective: 1000,
                transformStyle: "preserve-3d"
            }}
        >
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: 'radial-gradient(circle at center, rgba(14,165,233,0.12) 0%, rgba(16,185,129,0.08) 55%, rgba(251,191,36,0.06) 85%, rgba(15,23,42,0) 100%)',
                    filter: 'blur(18px)',
                    transform: 'translateZ(-20px)'
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isRedirecting
                    ? { opacity: 0, scale: 0 }
                    : { opacity: [0.12, 0.2, 0.12], scale: [0.9, 1.05, 0.9] }
                }
                transition={{
                    duration: isRedirecting ? 0.5 : 7,
                    repeat: isRedirecting ? 0 : Infinity,
                    ease: 'easeInOut'
                }}
            />

            <motion.div
                className="absolute z-0 w-24 h-24 rounded-full bg-emerald-300/15 blur-2xl"
                initial={{ opacity: 0 }}
                animate={isRedirecting
                    ? { opacity: 0, scale: 0 }
                    : { opacity: [0.18, 0.28, 0.18], scale: [0.9, 1.05, 0.9] }
                }
                transition={{
                    duration: isRedirecting ? 0.5 : 6.5,
                    repeat: isRedirecting ? 0 : Infinity,
                    ease: 'easeInOut',
                    delay: 0.2
                }}
            />

            {orbConfigs.map(({ key, radius, size, duration, delay }, index) => {
                const paletteEntry = orbPalette[index % orbPalette.length];

                return (
                    <motion.span
                        key={key}
                        className="absolute rounded-full"
                        style={{
                            width: `${size * 4}px`,
                            height: `${size * 4}px`,
                            backgroundColor: paletteEntry.fill,
                            boxShadow: paletteEntry.shadow,
                            transform: 'translateZ(10px)'
                        }}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={isRedirecting ? {
                            x: 0,
                            y: 0,
                            opacity: 0,
                            scale: 0,
                            transition: { duration: 0.6, ease: "backIn" }
                        } : {
                            x: [
                                Math.cos(index * 1.2) * radius,
                                Math.cos(index * 1.2 + Math.PI / 3) * (radius + 10),
                                Math.cos(index * 1.2 + Math.PI) * radius,
                            ],
                            y: [
                                Math.sin(index * 1.2) * radius,
                                Math.sin(index * 1.2 + Math.PI / 3) * (radius + 10),
                                Math.sin(index * 1.2 + Math.PI) * radius,
                            ],
                            opacity: [0.35, 0.85, 0.35],
                            scale: [1, 1.2, 1],
                            transition: {
                                duration,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: delay * 0.5
                            }
                        }}
                    />
                );
            })}

            <motion.div
                className="relative z-10"
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={isRedirecting
                    ? {
                        scale: 0,
                        opacity: 0,
                        rotate: 360,
                        transition: { duration: 0.5, ease: "backIn" }
                    }
                    : {
                        scale: 1,
                        opacity: 1,
                        rotate: 360,
                        transition: {
                            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                            scale: { type: "spring", stiffness: 200, damping: 15 },
                            opacity: { duration: 0.5 }
                        }
                    }
                }
                whileHover={{ scale: 1.1 }}
            >
                <Image
                    src="/csway-logo.png"
                    alt="Upskill Logo"
                    width={60}
                    height={60}
                    className="opacity-90"
                    priority
                />
            </motion.div>
        </motion.div>
    );
};

// New Inline Error Button Component
const InlineErrorButton = ({ errorCode, onRetry }) => {
    let message = 'Authentication failed';
    if (errorCode === 'unauthorized_email') message = 'Unauthorized';
    else if (errorCode === 'account_creation_failed') message = 'Account creation failed';

    return (
        <motion.button
            onClick={onRetry}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mx-auto w-auto relative z-20 group flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg 
            bg-red-50/80 dark:bg-red-900/10 
            border border-red-200 dark:border-red-800 
            text-red-600 dark:text-red-400 
            hover:bg-red-100 dark:hover:bg-red-900/20 
            focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
        >
            <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{message}</span>
            </div>
        </motion.button>
    );
};

// Standard Sign In Button
const SignInButton = ({ handleLogin, isRedirecting }) => {
    return (
        <motion.a
            href="#"
            onClick={handleLogin}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`
                w-full relative z-20 inline-flex items-center justify-center px-4 py-2 font-medium text-gray-700 dark:text-gray-200 
                rounded-lg hover:bg-slate-50/80 dark:hover:bg-slate-700/30 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-csway-green/50 transition-all duration-200 bg-transparent
                border border-transparent hover:border-slate-200 dark:hover:border-slate-700
                ${isRedirecting ? 'opacity-75 cursor-wait scale-95' : ''}
            `}
        >
            {isRedirecting ? (
                <Loader2 className="w-5 h-5 mr-3 animate-spin text-csway-green" />
            ) : (
                <GoogleIcon />
            )}
            {isRedirecting ? 'Connecting...' : 'Sign in'}
        </motion.a>
    );
};

export const Auth = () => {
    const { isAuthenticated } = useAuth();
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
        // Clear the URL params to return to "Sign In" state
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

                {/* Authentication Action Area - Toggles between Button and Error */}
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
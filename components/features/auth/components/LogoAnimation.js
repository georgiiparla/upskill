"use client";
import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Snowflake } from 'lucide-react';

export const LogoAnimation = ({ isRedirecting }) => {
    // Parallax Effect Setup
    const x = useSpring(0, { stiffness: 40, damping: 15 });
    const y = useSpring(0, { stiffness: 40, damping: 15 });

    // TOGGLE: 'orbs' or 'snowflakes'
    const variant = 'snowflakes';

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

                // Snowflakes Variant
                if (variant === 'snowflakes') {
                    return (
                        <motion.div
                            key={key}
                            className="absolute flex items-center justify-center text-gray-600 dark:text-sky-100/90"
                            style={{
                                width: `${size * 9}px`, // Slightly larger for icons
                                height: `${size * 9}px`,
                                filter: 'drop-shadow(0 0 6px rgba(186, 230, 253, 0.5)) dark:drop-shadow(0 0 6px rgba(186, 230, 253, 0.5))',
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
                                opacity: [0.4, 1, 0.4],
                                scale: [0.8, 1.2, 0.8],
                                rotate: [0, 180, 360], // Add rotation for snowflakes
                                transition: {
                                    duration: duration * 1.2, // Slightly slower/floatier
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: delay * 0.5
                                }
                            }}
                        >
                            <Snowflake className="w-full h-full stroke-[1.5px]" />
                        </motion.div>
                    );
                }

                // Default Orbs Variant
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

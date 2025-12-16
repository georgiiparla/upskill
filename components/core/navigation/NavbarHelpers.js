import { useState, useEffect, useRef } from 'react';
import { getMyLeaderboardEntry } from '@/lib/client-api';

export const useScrollBehavior = (scrolled, setScrolled) => {
    const FOLD_THRESHOLD = 30;
    const UNFOLD_THRESHOLD = 10;
    const scrolledRef = useRef(scrolled);
    const lastScrollYRef = useRef(window.scrollY);

    useEffect(() => {
        scrolledRef.current = scrolled;
    }, [scrolled]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (Math.abs(currentScrollY - lastScrollYRef.current) < 5) return;
            lastScrollYRef.current = currentScrollY;

            if (currentScrollY > FOLD_THRESHOLD && !scrolledRef.current) {
                setScrolled(true);
            } else if (currentScrollY < UNFOLD_THRESHOLD && scrolledRef.current) {
                setScrolled(false);
            }
        };

        document.addEventListener('scroll', handleScroll, { passive: true });
        return () => document.removeEventListener('scroll', handleScroll);
    }, []);
};

export const usePointsData = (user, refreshTrigger = 0) => {
    const [points, setPoints] = useState(null);
    const [rank, setRank] = useState(null);
    const [isPointsLoading, setIsPointsLoading] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        const fetchPoints = async () => {
            if (!user) {
                setPoints(null);
                setRank(null);
                setIsPointsLoading(false);
                return;
            }

            setIsPointsLoading(true);
            const response = await getMyLeaderboardEntry();
            if (!isCancelled) {
                if (response.success) {
                    setPoints(response.data.points ?? 0);
                    setRank(response.data.rank ?? null);
                } else {
                    console.warn('Failed to load points counter:', response.error);
                    setPoints(null);
                    setRank(null);
                }
                setIsPointsLoading(false);
            }
        };

        fetchPoints();
        return () => { isCancelled = true; };
    }, [user, refreshTrigger]);

    return { points, rank, isPointsLoading };
};

export const usePointsBadge = (rank) => {
    const getPointsBadgeClasses = () => {
        if (rank === 1) {
            return "bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-500/30";
        }
        if (rank === 2) {
            return "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-500/30";
        }
        if (rank === 3) {
            return "bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-500/30";
        }
        if (rank === 4 || rank === 5) {
            return "bg-gradient-to-r from-sky-500/10 to-blue-500/10 text-sky-700 dark:text-sky-300 border border-sky-200/50 dark:border-sky-500/30";
        }
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700";
    };

    return { getPointsBadgeClasses };
};

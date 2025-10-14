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
            return "bg-yellow-500/10 dark:bg-yellow-300/10 text-yellow-800 dark:text-yellow-200 border border-yellow-500/30 dark:border-yellow-300/30";
        }
        if (rank === 2) {
            return "bg-slate-500/10 dark:bg-slate-200/10 text-slate-900 dark:text-slate-100 border border-slate-500/30 dark:border-slate-200/30";
        }
        if (rank === 3) {
            return "bg-orange-500/10 dark:bg-orange-300/10 text-amber-900 dark:text-amber-100 border border-orange-500/30 dark:border-orange-300/30";
        }
        if (rank === 4 || rank === 5) {
            return "bg-green-500/10 dark:bg-green-300/10 text-green-800 dark:text-green-200 border border-green-500/30 dark:border-green-300/30";
        }
        return "bg-blue-500/10 dark:bg-blue-300/10 text-blue-800 dark:text-blue-200 border border-blue-500/30 dark:border-blue-300/30";
    };

    return { getPointsBadgeClasses };
};

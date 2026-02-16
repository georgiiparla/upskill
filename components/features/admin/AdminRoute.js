"use client";

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const AdminRoute = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Only redirect if we are sure about the state
        // In the new architecture, AuthInitializer seeds this immediately
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        if (!isAdmin) {
            router.push('/dashboard');
            return;
        }
    }, [isAuthenticated, isAdmin, router]);

    if (!isAuthenticated || !isAdmin) {
        return null;
    }

    return children;
};

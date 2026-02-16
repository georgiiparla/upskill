"use client";

import React, { createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const { user, isAuthenticated, isAdmin, clearAuth, refreshNavbarPoints, navbarRefreshTrigger } = useAuthStore();
    const router = useRouter();

    const logout = useCallback(async () => {
        try {
            // Server-side logout (clears the HttpOnly cookie)
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            clearAuth();
            router.push('/login');
            router.refresh();
        }
    }, [clearAuth, router]);

    // Provided for backward compatibility with existing components
    const value = {
        user,
        isAuthenticated,
        isAdmin,
        logout,
        refreshNavbarPoints,
        navbarRefreshTrigger,
        
        // These are now constant or dummy to prevent crashes in old components
        isLoading: false,
        loadingMessage: '',
        error: null,
        clearError: () => {},
        handleTokenLogin: async () => {},
        checkSession: async () => {}, // No longer needed on client-side mount
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

"use client";

import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [navbarRefreshTrigger, setNavbarRefreshTrigger] = useState(0);

    const router = useRouter();
    const hasCheckedSession = useRef(false);

    const clearError = () => setError(null);

    // 1. Check Session via Proxy
    // The Proxy automatically attaches the cookie token to this request
    const checkSession = useCallback(async () => {
        setIsLoading(true);
        try {
            // We fetch from the PROXY, not the backend directly
            const response = await fetch('/api/proxy/auth/profile');

            if (response.ok) {
                const data = await response.json();
                if (data.logged_in) {
                    setUser(data.user);
                    setIsAuthenticated(true);
                    setIsAdmin(data.is_admin || false);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (err) {
            console.error("Session check failed:", err);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!hasCheckedSession.current) {
            checkSession();
            hasCheckedSession.current = true;
        }
    }, [checkSession]);

    // 2. Handle Login Token
    // Sends the token (from URL) to Next.js API to set the HttpOnly cookie
    const handleTokenLogin = useCallback(async (token) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });

            if (res.ok) {
                await checkSession();
            } else {
                setError("Failed to initialize session.");
            }
        } catch (e) {
            console.error("Login handling error", e);
            setError("Login failed. Please try again.");
        }
    }, [checkSession]);

    // 3. Logout
    // Calls both backend (optional) and Next.js (critical) to clear session
    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetch('/api/proxy/auth/logout', { method: 'POST' }); // Backend
            await fetch('/api/auth/logout', { method: 'POST' }); // Next.js Cookie
            router.push('/login');
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            setIsAdmin(false);
            setIsLoading(false);
        }
    }, [router]);

    const refreshNavbarPoints = useCallback(() => {
        setNavbarRefreshTrigger(prev => prev + 1);
    }, []);

    const value = {
        user,
        isAuthenticated,
        isAdmin,
        isLoading,
        logout,
        error,
        clearError,
        handleTokenLogin,
        refreshNavbarPoints,
        navbarRefreshTrigger
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
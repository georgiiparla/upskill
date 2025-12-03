"use client";

import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
// We still import helpers for cleanup, but we rely on the server for setting the main cookie
import { removeTokenCookie, getTokenFromCookie } from '@/context/token_helpers';

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

    // 1. Point Auth Checks to the Proxy
    // This ensures we validate the HttpOnly cookie, not just the client state.
    const AUTH_CHECK_URL = '/api/proxy/auth';

    const clearError = () => setError(null);

    // 2. Check Session (Via Proxy)
    const checkSession = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${AUTH_CHECK_URL}/profile`);

            if (response.ok) {
                const data = await response.json();
                if (data.logged_in) {
                    setUser(data.user);
                    setIsAuthenticated(true);
                    setIsAdmin(data.is_admin || false);
                } else {
                    // Middleware handles redirects, we just update state
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (err) {
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

    // 3. Handle Login Token
    const handleTokenLogin = useCallback(async (token) => {
        setIsLoading(true);
        try {
            const setCookieResponse = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            if (!setCookieResponse.ok) {
                throw new Error('Failed to set session cookie');
            }

            await checkSession();

        } catch (err) {
            console.error("Login failed:", err);
            setError("Login failed. Please try again.");
            setIsLoading(false);
            throw err; // Re-throw so caller can handle it
        }
    }, [checkSession]);

    // 4. Logout
    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            setIsAdmin(false);
            removeTokenCookie();
            // Middleware will handle redirect on next navigation
            router.push('/login');
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
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
            // We do NOT attach headers manually. We let the Proxy handle it 
            // via the HttpOnly cookie.
            const response = await fetch(`${AUTH_CHECK_URL}/profile`);

            if (response.ok) {
                const data = await response.json();
                if (data.logged_in) {
                    setUser(data.user);
                    setIsAuthenticated(true);
                    setIsAdmin(data.is_admin || false);
                } else {
                    throw new Error("Not logged in");
                }
            } else {
                throw new Error("Session check failed");
            }
        } catch (err) {
            // Silent fail for session check is normal (user just isn't logged in)
            // But we clean up artifacts to be safe.
            removeTokenCookie();
            setIsAuthenticated(false);
            setUser(null);
            setIsAdmin(false);
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

    // 3. Handle Login Token (THE CRITICAL FIX)
    const handleTokenLogin = useCallback(async (token) => {
        setIsLoading(true);
        try {
            // Step A: Call the Next.js Server Route to set the HttpOnly Cookie
            // This bridges the gap between the frontend and the Proxy
            const setCookieResponse = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            if (!setCookieResponse.ok) {
                throw new Error('Failed to set session cookie');
            }

            // Step B: Verify the session immediately using the new cookie
            await checkSession();

        } catch (err) {
            console.error("Login failed:", err);
            setError("Login failed. Please try again.");
            setIsLoading(false);
        }
    }, [checkSession]);

    // 4. Logout
    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            // Call the Next.js route to delete the HttpOnly cookie
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            setIsAdmin(false);
            removeTokenCookie(); // Clear any legacy client cookies too
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
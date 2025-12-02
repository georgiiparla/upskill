"use client";

import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
// Import the helper to perform the cleanup
import { setTokenCookie, removeTokenCookie, getTokenFromCookie } from '@/context/token_helpers';

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
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

    const clearError = () => setError(null);

    // 1. Check Session
    const checkSession = useCallback(async (token = null) => {
        setIsLoading(true);

        // Check for client-side legacy token if no explicit token passed
        const sessionToken = token || getTokenFromCookie();

        try {
            // Note: We fetch from the PROXY or API. 
            // If we have a sessionToken (Legacy), we send it in the header.
            // If not, we rely on the HttpOnly cookie handled by the browser/proxy.
            const headers = {};
            if (sessionToken) {
                headers['Authorization'] = `Bearer ${sessionToken}`;
            }

            // Using the direct API URL from your knowledge base, or proxy if configured
            // Assuming direct auth check based on previous context:
            const response = await fetch(`${API_URL}/profile`, {
                headers: headers
            });

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
            console.warn("Session validation failed:", err);

            // --- CRITICAL FIX: SELF-HEALING ---
            // If the session check fails (401 or otherwise), we MUST clear 
            // any potential legacy cookies that are confusing the client.
            console.log("Cleaning up potential legacy authentication artifacts...");
            removeTokenCookie();

            // Optional: Call server logout to ensure HttpOnly cookie is also cleared
            try { await fetch(`${API_URL}/logout`, { method: 'POST' }); } catch (e) { /* ignore */ }

            setIsAuthenticated(false);
            setUser(null);
            setIsAdmin(false);
        } finally {
            setIsLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        if (!hasCheckedSession.current) {
            checkSession();
            hasCheckedSession.current = true;
        }
    }, [checkSession]);

    // 2. Handle Login Token
    const handleTokenLogin = useCallback(async (token) => {
        // Set cookie just in case (legacy support), but rely on the HttpOnly flow primarily
        setTokenCookie(token);
        await checkSession(token);
    }, [checkSession]);

    // 3. Logout
    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetch(`${API_URL}/logout`, { method: 'POST' });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            setIsAdmin(false);
            removeTokenCookie(); // Ensure client side is clean
            router.push('/login');
            setIsLoading(false);
        }
    }, [API_URL, router]);

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
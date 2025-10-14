"use client";

import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { setTokenCookie, removeTokenCookie, getTokenFromCookie } from '@/context/token_helpers';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Single loading state
    const [error, setError] = useState(null);
    const [navbarRefreshTrigger, setNavbarRefreshTrigger] = useState(0);

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
    const friendlyError = "Could not connect to the server. Please check your connection and try again later.";

    const hasCheckedSession = useRef(false);

    const clearError = () => setError(null);

    // Allow checkSession to accept an explicit token, falling back to the cookie if none is provided.
    const checkSession = useCallback(async (token = null) => {
        setIsLoading(true);
        // Prioritize the passed token, otherwise check the cookie. This is the core of the fix.
        const sessionToken = token || getTokenFromCookie();

        if (!sessionToken) {
            setIsAuthenticated(false);
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/profile`, {
                headers: { 'Authorization': `Bearer ${sessionToken}` }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.logged_in) {
                    setUser(data.user);
                    setIsAuthenticated(true);
                } else {
                    removeTokenCookie();
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } else {
                removeTokenCookie();
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (err) {
            console.error("Session check failed:", err);
            setError(friendlyError);
            setIsAuthenticated(false);
            setUser(null);
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


    // Pass the token from the URL directly into our updated checkSession function.
    const handleTokenLogin = useCallback(async (token) => {
        setTokenCookie(token);
        await checkSession(token);
    }, [checkSession]);

    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetch(`${API_URL}/logout`, { method: 'POST' });
        } catch (err) {
            console.error("Logout failed:", err);
            setError(friendlyError);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            removeTokenCookie(); //
            setIsLoading(false);
        }
    }, [API_URL]);

    const refreshNavbarPoints = useCallback(() => {
        setNavbarRefreshTrigger(prev => prev + 1);
    }, []);

    const value = { user, isAuthenticated, isLoading, logout, error, clearError, handleTokenLogin, refreshNavbarPoints, navbarRefreshTrigger };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
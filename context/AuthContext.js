// context/AuthContext.js
"use client";

import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { setTokenCookie, removeTokenCookie, getTokenFromCookie } from '@/context/token_helpers'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
    const friendlyError = "Could not connect to the server. Please check your connection and try again later.";
    const hasCheckedSession = useRef(false);

    const clearError = () => setError(null);

    const checkSession = useCallback(async () => {
        // --- DEBUGGING LINES ---
        console.log("--- checkSession CALLED ---");
        console.trace("Tracepoint for checkSession caller");
        // -----------------------

        const token = getTokenFromCookie();
        if (!token) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
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
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        if (!hasCheckedSession.current) {
            checkSession();
            hasCheckedSession.current = true;
        }
    }, []);

    const handleTokenLogin = useCallback(async (token) => {
        setIsAuthenticating(true);
        try {
            setTokenCookie(token);
            await checkSession();
        } finally {
            setIsAuthenticating(false);
        }
    }, [checkSession]);

    const logout = useCallback(async () => {
        try {
            await fetch(`${API_URL}/logout`, { method: 'POST' });
        } catch (err) {
            console.error("Logout failed:", err);
            setError(friendlyError);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            removeTokenCookie();
        }
    }, [API_URL]);

    const value = { user, isAuthenticated, loading, logout, error, clearError, handleTokenLogin, isAuthenticating };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
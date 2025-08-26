"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

    const friendlyError = "Could not connect to the server. Please check your connection and try again later.";

    // Function to clear the error
    const clearError = () => setError(null);

    const checkSession = async () => {
        try {
            const response = await fetch(`${API_URL}/profile`, { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                if (data.logged_in) {
                    setUser(data.user);
                    setIsAuthenticated(true);
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
            setError(friendlyError); // Set the global error
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                setIsAuthenticated(true);
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (err) {
            console.error("Login failed:", err);
            setError(friendlyError); // Set the global error
            return { success: false, error: friendlyError };
        }
    };

    const signup = async (username, email, password) => {
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (err) {
            console.error("Signup failed:", err);
            setError(friendlyError);
            return { success: false, error: friendlyError };
        }
    };

    const logout = async () => {
        try {
            await fetch(`${API_URL}/logout`, { method: 'POST', credentials: 'include' });
        } catch (err) {
            console.error("Logout failed:", err);
            setError(friendlyError); // Set the global error
        } finally {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const value = { user, isAuthenticated, loading, login, signup, logout, error, clearError };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
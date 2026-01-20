import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import * as tokenHelpers from '@/context/token_helpers';

// Mock dependencies
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

vi.mock('@/context/token_helpers', () => ({
    removeTokenCookie: vi.fn(),
    getTokenFromCookie: vi.fn(),
}));

// Test Component to consume context
const TestComponent = () => {
    const { user, isAuthenticated, isLoading, handleTokenLogin, logout, error } = useAuth();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <span data-testid="user-email">{user?.email}</span>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <span data-testid="auth-status">Not Authenticated</span>
                    <button onClick={() => handleTokenLogin('fake-token').catch(() => { })}>Login</button>
                </div>
            )}
            {error && <div data-testid="error-message">{error}</div>}
        </div>
    );
};

describe('AuthContext', () => {
    // Mock global fetch
    global.fetch = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Session Management', () => {
        it('initializes as unauthenticated if session check fails', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                status: 401
            });

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            await waitFor(() => {
                expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
            });
        });

        it('initializes as authenticated if session check succeeds', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    logged_in: true,
                    user: { email: 'test@example.com' },
                    is_admin: false
                })
            });

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            await waitFor(() => {
                expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
            });
        });
    });

    describe('Login Flow', () => {
        it('handleTokenLogin calls API and refreshes session', async () => {
            // 1. Initial Session Check (Fail)
            fetch.mockResolvedValueOnce({ ok: false });

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            await waitFor(() => screen.getByTestId('auth-status'));

            // 2. Login Call (Success)
            fetch.mockResolvedValueOnce({ ok: true });

            // 3. Session Check after login (Success)
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    logged_in: true,
                    user: { email: 'new@example.com' }
                })
            });

            // Trigger Login
            await act(async () => {
                screen.getByText('Login').click();
            });

            await waitFor(() => {
                expect(screen.getByTestId('user-email')).toHaveTextContent('new@example.com');
            });

            // Verify API calls
            expect(fetch).toHaveBeenCalledWith('/api/auth/login', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ token: 'fake-token' })
            }));
        });

        it('handleTokenLogin sets error on failure', async () => {
            // 1. Initial Session Check (Fail)
            fetch.mockResolvedValueOnce({ ok: false });

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            await waitFor(() => screen.getByTestId('auth-status'));

            // 2. Login Call (Fail)
            fetch.mockRejectedValueOnce(new Error('API Error'));

            // Trigger Login
            await act(async () => {
                screen.getByText('Login').click();
            });

            await waitFor(() => {
                expect(screen.getByTestId('error-message')).toBeInTheDocument();
            });
        });
    });

    describe('Logout Flow', () => {
        it('logout clears state and calls API', async () => {
            // 1. Initial Session (Success)
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    logged_in: true,
                    user: { email: 'user@example.com' }
                })
            });

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            await waitFor(() => screen.getByTestId('user-email'));

            // 2. Logout Call (Success)
            fetch.mockResolvedValueOnce({ ok: true });

            // Trigger Logout
            await act(async () => {
                screen.getByText('Logout').click();
            });

            // Verify API call
            expect(fetch).toHaveBeenCalledWith('/api/auth/logout', expect.objectContaining({
                method: 'POST'
            }));

            // Verify Cookie Removal
            expect(tokenHelpers.removeTokenCookie).toHaveBeenCalled();

            // Should redirect (mocked router) - checking behavior implicitly by state clear or router call
            // AuthContext sets user to null immediately
            // NOTE: Since logout sets isLoading(true) and pushes route, the component usually unmounts/redirects
            // We can check if router.push was called
            // But in our TestComponent, if it goes back to loading, we see "Loading..."

            // Let's spy on router
            // We need to access the mock instance.
        });
    });
});

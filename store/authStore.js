import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAuthStore = create(
    devtools(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
            navbarRefreshTrigger: 0,
            error: null,

            // Actions
            setAuth: (userData, isAdmin = false) => set({
                user: userData,
                isAuthenticated: !!userData,
                isAdmin: isAdmin
            }, false, 'setAuth'),

            setError: (error) => set({ error }, false, 'setError'),
            clearError: () => set({ error: null }, false, 'clearError'),

            clearAuth: () => set({
                user: null,
                isAuthenticated: false,
                isAdmin: false
            }, false, 'clearAuth'),

            refreshNavbarPoints: () => set((state) => ({
                navbarRefreshTrigger: state.navbarRefreshTrigger + 1
            }), false, 'refreshNavbarPoints'),

            logout: async (router) => {
                try {
                    // Tell the BFF to shred the cookie
                    await fetch('/api/auth/logout', { method: 'POST' });
                } catch (err) {
                    console.error("Logout request failed:", err);
                } finally {
                    // Clear the local state
                    get().clearAuth();

                    // Redirect and refresh Next.js cache
                    if (router) {
                        router.push('/login');
                        router.refresh();
                    }
                }
            }
        }),
        { name: 'AuthStore' }
    )
);

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAuthStore = create(
    devtools(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
            navbarRefreshTrigger: 0,

            // Actions
            setAuth: (userData, isAdmin = false) => set({
                user: userData,
                isAuthenticated: !!userData,
                isAdmin: isAdmin
            }, false, 'setAuth'),

            clearAuth: () => set({
                user: null,
                isAuthenticated: false,
                isAdmin: false
            }, false, 'clearAuth'),

            refreshNavbarPoints: () => set((state) => ({ 
                navbarRefreshTrigger: state.navbarRefreshTrigger + 1 
            }), false, 'refreshNavbarPoints'),
            
            // For simple state updates
            setUser: (user) => set({ user }, false, 'setUser'),
        }),
        { name: 'AuthStore' }
    )
);

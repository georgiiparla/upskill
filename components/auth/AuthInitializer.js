'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AuthInitializer({ user, isAdmin }) {
    const setAuth = useAuthStore((state) => state.setAuth);
    const initialized = useRef(false);

    if (!initialized.current && user) {
        setAuth(user, isAdmin);
        initialized.current = true;
    }

    return null;
}

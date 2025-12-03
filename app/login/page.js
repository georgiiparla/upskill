"use client";
import { Auth } from '@/components/features/auth/Auth';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-csway-green" />
            </div>
        }>
            <Auth />
        </Suspense>
    );
}

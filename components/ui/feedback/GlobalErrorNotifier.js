"use client";

import { useAuthStore } from "@/store/authStore";
import { AlertTriangle, X } from "lucide-react";

export const GlobalErrorNotifier = () => {
    const { error, clearError } = useAuthStore();

    if (!error) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white shadow-lg animate-pulse-once">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">
                    <div className="flex items-center">

                        <AlertTriangle className="h-6 w-6 mr-3" />
                        <p className="font-medium text-sm">{error}</p>
                    </div>

                    <button
                        onClick={clearError}
                        className="p-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Dismiss"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
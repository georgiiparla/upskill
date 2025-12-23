"use client";

import { AlertTriangle } from 'lucide-react';

export function RouteErrorUI({ error, reset }) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-bold text-red-700 dark:text-red-300">
                Something went wrong!
            </h2>
            
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                We're having trouble loading this page. Please try again or contact support if the problem persists.
            </p>

            <button
                onClick={() => reset()}
                className="mt-6 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
                Try again
            </button>
        </div>
    );
}
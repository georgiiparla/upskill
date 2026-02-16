"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Shared';
import { Server, Terminal, Copy, Check } from 'lucide-react';
import { clientFetch } from '@/lib/client-api';

export const EnvironmentVariables = () => {
    const [envVars, setEnvVars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copiedKey, setCopiedKey] = useState(null);

    useEffect(() => {
        const fetchEnvVars = async () => {
            try {
                const { success, data, error: apiError } = await clientFetch('/admin/env');

                if (success) {
                    setEnvVars(data);
                } else {
                    setError(apiError || "Failed to load environment variables.");
                }
            } catch (err) {
                console.error("Failed to fetch env vars:", err);
                setError("Failed to load environment variables.");
            } finally {
                setLoading(false);
            }
        };

        fetchEnvVars();
    }, []);

    const handleCopy = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);

    };

    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
                <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            </div>
        );
    }

    if (error) {
        return (
            <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/50">
                <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
                    <Server className="h-5 w-5" />
                    <p className="font-medium">{error}</p>
                </div>
            </Card>
        );
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-slate-400" />
                    Hardcoded Environment Variables
                </h3>
                <span className="text-xs font-mono text-slate-400">
                    {envVars.length} variables
                </span>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {envVars.map(({ key, value }) => (
                        <div
                            key={key}
                            className="group flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                            <div className="min-w-0 flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                                <span className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400 truncate pt-0.5">
                                    {key}
                                </span>
                                <span className="font-mono text-sm text-slate-700 dark:text-slate-300 break-all sm:col-span-2">
                                    {value || <span className="text-slate-400 italic">Empty</span>}
                                </span>
                            </div>

                            <button
                                onClick={() => handleCopy(`${key}=${value}`, key)}
                                className="ml-4 p-1.5 text-slate-300 hover:text-slate-600 dark:hover:text-slate-200 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                title="Copy"
                            >
                                {copiedKey === key ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                )}
                            </button>
                        </div>
                    ))}

                    {envVars.length === 0 && (
                        <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400 italic">
                            No variables configuration found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

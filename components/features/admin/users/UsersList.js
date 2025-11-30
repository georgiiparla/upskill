"use client";

import { Card } from "../../../shared/helpers/Helper";
import { Avatar } from '../../../core/ui/Avatar';
import { ShieldCheck, User, Mail, Calendar } from 'lucide-react';

export const UsersList = ({ initialUsers = [] }) => {
    // Filter logic preserved from original code
    const filteredUsers = initialUsers.filter((user) => !user.username.startsWith('Mock User'));

    // Date formatting helper
    const getJoinedDate = (timestamp) => {
        const date = new Date(timestamp);
        // Using a more readable date format (e.g., "Nov 24, 2023")
        return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header Section
                Redesigned to separate the page title from the stats for better visual hierarchy.
            */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-csway-green/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-csway-green">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Admin Access
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Users Directory</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        View and manage registered members of the platform.
                    </p>
                </div>

                {/* Stats Card */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                        <User className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Users</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white leading-none mt-0.5">{filteredUsers.length}</p>
                    </div>
                </div>
            </div>

            {/* Main Content Card 
                Refactored to support a structured table layout for desktop and clean cards for mobile.
                !p-0 is used to remove default Card padding so the table header can be full-width.
            */}
            <Card className="overflow-hidden !p-0" innerClassName="p-0" glass={false}>

                {/* Desktop Table Header */}
                <div className="hidden md:grid md:grid-cols-[2fr_2.5fr_1fr] border-b border-slate-200 bg-slate-50/50 py-3 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
                    <div>Member</div>
                    <div>Contact Info</div>
                    <div className="text-right">Joined Date</div>
                </div>

                {/* User List */}
                <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {filteredUsers.map((user) => {
                        const joined = getJoinedDate(user.created_at);

                        return (
                            <div
                                key={user.email}
                                className="group relative bg-white dark:bg-transparent transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/30"
                            >
                                {/* Desktop Row Layout */}
                                <div className="hidden md:grid md:grid-cols-[2fr_2.5fr_1fr] md:items-center py-4 px-6">
                                    {/* Column 1: User Identity */}
                                    <div className="flex items-center gap-3 pr-4">
                                        <Avatar username={user.username} className="h-9 w-9 text-xs ring-2 ring-white dark:ring-slate-800 shadow-sm" />
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                                {user.username}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Column 2: Email (Monospace for readability) */}
                                    <div className="flex items-center gap-2 min-w-0 pr-4">
                                        <Mail className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                                        <span className="truncate text-sm text-slate-600 dark:text-slate-300 font-mono">
                                            {user.email}
                                        </span>
                                    </div>

                                    {/* Column 3: Date */}
                                    <div className="flex items-center justify-end gap-2 text-right">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                            {joined}
                                        </span>
                                    </div>
                                </div>

                                {/* Mobile Card Layout */}
                                <div className="flex items-center gap-4 p-4 md:hidden">
                                    <Avatar username={user.username} className="h-10 w-10 text-sm flex-shrink-0" />
                                    <div className="min-w-0 flex-1 space-y-1">
                                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                            {user.username}
                                        </p>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                            <Mail className="h-3 w-3" />
                                            <span className="truncate">{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                            <Calendar className="h-3 w-3" />
                                            <span>Joined {joined}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {filteredUsers.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
                            <User className="h-8 w-8 mb-2 opacity-20" />
                            <p className="text-sm">No users found in the directory.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};
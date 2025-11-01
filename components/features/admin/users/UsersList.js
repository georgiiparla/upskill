"use client";

import { Card } from "../../../shared/helpers/Helper";
import { Avatar } from '../../../core/ui/Avatar';
import { ShieldCheck, User } from 'lucide-react';

export const UsersList = ({ initialUsers = [] }) => {
    const filteredUsers = initialUsers.filter((user) => !user.username.startsWith('Mock User'));

    const getJoinedDate = (timestamp) => {
        const date = new Date(timestamp);
        return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString();
    };

    return (
        <div className="space-y-4">
            <Card variant="custom" className="relative overflow-hidden">
                <div className="pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-csway-green/15 blur-3xl" />
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-emerald-400/15 blur-3xl" />

                <div className="relative flex flex-col gap-5">
                    <span className="inline-flex items-center gap-2 self-start rounded-full bg-csway-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-csway-green">
                        <ShieldCheck className="h-4 w-4" />
                        Admin panel
                    </span>

                    <div className="space-y-3">
                        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Users Management</h1>
                        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
                            View and manage the list of registered users on the platform.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-100 backdrop-blur-sm dark:bg-slate-900/60 dark:text-slate-300 dark:ring-slate-800">
                            <User className="h-4 w-4 text-csway-green" />
                            {filteredUsers.length} registered {filteredUsers.length === 1 ? 'user' : 'users'}
                        </span>
                    </div>
                </div>
            </Card>

            <div className="hidden md:block space-y-2">
                {/*<div className="rounded-lg grid grid-cols-[minmax(0,3fr)_minmax(0,3fr)_minmax(0,2fr)] bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">*/}
                {/*    <div className="px-5 py-3">Member</div>*/}
                {/*    <div className="px-5 py-3">Email</div>*/}
                {/*    <div className="px-5 py-3">Joined</div>*/}
                {/*</div>*/}

                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {filteredUsers.map((user, index) => {
                        const joined = getJoinedDate(user.created_at);
                        const background = index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-900/80';

                        return (
                            <div
                                key={user.email}
                                className={`${background} rounded-lg grid grid-cols-[minmax(0,3fr)_minmax(0,3fr)_minmax(0,2fr)] items-center gap-4 px-5 py-4`}
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar username={user.username} className="h-10 w-10 text-sm" />
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">{user.username}</span>
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">{user.email}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">{joined}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-3 md:hidden">
                {filteredUsers.map((user) => {
                    const joined = getJoinedDate(user.created_at);

                    return (
                        <Card key={user.email} innerClassName="flex items-start gap-3">
                            <Avatar username={user.username} className="h-10 w-10 text-sm" />
                            <div className="flex-1 space-y-1">
                                <p className="font-semibold text-slate-900 dark:text-white">{user.username}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Joined {joined}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
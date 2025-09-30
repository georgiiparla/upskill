"use client";

import { Card, SectionTitle } from "../../shared/helpers/Helper";
import { Users } from 'lucide-react';
import { formatRelativeTime } from '@/lib/helper-func';
import { Avatar } from '../../core/ui/Avatar';

export const UsersList = ({ initialUsers = [] }) => {
    const filteredUsers = initialUsers.filter(user => !user.username.startsWith('Mock User'));

    return (
        <Card>
            <SectionTitle icon={<Users className="h-6 w-6 text-csway-green" />} title="Members" />

            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                A total of <strong>{filteredUsers.length}</strong> user(s) found.
            </p>

            {/* --- Desktop Table --- */}
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">User</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Date Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.email} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-4">
                                        <Avatar username={user.username} className="w-10 h-10 text-sm" />
                                        <span className="font-medium text-gray-900 dark:text-white">{user.username}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{formatRelativeTime(user.created_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- Mobile List --- */}
            <div className="md:hidden space-y-4">
                {filteredUsers.map((user) => (
                    <div key={user.email} className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <Avatar username={user.username} className="w-10 h-10 text-sm" />
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </Card>
    );
};
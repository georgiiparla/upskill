"use client";

import { Card, SectionTitle } from "@/components/shared/Helper";
import { Users } from 'lucide-react';

export const UsersList = ({ initialUsers = [] }) => {
    return (
        <Card>
            <SectionTitle icon={<Users className="h-6 w-6 text-csway-green" />} title="Registered Users" />
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                A total of <strong>{initialUsers.length}</strong> user(s) found.
            </p>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">User ID</th>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Date Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialUsers.map((user) => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-mono text-xs">{user.id}</td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.username}
                                </th>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
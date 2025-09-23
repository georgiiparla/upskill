"use client";

import { useState } from 'react';
import { Card, SectionTitle } from "@/components/shared/Helper";
import { Users, ChevronDown } from 'lucide-react';

export const UsersList = ({ initialUsers = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const filteredUsers = initialUsers.filter(user => !user.username.startsWith('Mock User'));

    return (
        <Card>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full"
            >
                <SectionTitle icon={<Users className="h-6 w-6 text-csway-green" />} title="Registered Users" className="!mb-0" />

                <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="mt-4 animate-fadeIn">
                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                        {/* Use the length of the filtered array for the count */}
                        A total of <strong>{filteredUsers.length}</strong> user(s) found.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Username</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Date Registered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.email} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-now-dark dark:text-white">
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
                </div>
            )}
        </Card>
    );
};
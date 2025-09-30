"use client";

import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/shared/Helper';
import { Avatar } from '@/components/shared/Avatar';
import { AliasManager } from '@/components/account/AliasManager';

export const AccountView = ({ initialAliases }) => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div className="space-y-8">
            {/* --- Hero Section --- */}
            <Card>
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:space-x-6">
                    <Avatar username={user.username} className="w-24 h-24 text-4xl mb-4 sm:mb-0" />
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.username}</h1>
                        <p className="text-md text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                </div>
            </Card>

            <AliasManager initialAliases={initialAliases} />
        </div>
    );
};
"use client";
import { useAuthStore } from '@/store/authStore';
import { Card } from '@/components/ui/Shared';
import { Avatar } from '@/components/ui/Avatar';
import { AliasManager } from './AliasManager';
import { IconThumbUp, IconHeart } from '@tabler/icons-react';

const StatCard = ({ label, value, icon: Icon, colorClass }) => (
    <Card className="flex items-center">
        <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
            <Icon className="w-5 h-5" stroke={1.5} />
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </Card>
);

export const AccountView = ({ initialAliases, stats }) => {
    const { user } = useAuthStore();

    if (!user) {
        return null;
    }

    return (
        <div className="space-y-8">
            <Card>
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:space-x-6">
                    <Avatar username={user.username} className="w-24 h-24 text-4xl mb-4 sm:mb-0" />
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.username}</h1>
                        <p className="text-md text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                    label="Likes Received"
                    value={stats?.likes_received || 0}
                    icon={IconHeart}
                    colorClass="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                />
                <StatCard
                    label="Likes Given"
                    value={stats?.likes_given || 0}
                    icon={IconThumbUp}
                    colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                />
            </div>

            <AliasManager initialAliases={initialAliases} />
        </div>
    );
};
import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import { Card } from "../../shared/helpers/Helper";

// Helper functions from Leaderboard component
const getRankColor = (rank) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-500';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-amber-600 to-amber-700';
    return 'from-blue-500 to-indigo-600';
};

const getRankLabel = (rank) => {
    if (rank === 1) return 'Champion';
    if (rank === 2) return 'Runner Up';
    if (rank === 3) return '3rd Place';
    return `Rank #${rank}`;
};

const getRankBadge = (rank) => {
    if (rank === 1) return (
        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full p-2 shadow-lg">
            <Trophy className="h-6 w-6" fill="currentColor" />
        </div>
    );
    if (rank === 2) return (
        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-gray-300 to-gray-400 text-white rounded-full p-2 shadow-lg">
            <Trophy className="h-6 w-6" fill="currentColor" />
        </div>
    );
    if (rank === 3) return (
        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-full p-2 shadow-lg">
            <Trophy className="h-6 w-6" fill="currentColor" />
        </div>
    );
    return null;
};

const AnimateOnHover = ({ children, className = '' }) => (
    <div className={`transition-all duration-300 hover:scale-[1.02] ${className}`}>
      {children}
    </div>
);

export const PodiumCard = ({ user, rank }) => {
    const height = rank === 2 ? 'h-48' : rank === 1 ? 'h-64' : 'h-40';
    const translateY = rank === 1 ? '-translate-y-2' : '';

    return (
        <AnimateOnHover key={user.id}>
            <div className={`relative group ${translateY} transition-all duration-300 h-full flex flex-col`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${getRankColor(rank)} rounded-t-2xl -z-10 ${rank === 1 ? 'opacity-20' : 'opacity-10'} group-hover:opacity-30 transition-opacity`}></div>
                <Card className={`relative overflow-visible border-0 shadow-xl ${height} flex flex-col justify-end p-6 transition-all duration-300 group-hover:shadow-2xl flex-1`}>
                    {getRankBadge(rank)}
                    <div className="absolute top-4 left-4 text-4xl font-bold text-gray-300 dark:text-gray-600">#{rank}</div>
                    
                    <div className="text-center mb-4">
                        <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white dark:bg-gray-700 p-1 shadow-lg border-2 border-csway-orange/30">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-800 flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-gray-200">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate">{user.name}</h3>
                        <p className="text-sm font-medium text-csway-orange">{getRankLabel(rank)}</p>
                    </div>
                    
                    <div className="text-center">
                        <p className="text-3xl font-bold text-gray-800 dark:text-white">{user.points.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">POINTS</p>
                    </div>
                    
                    {rank === 1 && (
                        <div className="absolute top-4 right-4 animate-pulse">
                            <Sparkles className="h-5 w-5 text-yellow-400" />
                        </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-csway-orange/50 to-transparent"></div>
                </Card>
            </div>
        </AnimateOnHover>
    );
};

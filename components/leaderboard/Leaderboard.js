"use client"
import React, { useEffect, useState } from 'react';
import { Trophy, Award, Zap } from 'lucide-react';
import { Card, SectionTitle } from "../shared/Helper";
import { PodiumCard } from './PodiumCard';

// Animation component for subtle hover effects
const AnimateOnHover = ({ children, className = '' }) => (
  <div className={`transition-all duration-300 hover:scale-[1.02] ${className}`}>
    {children}
  </div>
);

// Progress bar component
const ProgressBar = ({ value, max, color = 'bg-csway-orange' }) => (
  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
    <div 
      className={`h-2.5 rounded-full ${color} transition-all duration-500`}
      style={{ width: `${(value / max) * 100}%` }}
    ></div>
  </div>
);

export const Leaderboard = ({ initialData }) => {
    const topThree = initialData.slice(0, 3);
    const restOfLeaderboard = initialData.slice(3);

    // Calculate max points for progress bars
    const maxPoints = Math.max(...initialData.map(user => user.points), 1);

    return (
        <div className="space-y-12">
            {/* Podium Section */}
            <div className="animate-fade-in">
                <SectionTitle 
                    className="mb-8" 
                    icon={<Award className="h-6 w-6 text-csway-orange" />} 
                    title="Top Performers" 
                    subtitle="Our leading contributors this week"
                />
                
                {/* Mobile Layout: 1st, 2nd, 3rd */}
                <div className="grid grid-cols-1 md:hidden gap-6 items-end px-4">
                    {topThree.map((user, index) => {
                        const rank = index + 1;
                        return <PodiumCard key={user.id} user={user} rank={rank} />;
                    })}
                </div>

                {/* Desktop Layout: 2nd, 1st, 3rd */}
                <div className="hidden md:grid grid-cols-3 gap-6 items-end px-4 min-h-[300px]">
                    {topThree.length > 1 && <PodiumCard user={topThree[1]} rank={2} />}
                    {topThree.length > 0 && <PodiumCard user={topThree[0]} rank={1} />}
                    {topThree.length > 2 && <PodiumCard user={topThree[2]} rank={3} />}
                </div>
            </div>
            
            {/* Leaderboard Table */}
            <div className="animate-fade-in">
                <SectionTitle 
                    icon={<Trophy className="h-6 w-6 text-csway-orange" />} 
                    title="Leaderboard" 
                    subtitle="See how you stack up against others"
                />

                <div className="hidden md:block">
                    <Card className="overflow-hidden border-0 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-medium">RANK</th>
                                        <th scope="col" className="px-6 py-4 font-medium">USER</th>
                                        <th scope="col" className="px-6 py-4 font-medium">PROGRESS</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-right">POINTS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {restOfLeaderboard.map((user, index) => {
                                        const rank = index + 4;
                                        const progress = Math.min(100, Math.round((user.points / maxPoints) * 100));
                                        
                                        return (
                                            <tr 
                                                key={user.id} 
                                                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${rank <= 3 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'} font-semibold text-sm`}>
                                                            {rank}
                                                        </span>
                                                    </div>
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span>{user.name}</span>
                                                        {user.badges && user.badges.length > 0 && (
                                                            <div className="flex -space-x-1">
                                                                {user.badges.map((badge, i) => (
                                                                    <span key={i} className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-csway-orange/10 text-csway-orange text-xs">
                                                                        {badge}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4">
                                                    <div className="w-32">
                                                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                            <span>Progress</span>
                                                            <span>{progress}%</span>
                                                        </div>
                                                        <ProgressBar value={user.points} max={maxPoints} />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end space-x-1">
                                                        <span className="font-bold text-gray-800 dark:text-white">{user.points.toLocaleString()}</span>
                                                        <span className="text-xs text-gray-500">PTS</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-3">
                    {restOfLeaderboard.map((user, index) => {
                        const rank = index + 4;
                        const progress = Math.min(100, Math.round((user.points / maxPoints) * 100));
                        
                        return (
                            <AnimateOnHover key={user.id}>
                                <Card className="p-4 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${rank <= 3 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'}`}>
                                                {rank}
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-csway-orange rounded-full"
                                                            style={{ width: `${progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs text-gray-500">{progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">{user.points.toLocaleString()}</div>
                                            <div className="text-xs text-gray-500">PTS</div>
                                        </div>
                                    </div>
                                    {user.badges && user.badges.length > 0 && (
                                        <div className="flex mt-3 space-x-2">
                                            {user.badges.map((badge, i) => (
                                                <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-csway-orange/10 text-csway-orange">
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </Card>
                            </AnimateOnHover>
                        );
                    })}
                </div>
                
                {/* Legend */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        <Zap className="h-4 w-4 inline-block mr-1 text-yellow-500" />
                        New rankings update every Monday at midnight
                    </p>
                </div>
            </div>
        </div>
    );
};
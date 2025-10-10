// Helper functions for leaderboard components

// Platform-style color scheme - balanced and professional
export const getRankColors = (rank) => {
    switch (rank) {
        case 1:
            return {
                badge: 'bg-amber-100 text-amber-800 border-amber-200',
                avatar: 'bg-amber-500',
                podium: 'from-amber-50 to-yellow-50 border-amber-200',
                bar: 'bg-gradient-to-r from-amber-400/70 to-yellow-500/70'
            };
        case 2:
            return {
                badge: 'bg-slate-100 text-slate-700 border-slate-200',
                avatar: 'bg-slate-500',
                podium: 'from-slate-50 to-gray-50 border-slate-200',
                bar: 'bg-gradient-to-r from-slate-400/70 to-gray-500/70'
            };
        case 3:
            return {
                badge: 'bg-orange-100 text-orange-800 border-orange-200',
                avatar: 'bg-orange-500',
                podium: 'from-orange-50 to-amber-50 border-orange-200',
                bar: 'bg-gradient-to-r from-orange-400/70 to-red-400/70'
            };
        default:
            return {
                badge: 'bg-blue-50 text-blue-700 border-blue-100',
                avatar: 'bg-blue-500',
                podium: 'from-blue-50 to-indigo-50 border-blue-100',
                bar: 'bg-gradient-to-r from-blue-400/70 to-indigo-500/70'
            };
    }
};

// Process leaderboard data
export const processLeaderboardData = (initialData = []) => {
    // Return all users sorted by points (descending) and annotate with rank
    if (!Array.isArray(initialData) || initialData.length === 0) {
        return { rankedUsers: [], maxPoints: 0 };
    }

    // Make a shallow copy and sort so we don't mutate the original input
    const sorted = [...initialData].sort((a, b) => (b.points || 0) - (a.points || 0));

    // Add a rank property to each user object (1-based)
    const rankedUsers = sorted.map((user, index) => ({
        ...user,
        rank: index + 1
    }));

    // Get max points for bar scaling (default to 0)
    const maxPoints = rankedUsers.length > 0 ? Math.max(...rankedUsers.map(user => user.points || 0)) : 0;

    return { rankedUsers, maxPoints };
};

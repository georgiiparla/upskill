// Helper functions for leaderboard components

// Platform-style color scheme - balanced and professional
// Platform-style color scheme - Clean and Professional
export const getRankColors = (rank) => {
    switch (rank) {
        case 1:
            return {
                text: 'text-red-500',
                bg: 'bg-red-500',
                badge: 'bg-red-100 text-red-800 border-red-200',
                bar: 'bg-red-500'
            };
        case 2:
            return {
                text: 'text-green-500',
                bg: 'bg-green-500',
                badge: 'bg-green-100 text-green-800 border-green-200',
                bar: 'bg-green-500'
            };
        case 3:
            return {
                text: 'text-amber-500',
                bg: 'bg-amber-500',
                badge: 'bg-amber-100 text-amber-800 border-amber-200',
                bar: 'bg-amber-500'
            };
        case 4:
        case 5:
            return {
                text: 'text-sky-500',
                bg: 'bg-sky-500',
                badge: 'bg-sky-100 text-sky-800 border-sky-200',
                bar: 'bg-sky-500'
            };
        default:
            return {
                text: 'text-slate-600 dark:text-slate-400',
                bg: 'bg-slate-200 dark:bg-slate-700',
                badge: 'bg-slate-50 text-slate-600 border-slate-100',
                bar: 'bg-slate-200 dark:bg-slate-700'
            };
    }
};

// Process leaderboard data
export const processLeaderboardData = (initialData) => {
    // Handle both direct array (legacy) and object wrapper (new)
    const rawUsers = Array.isArray(initialData) ? initialData : (initialData?.users || []);
    const lastUpdated = !Array.isArray(initialData) ? initialData?.last_updated_at : null;

    if (!Array.isArray(rawUsers) || rawUsers.length === 0) {
        return { rankedUsers: [], maxPoints: 0, lastUpdated };
    }

    // Filter out mock users (users whose name starts with "Mock User")
    const filteredData = rawUsers.filter(user => {
        const name = user.name || user.full_name || '';
        return !name.startsWith('Mock User');
    });

    // Make a shallow copy and sort so we don't mutate the original input
    const sorted = [...filteredData].sort((a, b) => (b.points || 0) - (a.points || 0));

    // Add a rank property to each user object (1-based)
    const rankedUsers = sorted.map((user, index) => ({
        ...user,
        rank: index + 1
    }));

    // Get max points for bar scaling (default to 0)
    const maxPoints = rankedUsers.length > 0 ? Math.max(...rankedUsers.map(user => user.points || 0)) : 0;

    return { rankedUsers, maxPoints, lastUpdated };
};
"use client";

export const Avatar = ({ username, className = '', isGrayscale = false }) => {
    if (!username) return null;

    const initials = username.slice(0, 2).toUpperCase();

    const hashCode = (str) => {
        let hash = 0;
        if (!str) return hash;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    };

    const colors = [
        'bg-red-500',
        'bg-orange-500',
        'bg-amber-500',
        'bg-yellow-500',
        'bg-lime-500',
        'bg-green-500',
        'bg-emerald-500',
        'bg-teal-500',
        'bg-cyan-500',
        'bg-sky-500',
        'bg-blue-500',
        'bg-indigo-500',
        'bg-violet-500',
        'bg-purple-500',
        'bg-fuchsia-500',
        'bg-pink-500',
        'bg-rose-500'
    ];

    const color = isGrayscale ? 'bg-gray-400 dark:bg-gray-600' : colors[Math.abs(hashCode(username)) % colors.length];

    return (
        <div className={`rounded-lg flex items-center justify-center text-white font-bold shrink-0 ${color} ${className}`}>
            {initials}
        </div>
    );
};
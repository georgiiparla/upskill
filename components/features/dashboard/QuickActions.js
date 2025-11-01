"use client";

import { 
  MessageSquare, 
  Calendar, 
  Trophy, 
  Sparkles,
  ArrowRight 
} from 'lucide-react';

const quickActions = [
  {
    title: 'Request Feedback',
    description: 'Ask for insights from your peers',
    icon: MessageSquare,
    color: 'from-blue-500/20 to-blue-600/20 dark:from-blue-900/30 dark:to-blue-800/30',
    borderColor: 'border-blue-200 dark:border-blue-700/50',
    textColor: 'text-blue-600 dark:text-blue-400',
    hoverBg: 'hover:from-blue-500/30 hover:to-blue-600/30 dark:hover:from-blue-900/40 dark:hover:to-blue-800/40'
  },
  {
    title: 'Provide Feedback',
    description: 'Share constructive feedback with teammates',
    icon: Sparkles,
    color: 'from-purple-500/20 to-purple-600/20 dark:from-purple-900/30 dark:to-purple-800/30',
    borderColor: 'border-purple-200 dark:border-purple-700/50',
    textColor: 'text-purple-600 dark:text-purple-400',
    hoverBg: 'hover:from-purple-500/30 hover:to-purple-600/30 dark:hover:from-purple-900/40 dark:hover:to-purple-800/40'
  },
  {
    title: 'View Quests',
    description: 'Check available challenges and rewards',
    icon: Trophy,
    color: 'from-amber-500/20 to-amber-600/20 dark:from-amber-900/30 dark:to-amber-800/30',
    borderColor: 'border-amber-200 dark:border-amber-700/50',
    textColor: 'text-amber-600 dark:text-amber-400',
    hoverBg: 'hover:from-amber-500/30 hover:to-amber-600/30 dark:hover:from-amber-900/40 dark:hover:to-amber-800/40'
  },
  {
    title: 'View Leaderboard',
    description: 'See team rankings and scores',
    icon: Calendar,
    color: 'from-green-500/20 to-green-600/20 dark:from-green-900/30 dark:to-green-800/30',
    borderColor: 'border-green-200 dark:border-green-700/50',
    textColor: 'text-green-600 dark:text-green-400',
    hoverBg: 'hover:from-green-500/30 hover:to-green-600/30 dark:hover:from-green-900/40 dark:hover:to-green-800/40'
  },
];

export const QuickActions = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.title}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${action.color} border ${action.borderColor} p-5 transition-all duration-300 hover:shadow-lg ${action.hoverBg} cursor-default`}
            >
              {/* Decorative blur on hover */}
              <div className="pointer-events-none absolute -inset-20 rounded-full bg-white/0 blur-3xl transition-all duration-300 group-hover:bg-white/10" />

              <div className="relative">
                {/* Icon */}
                <div className="mb-3">
                  <Icon className={`h-6 w-6 ${action.textColor} transition-transform duration-300 group-hover:scale-110`} />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm">
                  {action.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                  {action.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-xs font-medium text-slate-600 dark:text-slate-400 transition-all duration-300 group-hover:text-slate-900 dark:group-hover:text-white">
                  Explore
                  <ArrowRight className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

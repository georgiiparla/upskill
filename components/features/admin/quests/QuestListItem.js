"use client";

import { Pencil, Check, X, ToggleLeft, ToggleRight, Loader2, Clock } from 'lucide-react';
import { IconButton } from '@/components/core/buttons/Buttons';

export const QuestListItem = ({
    quest,
    isEditing,
    draftValue,
    setDraftValue,
    draftResetUnits,
    setDraftResetUnits,
    inlineError,
    updatingId,
    togglingId,
    onStartEditing,
    onCancelEditing,
    onSave,
    onToggleExplicit,
}) => {
    const isUpdating = updatingId === quest.id;
    const isToggling = togglingId === quest.id;
    const isBusy = isUpdating || isToggling;
    const isExplicit = quest.explicit !== false;
    const isRepeatable = quest.quest_type === 'repeatable';

    // Format reset interval for display
    const formatResetInterval = (seconds) => {
        if (!seconds) return 'N/A';
        const day = 86400;
        const week = 604800;
        const year = 31536000;
        
        const yearVal = Math.round(seconds / year);
        const weekVal = Math.round(seconds / week);
        const dayVal = Math.round(seconds / day);
        
        if (yearVal >= 1 && seconds >= year * 0.5) return `${yearVal}y`;
        if (weekVal >= 1 && seconds >= week * 0.5) return `${weekVal}w`;
        if (dayVal >= 1 && seconds >= day * 0.5) return `${dayVal}d`;
        return `${seconds}s`;
    };

    const handleUnitChange = (unit, value) => {
        setDraftResetUnits((prev) => ({
            ...prev,
            [unit]: Math.max(0, parseInt(value) || 0),
        }));
    };

    return (
        <li
            className="group rounded-xl border border-slate-200/70 bg-white p-4 transition-all duration-200 dark:border-slate-700/70 dark:bg-slate-900"
        >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Quest Info */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{quest.title}</span>
                    </div>
                    {quest.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                            {quest.description}
                        </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                                isExplicit
                                    ? 'bg-csway-green/10 text-csway-green'
                                    : 'bg-slate-200/70 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300'
                            }`}
                        >
                            {isExplicit ? 'Explicit' : 'Implicit'}
                        </span>
                        <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                                isRepeatable
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                            }`}
                        >
                            {isRepeatable ? 'Repeatable' : 'Always'}
                        </span>
                        {quest.completed_users_count !== undefined && (
                            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-gray-100 text-gray-700 dark:bg-gray-800/60 dark:text-gray-300">
                                {quest.completed_users_count}/{quest.total_users_count} completed
                            </span>
                        )}
                    </div>
                    
                    {/* Reset Status Information */}
                    {quest.time_until_reset && (
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="text-slate-600 dark:text-slate-400">Reset status:</span>
                            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                                <Clock className="h-3 w-3" />
                                {quest.time_until_reset}
                            </span>
                            {quest.will_reset_on_next_trigger && (
                                <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 font-medium">
                                    ⚠️ Will reset on next action
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Quest Actions */}
                <div className="space-y-2 md:text-right">
                    {isEditing ? (
                        // Editing Mode
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2 md:justify-end">
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Points:</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={draftValue}
                                    onChange={(e) => setDraftValue(e.target.value)}
                                    className="w-20 rounded-lg border border-slate-200/70 bg-white/90 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-csway-green focus:outline-none focus:ring-2 focus:ring-csway-green/30 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-100"
                                />
                            </div>
                            
                            {isRepeatable && (
                                <div className="space-y-2">
                                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Reset Interval:</span>
                                    <div className="grid grid-cols-4 gap-2 md:grid-cols-7">
                                        {['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'].map((unit) => (
                                            <div key={unit} className="flex flex-col items-center gap-1">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={draftResetUnits[unit]}
                                                    onChange={(e) => handleUnitChange(unit, e.target.value)}
                                                    className="w-12 rounded-lg border border-slate-200/70 bg-white/90 px-2 py-1 text-center text-xs text-slate-900 shadow-sm focus:border-csway-green focus:outline-none focus:ring-2 focus:ring-csway-green/30 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-100"
                                                />
                                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                    {unit.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-2 md:justify-end">
                                <IconButton
                                    icon={Check}
                                    onClick={() => onSave(quest.id)}
                                    disabled={isBusy}
                                    isLoading={isBusy}
                                    colorScheme="emerald"
                                />
                                <IconButton
                                    icon={X}
                                    onClick={onCancelEditing}
                                    disabled={isBusy}
                                    colorScheme="slate"
                                />
                            </div>
                        </div>
                    ) : (
                        // View Mode
                        <div className="flex flex-wrap items-center gap-2 md:justify-end">
                            <span className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                                {quest.points}
                                <span className="text-xs font-medium">pts</span>
                            </span>
                            {isRepeatable && (
                                <span className="flex items-center gap-1 rounded-lg bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                    <Clock className="h-3 w-3" />
                                    <span className="text-xs font-medium">{formatResetInterval(quest.reset_interval_seconds)}</span>
                                </span>
                            )}
                            <div className="flex items-center gap-2">
                                <IconButton
                                    icon={Pencil}
                                    onClick={() => onStartEditing(quest)}
                                    disabled={isBusy}
                                    colorScheme="slate"
                                />
                                <button
                                    type="button"
                                    onClick={() => onToggleExplicit?.(quest)}
                                    disabled={isBusy}
                                    className={`inline-flex items-center gap-1 rounded-md border border-transparent px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 ${
                                        isExplicit
                                            ? 'text-amber-600 hover:border-amber-200 hover:bg-amber-50 focus:ring-amber-200 dark:text-amber-300 dark:hover:border-amber-400/60 dark:hover:bg-amber-500/10'
                                            : 'text-slate-500 hover:border-slate-200 hover:bg-slate-100 focus:ring-slate-200 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/60'
                                    }`}
                                >
                                    {isToggling ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : isExplicit ? (
                                        <ToggleRight className="h-4 w-4" />
                                    ) : (
                                        <ToggleLeft className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {isEditing && inlineError && (
                        <p className="text-xs text-red-500 md:text-right">{inlineError}</p>
                    )}
                </div>
            </div>
        </li>
    );
};

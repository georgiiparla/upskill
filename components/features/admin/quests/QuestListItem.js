"use client";

import { Pencil, Check, X, ToggleLeft, ToggleRight, Loader2, Clock } from 'lucide-react';
import { IconButton } from '@/components/core/buttons/Buttons';
import { formatDurationCompact, formatTimeUntilReset } from '@/lib/time-formatter';

// Time unit conversions aligned with Rails ActiveSupport
const TIME_UNITS = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2592000,  // 30 days
    years: 31556952,  // 365.2425 days (Rails standard)
};

// Format with cascading like the input boxes (e.g., "1Y 2M 3W 4D 5h 6m 7s")
const formatDurationCascading = (seconds) => {
    if (!seconds || seconds <= 0) return 'N/A';

    const UNIT_ORDER = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];
    const units = { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

    let remaining = seconds;
    for (const unit of UNIT_ORDER) {
        if (unit === 'seconds') {
            units[unit] = remaining;
        } else {
            units[unit] = Math.floor(remaining / TIME_UNITS[unit]);
            remaining = remaining % TIME_UNITS[unit];
        }
    }

    // Return only non-zero units formatted like: "1Y 2M 3W"
    return UNIT_ORDER
        .filter(unit => units[unit] > 0)
        .map(unit => `${units[unit]}${unit.charAt(0).toUpperCase()}`)
        .join(' ') || 'None';
};

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
    const isIntervalBased = quest.quest_type === 'interval-based';

    // Cascading unit conversion with caps
    const handleUnitChange = (unit, value) => {
        const numValue = Math.max(0, parseInt(value) || 0);
        
        // Define unit caps (when to cascade to next unit)
        const UNIT_CAPS = {
            seconds: 60,
            minutes: 60,
            hours: 24,
            days: 7,
            weeks: 4,      // ~4 weeks per month
            months: 12,
            years: Infinity // No cap for years
        };

        // Unit hierarchy (order from largest to smallest)
        const UNIT_ORDER = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

        setDraftResetUnits((prev) => {
            const updated = { ...prev, [unit]: numValue };
            
            // Find which unit was changed
            const unitIndex = UNIT_ORDER.indexOf(unit);

            // Cascade upwards (from smaller units to larger units)
            for (let i = unitIndex; i > 0; i--) {
                const currentUnit = UNIT_ORDER[i];
                const nextUnit = UNIT_ORDER[i - 1];
                const cap = UNIT_CAPS[currentUnit];

                if (updated[currentUnit] >= cap) {
                    const overflow = Math.floor(updated[currentUnit] / cap);
                    updated[nextUnit] = (updated[nextUnit] || 0) + overflow;
                    updated[currentUnit] = updated[currentUnit] % cap;
                }
            }

            return updated;
        });
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
                                isIntervalBased
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                            }`}
                        >
                            {isIntervalBased ? 'Interval-Based' : 'Always'}
                        </span>
                        {quest.completed_users_count !== undefined && (
                            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-gray-100 text-gray-700 dark:bg-gray-800/60 dark:text-gray-300">
                                {quest.completed_users_count}/{quest.total_users_count} completed
                            </span>
                        )}
                    </div>
                    
                    {/* Reset Status Information */}
                    {isIntervalBased && quest.next_reset_at && (
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="text-slate-600 dark:text-slate-400">Reset status:</span>
                            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                                <Clock className="h-3 w-3" />
                                {formatTimeUntilReset(quest.next_reset_at)}
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
                            
                            {isIntervalBased && (
                                <div className="space-y-2">
                                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Reset Interval:</span>
                                    <div className="grid grid-cols-4 gap-2 md:grid-cols-7">
                                        {['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'].map((unit) => {
                                            const maxValues = {
                                                seconds: 59,
                                                minutes: 59,
                                                hours: 23,
                                                days: 6,
                                                weeks: 3,
                                                months: 11,
                                                years: 999
                                            };
                                            
                                            return (
                                                <div key={unit} className="flex flex-col items-center gap-1">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max={maxValues[unit]}
                                                        value={draftResetUnits[unit]}
                                                        onChange={(e) => handleUnitChange(unit, e.target.value)}
                                                        className="w-12 rounded-lg border border-slate-200/70 bg-white/90 px-2 py-1 text-center text-xs text-slate-900 shadow-sm focus:border-csway-green focus:outline-none focus:ring-2 focus:ring-csway-green/30 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-100"
                                                    />
                                                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                        {unit.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            );
                                        })}
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
                            {isIntervalBased && (
                                <span className="flex items-center gap-1 rounded-lg bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                    <Clock className="h-3 w-3" />
                                    <span className="text-xs font-medium">{formatDurationCascading(quest.reset_interval_seconds)}</span>
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

"use client";

import {
    IconPencil,
    IconCheck,
    IconX,
    IconToggleLeft,
    IconToggleRight,
    IconLoader2,
    IconTrophy,
    IconAlertTriangle
} from '@tabler/icons-react';
import { IconButton } from '@/components/ui/Buttons';
import { formatTimeUntilReset } from '@/lib/time-formatter';

const formatDurationDaysOnly = (seconds) => {
    if (!seconds || seconds <= 0) return 'None';
    const units = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    let remaining = seconds;
    units.days = Math.floor(remaining / 86400);
    remaining %= 86400;
    units.hours = Math.floor(remaining / 3600);
    remaining %= 3600;
    units.minutes = Math.floor(remaining / 60);
    remaining %= 60;
    units.seconds = remaining;
    const UNIT_ORDER = ['days', 'hours', 'minutes', 'seconds'];
    return UNIT_ORDER
        .filter(unit => units[unit] > 0)
        .map(unit => `${units[unit]} ${unit.charAt(0).toUpperCase() + unit.slice(1)}`)
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

    const handleUnitChange = (unit, value) => {
        const numValue = Math.max(0, parseInt(value) || 0);
        setDraftResetUnits((prev) => ({
            ...prev,
            [unit]: numValue
        }));
    };

    return (
        <li className={`group relative transition-colors ${isEditing ? 'bg-slate-50/80 dark:bg-slate-800/50' : 'bg-white hover:bg-slate-50/50 dark:bg-slate-900 dark:hover:bg-slate-800/30'}`}>
            <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] items-center gap-4 p-4 md:py-5">
                <div className={`space-y-1.5 ${!isExplicit && !isEditing ? 'opacity-60' : ''}`}>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${!isExplicit ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                            {quest.title}
                        </span>
                        {!isExplicit && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                Hidden
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="capitalize">{isIntervalBased ? 'Interval' : 'Always'}</span>
                        <span>&bull;</span>
                        <span>{isExplicit ? 'Public' : 'Private'}</span>
                        {!isEditing && isIntervalBased && (
                            <>
                                <span>&bull;</span>
                                <span className="font-medium text-slate-600 dark:text-slate-300">
                                    {formatDurationDaysOnly(quest.reset_interval_seconds)}
                                </span>
                                {quest.next_reset_at && (
                                    <span className="text-slate-400 dark:text-slate-500 ml-1">
                                        (Next: {formatTimeUntilReset(quest.next_reset_at)})
                                    </span>
                                )}
                            </>
                        )}
                        {quest.will_reset_on_next_trigger && (
                            <>
                                <span>&bull;</span>
                                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-500">
                                    <IconAlertTriangle className="h-3 w-3" /> Reset Pending
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex justify-start md:justify-center">
                    {isEditing ? (
                        <div className="w-full max-w-[120px]">
                            <label className="sr-only">Points</label>
                            <input
                                type="number"
                                min="0"
                                value={draftValue}
                                onChange={(e) => setDraftValue(e.target.value)}
                                className="w-full rounded border border-slate-300 px-2 py-1 text-sm font-medium focus:border-csway-green focus:ring-1 focus:ring-csway-green dark:border-slate-600 dark:bg-slate-800"
                                placeholder="Points"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200">
                            <IconTrophy className="h-3.5 w-3.5 text-csway-orange" />
                            {quest.points}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-end gap-2">
                    {isEditing ? (
                        <>
                            <IconButton icon={IconX} onClick={onCancelEditing} disabled={isBusy} colorScheme="slate" title="Cancel" />
                            <IconButton icon={IconCheck} onClick={() => onSave(quest.id)} disabled={isBusy} isLoading={isBusy} colorScheme="emerald" title="Save" />
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => onToggleExplicit?.(quest)}
                                disabled={isBusy}
                                className="p-2 text-slate-400 hover:text-csway-green transition-colors"
                                title={isExplicit ? "Hide Quest" : "Show Quest"}
                            >
                                {isToggling ? <IconLoader2 className="h-4 w-4 animate-spin" /> : (
                                    isExplicit ? <IconToggleRight className="h-5 w-5 text-csway-green" /> : <IconToggleLeft className="h-5 w-5" />
                                )}
                            </button>
                            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
                            <IconButton icon={IconPencil} onClick={() => onStartEditing(quest)} disabled={isBusy} colorScheme="slate" title="Edit" />
                        </>
                    )}
                </div>
            </div>
            {isEditing && isIntervalBased && (
                <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/30">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        Reset Frequency
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {['days', 'hours', 'minutes', 'seconds'].map((unit) => {
                            const val = draftResetUnits[unit];
                            return (
                                <div key={unit} className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                                    <input
                                        type="number"
                                        min="0"
                                        value={val}
                                        onChange={(e) => handleUnitChange(unit, e.target.value)}
                                        className="w-16 px-2 py-1 text-sm text-center border-none focus:ring-0 bg-transparent"
                                    />
                                    <span className="bg-slate-50 dark:bg-slate-800 px-2 py-1 text-xs text-slate-500 border-l border-slate-200 dark:border-slate-700 capitalize">
                                        {unit}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    {inlineError && <p className="mt-2 text-xs text-red-500">{inlineError}</p>}
                </div>
            )}
        </li>
    );
};
"use client";

import { useState } from 'react';
import { ListChecks } from 'lucide-react';

import { AddQuestForm } from './AddQuestForm';
import { Card, SectionTitle } from '../../shared/helpers/Helper';

const QuestList = ({ quests }) => {
    if (!quests.length) {
        return (
            <Card className="h-full" innerClassName="space-y-6">
                <SectionTitle icon={<ListChecks className="h-6 w-6 text-csway-green" />} title="Existing quests" />
                <div className="flex h-full min-h-[180px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300/60 bg-white/40 text-center text-sm text-slate-500 dark:border-slate-700/70 dark:bg-slate-900/40 dark:text-slate-400">
                    <p>No quests found yet.</p>
                    <p className="mt-1 text-xs">Create your first quest to energize the team.</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="h-full" innerClassName="space-y-6">
            <SectionTitle icon={<ListChecks className="h-6 w-6 text-csway-green" />} title="Existing quests" />

            <ul className="space-y-3">
                {quests.map((quest) => (
                    <li
                        key={quest.id || `${quest.code}-${quest.title}`}
                        className="group rounded-xl border border-slate-200/70 bg-white/70 p-4 transition-all duration-200 hover:border-csway-green/80 hover:bg-white dark:border-slate-700/70 dark:bg-slate-900/50 dark:hover:border-csway-green/60 dark:hover:bg-slate-900"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{quest.title}</span>
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/80 dark:text-slate-300">
                                        {quest.code}
                                    </span>
                                </div>
                                {quest.description && (
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                        {quest.description}
                                    </p>
                                )}
                            </div>
                            <span className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                                {quest.points}
                                <span className="text-xs font-medium">pts</span>
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    );
};

//const QuestInsightCard = ({ icon, label, value, helper }) => (
//    <Card className="h-full" variant="custom" innerClassName="flex items-start gap-4">
//        <div className="rounded-xl bg-csway-green/10 p-3 text-csway-green">
//            {icon}
//        </div>
//        <div className="space-y-1">
//            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
//            <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
//            {helper && <p className="text-xs text-slate-500 dark:text-slate-400">{helper}</p>}
//        </div>
//    </Card>
//);

export const QuestsManager = ({ initialQuests = [] }) => {
    const [quests, setQuests] = useState(initialQuests);

    const handleQuestCreated = (quest) => {
        setQuests((prev) => {
            const filtered = prev.filter((existing) => existing.id !== quest.id && existing.code !== quest.code);
            return [quest, ...filtered];
        });
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <AddQuestForm onCreated={handleQuestCreated} />
                <QuestList quests={quests} />
            </div>
        </div>
    );
};

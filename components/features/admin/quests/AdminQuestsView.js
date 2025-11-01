"use client";

import { useState } from 'react';
import { Monitor, ShieldCheck, Sparkles } from 'lucide-react';

import { Card } from '@/components/shared/helpers/Helper';
import { MissingQuestsWarning } from './MissingQuestsWarning';
import { QuestsManager } from './QuestsManager';

export const AdminQuestsView = ({ initialQuests = [] }) => {
    const [quests, setQuests] = useState(initialQuests);
    const activeQuestLabel = `${quests.length} active ${quests.length === 1 ? 'quest' : 'quests'}`;

    return (
        <div>
            <div className="lg:hidden">
                <Card className="h-full" innerClassName="flex flex-col items-center justify-center space-y-4 py-10 text-center">
                    <Monitor className="h-9 w-9 text-csway-green" />
                    <div className="space-y-2">
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">Desktop only feature</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            The quest management dashboard is optimized for laptop and desktop screens. Please switch to a larger display to continue.
                        </p>
                    </div>
                </Card>
            </div>

            <div className="hidden space-y-10 lg:block">
                <MissingQuestsWarning existingQuests={initialQuests} />
                
                <Card variant="custom" className="relative overflow-hidden">
                    <div className="pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-csway-green/15 blur-3xl" />
                    <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-emerald-400/15 blur-3xl" />

                    <div className="relative flex flex-col gap-5">
                        <span className="inline-flex items-center gap-2 self-start rounded-full bg-csway-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-csway-green">
                            <ShieldCheck className="h-4 w-4" />
                            Admin panel
                        </span>

                        <div className="space-y-3">
                            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Quest management</h1>
                            <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
                                Launch new quests, adjust rewards, and monitor the incentive catalog that keeps your team moving forward.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-100 backdrop-blur-sm dark:bg-slate-900/60 dark:text-slate-300 dark:ring-slate-800">
                                <Sparkles className="h-4 w-4 text-csway-green" />
                                {activeQuestLabel}
                            </span>
                        </div>
                    </div>
                </Card>

                <QuestsManager initialQuests={initialQuests} onQuestsChange={setQuests} />
            </div>
        </div>
    );
};

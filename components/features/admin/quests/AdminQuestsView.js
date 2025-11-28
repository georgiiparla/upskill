"use client";

import { useState } from 'react';
import { Monitor, ShieldCheck } from 'lucide-react';

import { Card } from '@/components/shared/helpers/Helper'; //
import { QuestsManager } from './QuestsManager'; //

export const AdminQuestsView = ({ initialQuests = [] }) => {
    const [quests, setQuests] = useState(initialQuests);
    const activeQuestLabel = `${quests.length} active ${quests.length === 1 ? 'quest' : 'quests'}`;

    return (
        <div className="h-full">
            {/* Mobile Guard */}
            <div className="lg:hidden">
                <Card className="h-full" innerClassName="flex flex-col items-center justify-center space-y-4 py-10 text-center">
                    <Monitor className="h-9 w-9 text-csway-green" />
                    <div className="space-y-2">
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">Desktop only feature</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            The quest management dashboard is optimized for laptop and desktop screens.
                        </p>
                    </div>
                </Card>
            </div>

            {/* Desktop View - Geometric & Clean */}
            <div className="hidden lg:block space-y-6">
                <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-700 pb-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-csway-green/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-csway-green">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Admin Access
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Quest Management</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Configure rewards, intervals, and visibility for team quests.
                        </p>
                    </div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {activeQuestLabel}
                    </div>
                </div>

                <QuestsManager initialQuests={initialQuests} onQuestsChange={setQuests} />
            </div>
        </div>
    );
};
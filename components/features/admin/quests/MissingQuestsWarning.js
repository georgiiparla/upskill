"use client";

import { AlertCircle } from 'lucide-react';
import { QuestRegistry } from '@/lib/questRegistry';

export const MissingQuestsWarning = ({ existingQuests = [] }) => {
    // Get all quests defined in registry
    const registeredQuestCodes = Object.values(QuestRegistry.codes);
    
    // Get quests that are in registry but not in database
    const missingQuests = registeredQuestCodes.filter(code => {
        return !existingQuests.some(quest => quest.code === code);
    });

    if (missingQuests.length === 0) {
        return null;  // No warning needed
    }

    // Get details for missing quests
    const missingDetails = missingQuests.map(code => {
        const quest = QuestRegistry.find(code);
        return {
            code,
            title: quest?.title || code,
            points: quest?.points || '?',
        };
    });

    return (
        <div className="mb-6 rounded-lg border border-amber-300/60 bg-amber-50/80 p-4 dark:border-amber-700/60 dark:bg-amber-900/20">
            <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div className="space-y-2">
                    <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                        Missing Quests Detected
                    </h3>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                        The following quests are defined in the system but not created in the database. 
                        Actions that trigger these quests will be silently skipped and logged.
                    </p>
                    <div className="mt-3 space-y-1">
                        {missingDetails.map(quest => (
                            <div
                                key={quest.code}
                                className="text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2"
                            >
                                <span className="text-amber-500 mt-0.5">•</span>
                                <div className="flex-1">
                                    <code className="font-mono bg-amber-900/20 px-1.5 py-0.5 rounded text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
                                        {quest.code}
                                    </code>
                                    <span className="ml-2">
                                        "{quest.title}" ({quest.points} pts)
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-3 font-medium">
                        To fix: Create these quests using the form below, or check backend logs for details.
                    </p>
                </div>
            </div>
        </div>
    );
};

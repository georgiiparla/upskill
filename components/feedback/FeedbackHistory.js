"use client";
import { MOCK_FEEDBACK_HISTORY } from "@/mock/mock_data";
import { Card, SectionTitle } from "../Helper";
import { MessageSquare } from "lucide-react";

// Determines the color of the left border based on sentiment
const getSentimentColor = (sentiment) => {
    switch (sentiment) {
        case 'Positive': return 'border-l-4 border-green-500';
        case 'Negative': return 'border-l-4 border-red-500';
        default: return 'border-l-4 border-amber-500';
    }
};

export const FeedbackHistory = () => {
    return (
        <div className="mt-6 flex-grow flex flex-col">
            <SectionTitle icon={<MessageSquare className="h-5 w-5 text-indigo-500" />} title="Recent Submissions" />
            <Card className="flex-grow flex flex-col">
                {/* This container makes the list scrollable within the card */}
                <div className="flex-grow overflow-y-auto pr-2 max-h-[300px]">
                    <ul className="space-y-3">
                        {MOCK_FEEDBACK_HISTORY.map(item => (
                            <li
                                key={item.id}
                                className={`p-3 rounded-lg transition-colors hover:bg-gray-500/10 ${getSentimentColor(item.sentiment)}`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">{item.subject}</h4>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{item.content}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>
        </div>
    );
};

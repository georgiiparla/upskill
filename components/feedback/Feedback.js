"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Card, HistoryListItem } from "../shared/Helper";
import { ActionButton } from '../shared/Buttons';
import { SearchBar } from '../shared/SearchBar';

export const Feedback = ({
    initialSubmissions,
    initialPrompts,
}) => {

    const [view, setView] = useState('active');
    const [searchTerm, setSearchTerm] = useState('');

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case 'Positive': return 'border-green-500';
            case 'Negative': return 'border-red-500';
            default: return 'border-amber-500';
        }
    }

    const getRequestStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'border-blue-500';
            case 'completed': return 'border-gray-500';
            default: return 'border-gray-500';
        }
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filteredSubmissions = initialSubmissions.filter(item => {
        const subjectMatch = item.subject?.toLowerCase().includes(lowerCaseSearchTerm) || false;
        const contentMatch = item.content?.toLowerCase().includes(lowerCaseSearchTerm) || false;
        return subjectMatch || contentMatch;
    });

    const filteredPrompts = initialPrompts.filter(item => {
        const topicMatch = item.topic?.toLowerCase().includes(lowerCaseSearchTerm) || false;
        const detailsMatch = item.details?.toLowerCase().includes(lowerCaseSearchTerm) || false;
        return topicMatch || detailsMatch;
    });

    return (
        <div className="space-y-8">
            <Card className="flex flex-col">
                <div className="flex items-center gap-4 mb-10">
                    <ActionButton text="Active" shortText="Active" colorScheme="blue"
                        onClick={() => setView("active")}
                        isActive={view === 'active'} />
                    <ActionButton text="Submissions" shortText="Submissions" colorScheme="orange"
                        onClick={() => setView("submissions")}
                        isActive={view === 'submissions'} />
                    <ActionButton text="My Prompts" shortText="Prompts" colorScheme="green"
                        onClick={() => setView("prompts")}
                        isActive={view === 'prompts'} />
                </div>

                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Search list..."
                    className="mb-6"
                />

                <div className="overflow-y-auto no-scrollbar max-h-[62.5vh]">
                    {
                        view === "submissions" ?
                            <ul className="space-y-4">
                                {filteredSubmissions.map((item, index) => (
                                    <HistoryListItem
                                        key={`${item.id}-feedback-${index}`}
                                        href={item.promptTag ? `/feedback/prompt/${item.promptTag}` : undefined}
                                        subject={item.subject}
                                        createdAt={item.created_at}
                                        content={item.content}
                                        borderColorClass={getSentimentColor(item.sentiment)} />
                                ))}
                            </ul>
                            : view === "prompts" ?
                                <ul className="space-y-4">
                                    {filteredPrompts.map((item) => (
                                        <HistoryListItem
                                            key={item.id}
                                            href={`/feedback/prompt/${item.tag}`}
                                            subject={item.topic}
                                            createdAt={item.created_at}
                                            content={item.details}
                                            borderColorClass={getRequestStatusColor(item.status)}
                                        />
                                    ))}
                                </ul>
                                :
                                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 py-16">
                                    <p className="text-xs md:text-sm">Active items view placeholder.</p>
                                </div>
                    }
                </div>
            </Card>
        </div>
    );
};
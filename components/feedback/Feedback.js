"use client"

import { useState } from 'react';
import { HistoryListItem } from "../shared/Helper";
import { ActionButton } from '../shared/Buttons';
import { SearchBar } from '../shared/SearchBar';
import { Card } from "@/components/shared/Helper";

export const Feedback = ({
    initialSubmissions = [],
    initialRequests = [],
}) => {
    const [view, setView] = useState('active');
    const [searchTerm, setSearchTerm] = useState('');

    const getSentimentColor = (sentimentText) => {
        switch (sentimentText) {
            case 'Far Exceeds Expectations':
                return 'border-teal-500';
            case 'Exceeds Expectations':
                return 'border-green-500';
            case 'Needs Improvement':
                return 'border-red-500';
            case 'Meets Expectations':
            default:
                return 'border-amber-500';
        }
    };

    const getRequestStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'border-blue-500';
            case 'closed': return 'border-gray-500';
            default: return 'border-gray-500';
        }
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filteredSubmissions = initialSubmissions.filter(item => {
        const subjectMatch = item.subject?.toLowerCase().includes(lowerCaseSearchTerm) || false;
        const contentMatch = item.content?.toLowerCase().includes(lowerCaseSearchTerm) || false;
        return subjectMatch || contentMatch;
    });

    const searchedRequests = initialRequests.filter(item => {
        const topicMatch = item.topic?.toLowerCase().includes(lowerCaseSearchTerm) || false;
        const authorMatch = item.requester_username?.toLowerCase().includes(lowerCaseSearchTerm) || false;
        const tagMatch = item.tag?.toLowerCase().includes(lowerCaseSearchTerm) || false;
        return topicMatch || authorMatch || tagMatch;
    });

    const myRequests = searchedRequests.filter(item => item.isOwner);
    const activeRequests = searchedRequests.filter(item => item.status !== 'closed');
    const closedRequests = searchedRequests.filter(item => item.status === 'closed');

    const renderList = () => {
        let listToRender = [];
        let emptyMessage = "No items to display.";

        if (view === 'active') {
            listToRender = activeRequests;
            emptyMessage = "There are no active feedback requests right now.";
        } else if (view === 'closed') {
            listToRender = closedRequests;
            emptyMessage = "You don't have any closed feedback requests.";
        } else if (view === 'requests') {
            listToRender = myRequests;
            emptyMessage = "You haven't created any feedback requests yet.";
        } else if (view === 'submissions') {
            listToRender = filteredSubmissions;
            emptyMessage = "You haven't submitted any feedback yet.";
        }

        if (listToRender.length === 0) {
            return (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 py-16">
                    <p className="text-xs md:text-sm">{emptyMessage}</p>
                </div>
            )
        }
        
        return (
            <ul className="space-y-4">
                {listToRender.map((item) => {
                    const href = view === 'submissions'
                        ? (item.request_tag ? `/feedback/request/${item.request_tag}` : undefined)
                        : (item.tag ? `/feedback/request/${item.tag}` : undefined);
                    
                    return (
                        <HistoryListItem
                            key={view === 'submissions' ? `sub-${item.id}` : `req-${item.id}`}
                            href={href}
                            subject={view === 'submissions' ? item.subject : item.topic}
                            createdAt={item.created_at}
                            content={view === 'submissions' ? item.content : `Requested by: ${item.isOwner ? 'Me' : item.requester_username}`}
                            borderColorClass={view === 'submissions' ? getSentimentColor(item.sentiment_text) : getRequestStatusColor(item.status)}
                        />
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="space-y-8">
            <Card className="flex flex-col">
                <div className="flex items-center gap-4 mb-10">
                    <ActionButton text="Active" shortText="Active" colorScheme="blue"
                        onClick={() => setView("active")}
                        isActive={view === 'active'} />
                    {/* 5. Add the "Closed" button you already created */}
                    <ActionButton text="Closed" shortText="Done" colorScheme="gray"
                        onClick={() => setView("closed")}
                        isActive={view === 'closed'} />
                    <ActionButton text="Submissions" shortText="Sent" colorScheme="orange"
                        onClick={() => setView("submissions")}
                        isActive={view === 'submissions'} />
                    <ActionButton text="My Requests" shortText="Requests" colorScheme="green"
                        onClick={() => setView("requests")}
                        isActive={view === 'requests'} />
                </div>

                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Search by topic, author, or tag..."
                    className="mb-6"
                />

                <div className="overflow-y-auto no-scrollbar max-h-[67.5vh]">
                    {renderList()}
                </div>
            </Card>
        </div>
    );
};
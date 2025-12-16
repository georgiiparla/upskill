"use client"

import { useState } from 'react';
import { HistoryListItem, Card } from "../../shared/helpers/Helper";
import { ActionButton } from '../../core/buttons/Buttons';
import { SearchBar } from '../../core/ui/SearchBar';
import { User } from 'lucide-react';

export const Feedback = ({
    initialSubmissions = [],
    initialRequests = [],
}) => {
    const [view, setView] = useState('active');
    const [searchTerm, setSearchTerm] = useState('');

    const getSentimentColor = (sentimentText) => {
        switch (sentimentText) {
            case 'Exceeds Expectations': return 'teal';
            case 'Meets Expectations': return 'green';
            // FIX: Changed 'yellow' to 'amber' to match HistoryListItem config
            case 'Approaching Expectations': return 'amber';
            case 'Below Expectations': return 'red';
            default: return 'green';
        }
    };

    const getRequestStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'blue';
            case 'closed': return 'gray';
            default: return 'gray';
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

                    const requestContent = (
                        <span className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 flex-shrink-0" />
                            {item.isOwner ? 'Me' : item.requester_username}
                        </span>
                    );

                    return (
                        <HistoryListItem
                            variant={view === 'submissions' ? 'background' : 'dot'}
                            key={view === 'submissions' ? `sub-${item.id}` : `req-${item.id}`}
                            href={href}
                            subject={view === 'submissions' ? `${item.subject}` : item.topic}
                            createdAt={item.created_at}
                            content={view === 'submissions' ? null : requestContent}
                            color={view === 'submissions' ? getSentimentColor(item.sentiment_text) : getRequestStatusColor(item.status)}
                        />
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="space-y-8">
            <Card className="h-full flex flex-col">
                <div className="flex items-center gap-4 mb-10 flex-shrink-0">
                    <ActionButton text="Active" shortText="Open" colorScheme="blue"
                        onClick={() => setView("active")}
                        isActive={view === 'active'} />
                    <ActionButton text="Closed" shortText="Done" colorScheme="gray"
                        onClick={() => setView("closed")}
                        isActive={view === 'closed'} />
                    <ActionButton text="Submissions" shortText="Sent" colorScheme="orange"
                        onClick={() => setView("submissions")}
                        isActive={view === 'submissions'} />
                    <ActionButton text="My Requests" shortText="Me" colorScheme="green"
                        onClick={() => setView("requests")}
                        isActive={view === 'requests'} />
                </div>

                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Search by topic, author, or tag..."
                    className="mb-6 flex-shrink-0"
                />

                <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] sm:max-h-[450px] no-scrollbar">
                    {renderList()}
                </div>
            </Card>
        </div>
    );
};
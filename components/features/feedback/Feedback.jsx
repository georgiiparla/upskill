"use client"
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { HistoryListItem, Card } from "@/components/ui/Shared";
import { ActionButton } from '@/components/ui/Buttons';
import { SearchBar } from '@/components/ui/SearchBar';
import { Avatar } from '@/components/ui/Avatar';
import {
    IconInbox,
    IconCheckbox,
    IconSend,
    IconMessage
} from '@tabler/icons-react';

export const Feedback = ({
    initialSubmissions = [],
    initialRequests = [],
}) => {
    const [view, setView] = useState('active');
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuthStore();

    const getSentimentColor = (sentimentText) => {
        switch (sentimentText) {
            case 'Exceeds Expectations': return 'teal';
            case 'Meets Expectations': return 'green';
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

                    let displayUserHtml;
                    const amIRequester = item.requester_username === user?.username;
                    const amIPair = item.pair_username === user?.username;

                    const isGrayscale = view === 'closed';

                    if (item.pair_username) {
                        displayUserHtml = (
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    <Avatar username={item.requester_username} className="w-6 h-6 text-[10px] ring-2 ring-white dark:ring-slate-900" isGrayscale={isGrayscale} />
                                    <Avatar username={item.pair_username} className="w-6 h-6 text-[10px] ring-2 ring-white dark:ring-slate-900" isGrayscale={isGrayscale} />
                                </div>
                                <span className="text-sm">
                                    {amIRequester ? (
                                        <>Me <span className="text-slate-500 dark:text-slate-400">& {item.pair_username}</span></>
                                    ) : amIPair ? (
                                        <>Me <span className="text-slate-500 dark:text-slate-400">& {item.requester_username}</span></>
                                    ) : (
                                        <>{item.requester_username} <span className="text-slate-500 dark:text-slate-400">& {item.pair_username}</span></>
                                    )}
                                </span>
                            </div>
                        );
                    } else {
                        displayUserHtml = (
                            <div className="flex items-center gap-2">
                                <Avatar username={item.requester_username} className="w-6 h-6 text-[10px]" isGrayscale={isGrayscale} />
                                <span className="text-sm">{item.isOwner ? 'Me' : item.requester_username}</span>
                            </div>
                        );
                    }

                    const requestContent = displayUserHtml;

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
        <div className="w-full max-w-6xl mx-auto">
            <Card className="h-[85vh] min-h-[600px] flex flex-col shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10">
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-8 w-full px-1 py-1 flex-shrink-0 border-b border-slate-100 dark:border-slate-800/60 pb-6">
                    <ActionButton
                        icon={<IconInbox className="h-4 w-4" />}
                        text="Active"
                        shortText="Open"
                        colorScheme="blue"
                        onClick={() => setView("active")}
                        isActive={view === 'active'}
                    />
                    <ActionButton
                        icon={<IconCheckbox className="h-4 w-4" />}
                        text="Closed"
                        shortText="Done"
                        colorScheme="gray"
                        onClick={() => setView("closed")}
                        isActive={view === 'closed'}
                    />
                    <ActionButton
                        icon={<IconSend className="h-4 w-4" />}
                        text="Submissions"
                        shortText="Sent"
                        colorScheme="orange"
                        onClick={() => setView("submissions")}
                        isActive={view === 'submissions'}
                    />
                    <ActionButton
                        icon={<IconMessage className="h-4 w-4" />}
                        text="My Requests"
                        shortText="Me"
                        colorScheme="green"
                        onClick={() => setView("requests")}
                        isActive={view === 'requests'}
                    />
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        placeholder="Search by topic, author, or tag..."
                        className="mb-6 flex-shrink-0"
                    />
                    <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pr-2">
                        {renderList()}
                    </div>
                </div>
            </Card>
        </div>
    );
};
"use client"
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { HistoryListItem, Card } from "@/components/ui/Shared";
import { ActionButton } from '@/components/ui/Buttons';
import { SearchBar } from '@/components/ui/SearchBar';
import { Avatar } from '@/components/ui/Avatar';
import { clientFetch } from '@/lib/client-api';
import {
    IconInbox,
    IconCheckbox,
    IconSend,
    IconMessage,
    IconLoader2
} from '@tabler/icons-react';

// Debounce hook
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export const Feedback = () => {
    const { user } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Read initial tab from URL or default to 'active'
    const viewParam = searchParams.get('tab') || 'active';

    // Controlled States
    const [view, setView] = useState(viewParam);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    // Data State
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    // Sync URL when View Changes
    const changeView = (newView) => {
        if (newView === view) return;
        setView(newView);
        const params = new URLSearchParams(searchParams.toString());
        params.set('tab', newView);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // Main Fetch Logic
    const fetchData = async (pageNum, isLoadMore = false) => {
        if (!isLoadMore) setLoading(true);
        else setLoadingMore(true);

        try {
            const apiPath = view === 'submissions' ? '/feedback_submissions' : '/feedback_requests';
            const queryParams = new URLSearchParams({
                page: pageNum.toString(),
                limit: '15'
            });

            if (view !== 'submissions') {
                queryParams.set('tab', view);
            }
            if (debouncedSearchTerm) {
                queryParams.set('search', debouncedSearchTerm);
            }

            const { success, data } = await clientFetch(`${apiPath}?${queryParams.toString()}`);

            if (success) {
                if (isLoadMore) {
                    setItems(prev => [...prev, ...data.items]);
                } else {
                    setItems(data.items || []);
                }
                setHasMore(data.hasMore || false);
            }
        } catch (error) {
            console.error("Failed to fetch feedback:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Effect: Fetch on View Change, Search Change
    useEffect(() => {
        setPage(1);
        setItems([]);
        fetchData(1, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view, debouncedSearchTerm]);

    // Externally Driven URL Param Watcher
    useEffect(() => {
        if (viewParam !== view) {
            setView(viewParam);
        }
    }, [viewParam]);

    const handleLoadMore = () => {
        if (!hasMore || loadingMore) return;
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData(nextPage, true);
    };

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

    const renderList = () => {
        if (loading && items.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                    <IconLoader2 className="h-8 w-8 animate-spin text-slate-300" />
                    <p className="mt-2 text-sm font-medium">Loading...</p>
                </div>
            );
        }

        if (items.length === 0) {
            let emptyMessage = "No items to display.";
            if (view === 'active') emptyMessage = "There are no active feedback requests right now.";
            else if (view === 'closed') emptyMessage = "You don't have any closed feedback requests.";
            else if (view === 'requests') emptyMessage = "You haven't created any feedback requests yet.";
            else if (view === 'submissions') emptyMessage = "You haven't submitted any feedback yet.";

            if (debouncedSearchTerm) {
                emptyMessage = `No results found for "${debouncedSearchTerm}"`;
            }

            return (
                <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500 min-h-[50vh]">
                    <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center opacity-70">
                        {view === 'active' ? <IconInbox className="w-8 h-8 opacity-50" /> :
                            view === 'closed' ? <IconCheckbox className="w-8 h-8 opacity-50" /> :
                                view === 'submissions' ? <IconSend className="w-8 h-8 opacity-50" /> :
                                    <IconMessage className="w-8 h-8 opacity-50" />}
                    </div>
                    <p className="font-medium text-slate-600 dark:text-slate-400">{emptyMessage}</p>
                </div>
            );
        }

        return (
            <ul className="space-y-3 pb-8">
                {items.map((item) => {
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

                {hasMore && (
                    <div className="pt-4 pb-2 flex justify-center w-full">
                        <button
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            className="text-sm font-medium px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full transition-colors flex items-center justify-center shadow-sm disabled:opacity-50"
                        >
                            {loadingMore ? (
                                <><IconLoader2 className="w-4 h-4 mr-2 animate-spin" /> Loading...</>
                            ) : (
                                'Load More'
                            )}
                        </button>
                    </div>
                )}
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
                        onClick={() => changeView("active")}
                        isActive={view === 'active'}
                    />
                    <ActionButton
                        icon={<IconCheckbox className="h-4 w-4" />}
                        text="Closed"
                        shortText="Done"
                        colorScheme="gray"
                        onClick={() => changeView("closed")}
                        isActive={view === 'closed'}
                    />
                    <ActionButton
                        icon={<IconSend className="h-4 w-4" />}
                        text="Submissions"
                        shortText="Sent"
                        colorScheme="orange"
                        onClick={() => changeView("submissions")}
                        isActive={view === 'submissions'}
                    />
                    <ActionButton
                        icon={<IconMessage className="h-4 w-4" />}
                        text="My Requests"
                        shortText="Me"
                        colorScheme="green"
                        onClick={() => changeView("requests")}
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
                    <div className="flex-1 overflow-y-auto no-scrollbar pr-2 relative">
                        {renderList()}
                    </div>
                </div>
            </Card>
        </div>
    );
};
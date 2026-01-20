import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import FeedbackRequestDetail from '@/components/features/feedback/FeedbackRequestDetail';
import * as ClientApi from '@/lib/client-api';

// Mock dependencies
vi.mock('next/navigation', () => ({
    usePathname: () => '/feedback/request/test-tag',
}));

vi.mock('@/lib/client-api', () => ({
    clientFetch: vi.fn(),
}));

vi.mock('@/components/features/feedback/components/RequestDetailsCard', () => ({
    RequestDetailsCard: ({ requestData }) => (
        <div data-testid="request-details-card">
            <div>{requestData.topic}</div>
            <div>{requestData.requester_username}</div>
        </div>
    ),
}));

vi.mock('@/components/features/feedback/components/FeedbackCommentItem', () => ({
    FeedbackCommentItem: ({ feedback }) => (
        <div data-testid="feedback-comment">{feedback.content}</div>
    ),
}));

vi.mock('@/components/features/feedback/components/RequestSentimentDonutChart', () => ({
    RequestSentimentDonutChart: () => <div data-testid="sentiment-chart">Chart</div>,
}));

describe('FeedbackRequestDetail', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows loading state initially', () => {
        ClientApi.clientFetch.mockImplementation(() => new Promise(() => { }));
        const { container } = render(<FeedbackRequestDetail />);

        // The loading spinner has animate-spin class
        expect(container.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('displays request data and submissions after load', async () => {
        ClientApi.clientFetch.mockResolvedValue({
            success: true,
            data: {
                requestData: {
                    id: 1,
                    topic: 'Test Request Topic',
                    requester_username: 'tester',
                    isOwner: true,
                    visibility: 'public',
                    status: 'pending'
                },
                submissions: [
                    { id: 1, content: 'Great work!', sentiment_text: 'Meets Expectations' }
                ]
            }
        });

        render(<FeedbackRequestDetail />);

        await waitFor(() => {
            expect(screen.getByText('Test Request Topic')).toBeInTheDocument();
        });

        expect(screen.getByText('tester')).toBeInTheDocument();
        expect(screen.getByText('Great work!')).toBeInTheDocument();
    });

    it('shows error message on API failure', async () => {
        ClientApi.clientFetch.mockResolvedValue({
            success: false,
            error: 'Request not found'
        });

        render(<FeedbackRequestDetail />);

        await waitFor(() => {
            expect(screen.getByText(/request not found/i)).toBeInTheDocument();
        });
    });

    it('shows empty state when no submissions', async () => {
        ClientApi.clientFetch.mockResolvedValue({
            success: true,
            data: {
                requestData: {
                    id: 1,
                    topic: 'Empty Request',
                    requester_username: 'tester',
                    isOwner: true,
                    visibility: 'public',
                    status: 'pending'
                },
                submissions: []
            }
        });

        render(<FeedbackRequestDetail />);

        await waitFor(() => {
            expect(screen.getByText(/no feedback submissions/i)).toBeInTheDocument();
        });
    });

    it('shows private notice for private requests when not owner', async () => {
        ClientApi.clientFetch.mockResolvedValue({
            success: true,
            data: {
                requestData: {
                    id: 1,
                    topic: 'Private Request',
                    requester_username: 'someone_else',
                    isOwner: false,
                    visibility: 'requester_only',
                    status: 'pending'
                },
                submissions: []
            }
        });

        render(<FeedbackRequestDetail />);

        await waitFor(() => {
            expect(screen.getByText(/feedback is private/i)).toBeInTheDocument();
        });
    });

    it('shows sentiment chart only for owner', async () => {
        ClientApi.clientFetch.mockResolvedValue({
            success: true,
            data: {
                requestData: {
                    id: 1,
                    topic: 'Owner Request',
                    requester_username: 'tester',
                    isOwner: true,
                    visibility: 'public',
                    status: 'pending'
                },
                submissions: [{ id: 1, content: 'Test', sentiment_text: 'Meets Expectations' }]
            }
        });

        render(<FeedbackRequestDetail />);

        await waitFor(() => {
            expect(screen.getByTestId('sentiment-chart')).toBeInTheDocument();
        });
    });
});

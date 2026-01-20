import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import FeedbackHub from '@/components/features/feedback/FeedbackHub';
import * as ClientApi from '@/lib/client-api';
import * as AuthContext from '@/context/AuthContext';

// Mock dependencies
vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('react-hot-toast', () => {
    const toast = vi.fn();
    toast.loading = vi.fn();
    toast.success = vi.fn();
    toast.error = vi.fn();
    return { default: toast };
});

vi.mock('@/context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

vi.mock('@/lib/client-api', () => ({
    clientFetch: vi.fn(),
}));

vi.mock('@/components/ui/Shared', () => ({
    Card: ({ children }) => <div>{children}</div>,
}));

import toast from 'react-hot-toast';

describe('FeedbackHub (NewFeedbackForm)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        AuthContext.useAuth.mockReturnValue({ refreshNavbarPoints: vi.fn() });
    });

    it('renders the form and loads topic from API', async () => {
        ClientApi.clientFetch.mockResolvedValue({
            success: true,
            data: { requestData: { topic: 'Test Topic from API' } }
        });

        render(<FeedbackHub requestTag="test-tag" />);

        // Should show loading initially
        expect(screen.getByText(/loading topic/i)).toBeInTheDocument();

        // Wait for topic to load
        await waitFor(() => {
            expect(screen.getByText('Test Topic from API')).toBeInTheDocument();
        });
    });

    it('validates minimum content length', async () => {
        ClientApi.clientFetch.mockResolvedValue({
            success: true,
            data: { requestData: { topic: 'Test Topic' } }
        });

        render(<FeedbackHub requestTag="test-tag" />);
        const user = userEvent.setup();

        await waitFor(() => {
            expect(screen.getByText('Test Topic')).toBeInTheDocument();
        });

        // Type short feedback
        const textarea = screen.getByPlaceholderText(/be specific/i);
        await user.type(textarea, 'Too short');

        // Submit
        await user.click(screen.getByRole('button', { name: /submit feedback/i }));

        // Should show error
        expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/more detailed/i));
    });

    it('submits feedback with correct payload', async () => {
        ClientApi.clientFetch
            .mockResolvedValueOnce({ success: true, data: { requestData: { topic: 'Test Topic' } } })
            .mockResolvedValueOnce({ success: true, data: {} });

        render(<FeedbackHub requestTag="test-tag" />);
        const user = userEvent.setup();

        await waitFor(() => {
            expect(screen.getByText('Test Topic')).toBeInTheDocument();
        });

        // Type valid feedback
        const textarea = screen.getByPlaceholderText(/be specific/i);
        await user.type(textarea, 'This is a detailed feedback comment that meets the minimum length requirement.');

        // Click sentiment button (default is 3, let's click 4)
        const exceedsBtn = screen.getByText('Exceeds Expectations').closest('button');
        await user.click(exceedsBtn);

        // Submit
        await user.click(screen.getByRole('button', { name: /submit feedback/i }));

        await waitFor(() => {
            expect(ClientApi.clientFetch).toHaveBeenCalledWith('/feedback_submissions', expect.objectContaining({
                method: 'POST',
                body: expect.objectContaining({
                    request_tag: 'test-tag',
                    sentiment: 4,
                    content: expect.stringMatching(/detailed feedback/i)
                })
            }));
        });
    });

    it('disables button during submission', async () => {
        ClientApi.clientFetch
            .mockResolvedValueOnce({ success: true, data: { requestData: { topic: 'Test Topic' } } })
            .mockImplementationOnce(() => new Promise(() => { })); // Never resolves

        render(<FeedbackHub requestTag="test-tag" />);
        const user = userEvent.setup();

        await waitFor(() => {
            expect(screen.getByText('Test Topic')).toBeInTheDocument();
        });

        const textarea = screen.getByPlaceholderText(/be specific/i);
        await user.type(textarea, 'This is a detailed feedback comment that meets the minimum length requirement.');

        const submitBtn = screen.getByRole('button', { name: /submit feedback/i });
        await user.click(submitBtn);

        expect(submitBtn).toBeDisabled();
        expect(screen.getByText(/submitting/i)).toBeInTheDocument();
    });
});

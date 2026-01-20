import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { RequestDetailsCard } from '@/components/features/feedback/components/RequestDetailsCard';
import * as clientApi from '@/lib/client-api';

// Mock dependencies
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        refresh: vi.fn(),
    }),
}));

vi.mock('@/context/AuthContext', () => ({
    useAuth: () => ({
        refreshNavbarPoints: vi.fn(),
    }),
}));

vi.mock('react-hot-toast', () => ({
    default: {
        loading: vi.fn(),
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe('RequestDetailsCard', () => {
    const mockRequest = {
        id: 1,
        topic: 'Test Request',
        details: 'Some details',
        tag: 'test-tag',
        created_at: new Date().toISOString(),
        requester_username: 'tester',
        isOwner: false,
        status: 'open',
        visibility: 'public'
    };

    const mockOnUpdate = vi.fn();

    describe('Pair Parity / Ownership Logic', () => {
        it('does NOT show action buttons (Close/Delete) when isOwner is false', () => {
            render(<RequestDetailsCard requestData={{ ...mockRequest, isOwner: false }} onUpdate={mockOnUpdate} />);

            expect(screen.queryByText('Close')).not.toBeInTheDocument();
            expect(screen.queryByText('Delete')).not.toBeInTheDocument();
            expect(screen.getByText('Give Feedback')).toBeInTheDocument();
        });

        it('SHOWS action buttons (Close/Delete) when isOwner is true (Requester OR Pair)', () => {
            render(<RequestDetailsCard requestData={{ ...mockRequest, isOwner: true }} onUpdate={mockOnUpdate} />);

            expect(screen.getByText('Close')).toBeInTheDocument();
            expect(screen.getByText('Delete')).toBeInTheDocument();
            expect(screen.queryByText('Give Feedback')).not.toBeInTheDocument();
        });

        it('allows functionality of Close button when isOwner is true', async () => {
            vi.spyOn(clientApi, 'clientFetch').mockResolvedValue({ success: true, data: {} });

            render(<RequestDetailsCard requestData={{ ...mockRequest, isOwner: true }} onUpdate={mockOnUpdate} />);

            // Click Close -> Opens Modal
            fireEvent.click(screen.getByText('Close'));

            // Confirm in Modal
            fireEvent.click(screen.getByText('Close Request'));

            await waitFor(() => {
                expect(clientApi.clientFetch).toHaveBeenCalledWith('/feedback_requests/1', expect.objectContaining({
                    method: 'PATCH',
                    body: { status: 'closed' }
                }));
            });
        });
    });
});

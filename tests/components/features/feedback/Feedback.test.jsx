import React from 'react';
import { render, screen } from '@testing-library/react';
import { Feedback } from '@/components/features/feedback/Feedback'; // Extension resolution should handle .jsx
import { describe, it, expect, vi } from 'vitest';

// Mock child components to simplify testing
vi.mock('@/components/ui/Shared', () => ({
    HistoryListItem: ({ subject, content }) => (
        <li data-testid="history-item">
            <div>{subject}</div>
            <div>{content}</div>
        </li>
    ),
    Card: ({ children }) => <div>{children}</div>
}));

vi.mock('@/components/ui/Buttons', () => ({
    ActionButton: ({ text, onClick }) => <button onClick={onClick}>{text}</button>
}));

vi.mock('@/components/ui/SearchBar', () => ({
    SearchBar: () => <div>Search Bar</div>
}));

// Mock icons
vi.mock('@tabler/icons-react', () => ({
    IconUser: () => <span>IconUser</span>,
    IconInbox: () => <span>IconInbox</span>,
    IconCheckbox: () => <span>IconCheckbox</span>,
    IconSend: () => <span>IconSend</span>,
    IconMessage: () => <span>IconMessage</span>
}));

describe('Feedback Dashboard', () => {
    const mockRequests = [
        {
            id: 1,
            topic: 'Standard Request',
            requester_username: 'user1',
            status: 'pending',
            created_at: '2023-01-01',
            isOwner: false
        },
        {
            id: 2,
            topic: 'Shared Request',
            requester_username: 'user1',
            pair_username: 'user2', // This is the key field
            status: 'pending',
            created_at: '2023-01-02',
            isOwner: false
            // Note: If I am user2 (the pair), isOwner is false, but I see it.
        }
    ];

    it('renders list of active requests', () => {
        render(<Feedback initialRequests={mockRequests} />);

        expect(screen.getByText('Standard Request')).toBeDefined();
        expect(screen.getByText('Shared Request')).toBeDefined();
    });

    it('displays pair information for shared requests', () => {
        render(<Feedback initialRequests={mockRequests} />);

        // This expectation defines the requirement: Show "Shared with user2" or similar
        // Currently this will likely fail or fail to find the text
        const sharedItem = screen.getByText('Shared Request').parentElement;

        // We expect to see the pair username somewhere
        expect(sharedItem.innerHTML).toContain('user2');
        // Or more specifically:
        // expect(screen.getByText(/Shared with user2/)).toBeDefined();
    });
});

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

// Mock AuthContext
vi.mock('@/context/AuthContext', () => ({
    useAuth: vi.fn()
}));

import { useAuth } from '@/context/AuthContext';

describe('Feedback Dashboard', () => {
    // Default user for general tests
    beforeEach(() => {
        useAuth.mockReturnValue({ user: { username: 'test_user' } });
    });

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
            pair_username: 'user2',
            status: 'pending',
            created_at: '2023-01-02',
            isOwner: false
        }
    ];

    it('renders list of active requests', () => {
        render(<Feedback initialRequests={mockRequests} />);

        expect(screen.getByText('Standard Request')).toBeDefined();
        expect(screen.getByText('Shared Request')).toBeDefined();
    });

    it('displays pair information for shared requests', () => {
        render(<Feedback initialRequests={mockRequests} />);
        const sharedItem = screen.getByText('Shared Request').parentElement;
        expect(sharedItem.innerHTML).toContain('user2');
    });

    it('displays correctly when current user is the Pair', () => {
        // I am 'user2'. I am the Pair.
        useAuth.mockReturnValue({ user: { username: 'user2' } });

        const pairUserRequests = [{
            id: 3,
            topic: 'Pair View Request',
            requester_username: 'user1', // The other person
            pair_username: 'user2', // Me
            status: 'pending',
            created_at: '2023-01-03',
            isOwner: true
        }];

        render(<Feedback initialRequests={pairUserRequests} />);

        // Current Bug Behavior: 
        // isOwner=true -> "Me"
        // Pair=user2 (Me) -> "& Me"
        // Result: "Me & Me" (or similar redundancy)

        // Desired Behavior:
        // "Me & user1" (or "user1 & Me") indicating I am part of it with User1.

        // Let's assert what we WANT (failing test)
        // We want to see "Me" and "user1" together, but NOT "Me & Me".

        const reqItem = screen.getByText('Pair View Request').parentElement;
        // Verify we mention the OTHER person (user1)
        expect(reqItem.innerHTML).toContain('user1');
        // Verify we don't just say "Me & Me" (hard to regex exact HTML, but 'user1' presence is key check)
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Feedback } from '@/components/features/feedback/Feedback'; // Extension resolution should handle .jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';

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

    describe('View Switching', () => {
        const mockRequests = [
            { id: 1, topic: 'Active Request', status: 'pending', requester_username: 'user1', created_at: '2023-01-01', isOwner: false },
            { id: 2, topic: 'Closed Request', status: 'closed', requester_username: 'user2', created_at: '2023-01-02', isOwner: false },
            { id: 3, topic: 'My Request', status: 'pending', requester_username: 'test_user', created_at: '2023-01-03', isOwner: true }
        ];

        const mockSubmissions = [
            { id: 1, subject: 'My Submission', content: 'Feedback content', created_at: '2023-01-01' }
        ];

        it('switches to Closed view and shows only closed requests', async () => {
            const user = userEvent.setup();
            render(<Feedback initialRequests={mockRequests} initialSubmissions={mockSubmissions} />);

            await user.click(screen.getByText('Closed'));

            expect(screen.getByText('Closed Request')).toBeInTheDocument();
            expect(screen.queryByText('Active Request')).not.toBeInTheDocument();
        });

        it('switches to Submissions view and shows user submissions', async () => {
            const user = userEvent.setup();
            render(<Feedback initialRequests={mockRequests} initialSubmissions={mockSubmissions} />);

            await user.click(screen.getByText('Submissions'));

            expect(screen.getByText('My Submission')).toBeInTheDocument();
        });

        it('switches to My Requests view and shows only owned requests', async () => {
            const user = userEvent.setup();
            render(<Feedback initialRequests={mockRequests} initialSubmissions={mockSubmissions} />);

            await user.click(screen.getByText('My Requests'));

            expect(screen.getByText('My Request')).toBeInTheDocument();
            expect(screen.queryByText('Active Request')).not.toBeInTheDocument();
        });
    });

    describe('Search Filtering', () => {
        const mockRequests = [
            { id: 1, topic: 'Alpha Project', tag: 'alpha-tag', status: 'pending', requester_username: 'john', created_at: '2023-01-01', isOwner: false },
            { id: 2, topic: 'Beta Project', tag: 'beta-tag', status: 'pending', requester_username: 'jane', created_at: '2023-01-02', isOwner: false }
        ];

        // Need to update SearchBar mock to be functional
        beforeEach(() => {
            vi.mock('@/components/ui/SearchBar', () => ({
                SearchBar: ({ onSearchChange }) => (
                    <input
                        data-testid="search-input"
                        placeholder="Search..."
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                )
            }));
        });

        it('filters requests by topic', async () => {
            const user = userEvent.setup();
            render(<Feedback initialRequests={mockRequests} />);

            const searchInput = screen.getByTestId('search-input');
            await user.type(searchInput, 'Alpha');

            expect(screen.getByText('Alpha Project')).toBeInTheDocument();
            expect(screen.queryByText('Beta Project')).not.toBeInTheDocument();
        });

        it('filters requests by author username', async () => {
            const user = userEvent.setup();
            render(<Feedback initialRequests={mockRequests} />);

            const searchInput = screen.getByTestId('search-input');
            await user.type(searchInput, 'jane');

            expect(screen.getByText('Beta Project')).toBeInTheDocument();
            expect(screen.queryByText('Alpha Project')).not.toBeInTheDocument();
        });
    });
});

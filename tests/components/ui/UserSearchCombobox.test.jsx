import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import UserSearchCombobox from '@/components/ui/UserSearchCombobox';
import * as ClientApi from '@/lib/client-api';

vi.mock('@/lib/client-api', () => ({
    clientFetch: vi.fn(),
}));

describe('UserSearchCombobox', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the search input', () => {
        render(<UserSearchCombobox onSelect={() => { }} />);
        expect(screen.getByPlaceholderText(/search users/i)).toBeInTheDocument();
    });

    it('fetches users when typing', async () => {
        const mockFetch = ClientApi.clientFetch.mockResolvedValue({
            success: true,
            data: [{ id: 1, username: 'test_user' }]
        });

        render(<UserSearchCombobox onSelect={() => { }} />);
        const user = userEvent.setup();
        const input = screen.getByPlaceholderText(/search users/i);

        await user.type(input, 'test');

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(expect.stringMatching(/\/users\/search\?q=test/));
        });
    });

    it('displays search results and allows selection', async () => {
        ClientApi.clientFetch.mockResolvedValue({
            success: true,
            data: [{ id: 1, username: 'found_user' }]
        });

        const handleSelect = vi.fn();
        render(<UserSearchCombobox onSelect={handleSelect} />);
        const user = userEvent.setup();
        const input = screen.getByPlaceholderText(/search users/i);

        await user.type(input, 'found');

        const option = await screen.findByText('found_user');
        await user.click(option);

        expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ username: 'found_user' }));
    });
    it('reopens the dropdown when focusing the input with existing text', async () => {
        ClientApi.clientFetch.mockResolvedValue({
            success: true,
            data: [{ id: 1, username: 'existing_user' }]
        });

        render(<UserSearchCombobox onSelect={() => { }} />);
        const user = userEvent.setup();
        const input = screen.getByPlaceholderText(/search users/i);

        // Type to search
        await user.type(input, 'exist');
        await screen.findByText('existing_user'); // Wait for results

        // Blur (click outside)
        await user.click(document.body);
        await waitFor(() => {
            expect(screen.queryByText('existing_user')).not.toBeInTheDocument();
        });

        // Focus again
        await user.click(input);

        // Should reappear
        await waitFor(() => {
            expect(screen.getByText('existing_user')).toBeInTheDocument();
        });
    });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import toast from 'react-hot-toast';
import CreateRequestForm from '@/components/features/feedback/CreateRequestForm';
import * as AuthContext from '@/context/AuthContext';
import * as ClientApi from '@/lib/client-api';

// Mock dependnecies
vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('react-hot-toast', () => ({
    default: {
        loading: vi.fn(),
        success: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock('@/context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

vi.mock('@/lib/client-api', () => ({
    clientFetch: vi.fn(),
}));

// Mock generic UI components to simplify testing
vi.mock('@/components/ui/Shared', () => ({
    Card: ({ children, className }) => <div className={className}>{children}</div>,
}));

vi.mock('@/components/ui/SimpleToggleSwitch', () => ({
    default: ({ options, activeOption, setActiveOption }) => (
        <div data-testid="toggle-switch">
            {options.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => setActiveOption(opt.id)}
                    data-active={activeOption === opt.id}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    ),
}));

vi.mock('@/components/ui/UserSearchCombobox', () => ({
    default: ({ onSelect, onSearchChange }) => (
        <div>
            <label htmlFor="mock-search-input">Pair Requester</label>
            <input
                id="mock-search-input"
                data-testid="user-search-input"
                onChange={(e) => {
                    if (onSearchChange) onSearchChange(e.target.value);
                }}
            />
            <button
                data-testid="mock-select-user"
                onClick={() => {
                    const val = "pair_user";
                    if (onSelect) onSelect({ username: val });
                    if (onSearchChange) onSearchChange(val);
                }}
            >
                Select User
            </button>
        </div>
    ),
}));

describe('CreateRequestForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        AuthContext.useAuth.mockReturnValue({ refreshNavbarPoints: vi.fn() });
    });

    it('renders the form fields correctly', () => {
        render(<CreateRequestForm />);
        expect(screen.getByLabelText(/topic/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByText(/your unique share tag/i)).toBeInTheDocument();
    });

    it('renders the Pair Requester input field', () => {
        render(<CreateRequestForm />);
        expect(screen.getByLabelText(/pair requester/i)).toBeInTheDocument();
    });

    it('submits the form with pair_username when provided', async () => {
        const mockFetch = ClientApi.clientFetch.mockResolvedValue({
            success: true,
            data: { tag: 'TEST-TAG' }
        });

        render(<CreateRequestForm />);
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/topic/i), 'Test Topic');

        const searchInput = screen.getByTestId('user-search-input');
        await user.type(searchInput, 'pair_user');
        await user.click(screen.getByTestId('mock-select-user'));

        await user.click(screen.getByRole('button', { name: /create request/i }));

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/feedback_requests', expect.objectContaining({
                method: 'POST',
                body: expect.objectContaining({
                    topic: 'Test Topic',
                    pair_username: 'pair_user'
                })
            }));
        });
    });

    it('does not send pair_username if input is empty or whitespace', async () => {
        const mockFetch = ClientApi.clientFetch.mockResolvedValue({ success: true, data: { tag: 'TAG' } });
        render(<CreateRequestForm />);
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/topic/i), 'Test Topic');

        const searchInput = screen.getByTestId('user-search-input');
        await user.type(searchInput, '   ');

        await user.click(screen.getByRole('button', { name: /create request/i }));

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/feedback_requests', expect.objectContaining({
                method: 'POST',
                body: expect.not.objectContaining({
                    pair_username: expect.anything()
                })
            }));
        });
    });

    it('blocks submission if user typed name but did not select from list', async () => {
        const mockFetch = ClientApi.clientFetch;

        render(<CreateRequestForm />);
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/topic/i), 'Test Topic');

        // Type "Ghost" but DO NOT click Select Button
        const searchInput = screen.getByTestId('user-search-input');
        await user.type(searchInput, 'Ghost');

        // Attempt submit
        await user.click(screen.getByRole('button', { name: /create request/i }));

        await waitFor(() => {
            // Check that error toast was shown
            expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/select a valid user/i));
            // Check that API was NOT called
            expect(mockFetch).not.toHaveBeenCalled();
        });
    });

    it('disables the submit button while submitting', async () => {
        ClientApi.clientFetch.mockImplementation(() => new Promise(() => { }));
        render(<CreateRequestForm />);
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/topic/i), 'Test Topic');
        const submitBtn = screen.getByRole('button', { name: /create request/i });

        expect(submitBtn).not.toBeDisabled();
        await user.click(submitBtn);

        expect(submitBtn).toBeDisabled();
        expect(screen.getByText(/submitting/i)).toBeInTheDocument();
    });
});

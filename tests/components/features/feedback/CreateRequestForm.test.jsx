
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
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
        // This test is EXPECTED TO FAIL initially until we implement the UI
        expect(screen.getByLabelText(/pair requester/i)).toBeInTheDocument();
    });

    it('submits the form with pair_username when provided', async () => {
        const mockFetch = ClientApi.clientFetch.mockResolvedValue({
            success: true,
            data: { tag: 'TEST-TAG' }
        });

        render(<CreateRequestForm />);
        const user = userEvent.setup();

        // Fill out standard fields
        await user.type(screen.getByLabelText(/topic/i), 'Test Topic');

        // Fill out Pair Requester (This will fail selection if input doesn't exist)
        const pairInput = screen.getByLabelText(/pair requester/i);
        await user.type(pairInput, 'pair_user');

        // Submit
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
        await user.type(screen.getByLabelText(/pair requester/i), '   '); // Whitespace only

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

    it('disables the submit button while submitting', async () => {
        // Mock fetch to hang so we can check loading state
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

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WaitlistForm from '@/components/WaitlistForm';

global.fetch = jest.fn();

describe('WaitlistForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders email input and submit button', () => {
    render(<WaitlistForm />);
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join waitlist/i })).toBeInTheDocument();
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: async () => ({ success: true }) }), 100))
    );
    render(<WaitlistForm />);
    await user.type(screen.getByPlaceholderText(/your email/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /join waitlist/i }));
    expect(screen.getByRole('button')).toBeDisabled();
    await waitFor(() => expect(screen.queryByText(/you're on the list/i)).toBeInTheDocument());
  });

  it('shows success message after joining', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
    render(<WaitlistForm />);
    await user.type(screen.getByPlaceholderText(/your email/i), 'chris@example.com');
    await user.click(screen.getByRole('button', { name: /join waitlist/i }));
    await waitFor(() =>
      expect(screen.getByText(/you're on the list/i)).toBeInTheDocument()
    );
    expect(screen.queryByPlaceholderText(/your email/i)).not.toBeInTheDocument();
  });

  it('shows "already on the list" on 409', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: async () => ({ error: "You're already on the list!" }),
    });
    render(<WaitlistForm />);
    await user.type(screen.getByPlaceholderText(/your email/i), 'existing@example.com');
    await user.click(screen.getByRole('button', { name: /join waitlist/i }));
    await waitFor(() =>
      expect(screen.getByText(/already on the list/i)).toBeInTheDocument()
    );
  });

  it('shows generic error on failure', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Something went wrong. Please try again.' }),
    });
    render(<WaitlistForm />);
    await user.type(screen.getByPlaceholderText(/your email/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /join waitlist/i }));
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });
});

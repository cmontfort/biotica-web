'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
      } else if (res.status === 409) {
        setStatus('duplicate');
        setErrorMessage(data.error ?? "You're already on the list!");
      } else {
        setStatus('error');
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold text-primary mb-2">You&apos;re on the list! 🎉</p>
        <p className="text-muted-fg">We&apos;ll let you know the moment Biotica launches.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="flex-1 px-4 py-3 rounded-lg bg-surface border border-border text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 rounded-lg bg-primary text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
      </button>
      {(status === 'error' || status === 'duplicate') && (
        <p className="text-sm text-red-400 mt-1 sm:col-span-2">{errorMessage}</p>
      )}
    </form>
  );
}

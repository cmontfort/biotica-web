'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function InvestorContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [firm, setFirm] = useState('');
  const [focus, setFocus] = useState('');
  const [accredited, setAccredited] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState(''); // honeypot — stays empty
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accredited) {
      setStatus('error');
      setErrorMessage('Please confirm your accredited investor status to continue.');
      return;
    }
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, firm, focus, accredited, company_website: companyWebsite }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
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
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <p className="text-2xl font-bold text-primary mb-2">Thanks for the introduction.</p>
        <p className="text-muted-fg">
          We&apos;ll be in touch. In the meantime, feel free to reach us directly at{' '}
          <a href="mailto:legal@biotica.app" className="text-primary hover:underline">
            legal@biotica.app
          </a>
          .
        </p>
      </div>
    );
  }

  const inputCls =
    'w-full px-4 py-3 rounded-lg bg-surface border border-border text-white placeholder-muted focus:outline-none focus:border-primary transition-colors';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {/* Honeypot — hidden from real users, bots tend to fill it. Submissions
          with this field set are silently dropped server-side. */}
      <input
        type="text"
        name="company_website"
        value={companyWebsite}
        onChange={(e) => setCompanyWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className={inputCls}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          className={inputCls}
        />
      </div>
      <input
        type="text"
        value={firm}
        onChange={(e) => setFirm(e.target.value)}
        placeholder="Fund / firm (optional)"
        className={inputCls}
      />
      <textarea
        value={focus}
        onChange={(e) => setFocus(e.target.value)}
        placeholder="Briefly, what's your investment focus? (optional)"
        rows={3}
        className={inputCls + ' resize-none'}
      />
      <label className="flex items-start gap-3 text-sm text-muted-fg cursor-pointer select-none">
        <input
          type="checkbox"
          checked={accredited}
          onChange={(e) => setAccredited(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-primary"
          required
        />
        <span>
          I confirm I am an accredited investor as defined under SEC Rule 501(a) of Regulation D.
        </span>
      </label>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 rounded-lg bg-primary text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap self-start"
      >
        {status === 'loading' ? 'Sending...' : 'Introduce yourself'}
      </button>
      {status === 'error' && <p className="text-sm text-red-400">{errorMessage}</p>}
    </form>
  );
}

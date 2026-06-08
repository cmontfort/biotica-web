import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { sendInvestorConfirmation, sendInvestorNotification } from '@/lib/email';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 200, email: 254, firm: 200, focus: 2000 };

export async function POST(request: Request): Promise<NextResponse> {
  // Rate limit: 5 submissions / minute / IP (code-review 2026-06-08).
  const limit = rateLimit(`connect:${clientIp(request)}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a moment.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, firm, focus, accredited, company_website } = body as {
    name?: string;
    email?: string;
    firm?: string;
    focus?: string;
    accredited?: boolean;
    company_website?: string; // honeypot — must be empty
  };

  // Honeypot: a hidden field real users never see. If a bot fills it, return a
  // benign success without inserting (don't reveal the trap).
  if (company_website && company_website.trim() !== '') {
    return NextResponse.json({ success: true });
  }

  if (!name || !name.trim()) {
    return NextResponse.json({ error: 'Your name is required' }, { status: 400 });
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
  }
  // Accredited-investor self-certification is required to submit (legal-ops
  // 2026-06-08). This is a filtering gate, NOT 506(c) verification — actual
  // verification happens per investor before any offering documents flow.
  if (accredited !== true) {
    return NextResponse.json(
      { error: 'Accredited investor confirmation is required' },
      { status: 400 },
    );
  }

  // Strip CR/LF/NUL before any value can reach an email header (name + firm
  // flow into the Subject; email into Reply-To). Defeats SMTP header injection
  // at the source so every downstream consumer gets clean values. Flagged by
  // code-reviewer + appsec 2026-06-08.
  const stripCtrl = (s: string) => s.replace(/[\r\n\0]/g, ' ');
  const clean = {
    name: stripCtrl(name.trim()).slice(0, MAX.name),
    email: email.toLowerCase().trim().slice(0, MAX.email),
    firm: firm ? stripCtrl(firm.trim()).slice(0, MAX.firm) || null : null,
    focus: focus?.trim().slice(0, MAX.focus) || null,
  };

  const { error } = await supabaseServer.from('investor_contact').insert({
    ...clean,
    accredited_self_certified: true,
  });

  if (error) {
    // Log code + message only — never the raw error object (its details can
    // echo back submitter PII into Vercel logs). code-review 2026-06-08.
    console.error('Investor contact insert error:', error.code, error.message);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  // The lead is saved. Fire the branded confirmation (to submitter) and the
  // internal notification (to legal@) as a side effect — a mail failure must
  // NOT fail the request or lose the lead. Awaited so the serverless function
  // doesn't get frozen mid-send, but each send swallows + logs its own error.
  await Promise.allSettled([
    sendInvestorConfirmation(clean.email, clean.name),
    sendInvestorNotification(clean),
  ]).then((results) => {
    for (const r of results) {
      if (r.status === 'rejected') {
        const reason = r.reason as { message?: string; code?: string } | undefined;
        // Name/message only — never the raw error (can carry recipient PII).
        console.error('[connect] email send failed:', reason?.code ?? '', reason?.message ?? 'unknown');
      }
    }
  });

  return NextResponse.json({ success: true });
}

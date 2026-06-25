import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { sendWaitlistConfirmation } from '@/lib/email';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { email, name } = body as { email?: string; name?: string };

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
  }

  const cleanEmail = email.toLowerCase().trim();

  const { error } = await supabaseServer
    .from('waitlist')
    .insert({ email: cleanEmail, name: name?.trim() ?? null });

  if (error) {
    if (error.code === '23505') {
      // Already on the list. A fresh signup from someone who had unsubscribed is a
      // deliberate re-opt-in — clear the opt-out (db-architect 2026-06-25) and
      // re-send the confirmation. If they were already active, it's a no-op and we
      // tell them so. The unsubscribe token is left unchanged (still valid).
      const { data: reactivated, error: reErr } = await supabaseServer
        .from('waitlist')
        .update({ unsubscribed_at: null, name: name?.trim() ?? null })
        .eq('email', cleanEmail)
        .not('unsubscribed_at', 'is', null)
        .select('id');

      if (reErr) {
        console.error('Waitlist re-opt-in error:', reErr.code, reErr.message);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
      }

      if (reactivated && reactivated.length > 0) {
        await sendWaitlistConfirmation(cleanEmail).catch((e: { code?: string; message?: string }) => {
          console.error('[waitlist] confirmation email failed:', e?.code ?? '', e?.message ?? 'unknown');
        });
        return NextResponse.json({ success: true });
      }

      // Already an active subscriber — nothing to do.
      return NextResponse.json({ error: "You're already on the list!" }, { status: 409 });
    }
    // Code + message only — never the raw error object (can echo submitter PII
    // into Vercel logs). Mirrors the /api/connect logging rule (code-review 2026-06-08).
    console.error('Waitlist insert error:', error.code, error.message);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  // Fresh signup saved. Send the branded confirmation as a side effect — a mail
  // failure must not fail the request or lose the signup; it logs by name only.
  // The `await` is load-bearing: it keeps the serverless function alive until the
  // send settles so it isn't torn down mid-send. Do NOT remove it. (mirrors the
  // Promise.allSettled await in /api/connect.)
  await sendWaitlistConfirmation(cleanEmail).catch((e: { code?: string; message?: string }) => {
    console.error('[waitlist] confirmation email failed:', e?.code ?? '', e?.message ?? 'unknown');
  });

  return NextResponse.json({ success: true });
}

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 200, email: 254, firm: 200, focus: 2000 };

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, firm, focus, accredited } = body as {
    name?: string;
    email?: string;
    firm?: string;
    focus?: string;
    accredited?: boolean;
  };

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

  const { error } = await supabaseServer.from('investor_contact').insert({
    name: name.trim().slice(0, MAX.name),
    email: email.toLowerCase().trim().slice(0, MAX.email),
    firm: firm?.trim().slice(0, MAX.firm) || null,
    focus: focus?.trim().slice(0, MAX.focus) || null,
    accredited_self_certified: true,
  });

  if (error) {
    // Log code + message only — never the raw error object (its details can
    // echo back submitter PII into Vercel logs). code-review 2026-06-08.
    console.error('Investor contact insert error:', error.code, error.message);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

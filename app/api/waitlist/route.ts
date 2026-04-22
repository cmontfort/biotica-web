import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

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

  const { error } = await supabaseServer
    .from('waitlist')
    .insert({ email: email.toLowerCase().trim(), name: name?.trim() ?? null });

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: "You're already on the list!" },
        { status: 409 }
      );
    }
    console.error('Waitlist insert error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

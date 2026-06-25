import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

// One-click / link unsubscribe for waitlist marketing email.
//
// The unsubscribe URL carries an opaque per-row token (waitlist.unsubscribe_token),
// never the email address — no PII in the link or in logs. The update runs on the
// service role; there is intentionally no public RLS UPDATE policy on waitlist
// (the token is the capability; a public policy would be an IDOR surface —
// db-architect 2026-06-25).
//
// GET  -> a person clicked the unsubscribe link; set unsubscribed_at and show a
//         small confirmation page.
// POST -> RFC 8058 one-click (List-Unsubscribe-Post: List-Unsubscribe=One-Click);
//         set unsubscribed_at and return 200 with no body.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Result = 'ok' | 'invalid' | 'error';

async function unsubscribeByToken(token: string | null): Promise<Result> {
  if (!token || !UUID_RE.test(token)) return 'invalid';

  // Set the opt-out only on the first time, so the original timestamp is preserved
  // on repeat clicks. Service-role update, scoped by the capability token.
  const { data, error } = await supabaseServer
    .from('waitlist')
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq('unsubscribe_token', token)
    .is('unsubscribed_at', null)
    .select('id');

  if (error) {
    // Code + message only — never the raw error (can echo data into Vercel logs).
    console.error('[unsubscribe] update error:', error.code, error.message);
    return 'error';
  }
  if (data && data.length > 0) return 'ok'; // newly unsubscribed

  // 0 rows updated: token unknown, or already unsubscribed. Distinguish so an
  // unknown link doesn't falsely claim success.
  const { data: existing, error: lookupError } = await supabaseServer
    .from('waitlist')
    .select('id')
    .eq('unsubscribe_token', token)
    .limit(1);

  if (lookupError) {
    console.error('[unsubscribe] lookup error:', lookupError.code, lookupError.message);
    return 'error';
  }
  return existing && existing.length > 0 ? 'ok' : 'invalid';
}

function page(title: string, body: string, status: number): NextResponse {
  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} — Biotica</title></head>
<body style="margin:0;background:#09090B;color:#FAFAFA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:440px;margin:0 auto;padding:64px 24px;text-align:center;">
    <div style="font-size:22px;font-weight:700;letter-spacing:-0.02em;margin-bottom:24px;">
      <span style="color:#4ADE80;">Bio</span>tica
    </div>
    <p style="font-size:18px;font-weight:600;margin:0 0 12px;">${title}</p>
    <p style="color:#A1A1AA;font-size:15px;line-height:1.6;margin:0;">${body}</p>
  </div>
</body></html>`;
  return new NextResponse(html, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

export async function GET(request: Request): Promise<NextResponse> {
  const token = new URL(request.url).searchParams.get('token');
  const result = await unsubscribeByToken(token);
  if (result === 'ok') {
    return page(
      "You're unsubscribed",
      "You won't receive further Biotica emails. Changed your mind? Just join the waitlist again at biotica.app.",
      200,
    );
  }
  if (result === 'invalid') {
    return page(
      'Link not recognized',
      'This unsubscribe link is not valid or has expired. If you still want to opt out, email privacy@biotica.app and we will remove you.',
      404,
    );
  }
  return page(
    'Something went wrong',
    'We could not process that just now. Please try again, or email privacy@biotica.app and we will remove you.',
    500,
  );
}

// RFC 8058 one-click. The mail client POSTs with body "List-Unsubscribe=One-Click".
// We only need the token from the query string; respond 200 on success.
export async function POST(request: Request): Promise<NextResponse> {
  const token = new URL(request.url).searchParams.get('token');
  // RFC 8058 §3: the one-click endpoint MUST return 200 regardless of outcome so
  // mail clients can treat it as fire-and-forget. The result (including a DB
  // error, which is logged inside unsubscribeByToken) is intentionally ignored
  // for the response.
  await unsubscribeByToken(token);
  return new NextResponse(null, { status: 200 });
}

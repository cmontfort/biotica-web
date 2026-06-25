/**
 * One-off: the 2026-06-25 waitlist re-consent campaign (US-only soft opt-out).
 *
 * DRY RUN by default — prints exactly who would be emailed and renders one sample.
 * Nothing sends until you pass --send.
 *
 *   npx tsx scripts/send-reconsent-campaign.ts            # dry run (safe)
 *   npx tsx scripts/send-reconsent-campaign.ts --sample   # dry run + write one rendered .html to /tmp to eyeball
 *   npx tsx scripts/send-reconsent-campaign.ts --send      # actually send via Resend
 *
 * Recipients: public.waitlist WHERE unsubscribed_at IS NULL (service role).
 * Each message carries a per-recipient one-click unsubscribe URL + List-Unsubscribe
 * header (RFC 8058). No email/PII is printed in full — addresses are masked.
 *
 * Requires (read from .env.local / .env, or the environment):
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  (already used by the app)
 *   RESEND_API_KEY                                        (for --send only)
 *   RESEND_FROM (optional, default "Chris at Biotica <hello@biotica.app>")
 */
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';

// Load Next env files BEFORE importing anything that reads process.env at module
// init (lib/supabase-server). tsx does not auto-load .env.local.
for (const file of ['.env.local', '.env']) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}

const SUBJECT = 'A quick update from the Biotica waitlist';
const FROM = process.env.RESEND_FROM || 'Chris at Biotica <hello@biotica.app>';
const REPLY_TO = process.env.EMAIL_REPLY_TO || 'privacy@biotica.app';
const UNSUB_BASE = 'https://biotica.app/api/unsubscribe';

const htmlTemplate = readFileSync(join(__dirname, '../emails/reconsent-2026-06-25.html'), 'utf8');
const textTemplate = readFileSync(join(__dirname, '../emails/reconsent-2026-06-25.txt'), 'utf8');

function firstName(name: string | null): string {
  const f = (name ?? '').trim().split(/\s+/)[0];
  return f || 'there';
}
function render(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k: string) => {
    if (!(k in vars)) throw new Error(`Template has unknown token {{${k}}}`);
    return vars[k];
  });
}
function maskEmail(e: string): string {
  const [u, d] = e.split('@');
  return `${u.slice(0, 2)}***@${d ?? ''}`;
}

interface Row {
  email: string;
  name: string | null;
  unsubscribe_token: string;
}

async function main(): Promise<void> {
  const args = new Set(process.argv.slice(2));
  const doSend = args.has('--send');

  // --test <email>: send ONE rendered email to a single address, then exit. Does
  // NOT touch the waitlist. Uses Resend's onboarding@resend.dev sender by default,
  // which works BEFORE the biotica.app domain is verified (set RESEND_TEST_FROM to
  // send from the real address once the domain is verified).
  const argv = process.argv.slice(2);
  const testIdx = argv.indexOf('--test');
  const testArg = testIdx >= 0 ? argv[testIdx + 1] : undefined;
  // Treat a missing arg, or the next token being another flag, as "no email".
  const testEmail = testArg && !testArg.startsWith('--') ? testArg : undefined;
  if (testIdx >= 0 && !testEmail) {
    console.error('[campaign] --test requires an email address, e.g. --test you@example.com. Aborting.');
    process.exit(1);
  }
  if (testEmail) {
    if (!process.env.RESEND_API_KEY) {
      console.error('[campaign] RESEND_API_KEY not set — cannot send a test. Aborting.');
      process.exit(1);
    }
    const betaUrl = process.env.BETA_OPTIN_URL || 'https://play.google.com/PLACEHOLDER-set-BETA_OPTIN_URL';
    const testFrom = process.env.RESEND_TEST_FROM || 'Biotica <onboarding@resend.dev>';
    const vars = { first_name: 'Chris', unsubscribe_url: `${UNSUB_BASE}?token=TEST`, beta_url: betaUrl };
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log(`Sending ONE test email to ${maskEmail(testEmail)} from "${testFrom}" ...`);
    const { data: tData, error: tError } = await resend.emails.send({
      from: testFrom,
      to: testEmail,
      replyTo: REPLY_TO,
      subject: `[TEST] ${SUBJECT}`,
      html: render(htmlTemplate, vars),
      text: render(textTemplate, vars),
      headers: {
        'List-Unsubscribe': `<${UNSUB_BASE}?token=TEST>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    });
    if (tError) {
      console.error('[campaign] test send rejected by Resend:', tError.name, '—', tError.message);
      process.exit(1);
    }
    console.log(`[campaign] test email accepted by Resend. id: ${tData?.id ?? '(none)'}`);
    return;
  }

  // Imported dynamically so the env loader above runs first.
  const { supabaseServer } = await import('../lib/supabase-server');

  const { data, error } = await supabaseServer
    .from('waitlist')
    .select('email, name, unsubscribe_token')
    .is('unsubscribed_at', null);

  if (error) {
    console.error('[campaign] waitlist query failed:', error.code, error.message);
    process.exit(1);
  }

  const recipients = (data ?? []) as Row[];
  if (recipients.length === 0) {
    console.log('No active (non-unsubscribed) subscribers. Nothing to send.');
    return;
  }

  // unsubscribe_token is NOT NULL DEFAULT gen_random_uuid(), so this should never
  // fire — but a missing token would mean a broken unsubscribe link in a sent
  // email, so abort loudly before any send rather than ship one.
  const missingToken = recipients.filter((r) => !r.unsubscribe_token);
  if (missingToken.length > 0) {
    console.error(`[campaign] ${missingToken.length} recipient(s) missing an unsubscribe_token — aborting before any send.`);
    process.exit(1);
  }

  // The email carries an Android beta invite. --send requires the live Play
  // closed-track opt-in URL; dry-run uses a visible placeholder so the preview works.
  const betaUrl = process.env.BETA_OPTIN_URL || 'https://play.google.com/PLACEHOLDER-set-BETA_OPTIN_URL';
  if (doSend && !process.env.BETA_OPTIN_URL) {
    console.error('[campaign] BETA_OPTIN_URL not set — the email contains an Android beta invite. Set the Play closed-track opt-in URL before --send. Aborting.');
    process.exit(1);
  }

  const messages = recipients.map((r) => {
    const unsubscribeUrl = `${UNSUB_BASE}?token=${r.unsubscribe_token}`;
    const vars = { first_name: firstName(r.name), unsubscribe_url: unsubscribeUrl, beta_url: betaUrl };
    return {
      from: FROM,
      to: r.email,
      replyTo: REPLY_TO,
      subject: SUBJECT,
      html: render(htmlTemplate, vars),
      text: render(textTemplate, vars),
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    };
  });

  console.log(`Re-consent campaign — ${messages.length} active recipient(s)`);
  console.log(`  Subject: ${SUBJECT}`);
  console.log(`  From:    ${FROM}`);
  console.log(`  Reply:   ${REPLY_TO}`);
  for (const r of recipients) {
    console.log(
      `   - ${maskEmail(r.email)}  (${firstName(r.name)})  unsub token …${String(r.unsubscribe_token).slice(-6)}`,
    );
  }

  if (args.has('--sample')) {
    // Render with a SYNTHETIC recipient so no real address or live token lands in /tmp.
    const sampleHtml = render(htmlTemplate, { first_name: 'there', unsubscribe_url: `${UNSUB_BASE}?token=SAMPLE`, beta_url: betaUrl });
    writeFileSync('/tmp/reconsent-sample.html', sampleHtml);
    console.log(`\n  Wrote a rendered sample (synthetic recipient) to /tmp/reconsent-sample.html. Open it to eyeball.`);
  }

  if (!doSend) {
    console.log('\nDRY RUN — nothing sent. Re-run with --send to send for real.');
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('\nRESEND_API_KEY is not set. Set it (and verify the biotica.app sending domain in Resend) before --send.');
    process.exit(1);
  }

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  let sent = 0;
  let failed = 0;
  for (const m of messages) {
    // Send individually (14 recipients) so each message keeps its own
    // List-Unsubscribe header and we get per-recipient error visibility.
    const { error: sendError } = await resend.emails.send(m);
    if (sendError) {
      // Name + message only; never the recipient address in full.
      console.error(`   send failed for ${maskEmail(m.to)}:`, sendError.name, sendError.message);
      failed += 1;
    } else {
      sent += 1;
    }
  }

  console.log(`\nDone. Sent ${sent}, failed ${failed}, of ${messages.length}.`);
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error('[campaign] fatal:', e instanceof Error ? e.message : String(e));
  process.exit(1);
});

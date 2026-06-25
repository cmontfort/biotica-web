// Transactional email via the existing Google Workspace SMTP relay.
//
// Reuses the same relay + noreply@biotica.app mailbox already wired for the
// app's Supabase Auth emails (smtp-relay.gmail.com:587, "only addresses in my
// domains", require SMTP auth, require TLS; SPF/DKIM/DMARC already on
// biotica.app DNS). No new vendor, no new DNS — just an app password in env.
//
// Node runtime only (nodemailer cannot run on the edge). The /api/connect
// route has no `runtime` export, so it defaults to Node. Do not add
// `export const runtime = 'edge'` to any route that imports this module.

import nodemailer, { type Transporter } from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp-relay.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || 'noreply@biotica.app';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Biotica <noreply@biotica.app>';
const REPLY_TO = process.env.EMAIL_REPLY_TO || 'legal@biotica.app';
const NOTIFY_TO = process.env.INVESTOR_NOTIFY_TO || 'legal@biotica.app';

// Brand tokens (mirror app/globals.css). Inline styles only — email clients
// strip <style> and external CSS.
const BG = '#09090B';
const SURFACE = '#18181B';
const BORDER = '#27272A';
const PRIMARY = '#4ADE80';
const TEXT = '#FAFAFA';
const MUTED = '#A1A1AA';

let cached: Transporter | null = null;

function getTransport(): Transporter | null {
  if (!SMTP_PASSWORD) {
    // No credential configured — caller logs and degrades gracefully. We never
    // want a missing email secret to drop a saved lead.
    return null;
  }
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // STARTTLS on 587
    requireTLS: true,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
  return cached;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function wordmark(): string {
  return `<span style="font-size:22px;font-weight:700;letter-spacing:-0.02em;color:${TEXT};">
      <span style="color:${PRIMARY};">Bio</span>tica<sup style="font-size:11px;color:${MUTED};">&#8482;</sup>
    </span>`;
}

// Per-email footer line (small, muted, centered). Investor emails carry the
// securities non-solicitation disclaimer; the waitlist email carries a normal
// CAN-SPAM-style postal-address line. Passed in so the shell stays generic.
const INVESTOR_FOOTER =
  'Biotica LLC &middot; This message is an acknowledgment of your contact inquiry and does not constitute an offer to sell, nor a solicitation of an offer to buy, any securities.';
const WAITLIST_FOOTER =
  'Biotica LLC &middot; 82 Wendell Ave, Ste 100, Pittsfield, MA 01201 &middot; You are receiving this because you joined the waitlist at biotica.app.';

export function shell(innerHtml: string, footerHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BG};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:${SURFACE};border:1px solid ${BORDER};border-radius:16px;overflow:hidden;">
        <tr><td style="padding:32px 32px 8px 32px;">${wordmark()}</td></tr>
        <tr><td style="padding:8px 32px 32px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${TEXT};font-size:15px;line-height:1.6;">
          ${innerHtml}
        </td></tr>
      </table>
      <p style="max-width:480px;margin:16px auto 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${MUTED};font-size:11px;line-height:1.5;text-align:center;">
        ${footerHtml}
      </p>
    </td></tr>
  </table>
</body></html>`;
}

/**
 * Confirmation sent to the person who submitted the contact form.
 *
 * IMPORTANT (legal-ops 2026-06-08): the page and this email operate under a
 * Reg D 506(b) posture. Copy must be a neutral acknowledgment of an
 * introductory contact. NO offering terms, NO "investment opportunity",
 * "raise", "round", "SAFE", "valuation", or return language. Keep it generic.
 */
export async function sendInvestorConfirmation(toEmail: string, name: string): Promise<void> {
  const transport = getTransport();
  if (!transport) {
    console.error('[email] SMTP not configured — skipping investor confirmation send');
    return;
  }
  // First name only. Compute once, escape for HTML; the plain-text branch uses
  // the unescaped first name (escaping is HTML-specific). code-review 2026-06-08.
  const firstName = name.trim().split(/\s+/)[0] || 'there';
  const safeName = escapeHtml(firstName);
  const inner = `
    <p style="margin:0 0 16px;font-size:18px;font-weight:600;">Thanks for the introduction, ${safeName}.</p>
    <p style="margin:0 0 16px;color:${MUTED};">
      We received your note and someone from Biotica will be in touch. We read every message personally,
      so it may take a few days.
    </p>
    <p style="margin:0;color:${MUTED};">
      If you need to reach us in the meantime, just reply to this email or write to
      <a href="mailto:legal@biotica.app" style="color:${PRIMARY};text-decoration:none;">legal@biotica.app</a>.
    </p>`;
  await transport.sendMail({
    from: EMAIL_FROM,
    to: toEmail,
    replyTo: REPLY_TO,
    subject: 'Thanks for reaching out to Biotica',
    html: shell(inner, INVESTOR_FOOTER),
    text:
      `Thanks for the introduction, ${firstName}.\n\n` +
      `We received your note and someone from Biotica will be in touch. We read every message ` +
      `personally, so it may take a few days.\n\n` +
      `If you need to reach us in the meantime, reply to this email or write to legal@biotica.app.\n\n` +
      `Biotica LLC. This message is an acknowledgment of your contact inquiry and does not constitute ` +
      `an offer to sell, nor a solicitation of an offer to buy, any securities.`,
  });
}

/**
 * Internal notification to legal@ (never CC'd on the submitter's email — a CC
 * would leak the internal address and the submitter's reply-all surface). PII
 * here is fine: the recipient is the internal monitored mailbox.
 */
export async function sendInvestorNotification(submission: {
  name: string;
  email: string;
  firm: string | null;
  focus: string | null;
}): Promise<void> {
  const transport = getTransport();
  if (!transport) {
    console.error('[email] SMTP not configured — skipping investor notification send');
    return;
  }
  const { name, email, firm, focus } = submission;
  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Firm', firm || '—'],
    ['Focus', focus || '—'],
    ['Accredited (self-certified)', 'Yes'],
  ];
  const inner = `
    <p style="margin:0 0 16px;font-size:18px;font-weight:600;">New investor introduction</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
      ${rows
        .map(
          ([k, v]) => `<tr>
        <td style="padding:6px 0;color:${MUTED};vertical-align:top;width:40%;">${escapeHtml(k)}</td>
        <td style="padding:6px 0;color:${TEXT};">${escapeHtml(v)}</td>
      </tr>`,
        )
        .join('')}
    </table>
    <p style="margin:16px 0 0;color:${MUTED};font-size:13px;">
      Submitted via biotica.app/connect. Reply directly to
      <a href="mailto:${escapeHtml(email)}" style="color:${PRIMARY};text-decoration:none;">${escapeHtml(email)}</a>.
    </p>`;
  // Subject is truncated so a failed-send error (which can surface the subject
  // in Vercel's log stream) carries minimal PII; full details live in the body
  // for the intended recipient. privacy LOGS-1 2026-06-08.
  const subjName = name.slice(0, 50);
  const subjFirm = firm ? ` (${firm.slice(0, 40)})` : '';
  await transport.sendMail({
    from: EMAIL_FROM,
    to: NOTIFY_TO,
    replyTo: email,
    subject: `New investor intro — ${subjName}${subjFirm}`,
    html: shell(inner, INVESTOR_FOOTER),
    text:
      `New investor introduction (via biotica.app/connect)\n\n` +
      rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
      `\n\nReply directly to ${email}.`,
  });
}

/**
 * Confirmation sent to someone who joins the launch waitlist. Consumer/
 * marketing voice (not the formal investor tone). The waitlist form collects
 * email only, so there's no name to personalize. This is a transactional
 * confirmation of the user's own signup action; the footer carries the postal
 * address per CAN-SPAM good practice.
 */
export async function sendWaitlistConfirmation(toEmail: string): Promise<void> {
  const transport = getTransport();
  if (!transport) {
    console.error('[email] SMTP not configured — skipping waitlist confirmation send');
    return;
  }
  const inner = `
    <p style="margin:0 0 16px;font-size:18px;font-weight:600;">You're on the list.</p>
    <p style="margin:0 0 16px;color:${MUTED};">
      Thanks for joining the Biotica waitlist. You'll get an email the moment we launch on Android,
      plus occasional updates as we ship new features and integrations.
    </p>
    <p style="margin:0 0 16px;color:${MUTED};">
      We won't flood your inbox. Every email we send includes an unsubscribe link, and you can
      opt out anytime by replying to any message or writing to
      <a href="mailto:privacy@biotica.app" style="color:${PRIMARY};text-decoration:none;">privacy@biotica.app</a>.
    </p>
    <p style="margin:0;color:${MUTED};font-size:13px;">
      Questions? Reply to this email or reach us at
      <a href="mailto:privacy@biotica.app" style="color:${PRIMARY};text-decoration:none;">privacy@biotica.app</a>.
    </p>`;
  await transport.sendMail({
    from: EMAIL_FROM,
    to: toEmail,
    replyTo: REPLY_TO,
    headers: {
      // One-click unsubscribe header so mail clients surface an Unsubscribe
      // affordance; the body also offers reply-to-unsubscribe. (privacy 2026-06-25)
      'List-Unsubscribe': '<mailto:privacy@biotica.app?subject=unsubscribe>',
    },
    subject: "You're on the list.",
    html: shell(inner, WAITLIST_FOOTER),
    text:
      `You're on the list.\n\n` +
      `Thanks for joining the Biotica waitlist. You'll get an email the moment we launch on ` +
      `Android, plus occasional updates as we ship new features and integrations.\n\n` +
      `We won't flood your inbox. Every email includes an unsubscribe link, and you can ` +
      `opt out anytime by replying to any message or writing to privacy@biotica.app.\n\n` +
      `Questions? Reply to this email or reach us at privacy@biotica.app.\n\n` +
      `Biotica LLC. 82 Wendell Ave, Ste 100, Pittsfield, MA 01201. You are receiving this because ` +
      `you joined the waitlist at biotica.app.`,
  });
}

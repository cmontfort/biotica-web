import type { Metadata } from 'next';
import InvestorContactForm from '@/components/InvestorContactForm';

// noindex per legal-ops 2026-06-08: a publicly-indexed investor-contact page
// widens the "general solicitation" surface area. Keep the URL reachable but
// out of search indexes. Also excluded in app/robots.ts.
export const metadata: Metadata = {
  title: 'Get in touch — Biotica',
  description: 'Introduce yourself to the Biotica team.',
  robots: { index: false, follow: false },
};

export default function ConnectPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm font-semibold tracking-widest text-primary mb-3">CONNECT</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">Get in touch</h1>
        <p className="text-muted-fg text-lg mb-6">
          Biotica is the operating layer for serious self-optimizers — AI coaching grounded in
          your biometrics, supplements, training, and labs. We&apos;re a founder-built, pre-launch
          company heading toward an Android release in 2026.
        </p>
        <p className="text-muted-fg text-lg mb-12">
          We occasionally speak with investors and partners aligned with what we&apos;re building.
          If that describes you, introduce yourself below.
        </p>

        {/* Legal disclaimer — verbatim per legal-ops 2026-06-08. Must render
            above the form. Do NOT add raise terms, valuation, SAFE language,
            or any "invest now" call to action anywhere on this page. */}
        <div className="rounded-xl border border-border bg-surface/60 p-6 mb-10 text-sm text-muted-fg leading-relaxed">
          <p className="font-semibold text-white mb-2">Important Notice</p>
          <p>
            This page is for informational purposes only. Nothing on this page constitutes an offer
            to sell or a solicitation of an offer to buy any security. Biotica LLC has not authorized
            any such offer and is not currently conducting a securities offering. Any future offering
            of securities by Biotica LLC will be made only pursuant to a confidential offering
            memorandum or term sheet delivered directly to prospective investors who have confirmed
            their accredited investor status, and only in compliance with applicable federal and
            state securities laws. Expressions of interest submitted here are non-binding and do not
            create any obligation on the part of Biotica LLC or any prospective investor. By
            submitting your information, you represent that you are an accredited investor as defined
            under Rule 501 of Regulation D under the Securities Act of 1933. Biotica LLC does not
            accept expressions of interest from individuals who are not accredited investors.
          </p>
        </div>

        <InvestorContactForm />

        <p className="mt-10 text-sm text-muted-fg">
          Prefer email? Reach us at{' '}
          <a href="mailto:legal@biotica.app" className="text-primary hover:underline">
            legal@biotica.app
          </a>
          .
        </p>
      </div>
    </main>
  );
}

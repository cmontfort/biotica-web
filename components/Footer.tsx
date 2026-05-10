import Link from 'next/link';

// Brand social handles surfaced in the footer per launch-window
// 2026-05-10. Personal handles are intentionally NOT linked from the
// brand site — they live on Chris's personal LinkedIn profile only,
// keeping the brand voice and the founder voice on separate surfaces.
const SOCIAL_LINKS = [
  {
    label: 'Biotica on LinkedIn',
    href: 'https://www.linkedin.com/company/biotica-app/',
    // LinkedIn rounded-square mark, monochrome, inherits currentColor.
    // Path from Simple Icons; viewBox 0 0 24 24.
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
  {
    label: 'Biotica on X',
    href: 'https://x.com/biotica_app',
    // X (post-Twitter rebrand) glyph, monochrome.
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-fg">
        <div className="text-center sm:text-left">
          <p>© {new Date().getFullYear()} Biotica LLC. All rights reserved.</p>
          <p className="text-xs mt-1">82 Wendell Ave, Ste 100, Pittsfield, MA 01201</p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <a href="mailto:support@biotica.app" className="hover:text-white transition-colors">
            Contact
          </a>
          <div className="flex items-center gap-3" aria-label="Social media links">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                // rel="noopener noreferrer" — required on every external
                // target=_blank link to prevent reverse-tabnabbing
                // (tab-window handle leak) + Referer leak. Caught in the
                // launch-readiness sweep; ship as the default pattern.
                rel="noopener noreferrer"
                aria-label={s.label}
                className="hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Biotica trademark"
        >
          <Image src="/logo.png" alt="" width={36} height={36} className="rounded-lg" />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">Bio</span>tica
            {/* USPTO trademark application 99848523 filed 2026-05-28 via
                Gerben Perrott PLLC. ™ until registration; becomes ® on
                grant (est. late 2026 / early 2027). aria-hidden on the
                glyph + composed aria-label on the parent Link so screen
                readers announce "Biotica trademark" as one phrase. */}
            <sup
              aria-hidden="true"
              className="text-[0.55em] align-super ml-0.5 text-muted-fg"
            >
              ™
            </sup>
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted-fg">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          {/* Root-relative anchor so the button works from /privacy and /terms
              too. Same-page `#waitlist` (the prior value) was a no-op on every
              page except `/` because those pages have no #waitlist section.
              `/#waitlist` navigates to the home page and scrolls to the
              section. (2026-05-27, reported by Chris.) */}
          <a
            href="/#waitlist"
            className="px-4 py-2 rounded-lg bg-primary text-background font-semibold hover:opacity-90 transition-opacity text-sm"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </nav>
  );
}

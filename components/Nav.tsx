import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-primary">Bio</span>tica
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted-fg">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <a
            href="#waitlist"
            className="px-4 py-2 rounded-lg bg-primary text-background font-semibold hover:opacity-90 transition-opacity text-sm"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </nav>
  );
}

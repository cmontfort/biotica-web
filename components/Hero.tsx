export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Coming soon badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        Android launch 2026
      </div>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-3xl leading-tight">
        Train with data.{' '}
        <span className="text-primary">Recover with purpose.</span>
      </h1>

      <p className="mt-6 text-lg sm:text-xl text-muted-fg max-w-2xl leading-relaxed">
        Biotica connects your Oura Ring, Withings scale, and Android Health data to build
        AI-powered workout programs that adapt to how you actually feel — not just what
        the program says.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
        <a
          href="#waitlist"
          className="px-8 py-4 rounded-xl bg-primary text-background text-lg font-bold hover:opacity-90 transition-opacity"
        >
          Join the Waitlist
        </a>
        <a
          href="#features"
          className="px-8 py-4 rounded-xl border border-border text-muted-fg hover:text-white hover:border-white/30 transition-colors text-lg"
        >
          See what&apos;s inside
        </a>
      </div>
    </section>
  );
}

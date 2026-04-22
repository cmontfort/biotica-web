import Hero from '@/components/Hero';
import Features from '@/components/Features';
import WaitlistForm from '@/components/WaitlistForm';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />

      {/* Waitlist section */}
      <section id="waitlist" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Be first when we launch
          </h2>
          <p className="text-muted-fg text-lg mb-10">
            Join the waitlist for early access. Android launch in 2026.
            <br />
            <span className="text-sm">iOS coming soon after.</span>
          </p>
          <WaitlistForm />
          <p className="mt-4 text-xs text-muted-fg">
            No spam. Unsubscribe any time. Your data is never sold.
          </p>
        </div>
      </section>
    </>
  );
}

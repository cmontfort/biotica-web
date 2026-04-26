const features = [
  {
    icon: '📊',
    title: 'Biometric Sync',
    description:
      'Oura Ring sleep & HRV, Withings body composition, Android Health Connect steps and active calories — all pulled automatically.',
  },
  {
    icon: '🏋️',
    title: 'AI Workout Programming',
    description:
      "Claude-powered programs that read your readiness score and adjust your training load. Push hard when you're recovered. Back off when you're not.",
  },
  {
    icon: '💊',
    title: 'Supplement Tracking',
    description:
      'Log your stack, time your doses around training, and correlate protocol changes with your sleep and recovery metrics.',
  },
  {
    icon: '🧠',
    title: 'Performance Coaching',
    description:
      'Ask your AI coach anything. "Why am I tired today?" "Should I deload?" Answers grounded in your actual biometric data — not generic advice.',
  },
];

const upcoming = [
  {
    icon: '🧪',
    title: 'Lab tests + analysis',
    description:
      'Order at-home blood panels and feed your coach the missing piece — testosterone, lipids, micronutrients, and metabolic markers, all interpreted in context.',
  },
  {
    icon: '⌚',
    title: 'More integrations',
    description:
      'Apple Health (iOS), Whoop, Strava, and Garmin coming next. The goal: one Biotica connection covers every wearable and tracker you already use.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything your body generates,{' '}
            <span className="text-primary">finally connected</span>
          </h2>
          <p className="mt-4 text-muted-fg text-lg max-w-xl mx-auto">
            Stop switching between apps. Biotica is the platform where all your
            performance data lives, talks to each other, and actually informs your training.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-colors"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-fg leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold">
            <span className="text-primary">Coming next.</span>
          </h3>
          <p className="mt-3 text-muted-fg max-w-xl mx-auto">
            On the roadmap and shipping in the months ahead.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {upcoming.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-surface border border-dashed border-primary/30"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{f.icon}</div>
                <span className="text-xs font-medium text-primary tracking-wider">SOON</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-fg leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Biotica',
};

export default function Privacy() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-20 prose prose-invert prose-zinc">
      <h1>Privacy Policy</h1>
      <p className="text-muted-fg text-sm">Last updated: July 5, 2026</p>

      <p>
        Biotica LLC, a Massachusetts limited liability company (&quot;Biotica&trade;,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;), is committed to protecting your privacy. This Privacy Policy explains what
        information we collect, how we use it, and your choices. By using Biotica, you agree to this
        policy.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>Account Information</h3>
      <p>
        When you register, we collect your email address and, optionally, your name. If you sign up via
        a third-party provider, we receive basic profile information from that provider.
      </p>

      <h3>Health and Biometric Data</h3>
      <p>When you connect third-party integrations, we collect and store:</p>
      <ul>
        <li><strong>Sleep data</strong> — sleep score, HRV, readiness score, resting heart rate, sleep stages (from Oura Ring)</li>
        <li><strong>Body composition</strong> — weight, body fat percentage, muscle mass, hydration (from Withings)</li>
        <li><strong>Activity data (Android Health Connect)</strong> — steps, active calories from Android Health Connect</li>
        <li><strong>Apple Health data (iOS)</strong> — workouts and activity energy from Apple Health, and any data other apps (such as Whoop, Garmin, Peloton, or Strava) have written to Apple Health on your device. Apple Health is an aggregator: connecting it shares with Biotica data that those third-party apps wrote to Apple Health directly, even though Biotica has no direct relationship with those apps. Biotica reads from Apple Health only and never writes back to it.</li>
        <li><strong>Workout data</strong> — exercises, sets, reps, weights logged within the App</li>
        <li><strong>Supplement data</strong> — supplement names, dosages, frequency, timing schedules, and per-dose adherence records you log manually, as well as on-hand inventory quantities, reorder thresholds, and stock-tracking records if you use the supplement inventory feature</li>
      </ul>

      <h3>Usage Data</h3>
      <p>
        We automatically collect information about how you use Biotica, including features accessed,
        time spent, and crash reports. This data is used to improve the App.
      </p>

      <h3>Device Information</h3>
      <p>
        We collect device identifiers, operating system version, and app version for diagnostics and
        compatibility purposes.
      </p>

      <h3>Feedback You Submit</h3>
      <p>
        When you send feedback or a bug report through the App, we collect the message you write, along
        with your app version and device platform, so we can respond and fix the issue. We delete this
        with your account.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and operate the Biotica service, including syncing your biometric data</li>
        <li>Generate personalized AI-powered workout programs and performance insights</li>
        <li>Provide AI coaching responses — your biometric data is included in prompts sent to Anthropic&apos;s API. See Section 3 for detail on what is sent.</li>
        <li>Track your supplement protocol and correlate it with your biometric trends</li>
        <li>Send transactional emails (account verification, password reset, account activity notifications)</li>
        <li>Send product-update emails — launch announcements and occasional updates about new features, integrations, and improvements. We send these only with your consent, and you can unsubscribe at any time from any email we send. See the Communications section below.</li>
        <li>Improve and debug the App through aggregated, anonymized analytics</li>
        <li>Comply with legal obligations</li>
      </ul>
      <p>
        <strong>We do not sell your personal or health data to third parties.</strong> We do not use
        your health data for advertising purposes.
      </p>

      <h3>Communications and Marketing Emails</h3>
      <p>
        If you join our waitlist or otherwise provide your email address, you are consenting to receive
        our launch announcement and occasional product-update emails about Biotica features,
        integrations, and improvements. The lawful basis for this processing is your consent. We use
        Google Workspace to deliver email from noreply@biotica.app; Google receives your email address
        for the sole purpose of delivering messages we send. See{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.
        Every marketing or product-update email we send includes an unsubscribe link. You can
        also opt out at any time by emailing{' '}
        <a href="mailto:privacy@biotica.app">privacy@biotica.app</a>. Unsubscribing does not affect
        transactional emails related to your account (verification, password reset, account activity).
      </p>

      <h2>3. Third-Party Services</h2>
      <p>Biotica integrates with the following third-party services when you choose to connect them:</p>
      <ul>
        <li><strong>Oura Ring</strong> — sleep, HRV, and readiness data via Oura Cloud API. Governed by <a href="https://ouraring.com/privacy-policy" target="_blank" rel="noopener noreferrer">Oura&apos;s Privacy Policy</a>.</li>
        <li><strong>Withings</strong> — body composition data via Withings Health API. Governed by <a href="https://www.withings.com/us/en/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Withings&apos; Privacy Policy</a>.</li>
        <li><strong>Android Health Connect</strong> — steps and activity data from Android Health Connect. When you connect Health Connect, this data is synced to Biotica&apos;s servers. Biotica does not send any of your data to Google.</li>
        <li><strong>Apple Health (iOS)</strong> — workouts, activity energy, and, in future updates, additional health categories (sleep, heart metrics, body composition) from Apple Health via Apple HealthKit. Apple Health is an aggregator: it may contain data written by other apps on your device. When you connect Apple Health, Biotica reads whatever data you authorize; it does not write back to Apple Health. Governed by <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple&apos;s Privacy Policy</a>.</li>
      </ul>
      <p>We also use the following infrastructure providers:</p>
      <ul>
        <li><strong>Supabase</strong> — database and authentication provider. Data is stored in US-based data centers. See <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase Privacy Policy</a>.</li>
        <li><strong>RevenueCat</strong> — subscription and billing management. See <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer">RevenueCat Privacy Policy</a>.</li>
        <li>
          <strong>Anthropic (Claude API)</strong> — powers AI coaching features. When you use the AI coach
          (including the coaching Q&amp;A and AI workout programming), we send a prompt to Anthropic&apos;s API
          that includes: your sleep score, HRV, readiness score, resting heart rate, body weight, body fat
          percentage, lean mass, step count, active calories, daily calorie intake and protein intake,
          supplement names, dosages, adherence records
          (whether each supplement was taken on each due night), and regimen schedule labels, recent workout
          history (exercises, sets, reps, weights), and your coaching question along with recent conversation
          history. Anthropic processes this prompt and returns a response. Anthropic does not use your data
          to train their models. Per Anthropic&apos;s standard API terms, prompts and responses may be retained
          by Anthropic for up to 30 days for safety monitoring and abuse prevention, after which they are
          deleted. The text of each AI coach output is stored in your Biotica account as part of your
          coaching history. We also retain a snapshot of the health data used to generate each coaching
          output (such as your readiness, sleep, and biometric values at the time of the response) for up
          to 90 days, so that we can review and improve the quality of AI coaching over time. See{' '}
          <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">Anthropic Privacy Policy</a>.
        </li>
      </ul>

      <h2>4. Data Storage and Security</h2>
      <p>
        Your data is stored in Supabase&apos;s PostgreSQL database with row-level security enforced — your data
        is only accessible to your authenticated account. All data is encrypted in transit (TLS) and at rest.
        OAuth tokens for third-party integrations are stored in your account record and never shared with
        other users.
      </p>
      <p>
        No security system is perfect. We encourage you to use a strong, unique password and enable
        two-factor authentication where available.
      </p>

      <h2>5. Health Data</h2>
      <p>
        Biotica treats health and biometric data with the highest level of care. We do not:
      </p>
      <ul>
        <li>Sell your health data</li>
        <li>Share your health data with insurers, employers, or marketers</li>
        <li>Use your health data to build advertising profiles</li>
        <li>Use your individually identifiable health data to train AI models without your explicit consent</li>
      </ul>
      <p>
        If you connect Apple Health on iOS, the data Biotica reads may include health and fitness data
        that other apps (such as Whoop, Garmin, Peloton, or Strava) originally wrote to Apple Health.
        Biotica applies the same protections to that data as it does to all other health data collected
        through the App. Biotica reads from Apple Health only; it does not write any data back.
      </p>
      <p>
        <strong>Biotica is not a HIPAA-covered entity and does not provide healthcare services.</strong> The
        App is a personal fitness and wellness tool. Please do not use Biotica as a substitute for
        professional medical care.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain your data as long as your account is active. If you delete your account, we will delete
        your personal data and biometric records within 30 days, except where we are required to retain it
        for legal or compliance reasons. Anonymized, aggregated data that cannot identify you may be
        retained indefinitely.
      </p>

      <h2 id="data-deletion">7. Your Rights and Choices</h2>
      <p>You have the right to:</p>
      <ul>
        <li>
          <strong>Access</strong> your account data from Biotica&apos;s systems — to request a copy, tap{' '}
          <em>Settings → Export My Data</em> in the App, which opens a pre-filled email to{' '}
          <a href="mailto:privacy@biotica.app">privacy@biotica.app</a>. We will fulfill your request by
          email within 30 days. Subscription and purchase records held by Apple App Store, Google Play, or
          RevenueCat are available directly from those services through your platform account settings.
        </li>
        <li><strong>Correct</strong> inaccurate data through the App settings</li>
        <li><strong>Delete</strong> your account and all associated data (Settings → Delete Account)</li>
        <li><strong>Disconnect</strong> third-party integrations at any time (Settings → Connected Integrations)</li>
        <li><strong>Opt out</strong> of non-essential communications by updating notification preferences in the App, or unsubscribe from marketing and product-update emails at any time using the unsubscribe link in any email we send or by contacting <a href="mailto:privacy@biotica.app">privacy@biotica.app</a></li>
      </ul>
      <p>
        California residents have additional rights under the CCPA, including the right to know what personal
        information is collected, the right to delete, and the right to opt out of sale (we do not sell
        personal information). To exercise these rights, contact us at{' '}
        <a href="mailto:privacy@biotica.app">privacy@biotica.app</a>.
      </p>

      <h2>8. Children&apos;s Privacy</h2>
      <p>
        Biotica is not directed to children under 18. We do not knowingly collect personal information
        from children under 18. If you believe we have collected information from a child, please contact
        us immediately at privacy@biotica.app.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of material changes by
        posting the new policy in the App or on this page with a revised &quot;Last updated&quot; date. Continued
        use of Biotica after changes take effect constitutes acceptance of the revised policy.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions, concerns, or requests related to your privacy? Contact us at{' '}
        <a href="mailto:privacy@biotica.app">privacy@biotica.app</a>, or by mail:
      </p>
      <p>
        Biotica LLC<br />
        82 Wendell Ave, Ste 100<br />
        Pittsfield, MA 01201<br />
        United States
      </p>
    </article>
  );
}

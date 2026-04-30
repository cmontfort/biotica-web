import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Biotica',
};

export default function Privacy() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-20 prose prose-invert prose-zinc">
      <h1>Privacy Policy</h1>
      <p className="text-muted-fg text-sm">Last updated: April 30, 2026</p>

      <p>
        Biotica LLC, a Massachusetts limited liability company (&quot;Biotica,&quot; &quot;we,&quot; &quot;us,&quot; or
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
        <li><strong>Activity data</strong> — steps, active calories (from Android Health Connect)</li>
        <li><strong>Workout data</strong> — exercises, sets, reps, weights logged within the App</li>
        <li><strong>Supplement data</strong> — supplement names, dosages, and timing you log manually</li>
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

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and operate the Biotica service, including syncing your biometric data</li>
        <li>Generate personalized AI-powered workout programs and performance insights</li>
        <li>Track your supplement protocol and correlate it with your biometric trends</li>
        <li>Send transactional emails (account verification, password reset)</li>
        <li>Improve and debug the App through aggregated, anonymized analytics</li>
        <li>Comply with legal obligations</li>
      </ul>
      <p>
        <strong>We do not sell your personal or health data to third parties.</strong> We do not use
        your health data for advertising purposes.
      </p>

      <h2>3. Third-Party Services</h2>
      <p>Biotica integrates with the following third-party services when you choose to connect them:</p>
      <ul>
        <li><strong>Oura Ring</strong> — sleep, HRV, and readiness data via Oura Cloud API. Governed by <a href="https://ouraring.com/privacy-policy" target="_blank" rel="noopener noreferrer">Oura&apos;s Privacy Policy</a>.</li>
        <li><strong>Withings</strong> — body composition data via Withings Health API. Governed by <a href="https://www.withings.com/us/en/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Withings&apos; Privacy Policy</a>.</li>
        <li><strong>Android Health Connect</strong> — steps and activity data stored locally on your Android device. No data is sent to Google through Biotica.</li>
      </ul>
      <p>We also use the following infrastructure providers:</p>
      <ul>
        <li><strong>Supabase</strong> — database and authentication provider. Data is stored in US-based data centers. See <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase Privacy Policy</a>.</li>
        <li><strong>RevenueCat</strong> — subscription and billing management. See <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer">RevenueCat Privacy Policy</a>.</li>
        <li><strong>Anthropic (Claude API)</strong> — powers AI coaching features. Prompts include your biometric data. Anthropic does not use API data for model training. See <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">Anthropic Privacy Policy</a>.</li>
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

      <h2>7. Your Rights and Choices</h2>
      <p>You have the right to:</p>
      <ul>
        <li><strong>Access</strong> your personal data through the App (Settings → Export My Data)</li>
        <li><strong>Correct</strong> inaccurate data through the App settings</li>
        <li><strong>Delete</strong> your account and all associated data (Settings → Delete Account)</li>
        <li><strong>Disconnect</strong> third-party integrations at any time (Settings → Connected Integrations)</li>
        <li><strong>Opt out</strong> of non-essential communications by updating notification preferences</li>
      </ul>
      <p>
        California residents have additional rights under the CCPA, including the right to know what personal
        information is collected, the right to delete, and the right to opt out of sale (we do not sell
        personal information). To exercise these rights, contact us at privacy@biotica.app.
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
        <a href="mailto:privacy@biotica.app">privacy@biotica.app</a>.
      </p>
    </article>
  );
}

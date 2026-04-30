import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Biotica',
};

export default function Terms() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-20 prose prose-invert prose-zinc">
      <h1>Terms of Service</h1>
      <p className="text-muted-fg text-sm">Last updated: April 30, 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By downloading, installing, or using the Biotica mobile application (&quot;App&quot;) or visiting biotica.app
        (&quot;Website&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to
        these Terms, do not use Biotica. These Terms constitute a binding legal agreement between you and
        Biotica LLC, a Massachusetts limited liability company (&quot;Biotica,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;).
      </p>

      <h2>2. Description of Service</h2>
      <p>
        Biotica is a personal health and fitness platform that aggregates biometric data from third-party wearable
        devices and health services, provides AI-powered workout programming, supplement tracking, and performance
        coaching features. Biotica is currently available on Android and is not yet available on iOS.
      </p>

      <h2>3. Eligibility</h2>
      <p>
        You must be at least 18 years old to use Biotica. By using the App, you represent that you are 18 or older
        and have the legal capacity to enter into this agreement. Biotica is not available to persons who have been
        previously suspended or removed from the service.
      </p>

      <h2>4. Account Registration</h2>
      <p>
        You must create an account to use most features of Biotica. You agree to provide accurate and complete
        information during registration and to keep your account credentials secure. You are responsible for all
        activity that occurs under your account. Notify us immediately at support@biotica.app if you suspect
        unauthorized access.
      </p>

      <h2>5. Subscriptions and Billing</h2>
      <p>
        Biotica offers a free tier and paid subscription plans (&quot;Starter,&quot; &quot;Pro,&quot; and &quot;Elite&quot;). Paid
        subscriptions are billed on a monthly recurring basis through the Google Play Store. All billing is
        handled by our payment processor, RevenueCat, and Google Play. Prices are displayed in the App and
        are subject to change with notice. Subscriptions automatically renew unless cancelled before the
        renewal date. Refunds are subject to Google Play&apos;s refund policy.
      </p>
      <p>
        By subscribing, you authorize recurring charges to your Google Play payment method. You may cancel at
        any time through the Google Play Store; cancellation takes effect at the end of the current billing period.
      </p>

      <h2>6. Health Information Disclaimer</h2>
      <p>
        <strong>
          Biotica is not a medical device, medical service, or healthcare provider. The information,
          recommendations, and coaching provided by Biotica — including AI-generated workout programs,
          supplement suggestions, and performance insights — are for informational and fitness purposes only
          and do not constitute medical advice, diagnosis, or treatment.
        </strong>
      </p>
      <p>
        Always consult a qualified healthcare professional before starting any new exercise program,
        supplement regimen, or making changes to your health routine. Do not disregard professional medical
        advice because of something you have read in Biotica. Biotica does not assume any liability for
        actions taken based on information provided through the App.
      </p>

      <h2>7. Third-Party Integrations</h2>
      <p>
        Biotica integrates with third-party services including Oura Ring, Withings, and Android Health Connect
        (collectively, &quot;Third-Party Services&quot;). Your use of these services is governed by their respective
        terms and privacy policies. Biotica is not responsible for the availability, accuracy, or practices of
        Third-Party Services. You authorize Biotica to access and retrieve data from Third-Party Services on
        your behalf as needed to provide the features you enable.
      </p>

      <h2>8. User Data and Privacy</h2>
      <p>
        Your privacy is important to us. Our collection and use of your personal and health data is described
        in our <a href="/privacy">Privacy Policy</a>, which is incorporated into these Terms by reference.
        You retain ownership of your personal data. Biotica processes your data solely to provide and improve
        the Service.
      </p>

      <h2>9. Prohibited Uses</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use Biotica for any unlawful purpose or in violation of any applicable laws</li>
        <li>Attempt to reverse engineer, decompile, or extract the source code of the App</li>
        <li>Use automated tools to scrape, access, or collect data from Biotica</li>
        <li>Impersonate another person or create accounts under false pretenses</li>
        <li>Interfere with or disrupt the servers, networks, or infrastructure supporting Biotica</li>
        <li>Share your account credentials with others</li>
        <li>Use Biotica to harass, abuse, or harm others</li>
      </ul>

      <h2>10. Intellectual Property</h2>
      <p>
        All content, features, and functionality of Biotica — including but not limited to software, text,
        graphics, logos, and AI-generated content — are owned by or licensed to Biotica and are protected by
        copyright, trademark, and other intellectual property laws. You may not copy, reproduce, distribute,
        or create derivative works from any part of Biotica without our express written permission.
      </p>
      <p>
        You grant Biotica a limited, non-exclusive license to use your data (including biometric data you
        connect) solely to provide and improve the Service as described in our Privacy Policy.
      </p>

      <h2>11. Disclaimers</h2>
      <p>
        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
        PURPOSE, OR NON-INFRINGEMENT. BIOTICA DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
        ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
      </p>

      <h2>12. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, BIOTICA AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS
        SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
        INCLUDING BUT NOT LIMITED TO LOSS OF DATA, PERSONAL INJURY, OR PROPERTY DAMAGE, ARISING OUT OF OR
        RELATED TO YOUR USE OF THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL
        LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT
        YOU PAID TO BIOTICA IN THE 12 MONTHS PRECEDING THE CLAIM, OR $50, WHICHEVER IS GREATER.
      </p>

      <h2>13. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless Biotica and its officers, directors, employees,
        and agents from and against any claims, liabilities, damages, losses, and expenses (including
        reasonable legal fees) arising from your use of the Service, your violation of these Terms, or your
        violation of any rights of a third party.
      </p>

      <h2>14. Termination</h2>
      <p>
        We may suspend or terminate your account at any time for violation of these Terms or for any other
        reason at our sole discretion. You may delete your account at any time through the App settings.
        Upon termination, your right to use the Service ceases immediately. Sections 6, 10, 11, 12, 13, and
        15 survive termination.
      </p>

      <h2>15. Changes to Terms</h2>
      <p>
        We may update these Terms from time to time. We will notify you of material changes by posting the
        new Terms in the App or on this page with a revised &quot;Last updated&quot; date. Continued use of Biotica
        after changes take effect constitutes acceptance of the revised Terms.
      </p>

      <h2>16. Governing Law</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of the Commonwealth of
        Massachusetts, without regard to its conflict of law provisions. Any disputes arising under these
        Terms shall be resolved exclusively in the state or federal courts located in Norfolk County,
        Massachusetts.
      </p>

      <h2>17. Contact</h2>
      <p>
        Questions about these Terms? Contact us at{' '}
        <a href="mailto:legal@biotica.app">legal@biotica.app</a>, or by mail:
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

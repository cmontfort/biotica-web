# Garmin Connect Developer Program — Access Request Form Draft

Generated: 2026-05-11

---

## Track-fit call

**URL Chris pointed at:** https://www.garmin.com/en-US/health/solutions/gym-and-fitness/

**Assessment: WRONG TRACK. Do not file under Gym and Fitness.**

The Gym and Fitness solution is Garmin's B2B offering for gym operators and enterprise fitness businesses. It targets operators who want to deploy Garmin devices to their members or embed Garmin vitals dashboards into their gym management software. Biotica is a consumer app that pulls user-consented health data via OAuth. That is a completely different relationship.

**Correct entry point: Garmin Connect Developer Program**

- Program page: https://developers.garmin.com/gc-developer-program/ (ECONNREFUSED on fetch — check browser directly)
- Access request form: https://www.garmin.com/en-US/forms/GarminConnectDeveloperAccess/
- This is the program the backlog memo already references. It provides API access to health and activity data for third-party apps via OAuth 2.0 PKCE, which is exactly what Biotica needs.

The Garmin developer landscape has two relevant programs:

| Program | What it is | Right for Biotica? |
|---|---|---|
| Garmin Connect Developer Program | OAuth pull of user health + activity data for consumer apps | YES |
| Garmin Health SDKs | BLE/SDK layer for controlling wearables directly from a native app | No — Biotica doesn't need device control |
| Gym and Fitness (Garmin Health for Business) | Enterprise B2B deployment of Garmin devices in gym facilities | No |

File the access request at: https://www.garmin.com/en-US/forms/GarminConnectDeveloperAccess/

---

## Form field drafts

### Use case (200-350 words)

Biotica (biotica.app) is requesting read-only access to the Garmin Connect Developer Program to sync activity and wellness data for users who wear Garmin devices.

The integration need is specific. Biotica already pulls data from Oura Ring (sleep, readiness, daily activity), Withings (body measurements), and Android Health Connect (steps, active calories). All three use server-side OAuth token storage with a Supabase Edge Function proxy layer — tokens never touch the client. Garmin would follow the same architecture: user-initiated OAuth authorization, tokens stored per user in a Supabase Postgres database, pull requests routed through Edge Functions, no client-side token exposure.

The data Biotica wants to consume from Garmin Connect:

- Activity logs (workout type, duration, distance, calories)
- VO2max estimates
- Training load and training status
- HRV (daily) and resting heart rate
- Sleep data (for users who use Garmin as their primary sleep tracker rather than Oura)

All of this is read-only. Biotica has no write-back requirement. There is no intent to post activities to Garmin Connect, no intent to modify user data, and no resale of user data to third parties.

Why Garmin specifically: a meaningful segment of the target user base (serious strength and endurance athletes, late-30s to 50s) wears a Garmin as their primary device. Right now those users connect Biotica but get partial data coverage. Adding Garmin closes the gap and means the AI coaching context is complete regardless of which device the user wears.

Android launch is set for June 8, 2026. iOS follows June 29. Garmin integration would ship post-launch as a V1.1 update once the base install is established. The integration is scoped and estimated (1-4 week build per internal planning). The LLC is formed (Biotica LLC, April 2026, DUNS #145012120), the developer accounts exist (Apple Developer, Google Play), and the backend infrastructure is production-grade.

Reference: biotica.app and the Biotica LinkedIn company page.

---

### Company description (1-2 sentences)

Biotica is a biometric-driven coaching app for serious fitness optimizers. It pulls data from Oura Ring, Withings, and Android Health Connect, then uses Claude (Anthropic) to generate AI workout programs, answer training questions, and surface coaching insights grounded in the user's actual biometric data.

---

### Expected user volume / scale

Waitlist is active at biotica.app. V1.0 targets approximately 600 users at Android launch (June 8, 2026), growing through iOS launch (June 29, 2026). Garmin integration would go live as a V1.1 update. Garmin API usage would scale proportionally to the Garmin-device-owning subset of the user base — estimated 20-30% of the initial install base based on the target audience profile.

---

### Integration approach

OAuth 2.0 PKCE. User authorizes in-app via a WebView or system browser redirect. Access and refresh tokens stored server-side in Supabase Postgres (row-level security, per-user isolation). All Garmin API calls proxied through Supabase Edge Functions (Deno runtime) — no Garmin credentials or user tokens on the client. Webhook receiver (push model, preferred) or scheduled pull as fallback. Same architecture currently in production for Oura and Withings integrations.

---

## Notes before Chris submits

1. The correct form URL is https://www.garmin.com/en-US/forms/GarminConnectDeveloperAccess/ -- not the Gym and Fitness track.
2. DUNS is confirmed (#145012120 per `backlog_legal_entity.md`). Have it ready if the form asks for it.
3. Apple Developer and Google Play accounts are in flight -- the form may ask for app store URLs. The app is pre-launch, so note "launching June 2026" and provide biotica.app as the product URL.
4. The beat-to-beat HRV enhancement carries a license fee per the backlog memo -- do not request it in V1. The daily HRV summary is sufficient.
5. Garmin's stated turnaround is approximately 2 business days for an initial decision, then 1-4 weeks to integration. Filing now puts the integration squarely in the V1.1 window.

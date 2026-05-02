# Biotica Roadmap — Marketing-Relevant Slice

A curated subset of the project memory, scoped for what marketing copy needs to know.
Not the same as the engineering backlog (which lives in `~/.claude/projects/-Users-cmont-projects-biotica/memory/MEMORY.md`).

**Re-sync this doc whenever a workstream ships, gets re-prioritized, or a feature
moves between sections below.** Then re-upload to the Claude.ai marketing project
(Knowledge → replace `roadmap.md`).

Last synced: 2026-05-02

---

## Shipped — last 30 days (use for launch posts)

Most recent first. Each is fair game for an "X is now live" post or a deeper
build-log thread.

| Date | Feature | One-line |
|---|---|---|
| 2026-05-02 | **WS4 — AI Workout Programming** | Claude generates training programs that adapt to your readiness, phase, and equipment. 250+ tests, three edge functions. |
| 2026-04-29 | Auth email pipeline | Workspace SMTP + 5 branded templates. Real users now get branded HTML from `noreply@biotica.app`. |
| 2026-04-29 | Coach quota counter persistence | Quota badge shows used/remaining + reset date on every focus, not just after asking. |
| 2026-04-29 | **Biotica LLC formed** | MA single-member LLC, EIN on file. Unblocks app-store enrollment, Junction labs, Stripe live, Whoop/Strava commercial APIs. |
| 2026-04-26 | **WS3 — Supplement Tracking** | Log your stack, time doses around training, surface Rx warnings, feed adherence to the coach. |
| 2026-04-25 | **WS2 — AI Coaching Q&A** | Ask the coach anything. Free 5/wk, Pro 30/wk, Elite unlimited. Grounded in your Oura + Withings + nutrition data. |
| 2026-04-25 | Lean Body Mass on body card + trend page | LBM is the load-bearing metric in a building phase. Total weight is noisy. |
| 2026-04-25 | Weight trend page | 7D / 30D / 6MO / 1Y charts with phase-aware summary, hover tooltip, monthly x-axis labels. |
| 2026-04-25 | Step goal tiering (Free, user-editable) | Free users set their own daily target. Pro/Elite half pending coach pipeline. |
| 2026-04-25 | Dashboard history | Scroll back through previous days via DateNavigator. Lookback floor = your account creation date. |
| 2026-04-25 | Manual weigh-in + back-fill | Bottom sheet to log weight + body fat for any past day. |
| 2026-04-25 | Branding pass | Themed 404, branded favicon, PWA install icons, Biotica title. |

---

## Active workstreams (in flight, not yet teasable)

These exist publicly only insofar as the broader narrative includes them.
Don't pre-announce dates.

- **Apple Developer enrollment + DUNS** — gated on Robinhood OBA L1+L2 sign-off. Critical-path long-pole for iOS launch.
- **Stripe production billing** — gated on the same OBA approval.
- **Trademark application (USPTO Class 9 + 42)** — Gerben drafted, USPTO submission held pending OBA.
- **Photos card hookup** — placeholder card on dashboard already shipped; storage + AI-vision pipeline is WS9 spec stage.

---

## Coming next — 30-60 days (teaser-worthy)

Fair game for "coming soon" posts, waitlist drives, build-in-public threads.
Use the SOON badge logic from Features.tsx — concrete enough to mention,
not so committed that a slip kills credibility.

- **🧪 Junction lab integration (Labs tab)** — at-home blood panels, results
  auto-import, AI coach reads biomarkers in context. Pro perk: 6 months of Pro per panel (proposed v1, A/B test queued).
- **Apple Health integration (iOS)** — counterpart to Health Connect; aggregates Garmin / Whoop / Strava / Peloton via HealthKit.
- **Whoop integration** — direct OAuth pull of recovery, strain, sleep, HRV.
- **Strava integration** — cardio activity logs (runs, rides, swims).
- **Notifications bell + center** — in-app announcement surface so feature launches reach users without email.
- **iOS launch** — post-Apple-Developer enrollment.

---

## Long-horizon backlog (mention only if asked)

Known on the roadmap. Don't tease — these don't have a near-term ship date and
shouldn't anchor the audience's expectations.

- Garmin integration (now unblocked by LLC, in queue behind Whoop/Strava)
- MFP replacement (Cronometer / Nutritionix / first-party tracking)
- Historical Withings/Oura backfill beyond the current 30-day cap
- C-Corp flip (only if VC conversation triggers)

---

## Recently retired — don't promote

Features we removed or talked about that should NOT appear in marketing copy:

- **MyFitnessPal integration** — removed. The MFP API is dead and Cloudflare blocks scraping. Replacement (WS6) is on the long-horizon backlog.
- **"Garmin coming soon" placeholder in settings** — removed. Garmin is real but on the long-horizon backlog; promoting it before there's a near-term ship date erodes trust.

---

## Internal — never publish

These exist in the engineering memory for a reason. They are not for marketing copy
under any circumstance:

- Security audit findings (open items, severity counts, mitigations in flight)
- Specific A/B test designs (variant arms, success metrics, decision rules)
- Three-discipline rule for Supabase auth-lock workarounds (engineering hygiene, not user-facing)
- Robinhood OBA disclosure status (employer-confidential)
- Subagent operational constraints (purely internal tooling)
- Detailed tier-margin math (panel margins, Pro subsidy figures)
- Vendor wholesale pricing (Junction, Anthropic API spend, Workspace cost)
- Feature subscription counts before announcement (e.g. "X people are on the labs waitlist") — only post these once they're load-bearing for the launch story

If a draft references any of these, push back on it. Don't ship.

---

## Sync workflow

When something material changes (a workstream ships, a date moves, a feature
gets cut):

1. Edit this file.
2. `git -C ~/projects/biotica-web add docs/marketing/roadmap.md && git commit -m "docs(marketing): roadmap sync — <what changed>"`
3. Open the Claude.ai marketing project → **Knowledge** → find `roadmap.md` → **Replace**.

Cadence target: weekly minor sync, immediate sync on any feature ship.

When Phase 2 (the `.claude/skills/marketing/` skill) lands, the skill can read
`MEMORY.md` directly and this curated doc may become a slimmer "marketing
positioning" overlay rather than a full roadmap restatement.

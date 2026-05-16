# Biotica Social Launch — Setup Log

Operational log tracking the work to spin up Biotica's social presence.
Companion to `roadmap.md`, `voice-examples.md`, `biotica-brand.md` in the
marketing project knowledge.

Last updated: 2026-05-16 (Reddit organic drop logged; X May 10 post telemetry corrected to actual numbers; LinkedIn second post analytics added; channel-activity log section added; u/Biotica_App Reddit account added; brand vs personal Reddit strategy documented; warm-up period defined)

---

## Channel-activity log

Running log of organic channel actions, drops, and results. Append entries; do not delete.

| Date | Channel | Action | Context | Result |
|---|---|---|---|---|
| 2026-05-10 | X (@biotica_app) | First post — origin story / coach problem-statement | Brand-new account, warm-up phase. "I've logged 365+ workouts. Dropped over 45 lbs in 2 years..." | 10 impressions (per X native analytics; LinkedIn export shows 28 on 05/10 which is a different post — see note below), 2 engagements, 1 detail expand, 1 profile visit, 0 likes/RT/replies |
| 2026-05-10 | LinkedIn (personal) | Post — "Why we built Biotica" product origin post | Second LinkedIn post. "The tools to track training, sleep, and body comp seriously already exist. They just don't talk to each other..." | 64 impressions (all followers), 3 clicks, 4.7% CTR, 0 reactions, 0 comments |
| 2026-05-15 | Reddit (r/ClaudeAI) | Organic URL drop as @monohybrid | Thread: OP -LabRecon built LabRecon.io (lab price comparison + plain-English lab analysis). Reply killermonkey84 explicitly described building a personal app that tracks supplements, sleep data, and uploads lab PDFs. Chris replied "Sounds like https://biotica.app" — non-promotional, single sentence. | 2 upvotes as of 2026-05-15. No replies yet. Thread URL: https://www.reddit.com/r/ClaudeAI/comments/1tcftws/comment/om2ky4a/ |

**Note on X telemetry discrepancy:** The LinkedIn analytics export filename (`biotica-app_content_*.xls`) is mislabeled — the sheet headers say "LinkedIn" and the data is LinkedIn's aggregated metrics view. Actual X numbers for the May 10 post per X native analytics: 10 impressions / 2 engagements (consistent with the warm-up phase interpretation — follower-only reach).

### Reddit monitoring list

Threads to watch for replies. If OP or other commenters engage, respond non-promotionally.

| Thread | Subreddit | Watch for | Response approach |
|---|---|---|---|
| https://www.reddit.com/r/ClaudeAI/comments/1tcftws/ | r/ClaudeAI | Reply from -LabRecon or killermonkey84 asking what Biotica does | One sentence: map one specific feature to what they described. Lab uploads + correlations across supplements + sleep. No feature list. No CTA. |

### Reddit account strategy: u/monohybrid vs u/Biotica_App

Two accounts, two jobs. Do not mix the playbooks.

**u/monohybrid (Chris personal) — organic drop + thread presence**

Continues as the primary active Reddit surface. Uses the "unpromoted recommendation drop" playbook below. The personal account has history, karma, and credibility. This is where the organic URL drops live. Cold drops in vendor-skeptical communities (r/Biohackers, r/QuantifiedSelf, r/Supplements, r/ClaudeAI) only work from an account that reads as a real user, not a brand handle.

**u/Biotica_App (brand) — identity claim + future support surface**

Different use cases entirely:
- Responding to direct questions when someone explicitly asks about the app or tags it by name
- Hosting any future AMA in a community that has invited it
- Responding to support-shaped reports in subs where someone explicitly mentions Biotica
- Owning posts in r/Biotica or a dedicated sub if one is created later

NOT for cold drops in r/Biohackers, r/QuantifiedSelf, or similar. Brand handles in vendor-skeptical communities trigger self-promo flags from mods and downvotes from users. The organic trust that makes the u/monohybrid drops work evaporates the moment there is a brand handle on the post.

**Warm-up period: 30-day minimum before u/Biotica_App is useful**

Account is 0 days old with 0 karma as of 2026-05-16. Most major subreddits auto-filter or auto-remove posts from accounts under 30 days old and/or below a karma floor (typically 10-50 comment karma depending on the sub). Even genuine comments from the account will likely get caught in mod queues.

Recommended warm-up approach:
- Let the account age. No forced activity.
- If genuine comments arise in threads directly about Biotica, they are acceptable — but do not chase karma through off-topic commenting to inflate the number artificially. Mods pattern-match that.
- Do not post any biotica.app links from u/Biotica_App before the 30-day mark (earliest useful date: 2026-06-15).
- Do not post from u/Biotica_App in any sub before 30 days. The natural-drop playbook stays on u/monohybrid.

Earliest the brand account becomes a meaningful surface: late June, and only for the specific use cases above.

### The "unpromoted recommendation drop" playbook

Pattern that has surfaced twice this week: someone publicly describes the multi-source-tracking pain, Chris (or biotica account) drops the URL in a single sentence that reads as one user recommending to another, not as a founder promoting.

Conditions for a valid drop:
- The person's post explicitly describes a problem Biotica solves (multi-source correlation, holding data in your head, fragmented apps)
- Chris's account has prior history in that community or thread (not a drive-by)
- The reply is one sentence max, no marketing language, no feature list, no CTA
- The URL is the only signal — let the landing page do the selling

When this works it lands 2-5 upvotes and earns a reply asking "what does it do?" That follow-up is the real opportunity — one specific feature answer, not a pitch.

---

## Waitlist conversion funnel diagnosis — 2026-05-11

**Trigger:** LinkedIn post (May 10) — 3,268 impressions / 2,039 reached / 77 profile visits / 0 waitlist signups.

### Layer-by-layer funnel audit

| Layer | Finding | Severity |
|---|---|---|
| Post contained a CTA / link | No link, no CTA. Post ends "Building in public from here." — no URL, no "join the waitlist at biotica.app." | Root cause |
| LinkedIn profile links to biotica.app | Unknown — not confirmed. 77 people visited Chris's profile and found no next step in the post itself. Whether the profile bio has a link is unverified. | Verify |
| biotica.app landing page exists | Yes — Next.js app deployed at biotica.app. Hero has a "Join the Waitlist" CTA that anchors to a waitlist section. | OK |
| Waitlist form functional | Partially. WaitlistForm posts to `/api/waitlist` which writes to Supabase `waitlist` table using `supabaseServer`. BUT: `.env.local` only has `SUPABASE_SERVICE_ROLE_KEY` and `NEXT_PUBLIC_SUPABASE_URL` — `NEXT_PUBLIC_SUPABASE_ANON_KEY` is MISSING from the env file. `supabase-server` may still work (uses service role), but this is an untested production path. | Verify |
| Supabase `waitlist` table exists | Assumed yes — the route would 500 on every insert if it didn't, which would be a known breakage. Confirm by checking table count. | Verify |
| Where Chris checks signups | No analytics instrumentation noted anywhere. "Doesnt look like we got any" implies Chris is eyeballing it, not querying a count. No email notification on signup. | Gap |

### Root cause (confirmed)

The LinkedIn post had no link and no CTA. The draft (`docs/marketing/2026-05-10/founder-origin-intro.md`) explicitly notes: "No biotica.app link in the thread — that goes in the May 12 pinned tweet per warm-up plan." That logic made sense for the X warm-up sequence (don't post links before day 4). It does NOT apply to LinkedIn, where the warm-up constraints don't exist and the audience is already warm.

77 people read the post, wanted to know more, visited Chris's profile, and found no actionable next step in the post itself. Whether the profile bio has a link is the remaining unknown. If it does, some of those 77 should have converted — which would suggest the landing page or form has a problem. If it doesn't, the leak is entirely in the post + profile layer.

### What to check (Chris hands-on items)

1. Does Chris's LinkedIn profile bio contain a link to biotica.app? If not, add it — takes 2 min.
2. Run this Supabase query to confirm the table exists and check signup count: `select count(*) from waitlist;`
3. Confirm biotica.app is live and the form submits end-to-end. Test with a throwaway email. Watch for a 500 (missing anon key) vs a success state.

### Fix for the next LinkedIn post

Add a CTA line. LinkedIn warm-up constraints don't apply — link from day one. One line at the end: "Android beta coming. biotica.app — join the waitlist."

This is not a copy problem. The post itself performed well (77 profile visits from a cold account is strong). The funnel just had no bottom.

---

## Status snapshot

| Channel | Status | Handle |
|---|---|---|
| X / Twitter | Profile set up, warm-up in progress. First post live May 10. | `@biotica_app` |
| Instagram | Both attempts banned — `biotica.app` (5/7) + `biotica_app` (5/8) | both burned |
| LinkedIn | Chris's personal account posted May 10 (origin-story post) — 3,268 impressions, 69 reactions, 6 comments. Biotica brand page not yet created. | @chrismontfort (personal) |
| Facebook Page | Not started — critical-path for IG recovery | TBD |
| Threads | Not started | TBD |
| Reddit (brand) | Created 2026-05-16. Age: 0 days. Karma: 0. No posts. Warm-up only — see strategy below. | u/Biotica_App |
| Reddit (personal) | Active. Organic drop playbook live. See channel-activity log. | u/monohybrid |

Headline: X is the priority channel for brand. LinkedIn personal (Chris's account) is producing real reach right now — 3,268 impressions on May 10 post. A Biotica company page on LinkedIn is worth setting up once X is rolling, but Chris's personal account is already a functioning marketing surface.

---

## Email setup

Brand-account email: `social@biotica.app`, configured as an alias to
`chris@biotica.app` in Workspace.

Rationale:
- Role-based address (not personal), so the account is portable if ownership
  changes later.
- Inbox-receiving (not `noreply@`), so platform verification, password resets,
  and security alerts actually arrive.
- Aliased to `chris@` so there's only one inbox to monitor.

Hardening checklist:
- [x] 2FA enabled on the underlying Workspace account, authenticator app
  (not SMS)
- [x] Backup codes saved in 1Password
- [x] Password not reused for any social account password

---

## Instagram

### What happened

1. Registered IG account as `biotica.app` on May 7.
2. IG auto-disabled the account on first session, citing "Community Standards"
   without specifics.
3. Submitted in-app appeal. Denied within ~25 minutes with a final-notice
   message ("you cannot request another review").
4. Started a second attempt with handle `biotica_app` (May 8 morning) to
   match the X handle.
5. **Second account ALSO banned** (May 8 evening). Same automated-disable
   pattern. Confirms direct-registration is not viable for this brand
   on Meta's current heuristics.

### Why this happened (best guess)

Meta's automated systems flag new accounts as "ban evasion" or impersonation
when:
- New email + new IP + brand-name handle are all claimed in the first session
- Fresh Meta account with no Facebook history registers a `.app`-style brand
  handle
- The appeal video selfie can't be matched against an existing Meta identity

This is almost certainly NOT something Chris actually did wrong. It's the
algorithm being aggressive about brand-name handles on day-one accounts.

### Recovery paths (now active — second attempt also banned)

1. Meta Verified Business ($21.99/mo) for direct human support
2. **Create FB Business Page from Chris's personal Facebook, register IG via
   Meta Business Suite** (accounts created through Business Manager flow rarely
   get auto-flagged) — **recommended path**
3. Wait ~30 days for handle to release, register fresh from a different device

### Decision (pending — Chris call when refreshed)

Both direct-registration attempts burned. Recommended path: **Path 2 (Meta Business Suite)**. Reasoning:
- Cheapest ($0 vs Path 1's $22/mo)
- Highest historical success rate for branded handles
- Builds the FB Business Page anyway, which is required for Meta ads later
- Side benefit: unblocks Threads (also through Meta Business Suite)

Path timing: NOT urgent for V1.0 launch. X is the priority channel; IG is a "we should have it" but not launch-blocking. Schedule for when there's a clean 30-min focused block. Suggested: this week if energy permits, otherwise after Sprint 1 closes (2026-05-15).

If Path 2 also fails: Path 1 (Meta Verified) is the escape hatch — pay the $22 for direct human support, escalate.

---

## X / Twitter

### Account details

| Field | Value |
|---|---|
| Display name | Biotica |
| Handle | @biotica_app |
| Bio | "Train with data. Recover with purpose. AI coaching grounded in your actual biometrics, not generic advice. biotica.app" |
| Category | Mobile Application |
| Email | social@biotica.app |
| Profile photo | Biotica B mark with heartbeat (set) |
| Header | Uploaded |
| Location | Not set (intentional — brand accounts often skip) |
| Birth date | Set to private |

### Hardening checklist

- [x] 2FA enabled (authenticator app, not SMS)
- [x] Backup codes saved in 1Password
- [x] "Password reset protect" enabled in Settings → Security
- [x] DM filter set to verified accounts or accounts you follow only
- [x] Photo tagging restricted to people you follow

### What's pending

- Complete the last 2 follows (@misraetel, @function) — still pending as of May 11
- See updated warm-up strategy below

---

## LinkedIn post analytics

### May 10 — "Why we built Biotica" (product origin post, "All posts" tab)

Post excerpt: "Why we built Biotica: The tools to track training, sleep, and body comp seriously already exist. They just don't talk to each other..."

| Metric | Value |
|---|---|
| Impressions (all followers) | 64 |
| Clicks | 3 |
| CTR | 4.7% |
| Reactions | 0 |
| Comments | 0 |
| Reposts | 0 |
| Follows gained | 0 |

Note: this is a lower-performing post than the April 20 post. No audience breakdown available in the export for this one.

### April 20 — origin/product post (individual post analytics export)

Post URL: https://www.linkedin.com/feed/update/urn:li:share:7452042820581982208
Posted: Apr 20, 2026 at 5:17 PM

| Metric | Value |
|---|---|
| Impressions | 1,494 |
| Members reached | 888 |
| Profile viewers from this post | 24 |
| Followers gained | 0 |
| Reactions | 26 |
| Comments | 1 |
| Reposts | 0 |
| Saves | 1 |
| Sends on LinkedIn | 2 |

**Top audience segments:**
- Seniority: Senior 36%, Manager 15%, Director 14%, CXO 5%
- Company: Robinhood 13%, Google 4%, AMD 3%
- Industry: IT Services 29%, Financial Services 12%, Tech/Internet 10%, Software Dev 5%
- Location: SF Bay Area 17%, NYC Metro 11%, Greater Boston 9%
- Top job title: Program Manager 3%, Technical Program Manager 2%, Software Engineer 2%

**Interpretation:** The April 20 post reached a highly professional tech/finance audience. Senior/Manager/Director/CXO combined = 65% of audience. Robinhood being 13% of company reach confirms this is Chris's work network amplifying, not cold Biotica audience. 24 profile visitors, 0 followers gained = same missing-CTA problem as the May 10 post diagnosed in the funnel audit above.

---

## X warm-up plan

The account hit the follow rate limit on May 8 evening, which means X is
already paying close attention to it. Plan adjusted to be slightly more
conservative than originally proposed.

### Original schedule (executed through May 10)

| Day | Action | Result |
|---|---|---|
| May 9 | Finish last 2 follows (@misraetel, @function). Like 5-10 things. NO POSTING. | Rate-limit still in effect; follows not confirmed complete |
| May 10 | First non-link tweet. Origin-story / coach problem-statement. | Posted. See telemetry below. |
| May 11 | Second non-link tweet. Reply to 1-2 accounts. | Upcoming |
| May 12 | Pinned tweet WITH link. Pin it. | Upcoming — status under review (see recommendation) |

### May 10 post telemetry (actual numbers)

Post: "I've logged 365+ workouts. Dropped over 45 lbs in 2 years..." (origin-story / coach problem-statement)

| Metric | Value |
|---|---|
| Impressions | 10 |
| Engagements | 2 |
| Detail expands | 1 |
| Profile visits | 1 |
| Likes | 0 |
| Reposts | 0 |
| Replies | 0 |

**Interpretation:** These are follower-only numbers. The account has no organic reach yet — 10 impressions means it surfaced to a small set of followers/connections and was algorithmically invisible outside that set. This is expected for a brand-new account with 0 followers posting into the void. It does NOT indicate a shadowban; a shadowban would show 0 impressions. The impressions are likely the accounts @biotica_app follows who saw it in their feed.

**What the numbers do NOT tell us:** whether the warm-up is working (too early, 1 post, no followers). The warm-up's job is to establish account legitimacy before the link post, not to generate reach at this stage.

### Strategy update (2026-05-11) — reply-first pivot

See full analysis in social-launch.md strategic notes below. Bottom line: the path from "0 followers, cold account" to "launch-ready channel" on a 7-week timeline runs through replies, not broadcast posts. Shift the cadence to reply-heavy until there is a visible follower base, then layer in standalone posts.

| Period | Priority action | Cadence |
|---|---|---|
| May 11 – May 18 | Replies on @PeterAttiaMD, @hubermanlab, @BioLayne, @JeffNippard threads | 3-5 substantive replies/day |
| May 11 – May 18 | Build-in-public replies on @levelsio, @marc_louvion threads | 1-2/day |
| May 12 | Pinned tweet with link (proceed per original plan) | 1 post |
| May 12 – ongoing | Standalone posts: 3-4/week max | Short-form, build-log, data observations |
| May 18 review | Check follower count and impression delta | Adjust cadence |

Posting the link before day 4 (May 12) still holds — no change to that gate.

**Do NOT boost the May 10 post.** $0 expected return at this follower count. Paid reach on a zero-follower account buys low-quality impressions from accounts that will never convert.

---

## Pinned tweet drafts (X)

All 5 variants retained for now. Pick before posting on May 12.

### Single tweet — V1 (the morning ritual, narrative)

> Two years of mornings doing this in my head: Oura readiness against
> Withings weight against MFP calories, looking for the pattern.
>
> I got tired of being the integration layer.
>
> So I built Biotica. Reads everything you track as one signal. Android beta now.
>
> biotica.app

### Single tweet — V2 (seven apps, blunt)

> Optimization stack was seven apps deep. None of them talked to each other.
>
> So I built the one I wished existed. Biotica reads Oura, Withings, and
> Health Connect as one signal. AI coach tells you what your data actually means.
>
> Solo dev. Android beta. biotica.app

### Single tweet — V3 (the morning audit, personal data list)

> I weigh in on Withings every morning. Wear an Oura ring. Track macros.
> Lift four days a week.
>
> The data was everywhere. The signal wasn't.
>
> Biotica is the app I built so I'd stop holding it all in my head.
> Android beta now. biotica.app

### Thread — V1 (broken morning routine)

> 1/ I built Biotica because my morning routine was broken.
>
> Wear Oura. Weigh in on Withings. Track macros in MyFitnessPal. Lift four
> days a week with my program in SupraHuman. Log supplements separately.
>
> Every morning, manually correlated. For two years.

> 2/ Did high readiness mean push hard? Only if weight wasn't up from training
> stress and sleep was actually deep, not just long. Was the deficit working?
> Couldn't tell without cross-checking weight trend against macros against volume.
>
> I was the integration layer.

> 3/ After two years of running that model in my head every morning, I realized
> I was rebuilding the same logic from scratch daily.
>
> The app I wanted didn't exist. So I started writing it. As a personal tool.

> 4/ Six months later it's:
>
> AI coach grounded in your actual data. Workout programming that adapts to
> readiness. Supplement tracking with Rx warnings. Lean mass tracking that
> cuts through weight noise.
>
> Solo dev. Biotica LLC formed last week.

> 5/ If you already track your body and you're holding the correlations in
> your head, Biotica is for you.
>
> Android beta now. Junction lab integration coming. Apple Health, Whoop,
> Strava on the way. iOS once Apple Developer enrollment clears.
>
> biotica.app

### Thread — V2 (logging vs reading)

> 1/ Most fitness apps log things. Biotica reads them.
>
> Logging tells you what happened. Reading tells you what to do about it.
>
> That distinction is why I built it. 🧵

> 2/ My setup was seven apps deep. Oura, Withings, MyFitnessPal, SupraHuman,
> supplements, calendar, notes.
>
> Each one logged its slice perfectly. None of them read across the slices.
> The reading was happening in my head, at 6am, for two years.

> 3/ Examples of what reading looks like:
>
> Readiness drops three days running while volume is high. Under-recovering, deload.
>
> Weight up 2lb but lean mass up 0.5lb. Recomp working, stay the course.
>
> Supplement adherence drops on travel days. Context, not character flaw.

> 4/ None of those insights require a doctor. They require an app that holds
> all the data and a coach that knows what to look at.
>
> That's Biotica. AI coach grounded in your Oura, Withings, Health Connect,
> supplement log, and training data. Solo built.

> 5/ Android beta now. Junction lab integration in the next 60 days. Apple
> Health, Whoop, Strava on the way.
>
> If you're holding correlations in your head, this is for you.
>
> biotica.app

---

## Accounts to follow (X)

Followed during May 8 warm-up. Hit rate limit before completing the last 2.

### Health science / performance
- [x] @PeterAttiaMD (Peter Attia)
- [x] @hubermanlab (Andrew Huberman)
- [x] @BioLayne (Layne Norton)
- [x] @JeffNippard (Jeff Nippard)
- [ ] @misraetel (Mike Israetel) — pending, rate-limited

### Peer brands
- [x] @ouraring (Oura)
- [x] @WHOOP (Whoop)
- [x] @withings (Withings)
- [x] @levels (correct handle, found on retry)
- [x] @eightsleep (Eight Sleep)

### Indie dev / build-in-public
- [x] @levelsio (Pieter Levels)
- [x] @marc_louvion (Marc Lou)
- [x] @dvassallo (Daniel Vassallo)
- [x] @tdinh_me (Tony Dinh)

### AI / tech
- [x] @AnthropicAI (Anthropic)
- [x] @claudeai (Claude)

### Adjacent / longevity
- [ ] @function (Function Health) — pending, rate-limited

Total: 15 followed, 2 pending.

---

## Assets

### X header

- Filename: `biotica_x_header.png`
- Dimensions: 3000x1000 (2x retina, displays at 1500x500)
- Composition: dark background (#0a0f0d), wordmark with "Bio" green and
  "tica" white, heartbeat trace divider, tagline "Train with data. Recover
  with purpose.", footer "ENGINEERED FOR OPTIMIZATION"
- Status: Uploaded to X profile

Caveats:
- Brand green is `#3ddc84` as a stand-in. The actual app brand green may
  differ slightly — verify against the app and re-render if needed.
- Font is Helvetica/Arial as a stand-in for the real brand font.

---

## Things to verify before posting

Factual claims in the pinned tweet drafts that need confirmation:

- "Two years" of manual correlation before building Biotica
- "Six months" of building (depends on actual start date)
- "LLC formed last week" only valid through ~May 19. After that, change to
  "LLC just formed" or drop entirely.
- Junction "next 60 days" — currently teaser-worthy in roadmap.md, but
  publicly committing to a 60-day window is firmer than the doc implies.
  Soften to "Junction lab integration coming" if the 60 day claim feels too
  specific.
- App-stack list ("MyFitnessPal, SupraHuman, supplements, calendar, notes")
  — only Oura, Withings, MyFitnessPal, and SupraHuman are confirmed. The
  others were drafted to fill out "seven apps." Swap in actual stack before
  posting.

Brand-asset items to verify:
- Brand green hex (currently using `#3ddc84` placeholder)
- Brand font (currently Helvetica/Arial placeholder)

---

## Future steps

In rough priority order:

0. **DO NOT post from u/Biotica_App for the first 30 days (before 2026-06-15).** Account warm-up only — let it age. The natural-drop playbook stays on u/monohybrid. Earliest useful date for brand-account activity: late June.
1. Resolve IG state once the second attempt's outcome is known
2. Set up LinkedIn (founder-voiced, longer-form than X)
3. Create FB Business Page (load-bearing for Meta ads later, also unlocks
   IG support chat path if needed)
4. Decide on Meta Verified Business subscription (~$22/mo, mainly for
   support access)
5. Threads account (Meta side door, low-effort once FB Page exists)
6. Re-render header with confirmed brand green and font

---

## Sync workflow

When social setup state changes (account recovered, new channel launched,
warm-up window closes, first post live):

1. Edit this file.
2. `git -C ~/projects/biotica-web add docs/marketing/social-launch.md && git commit -m "docs(marketing): social launch — <what changed>"`
3. Open the Claude.ai marketing project → Knowledge → find `social-launch.md`
   → Replace.

Cadence target: update on any meaningful state change. This file is more
operational than `roadmap.md` and will move faster.

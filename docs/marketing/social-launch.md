# Biotica Social Launch — Setup Log

Operational log tracking the work to spin up Biotica's social presence.
Companion to `roadmap.md`, `voice-examples.md`, `biotica-brand.md` in the
marketing project knowledge.

Last updated: 2026-05-08

---

## Status snapshot

| Channel | Status | Handle |
|---|---|---|
| X / Twitter | Profile set up, warm-up in progress | `@biotica_app` |
| Instagram | First account disabled, second attempt pending | `biotica.app` (orig) / `biotica_app` (retry) |
| LinkedIn | Not started | TBD |
| Facebook Page | Not started (paused) | TBD |
| Threads | Not started | TBD |

Headline: X is the priority channel. IG is in recovery limbo.
LinkedIn comes after X is rolling.

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
4. Started a second attempt with handle `biotica_app` to match the X handle.
   Outcome pending as of end of day May 8.

### Why this happened (best guess)

Meta's automated systems flag new accounts as "ban evasion" or impersonation
when:
- New email + new IP + brand-name handle are all claimed in the first session
- Fresh Meta account with no Facebook history registers a `.app`-style brand
  handle
- The appeal video selfie can't be matched against an existing Meta identity

This is almost certainly NOT something Chris actually did wrong. It's the
algorithm being aggressive about brand-name handles on day-one accounts.

### Recovery paths (if second attempt also fails)

1. Meta Verified Business ($21.99/mo) for direct human support
2. Create FB Business Page from Chris's personal Facebook, register IG via
   Meta Business Suite (accounts created through Business Manager flow rarely
   get auto-flagged)
3. Wait ~30 days for handle to release, register fresh from a different device

Decision: Pause on this until the second attempt's outcome is known.

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

- Complete the last 2 follows (rate-limited on May 8)
- Warm-up window before first post

---

## X warm-up plan

The account hit the follow rate limit on May 8 evening, which means X is
already paying close attention to it. Plan adjusted to be slightly more
conservative than originally proposed.

| Day | Action |
|---|---|
| May 9 | Finish last 2 follows (@misraetel, @function). Like 5-10 things on the timeline. NO POSTING. |
| May 10 | First non-link tweet. Observation, opinion, or build-log note. Reply to 1-2 accounts you follow. |
| May 11 | Second non-link tweet. Maybe another reply. Don't post the link yet. |
| May 12 | Pinned tweet WITH link. Pin it. |

Posting the link before day 4 risks tripping X's new-account spam filter.
Suppressed tweet (no one sees it) or shadowban are the likely outcomes.

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

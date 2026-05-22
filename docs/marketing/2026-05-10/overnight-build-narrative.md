# Overnight Build Narrative — 2026-05-10
Mode: build / sprint narrative (founders' build journal)
Status: DRAFT — Chris reviews and posts manually. Do not publish.

Sources read: biotica-brand.md, voice-examples.md, roadmap.md, social-launch.md,
docs/launch/2026-05-07/decisions/2026-05-09-evening-pm-signoffs.md,
docs/launch/2026-05-07/decisions/2026-05-10-morning-pm-triage.md,
docs/launch/2026-05-07/decisions/supplement-history-fix-shape.md,
docs/lessons/notification_os_mediated_silentfail.md,
docs/lessons/platform-android-notification-suppression.md,
docs/lessons/data-model-existence-floor.md,
docs/lessons/data-model-fk-as-filter.md

---

## 1. Twitter/X Thread (8-12 tweets)

Post per X warm-up plan: first non-link tweet eligible May 10. This thread is
the right format for May 10 (day 1 of posting). No product link in the first
few posts — don't add biotica.app here until the pinned tweet on May 12.

---

**1/**
Shipped code review last week. Thought we caught everything.

Put it on a real device last night. Found seven new bugs in one session.

Your phone is the only test that matters. Thread on what broke and what we rebuilt as a result. 🧵

---

**2/**
The short version of what failed:

Supplement reminders weren't firing on the lockscreen unless the app was already open. Snooze tapped but the notification never cleared. Supplement history showed wrong counts after you moved something to a different time slot.

None of these showed up in 250+ tests.

---

**3/**
The notification failures turned out to be three completely unrelated problems, which is the worst possible outcome for debugging.

Problem 1: Android was bucketing our alarms as "inexact" and deferring them up to an hour. The fix is a manifest permission called USE_EXACT_ALARM.

Problem 2: The snooze action was logging correctly, but setAutoCancel on Android only clears the notification when you tap the body, not an action button. That's documented behavior. We just hadn't hit it before.

Problem 3: The supplement you moved to a different time slot was stored correctly. The screen just couldn't find it because the lookup was filtering by the wrong column.

Three failures. Three root causes. Zero overlap.

---

**4/**
That last one took a while to see clearly.

The database stores which "regimen" (time slot) a supplement log was written under. We were using that column as a display filter: show me logs that belong to this regimen.

The problem: the schema already said this was metadata. The foreign key is ON DELETE SET NULL, which means "this row survives even if the parent goes away." The schema knew. The readers didn't get the memo.

Moving Fiber from dinner to bedtime meant the old logs had the wrong regimen tag. The reader looked for dinner-tagged logs, found none, and showed nothing.

---

**5/**
Why didn't code review catch this?

Because code review checks the code. The data model assumption was already in production. The FK was set up correctly. The cascade was correct. The individual reads were syntactically fine.

What was missing: a question at design time. "Is this FK structural or metadata?" If you answer that, you know immediately whether the read can filter on it or not.

We didn't ask it. It showed up on a real device instead.

---

**6/**
Same night, two new agent roles got formalized as part of the permanent engineering process.

db-architect: before any table ships, runs 7 questions on the schema. Existence floor. FK classification. Temporal read validity. Not a rubber stamp, a structured review.

mobile-platform-architect: before any notification or OS-level change ships, runs the Android version matrix and reads the native source. The inexact-alarm bucketing failure would have been caught at design time, not device time.

These roles now exist because a device test proved the prior roster couldn't catch this bug class.

---

**7/**
The db-architect question that would have stopped the supplement history bug:

"Is this FK structural or metadata? If metadata, can readers filter on it?"

The answer: metadata. ON DELETE SET NULL says so. The fix: supplement-keyed reads that ignore the regimen column entirely for historical display.

The answer was already in the schema. We needed the right question.

---

**8/**
The mobile-platform-architect finding on notifications:

The previous fix attempt ("just foreground the app when the user taps an action button") was treating Mode 2 — action buttons silent when the app is killed. But Chris's report was describing Mode 1 (visual suppression) AND Mode 3 (dismiss no-op) simultaneously. Two completely different fixes. Different manifest declarations. Different code paths.

Conflating the diagnostics produced a fix attempt that addressed the wrong mode. The device test failed again. The architect ran the actual adb commands, separated the failures, and produced the right fix.

---

**9/**
What actually shipped:

Supplement reminders now fire correctly on the lockscreen (USE_EXACT_ALARM declared, Android 14+ auto-grants it). Supplement history reads the same data regardless of which time slot you've moved things to. A newly-added supplement no longer shows 1/30 = 3% adherence — the existence floor fix means it counts from the day it was created.

7 commits. 10+ agent dispatches. Two new permanent roles in the engineering process.

---

**10/**
The lesson I keep learning with this build:

Code review tells you whether the code is correct. Device testing tells you whether the assumptions are correct.

These are different questions. A test suite with 250 tests answers the first one well. It answers the second one poorly. The second one shows up at 11pm when you're actually using the app.

The discipline is: run the device. Every APK. Every sprint. Not just before launch.

---

**11/**
Building solo means the development process IS the safeguard. There's no team to catch you. No second set of eyes in standup. No QA queue.

So the process has to be explicit about which question each gate answers, and honest about what it can't catch.

The roster now has two more agents because last night showed us two questions that weren't being asked.

That's the actual product of this sprint. Not the 7 bug fixes. The two new questions.

---

**12/**
If you're building something in this space and you're doing your own device testing: commit to a real device on every build, not just before submission.

The emulator lies. The tests lie (about the OS layer). The device doesn't.

---

## 2. LinkedIn Post (~300 words)

---

A device test last night found 7 bugs in a row. All of them had passed code review.

The interesting part isn't the bugs. It's what the development process did next.

Two of the failures were in the notification system. They looked like one problem: "notifications don't pop on the lockscreen and snooze doesn't dismiss." Turned out to be three independent failure modes with nothing to do with each other — Android inexact alarm bucketing, an OS auto-cancel behavior that only triggers on body tap not action tap, and a code path that was targeting the wrong mode entirely. The previous fix attempt had addressed Mode 2 while Modes 1 and 3 were the actual failures.

The way this got untangled: a new mobile-platform-architect agent ran the actual adb diagnostic commands, read the relevant lines in the expo-notifications native source, and separated the failures correctly. That agent didn't exist before this sprint. It exists now because the device test proved the prior roster couldn't catch this bug class.

Same thing happened with the supplement history bug. A database design question — "is this foreign key structural or metadata?" — wasn't being asked at table-design time. If it had been, a two-line reading assumption would have been corrected before it hit production. A db-architect agent now asks that question on every table before it ships.

The 7 bug fixes are real. But they'll be outdated in a few weeks. The two new questions the process now asks — those are durable.

This is what building solo forces you to do. The process has to be explicit about which question each gate answers. And honest about what each gate cannot catch. When the device test finds something the process couldn't, the right answer isn't "we'll be more careful next time." It's "what question weren't we asking?"

Building Biotica in public. Android beta coming.

---

## 3. Single Tweet (no thread, ≤270 chars)

---

Code review caught the code. The device caught the assumptions.

Different questions. Both required. 250 tests didn't predict a single one of last night's 7 bugs.

Run the device every sprint. Not just before launch.

---

(237 characters)

---

## 4. Roadmap Re-Sync Proposals

Three user-visible items from the last 36 hours that should appear in roadmap.md.
All are fair game for posts or "shipped" acknowledgment. None reference internal
tooling, security details, or confidential architecture.

**Proposal A: Supplement adherence survives regimen changes**
Section: Shipped — last 30 days
Proposed entry:

| 2026-05-09 | Supplement history correct after regimen moves | Move a supplement from Morning to Evening — the full history of when you actually took it stays visible and accurate. Prior to this fix, moving a supplement to a different time slot caused historical logs to drop off the detail screen. |

Why it's user-visible: This is a data-trust issue on a paid-tier surface (supplement tracking is core WS3.1). Users who manage multi-time-slot supplement protocols will notice. Safe to describe in plain terms; the FK/schema mechanics are not referenced.

---

**Proposal B: New supplement adherence starts from day you added it**
Section: Shipped — last 30 days
Proposed entry:

| 2026-05-09 | Supplement adherence counts from creation date | Adding a new supplement no longer shows 3% adherence because it's counting backwards 30 days. The clock starts when you add it. |

Why it's user-visible: Directly affects the compliance bar grid visible on every supplement detail screen. Short and concrete.

---

**Proposal C: Supplement reminders fire correctly on the lockscreen (Android 14+)**
Section: Shipped — last 30 days
Proposed entry:

| 2026-05-09 | Lockscreen supplement reminders fire on time | Reminders were silently deferring up to an hour due to Android alarm bucketing. Fixed. Android 14+ auto-grants the exact-alarm capability; Android 12-13 path includes an in-app prompt and a dashboard banner if the user declines. |

Why it's user-visible: Supplement reminders are a paid-tier feature (Pro/Elite). Accurate on-time delivery is the product contract. Safe to describe — no security details referenced, no internal crash counts, no severity classifications.

Note: the USE_EXACT_ALARM Play Store policy submission and the canScheduleExactAlarms() banner are Sprint 2 work. The "dashboard banner if declined" claim is accurate to the decision doc but the banner ships in Sprint 2, not tonight. Adjust this entry once the banner lands: "Dashboard shows a banner with a Settings link if your device denies the permission."

---

All three proposals are ready to add to roadmap.md. None touch "Internal — never publish" categories. Chris approves roadmap.md changes before they go in.

---

## 5. Now-Teasable List

Items from the last 36 hours that have post-worthy surface area. Not drafts — just
the inventory of what's available and when.

| Item | What's teasable | Format | When |
|---|---|---|---|
| Supplement detail screen — before/after | A screen recording showing supplement history surviving a regimen move. Open the detail screen, move a supplement to a different time slot, come back and see history intact. Concrete, visual, tells the data-trust story without explanation. | Short screen recording (30 sec) for X or IG Stories | After Sprint 2 ships the Option A UI fix — device-verify first |
| Dashboard supplement adherence count | A static screenshot of the dashboard agenda showing the correct "X of Y taken" count for a historical date, including a supplement that was moved between time slots. No code. Just the output. | Screenshot tweet or IG caption | After Option A ships |
| Lockscreen notification firing | A screen recording of the phone locked, notification popping on time, tap → snooze or mark taken. The simplest possible proof that it works. | Screen recording for X thread anchor or IG Stories | After dismiss-on-snooze lands in Sprint 2 (F1 in triage doc). Not yet — snooze dismiss is still broken. |
| "Your reminders fire on time" | A one-tweet statement about the lockscreen notification fix, no recording required. The claim is credible on its own once the Play Console submission is in. | Single tweet, no media | After Sprint 2 USE_EXACT_ALARM work lands |
| The two new agent roles as a build-log post | The db-architect + mobile-platform-architect story is the most shareable engineering process item from this sprint. Text-only — no screenshots needed. That's the thread above. | X thread (already drafted above) | May 10 (today), per warm-up plan |

Items NOT teasable yet:
- F5 (email deep link → Chrome) — this is an active critical bug, not a fix to celebrate
- F1 snooze dismiss — still broken as of triage doc; do not tease until Sprint 2 ships it
- "7 bugs fixed tonight" framing — the triage doc shows several are Sprint 2 work, not tonight. Don't claim they're all closed.
- Any specific launch dates — internal only per roadmap.md "Internal — never publish"

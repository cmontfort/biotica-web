# Biotica Marketing — Knowledge Base

> **🟣 Phase-1 (Claude.ai project) retired 2026-05-08.** The marketing agent now lives at `~/projects/biotica/.claude/agents/marketing.md` and reads these knowledge files directly per run. There is no longer a separate Claude.ai project to keep in sync.
>
> If you previously had a `Biotica Marketing` project on claude.ai, **delete it** to consolidate the source of truth. Then invoke marketing work through Claude Code in the biotica repo (e.g. "marketing — draft 3 tweets about X").
>
> The original Phase-1 setup instructions are preserved at the bottom of this file for historical reference and in case the agent ever needs to be re-platformed.

---

## How marketing actually works now (Phase 2 — current)

Four files in this directory form the agent's knowledge base. The agent reads them on every run; no upload step is required.

| File | What it is | Who edits it |
|---|---|---|
| `biotica-brand.md` | Voice rules, audience, banned words, vocabulary, channel notes, product cheat sheet, tier pricing | Chris (with agent proposing updates after 3+ rejection patterns) |
| `voice-examples.md` | Sample posts across channels showing cadence + structure to mimic | Chris (agent proposes additions) |
| `roadmap.md` | Curated marketing-relevant slice of what's shipped, in flight, coming soon, retired, never-publish | Agent proposes via `mode=roadmap-resync`, Chris approves |
| `social-launch.md` | Operational state per channel — X, IG, LinkedIn, Threads, FB Page | Agent updates per its standing commit auth on operational state changes; Chris reviews |

## How to invoke the agent

In Claude Code at the biotica repo, just talk to it:

```
"Marketing — draft 3 tweets announcing the workout module shipped"
"Marketing — what should we post this week"
"Marketing — re-sync the roadmap"
"Marketing — voice spot-check this draft: <paste>"
```

The agent dispatches to the role doc at `.claude/agents/marketing.md` and runs in mode-aware fashion (draft / now-teasable / launch-sequence / roadmap-resync / weekly-review / daily-brief-snippet / voice-update-proposal).

## Auto-triggers (no manual invocation)

The agent fires automatically when:
- A sprint closes with shipped features → `mode=now-teasable` surfaces what's post-fodder
- A launch date locks → `mode=launch-sequence` drafts T-14 → T+7 calendar
- The daily brief runs in launch window → "🟣 Marketing on deck" section auto-populates
- `roadmap.md` is older than 14 days → `mode=roadmap-resync` proposes update

## Compliance gates (auto-routed)

Every draft passes through these BEFORE it surfaces:

| Trigger | Routes to |
|---|---|
| Medical claim | `legal-ops` (disclaimer-audit) |
| Unlaunched feature reference | `product-manager` (consult roadmap) |
| Competitive claim | `legal-ops` |
| Pricing reference | Cross-check `subscription_tiers.md` |
| Store listing copy | `compliance-reviewer` |
| Robinhood / employer reference | Self-block per OBA boundary |

---

## Phase-1 setup (RETIRED 2026-05-08 — preserved for reference only)

<details>
<summary>Click to expand the original Claude.ai project setup instructions.</summary>

These docs were the knowledge base for a **Claude.ai Project** that drafted marketing
content (tweets, threads, LinkedIn posts, email copy, ad variants, blog outlines)
in Biotica's voice. **This pattern was retired 2026-05-08** in favor of the in-repo agent — single source of truth, lockstep with the rest of the agent roster, and no manual re-upload cycle.

### Original one-time setup (~10 min)

1. Go to [claude.ai](https://claude.ai) → **Projects** → **Create Project**
2. **Name:** `Biotica Marketing`
3. **Description:** `Drafts and reviews all Biotica marketing copy. Voice owned by Chris Montfort, founder.`
4. **Custom Instructions** — paste:

```
You are the marketing voice for Biotica, a biometric-driven coaching app
built and run by Chris Montfort. Your job is to draft marketing copy
that sounds like Chris wrote it himself — direct, specific, technically
literate, anti-hedging.

Read the project knowledge base before drafting anything. The brand voice
document is the source of truth — defer to it on tone, vocabulary, and
positioning. Voice examples show the cadence and structure to mimic.

Hard rules:
- No em dashes. Use commas, periods, or parentheses.
- No "delve", "robust", "leverage", "unleash", "game-changer", "elevate",
  "supercharge", "transform" or any AI-tell phrasing.
- No medical claims. Biotica is not a medical device, doesn't diagnose
  or treat anything. See legal-rails section of brand doc.
- Don't over-promise on integrations that aren't shipped (check the
  product cheat sheet).
- Default to plain American English, US Imperial units (lb / ft-in / °F)
  unless the audience is explicitly metric.

Workflow:
1. Ask the user what channel + format + goal before drafting (tweet vs
   thread vs LinkedIn vs email each have different shapes).
2. Draft 2-3 variants with distinct angles, not minor rewrites.
3. After draft, flag any factual claims that need verification before posting.
```

5. **Knowledge base** — upload these files from this directory:
   - `biotica-brand.md` — audience, voice, vocabulary, product, legal rails
   - `voice-examples.md` — sample posts across channels and formats
   - `roadmap.md` — what shipped recently, what's coming, what's retired, what's confidential. Re-upload this one whenever it changes (target: weekly + on any feature ship).

6. **Pin to sidebar** so it's one click from claude.ai home.

### Why this was retired

Three structural limits the in-repo agent solves:
- **No git context.** Phase-1 couldn't read commit history or `decisions/` to know what shipped. Knowledge drift required manual re-upload.
- **No cross-agent comms.** Couldn't auto-route medical claims through `legal-ops` or consult `product-manager` on narrative.
- **No proactive surfacing.** Required user to remember to ask "what should we post"; couldn't fire on sprint-close or launch-date-lock events.

The Phase-2 agent solves all three by living in the same Claude Code session as the rest of the roster.

### To fully retire your Claude.ai project

1. Open the `Biotica Marketing` project on claude.ai
2. Project menu → **Delete project**
3. Confirm

The knowledge files in this directory remain — they're now the agent's source of truth, not a project upload target.

</details>

# Biotica Marketing — Claude.ai Project Setup

These docs are the knowledge base for a **Claude.ai Project** that drafts marketing
content (tweets, threads, LinkedIn posts, email copy, ad variants, blog outlines)
in Biotica's voice.

## One-time setup (~10 min)

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

6. **Pin to sidebar** so it's one click from claude.ai home.

## Daily use

Open the project, ask things like:
- "Draft 3 tweets announcing the Coach feature shipped to beta."
- "Write a LinkedIn post about why I formed an LLC for a fitness app."
- "Give me 5 hook variants for a thread about lab data + training."
- "Rewrite this draft to sound less marketing-y: [paste]"

## Iterating on the voice

When Claude produces a post that doesn't sound right:
1. Note WHAT specifically doesn't land (too corporate, too hype, wrong audience, etc.)
2. Update `biotica-brand.md` voice section OR add a new entry to `voice-examples.md`
3. Commit. Re-upload to the Claude.ai project (Knowledge → replace file).

The goal is to converge on a voice document so good that any future contractor
or freelance marketer could read it and write in-brand on day one.

## When to graduate

This Claude.ai project is **Phase 1**. Move to Phase 2 (a `.claude/skills/marketing/`
skill in the biotica or biotica-web repo) when:
- You want the agent to read git log + memory backlog automatically to know what
  shipped this week
- You're drafting from terminal/Claude Code more than from claude.ai
- The "what should we post about" decision is the bottleneck, not the drafting

Move to Phase 3 (autonomous Vercel-cron agent) when daily posting cadence is
more important than per-post craft. Don't graduate prematurely — bad autonomous
posts compound much faster than good ones.

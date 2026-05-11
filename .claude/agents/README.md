# Biotica-web — Project Agents

This directory holds project-specific agent overrides for biotica-web.
It's currently empty by design.

## How agent resolution works here

The 21-agent global trunk lives at `~/.claude/agents/`. Every project
inherits all 21 by default. A project only places files here when it
needs a **specialization** of one of the global agents — e.g., the
parent `biotica` repo specializes `policy-fit-reviewer` as
`compliance-reviewer` to match its app-store + privacy domain.

Biotica-web is a content + marketing surface (Next.js landing page,
privacy policy, terms, waitlist form). It currently has no specialized
needs beyond the global trunk, so this directory is intentionally
empty. The global agents are fully available for dispatch from this
project as-is.

## Reference: full agent roster

The portable consolidated methodology + 21 agent definitions live at
the parent project:

> `~/projects/biotica/docs/methodology/multi-agent-workflow.md`

That file is the source of truth for what every agent does, when each
fires, scope, interactions, and out-of-scope handoffs. If you want to
specialize an agent for biotica-web (e.g. a `marketing` override with
biotica-web's brand voice), copy the embed block out of the methodology
doc, add the biotica-web-specific delta, and save here as
`<name>.md`.

## When to add an override

- **The global agent does the right thing 80%+ of the time** → don't
  override. Inherit from `~/.claude/agents/<name>.md`.
- **The global agent needs project-specific context** (e.g. a
  particular file structure, vendor stack, brand voice doc) → add a
  thin override here that extends the global. Cite the baseline version
  it branched from.
- **The role fundamentally differs from the generic** → write a
  project-specific override; document in `~/.claude/agent-roster-sync/candidates.md`
  if the pattern looks like it should propagate.

## Sync model

When a global agent updates, this project automatically picks it up on
the next dispatch (no per-project copy to refresh). When a project
override here diverges from the global enough that the global should
update, file a baseline-promotion candidate at
`~/.claude/agent-roster-sync/candidates.md`.

Full sync model details live in the methodology doc under
"Trunk-and-branches sync model" (~section 14).

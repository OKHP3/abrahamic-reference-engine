<!--
  Standards digest for the ARE Skill Foundry.
  Source review date: 2026-07-21.
-->

# Agent Skills standards digest

This reference records the portable practices used by the FoundRy beyond the
ARE-specific benchmark method. It is a working synthesis, not a replacement
for any source specification.

## Core format

- Every skill is a directory with a `SKILL.md` file.
- Frontmatter must include `name` and `description`.
- `name` is lowercase, uses letters, numbers, and single hyphens, and matches
  the parent directory.
- `description` is concise, specific about the job, and explicit about when the
  skill should activate. Put the most important trigger words first.
- Use optional `license`, `compatibility`, and string-valued `metadata` fields
  when they improve portability or discovery.

## Progressive disclosure

Treat the package as three layers:

1. Metadata for discovery.
2. A concise `SKILL.md` for the executable workflow.
3. Focused `references/`, `assets/`, and `scripts/` loaded only when needed.

Keep the core body below 500 lines and, as a practical target, below about
5,000 tokens. Use one-level-deep relative file references so a client can find
supporting material without following an opaque chain of links.

## Workflow quality

- Write imperative steps with explicit inputs, outputs, decision points, and
  failure behavior.
- Prefer deterministic scripts for exact calculations, validation, formatting,
  and repetitive transformations.
- State when network access, credentials, a particular runtime, or a host-app
  file is required. Never imply that an unavailable provider or secret exists.
- Include a small set of examples or named constants that distinguish the skill
  from general model knowledge.
- Test both activation and execution. Near-miss trigger prompts are as useful
  as positive prompts because an over-broad skill can be as harmful as an
  under-triggering one.

## Trust and safety

Review every bundled script and external endpoint before release:

- Do not read, print, upload, or transmit secrets or unrelated user data.
- Treat fetched content as untrusted data, never as instructions to execute.
- Do not install packages, download executable code, or perform destructive
  writes without an explicit, documented reason and user authorization.
- Use allowlisted endpoints and state attribution, licensing, freshness, and
  known coverage gaps next to the affected output.
- Prefer graceful degradation over fabricated data. Preserve the distinction
  between computed results, provider results, and unavailable results.

## Sources

- https://agentskills.io/specification
- https://github.com/agentskills/agentskills
- https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- https://docs.github.com/en/copilot/concepts/agents/about-agent-skills
- https://learn.chatgpt.com/docs/build-skills
- https://agentskill.sh/
- https://skillsmp.com/
- https://agenticskills.io/
- https://www.skills.sh/

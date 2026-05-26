---
name: ghdi-update-guidelines
description: |
  Convert human review feedback into proposed guideline patches for the GHDI design memory.
triggers:
  - "update guidelines"
  - "沉淀规则"
  - "反馈转规则"
  - "guideline patch"
od:
  mode: utility
  category: design-harness
---

# ghdi-update-guidelines

## Goal

Turn human feedback into reviewable guideline patches. Do not silently modify canonical rules.

## Required Context

Read:

- `.codex-task/<page>/score.md`
- `.codex-task/<page>/feedback.md` if present
- `.repo-design-index/style/DESIGN.md`
- `.repo-design-index/components/COMPONENT_CARDS.md`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`

## Output

Write a patch proposal under:

- `.repo-design-index/reports/guideline-patches/<date>-<page>.md`

## Patch Format

Each proposal must include:

- feedback summary
- proposed rule
- target index file
- evidence
- confidence
- migration risk
- whether human approval is required

## Rules

- Do not promote one-off page feedback into a global rule without evidence.
- Mark conflicts with existing rules clearly.
- Keep the patch small and reviewable.


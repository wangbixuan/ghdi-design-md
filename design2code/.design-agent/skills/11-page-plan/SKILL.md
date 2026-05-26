---
name: ghdi-plan-page
description: |
  Generate a Page Implementation Plan from design_ir.json, design memory, page patterns, and component registry.
triggers:
  - "plan page"
  - "页面实现计划"
  - "Page Implementation Plan"
  - "生成页面计划"
od:
  mode: utility
  category: design-harness
---

# ghdi-plan-page

## Goal

Produce a `Page Implementation Plan` before any code is written.

## Required Context

Read these files:

- `SYSTEM_DESIGN.md`
- `.repo-design-index/style/DESIGN.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`
- `.repo-design-index/generation/GENERATION_RULES.md`
- `design-inputs/<page>/design_ir.json`

When component details are unclear, inspect the real source under:

- `D:/ywl/workbench/web/bigboss-base/src/components`

## Output

Write:

- `.codex-task/<page>/page-plan.md`
- `.codex-task/<page>/TASK.md`
- `.codex-task/<page>/checklist.md`

## Planning Contract

The plan must include:

- requirement summary
- page type decision
- matched page pattern
- mapped regions
- recommended components
- data structures and fields
- interactions
- file modification scope
- style rules
- risks
- self-check checklist

## Rules

- Do not write page code in this skill.
- Prefer `baseTableV2` for new table-first pages unless the target module clearly uses legacy `TableBase`.
- Prefer existing form and selection components before adding custom controls.
- Mark any new component proposal as a risk.
- Mention at least one canonical example or source component for every major recommendation.


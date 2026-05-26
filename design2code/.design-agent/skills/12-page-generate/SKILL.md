---
name: ghdi-generate-page
description: |
  Generate or modify Vue2 + Element UI page code from a Page Implementation Plan while preserving GHDI system style.
triggers:
  - "generate page"
  - "生成页面代码"
  - "按计划写页面"
  - "Vue2 Element UI 页面"
od:
  mode: utility
  category: design-harness
---

# ghdi-generate-page

## Goal

Implement page code from an approved `page-plan.md`.

## Required Context

Read:

- `.codex-task/<page>/TASK.md`
- `.codex-task/<page>/page-plan.md`
- `.codex-task/<page>/checklist.md`
- `.repo-design-index/style/DESIGN.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`
- `.repo-design-index/generation/GENERATION_RULES.md`

Then inspect target code examples in:

- `D:/ywl/workbench/web/bigboss-base`

## Output

Modify the target codebase only within the file scope listed in `page-plan.md`.

After implementation, write:

- `.codex-task/<page>/implementation-notes.md`

## Rules

- Follow Vue2 + Element UI conventions already present in the target module.
- Reuse indexed components before creating local replacements.
- Do not add global styles unless the plan explicitly requires it.
- Do not replace dense enterprise tables with marketing cards.
- Do not invent new colors, shadows, or rounded-card systems.
- Keep backend API assumptions explicit if endpoints are not known.

## Self Check

Implementation notes must list:

- files changed
- components reused
- page pattern followed
- style rules followed
- unresolved risks
- items that should be scored


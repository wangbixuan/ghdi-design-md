---
name: ghdi-intent-to-ir
description: |
  Convert natural-language enterprise page requirements into design_ir.json for the GHDI design-memory harness.
triggers:
  - "intent to ir"
  - "自然语言需求转IR"
  - "页面需求结构化"
  - "design_ir"
od:
  mode: utility
  category: design-harness
---

# ghdi-intent-to-ir

## Goal

Convert a natural-language page request into a structured `design_ir.json` that downstream planning can use.

## Required Context

Read these files before producing output:

- `SYSTEM_DESIGN.md`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`
- `.repo-design-index/generation/GENERATION_RULES.md`

If an input file exists under `design-inputs/<page>/intent.md`, use it as the primary requirement source.

## Output

Write or update:

- `design-inputs/<page>/design_ir.json`

The IR must include:

- `source`
- `pageName`
- `pageIntent.pageType`
- `pageIntent.businessObject`
- `regions`
- `fields`
- `actions`
- `visualHints`
- `unknowns`

## Rules

- Do not generate Vue code.
- Do not infer backend API names unless the requirement provides them.
- Preserve uncertain business details in `unknowns`.
- Prefer `list-management-page` for table-first CRUD requirements.
- Prefer `config-management-page` for detail/configuration workflows with rich editing or rule binding.

## Self Check

Before finishing, verify:

- The page type is explicit.
- Main regions are present.
- Query fields, table columns, form fields, and actions are separated.
- Unknowns are not silently guessed.


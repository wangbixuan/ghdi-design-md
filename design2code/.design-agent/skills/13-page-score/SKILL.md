---
name: ghdi-score-page
description: |
  Score generated Vue page code for component reuse, page pattern match, style consistency, and business completeness.
triggers:
  - "score page"
  - "页面评分"
  - "生成结果评分"
  - "design harness score"
od:
  mode: utility
  category: design-harness
---

# ghdi-score-page

## Goal

Evaluate a generated page against the design memory and page plan.

## Required Context

Read:

- `.codex-task/<page>/page-plan.md`
- `.codex-task/<page>/implementation-notes.md`
- `.repo-design-index/generation/REVIEW_RUBRIC.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/style/STYLE_REGISTRY.json`
- `.repo-design-index/patterns/PATTERN_REGISTRY.json`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`
- generated page files

## Output

Write:

- `.repo-design-index/reports/latest-score.md`
- `.codex-task/<page>/score.md`

## Score Weights

Use the project rubric:

- 25 component reuse
- 20 page pattern match
- 20 style consistency
- 15 intent alignment
- 10 token/style-rule adherence
- 10 business structure completeness

## Rules

- Findings must cite files or plan sections.
- Penalize unnecessary custom components when indexed components cover the need.
- Penalize `TableBase` usage in new pages unless the plan explicitly says this is legacy maintenance.
- Penalize unknown colors, heavy decorative styling, and marketing-like layouts in enterprise admin pages.
- Penalize page structure that ignores the matched pattern card.
- Do not treat aesthetic preference as a primary score unless it maps to a documented rule.

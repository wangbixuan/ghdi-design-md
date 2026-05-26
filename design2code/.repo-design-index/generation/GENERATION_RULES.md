# Generation Rules

## Required Read Order

Before page generation, Codex must read:

1. `SYSTEM_DESIGN.md`
2. `.repo-design-index/style/DESIGN.md`
3. `.repo-design-index/components/COMPONENT_REGISTRY.json`
4. `.repo-design-index/components/COMPONENT_CARDS.md`
5. `.repo-design-index/patterns/PAGE_PATTERNS.md`
6. `.repo-design-index/generation/PAGE_PLAN_TEMPLATE.md`

## Process Rules

- Do not write page code before a Page Implementation Plan exists.
- Match page type before recommending components.
- Prefer indexed components over local custom equivalents.
- Inspect real source examples before using a component in generated code.
- Keep API uncertainty explicit.

## Vue2 + Element UI Rules

- Follow existing module style and import conventions.
- Keep component options compatible with Vue2.
- Do not use Vue3-only syntax.
- Do not introduce heavy new dependencies for MVP pages.

## Visual Rules

- Use `var(--theme-color)` and `var(--line-color)` for project theme emphasis.
- Follow Element UI sizing and states.
- Avoid decorative gradients, marketing hero sections, and card waterfalls in enterprise management pages.

## Output Rules

After implementation, output:

- changed files
- reused components
- matched page pattern
- style rules followed
- unresolved risks
- whether design index updates are recommended


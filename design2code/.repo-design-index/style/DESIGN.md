# GHDI Console Design Memory

## Baseline

The system is a Vue2 + Element UI enterprise backoffice product. New pages must inherit Element UI control semantics, GHDI theme variables, and dense operational page patterns.

## Visual Tone

- Enterprise, restrained, table-first, and work-focused.
- Prefer high information density over decorative composition.
- Avoid marketing-page layouts, oversized hero sections, decorative gradients, and card waterfalls for CRUD pages.

## Typography

- Body text: `14px`.
- Small/meta text: `12px` to `13px`.
- Page title: usually `18px` to `20px`.
- Primary text color follows Element UI: `#303133`.
- Body text color follows Element UI: `#606266`.
- Secondary text color follows Element UI: `#909399`.

## Color

- Primary theme color should be consumed through `var(--theme-color)`.
- Emphasis line color should be consumed through `var(--line-color)`.
- Functional colors follow Element UI semantics:
  - success: `#67C23A`
  - warning: `#E6A23C`
  - danger: `#F56C6C`
  - info: `#909399`

## Controls

- Keep Element UI sizing and interaction states.
- Default control height is `40px`; compact variants may use `36px`, `32px`, or `28px`.
- Buttons use `4px` radius and Element UI state behavior.
- Row-level actions should usually be text buttons.

## Table Rules

- List pages are table-first.
- New list pages should prefer `baseTableV2` unless the target module is clearly legacy.
- Table search, pagination, export, column settings, and selection should be delegated to shared table containers when possible.
- More than three row-level actions should usually be collapsed into a dropdown or secondary action group.

## Dialog / Drawer Rules

- Add/edit forms in list/config pages usually use dialogs or drawers instead of full page navigation.
- Dialogs should follow Element UI spacing, radius, and shadow behavior.
- Do not make dialogs visually heavier than the primary table.

## Theme Logic

The theme color chain is:

```txt
menu/system configuration
-> --theme-color / --line-color
-> shared components and page emphasis styles
```

Generated code should use theme variables instead of hard-coded primary colors when expressing project theme.

## Anti-Patterns

- Do not turn CRUD pages into marketing pages.
- Do not replace data tables with decorative card grids.
- Do not invent new shadows, large radii, or unrelated color systems.
- Do not hide key operations for visual neatness.
- Do not add global style pollution for a single page.
- Do not duplicate shared components when indexed components cover the need.


# Review Rubric

Total: 100

| Dimension | Points | Check |
|---|---:|---|
| Component reuse | 25 | Uses recommended indexed components; avoids unnecessary duplicates |
| Page pattern match | 20 | Follows matched page structure and interaction model |
| Style consistency | 20 | Matches GHDI / Element UI density, colors, typography, and restraint |
| Intent alignment | 15 | Preserves regions, fields, actions, and hierarchy from `design_ir.json` |
| Token/style-rule adherence | 10 | Uses theme variables and avoids unknown one-off visual rules |
| Business completeness | 10 | Fields, actions, statuses, and API uncertainty are handled honestly |

## Scoring Notes

- A high score requires evidence, not just plausible appearance.
- Penalize generated pages that ignore `baseTableV2` for table-first CRUD pages without explanation.
- Penalize hard-coded primary colors when theme variables are appropriate.
- Penalize hidden or omitted operations unless the plan explicitly excludes them.


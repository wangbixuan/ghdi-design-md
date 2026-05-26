---
name: ghdi-index-components
description: |
  Scan and curate the bigboss-base component index for the GHDI design-memory harness.
triggers:
  - "index components"
  - "扫描组件"
  - "组件索引"
  - "更新组件索引"
  - "component registry"
od:
  mode: utility
  category: design-harness
---

# ghdi-index-components

## Goal

Build or update the component index that Codex uses before planning and generating pages.

This skill does not blindly promote every scanned component into the official registry. It separates facts from recommendations:

```txt
generated/component-scan-summary.json = machine-scanned facts
COMPONENT_REGISTRY.json = reviewed recommendations
COMPONENT_CARDS.md = human-readable usage rules
```

## Required Context

Read:

- `.design-agent/config/project.config.json`
- `.repo-design-index/components/INDEXING_STRATEGY.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`
- `seed/Component.md`
- `D:/ywl/workbench/web/bigboss-base/src/components/INDEX.md`
- `D:/ywl/workbench/web/bigboss-base/src/components/expose.js`

Then inspect source files only for components that need deeper review.

## Deterministic Scan

Run:

```bash
node .design-agent/scripts/scan-components.mjs "D:/ywl/workbench/web/bigboss-base"
```

Read the output:

- `.repo-design-index/components/generated/component-scan-summary.json`

For batch review, also run:

```bash
node .design-agent/scripts/build-component-candidates.mjs
```

Read the output:

- `.repo-design-index/reports/component-index-candidates.md`

## Review Rules

Promote a component into `COMPONENT_REGISTRY.json` only when it has a reusable generation role.

Use these statuses:

- `preferred`: recommended for new pages.
- `allowed`: valid when the page intent matches or local module convention uses it.
- `legacy`: existing historical component; avoid for new pages unless maintaining legacy modules.
- `specialized`: domain-heavy component; use only for explicit business needs.
- `avoid`: do not use for new work.

## Output

When asked to update the index directly, update:

- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`

When recommendations require human judgment, write a proposal instead:

- `.repo-design-index/reports/component-index-review.md`
- `.repo-design-index/reports/component-index-candidates.md`

Human-facing review reports must be written in Chinese. Keep code identifiers, component names, file paths, prop names, event names, and status values in their original form.

## Batch Mode

For batch component scanning, process candidates by category, not by raw directory order.

Recommended order:

- `table-list-container`
- `upload-preview`
- `form-control`
- `workflow`
- `notice-business`
- `app-shell`
- `chart`
- `needs-classification`

For each batch:

- keep machine facts separate from Codex recommendations
- promote only components with a clear reusable generation role
- leave ambiguous components in the review report
- do not overwrite canonical registry entries unless the change is explicitly justified
- write the human review report in Chinese

## Chinese Review Report Format

Use this structure for any human-facing component review report:

```md
# 组件索引评审报告

## 1. 扫描摘要

## 2. 已在正式索引中的组件

## 3. 待评审候选组件

## 4. 建议提升到正式索引的组件

## 5. 暂不建议提升的组件

## 6. 需要人工确认的问题

## 7. 建议写入 COMPONENT_REGISTRY.json 的补丁

## 8. 建议写入 COMPONENT_CARDS.md 的说明
```

## Component Card Requirements

Every promoted component should document:

- path
- status
- category
- when to use
- when not to use
- key props/events
- canonical examples
- generation notes

## Human Review Required

Ask for or mark human review when:

- choosing between `preferred` and `legacy`
- marking canonical examples
- introducing a new preferred component
- mapping a business intent to a component
- resolving contradictory historical usage

## Self Check

Before finishing, verify:

- The scan summary exists and was generated from the configured codebase.
- The candidate report exists when running batch mode.
- Official registry changes are small and reviewable.
- No generated-only fact was promoted without a use-case reason.
- Any uncertain status is marked `needs-human-review` or moved to a review report.

---
name: ghdi-promote-components
description: |
  Promote reviewed component reports into COMPONENT_REGISTRY.json and COMPONENT_CARDS.md.
triggers:
  - "提升组件索引"
  - "写入正式组件索引"
  - "promote components"
  - "组件沉淀"
  - "更新正式组件索引"
od:
  mode: utility
  category: design-harness
---

# ghdi-promote-components

## Goal

Move reviewed component decisions from report files into the canonical component index.

Canonical files:

- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`

## Required Context

Read:

- `.repo-design-index/reports/components/README.md`
- `.repo-design-index/reports/components/<ComponentName>.md`
- `.repo-design-index/reports/component-feedback-log.md` if present
- `.repo-design-index/components/PROMOTION_WORKFLOW.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`

Inspect source code only when the report lacks enough evidence.

## Promotion Rules

Promote only components with clear reviewed decisions.

Do not promote when:

- the review says "待定"
- the decision is ambiguous
- the component is an internal child component with no generation-facing role
- human confirmation is explicitly required but absent

## Output

Update:

- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`

Write a Chinese promotion summary:

- `.repo-design-index/reports/component-promotion-summary.md`

## Summary Format

```md
# 组件索引提升记录

## 1. 本次写入正式索引的组件

## 2. 本次更新的组件卡片

## 3. 暂缓提升的组件

## 4. 仍需人工确认的问题

## 5. 后续建议
```

## Rules

- Human-facing summary must be in Chinese.
- Keep JSON stable and valid.
- Preserve existing registry entries unless the reviewed report explicitly changes them.
- Do not remove components from the registry without explicit human instruction.
- If changing a status to `preferred` or `avoid`, cite the human feedback or review report.

## Self Check

Before finishing, verify:

- `COMPONENT_REGISTRY.json` parses as JSON.
- Every promoted component has a component card.
- The promotion summary names all changed components.
- Ambiguous components remain out of the canonical registry.


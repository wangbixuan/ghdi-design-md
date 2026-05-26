---
name: ghdi-component-feedback
description: |
  Convert natural-language human feedback on component review reports into structured component review notes.
triggers:
  - "组件反馈"
  - "修正组件评审"
  - "我看了组件报告"
  - "component feedback"
  - "反馈组件索引"
od:
  mode: utility
  category: design-harness
---

# ghdi-component-feedback

## Goal

Accept natural-language human feedback, usually in Chinese, and update the corresponding component review files without requiring the user to remember a template.

## Required Context

Read:

- `.repo-design-index/reports/components/README.md`
- `.repo-design-index/reports/components/<ComponentName>.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`
- `.repo-design-index/components/PROMOTION_WORKFLOW.md`

If the user mentions a component name, locate the matching file under:

- `.repo-design-index/reports/components/`

## Input Style

The user may write casual Chinese feedback, for example:

```txt
uploadPdfFile 可以进索引，但不要 preferred，只在明确 PDF 上传时用。
ViewFile 感觉是内部组件，不要让页面生成直接用。
chartsLine 和 chartsFunnel 可以作为 dashboard 的 allowed 组件。
```

Do not require the user to use English status terms. Translate intent into status values only in the structured section.

## Output

Update the relevant component review file under:

- `.repo-design-index/reports/components/<ComponentName>.md`

Also write or update:

- `.repo-design-index/reports/component-feedback-log.md`

## Rules

- Write human-facing content in Chinese.
- Preserve exact component names, paths, prop names, event names, and status values.
- Do not directly edit `COMPONENT_REGISTRY.json` or `COMPONENT_CARDS.md`; that is handled by `ghdi-promote-components`.
- If feedback is ambiguous, record it under `需要人工确认的问题`.
- If feedback clearly changes status/category, update the component report's `建议提升结果`.

## Feedback Normalization

Map casual feedback to structured meaning:

- "推荐默认用" -> `preferred`
- "可以用但别默认推荐" -> `allowed`
- "老组件 / 历史包袱 / 旧版" -> `legacy`
- "只在某类业务里用" -> `specialized`
- "不要用 / 不要让 Codex 用" -> `avoid`
- "内部组件 / 子组件" -> usually `specialized` or not promoted

## Self Check

Before finishing, verify:

- The feedback was recorded in Chinese.
- The target component review file was updated.
- No canonical registry file was changed.
- Ambiguous decisions remain marked for human confirmation.


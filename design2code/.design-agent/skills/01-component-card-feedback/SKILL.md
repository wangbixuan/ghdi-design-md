---
name: ghdi-component-card-feedback
description: |
  Apply Chinese human feedback to LLM-generated component cards.
triggers:
  - "组件说明反馈"
  - "修正组件 card"
  - "修改组件说明"
  - "component card feedback"
  - "组件知识反馈"
od:
  mode: utility
  category: design-harness
---

# ghdi-component-card-feedback

## Goal

接收用户对组件说明 card 的中文自然语言反馈，并更新对应 card。

用户不需要记模板，也不需要使用英文术语。可以直接说：

```txt
这个组件主要是给 PDF 上传用的，不要写成普通文件上传。
这个组件是内部展示模块，不应该建议页面生成时直接用。
这个组件的典型场景是看板页，不是列表页。
```

## Required Context

读取：

- `.repo-design-index/components/cards/README.md`
- `.repo-design-index/components/cards/<ComponentName>.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`

如果用户提到组件名，先在 `.repo-design-index/components/cards/` 下找到对应 card。

## Output

更新：

- `.repo-design-index/components/cards/<ComponentName>.md`

追加或更新：

- `.repo-design-index/components/component-card-feedback-log.md`

## Rules

- 面向人工的内容写中文。
- 保留组件名、路径、props、events、slots 的原始写法。
- 直接修订 card 内容，不要只写一份外部报告。
- 不要直接修改 `COMPONENT_REGISTRY.json` 或 `COMPONENT_CARDS.md`。
- 如果反馈不明确，把问题写入 card 的“人工修订记录”或“生成页面时的注意事项”中。

## Self Check

完成前确认：

- 目标 card 已更新。
- 反馈日志已记录。
- 没有修改正式 registry。
- 用户反馈中的关键判断没有丢失。


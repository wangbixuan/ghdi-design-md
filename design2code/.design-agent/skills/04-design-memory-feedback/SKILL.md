---
name: ghdi-design-memory-feedback
description: |
  Apply Chinese human feedback to style cards and page-pattern cards.
triggers:
  - "设计记忆反馈"
  - "修改风格规则"
  - "修改页面模式"
  - "style feedback"
  - "pattern feedback"
od:
  mode: utility
  category: design-harness
---

# ghdi-design-memory-feedback

## Goal

接收用户对界面风格或页面模式的中文自然语言反馈，并写回对应 card。

用户可以直接说：

```txt
列表页不要再出现 TableBase，新页面统一 baseTableV2。
dashboard 卡片不要套到普通 CRUD 页面里。
弹窗里的表单按钮要放底部右侧，不要居中。
```

## Required Context

根据反馈内容读取相关文件：

- `.repo-design-index/style/cards/*.md`
- `.repo-design-index/patterns/cards/*.md`
- `.repo-design-index/style/STYLE_REGISTRY.json`
- `.repo-design-index/patterns/PATTERN_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`

## Output

更新对应 card：

- `.repo-design-index/style/cards/<card>.md`
- 或 `.repo-design-index/patterns/cards/<card>.md`

追加日志：

- `.repo-design-index/reports/design-memory-feedback-log.md`

## Rules

- 直接修改对应 card，不要只写外部报告。
- 如果反馈是全局风格规则，写到 style card。
- 如果反馈是页面结构 / 组件组合 / 数据流，写到 pattern card。
- 如果反馈涉及组件推荐或禁用，必要时提示也应更新组件 card。
- 不要直接重建 registry，registry 由 `ghdi-design-memory-build` 统一生成或同步。

## Self Check

完成前确认：

- 用户反馈的关键判断没有丢失。
- 修改位置是 style card 或 pattern card，而不是随意散落。
- 已写入反馈日志。

---
name: ghdi-design-memory-scan
description: |
  Scan existing style seeds, page design seeds, and representative Vue pages to generate style and page-pattern memory cards.
triggers:
  - "扫描设计记忆"
  - "扫描界面风格"
  - "扫描页面模式"
  - "design memory scan"
  - "页面模式沉淀"
od:
  mode: utility
  category: design-harness
---

# ghdi-design-memory-scan

## Goal

扫描旧 seed、现有设计索引和代表性页面，生成或更新：

- 界面风格 cards
- 页面模式 cards
- evidence 映射

这个 skill 不直接生成页面代码。

## Required Context

读取：

- `seed/design.md`
- `seed/theme-color-logic.md`
- `seed/page-designs/*.md`
- `.repo-design-index/style/DESIGN.md`
- `.repo-design-index/style/STYLE_REGISTRY.json`
- `.repo-design-index/style/cards/*.md`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`
- `.repo-design-index/patterns/PATTERN_REGISTRY.json`
- `.repo-design-index/patterns/cards/*.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/examples/canonical-pages.md`

如果需要扫描真实页面，优先读取 `project.config.json` 中配置的本地代码库路径。用户给出本机绝对路径时，只能用它来定位文件；写入 card、evidence、report 时必须转换为逻辑仓库路径，例如 `bigboss-wedo/src/module/main/.../table.vue`。

## Output

可更新：

- `.repo-design-index/style/cards/*.md`
- `.repo-design-index/style/evidence/*.md`
- `.repo-design-index/patterns/cards/*.md`
- `.repo-design-index/patterns/evidence/*.md`

可追加：

- `.repo-design-index/reports/design-memory-scan-summary.md`

## Rules

- 面向人工的内容使用中文。
- 不要把单页面特例直接提升为全局规则。
- 真实页面证据必须记录路径，但只能记录相对路径或逻辑仓库路径。
- 如果无法从本地绝对路径判断仓库名和仓库根目录，需要先向用户确认对应项目的本地路径或仓库名。
- 本机绝对路径只能出现在命令参数、临时工作上下文或个人配置里，不要写入 `.repo-design-index`。
- 如果规则来自 seed，需要标注来源是旧探索。
- 如果规则来自真实页面，需要标注它是否代表当前推荐模式。
- 不要修改 `COMPONENT_REGISTRY.json`。

## Self Check

完成前确认：

- 新增或更新的 card 有明确来源。
- 风格规则和页面模式没有混在同一个 card 里。
- 旧 seed 的利用方式写入 evidence。

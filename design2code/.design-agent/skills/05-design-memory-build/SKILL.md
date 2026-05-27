---
name: ghdi-design-memory-build
description: |
  Build STYLE_REGISTRY.json, PATTERN_REGISTRY.json, DESIGN.md, and PAGE_PATTERNS.md from reviewed design-memory cards.
triggers:
  - "构建设计记忆"
  - "生成风格索引"
  - "生成页面模式索引"
  - "design memory build"
  - "style registry build"
  - "pattern registry build"
od:
  mode: utility
  category: design-harness
---

# ghdi-design-memory-build

## Goal

根据已审阅的 style cards 和 pattern cards，汇总正式设计记忆：

- `.repo-design-index/style/DESIGN.md`
- `.repo-design-index/style/STYLE_REGISTRY.json`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`
- `.repo-design-index/patterns/PATTERN_REGISTRY.json`

## Required Context

读取：

- `.repo-design-index/style/cards/*.md`
- `.repo-design-index/style/DESIGN.md`
- `.repo-design-index/style/STYLE_REGISTRY.json`
- `.repo-design-index/patterns/cards/*.md`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`
- `.repo-design-index/patterns/PATTERN_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`

## Output

更新：

- `.repo-design-index/style/STYLE_REGISTRY.json`
- `.repo-design-index/patterns/PATTERN_REGISTRY.json`
- 必要时更新 `.repo-design-index/style/DESIGN.md`
- 必要时更新 `.repo-design-index/patterns/PAGE_PATTERNS.md`

追加：

- `.repo-design-index/reports/design-memory-build-log.md`

## Rules

- 不要把未评审、证据不足的页面特例标成全局规则。
- `STYLE_REGISTRY.json` 面向风格检索。
- `PATTERN_REGISTRY.json` 面向页面规划检索。
- `PAGE_PATTERNS.md` 保持简洁，详细说明留在 pattern card 和详细 Design MD。
- 如果规则和组件索引冲突，以人工审阅后的组件索引为准，并记录冲突。

## Self Check

完成前确认：

- JSON 文件合法。
- registry 中的 card 路径都存在。
- 页面生成 skill 的读取路径没有断。
- 已写入 build log。

# 代码库设计记忆索引

这个目录是 GHDI 页面生成 harness 的长期设计记忆。

它应该被视为 Codex 生成页面时的主要事实来源：

- `style/` 存放视觉风格和主题规则。
- `components/` 存放组件索引资产。
- `patterns/` 存放页面模式。
- `generation/` 存放计划、生成和评审规则。
- `examples/` 存放标准参考页面。
- `reports/` 存放评分报告和规则补丁建议。

不要把一次性的头脑风暴内容直接放进这里。只有经过评审、能沉淀为可复用规则的内容，才应该进入这个目录。

## 当前沉淀结构

组件、界面风格和页面模式都采用相同的四层结构：

```txt
正式索引：给 Codex 快速检索
单项 card：给 Codex 深读和人工评审
evidence：记录来源、旧 seed 映射和真实页面证据
workflow：说明扫描、反馈、构建流程
```

对应文件：

- 组件：`components/COMPONENT_REGISTRY.json`、`components/cards/`
- 界面风格：`style/DESIGN.md`、`style/STYLE_REGISTRY.json`、`style/cards/`
- 页面模式：`patterns/PAGE_PATTERNS.md`、`patterns/PATTERN_REGISTRY.json`、`patterns/cards/`

旧有探索内容保留在 `seed/`，但正式页面生成应优先读取 `.repo-design-index/` 下的索引和 cards。

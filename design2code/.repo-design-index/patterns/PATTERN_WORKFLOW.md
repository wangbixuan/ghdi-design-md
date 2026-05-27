# 页面模式沉淀流程

## 目标

页面模式沉淀回答的是：

```txt
某类自然语言需求，应该用什么页面结构、组件组合、数据流和交互流来实现？
```

它处在界面风格和组件索引之间：

- 界面风格决定页面看起来像系统。
- 组件索引决定具体组件怎么用。
- 页面模式决定这些组件如何组合成业务页面。

## 四层结构

```txt
patterns/
├── PAGE_PATTERNS.md       # Codex 优先读取的简版页面模式索引
├── PATTERN_REGISTRY.json  # 机器可检索页面模式索引
├── cards/                 # 可逐条评审的页面模式卡片
├── evidence/              # 旧 seed 和真实页面证据映射
└── *.md                   # 旧有详细 Design MD，作为细节说明继续保留
```

## 标准流程

```txt
03-design-memory-scan
-> 04-design-memory-feedback
-> 05-design-memory-build
```

## 旧有沉淀如何利用

- `seed/page-designs/*.md` 已迁移为 `.repo-design-index/patterns/*.md` 的详细 Design MD。
- 新增的 `patterns/cards/*.md` 是给 Codex 快速读取和人工反馈的结构化卡片。
- `PATTERN_REGISTRY.json` 是页面规划时的机器检索入口。

## 人工介入点

人工主要判断：

- 这个模式是否仍适合新页面。
- 哪些页面只是历史特例，不应沉淀为通用模式。
- 某个模式应该优先使用哪些组件。
- 某些交互是否必须保留，例如弹窗、抽屉、保存前预览。

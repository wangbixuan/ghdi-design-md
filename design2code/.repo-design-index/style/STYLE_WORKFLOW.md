# 界面风格沉淀流程

## 目标

界面风格沉淀回答的是：

```txt
生成的新页面为什么看起来像 GHDI / bigboss-base 系统一部分？
```

它不替代组件索引，也不替代页面模式。它负责沉淀颜色、字号、密度、布局节奏、状态表达、主题变量和反例。

## 四层结构

```txt
style/
├── DESIGN.md              # Codex 优先读取的正式风格说明
├── tokens.css             # 稳定样式 token
├── TOKENS.md              # token 人工说明
├── STYLE_REGISTRY.json    # 机器可检索风格索引
├── cards/                 # 可逐条评审的风格卡片
└── evidence/              # 证据来源和旧沉淀映射
```

## 标准流程

```txt
03-design-memory-scan
-> 04-design-memory-feedback
-> 05-design-memory-build
```

## 旧有沉淀如何利用

- `seed/design.md`：作为当前 `DESIGN.md`、控件基础、表格/弹窗风格的初始证据。
- `seed/theme-color-logic.md`：作为主题色链路和 CSS 变量规则的初始证据。
- `.repo-design-index/style/tokens.css`：保留为初始 token 文件，后续从 `DESIGN.md` 和真实代码中继续扩展。

## 人工介入点

人工主要介入这些判断：

- 某条风格是否是全局规则，还是单页面特例。
- 某个页面的视觉是否代表当前系统，而不是历史包袱。
- 是否允许 Codex 在新页面中使用某种布局或视觉表达。
- 主题色、状态色、业务色之间的边界。

人工反馈应通过 `04-design-memory-feedback` 写回对应 card，不直接散落在聊天记录里。

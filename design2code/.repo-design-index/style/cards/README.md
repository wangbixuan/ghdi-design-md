# 界面风格 Cards

这里存放可被 Codex 读取、也可被人工逐条评审的界面风格卡片。

正式生成页面时，优先读取：

```txt
.repo-design-index/style/DESIGN.md
.repo-design-index/style/STYLE_REGISTRY.json
```

当需要理解某条规则的细节或证据时，再读取对应 card。

## 初始 Cards

| Card | 来源 | 用途 |
|---|---|---|
| `control-foundation.md` | `seed/design.md` | Element UI 控件基础规则 |
| `theme-color-system.md` | `seed/theme-color-logic.md` | GHDI 主题色链路和变量规则 |
| `table-list-visual-style.md` | `seed/design.md` + `baseTableV2` 组件 card | 表格优先页面的视觉密度和操作规则 |
| `dialog-form-style.md` | `seed/design.md` + 页面模式 | 弹窗、抽屉、表单层级 |
| `density-and-layout.md` | `seed/design.md` + 页面模式 | 企业后台信息密度和布局节奏 |

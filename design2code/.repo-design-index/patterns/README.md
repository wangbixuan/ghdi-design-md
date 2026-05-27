# 页面模式索引

这个目录保存两层页面模式记忆：

- `PAGE_PATTERNS.md` 是 Codex 优先读取的简版规划索引。
- `PATTERN_REGISTRY.json` 是机器可检索的页面模式索引。
- `cards/` 存放可逐条评审的结构化页面模式卡片。
- 各个具体页面模式文件保留了 seed 中原始的 Design MD 格式，用于更细的页面重建指导。

## Seed 迁移映射

| Seed 文件 | 索引文件 | 用途 |
|---|---|---|
| `seed/page-designs/list.md` | `list-management-page.md` | 表格优先的企业列表 / CRUD 页面 |
| `seed/page-designs/config.md` | `config-management-page.md` | 带富文本编辑、规则绑定的详情 / 配置页面 |
| `seed/page-designs/dashboard.md` | `dashboard-page.md` | 企业运营看板页面 |
| `seed/page-designs/form.md` | `form-ledger-page.md` | 面向审批的台账式表单页面 |
| `seed/page-designs/controls.md` | `foundation-controls-page.md` | Element UI 基础控件参考页面 |
| `seed/page-designs/theme.md` | `theme-engine-page.md` | 全局主题管理和预览页面 |
| `seed/page-designs/status.md` | `status-page.md` | 404 和空状态页面 |

## 保留规则

迁移后的文件有意保留 seed 中的 Design MD 结构：

```txt
Page Positioning
Visual Tone
Layout Structure
Core Components
Interaction Rules
Theme / Visual Detail Rules
Business Constraints
Reusable Design Pattern
AI Generation Prompt
```

更新详细页面模式时，默认继续保留这套结构。除非经过评审的 guideline patch 明确要求调整格式。

## 读取顺序

页面规划时建议按以下顺序读取：

1. `PATTERN_REGISTRY.json`
2. 命中的 `cards/<pattern>.md`
3. 对应详细 Design MD，例如 `list-management-page.md`

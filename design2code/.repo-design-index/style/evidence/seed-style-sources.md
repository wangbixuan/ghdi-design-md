# 旧风格沉淀来源映射

## seed/design.md

用途：

- 作为当前系统控件基础规范的主要来源。
- 已迁移进 `.repo-design-index/style/DESIGN.md` 的核心章节：
  - Element UI 基线
  - typography
  - border / radius
  - background
  - functional colors
  - controls
  - buttons
  - inputs
  - table
  - dialog
  - anti-patterns

保留方式：

- `seed/design.md` 继续作为历史探索证据。
- 正式生成时优先读取 `.repo-design-index/style/DESIGN.md` 和 `STYLE_REGISTRY.json`。

## seed/theme-color-logic.md

用途：

- 作为主题色链路证据。
- 已迁移进 `.repo-design-index/style/DESIGN.md` 的 `Theme Logic` 章节。
- 也拆分到 `cards/theme-color-system.md`，方便后续人工反馈。

关键结论：

- 菜单节点颜色和系统默认色共同决定当前页面主题。
- `--theme-color` 和 `--line-color` 是页面强调色的主要消费变量。
- 状态色不应被主题色强行覆盖。

## 后续证据来源

后续 `03-design-memory-scan` 应继续补充：

- 真实页面截图或页面文件路径。
- 共享 CSS / SCSS 文件。
- `baseTableV2`、`File`、`SearchSelectUser` 等组件中的视觉规则。
- 页面生成后的人工评分反馈。

# 控件基础风格

## 1. 定位

GHDI / bigboss-base 的基础控件风格建立在 Element UI 上。新页面不重新设计按钮、输入框、表格、弹窗、标签和分页的基础视觉。

## 2. 来源

- `seed/design.md`
- `.repo-design-index/style/DESIGN.md`
- `.repo-design-index/style/tokens.css`

## 3. 规则

- 基础字号使用 `14px`。
- 小字号使用 `13px`，元信息使用 `12px`。
- 控件默认高度为 `40px`，紧凑场景可用 `36px`、`32px`、`28px`。
- 基础圆角为 `4px`。
- 输入框、选择器、文本域遵循 Element UI 的 hover / focus / disabled 语义。
- 状态色使用 Element UI 的 success / warning / danger / info。

## 4. 生成页面时的注意事项

- 不要用大圆角、强阴影、厚描边重做基础控件。
- 不要把按钮字号、表格字号整体放大。
- 不要用自定义 CSS 覆盖 Element UI 全局状态。
- 单页面局部样式应 scoped，不能污染全局。

## 5. 人工修订记录

- 2026-05-27：由 `seed/design.md` 初始化。

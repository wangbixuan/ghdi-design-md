# Design System of GHDI Console

> 本版在原有企业后台设计基调上，进一步按 Element UI 官方体系补强基础控件规范。  
> 参考依据：
> - [Element UI 官方文档](https://element.eleme.cn/#/zh-CN/component/installation)
> - [Element 官方仓库 README](https://github.com/ElemeFE/element)
> - [Element theme-chalk 变量](https://github.com/ElemeFE/element/blob/dev/packages/theme-chalk/src/common/var.scss)

## 1. Framework Baseline

本项目的页面设计表达必须建立在 Element UI 的控件语义和默认尺寸体系上，再叠加 GHDI 的主题色与业务场景特征。  
换句话说：

- 交互语义遵循 Element UI
- 控件基础尺寸遵循 Element UI
- 状态层级遵循 Element UI
- 品牌色与业务卡片风格允许做项目化扩展

## 2. Global Tokens

### Typography

- 基础字号：`14px`
- 小字号：`13px`
- 迷你字号：`12px`
- 页面标题可提升到 `18px-20px`
- 正文主色：`#606266`
- 标题主色：`#303133`
- 次级文字：`#909399`
- 占位文字：`#C0C4CC`

### Border / Radius

- 基础边框：`1px solid #DCDFE6`
- 浅边框：`#E4E7ED`
- 更浅边框：`#EBEEF5`
- 基础圆角：`4px`
- 小圆角：`2px`

### Background

- 页面底色：`#F5F7FA`
- 控件白底：`#FFFFFF`
- 禁用底色：`#F5F7FA`
- hover 浅底：按 Element 浅灰或浅主色表达

### Functional Colors

- 项目主题主色：保留 `var(--theme-color)`，当前为暖橙
- Success：`#67C23A`
- Warning：`#E6A23C`
- Danger：`#F56C6C`
- Info：`#909399`

说明：

- Element 默认主色是 `#409EFF`
- 本项目允许将主色替换为 GHDI 主题橙，但控件层级、hover、禁用、浅色态仍按 Element 的表达方式推导

## 3. Control Sizes

### Standard Heights

- 默认：`40px`
- medium：`36px`
- small：`32px`
- mini：`28px`

### Padding Logic

- 默认按钮：`12px 20px`
- small / mini 按钮使用更紧凑的纵向 padding
- 输入类控件左右内边距默认 `12px`

## 4. Buttons

### 基础规则

- 统一使用 4px 圆角
- 默认字重接近 `500`
- 默认字号 `14px`
- 按钮状态必须包含：default / hover / active / disabled

### 类型表达

- Primary：主题色底，白字
- Default：白底灰边，hover 时转主题色边框和浅色背景
- Success / Warning / Danger / Info：沿用 Element 功能色语义
- Text：无背景无边框，仅做文字级操作

### 设计要求

- 行内操作优先 Text Button
- 主流程操作优先 Primary
- 危险操作仅在明确语义下使用 Danger
- 不要用自定义大圆角、强阴影、厚描边去破坏 Element 的克制感

## 5. Input / Textarea / Select

### 输入框

- 高度遵循 `40 / 36 / 32 / 28`
- 边框默认 `#DCDFE6`
- hover 边框转深到 `#C0C4CC`
- focus 边框使用主题色
- 禁用态：灰底、灰边、灰字

### 文本域

- 与 Input 同边框规则
- 最小高建议 `80px+`
- 保持 4px 圆角，不做多余视觉包装

### Select

- 单选选择器外观与 Input 对齐
- 下拉面板使用白底、浅边框、轻阴影
- option hover 使用浅灰底
- option selected 使用主题色文本

## 6. Radio / Checkbox / Switch

### Radio

- 尺寸约 `14px`
- 选中态外环与内点使用主题色
- 文本仍然保持 `14px` 正文字号

### Checkbox

- 尺寸约 `14px`
- 选中态：主题色底 + 白色勾
- 边框圆角接近 `2px`

### Switch

- 基础宽高接近 `40px * 20px`
- 开启态使用主题色
- 关闭态使用边框灰
- 滑块圆形、白底、轻阴影

## 7. Tag / Badge / Status

### Tag

- 字号 `12px`
- 高度偏紧凑
- 圆角 `4px`
- 推荐使用浅色底 + 对应语义色文字

### Badge / 状态标签

- 用于数量和状态提醒
- 数量 badge 遵循小尺寸高对比
- 状态 tag 尽量使用浅底色，不建议直接大面积高饱和底色

## 8. Form

### 表单基础

- Label 默认 `14px`
- Label 文本色使用 `#606266`
- 表单项垂直间距稳定，避免忽大忽小
- 校验错误应使用标准错误色与帮助文本位置

### 复杂表单

- 双列表单继续保留，但控件尺寸和间距要回到 Element 规则
- 富文本区和附件区属于业务增强区，不改变基础表单控件语义

## 9. Table

### 基础表达

- 表格文字主色：`#606266`
- 表头文字：`#909399`
- 行 hover：`#F5F7FA`
- 边框和分割线使用 `#EBEEF5` 体系

### 项目规则

- 普通列表页使用 Element 风格浅边线
- 审批型台账表格仍可保留较重边框，但应明确它属于业务文书特例，不可反向污染普通表格

## 10. Dialog / Message / Alert / Notification

### Dialog

- 标题字号约 `18px`
- 内容字号 `14px`
- 基础内边距 `20px`
- 圆角 `4px`
- 阴影应更接近 Element Dialog，而不是业务大卡片阴影

### Alert

- 成功、警告、信息、错误全部使用浅底 + 对应语义色
- 标题可用 `13px`
- 描述建议 `12px`

### Message / Notification

- 用于操作反馈，不应承担复杂内容编辑
- 颜色与语义完全遵循 Element 的 success / warning / info / danger 体系

## 11. Tabs / Dropdown / Pagination

### Tabs

- 激活态使用主题色文字与底部 2px active bar
- 未激活态维持中灰文本

### Dropdown

- 白底浮层
- 浅边框 + 轻阴影
- item hover 使用浅主色底或浅灰底

### Pagination

- 字号 `13px`
- 单元高度约 `28px`
- 激活页码高亮主题色文字
- 非激活页保持简洁，不做大块强填充

## 12. Project-Level Rule

GHDI 项目里要做的是：

- 保持 Element UI 控件的基础语义和默认秩序
- 在页面层面用卡片、指标、图表、审批导航形成业务特征
- 不要在基础控件上做过度“再设计”

可以增强的层：

- 主题色替换
- 卡片结构
- dashboard 排版
- 审批型文书布局
- 业务态状态标签

不应随意改变的层：

- 控件默认尺寸体系
- 输入类控件 hover / focus / disabled 的规则
- 表单标签和帮助文本层级
- 表格 hover 与表头秩序
- 弹窗和反馈类控件的基础表达

## 13. Deliverables in This Repo

本次补强已落地到：

- `pages/styles.css`
- `pages/controls.html`
- 现有各页面共享的按钮、输入、表格、标签、弹窗、分页等基础样式

建议后续所有新页面继续复用这套控件层，不要再单独发明一套基础 UI。

---
name: GHDI Bigboss Console
category: enterprise-backoffice
framework: Vue2
uiBase: Element UI
sourceSeeds:
  - seed/design.md
  - seed/theme-color-logic.md
tokens:
  color:
    theme: var(--theme-color)
    line: var(--line-color)
    textTitle: "#303133"
    textBody: "#606266"
    textSecondary: "#909399"
    textPlaceholder: "#C0C4CC"
    border: "#DCDFE6"
    borderLight: "#E4E7ED"
    borderLighter: "#EBEEF5"
    pageBg: "#F5F7FA"
    surface: "#FFFFFF"
    success: "#67C23A"
    warning: "#E6A23C"
    danger: "#F56C6C"
    info: "#909399"
  typography:
    body: 14px
    small: 13px
    meta: 12px
    pageTitle: 18px-20px
  radius:
    control: 4px
    small: 2px
  controlHeight:
    default: 40px
    medium: 36px
    small: 32px
    mini: 28px
---

# GHDI Console Design Memory

## 1. Overview

GHDI / bigboss-base 是一个 Vue2 + Element UI 企业后台系统。新页面必须继承 Element UI 的控件语义、GHDI 的主题变量，以及高密度、表格优先、面向业务操作的页面模式。

设计目标不是做新的视觉品牌，而是让 Codex 生成的页面像现有系统的一部分：

- 克制、专业、信息密度高。
- 控件层遵循 Element UI。
- 主题强调使用 `var(--theme-color)` / `var(--line-color)`。
- 页面层通过表格、搜索、弹窗、抽屉、附件、审批流等业务结构体现系统特征。

## 2. Colors

基础颜色遵循 Element UI 的文字、边框、背景和状态色体系：

- 标题文字：`#303133`
- 正文文字：`#606266`
- 次级文字：`#909399`
- 占位文字：`#C0C4CC`
- 基础边框：`#DCDFE6`
- 浅边框：`#E4E7ED`
- 表格分割线 / 更浅边框：`#EBEEF5`
- 页面底色：`#F5F7FA`
- 控件 / 卡片白底：`#FFFFFF`

主题色不应在页面里硬编码。需要表达项目主色、激活态、强调线、标题竖线时，优先使用：

```css
var(--theme-color)
var(--line-color)
```

功能状态色沿用 Element UI：

- success：`#67C23A`
- warning：`#E6A23C`
- danger：`#F56C6C`
- info：`#909399`

## 3. Typography

- 基础字号：`14px`
- 小字号：`13px`
- 元信息 / 标签字号：`12px`
- 页面标题：`18px` 到 `20px`
- 表格、表单、按钮不要随意放大字号。
- 紧凑工具栏、表格行操作、标签类信息可以使用 `12px` 到 `13px`。

## 4. Layout

系统页面以桌面企业后台为主，布局应优先服务重复操作和快速扫描：

- 列表管理页以表格为主，不把记录改成装饰卡片网格。
- 搜索区、工具栏、表格、分页应形成稳定顺序。
- 新增 / 编辑 / 详情优先使用弹窗或抽屉，避免轻量任务跳转整页。
- 复杂配置页可以使用两列表单 + 主编辑区 + 辅助抽屉。
- Dashboard 只用于真正的统计概览，不反向污染 CRUD 页面。

## 5. Elevation & Depth

- 普通业务页面优先使用边框、分割线和浅背景区分层级。
- 不主动增加大阴影、玻璃态、强渐变。
- Dialog / Drawer 采用 Element UI 默认层级表达。
- 业务提醒卡可以比普通卡片更突出，但不应抢过主流程。

## 6. Shapes

- 控件基础圆角：`4px`
- Checkbox 等小控件可接近 `2px`
- 不使用大圆角胶囊按钮替代 Element UI 常规按钮。
- 卡片和区块圆角保持克制，除非既有组件本身已经定义。

## 7. Components

组件使用策略以 `COMPONENT_REGISTRY.json` 为准。风格层补充以下约束：

- 新列表页统一优先 `baseTableV2`。
- `TableBase` 仅用于历史页面维护，不用于新页面。
- 普通附件使用 `File`，PDF 专用上传才考虑 `uploadPdfFile`。
- 人员选择优先 `SearchSelectUser`。
- 部门选择优先 `newSelectDepart`。
- 富文本编辑优先 `EditorVue`。

不要为了视觉变化重复造组件。组件已能覆盖需求时，生成代码应复用正式索引组件。

## 8. Interaction & States

- 按钮必须有清晰主次；主流程使用 Primary，行内操作使用 Text Button。
- 删除、作废、清空等危险动作必须二次确认。
- 表格行 hover、输入 focus、禁用态、loading、empty 应遵循 Element UI 语义。
- 超过三个行级操作时，优先保留高频操作，其余进入 `el-dropdown`。
- 保存、提交、预览、导入等流程型动作应给出明确反馈。

## 9. Theme Logic

主题色链路来自旧有探索 `seed/theme-color-logic.md`：

```txt
系统默认主题色 / 菜单节点颜色
-> App 和顶部菜单写入 CSS 变量
-> --theme-color / --line-color
-> 共享组件和页面强调样式消费变量
```

实际优先级：

1. 当前激活菜单的 `item.color`
2. 本地缓存中的 `customizedColor`
3. 本地缓存中的 `systemColor`
4. 系统配置中的 `ext.systemColor`

生成页面时：

- 需要跟随当前页面主题的颜色使用 CSS 变量。
- 状态色仍使用 Element UI 语义色，不强行改成主题色。
- 不要在局部页面写死主色，除非是已有业务状态或图片资源。

## 10. Do's and Don'ts

Do:

- 使用 Element UI 的控件尺寸、交互状态和信息层级。
- 使用 `baseTableV2` 承载新列表页。
- 使用弹窗 / 抽屉承载轻量编辑和关联配置。
- 用主题变量表达页面强调。
- 保持信息密度和业务操作效率。

Don't:

- 不要把 CRUD 页面做成营销页。
- 不要用大 hero、装饰渐变、卡片瀑布流替代表格。
- 不要新增一套脱离 Element UI 的基础控件风格。
- 不要为了视觉整洁隐藏关键操作。
- 不要为单个页面污染全局样式。
- 不要把审批文书类重边框风格扩散到普通列表页。

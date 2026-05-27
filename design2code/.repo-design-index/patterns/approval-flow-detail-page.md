# Design MD: Approval Flow Detail Page

> Source: `bigboss-wedo/src/module/main/ema/assetMaintenance/retirement/table.vue`

## 1. Page Positioning

这是典型的审批流详情 / 申请单详情页面。它围绕一个资产处置申请组织页面，包括基础信息、技术鉴定人员、资产明细、审批流程、暂存/提交/重新申请和导出申请。

它不是普通 CRUD 列表页，也不是简单详情页。它的核心是“业务申请单在审批生命周期中的填写、查看和流转”。

## 2. Visual Tone

- 企业审批文书感强。
- 信息密度高。
- 使用表格式边框组织字段。
- 标题居中，区块标题用 `var(--line-color)` 竖线强调。
- 右侧固定状态和锚点导航强化流程定位。
- 主色通过 `var(--theme-color)` 表达当前菜单/系统主题。

## 3. Layout Structure

### Page Shell

- 外层根据状态切换 `page` / `page-not`。
- 可操作状态下右侧预留固定导航区域。
- 正文使用 `#pdfDom`，便于导出申请 PDF。

### Right Anchor Navigation

- 状态块展示当前审批状态。
- 锚点导航对应页面区块。
- 操作按钮包括暂存、提交、重新申请、导出申请。

### Main Document

- 居中组织名和申请标题。
- 基础信息区。
- 技术鉴定小组人员区。
- 资产列表区。
- 审批流程区。

### Auxiliary Dialogs

- 部门选择弹窗。
- 资产选择弹窗由子组件承载。

## 4. Core Components

- `File`：附件上传和只读展示。
- `searchPersonnel`：当前页面使用的旧版人员搜索组件。新页面可评估改用 `SearchSelectUser`。
- `NeedList`：业务明细子表，负责资产选择、删除、合计和导出 Excel。
- `WorkFlowDetail`：审批流程初始化、展示和审批回调。
- `el-descriptions`：只读详情态基础信息展示。
- `el-dialog`：辅助选择任务。

## 5. Interaction Rules

- `modelType` 决定编辑/详情/重新申请。
- `isEdit` 决定编辑态和只读态。
- 新建时初始化申请日期、审批流和申请部门。
- 非新建时通过 `queryById` 拉取详情并初始化审批流。
- 提交前必须校验必填字段、技术小组人员、资产明细和特定附件要求。
- 提交和重新申请都需要二次确认。
- 审批操作回调后重新拉取详情。
- 导出申请以 `#pdfDom` 为目标容器。

## 6. Data Rules

- 金额字段页面按元展示，提交前乘以 100。
- 附件在页面中是数组，提交前用 `###` 拼接。
- 明细列表提交前映射为接口需要的字段。
- 审批流 `flowData.projectName` 在提交前由申请主题填充。
- `flowData.bizCode` 是审批业务编号，不能随意生成。

## 7. Visual Detail Rules

- 区块标题使用 `.table-header-box`、`.line`、`.table-header-title`。
- `.line` 使用 `var(--line-color)`。
- 编辑表格顶部使用 `2px solid var(--line-color)`。
- 表格字段字号偏小，约 `13px`。
- 表格边框使用 `#ccc`，这是审批文书特例。
- 状态块完成态使用绿色，进行态使用主题色。
- 右侧锚点导航使用阴影卡片，但尺寸固定、信息克制。

## 8. Reusable Design Pattern

该页面可沉淀为：

```txt
approval-flow-detail-page
```

可复用结构：

- 状态 + 锚点导航
- 可导出的申请正文
- 基础信息编辑/只读双态
- 业务明细子表
- 参与人员选择
- 审批流详情
- 暂存 / 提交 / 重新申请 / 导出

## 9. Anti-patterns

- 不要把它当普通列表页。
- 不要用 `baseTableV2` 替代正文中的审批文书表格。
- 不要把该模式中的重边框扩散到普通 CRUD 页面。
- 不要把 `WorkFlowDetail` 放在没有审批上下文的页面里。
- 不要跳过提交前的业务校验和确认。

## 10. AI Generation Prompt

> Design an enterprise approval-flow detail page for an asset retirement application. The page should have a right fixed status and anchor navigation, a PDF-exportable document body, section headers with theme-color vertical lines, an editable/read-only basic information section, attachment upload, technical group member selection, an asset detail subtable, and a workflow detail section. Keep the page dense, document-like, and operational. Use `WorkFlowDetail` for the approval flow and `File` for attachments. Do not style it like a normal CRUD list page.

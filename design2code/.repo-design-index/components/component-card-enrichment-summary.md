# 组件说明卡片批量补全摘要

生成时间：2026-05-27

## 本次范围

本次基于 `ghdi-component-scan` 流程，对 `bigboss-base` 中 expose 出来的组件说明卡片做全量语义补全。

结果：

- expose 组件数：63
- 组件 card 数：63
- `codex-drafted`：63
- `initialized`：0

## 处理方式

本次补全使用以下信息来源：

- `.repo-design-index/components/generated/component-scan-summary.json`
- `bigboss-base/src/components/expose.js`
- 各组件源码文件
- `bigboss-base/src` 下的 `.vue` / `.js` 引用扫描
- 已人工确认效果的首批样例：
  - `baseTableV2`
  - `File`
  - `SearchSelectUser`
  - `uploadPdfFile`

## 重要说明

首批样例组件经过更细的源码和引用阅读，说明更具体。其余组件采用批量补全方式，已标注：

- 组件定位
- 适用场景
- 不适用场景
- 常用 props
- 常用事件
- 常用插槽
- 典型用法
- 生成页面时注意事项
- 引用样例数量

部分页面级、模块级组件已经在 card 中标注“不建议作为普通表单控件或小组件随意嵌入”。

## 文件名冲突处理

`ViewFile` 和 `viewFile` 是两个不同 expose 组件，但在 Windows 文件系统下大小写文件名会冲突。

当前 card 文件为：

- `ViewFile`：`.repo-design-index/components/cards/ViewFile.md`
- `viewFile`：`.repo-design-index/components/cards/viewFile-form-viewFile.md`

`.design-agent/scripts/generate-component-cards.mjs` 已更新，后续遇到大小写冲突会自动追加路径后缀。

## 后续人工评审建议

优先评审以下类型：

- 页面级组件：如 `UserManage`、`MenuManage`、`DepartPage`、`MeetingManage`
- 流程类组件：如 `FlowTemplate`、`FlowInstance`、`FlowUserRule`、`WorkFlowDetail`
- 文件/预览类组件：如 `ViewFile`、`viewFile`、`viewWord`、`PdfCard`
- 旧版或可能被替代的组件：如 `TableBase`、`searchPersonnel`、`selectDepart`

人工评审后，可用 `ghdi-component-card-feedback` 将自然语言反馈沉淀回对应 card。

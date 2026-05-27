# approval-flow-detail-page

## 1. 定位

审批流详情页 / 申请单详情页模式，用于承载“业务申请表 + 明细子表 + 附件 + 参与人员 + 审批流程 + 状态导航 + 导出”的复合页面。

该模式比 `form-ledger-page` 更具体：它不是普通台账表单，而是围绕审批流生命周期组织的业务申请详情。

## 2. 适用需求

- 资产处置 / 采购 / 报修 / 申请类审批详情。
- 同一个页面需要支持新增、暂存、提交、详情、重新申请等状态。
- 页面中既有可编辑申请表，也有只读详情态。
- 页面尾部或指定区块需要展示 `WorkFlowDetail`。
- 页面需要导出申请 PDF。
- 页面包含业务明细子表，并允许在弹窗中选择明细对象。

## 3. 推荐结构

```txt
页面容器
├── 右侧固定锚点导航 / 状态块
├── 可导出的正文容器 #pdfDom
│   ├── 居中申请标题
│   ├── 基础信息区
│   │   ├── 编辑态：table + el-form + Element 控件
│   │   └── 只读态：el-descriptions
│   ├── 参与人员区
│   ├── 业务明细子表区
│   └── 审批流程区 WorkFlowDetail
└── 辅助弹窗
    ├── 部门选择
    └── 明细对象选择
```

## 4. 推荐组件

- `WorkFlowDetail`：审批流展示和审批操作回调。
- `File`：附件上传和只读回显。
- `SearchSelectUser`：新页面优先使用的人员选择组件。
- `searchPersonnel`：仅在维护旧页面或保持既有页面一致时使用。
- `el-descriptions`：详情只读态展示。
- `el-dialog`：部门选择、资产选择等辅助任务层。

## 5. 数据流和状态流

- `modelType` 决定新增、编辑、详情、重新申请等模式。
- `isEdit` 决定表单使用编辑态还是只读态。
- `applyData` 是页面主业务对象。
- `flowData` 保存审批流初始化参数，例如 `bizCode`、`flowId`、`projectName`。
- `handleData()` 在提交前做字段转换，例如金额乘以 100、附件数组拼接、明细列表映射。
- `WorkFlowDetail.initFlowData(...)` 用于初始化流程，提交时可生成或重启流程。
- `optFlow()` 回调后重新拉取详情，保持审批状态同步。

## 6. 典型证据

真实页面：

```txt
bigboss-wedo/src/module/main/ema/assetMaintenance/retirement/table.vue
```

相关样式：

```txt
bigboss-wedo/src/css/applyTable.css
```

子表组件：

```txt
bigboss-wedo/src/module/main/ema/assetMaintenance/retirement/module/NeedList.vue
```

## 7. 生成页面时的注意事项

- 这是审批申请详情模式，不要套用普通 `list-management-page`。
- 正文区可以使用重边框表格式布局，这是审批文书特例，不应扩散到普通列表页。
- 编辑态和只读态要分开：编辑态可使用 `el-form + table`，只读态优先 `el-descriptions`。
- `WorkFlowDetail` 应放在明确的“审批流程”区块，不要作为普通小组件插入表单中间。
- 涉及金额时要注意前后端单位转换，常见是页面元、接口分。
- 附件字段建议页面内为数组，提交前按接口要求转换。
- 提交、重新申请、删除明细等关键动作必须确认或校验。
- 导出 PDF 时应围绕稳定的正文容器，例如 `#pdfDom`。

## 8. 和其他模式的关系

- 上位通用模式：`form-ledger-page`
- 相关但不同：`list-management-page`
- 相关组件：`WorkFlowDetail`、`File`、`SearchSelectUser`

## 9. 状态

`candidate-from-real-page`

## 10. 人工修订记录

- 2026-05-27：由真实页面 `assetMaintenance/retirement/table.vue` 扫描初始化。

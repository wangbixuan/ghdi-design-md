# 资产处置审批详情页 Evidence

## 页面路径

```txt
bigboss-wedo/src/module/main/ema/assetMaintenance/retirement/table.vue
```

## 辅助文件

```txt
bigboss-wedo/src/module/main/ema/assetMaintenance/retirement/data.js
bigboss-wedo/src/module/main/ema/assetMaintenance/retirement/module/NeedList.vue
bigboss-wedo/src/css/applyTable.css
```

## 识别出的页面模式

候选模式：

```txt
approval-flow-detail-page
```

上位模式：

```txt
form-ledger-page
```

## 关键结构

- 右侧固定状态块和锚点导航。
- `#pdfDom` 可导出正文容器。
- 基础信息区支持编辑态和只读态。
- 技术鉴定小组人员选择。
- 资产明细子表 `NeedList`。
- 审批流程区 `WorkFlowDetail`。
- 暂存、提交、重新申请、导出申请。

## 关键组件

- `File`
- `WorkFlowDetail`
- `searchPersonnel`
- `NeedList`
- `el-descriptions`
- `el-dialog`

## 关键业务流

- `modelType` 控制页面模式。
- `isEdit` 控制编辑/只读展示。
- `handleData()` 转换提交数据。
- `commitEvent()` 校验并发起审批。
- `reapply()` 重新申请。
- `optFlow()` 审批回调后刷新详情。

## 证据判断

该页面代表当前系统中的审批流详情页模式，适合沉淀为候选页面模式。需要人工确认后，可由 `ghdi-design-memory-build` 加入 `PATTERN_REGISTRY.json`。

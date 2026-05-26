# 组件索引候选评审表

> 来源：`.repo-design-index/components/generated/component-scan-summary.json`  
> 说明：这是给人工评审和 Codex 语义审核使用的候选表，不是正式组件索引。

## 1. 扫描摘要

```txt
扫描文件数: 374
Vue 文件数: 224
expose 导出组件数: 60
已进入正式索引: 10
待评审候选组件: 50
```

## 2. 已在正式索引中的组件

| Component | Path | Category | Suggested status | Props sample |
|---|---|---|---|---|
| `File` | `src/components/form/uploadFile/newFile.vue` | `upload-preview` | `preferred` |  |
| `EditorVue` | `src/components/form/EditorVue.vue` | `rich-text` | `preferred` | `content` |
| `WorkFlowDetail` | `src/components/flow/WorkFlowDetail.vue` | `workflow-runtime` | `specialized` |  |
| `TableBase` | `src/components/baseTable/TableBase.vue` | `table-list-container` | `legacy` | `value` |
| `baseTableV2` | `src/components/baseTableV2/index.vue` | `table-list-container` | `preferred` |  |
| `selectDepart` | `src/components/form/selectDepart.vue` | `department-selector` | `legacy` | `value`, `disabled` |
| `newSelectDepart` | `src/components/form/newSelectDepart.vue` | `department-selector` | `preferred` | `depart` |
| `UTag` | `src/components/form/UTag.vue` | `status-tag` | `allowed` | `label` |
| `SearchSelectUser` | `src/components/form/SearchSelectUser.vue` | `person-selector` | `preferred` | `selectList` |
| `actionTitle` | `src/components/form/actionTitle.vue` | `page-title` | `allowed` |  |

## 3. 待评审候选组件

| Component | Path | Category | Suggested status | Props sample |
|---|---|---|---|---|
| `uploadPdfFile` | `src/components/form/uploadPdf/index.vue` | `upload-preview` | `needs-human-review` | `value` |
| `ViewFile` | `src/components/form/uploadFile/module/ViewFile.vue` | `upload-preview` | `needs-human-review` | `attachments` |
| `PicPreview` | `src/components/PicPreview.vue` | `needs-classification` | `needs-human-review` | `src` |
| `DepartPage` | `src/module/admin/DepartManage/index.vue` | `needs-classification` | `specialized` | `selectDepart` |
| `UserManage` | `src/module/admin/UserManage/index.vue` | `needs-classification` | `specialized` | `userType` |
| `SelectUser` | `src/module/admin/SelectUser/index.vue` | `needs-classification` | `specialized` | `deleteData` |
| `SelectProject` | `src/module/admin/SelectProject/index.vue` | `needs-classification` | `specialized` | `selectList` |
| `MultipleChoice` | `src/module/admin/SelectProject/multipleChoice.vue` | `needs-classification` | `specialized` | `selectList` |
| `chartsFunnel` | `src/components/charts/funnel.vue` | `chart` | `needs-human-review` | `option` |
| `chartsLine` | `src/components/charts/line.vue` | `chart` | `needs-human-review` | `option` |
| `countTo` | `src/components/count-to/count-to.vue` | `needs-classification` | `needs-human-review` | `init` |
| `Tabs` | `src/components/tabs.vue` | `needs-classification` | `needs-human-review` | `tabs` |
| `PersonCard` | `src/components/PersonCard.vue` | `needs-classification` | `needs-human-review` | `username` |
| `FlowTemplate` | `src/components/flow/template/index.vue` | `workflow` | `needs-human-review` | `appCode` |
| `FlowInstance` | `src/components/flow/instance/index.vue` | `workflow` | `needs-human-review` | `appCode` |
| `Flowchart` | `src/components/mvpFlow/Diagram.vue` | `needs-classification` | `specialized` | `readOnlyMode` |
| `BaseUserInfo` | `src/components/user/BaseUserInfo.vue` | `needs-classification` | `needs-human-review` |  |
| `CarouselList` | `src/components/bigboss-app/app-infoDrawer/components/table.vue` | `app-shell` | `needs-human-review` | `tableData` |
| `mindMap` | `src/components/mindMap/index.vue` | `needs-classification` | `specialized` | `readOnlyMode` |
| `BizData` | `src/module/admin/BizData/components/detail.vue` | `needs-classification` | `specialized` | `btnTile` |
| `UCard` | `src/components/card/index.vue` | `needs-classification` | `needs-human-review` | `width`, `height`, `borderColor`, `backgroundImage`, `backgroundColor`, `rounded`, `select` |
| `searchPersonnel` | `src/components/form/searchPersonnel.vue` | `form-control` | `needs-human-review` | `selectList` |
| `Tags` | `src/components/form/Tags.vue` | `form-control` | `needs-human-review` | `tagList` |
| `PdfCard` | `src/components/pdfCard/index.vue` | `upload-preview` | `needs-human-review` | `width`, `height`, `pdfList` |
| `iconPicker` | `src/components/iconPicker/index.vue` | `needs-classification` | `needs-human-review` |  |
| `RankingTag` | `src/components/form/RankingTag.vue` | `form-control` | `needs-human-review` | `imageUrl` |
| `depart` | `src/components/form/depart.vue` | `form-control` | `needs-human-review` | `value`, `disabled` |
| `workFlow` | `src/components/workFlow/setting.vue` | `workflow` | `specialized` | `modalType` |
| `DepartmentSelection` | `src/components/form/departmentSelection.vue` | `form-control` | `needs-human-review` | `showDepart` |
| `Tab` | `src/components/form/Tabs.vue` | `form-control` | `needs-human-review` | `tabs` |
| `PersonalResume` | `src/components/form/personalResume/index.vue` | `form-control` | `needs-human-review` |  |
| `viewFile` | `src/components/form/viewFile.vue` | `form-control` | `needs-human-review` |  |
| `Roll` | `src/components/bigboss-app/app-infoDrawer/components/table.vue` | `app-shell` | `needs-human-review` | `tableData` |
| `Excel` | `src/components/excel/index.vue` | `needs-classification` | `needs-human-review` | `templateUrl` |
| `uSwiper` | `src/components/uSwiper/index.vue` | `needs-classification` | `needs-human-review` |  |
| `MenuManage` | `src/module/admin/MenuManage/menuManage.vue` | `needs-classification` | `specialized` | `dev` |
| `currentYearMonth` | `src/components/form/currentYearMonth/index.vue` | `form-control` | `needs-human-review` |  |
| `selectDepartUser` | `src/components/form/selectDepartUser/index.vue` | `form-control` | `needs-human-review` | `disabled` |
| `viewWord` | `src/components/form/viewWord/index.vue` | `form-control` | `needs-human-review` | `attachTitle` |
| `CarouselVue` | `src/components/form/CarouselVue.vue` | `form-control` | `needs-human-review` | `value` |
| `quarter` | `src/components/form/quarter.vue` | `form-control` | `needs-human-review` | `quarterValue` |
| `HtmlView` | `src/components/form/HtmlView.vue` | `form-control` | `needs-human-review` | `html` |
| `FlowUserRule` | `src/module/open/flow/user_rule/index.vue` | `workflow` | `needs-human-review` |  |
| `QaDetail` | `src/module/order/work/module/order_qa_detail.vue` | `needs-classification` | `specialized` |  |
| `documentDesc` | `src/module/admin/doc/documentDesc.vue` | `needs-classification` | `specialized` |  |
| `HrProfile` | `src/components/hrProfile/index.vue` | `needs-classification` | `specialized` | `userName` |
| `NoticeOverviewConfig` | `src/components/notice/module/index.vue` | `notice-business` | `needs-human-review` |  |
| `Description` | `src/module/admin/systemDescription/index.vue` | `needs-classification` | `specialized` | `isInit` |
| `businessConf` | `src/components/form/businessConfiguration/index.vue` | `form-control` | `needs-human-review` | `isInit` |
| `MeetingManage` | `src/module/infor-syn/meeting/index.vue` | `needs-classification` | `needs-human-review` |  |

## 4. 提升到正式索引的规则

只有当候选组件对后续页面生成有明确复用价值时，才建议提升到 `COMPONENT_REGISTRY.json`。

提升前必须补全以下字段：

- stable path
- status: `preferred`, `allowed`, `legacy`, `specialized`, or `avoid`
- category
- purpose
- key props/events
- keywords
- examples
- generation notes

任何 `preferred` 或 `avoid` 决策都必须经过人工确认。

## 5. 给 Codex 的批量评审建议

建议按类别分批处理，而不是一次性处理所有组件：

- `table-list-container`
- `upload-preview`
- `form-control`
- `workflow`
- `notice-business`
- `app-shell`
- `chart`
- `needs-classification`

每一批输出中文评审结论，并明确哪些可以进入正式索引，哪些需要继续人工确认。

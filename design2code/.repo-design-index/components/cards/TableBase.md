# TableBase

> 说明：这是 Codex 根据源码和引用扫描批量补充后的组件说明 card，待人工审阅。

## 1. 索引元信息

| 字段 | 值 |
|---|---|
| 组件名 | `TableBase` |
| 暴露来源 | `expose.js` |
| importPath | `./baseTable/TableBase.vue` |
| 源码路径 | `bigboss-base/src/components/baseTable/TableBase.vue` |
| 说明状态 | `human-reviewed` |
| 推荐状态 | `deprecated-for-new-pages` |
| 替代组件 | `baseTableV2` |
| 引用样例数量 | `8` |

## 2. 组件定位

旧版基础表格组件，通过 value 等配置。该组件仅用于维护历史页面，新页面和新生成页面不再推荐使用。

源码位于 `bigboss-base/src/components/baseTable/TableBase.vue`。扫描到 8 个直接或间接引用样例。

团队人工反馈已明确：表格类页面统一使用新表格组件 `baseTableV2`。

## 3. 适用场景

- 仅适合维护仍然依赖 `TableBase` 的历史页面。
- 仅在已有页面局部修 bug、补字段、保持旧页面兼容时保留。

## 4. 不适用场景

- 新列表页、管理页、配置页、业务查询页都不推荐使用 `TableBase`。
- 新页面统一使用 `baseTableV2`。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 页面生成时不要为了复刻旧引用样例而继续使用 `TableBase`。

## 5. 常用 Props

- `value`：源码中识别到的入参，使用前应结合业务含义传值。
- `type`：源码中识别到的入参，使用前应结合业务含义传值。
- `required`：源码中识别到的入参，使用前应结合业务含义传值。
- `tableData`：源码中识别到的入参，使用前应结合业务含义传值。
- `tableColumns`：源码中识别到的入参，使用前应结合业务含义传值。
- `searchForm`：源码中识别到的入参，使用前应结合业务含义传值。
- `searchSelectData`：源码中识别到的入参，使用前应结合业务含义传值。
- `pageSizeOpts`：源码中识别到的入参，使用前应结合业务含义传值。
- `searchCriteria`：源码中识别到的入参，使用前应结合业务含义传值。
- `sortRuleList`：源码中识别到的入参，使用前应结合业务含义传值。
- `showSearch`：源码中识别到的入参，使用前应结合业务含义传值。
- `isShowYear`：源码中识别到的入参，使用前应结合业务含义传值。
- `showTableLoading`：源码中识别到的入参，使用前应结合业务含义传值。
- `border`：源码中识别到的入参，使用前应结合业务含义传值。
- `isShowAddBtn`：源码中识别到的入参，使用前应结合业务含义传值。
- `exportFileName`：源码中识别到的入参，使用前应结合业务含义传值。
- `showExportBtn`：源码中识别到的入参，使用前应结合业务含义传值。
- `tableTitle`：源码中识别到的入参，使用前应结合业务含义传值。
- `customColumns`：源码中识别到的入参，使用前应结合业务含义传值。
- `exportFormTitle`：源码中识别到的入参，使用前应结合业务含义传值。
- `id`：源码中识别到的入参，使用前应结合业务含义传值。
- `name`：源码中识别到的入参，使用前应结合业务含义传值。
- `btnTile`：源码中识别到的入参，使用前应结合业务含义传值。
- `drop`：源码中识别到的入参，使用前应结合业务含义传值。
- `addTitle`：源码中识别到的入参，使用前应结合业务含义传值。
- `exportData`：源码中识别到的入参，使用前应结合业务含义传值。

## 6. 常用事件

- `handleSearch`：组件会向父级抛出的事件。
- `cell-click`：组件会向父级抛出的事件。
- `changePage`：组件会向父级抛出的事件。
- `changeSize`：组件会向父级抛出的事件。
- `input`：组件会向父级抛出的事件。
- `handleAdd`：组件会向父级抛出的事件。
- `reset`：组件会向父级抛出的事件。
- `getExportData`：组件会向父级抛出的事件。
- `on-select`：组件会向父级抛出的事件。
- `on-select-all`：组件会向父级抛出的事件。
- `on-selection-change`：组件会向父级抛出的事件。
- `businessEvent`：组件会向父级抛出的事件。
- `item`：组件会向父级抛出的事件。

## 7. 常用插槽

- `slotSearch`
- `slotTableTop`
- `slotBtn`
- `slotIcon`

## 8. 典型用法

```vue
<!-- 历史页面维护时可能看到 TableBase，新页面不要照抄 -->
<TableBase />
```

真实引用样例文件：
- `bigboss-base/src/components/form/personalResume/index.vue`
- `bigboss-base/src/components/form/personalResume/PersonalPerformance/module/EngineeringAwards.vue`
- `bigboss-base/src/components/form/personalResume/PersonalPerformance/module/Patent.vue`
- `bigboss-base/src/components/form/personalResume/PersonalPerformance/module/PersonalHonor.vue`

## 9. 生成页面时的注意事项

- Codex 生成新页面时不要选择 `TableBase`。
- 表格类页面、列表管理页、配置管理页统一使用 `baseTableV2`。
- 只有在用户明确要求维护历史 `TableBase` 页面时，才读取该组件源码并沿用旧写法。
- 如果旧页面需要迁移或重构，优先规划从 `TableBase` 迁移到 `baseTableV2`。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## 10. 人工修订记录

- 2026-05-27：人工确认 `TableBase` 已不推荐使用，新表格类页面统一使用 `baseTableV2`。
- 2026-05-27：Codex 批量读取源码、props、事件和引用样例后补充，待人工评审。

# baseTableV2

> 说明：这是 Codex 根据源码和真实引用样例补充后的组件说明 card，待人工审阅。

## 1. 索引元信息

| 字段 | 值 |
|---|---|
| 组件名 | `baseTableV2` |
| 暴露来源 | `expose.js` |
| importPath | `./baseTableV2/index.vue` |
| 源码路径 | `bigboss-base/src/components/baseTableV2/index.vue` |
| 初步分类 | `table-list-container` |
| 说明状态 | `human-reviewed` |
| 推荐状态 | `preferred` |

## 2. 组件定位

`baseTableV2` 是系统里最重要的列表页容器组件。它不是单纯的 `el-table` 包装，而是把搜索区、表格、分页、列配置、导出、批量选择、附件列、极简模式、卡片/图表切换等列表页能力组合在一起。

生成后台管理类、业务配置类、通知/待办/工单列表类页面时，优先考虑使用它承载页面主体。

## 3. 适用场景

- 标准“查询条件 + 表格 + 分页 + 操作列”的管理列表页。
- 需要读取后端配置表头的页面，通常会传 `id` 和 `name`。
- 需要自定义单元格渲染的列表页，通过 `v-slot:<columnKey>` 写操作按钮、链接、状态展示等。
- 需要新增按钮、导出按钮、列配置、附件列或多选能力的列表页。

## 4. 不适用场景

- 纯展示小表格、弹窗内简单表格，直接用 `el-table` 更轻。
- 完全自定义布局、非分页、非查询驱动的复杂页面。
- 需要从零定义表格交互但不想接入系统列配置机制的场景。

## 5. 常用 Props

- `tableData: Array`：表格数据，通常来自接口 `res.records`。
- `tableColumns: Object`：本地列配置。很多页面只传 `id`，让组件读取远程列配置。
- `searchForm: Object`：搜索和分页对象，常见字段有 `pageNum`、`pageSize`、`total`。
- `searchCriteria: Array`：搜索条件配置，用于生成顶部搜索区。
- `searchSelectData: Object`：搜索项下拉数据。
- `tableTitle: String`：表格标题，默认 `一览表`。
- `id: String`：表格配置 ID，影响远程列配置读取和配置保存。
- `name: String`：表格配置名称。
- `isShowAddBtn: Boolean`：是否显示新增按钮。
- `addTitle: String`：新增按钮文案，默认 `新 增`。
- `showExportBtn: Boolean`：是否显示导出入口。
- `showPage: Boolean`：是否显示分页。
- `showTile: Boolean`：是否显示表头标题。
- `cptCode: String`：附件列使用的文件上传组件编码。
- `remoteParams: Object`：远程搜索项额外参数。

## 6. 常用事件

- `handleSearch(searchForm)`：搜索、分页变化、重置后触发。页面通常在这里合并业务固定参数并请求列表。
- `handleAdd`：点击新增按钮触发。
- `changePage(pageCurrent)`：页码变化。
- `changeSize(pageSize)`：每页条数变化。
- `reset`：重置搜索条件。
- `on-selection-change(rows)`：多选变化。
- `on-select(row)`：选择单行。
- `on-select-all(rows)`：全选。
- `cell-click(value, key, row)`：点击可交互单元格。
- `getExportData(searchForm)`：需要外部提供导出数据时触发。

## 7. 常用插槽

- `slotBtn`：表格标题左侧/新增按钮附近的业务按钮区。
- `sloRight`：表格右侧工具区的自定义内容。注意源码里名字是 `sloRight`，不是 `slotRight`。
- `slotSearch`：搜索区扩展内容。
- `bizContent`：搜索区和表格头之间的业务内容。
- 动态列插槽：`v-slot:<columnKey>="scope"`，当列配置中对应列需要自定义渲染时使用，最常见的是 `action`、标题链接列、状态列。

## 8. 典型用法

来自待办列表的简化用法：

```vue
<baseTableV2
  :tableData="data"
  :searchForm="searchForm"
  :tableTitle="name"
  :id="id"
  :name="name"
  :isShowAddBtn="false"
  @handleSearch="handleSearch">
  <template v-slot:action="scope">
    <el-button type="text" @click="toHandle(scope.row)">去处理</el-button>
  </template>
</baseTableV2>
```

带列配置和自定义标题列的用法：

```vue
<baseTableV2
  :tableData="data"
  :tableColumns="tableColumns"
  :searchCriteria="searchCriteria"
  :searchForm="searchForm"
  :tableTitle="tableTitle"
  :id="id"
  :name="name"
  @handleSearch="handleSearch">
  <template v-slot:title="scope">
    <el-link @click="onDetail(scope.row)">{{ scope.row.title }}</el-link>
  </template>
  <template v-slot:action="scope">
    <el-button type="text" @click="onDelete(scope.row)">删 除</el-button>
  </template>
</baseTableV2>
```

## 9. 生成页面时的注意事项

- 生成列表页时，优先组织 `searchForm`、`tableData`、`id`、`name` 和 `handleSearch`，这是最小可运行骨架。
- `handleSearch` 收到的是组件处理后的搜索/分页对象，页面里要重新补业务固定参数，例如状态、类型、应用编码等。
- 操作列不要在 `tableColumns` 里硬编码按钮，应该用 `v-slot:action`。
- 如果页面不需要新增按钮，显式传 `:isShowAddBtn="false"`，避免出现无效按钮。
- 如果使用远程列配置，`id` 要稳定且唯一，否则不同页面可能共用或污染配置。
- 附件列由组件内部使用 `File`，如果只是普通表单附件上传，不要为了附件功能强行套 `baseTableV2`。

## 10. 人工修订记录

- 2026-05-27：人工确认该组件已过审，可以正式使用。
- 2026-05-27：Codex 首次根据 `bigboss-base/src/components/baseTableV2/index.vue`、`props.js` 和多个真实列表页引用补充。

# list-management-page

## 1. 定位

表格优先的企业后台列表 / CRUD 页面，是当前系统最常见的新页面模式。

## 2. 适用需求

- 查询列表
- 数据管理
- CRUD
- 批量操作
- 行级操作
- 导入 / 导出 / 打印

## 3. 推荐结构

```txt
baseTableV2
├── 搜索区
├── 工具栏 / slotBtn
├── 表格主体
├── action 列插槽
└── 分页

Dialog / Drawer
└── 新增、编辑、详情、导入、确认
```

## 4. 推荐组件

- `baseTableV2`
- `File`
- `SearchSelectUser`
- `newSelectDepart`

禁用 / 避免：

- 新页面不要用 `TableBase`

## 5. 数据流和事件流

- `searchForm` 保存搜索和分页状态。
- `tableData` 保存列表数据。
- `handleSearch(searchForm)` 负责请求数据。
- `handleAdd` 打开新增弹窗。
- `v-slot:action` 放置行级操作。

## 6. 详细说明

详细 Design MD：`../list-management-page.md`

## 7. 生成页面时的注意事项

- 表格是页面主体，不要替换成卡片网格。
- 超过三个行级操作时收纳到 dropdown。
- 轻量新增 / 编辑 / 详情优先弹窗或抽屉。
- 权限和记录状态共同决定按钮可见性。

## 8. 状态

`human-reviewed-seed`

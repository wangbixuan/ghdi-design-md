# 表格列表视觉风格

## 1. 定位

表格列表是 GHDI 企业后台最核心的页面视觉模式。新列表页应优先让 `baseTableV2` 承载搜索、表格、分页、列配置和导出能力。

## 2. 来源

- `seed/design.md`
- `seed/page-designs/list.md`
- `.repo-design-index/components/cards/baseTableV2.md`
- `.repo-design-index/patterns/list-management-page.md`

## 3. 规则

- 表格是主体，不用装饰卡片网格替代表格。
- 表头、分割线、hover 使用 Element UI 浅灰体系。
- 行级高频操作使用 text button。
- 超过三个行操作时使用 `el-dropdown` 收纳次要操作。
- 新页面不使用 `TableBase`，统一使用 `baseTableV2`。

## 4. 生成页面时的注意事项

- 最小骨架应包含 `searchForm`、`tableData`、`id`、`name`、`handleSearch`。
- 操作列使用 `v-slot:action`。
- 工具栏扩展使用 `slotBtn`。
- 不要为了视觉变化手写完整表格壳。

## 5. 人工修订记录

- 2026-05-27：由旧 list page 设计探索和组件索引共同初始化。

# Component Index Review

> Skill: `ghdi-index-components`  
> Scope: sample review for one component  
> Component: `baseTableV2`  
> Source codebase: `D:/ywl/workbench/web/bigboss-base`

## 1. Deterministic Scan Result

Scan command:

```bash
node .design-agent/scripts/scan-components.mjs "D:/ywl/workbench/web/bigboss-base"
```

Generated fact file:

```txt
.repo-design-index/components/generated/component-scan-summary.json
```

Scan summary:

```txt
files: 374
vueFiles: 224
exposedComponents: 60
unresolved exposed paths: 0
```

Directory weight:

```txt
mvpFlow: 80
form: 67
flowchart: 36
notice: 28
bigboss-app: 24
workFlow: 24
baseTableV2: 18
flow: 14
```

## 2. Component Fact

```json
{
  "name": "baseTableV2",
  "exposedFrom": "src/components/expose.js",
  "importPath": "./baseTableV2/index.vue",
  "resolvedPath": "src/components/baseTableV2/index.vue",
  "familySize": 18
}
```

Evidence:

- `src/components/expose.js` exports `baseTableV2`.
- `src/components/INDEX.md` describes it as the newer shared table component.
- `src/components/baseTableV2/props.js` contains the public prop contract.
- `src/components/baseTableV2/module/searchContent.vue` contains the search/filter control implementation.

## 3. Public Contract Observed

High-value props from `baseTableV2/props.js`:

- `tableData`
- `tableColumns`
- `searchForm`
- `searchSelectData`
- `searchCriteria`
- `showExportBtn`
- `tableTitle`
- `isShowAddBtn`
- `addTitle`
- `remoteParams`
- `showPage`
- `expand`
- `pageSizeOpts`
- `minimalistModeFile`
- `cptCode`

Events observed from `baseTableV2/index.vue` and existing docs:

- `handleSearch`
- `handleAdd`
- `changePage`
- `changeSize`
- `getExportData`
- `cell-click`
- `on-selection-change`
- `reset`

Slots observed:

- `slotSearch`
- `bizContent`
- `slotBtn`
- `sloRight`
- table column slots keyed by `column.key`

## 4. Search Capability

`baseTableV2/module/searchContent.vue` supports a broad set of search item types:

- `input`
- `matchingKey`
- `date`
- `dateTime`
- `shortcutKeyDate`
- `provinceCity`
- `year`
- `yearMonth`
- `select`
- `apiSelect`
- `multipleChoice`
- `apiMultipleChoice`
- `apiRadio`
- `checkbox`
- `apiCheckbox`
- `depart`
- `yearInterval`
- `cascade`
- `selectMajorInput`
- `selectPersonnelInput`
- `radius`
- `personnel`
- `radiusSelect`
- `multipleProvince`
- `multipleArea`

Important related components:

- `newSelectDepart` is used for department-style search.
- `YearPicker` is used for year interval search.
- `SearchSelectUser` is used for personnel search.

## 5. Usage Evidence

`rg` found broad usage across:

- `src/module/admin/*`
- `src/module/open/pro/*`
- `src/module/order/work/*`
- `src/module/my/*`
- `src/components/notice/module/*`
- `src/components/flow/*`
- `src/components/form/personalResume/*`
- `src/module/infor-syn/meeting/*`

Representative examples:

- `src/module/admin/UserManage/index.vue`
- `src/module/open/pro/wwr/index.vue`
- `src/module/open/pro/wwr/rule.vue`
- `src/components/notice/module/noticeManage/index.vue`
- `src/components/notice/module/sceneDefine/index.vue`
- `src/components/flow/template/index.vue`
- `src/module/admin/BizData/index.vue`

## 6. Recommendation

Recommended registry status:

```txt
preferred
```

Recommended category:

```txt
table-list-container
```

Use when:

- The page is a table-first CRUD/list management page.
- The requirement includes search, pagination, export, table configuration, row selection, or action columns.
- The page type matches `list-management-page`.

Do not use when:

- The target module is an old module already standardized on `TableBase`.
- The page is primarily a document/form ledger page, dashboard, or rich configuration editor.
- The page only needs a tiny local static table without search/pagination/configuration.

## 7. Generation Guidance

When Codex generates a page with `baseTableV2`:

- Read the nearest module examples before writing code.
- Define `tableColumns`, `tableData`, `searchCriteria`, and `searchForm` explicitly.
- Use `slotBtn` for toolbar actions beyond the built-in add button.
- Use keyed column slots for row actions and custom cell rendering.
- Wire `handleSearch`, `changePage`, and `changeSize` to the data-loading method.
- Keep `searchCriteria.type` values within the supported list.
- Prefer `var(--theme-color)` / existing component styles over custom list-page styling.

## 8. Human Review

No blocker found for keeping `baseTableV2` as `preferred`.

Human review is still useful for:

- selecting the best canonical examples
- documenting standard `tableColumns` shape
- documenting recommended row action patterns
- deciding when to use built-in `handleAdd` vs custom `slotBtn`

## 9. Suggested Registry Patch

Current `COMPONENT_REGISTRY.json` already contains `baseTableV2` as `preferred`.

Suggested future enrichment:

- Add slot names.
- Add supported search item types.
- Add more canonical examples from `notice/module/*` and `admin/*`.


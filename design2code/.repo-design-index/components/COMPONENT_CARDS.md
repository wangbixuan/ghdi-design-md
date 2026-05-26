# Component Cards

## baseTableV2

Path: `src/components/baseTableV2/index.vue`

Status: `preferred`

Use when:

- Building a new table-first list page.
- The page needs search, pagination, export, column settings, or row selection.
- Requirements describe CRUD/list management.

Do not use when:

- The target module already has a strong legacy `TableBase` convention and a small maintenance change is safer.
- The page is not primarily tabular.

Typical props:

- `tableData`
- `tableColumns`
- `searchCriteria`
- `searchForm`
- `showExportBtn`
- `tableTitle`
- `isShowAddBtn`

Typical events:

- `handleSearch`
- `handleAdd`
- `changePage`
- `changeSize`
- `getExportData`
- `cell-click`
- `on-selection-change`

Generation notes:

- Let `baseTableV2` own table shell behavior where possible.
- Inject action columns and toolbar behavior using existing local patterns from nearby modules.
- Search item types should follow `baseTableV2/module/searchContent.vue`.

## TableBase

Path: `src/components/baseTable/TableBase.vue`

Status: `legacy`

Use when:

- Maintaining an old page that already uses `TableBase`.
- The surrounding module convention strongly prefers it.

Do not use when:

- Creating a new list page without legacy constraints.

Generation notes:

- Prefer `baseTableV2` for new work.

## File

Path: `src/components/form/uploadFile/newFile.vue`

Status: `preferred`

Use when:

- A form needs attachment upload.
- A page needs file/image/video preview, delete, download, or simplified upload mode.

Do not use when:

- The requirement is only a simple URL text field.

Generation notes:

- Inspect `form/uploadFile/props.js` before using advanced props.
- Use project `cptCode` conventions when the target module has them.

## EditorVue

Path: `src/components/form/EditorVue.vue`

Status: `preferred`

Use when:

- The page edits rich text content, announcements, rules, or document body content.

Do not use when:

- A plain textarea is enough and no rich formatting is required.

## SearchSelectUser

Path: `src/components/form/SearchSelectUser.vue`

Status: `preferred`

Use when:

- The page requires user/person selection.
- The selection may be multiple, remote, or department-assisted.

## newSelectDepart

Path: `src/components/form/newSelectDepart.vue`

Status: `preferred`

Use when:

- A search area or form needs a department selector in new code.

## selectDepart

Path: `src/components/form/selectDepart.vue`

Status: `legacy`

Use when:

- Updating old modules that already depend on its value shape.

## UTag

Path: `src/components/form/UTag.vue`

Status: `allowed`

Use when:

- The page needs interactive business tags.

Do not use when:

- A simple static status indicator is enough; Element UI tags may be simpler.

## WorkFlowDetail

Path: `src/components/flow/WorkFlowDetail.vue`

Status: `specialized`

Use when:

- The page explicitly involves workflow runtime details, approvals, forwarding, urging, circulation, or transfer.

Do not use when:

- The page only displays a status field.


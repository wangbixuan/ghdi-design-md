# Page Patterns

## list-management-page

Detailed Design MD: `list-management-page.md`

Use for table-first CRUD/list pages.

Standard structure:

1. Page title or module context
2. Search/filter area
3. Toolbar actions
4. Data table
5. Pagination
6. Add/edit/detail dialogs or drawers

Recommended components:

- `baseTableV2`
- `File` when attachments are present
- `SearchSelectUser` when users are selected
- `newSelectDepart` when department selection is needed

Rules:

- Keep the table as the primary content.
- Use text buttons for high-frequency row actions.
- Collapse secondary row actions when there are more than three.
- Prefer dialog/drawer workflows for add/edit unless the form is very large.
- Do not turn table records into a decorative card grid.

Canonical references:

- `src/module/admin/UserManage/index.vue`
- `src/module/open/pro/wwr/index.vue`

## config-management-page

Detailed Design MD: `config-management-page.md`

Use for pages that edit configuration, notice rules, templates, publish settings, or rich content.

Standard structure:

1. Header/title area
2. Top configuration form
3. Main editing/configuration area
4. Upload/extension area when needed
5. Preview/detail layers
6. Save/cancel actions

Recommended components:

- Element UI form controls
- `EditorVue` for rich text
- `File` for attachments
- `SearchSelectUser` for person binding
- drawers/dialogs for related-object operations

Rules:

- Keep configuration hierarchy clear.
- Use two-column forms on wide screens when fields are dense.
- Use rich editor area only when content authoring is part of the page.
- Keep preview and related configuration in dialogs/drawers instead of page jumps when possible.

Canonical references:

- Notice/announcement editing pattern from `seed/page-designs/config.md`

## dashboard-page

Detailed Design MD: `dashboard-page.md`

Use for workbench, portal, statistics, and overview pages.

Standard structure:

1. Page-level context
2. KPI/stat cards
3. Charts or trend panels
4. Task/list panels
5. Secondary notices or quick actions

Recommended components:

- `chartsLine`
- `chartsFunnel`
- `countTo`
- `UCard` when the target module already uses card containers

Rules:

- Use dashboard patterns only when the requirement is genuinely overview/statistical.
- Do not apply dashboard cards to CRUD/list management pages.

## form-ledger-page

Detailed Design MD: `form-ledger-page.md`

Use for approval-oriented enterprise form pages with ledger-like dense document structure, workflow tail sections, and right operation/navigation rail.

## foundation-controls-page

Detailed Design MD: `foundation-controls-page.md`

Use as a design-system reference page for Element UI control states, sizing, and theme binding. It is not a business page pattern.

## theme-engine-page

Detailed Design MD: `theme-engine-page.md`

Use for global theme management and preview pages. It is a system configuration pattern rather than a normal business module.

## status-page

Detailed Design MD: `status-page.md`

Use for exception and empty-state pages such as 404 and reusable empty states.

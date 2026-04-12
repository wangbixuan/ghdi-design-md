# Benchmark Base Page - Report Approval

## 1) Original page and reconstruction target
- Source business page reference: `D:/ywl/workbench/web/bigboss-wedo/src/module/main/ppm/ds/projectDetail/personnelManagement/reportApproval/table.vue`
- Rebuilt page (neutral benchmark base): `pages/codex-report-approval-base/index.html`

This rebuild keeps the business semantics and core page structure while removing platform-specific visual style and custom component dependencies.

## 2) Where the base page is
- Entry page: `pages/codex-report-approval-base/index.html`
- Page logic: `pages/codex-report-approval-base/app.js`
- Neutral style: `pages/codex-report-approval-base/page.css`
- Mock data: `pages/codex-report-approval-base/mock/mock-data.js`
- Local runtime dependency files:
  - `pages/codex-report-approval-base/vendor/vue.min.js`
  - `pages/codex-report-approval-base/vendor/element-ui.min.js`
  - `pages/codex-report-approval-base/vendor/element-ui.css`

## 3) Business structure preserved from original page
- Basic project information block
- Company-level coordination group block
- On-site representative / liaison block
- Workflow block
- Key actions and interactions:
  - save draft
  - submit / resubmit
  - add member
  - delete member
  - member selection dialog with keyword filter + pagination

## 4) Element UI base components used
- `el-card`
- `el-form`
- `el-row` / `el-col`
- `el-radio-group`, `el-radio`, `el-radio-button`
- `el-button`
- `el-select`, `el-option`
- `el-input`
- `el-table`, `el-table-column`
- `el-alert`
- `el-dialog`
- `el-pagination`
- `el-tabs`, `el-tab-pane`
- `el-tag`

## 5) Mock data strategy
- All page display data and interactions are mock-driven.
- Mock covers:
  - base form fields
  - team member list records
  - status fields
  - workflow records
  - candidate user pool
  - dialog filter and pagination behavior

No production API call is required.

## 6) Deliberately removed style/brand elements
- Removed platform custom components and workflow component dependencies.
- Removed platform-specific class names and style variable references.
- Removed platform image/icon/asset references.
- Removed design token and css-variable naming that can reveal source style identity.
- Kept only plain Element UI visual language plus minimal neutral layout styling.

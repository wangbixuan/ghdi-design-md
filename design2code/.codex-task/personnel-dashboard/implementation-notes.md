# Implementation Notes

## Files Changed

- `bigboss-wedo/src/module/main/depart/personnelManagement/index.vue`
- `.codex-task/personnel-dashboard/implementation-notes.md`

## Components Reused

- `countTo` from `bigboss_base/components`
- Element UI: `el-button`, `el-radio-group`, `el-radio-button`, `el-tag`, `el-date-picker`, `el-table`
- Project global ECharts instance via `this.$echarts`

## Page Pattern Followed

Dashboard page pattern:

- Left context rail: yearly headcount trend and department share.
- Top KPI summary: total headcount, design representatives, on-duty, leave, business trip.
- Summary table panel: roster, on-duty, leave, business trip, design representative views.
- Composition charts: education, age, tenure, gender, position, title, qualification.
- Bottom detail table: entry, leave, and position-change records with month filter.

The low-fidelity reference was used as module layout intent only. Visual details follow dashboard standards: KPI summary, chart panels, compact summary tables, stable chart heights, restrained borders, and low-saturation business colors.

## API Usage

Used existing API functions from `bigboss-wedo/src/module/main/depart/personnelManagement/api.js`:

- `headcount`
- `deptEmpNum`

The actual response shapes are unknown, so `index.vue` normalizes common return structures and keeps fallback values if either request fails.

## Placeholder Data

The following areas still use local placeholder data because no API names or field contracts were provided:

- Employee roster and status lists.
- Entry, leave, and position-change records.
- Age, title, position, gender, tenure, education, and qualification composition.
- Design representative detail list.

## Style Rules Followed

- Uses dashboard information hierarchy: KPI first, then list summary, then composition charts, then detail table.
- Keeps enterprise density and fixed chart containers.
- Uses tables for roster/change summaries instead of decorative personnel cards.
- Uses white panels on a light page background with restrained borders.
- Uses `var(--theme-color, #2f80ed)` for section emphasis and limited business colors for charts/statuses.
- Avoids decorative big-screen effects, marketing hero layout, oversized typography, and global style changes.

## Verification

- Ran `npx vue-cli-service lint "src/module/main/depart/personnelManagement/index.vue" --no-fix`.
- Result: passed.
- Captured the local route with Playwright using Microsoft Edge channel.
- Result: dev server is reachable at `http://local.ghdi.cn:4015/#/depart/personnel/management/index`, but the route is blocked by the account login page without an authenticated session.

## Risks

- `headcount` and `deptEmpNum` may return field names outside the current normalization set.
- Detail navigation is intentionally not implemented because target routes were not provided.
- Visual browser verification may require an authenticated local session.

# Page Design MD Index

These page-level design markdown files were derived from `Record.md` and the following source Vue pages:

- `C:\Users\wbx\Desktop\数据可视化1.vue`
- `C:\Users\wbx\Desktop\数据可视化2.vue`
- `C:\Users\wbx\Desktop\列表页.vue`
- `C:\Users\wbx\Desktop\详情页.vue`
- `C:\Users\wbx\Desktop\表单页.vue`

## Documents

- `home.md`: role-dispatch home page / asset management home page
- `dashboard.md`: generic enterprise dashboard page
- `list.md`: list management page
- `config.md`: detail + configuration page
- `form.md`: approval-oriented long form page
- `controls.md`: Element UI foundation controls page
- `theme.md`: global theme module page
- `status.md`: special status page with 404 / empty state

## HTML to MD Mapping

| HTML Prototype | Design MD | Page Type |
|---|---|---|
| `pages/home.html` | `page-designs/home.md` | role-dispatch home page |
| `pages/dashboard.html` | `page-designs/dashboard.md` | generic dashboard page |
| `pages/list.html` | `page-designs/list.md` | list management page |
| `pages/config.html` | `page-designs/config.md` | detail/configuration page |
| `pages/form.html` | `page-designs/form.md` | approval-oriented long form page |
| `pages/controls.html` | `page-designs/controls.md` | foundation controls page |
| `pages/theme.html` | `page-designs/theme.md` | global theme module page |
| `pages/status.html` | `page-designs/status.md` | special status page |

## Shared Extraction Principles

- Preserve the existing GHDI enterprise-backoffice visual tone. Avoid marketing-style decoration.
- Continue to align with the `Element UI + iView` ecosystem and the `var(--theme-color)` theme variable.
- Emphasize page-level structure, interaction patterns, and business constraints rather than only visual styling details.
- Output should be suitable for Figma page descriptions, AI design prompts, and frontend reconstruction specs.

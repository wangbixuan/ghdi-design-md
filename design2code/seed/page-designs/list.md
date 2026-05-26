# Design MD: List Page

> Source: list page Vue file

## 1. Page Positioning

This is a typical enterprise backoffice list-management page. Using an asset registration list as the example, it supports:

- data querying
- row-level actions
- batch selection
- create / edit / delete
- import
- print
- detail viewing

This page type is one of the most common foundational backoffice templates.

## 2. Visual Tone

- Table-first layout
- Operational text actions should dominate over oversized buttons
- Primary color should consistently use `var(--theme-color)`
- Dialogs are auxiliary task panels and should not overpower the list itself

## 3. Layout Structure

### Main Structure

- Top: table toolbar, likely carried by `baseTableV2`
- Middle: data table
- Hidden layers: dialogs for detail, import, print, QR code, and public-asset confirmation

### Toolbar Actions

- register
- import
- print

### Row Actions

- data confirmation
- view
- more dropdown:
  - edit
  - delete
  - QR code
  - mark as public asset

## 4. Core Components

### Base Table Container

- Use `baseTableV2`
- Search, pagination, and batch selection should be handled by the shared container
- The page itself mainly injects toolbar slots and action-column content

### Row Action Pattern

- First-level high-frequency actions use text buttons
- Secondary actions are grouped into `el-dropdown`
- This pattern fits high-density lists and avoids too many hard buttons per row

### Dialog System

- Detail dialog: width `90%`
- Import dialog: fullscreen
- Print dialog: width `50%`
- QR code / public asset confirm: width `30%`

This is a classic backoffice pattern: list as the main page, layered panels for extended tasks.

## 5. Interaction Rules

- Load permissions first, then decide which actions are visible
- `Data confirmation` is a prerequisite action; only after confirmation should QR code or later actions become available
- Batch printing becomes available after multi-select
- Delete and confirm actions require a second confirmation
- Refresh the table after import completes
- Closing dialogs should return to the current list context without page jumps

## 6. Visual Detail Rules

- Row-level text actions use the theme color with font weight `600`
- The dropdown trigger text should be `More` plus a caret icon
- Dialog footer buttons should have unified width, often around `150px`
- QR-code dialog content should be centered
- Batch print preview should emphasize label output rather than the raw table

## 7. Business Constraints

- Permissions affect action visibility
- Confirmed and unconfirmed records expose different action sets
- Public asset handling is a state-confirmation dialog, not a full standalone form page
- The import template is a fixed file address, which means this list type is strongly tied to template-driven data exchange

## 8. Reusable Design Pattern Summary

This page type can be abstracted into a common template:

- top search + toolbar
- center table
- primary row action + more menu
- dialogs for extended tasks
- permissions and record state jointly control available buttons

## 9. AI Generation Prompt

> Design an enterprise backoffice list-management page centered on an asset registration table. The page should provide toolbar actions such as register, import, and print. Row actions should use text buttons and a More dropdown for view, edit, delete, QR code, and public-asset confirmation. The page should be table-centric, white-background, lightly bordered, and operational rather than decorative. Use dialogs for detail, import, and print instead of turning everything into cards.

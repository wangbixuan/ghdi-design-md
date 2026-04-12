# Design MD: Form Page

> Source abstraction: enterprise approval ledger-style form pages

## 1. Page Positioning

This page type is a generalized template for approval-oriented enterprise forms with strong document structure.

It is suitable for scenarios such as:

- personnel application
- role assignment or replacement
- special approval submission
- dispatch / revocation / change request
- project-side formal declarations

The page is not a lightweight simple form. It is a hybrid of:

- business ledger
- structured form
- process sheet
- approval workflow entry

## 2. Shared Components Abstracted From This Form Type

### Right Anchor + Action Panel

- sticky on desktop
- top status block
- middle section index navigation
- bottom submit and draft-save actions

Typical actions:

- submit
- draft save
- resubmit

### Basic Information Ledger

- top business identity area
- contract / project / owner / department / location style fields
- often starts with readonly display fields, but should also support common editable controls
- every ledger table should include a theme-color top decorative band before the table body

Typical controls that may appear in this area:

- text input with helper action
- select dropdown
- radio options
- radio button group
- checkbox group
- switch toggle
- direct action buttons
- tags for inline status or strategy hints
- textarea for business note / explanation

### Label-Control Ledger Cells

The basic information ledger should use a left-label / right-control cell pattern.

Rules:

- Label cells use `th`-like styling and sit on the left side of each field pair.
- Control cells use `td`-like styling and sit on the right side of each field pair.
- One row can contain two field pairs, for example: `label + control + label + control`.
- Label cells should be visually stable in width, typically around `120px` to `160px`.
- Label text should be horizontally centered and vertically centered.
- Label cells use a subtle neutral background so they read as field names rather than editable content.
- Control cells use white background and contain the actual value or Element UI-style controls.
- Control cells can contain input, select, radio group, checkbox group, switch, button group, tags, or textarea.
- These child controls must be wrapped by the ledger table structure, meaning they should be placed inside `td` control cells rather than floating outside the table as standalone cards or loose form rows.
- Even when a child control is visually complex, such as a select with helper buttons or a radio group with tags, it should still be treated as the content of one control cell.
- Table borders should remain continuous across label and control cells.
- Required labels may use a small semantic red asterisk, but the label background should not become red.
- The theme color should not be used as the label cell background; it is reserved for the table top band, section accent line, focus state, selected state, and primary actions.

### Business Detail Ledger Table

- the core editable area of the page
- dense row-column structure
- mixed readonly and editable cells
- supports add / delete / replace style operations
- must keep the same theme-color top decorative band as the basic information ledger

Typical column types:

- serial number
- name
- department
- qualification
- title
- major or category
- role
- reason / remark / change description

### Workflow Tail Section

- integrated process display area
- appears as the final formal section of the page
- must visually belong to the same business document

### Selection Dialog

- used when detail rows depend on selecting historical or existing personnel/items
- includes search
- result table
- single-select or multi-select
- pagination

## 3. Component Differences Compared With The Old Prototype

- The old prototype was a broad approval page with multiple business-specific blocks mixed together.
- This generalized version focuses on the stable component skeleton shared by this class of pages.
- The old prototype treated sections as content cards; this abstraction treats them as ledger sections inside one formal document.
- The new abstraction explicitly includes the selection dialog as a first-class component of the page type.
- The workflow area is not a summary card anymore. It is a required tail component in the overall form architecture.

## 4. Style Differences Compared With The Old Prototype

- Stronger document feeling
- Stronger table border system
- Higher information density
- Less narrative card layout, more ledger layout
- Clearer split between main document and right operation panel
- Dialog style aligned with Element UI desktop admin patterns

## 5. Layout Structure

### Subpage Responsibility

- This spec describes the form subpage content only.
- Do not create a page-level background canvas for this form.
- Do not create extra outer wrapper classes whose main purpose is page background, max-width centering, or visual separation, such as `benchmark-page`, `form-ledger-page`, `page-shell`, or `document-shell`.
- The host application shell already provides the outer page container and surrounding background.
- The form subpage root should fill the available content width and use a complete white background.
- If a wrapper is required for layout, it should be structural only: `width: 100%`, no gray background, no large outer margin, no independent shadow, and no centered document-card treatment.
- The main content area and the right navigation rail are separate columns, but they still belong to the same white form content region.

### Main Document

- form title / business identity
- section title bars
- one or more ledger tables
- approval workflow tail
- optional dialog preview or helper panel
- all child sections must share one complete white content background
- internal sections should stretch horizontally within the available page width instead of becoming narrow independent blocks
- do not render each child section as an independent floating card
- section boundaries should be expressed by section headers, ledger-table top bands, spacing, and thin dividers rather than by separate card containers
- the main content should look like one continuous form area, not a dashboard grid of blocks and not a centered document card

### Right Panel

- status block
- section index navigation
- bottom action buttons: submit + draft save

Right panel style and sizing rules:

- The panel should be sticky on desktop, aligned to the right side of the main document.
- Recommended width: `104px` to `128px`.
- The panel has exactly three vertical parts from top to bottom: `status`, `section index`, `submit + draft save`.
- The top status block should use an approximately square container, typically `104px` to `128px` wide and `104px` to `128px` high.
- The status block is for current process state such as `draft`, `in process`, `returned`, or `completed`. It is not a submit button.
- The status block may use the current theme color for emphasis, but its text should clearly read as a state label rather than an action label.
- The anchor index list should sit below the status block in a white card container.
- The anchor index container should use a small radius, subtle shadow, and compact vertical spacing.
- Each anchor item should be about `48px` to `56px` high.
- The active anchor item should use the current theme color as a filled background with white text.
- Inactive anchor items should remain white or very light neutral, with neutral text.
- Bottom action buttons should be compact and stacked vertically.
- The bottom action order should place the strongest action first, for example `submit` above `draft save`, unless the business workflow explicitly requires otherwise.
- `submit` should use primary button styling.
- `draft save` may use primary or secondary styling depending on product convention, but it must remain in the bottom action group, not in the top status block.
- The right panel should not become a wide information sidebar; it is an operation/navigation rail.

## 6. Core Visual Tone

- formal
- dense
- administrative
- structured

Use:

- white background
- medium gray borders
- compact spacing
- small but clear theme-color emphasis

Do not over-decorate this page type. It should feel operational and official.

### Single White Content Surface

The form subpage must use one shared white background for the main business content area.

Rules:

- The form subpage should not define or reproduce any outer gray application canvas.
- The layout should read as `existing app content container -> white form content area -> ledger sections`.
- The white content area should span the available width of the subpage content region.
- Basic information, business detail, workflow, and dialog preview examples belong to the same document rhythm.
- Do not place each subcomponent into separate large white cards with independent shadows.
- Use internal section spacing and dividers instead of card separation.
- The visual hierarchy should come from ledger tables, section title accent lines, and table top bands.
- This rule is important because these pages should read as formal approval documents, not dashboard modules.

### Ledger Table Top Band

Each ledger table container must have a thin top decorative band.

Rules:

- The band sits above the table grid, not inside a table cell.
- It uses the active global theme color.
- It is a core identity feature of this form-page type.
- It should appear consistently on the basic information table, business detail table, and selection-dialog table when the table is presented as part of the same ledger pattern.
- The band should be thin and structural, typically around `3px`, so it reinforces the table section without becoming a large decorative block.
- The band should change immediately when the global theme color changes.

## 7. Interaction Rules

- detail data is loaded on entry
- business status controls readonly vs editable rendering
- the basic information area can mix readonly ledger cells and editable control cells
- draft save and submit are separate
- required fields may live inside table cells rather than only in stacked form fields
- row add / delete / selection dialog are common behaviors
- submit usually depends on both table validation and workflow initialization

## 8. Theme Binding Rules

This page type must consume the global theme module.

Theme color should affect:

- right status block emphasis
- section title accent line
- ledger table top decorative band
- active anchor item
- primary actions
- selected radio / selected row state in dialog
- editable key fields or focused form emphasis

Theme color should not override semantic colors such as:

- success
- warning
- danger
- disabled

## 9. Business Constraints Template

Common constraints for this page type:

- at least one detail row may be required
- duplicate personnel or duplicate records may be forbidden
- some table-cell fields become required only in editable states
- resubmit differs from first submit
- readonly and editable modes may coexist on the same page

## 10. AI Generation Prompt

> Design only the content of a generalized enterprise approval ledger form subpage for a backoffice system. Do not create an outer gray page background, centered document shell, or extra page-level wrapper such as `benchmark-page` or `form-ledger-page`. The subpage should fill the available content width with one continuous white form content area. Inside that white area, place the basic information ledger, dense editable detail table, approval workflow tail, and standard Element UI style selection dialog with search, table, and pagination. Use a sticky right operation/navigation rail with three vertical parts: status, section index, and submit + draft save. Use theme color only for structural emphasis such as title bars, table top bands, active anchor items, status blocks, selected rows, and primary buttons. Keep the page dense, official, and highly structured.

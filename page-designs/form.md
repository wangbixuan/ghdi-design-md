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
- top primary action block
- section navigation
- bottom submit actions

Typical actions:

- top-level draft or primary operation
- draft save
- submit
- resubmit

### Basic Information Ledger

- top business identity area
- contract / project / owner / department / location style fields
- often starts with readonly display fields, but should also support common editable controls

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

### Business Detail Ledger Table

- the core editable area of the page
- dense row-column structure
- mixed readonly and editable cells
- supports add / delete / replace style operations

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

### Outer Layout

- desktop-first
- main form document on the left
- sticky action/navigation panel on the right

### Main Document

- form title / business identity
- section title bars
- one or more ledger tables
- approval workflow tail
- optional dialog preview or helper panel

### Right Panel

- primary action block
- anchor list
- bottom action buttons

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

- right status panel emphasis
- section title accent line
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

> Design a generalized enterprise approval ledger form page for backoffice systems. Use a desktop-first layout with a formal document area on the left and a sticky action/navigation panel on the right. The page must include a basic information ledger, a dense editable detail table, an approval workflow tail, and a standard Element UI style selection dialog with search, table, and pagination. Use theme color only for structural emphasis such as title bars, active anchor items, status blocks, selected rows, and primary buttons. Keep the page dense, official, and highly structured.

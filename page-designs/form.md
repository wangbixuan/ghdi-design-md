# Design MD: Form Page

> Source: approval form Vue page

## 1. Page Positioning

This is a typical approval-oriented long-form page. It combines:

- project basic information display
- multi-section structured input
- personnel assignment maintenance
- approval-flow integration
- draft save, submit, and resubmit

It is closer to an online business ledger plus approval sheet than to a short simple form.

## 2. Visual Tone

- Strong structure and strong boundaries
- White background + gray table borders + theme-color highlights
- Visual style should feel closer to a formal business document
- Navigation, status block, and section titles establish a clear reading order

## 3. Layout Structure

### Outer Structure

- Desktop-first
- Main content is a large document-like table area
- Fixed anchor navigation on the right side

### Right Anchor Navigation

- Shows current process status
- Navigation should include at least:
  - basic information
  - personnel
  - approval flow
- Bottom action area contains draft save / submit / resubmit

### Main Content Area

- Top action title
- Multiple section title bars
- Each section uses ledger-like tables to carry fields
- The bottom connects into the approval-flow component

## 4. Core Components

### Status Block

- Shows current approval status
- Completed and in-progress states should be visually distinct
- This is the strongest process feedback point on the page

### Section Titles

- Left vertical accent line + title text
- Used to separate sections such as:
  - basic information
  - company-level coordination group
  - resident design representative or liaison

### Ledger-Style Form Table

- Clear cell borders
- Supports both read-only display mode and edit mode
- Mixed field types:
  - plain text value
  - radio / single choice
  - select
  - multiline input

### Personnel Assignment Tables

- Include fields such as serial number, name, department, title, role, discipline, and remark
- Support add, delete, reassign, and revoke
- In some scenarios, a replaced person must also be displayed

### Process and Reminder Components

- `el-alert` for business-rule reminders
- `WorkFlowDetail` for approval-flow display and submit linkage

## 5. Interaction Rules

- On page entry, load request detail, project detail, role dictionary, discipline dictionary, and dispatch type
- Draft save and submit are separate actions
- Before submit, validate multiple form sections in sequence
- Button labels change based on state:
  - draft save
  - submit
  - resubmit
- Personnel sections support add, delete, selecting historical personnel, and cross-page single-selection recovery
- Special business states such as reassignment or revocation affect both field structure and prompt copy

## 6. Visual Detail Rules

- Use heavier gray borders to strengthen the feeling of an approval document
- Table headers and required stars must remain clear
- Long text should be allowed to wrap
- Reminder bars should sit between sections as rule guidance, not as decorative UI
- Right-side anchor navigation should clearly read as the secondary layer to the main form

## 7. Business Constraints

- Company-level and resident-level personnel groups are both constrained by type rules
- At least one required personnel group must be completed before submission
- Approval flow must be initialized before submit
- Reassignment scenarios need stronger risk reminders around role and discipline changes
- The same person cannot be added repeatedly under the same role/discipline context

## 8. Page Design Abstraction

This can be abstracted into an approval long-form template:

- fixed right anchor navigation
- document-style large table
- section title bars
- status block + submit actions
- approval-flow tail component

## 9. AI Generation Prompt

> Design an enterprise backoffice approval-oriented long form page that looks like a formal business document. The right side contains a fixed anchor navigation and process status block. The main content is a multi-section structured table including basic information, personnel assignment, and approval flow. Support draft save, submit, and resubmit. Use white background, strong gray borders, small theme-color accents, high information density, and a desktop-first layout.

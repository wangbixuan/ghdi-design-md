# Design MD: Config Page

> Source: detail/configuration Vue page

## 1. Page Positioning

This is a hybrid page that combines detail, configuration, and editing. Using notice/announcement editing as the example, it carries:

- template selection
- publish-mode configuration
- rule binding
- rich-text body editing
- attachment upload
- preview
- rule-change reminder during editing

It is not a pure read-only detail page. It is closer to a business-object configuration detail page.

## 2. Visual Tone

- Keep the standard white enterprise backoffice system
- Use a two-column configuration form plus a large editor area to establish hierarchy
- Emphasize a document-authoring feeling rather than a plain form-stack feeling
- Floating helpers, drawers, and preview layers create a multi-layer workflow

## 3. Layout Structure

### Page Header

- Two-line centered title area
- First line: organization name
- Second line: page action state such as create or edit notice/announcement

### Main Form Area

- Top section uses a two-column grid layout
- Label width around `120px`
- Column gap around `24px`
- Two columns on wide screens, one column on narrow screens

### Content Area

- Announcement content occupies its own full-row editor section
- Below that: attachment area and cover-image area
- Bottom: save / cancel action area

### Auxiliary Layers

- Preview dialog
- Create-rule drawer
- Rule-detail drawer
- Bottom-right floating reminder for rule changes

## 4. Core Components

### Top Configuration Form

- template selector
- importance level
- publish time mode
- scheduled publish time
- publish rule
- sort weight
- announcement title

### Rich Text Editor

- Use `TemplateEditor`
- Support variable placeholders
- Support save-before-preview workflow
- Editor height should be at least `400px`

### Upload Area

- notice attachments
- cover image
- Left edge should align with the main editor area
- Reserve space for a right-side variable panel

### Rule Reminder Card

- Fixed floating card at bottom-right
- White background with light border
- Stronger shadow than standard cards
- Two actions:
  - Sync and overwrite (recommended)
  - Not now

## 5. Interaction Rules

- Create and edit modes share the same page shell
- Scheduled publishing must validate a future timestamp
- Template switching must also update rich-text structure and bound rules
- In edit mode, if the saved rule snapshot is different from the latest rule, show the floating reminder
- Preview is not a pure frontend mock; save first to get a real entity ID, then show the official preview
- Drawers are used for rule creation and rule detail so the user does not leave the current editing context

## 6. Visual and Usability Details

- Page outer padding: `16px 24px 24px`
- Title font size around `19px`, weight `600`
- Rich-text area and upload area should align horizontally to preserve a document-like feel
- Upload buttons may use stronger emphasis because they are tooling actions, not the main workflow action
- Bottom form buttons are centered

## 7. Business Constraints

- Publish mode and rule snapshot are strongly bound
- Templates may define both content structure and bound rules
- Preview depends on a persisted backend ID
- The edit page must handle drift between current content and latest rule configuration

## 8. Reusable Design Pattern

This can be abstracted into a reusable configuration-detail template:

- two-column settings area
- main document editing area
- attachment and cover extension area
- preview capability
- floating reminder for rules or dependencies
- drawers for related-object operations

## 9. AI Generation Prompt

> Design an enterprise backoffice detail-and-configuration page for editing notices or announcements. The top area is a two-column settings form including template, importance, publish time, rule binding, and title. The middle area is a large rich-text editor. The lower area contains attachment and cover uploads. Add preview support and a bottom-right floating reminder for rule changes. Use a white, restrained, document-oriented, desktop-first style.

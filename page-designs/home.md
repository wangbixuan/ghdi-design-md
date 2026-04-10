# Design MD: Home Page

> Source: role-dispatch / data-visualization Vue page

## 1. Page Positioning

This is a role-dispatch home page, not a single information panel. It routes users into different workbenches based on role:

- Super admin: enter `systemAdmin`
- Department admin / department owner: enter `departmentAdmin`
- Ordinary staff: enter `ordinaryStaff`
- The current shared view is an asset-administrator organization overview table

The design goal is not visual impact. The core goal is: after login, the user should immediately enter the correct responsibility context.

## 2. Visual Tone

- White enterprise backoffice interface with low ornamentation
- Hierarchy is built with titles, tables, spacing, and section separation
- Default business text size is based on `14px`
- Titles use deep neutral gray such as `#3D3D3D`
- Containers are pure white with light spacing and minimal shadow

## 3. Layout Structure

### Page Skeleton

- The top-level page switches to different subpages directly based on role
- The current shared content area uses a single-column flow
- The main table sits inside a white card container with a module title

### Shared Content Area

- Top outer spacing: about `20px`
- Card inner padding: about `10px`
- Card structure:
  - module title
  - data table

## 4. Core Components

### Role Routing Container

- The page acts as a scenario dispatcher
- Different role workbenches should share a consistent shell but allow fully different content
- In Figma, this should be represented as one entry page with multiple role-based views

### Asset Administrator Table

- Use `el-table`
- Three-column structure: department / post / person
- The first column should support vertically merged cells to make organization hierarchy clear
- Person text should use the format `Name(account)`

## 5. Interaction Rules

- On initialization, fetch user role first, then fetch the configured personnel list
- Role switching is page-level logic and should not rely on a manual UI switcher
- The table does not need complex filters or batch actions
- The focus is quick reading of organization and assignment relationships
- Merged cells are used to reduce duplication and improve department-level readability

## 6. Business Constraints

- Role enumeration directly determines which page is visible
- This is an entry page for the backoffice system, so it should emphasize information routing more than a standard list page
- The asset administrator table is an organization-configuration view, not a business transaction list

## 7. Design Output Recommendations

- In Figma, split this into two layers:
  - role entry page specification
  - asset administrator table page specification
- If this page type is extended, keep these priorities:
  - direct single-module entry
  - low distraction
  - strong organizational structure

## 8. AI Generation Prompt

> Design an enterprise backoffice role-dispatch home page with a white background, low ornamentation, and desktop-first layout. The page should route users into different workbenches based on role, while the default shared view is an asset-administrator configuration table. The main content is a three-column table with merged department cells. Columns are department, post, and person. The page should feel clean, stable, organizational, and operational. Avoid marketing visuals and exaggerated graphics.

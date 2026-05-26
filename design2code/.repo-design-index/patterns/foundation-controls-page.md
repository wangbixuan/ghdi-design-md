# Design MD: Controls Page

> Source abstraction: Element UI based foundation controls showcase

## 1. Page Positioning

This page type is a foundation reference page for the design system and frontend implementation team.

It is not a business page. It exists to centralize the visual and interaction baseline for reusable controls.

## 2. Core Purpose

- show the canonical appearance of base controls
- explain sizing and state hierarchy
- provide a stable visual reference for later business-page reconstruction
- verify theme-variable binding on reusable UI pieces

## 3. Component Scope

Typical component groups on this page:

- buttons
- inputs
- select controls
- radio / checkbox / switch
- tags and alerts
- tables
- dialogs
- pagination
- dropdown and tabs

## 4. Layout Structure

### Page Shell

- standard topbar and hero explanation area
- grouped showcase blocks below
- each group should focus on one control family

### Showcase Blocks

- concise title
- one or more state rows
- compact spacing
- avoid business copy; focus on control expression

## 5. Visual Tone

- neutral white background
- medium gray border system
- strong consistency over decoration
- theme color appears only where the real component should consume it

## 6. Interaction Rules

- hover, active, focus, disabled and selected states should all be represented
- semantic colors such as success / warning / danger should stay semantic
- theme color should drive only the project-level primary emphasis

## 7. Theme Binding Rules

Theme color should affect:

- primary button
- text button
- focus border
- selected radio / checkbox / switch
- active tabs and selected rows

Theme color should not override:

- success state
- warning state
- danger state
- disabled state

## 8. AI Generation Prompt

> Design a foundation controls reference page for an enterprise backoffice system based on Element UI. Organize the page by component families and show the canonical states of buttons, inputs, selectors, tables, dialogs, and pagination. Keep the page neutral, dense, and highly systematic. Theme color should drive only primary emphasis and selection states.

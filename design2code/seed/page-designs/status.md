# Design MD: Status Page

> Source abstraction: special status pages such as 404 and empty state

## 1. Page Positioning

This page type covers non-business-state screens that appear outside the normal workflow.

Current scope:

- 404 page
- empty state

## 2. Core Purpose

- provide a stable visual baseline for system exception pages
- distinguish abnormal state pages from normal business content pages
- keep the expression concise and immediately understandable

## 3. Layout Structure

### 404 Section

- large visual symbol
- short status title
- minimal explanatory copy
- top accent line should follow the active global theme
- dynamic motion may remain as a lightweight brand detail

### Empty State Section

- follow the Element UI empty-state expression
- centered illustration
- single-line label
- avoid unnecessary decoration or business copy

## 4. Visual Tone

- clean
- sparse
- highly legible
- slightly separated from ordinary content-heavy pages

## 5. Theme Binding Rules

Theme color should affect:

- 404 top accent line
- structural emphasis if needed

Theme color should not distort:

- the core empty-state illustration proportions
- semantic legibility of the status message

## 6. Interaction Rules

- 404 should remain lightweight and immediate
- empty state should be reusable inside business containers
- motion, if present, must stay subtle and not interfere with readability

## 7. AI Generation Prompt

> Design a special status page set for an enterprise backoffice system, currently covering a 404 page and a standard Element UI style empty state. The 404 page should use a strong central symbol, a theme-driven top accent line, and subtle motion. The empty state should stay close to the default Element UI visual language with accurate illustration proportions and minimal text.

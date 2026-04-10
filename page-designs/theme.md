# Design MD: Theme Page

> Source abstraction: global theme engine / shared runtime page

## 1. Page Positioning

This page type is the global theme management page for the entire prototype system.

It is not a normal business module. It is the visual control center for all downstream pages.

## 2. Core Responsibilities

- provide preset base theme colors
- allow custom color selection
- expose the current shared theme variables
- preview the impact on downstream modules
- explain the theme propagation chain

## 3. Layout Structure

### Global Introduction

- explain that theme is a global module
- highlight affected page categories

### Theme Console

- preset palette
- current theme summary
- custom color input
- variable readback

### Module Preview Area

- simulate how home / dashboard / list / config / form / status react to theme changes
- previews should be lightweight but recognizably mapped to the real page types

### Logic Explanation Area

- show source to variable to page relationship
- emphasize shared runtime rather than per-page isolated color logic

## 4. Visual Tone

- clearer emphasis than ordinary business pages
- still desktop-admin oriented
- should feel like a control console, not a marketing landing page

## 5. Interaction Rules

- selecting a preset should immediately update the global theme
- custom color should update the same runtime
- current variable values should always reflect the active theme
- child previews should visually update with the same selection

## 6. Theme Binding Rules

This page directly manages:

- `--theme-color`
- `--theme-color-deep`
- `--theme-color-light-8`
- `--theme-color-light-9`

This page should clearly communicate that other pages consume these variables rather than owning separate theme logic.

## 7. AI Generation Prompt

> Design a global theme engine page for an enterprise backoffice system. The page should include preset theme colors, a custom color picker, live readback of shared CSS variables, and lightweight previews showing how downstream modules react to the active theme. The page should feel like an admin control console rather than a normal business page.

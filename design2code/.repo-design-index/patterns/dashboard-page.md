# Design MD: Dashboard Page

> Source abstraction: generic enterprise analytics dashboard

## 1. Page Positioning

This page type is a reusable enterprise dashboard template for operational overview and management monitoring.

It should not be bound to a single business such as work orders only. It can carry:

- project operations
- service operations
- asset governance
- process monitoring
- organization-level risk tracking

The page is a high-frequency management view, not a decorative command-center screen.

## 2. Visual Tone

- white background with structured card layout
- high information density and fast scanability
- chart emphasis driven by the current global theme variables
- weak information stays in neutral gray scale
- visual hierarchy must be stable across different business datasets

## 3. Layout Structure

### Overall Grid

- two-column desktop layout: narrow left column + wide right column
- left column focuses on overview and trend
- right column focuses on structure, hotspots, and extended analysis

### Left Column

- top KPI metric cards
- quality / score / evaluation module
- trend module
- stage or status distribution module

### Right Column

- one wide ownership or structure module
- one wide geographic distribution module when location data matters
- multiple parallel cards for ranking, category split, or keyword insight
- support reordering based on business emphasis

## 4. Core Components

### Metric Cards

- show total volume, in-progress volume, completion rate, response rate, or similar first-level KPIs
- large numeric value
- short comparison text below

### Chart Cards

- card header with accent line
- body area reserved for charts or ranked data
- each card remains reusable across business domains

### Common Chart Types

- ring / score chart
- line trend chart
- bar structure chart
- ranked list
- keyword cloud or hotspot insight block

### Geographic Distribution Module

- combines location table, area map, category filters, and department distribution
- suitable for asset, project, service, or regional operation scenarios
- should be treated as a reusable dashboard module rather than a standalone special page
- theme color must drive active region emphasis, category legend colors, and department bar fills

### Empty State

- every chart area needs a stable empty-state container
- chart shell height should remain fixed when empty

## 5. Interaction Rules

- dashboard should primarily render incoming aggregated data rather than own the business fetch logic
- filter changes should update metrics and chart highlights consistently
- chart hover, legend, and focus states should stay within the same theme palette
- in geographic modules, area filters, map highlights, and side tables should remain visually linked
- if a module has no data, stale chart visuals must not remain

## 6. Theme and Color Rules

This page must consume the existing global theme system.

Theme color should affect:

- card title accent line
- KPI emphasis numbers
- main chart stroke / fill
- highlighted bars and ranking fills
- active analysis emphasis

Theme-derived colors should be created from:

- `--theme-color`
- `--theme-color-deep`
- `--theme-color-light-8`
- `--theme-color-light-9`

Avoid hardcoded business-specific accent colors inside charts unless they are true semantic colors.

## 7. Business Expression Priorities

- overview first
- trend second
- structure and ownership next
- hotspot and keyword insight last

This ordering should remain understandable even when the business domain changes.

## 8. Reusable Design Pattern Summary

This dashboard page can be reused as a generic board template with the following stable skeleton:

- KPI summary row
- evaluation or score card
- trend card
- distribution card
- geographic distribution module
- wide structure card
- ranking cards
- keyword or hotspot card

## 9. AI Generation Prompt

> Design a reusable enterprise backoffice dashboard page with a narrow left column and a wider right column. The page should include KPI cards, an evaluation/score module, a trend chart, a stage distribution module, a wide ownership/structure chart, and several ranking or hotspot cards. Keep the page generic enough to support multiple business domains. All chart and emphasis colors must derive from the existing global theme color system rather than hardcoded business-specific colors.

# Design MD: Dashboard Page

> Source: analytics / data-visualization Vue page

## 1. Page Positioning

This is a standard analytics dashboard for enterprise operations. It is used to show work order volume, processing status, score distribution, project ownership, hot cases, hot issue categories, and hot keywords.

It is not a flashy wallboard. It is a high-frequency monitoring view inside an enterprise workbench.

## 2. Visual Tone

- White background with card-based information modules
- Chart color theme is driven by `--accent-main-color`
- Build a chart palette from primary-color gradients so different charts still feel consistent
- Emphasize business information density and scanability
- Minimize decorative noise

## 3. Layout Structure

### Overall Grid

- Two-column layout: `3fr / 6fr`
- Unified gap: about `10px`
- Main page height target: around `85vh`

### Left Column

- Four stacked sections
- Top: three small metric cards
- Upper middle: work-order score card, split into average score and score distribution
- Lower middle: work-order trend statistics
- Bottom: work-order status statistics

### Right Main Area

- Three-column card grid
- First row spans full width: project ownership statistics
- Second row contains three parallel modules:
  - hot cases
  - hot issue categories
  - hot keywords

## 4. Core Components

### Metric Cards

- Content: submitted / processing / completed
- Numbers centered, `28px`, bold
- Supports animated number transitions such as `count-to`

### Chart Cards

- Card header has a `4px` left accent bar
- White card background, `1px` light border, `6px` radius
- Light shadow such as `0 2px 12px rgba(0, 0, 0, 0.06)`

### Chart Types

- Gauge or score ring: average score
- Bar/distribution charts: score distribution and project statistics
- Line/trend chart: work-order trend
- Status chart: work-order status
- Ranked list: hot cases and hot issue categories
- Word cloud: hot keywords

### Empty State

- Every chart needs an `el-empty` fallback
- Empty states should be vertically and horizontally centered
- Chart containers must not collapse when empty

## 5. Interaction Rules

- Parent components pass filter conditions and statistics data down; the dashboard layer should render rather than refetch by default
- When metrics change, number animations should replay
- Bar charts should support `dataZoom`
- Project statistics should support auto-hover carousel and pause on pointer hover
- When data is empty, destroy stale chart instances to avoid dirty visuals

## 6. Color and Data Visualization Rules

- Primary color comes from the business theme color
- Generate gradient ranges from primary to white and white to secondary tones
- All charts on the same page must use a unified palette system
- Secondary text, axes, and weak hints should stay in neutral gray scale

## 7. Business Expression Priorities

- Quantity metrics come first in the left column for fast scanning
- Quality metrics belong in the score module
- Ownership, popularity, and keywords expand horizontally on the right side
- The page structure should communicate: overview first, then cause, then hotspot

## 8. Design Output Recommendations

- In Figma, split into these frames:
  - metric and scoring area
  - trend and status area
  - project statistics area
  - hot cases / hot categories / hot keywords area
- Add a dedicated chart-spec page for:
  - card header style
  - numeric metric style
  - empty-state style
  - gradient palette rules

## 9. AI Generation Prompt

> Design an enterprise backoffice work-order analytics dashboard with a white card layout and desktop-first structure. Use a narrow left column and a wider right column. The left side contains three KPI cards, a score module, a trend chart, and a status chart. The right side contains project statistics, a ranked list of hot cases, hot issue categories, and a hot keyword word cloud. Use a disciplined business-dashboard style, theme-color-driven chart gradients, and high information density. Do not make it look like a flashy command center screen.

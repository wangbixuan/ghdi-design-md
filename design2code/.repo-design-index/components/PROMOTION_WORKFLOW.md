# Component Promotion Workflow

## Why Review Files Exist

Files such as `reports/component-index-review.md` are not the final component index.

They are review artifacts that answer:

- What did the scanner find?
- What did Codex understand after reading source?
- Is this component reusable for future page generation?
- What status should it have?
- What evidence supports the recommendation?

The final index remains:

- `components/COMPONENT_REGISTRY.json`
- `components/COMPONENT_CARDS.md`

## Review Report Language

Human-facing review reports must be written in Chinese.

Keep these identifiers in their original form:

- component names
- file paths
- prop names
- event names
- slot names
- status values such as `preferred`, `allowed`, `legacy`, `specialized`, `avoid`

This keeps the report readable for the team while preserving exact code references.

## Three-Layer Model

```txt
1. Machine facts
   .repo-design-index/components/generated/component-scan-summary.json

2. Codex review
   .repo-design-index/reports/components/README.md
   .repo-design-index/reports/components/<ComponentName>.md
   .repo-design-index/reports/component-feedback-log.md

3. Canonical memory
   .repo-design-index/components/COMPONENT_REGISTRY.json
   .repo-design-index/components/COMPONENT_CARDS.md
```

## Promotion Gate

A component can be promoted into the canonical registry only when these fields are known:

- `name`
- `path`
- `status`
- `category`
- `purpose`
- `keyProps`
- `keyEvents`
- `keywords`
- `examples`
- `notes`

## Status Rules

| Status | Meaning | Requires human approval |
|---|---|---|
| `preferred` | Recommended default for new pages | Yes |
| `allowed` | Safe when the intent or module convention matches | Recommended |
| `legacy` | Existing historical component, avoid for new pages | Recommended |
| `specialized` | Use only for explicit domain scenarios | Recommended |
| `avoid` | Do not use for new generation | Yes |

## Batch Workflow

1. Run deterministic scan.

```bash
node .design-agent/scripts/scan-components.mjs "D:/ywl/workbench/web/bigboss-base"
```

2. Build candidate review table and per-component review files.

```bash
node .design-agent/scripts/build-component-candidates.mjs
```

3. Let Codex review candidates in batches by category.

Suggested batch order:

- table/list containers
- upload/preview components
- person/department selectors
- rich text and form controls
- workflow components
- notice business components
- shell/navigation components

4. Human feedback can be free-form Chinese. Use `ghdi-component-feedback` to normalize it into the relevant component report.

5. Promote only reviewed components into `COMPONENT_REGISTRY.json` using `ghdi-promote-components`.

6. Update `COMPONENT_CARDS.md` for components that Codex should know how to use.

## Batch Review Prompt

```txt
Use ghdi-index-components.
Review the candidates in .repo-design-index/reports/component-index-candidates.md.
Only process category: <category>.
For each reusable component, propose a registry entry and component card.
Do not directly promote components with uncertain status; write them under "needs human review".
Write the human-facing review report in Chinese.
```

## Free-Form Feedback Prompt

```txt
Use ghdi-component-feedback.
我看了组件评审报告，反馈如下：
<直接写中文反馈>
```

## Promotion Prompt

```txt
Use ghdi-promote-components.
请把已经评审明确的组件提升到正式组件索引。
只处理 <component/category>，不确定的继续留在报告里。
```

## What Codex Adds Beyond The Scanner

The scanner can find:

- exported component names
- resolved paths
- rough props
- directory weights

Codex should add:

- business intent
- preferred/legacy/specialized judgment
- when-to-use and when-not-to-use rules
- canonical examples
- generation notes
- risk notes

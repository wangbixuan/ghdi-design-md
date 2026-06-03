# Component Indexing Strategy

## Goal

Build a component knowledge base that helps Codex understand and use team-owned components without repeatedly rediscovering the source code.

The index is not a replacement for source reading. It is a durable component description layer.

```txt
generated/component-scan-summary.json -> machine facts
components/cards/<ComponentName>.md -> LLM-generated and human-reviewed component descriptions
COMPONENT_REGISTRY.json -> machine-readable lookup index
COMPONENT_CARDS.md -> compact reading index for Codex
COMPONENT_CONFIG_REQUIREMENTS.md -> component configs that must be confirmed before generation
source code -> exact details when needed
```

## Source Codebase

```txt
bigboss-base
```

Primary component root:

```txt
bigboss-base/src/components
```

High-value source files:

- `src/components/expose.js`
- `src/components/INDEX.md`
- `src/components/baseTableV2/props.js`
- `src/components/baseTableV2/module/searchContent.vue`
- `src/components/form/uploadFile/props.js`

## Priority Tiers

| Tier | Meaning | Use in generation |
|---|---|---|
| `preferred` | Recommended for new pages | Use by default when intent matches |
| `allowed` | Valid but not always first choice | Use when target module already follows it |
| `legacy` | Existing historical component | Avoid for new pages unless matching legacy module |
| `specialized` | Heavy domain-specific component | Use only for explicit matching business needs |
| `avoid` | Do not use for new work | Mention reason if encountered |

## Initial Index Scope

Index these first:

- table/list containers
- search/filter controls
- form controls
- upload/preview controls
- shell/navigation components
- workflow components
- status/tag components

Avoid flattening every leaf component. Group dense subtrees such as `mvpFlow/icon/*`, `workFlow/dialog/*`, and `flowchart/components/*` as component families.

## Update Workflow

1. Run `.design-agent/scripts/scan-components.mjs`.
2. Run `.design-agent/scripts/generate-component-cards.mjs`.
3. Let Codex enrich `.repo-design-index/components/cards/<ComponentName>.md`.
4. Let humans review or revise component cards.
5. Run `ghdi-component-registry-build` to update `COMPONENT_REGISTRY.json` and `COMPONENT_CARDS.md`.

Before generating a page, read `COMPONENT_CONFIG_REQUIREMENTS.md` when the plan uses upload, workflow, table configuration, notice, Excel import, or system configuration components. These components often require business codes or existing platform configuration and should not be filled with invented values.

## Human Review Required

Human review is useful for:

- correcting component purpose and usage boundaries
- identifying internal child components
- marking canonical examples
- clarifying when a component should be preferred, allowed, legacy, specialized, or internal
- approving mappings from business intent to components

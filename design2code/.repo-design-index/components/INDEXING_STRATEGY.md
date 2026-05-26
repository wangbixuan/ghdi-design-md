# Component Indexing Strategy

## Goal

Build a component index that helps Codex make stable implementation choices before inspecting source details.

The index is not a replacement for source reading. It is a priority map.

```txt
COMPONENT_REGISTRY.json -> what should be considered first
COMPONENT_CARDS.md -> how and when to use it
source code -> exact props, events, and examples
```

## Source Codebase

```txt
D:\ywl\workbench\web\bigboss-base
```

Primary component root:

```txt
D:\ywl\workbench\web\bigboss-base\src\components
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
2. Review `.repo-design-index/components/generated/component-scan-summary.json`.
3. Promote relevant entries into `COMPONENT_REGISTRY.json`.
4. Update `COMPONENT_CARDS.md` for human-readable usage rules.
5. Mark status as `preferred`, `allowed`, `legacy`, `specialized`, or `avoid`.

## Human Review Required

Human review is required for:

- choosing preferred vs legacy
- marking canonical examples
- deciding whether a component should be recommended for new pages
- resolving conflicting historical usage
- approving new component mappings


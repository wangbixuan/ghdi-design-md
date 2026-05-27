---
name: ghdi-component-registry-build
description: |
  Build COMPONENT_REGISTRY.json and COMPONENT_CARDS.md from reviewed component cards.
triggers:
  - "生成组件索引"
  - "构建组件 registry"
  - "组件说明汇总"
  - "component registry build"
  - "从 card 生成索引"
od:
  mode: utility
  category: design-harness
---

# ghdi-component-registry-build

## Goal

根据已生成、已修订的组件 card，汇总正式组件索引：

- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`

## Required Context

读取：

- `.repo-design-index/components/cards/README.md`
- `.repo-design-index/components/cards/*.md`
- `.repo-design-index/components/generated/component-card-list.json`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`

必要时检查组件源码和真实引用样例。

## Output

更新：

- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`

写入汇总记录：

- `.repo-design-index/components/component-registry-build-log.md`

## Build Rules

- `COMPONENT_REGISTRY.json` 面向机器检索，保持结构化、简洁。
- `COMPONENT_CARDS.md` 面向 Codex 快速阅读，应该汇总关键组件说明，并链接到单组件 card。
- 单组件详细说明仍以 `components/cards/<ComponentName>.md` 为准。
- 不要把 draft 状态且明显未补充的 card 强行汇总为推荐组件。
- 对于已经 expose 的组件，即使不推荐默认使用，也可以进入 registry，并标注适用边界。

## Suggested Registry Fields

每个组件建议包含：

- `name`
- `path`
- `status`
- `category`
- `framework`
- `uiBase`
- `purpose`
- `keyProps`
- `keyEvents`
- `keywords`
- `examples`
- `card`
- `notes`

## Status Guidance

- `preferred`：新页面默认优先考虑。
- `allowed`：可以使用，但需要符合场景。
- `legacy`：历史组件，维护旧页面时使用。
- `specialized`：只适合特定业务或复杂场景。
- `internal`：内部子组件，不建议页面生成直接使用。

## Self Check

完成前确认：

- `COMPONENT_REGISTRY.json` 是合法 JSON。
- registry 中的 `card` 路径能指向存在的组件 card。
- `COMPONENT_CARDS.md` 链接到单组件 card。
- 不确定组件没有被标成 `preferred`。


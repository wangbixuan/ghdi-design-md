---
name: ghdi-component-scan
description: |
  Scan the local bigboss-base component codebase and generate LLM-readable component cards.
triggers:
  - "扫描组件"
  - "生成组件说明"
  - "component scan"
  - "组件 card"
  - "组件知识库"
od:
  mode: utility
  category: design-harness
---

# ghdi-component-scan

## Goal

扫描本地 `bigboss-base` 组件代码库，并为 expose 出来的组件生成中文组件说明 card。

注意：这个 skill 包含两个层次：

1. 确定性脚本初始化 card 骨架。
2. Codex 阅读源码和引用样例，补充组件语义说明。

只跑脚本只能得到 `initialized` 状态的 card，不能视为已完成组件索引。

这个 skill 的重点不是判断组件能不能用。`bigboss-base` 已经是团队沉淀的基础组件库，默认这些组件都值得被理解和记录。这个 skill 要解决的是：

```txt
让 Codex 和没有接触源码的团队成员，也能快速理解组件用途、使用方式和注意事项。
```

## Required Context

先读取：

- `.design-agent/config/project.config.json`
- `.repo-design-index/components/INDEXING_STRATEGY.md`
- `seed/Component.md`
- `bigboss-base/src/components/INDEX.md` 对应的本地文件，如果配置路径存在
- `bigboss-base/src/components/expose.js` 对应的本地文件，如果配置路径存在

组件代码库路径必须来自：

- `.design-agent/config/project.config.json` 的 `componentCodebaseRoot`
- 或用户在对话中提供的本地路径

如果配置路径不存在，不要继续猜路径。请提示用户提供本地 `bigboss-base` 路径，或让用户更新：

```txt
.design-agent/config/project.config.json
```

## Deterministic Steps

运行扫描：

```bash
node .design-agent/scripts/scan-components.mjs
```

如果用户提供了路径，也可以运行：

```bash
node .design-agent/scripts/scan-components.mjs "<用户本地 bigboss-base 路径>"
```

生成 card 骨架：

```bash
node .design-agent/scripts/generate-component-cards.mjs
```

生成 card 列表：

```bash
node .design-agent/scripts/build-component-registry.mjs
```

## LLM Enrichment Steps

脚本完成后，Codex 必须继续做语义补全。不要把 `initialized` 状态的 card 当作完成结果。

对每个需要补全的组件：

1. 打开 `.repo-design-index/components/cards/<ComponentName>.md`。
2. 根据 card 中的源码路径，读取对应组件源码。
3. 用 `rg` 在 `bigboss-base` 中查找真实引用样例。
4. 补充 card 中的：
   - 组件定位
   - 适用场景
   - 不适用场景
   - 常用 props
   - 常用事件
   - 常用插槽
   - 典型用法
   - 生成页面时的注意事项
5. 将 `说明状态` 从 `initialized` 改为：
   - `codex-drafted`：Codex 已补充，待人工审阅。
   - `human-reviewed`：人工已确认或修订。

批量处理时，不要一次性承诺完成全部组件。建议按批次处理，例如每次 5 到 10 个组件，并在输出里说明本批次完成了哪些 card。

## Output

脚本会生成或更新：

- `.repo-design-index/components/generated/component-scan-summary.json`
- `.repo-design-index/components/generated/component-card-list.json`
- `.repo-design-index/components/cards/README.md`
- `.repo-design-index/components/cards/<ComponentName>.md`

完成语义补全后的 card 至少包含：

每个组件 card 至少包含：

- 组件定位
- 适用场景
- 不适用场景
- 常用 props
- 常用事件
- 常用插槽
- 典型用法
- 生成页面时的注意事项
- 人工修订记录

## Enrichment Rules

确定性脚本只能生成 card 骨架。Codex 后续必须根据源码和真实引用样例补充：

- 组件的业务语义
- 什么时候该用
- 什么时候不该用
- 关键 props / events 的含义
- 常见插槽和用法
- 典型代码片段
- 容易误用的地方

## Rules

- 人工可读内容使用中文。
- 组件名、路径、props、events、slots 保持代码原文。
- 写入 `.repo-design-index`、报告、card、registry 的路径必须使用相对路径或逻辑仓库路径，例如 `bigboss-base/src/components/baseTableV2/index.vue`。
- 本机绝对路径只能用于运行时读取源码、命令参数或个人本地配置，不要沉淀到团队索引产物里。
- 不要把所有源码复制进 card，只保留必要片段和解释。
- 不要直接改 `COMPONENT_REGISTRY.json`，registry 由 `ghdi-component-registry-build` 根据已修订 cards 汇总。

## Self Check

完成前确认：

- 配置中的组件代码库路径存在。
- 已生成 `component-scan-summary.json`。
- 已生成 `components/cards/README.md`。
- expose 出来的组件都有对应 card。
- 本次要求补全的 card 已从 `initialized` 更新为 `codex-drafted` 或 `human-reviewed`。

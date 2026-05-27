# 设计 Agent Harness

这个目录存放由 Codex 驱动的设计记忆 harness，用来生成继承现有 GHDI / bigboss-base 系统风格的新页面。

当前 harness 刻意保持轻量：

- `.repo-design-index/` 存放可长期沉淀的项目设计记忆。
- `.design-agent/skills/` 存放 Codex 可调用的任务流程。
- `.design-agent/scripts/` 存放确定性扫描和检查脚本。
- `design-inputs/` 存放页面级自然语言输入和生成的 IR 文件。

## 目录结构

```txt
.design-agent/
├── config/
│   └── project.config.json
├── scripts/
│   ├── scan-components.mjs
│   ├── generate-component-cards.mjs
│   └── build-component-registry.mjs
└── skills/
    ├── 00-component-scan/
    ├── 01-component-card-feedback/
    ├── 02-component-registry-build/
    ├── 03-design-memory-scan/
    ├── 04-design-memory-feedback/
    ├── 05-design-memory-build/
    ├── 10-page-intent-to-ir/
    ├── 11-page-plan/
    ├── 12-page-generate/
    ├── 13-page-score/
    └── 14-guideline-update/
```

## 最小闭环

```txt
组件说明线：
00-component-scan
-> 01-component-card-feedback
-> 02-component-registry-build

设计记忆线：
03-design-memory-scan
-> 04-design-memory-feedback
-> 05-design-memory-build

页面生成线：
10-page-intent-to-ir
-> 11-page-plan
-> 12-page-generate
-> 13-page-score
-> 14-guideline-update
```

这些 skill 的作用是约束 Codex 的工作方式：明确应该读取什么、输出什么，以及哪些步骤不能跳过。

## Skill 总览

安装这些 skill 的步骤见：

```txt
.design-agent/SKILL_INSTALL_GUIDE.md
```

| Skill 目录 | Skill 名称 | 用途 |
|---|---|---|
| `00-component-scan` | `ghdi-component-scan` | 扫描本地基础组件代码库，生成可被 LLM 使用、可被人工修订的组件说明卡片 |
| `01-component-card-feedback` | `ghdi-component-card-feedback` | 接收中文人工反馈，修订对应组件说明卡片 |
| `02-component-registry-build` | `ghdi-component-registry-build` | 从已修订的组件说明卡片构建正式组件索引 |
| `03-design-memory-scan` | `ghdi-design-memory-scan` | 扫描旧 seed、风格规则、页面模式和代表性页面，生成设计记忆 cards |
| `04-design-memory-feedback` | `ghdi-design-memory-feedback` | 接收中文反馈，修订界面风格 card 或页面模式 card |
| `05-design-memory-build` | `ghdi-design-memory-build` | 从已审阅 cards 构建设计风格和页面模式正式索引 |
| `10-page-intent-to-ir` | `ghdi-intent-to-ir` | 将自然语言页面需求转换为 `design_ir.json` |
| `11-page-plan` | `ghdi-plan-page` | 根据设计记忆和 IR 生成页面实现计划 |
| `12-page-generate` | `ghdi-generate-page` | 按页面计划生成或修改 Vue2 + Element UI 页面 |
| `13-page-score` | `ghdi-score-page` | 对生成页面做组件复用、页面模式和风格一致性评分 |
| `14-guideline-update` | `ghdi-update-guidelines` | 将页面评审反馈沉淀为规则补丁 |

## 组件说明线

### 00-component-scan

Skill 名称：`ghdi-component-scan`

使用场景：

- 初次建立组件语义索引。
- `bigboss-base` 组件发生变化后刷新扫描摘要。
- 需要为组件生成按组件拆分的中文说明卡片。

路径来源：

- 默认读取 `.design-agent/config/project.config.json` 中的 `componentCodebaseRoot`。
- 也可以在运行脚本时显式传入路径。
- 如果配置缺失或路径不存在，Codex 应该先请用户提供本机 `bigboss-base` 路径，再继续扫描。

主要读取：

- `.design-agent/config/project.config.json`
- `.repo-design-index/components/INDEXING_STRATEGY.md`
- `seed/Component.md`
- `<bigboss-base>/src/components/INDEX.md`
- `<bigboss-base>/src/components/expose.js`

主要产出：

- `.repo-design-index/components/generated/component-scan-summary.json`
- `.repo-design-index/components/generated/component-card-list.json`
- `.repo-design-index/components/cards/README.md`
- `.repo-design-index/components/cards/<ComponentName>.md`

说明：

这个 skill 不做“组件能不能用”的审批。`bigboss-base` 里的组件默认是团队沉淀资产，扫描的目标是把代码里的组件转成 LLM 可读、人工可审的组件说明。

需要注意：脚本只能生成 `initialized` 状态的组件卡片骨架。真正可用的组件说明，还需要 Codex 继续阅读组件源码和真实引用样例，把卡片补充到 `codex-drafted` 状态，再交给人工审阅。

### 01-component-card-feedback

Skill 名称：`ghdi-component-card-feedback`

使用场景：

- 人工看完某个组件说明卡片后，用中文提出修正意见。
- 用户不想记 props、slots、usage 等英文模板，只想自然表达组件定位、适用场景或注意事项。

示例反馈：

```txt
uploadPdfFile 只在明确 PDF 上传时推荐，不要泛化成所有附件上传。
ViewFile 是 File 组件内部展示模块，页面生成时不要直接使用。
chartsLine 可以用于 dashboard 趋势图，数据为空时要保留空态。
```

主要读取：

- `.repo-design-index/components/cards/<ComponentName>.md`
- `.repo-design-index/components/generated/component-scan-summary.json`
- `.repo-design-index/components/INDEXING_STRATEGY.md`

主要产出：

- 更新对应的 `.repo-design-index/components/cards/<ComponentName>.md`
- `.repo-design-index/components/component-card-feedback-log.md`

说明：

这个 skill 只修订组件说明卡片，不直接修改正式索引。正式索引由下一步统一构建。

### 02-component-registry-build

Skill 名称：`ghdi-component-registry-build`

使用场景：

- 一批组件说明卡片已经完成初步修订。
- 需要把卡片内容整理为页面生成时可消费的正式组件索引。

主要读取：

- `.repo-design-index/components/cards/<ComponentName>.md`
- `.repo-design-index/components/generated/component-scan-summary.json`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`

主要产出：

- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`
- `.repo-design-index/components/component-registry-build-log.md`

说明：

这个 skill 是从“人工可读卡片”到“页面生成可用索引”的转换层。后续页面生成 skill 应优先读取正式索引，必要时再回看组件卡片。

## 设计记忆线

### 03-design-memory-scan

Skill 名称：`ghdi-design-memory-scan`

使用场景：

- 初始化界面风格和页面模式 cards。
- 从旧 `seed/` 迁移可复用规则。
- 扫描真实页面，补充页面模式证据。

主要读取：

- `seed/design.md`
- `seed/theme-color-logic.md`
- `seed/page-designs/*.md`
- `.repo-design-index/style/DESIGN.md`
- `.repo-design-index/style/STYLE_REGISTRY.json`
- `.repo-design-index/patterns/PATTERN_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`

主要产出：

- `.repo-design-index/style/cards/*.md`
- `.repo-design-index/style/evidence/*.md`
- `.repo-design-index/patterns/cards/*.md`
- `.repo-design-index/patterns/evidence/*.md`

### 04-design-memory-feedback

Skill 名称：`ghdi-design-memory-feedback`

使用场景：

- 人工对界面风格提出中文反馈。
- 人工对页面模式提出中文反馈。
- 需要把反馈写回对应 card，而不是停留在聊天记录。

主要产出：

- 更新 `.repo-design-index/style/cards/*.md`
- 或更新 `.repo-design-index/patterns/cards/*.md`
- `.repo-design-index/reports/design-memory-feedback-log.md`

### 05-design-memory-build

Skill 名称：`ghdi-design-memory-build`

使用场景：

- 风格或页面模式 cards 已经完成修订。
- 需要同步正式索引给页面生成链路使用。

主要产出：

- `.repo-design-index/style/STYLE_REGISTRY.json`
- `.repo-design-index/patterns/PATTERN_REGISTRY.json`
- 必要时更新 `.repo-design-index/style/DESIGN.md`
- 必要时更新 `.repo-design-index/patterns/PAGE_PATTERNS.md`

## 页面生成线

### 10-page-intent-to-ir

Skill 名称：`ghdi-intent-to-ir`

使用场景：

- 用户提供自然语言页面需求。
- 需要把需求结构化成可规划的 `design_ir.json`。

主要读取：

- `SYSTEM_DESIGN.md`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`
- `.repo-design-index/generation/GENERATION_RULES.md`
- `design-inputs/<page>/intent.md`

主要产出：

- `design-inputs/<page>/design_ir.json`

说明：

这个 skill 不生成代码，只做需求结构化。

### 11-page-plan

Skill 名称：`ghdi-plan-page`

使用场景：

- 已经有 `design_ir.json`。
- 需要在写代码前生成 `Page Implementation Plan`。

主要读取：

- `SYSTEM_DESIGN.md`
- `.repo-design-index/style/DESIGN.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`
- `.repo-design-index/generation/GENERATION_RULES.md`
- `design-inputs/<page>/design_ir.json`

主要产出：

- `.codex-task/<page>/TASK.md`
- `.codex-task/<page>/page-plan.md`
- `.codex-task/<page>/checklist.md`

说明：

这个 skill 是页面生成前的关键闸门。没有计划，不应该直接写页面代码。

### 12-page-generate

Skill 名称：`ghdi-generate-page`

使用场景：

- 已经有页面计划。
- 需要在目标 Vue2 + Element UI 项目中生成或修改页面代码。

主要读取：

- `.codex-task/<page>/TASK.md`
- `.codex-task/<page>/page-plan.md`
- `.codex-task/<page>/checklist.md`
- `.repo-design-index/style/DESIGN.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`
- `.repo-design-index/generation/GENERATION_RULES.md`

主要产出：

- 目标代码库中的页面代码
- `.codex-task/<page>/implementation-notes.md`

说明：

这个 skill 应该优先复用正式组件索引中的组件，不应该绕过已有组件重复造轮子。

### 13-page-score

Skill 名称：`ghdi-score-page`

使用场景：

- 页面代码已经生成。
- 需要检查组件复用、页面模式、风格一致性和业务完整性。

主要读取：

- `.codex-task/<page>/page-plan.md`
- `.codex-task/<page>/implementation-notes.md`
- `.repo-design-index/generation/REVIEW_RUBRIC.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`
- 生成页面文件

主要产出：

- `.repo-design-index/reports/latest-score.md`
- `.codex-task/<page>/score.md`

说明：

评分不是审美打分，而是检查页面是否继承现有系统设计记忆。

### 14-guideline-update

Skill 名称：`ghdi-update-guidelines`

使用场景：

- 页面生成后，人工提出风格、组件或页面模式反馈。
- 需要把反馈转成可评审的规则补丁。

主要读取：

- `.codex-task/<page>/score.md`
- `.codex-task/<page>/feedback.md`
- `.repo-design-index/style/DESIGN.md`
- `.repo-design-index/components/COMPONENT_CARDS.md`
- `.repo-design-index/patterns/PAGE_PATTERNS.md`

主要产出：

- `.repo-design-index/reports/guideline-patches/<date>-<page>.md`

说明：

这个 skill 不直接修改正式规则，只提出 guideline patch，等人工确认后再合并。

## 目标代码库路径

基础组件代码库路径写在个人本地配置里：

```txt
.design-agent/config/project.config.json
```

每个人本机路径可能不同，因此不要把某个人电脑上的绝对路径当作通用默认值。新成员第一次使用时，需要先把 `componentCodebaseRoot` 改成自己的本地路径，或者在运行扫描脚本时显式传入路径。

本机绝对路径只允许出现在个人配置、命令参数和 Codex 临时工作上下文里。写入 `.repo-design-index`、`.codex-task`、报告、card、registry 的路径必须使用相对路径或逻辑仓库路径，例如：

```txt
bigboss-base/src/components/baseTableV2/index.vue
bigboss-wedo/src/module/main/ema/assetMaintenance/retirement/table.vue
```

如果 Codex 无法根据用户给出的路径判断仓库根目录，应先向用户确认对应项目的本地路径或仓库名，再继续沉淀。

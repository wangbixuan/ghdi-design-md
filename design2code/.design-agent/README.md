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
│   └── build-component-candidates.mjs
└── skills/
    ├── 00-component-index/
    ├── 01-component-feedback/
    ├── 02-component-promote/
    ├── 10-page-intent-to-ir/
    ├── 11-page-plan/
    ├── 12-page-generate/
    ├── 13-page-score/
    └── 14-guideline-update/
```

## 最小闭环

```txt
组件索引线：
00-component-index
-> 01-component-feedback
-> 02-component-promote

页面生成线：
10-page-intent-to-ir
-> 11-page-plan
-> 12-page-generate
-> 13-page-score
-> 14-guideline-update
```

这些 skill 的作用是约束 Codex 的工作方式：明确应该读取什么、输出什么，以及哪些步骤不能跳过。

## Skill 总览

| Skill 目录 | Skill 名称 | 用途 |
|---|---|---|
| `00-component-index` | `ghdi-index-components` | 扫描组件代码库，生成组件候选评审材料 |
| `01-component-feedback` | `ghdi-component-feedback` | 接收中文人工反馈，更新单组件评审文件 |
| `02-component-promote` | `ghdi-promote-components` | 将已评审组件提升到正式组件索引 |
| `10-page-intent-to-ir` | `ghdi-intent-to-ir` | 将自然语言页面需求转换为 `design_ir.json` |
| `11-page-plan` | `ghdi-plan-page` | 根据设计记忆和 IR 生成页面实现计划 |
| `12-page-generate` | `ghdi-generate-page` | 按页面计划生成或修改 Vue2 + Element UI 页面 |
| `13-page-score` | `ghdi-score-page` | 对生成页面做组件复用、页面模式和风格一致性评分 |
| `14-guideline-update` | `ghdi-update-guidelines` | 将页面评审反馈沉淀为规则补丁 |

## 组件索引线

### 00-component-index

Skill 名称：`ghdi-index-components`

使用场景：

- 初次建立组件索引。
- `bigboss-base` 组件发生变化后刷新候选报告。
- 想知道哪些组件可进入正式索引。

主要读取：

- `.design-agent/config/project.config.json`
- `.repo-design-index/components/INDEXING_STRATEGY.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`
- `seed/Component.md`
- `D:/ywl/workbench/web/bigboss-base/src/components/INDEX.md`
- `D:/ywl/workbench/web/bigboss-base/src/components/expose.js`

主要产出：

- `.repo-design-index/components/generated/component-scan-summary.json`
- `.repo-design-index/reports/components/README.md`
- `.repo-design-index/reports/components/<ComponentName>.md`

说明：

这个 skill 只负责扫描和生成候选评审材料，不应该把所有候选组件直接写入正式索引。

### 01-component-feedback

Skill 名称：`ghdi-component-feedback`

使用场景：

- 人工看完某个组件评审文件后，用中文提出修正意见。
- 用户不想记 status、category 等英文模板，只想自然表达判断。

示例反馈：

```txt
uploadPdfFile 可以进索引，但不要默认推荐，只在明确 PDF 上传时使用。
ViewFile 是 File 内部展示模块，不要让页面生成时直接用。
chartsLine 可以给 dashboard 用，状态 allowed。
```

主要读取：

- `.repo-design-index/reports/components/README.md`
- `.repo-design-index/reports/components/<ComponentName>.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`
- `.repo-design-index/components/PROMOTION_WORKFLOW.md`

主要产出：

- 更新对应的 `.repo-design-index/reports/components/<ComponentName>.md`
- `.repo-design-index/reports/component-feedback-log.md`

说明：

这个 skill 不直接修改正式索引，只把人工反馈归档并结构化。

### 02-component-promote

Skill 名称：`ghdi-promote-components`

使用场景：

- 某些组件已经完成评审，需要进入正式组件索引。
- 需要把组件评审结论写入 `COMPONENT_REGISTRY.json` 和 `COMPONENT_CARDS.md`。

主要读取：

- `.repo-design-index/reports/components/<ComponentName>.md`
- `.repo-design-index/reports/component-feedback-log.md`
- `.repo-design-index/components/PROMOTION_WORKFLOW.md`
- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`

主要产出：

- `.repo-design-index/components/COMPONENT_REGISTRY.json`
- `.repo-design-index/components/COMPONENT_CARDS.md`
- `.repo-design-index/reports/component-promotion-summary.md`

说明：

只有评审明确的组件才应该被提升。不确定的组件继续留在 reports 里。

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

## 目标代码库

当前基础组件代码库配置为：

```txt
D:\ywl\workbench\web\bigboss-base
```

# GHDI Design-to-Code Harness 使用说明

本文档说明当前 harness 的功能、目录、安装方式、标准流程和 Codex 配合方式。

这个 harness 的目标不是直接从 Figma 原型图生成页面，而是先建立一个可被 Codex 使用的设计记忆系统：通过自然语言需求、团队组件索引、系统界面风格和页面模式，生成与现有系统风格一致的 Vue2 + Element UI 页面。

## 1. 核心目标

当前 harness 解决四件事：

1. 让 Codex 理解团队基础组件。
2. 让 Codex 理解现有系统的界面风格。
3. 让 Codex 理解典型页面模式。
4. 让 Codex 按固定流程把自然语言需求转成页面代码，并把评审反馈继续沉淀回设计记忆。

最终形成的闭环是：

```txt
自然语言需求
-> 结构化页面意图 design_ir.json
-> 页面实现计划
-> Vue2 + Element UI 页面代码
-> 页面评分和人工反馈
-> 更新组件索引 / 风格规则 / 页面模式
```

## 2. 关键原则

### 2.1 Codex 驱动

整个 harness 是给 Codex 使用的。脚本只负责确定性扫描、汇总和构建，真正的语义理解、组件说明补全、页面模式提炼、人工反馈吸收，都由 Codex 按 skill 流程完成。

### 2.2 先沉淀，再生成

不要让 Codex 每次生成页面时都临时翻源码、临时猜风格。应该先把可复用知识沉淀为：

- 组件 card
- 风格 card
- 页面模式 card
- registry 索引
- evidence 来源记录
- guideline patch

页面生成时优先读取这些沉淀资产。

### 2.3 路径必须可迁移

写入 harness 产物的路径必须使用相对路径或逻辑仓库路径。

正确示例：

```txt
bigboss-base/src/components/baseTableV2/index.vue
bigboss-wedo/src/module/main/ema/assetMaintenance/retirement/table.vue
.repo-design-index/components/cards/baseTableV2.md
```

不要在 card、registry、evidence、report、README 中写入任何成员本机绝对路径。

本机绝对路径只能用于：

- 个人本地配置
- 命令参数
- Codex 临时读取源码

如果 Codex 找不到本地代码库，应向用户询问，例如：

```txt
请提供你本机 bigboss-base 项目的根目录路径。
请提供你本机 bigboss-wedo 项目的根目录路径。
```

### 2.4 人工评审是必要环节

LLM 可以负责生成草稿，但团队知识必须经过人工确认后再进入正式索引。

常见人工介入点：

- 修正组件用途和边界。
- 标记组件是否推荐用于新页面。
- 确认某个真实页面是否代表推荐页面模式。
- 判断某个视觉规则是全局规则还是局部业务特例。
- 审阅生成页面是否符合业务和系统风格。

## 3. 目录结构

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

.repo-design-index/
├── components/
├── style/
├── patterns/
├── generation/
├── examples/
└── reports/

design-inputs/
seed/
.codex-task/
```

目录含义：

| 目录 | 作用 |
|---|---|
| `.design-agent/skills/` | Codex 可安装和调用的 harness skill |
| `.design-agent/scripts/` | 确定性扫描、生成、构建脚本 |
| `.design-agent/config/` | 本地项目配置 |
| `.repo-design-index/` | 长期沉淀的设计记忆和正式索引 |
| `seed/` | 早期探索成果，作为设计记忆的来源之一 |
| `design-inputs/` | 页面自然语言输入和 IR 文件 |
| `.codex-task/` | 单次页面生成任务产物 |

## 4. 本地配置

配置文件：

```txt
.design-agent/config/project.config.json
```

推荐结构：

```json
{
  "name": "ghdi-design-md-harness",
  "targetStack": "Vue2 + Element UI",
  "workspaceRoot": ".",
  "componentCodebaseRoot": "",
  "componentRoot": "",
  "knownCodebases": {
    "bigboss-base": "",
    "bigboss-wedo": ""
  },
  "pathPolicy": {
    "persistedPathFormat": "repo-relative",
    "externalRepoPathFormat": "<repo-name>/<path-from-repo-root>",
    "localAbsolutePaths": "runtime-only"
  }
}
```

新成员第一次使用时，需要把本机代码库路径填到个人配置里，或者在 Codex 对话中提供。

示例：

```json
{
  "componentCodebaseRoot": "<你的本地 bigboss-base 根目录>",
  "componentRoot": "<你的本地 bigboss-base 根目录>/src/components",
  "knownCodebases": {
    "bigboss-base": "<你的本地 bigboss-base 根目录>",
    "bigboss-wedo": "<你的本地 bigboss-wedo 根目录>"
  }
}
```

这些本地路径只用于 Codex 读取源码，不应沉淀进 `.repo-design-index`。

## 5. 安装 Codex Skills

harness 的流程通过 Codex skill 固化。安装方式见：

```txt
.design-agent/SKILL_INSTALL_GUIDE.md
```

推荐在项目根目录执行：

```powershell
$sourceRoot = Resolve-Path -LiteralPath ".design-agent/skills"
$targetRoot = if ($env:CODEX_HOME) {
  Join-Path $env:CODEX_HOME "skills"
} else {
  Join-Path $HOME ".codex\skills"
}

New-Item -ItemType Directory -Force -Path $targetRoot | Out-Null

Get-ChildItem -LiteralPath $sourceRoot -Directory | ForEach-Object {
  $destination = Join-Path $targetRoot $_.Name
  if (Test-Path -LiteralPath $destination) {
    Remove-Item -LiteralPath $destination -Recurse -Force
  }
  Copy-Item -LiteralPath $_.FullName -Destination $destination -Recurse
  Write-Output "installed $destination"
}
```

安装后需要新开 Codex 会话或重启 Codex，确保 skill 被加载。

## 6. Skill 总览

| 顺序 | Skill 名称 | 作用 |
|---|---|---|
| 00 | `ghdi-component-scan` | 扫描基础组件代码库，生成组件说明 card |
| 01 | `ghdi-component-card-feedback` | 用中文反馈修订组件 card |
| 02 | `ghdi-component-registry-build` | 从组件 card 构建正式组件索引 |
| 03 | `ghdi-design-memory-scan` | 扫描 seed、风格、页面模式和真实页面，生成设计记忆 card |
| 04 | `ghdi-design-memory-feedback` | 用中文反馈修订风格 card 或页面模式 card |
| 05 | `ghdi-design-memory-build` | 从设计记忆 card 构建正式风格和页面模式索引 |
| 10 | `ghdi-intent-to-ir` | 将自然语言需求转成 `design_ir.json` |
| 11 | `ghdi-plan-page` | 根据 IR、组件索引、风格索引、页面模式生成实现计划 |
| 12 | `ghdi-generate-page` | 根据页面计划生成或修改 Vue 页面 |
| 13 | `ghdi-score-page` | 对生成页面做一致性评分 |
| 14 | `ghdi-update-guidelines` | 将评审反馈整理成规则补丁 |

## 7. 组件索引流程

组件索引的目标是让 Codex 和团队成员不用每次都重新翻 `bigboss-base` 源码，也能理解组件的用途、边界和典型用法。

### 7.1 标准流程

```txt
ghdi-component-scan
-> ghdi-component-card-feedback
-> ghdi-component-registry-build
```

### 7.2 第一步：扫描组件

对 Codex 说：

```txt
用 ghdi-component-scan 扫描 bigboss-base，生成组件说明卡片。
```

如果 Codex 找不到本地代码库，会要求提供本机 `bigboss-base` 根目录。

主要产物：

```txt
.repo-design-index/components/generated/component-scan-summary.json
.repo-design-index/components/generated/component-card-list.json
.repo-design-index/components/cards/README.md
.repo-design-index/components/cards/<ComponentName>.md
```

注意：刚生成的 card 只是初始骨架，不能直接当作正式组件知识。

### 7.3 第二步：Codex 补全组件 card

对 Codex 说：

```txt
用 ghdi-component-scan 补全 baseTableV2、File、SearchSelectUser 的组件 card，阅读源码和真实引用样例后把状态改成 codex-drafted。
```

Codex 应补充：

- 组件定位
- 适用场景
- 不适用场景
- 常用 props
- 常用事件
- 常用插槽
- 典型用法
- 生成页面时注意事项

### 7.4 第三步：人工反馈修订

人工可以直接用中文反馈，不需要记模板。

示例：

```txt
用 ghdi-component-card-feedback 修改 TableBase：
TableBase 已经不推荐新页面使用，新表格页面统一使用 baseTableV2。
```

Codex 应把反馈沉淀回对应 card，并记录人工修订记录。

### 7.5 第四步：构建正式组件索引

对 Codex 说：

```txt
用 ghdi-component-registry-build 从组件卡片构建正式组件索引。
```

主要产物：

```txt
.repo-design-index/components/COMPONENT_REGISTRY.json
.repo-design-index/components/COMPONENT_CARDS.md
.repo-design-index/components/generated/component-card-list.json
.repo-design-index/components/component-registry-build-log.md
```

页面生成时，Codex 应优先读取 `COMPONENT_REGISTRY.json` 和 `COMPONENT_CARDS.md`，再按需打开单组件 card。

## 8. 界面风格和页面模式沉淀流程

设计记忆分为两类：

| 类型 | 存放位置 | 说明 |
|---|---|---|
| 界面风格 | `.repo-design-index/style/` | 颜色、密度、布局、表格、弹窗、审批文书等视觉规则 |
| 页面模式 | `.repo-design-index/patterns/` | 列表管理页、配置页、仪表盘、审批详情页等页面结构模式 |

### 8.1 标准流程

```txt
ghdi-design-memory-scan
-> ghdi-design-memory-feedback
-> ghdi-design-memory-build
```

### 8.2 扫描旧 seed

旧探索内容在：

```txt
seed/design.md
seed/theme-color-logic.md
seed/Component.md
seed/page-designs/
```

这些内容不是直接作为最终规则使用，而是作为来源证据，被重新整理进 `.repo-design-index`。

### 8.3 扫描真实页面

对 Codex 说：

```txt
用 ghdi-design-memory-scan 扫描 bigboss-wedo/src/module/main/ema/assetMaintenance/retirement/table.vue，这个页面是典型审批流详情页面，看看如何沉淀。
```

如果 Codex 缺少本地 `bigboss-wedo` 路径，应先向用户索取本机根目录。

扫描真实页面时应产出：

```txt
.repo-design-index/patterns/cards/<pattern-name>.md
.repo-design-index/patterns/<pattern-name>.md
.repo-design-index/patterns/evidence/<evidence-name>.md
.repo-design-index/style/cards/<style-name>.md
.repo-design-index/style/evidence/<evidence-name>.md
.repo-design-index/reports/design-memory-scan-summary.md
```

示例：资产处置审批详情页已沉淀为候选模式：

```txt
.repo-design-index/patterns/cards/approval-flow-detail-page.md
.repo-design-index/style/cards/approval-document-visual-style.md
```

### 8.4 人工反馈修订

对 Codex 说：

```txt
用 ghdi-design-memory-feedback 修改 approval-flow-detail-page：
这个模式不只用于资产处置，也适用于采购、报修、资产变更等审批申请详情。
```

Codex 应修订对应 card，并保留人工修订记录。

### 8.5 构建设计记忆正式索引

对 Codex 说：

```txt
用 ghdi-design-memory-build 构建设计风格和页面模式索引。
```

主要产物：

```txt
.repo-design-index/style/STYLE_REGISTRY.json
.repo-design-index/style/DESIGN.md
.repo-design-index/patterns/PATTERN_REGISTRY.json
.repo-design-index/patterns/PAGE_PATTERNS.md
```

页面生成时，Codex 应优先读取 registry，再读取匹配的 card 和 evidence。

## 9. 页面生成流程

页面生成线的目标是从自然语言需求生成可落地的 Vue2 + Element UI 页面。

### 9.1 标准流程

```txt
ghdi-intent-to-ir
-> ghdi-plan-page
-> ghdi-generate-page
-> ghdi-score-page
-> ghdi-update-guidelines
```

### 9.2 第一步：自然语言转 IR

对 Codex 说：

```txt
用 ghdi-intent-to-ir，根据下面需求生成页面 IR：
我要做一个资产处置审批详情页，包含基础信息、技术鉴定人员、资产明细、附件、审批流和导出申请。
```

主要产物：

```txt
design-inputs/<page-name>/design_ir.json
```

IR 应描述：

- 页面类型
- 用户角色
- 数据对象
- 操作行为
- 页面区块
- 组件意图
- 状态流
- 约束和非目标

### 9.3 第二步：生成页面实现计划

对 Codex 说：

```txt
用 ghdi-plan-page 根据 design_ir.json 生成页面实现计划。
```

Codex 应读取：

```txt
.repo-design-index/components/COMPONENT_REGISTRY.json
.repo-design-index/components/COMPONENT_CARDS.md
.repo-design-index/style/STYLE_REGISTRY.json
.repo-design-index/style/DESIGN.md
.repo-design-index/patterns/PATTERN_REGISTRY.json
.repo-design-index/patterns/PAGE_PATTERNS.md
```

主要产物：

```txt
.codex-task/<page-name>/page-plan.md
```

实现计划应明确：

- 匹配哪个页面模式
- 使用哪些基础组件
- 哪些组件不能使用
- 页面区块结构
- 数据流和接口占位
- 样式继承规则
- 生成时风险点

### 9.4 第三步：生成或修改页面代码

对 Codex 说：

```txt
用 ghdi-generate-page 根据 page-plan.md 生成页面代码。
```

Codex 应按现有代码库风格生成 Vue2 + Element UI 页面，优先复用团队组件。

生成时必须注意：

- 新表格页面优先使用 `baseTableV2`。
- 普通列表页不要使用审批文书式重边框。
- 审批流详情页可使用 `WorkFlowDetail`。
- 附件场景优先使用 `File`。
- 人员选择优先使用 `SearchSelectUser`，旧页面维护时才考虑 `searchPersonnel`。
- 生成代码中的引用路径应符合目标项目现有习惯。

主要产物通常在目标业务代码库中，同时记录：

```txt
.codex-task/<page-name>/generation-summary.md
```

### 9.5 第四步：评分

对 Codex 说：

```txt
用 ghdi-score-page 评分刚生成的页面。
```

评分维度：

- 组件复用是否正确。
- 页面模式是否匹配。
- 视觉风格是否一致。
- 业务完整性是否足够。
- 是否使用了不推荐组件。
- 是否有明显布局和交互风险。

主要产物：

```txt
.codex-task/<page-name>/score.md
```

### 9.6 第五步：沉淀评审反馈

如果人工看完页面后提出反馈，可以让 Codex 提炼为规则补丁：

```txt
用 ghdi-update-guidelines 根据这次页面评审反馈生成 guideline patch：
审批详情页右侧状态导航必须保留，导出区域只包含申请正文，不包含操作按钮。
```

主要产物：

```txt
.repo-design-index/reports/guideline-patches/<date>-<page-name>.md
```

这个 skill 默认只生成补丁建议，不直接改正式规则。人工确认后，再合并到对应 style card、pattern card 或 registry。

## 10. Codex 实际使用方式

### 10.1 组件索引常用话术

```txt
用 ghdi-component-scan 扫描 bigboss-base，生成组件说明卡片。
```

```txt
用 ghdi-component-scan 补全 baseTableV2、File、SearchSelectUser 的组件 card。
```

```txt
用 ghdi-component-card-feedback 修改 TableBase：
TableBase 不推荐新页面使用，统一使用 baseTableV2。
```

```txt
用 ghdi-component-registry-build 从组件卡片构建正式组件索引。
```

### 10.2 设计记忆常用话术

```txt
用 ghdi-design-memory-scan 扫描 seed 和现有页面模式，看看哪些可以沉淀成风格 card 和页面模式 card。
```

```txt
用 ghdi-design-memory-scan 扫描 bigboss-wedo/src/module/main/ema/assetMaintenance/retirement/table.vue，这个页面是典型审批流详情页面。
```

```txt
用 ghdi-design-memory-feedback 修改 approval-document-visual-style：
这个重边框表格式风格只适用于审批文书，不适用于普通 CRUD 列表。
```

```txt
用 ghdi-design-memory-build 构建设计记忆正式索引。
```

### 10.3 页面生成常用话术

```txt
用 ghdi-intent-to-ir 把下面自然语言需求转成 design_ir.json：
...
```

```txt
用 ghdi-plan-page 根据 design_ir.json 生成 page-plan.md。
```

```txt
用 ghdi-generate-page 根据 page-plan.md 在目标项目中生成页面。
```

```txt
用 ghdi-score-page 对生成页面评分。
```

```txt
用 ghdi-update-guidelines 把这次评审反馈整理成 guideline patch。
```

## 11. 产物状态

### 11.1 组件 card 状态

| 状态 | 含义 |
|---|---|
| `initialized` | 脚本生成的骨架，不能作为正式知识 |
| `codex-drafted` | Codex 已阅读源码和样例补全，待人工审阅 |
| `human-reviewed` | 人工已确认或修订，可进入正式索引 |

### 11.2 组件推荐状态

| 状态 | 含义 |
|---|---|
| `preferred` | 新页面优先使用 |
| `allowed` | 可以使用，但不一定是默认推荐 |
| `specialized` | 仅适用于特定业务场景 |
| `legacy` | 历史组件，新页面避免使用 |
| `internal` | 内部子组件，不建议页面直接使用 |

### 11.3 设计记忆状态

| 状态 | 含义 |
|---|---|
| `candidate-from-seed` | 来自旧 seed 的候选规则 |
| `candidate-from-real-page` | 来自真实页面的候选规则 |
| `codex-drafted` | Codex 已整理，待人工确认 |
| `human-reviewed` | 人工确认，可进入正式索引 |

## 12. 沉淀标准

### 12.1 什么内容适合沉淀

适合沉淀：

- 多个页面会复用的页面结构。
- 明确影响代码生成选择的组件使用规则。
- 系统风格中的稳定视觉规律。
- 经过人工确认的组件替代关系。
- 真实页面中可复用的业务交互模式。
- 页面生成失败或评审中反复出现的问题。

不适合直接沉淀：

- 单个页面的一次性业务字段。
- 尚未确认的个人偏好。
- 和当前系统风格冲突的实验性设计。
- 从旧 seed 中复制但没有重新判断边界的规则。

### 12.2 evidence 应记录什么

evidence 用来回答“这条规则从哪里来，为什么可信”。

应记录：

- 来源路径，使用逻辑仓库路径。
- 来源类型：旧 seed、真实页面、人工反馈、生成评审。
- 适用范围。
- 是否代表当前推荐模式。
- 有哪些边界和例外。

## 13. 当前已形成的关键规则

### 13.1 组件规则

- 新页面表格优先使用 `baseTableV2`。
- `TableBase` 是历史组件，不推荐新页面使用。
- 附件上传和回显优先使用 `File`。
- 人员选择优先使用 `SearchSelectUser`。
- `searchPersonnel` 可用于维护旧页面或保持既有模块一致。
- `WorkFlowDetail` 用于审批流详情和审批操作场景。

### 13.2 风格规则

- 普通后台页面应保持克制、清晰、高信息密度。
- 不要把页面做成营销落地页或装饰型卡片堆叠。
- 普通列表页遵循 Element UI 浅边框和团队表格容器风格。
- 审批文书详情可以使用更强的表格边框和文书式布局，但不能扩散到普通 CRUD 页面。
- 主题色和强调线应继承系统变量，例如 `var(--theme-color)`、`var(--line-color)`。

### 13.3 页面模式规则

已沉淀或候选的页面模式包括：

- `list-management-page`
- `config-management-page`
- `dashboard-page`
- `form-ledger-page`
- `approval-flow-detail-page`

其中 `approval-flow-detail-page` 适用于：

```txt
申请单详情
审批流详情
包含基础信息、明细子表、附件、参与人员、审批流程、状态导航、导出的复合页面
```

## 14. 推荐工作节奏

### 14.1 初始化阶段

1. 安装 skills。
2. 配置本地 `bigboss-base` 和 `bigboss-wedo` 路径。
3. 扫描组件并补全高频组件 card。
4. 人工审阅组件 card。
5. 构建组件 registry。
6. 扫描 seed 和代表性页面。
7. 人工审阅风格和页面模式 card。
8. 构建设计记忆 registry。

### 14.2 日常页面生成阶段

1. 用户提供自然语言需求。
2. Codex 生成 IR。
3. Codex 生成 page plan。
4. Codex 生成页面代码。
5. Codex 评分。
6. 人工评审。
7. Codex 把反馈整理成 guideline patch。
8. 人工确认后合并进长期设计记忆。

### 14.3 维护阶段

组件库变化时：

```txt
ghdi-component-scan
-> 人工审阅变化
-> ghdi-component-registry-build
```

系统出现新的典型页面时：

```txt
ghdi-design-memory-scan
-> ghdi-design-memory-feedback
-> ghdi-design-memory-build
```

页面生成反复出现同类问题时：

```txt
ghdi-update-guidelines
-> 人工确认
-> 更新 style card / pattern card / component card
-> 重新 build registry
```

## 15. 常见问题

### 15.1 Codex 找不到 `bigboss-base` 怎么办

提供本机 `bigboss-base` 根目录，或更新：

```txt
.design-agent/config/project.config.json
```

注意不要把本机绝对路径写进 `.repo-design-index`。

### 15.2 是否需要每次生成页面都重新扫描组件

不需要。组件索引是长期资产。只有组件库变化、卡片质量需要提升、或新成员初始化时才需要重新扫描。

### 15.3 seed 里的内容还保留吗

保留。`seed/` 是历史探索成果，不直接删除。正式页面生成优先使用 `.repo-design-index`，但 design memory scan 可以继续从 `seed/` 提取有价值的规则，并在 evidence 中记录来源。

### 15.4 人工反馈必须按模板写吗

不需要。可以直接用中文自然语言反馈。对应 feedback skill 的职责就是把自然语言反馈转换成 card 修改。

### 15.5 registry 是否人工直接改

一般不要直接改。推荐修改 card，再通过 build skill 生成 registry。这样知识源清晰，后续可维护。

### 15.6 什么时候需要问用户本地路径

当 Codex 需要读取外部代码库，但配置里没有对应路径，或路径不存在时，需要询问用户。

常见情况：

```txt
需要读取 bigboss-base 组件源码。
需要读取 bigboss-wedo 真实页面源码。
需要在目标业务项目中生成页面。
```

## 16. 最小可跑闭环

如果只想跑通最小闭环，可以按这个顺序：

1. 安装 skills。
2. 配置本地 `bigboss-base` 路径。
3. 运行 `ghdi-component-scan`，至少补全并审阅 `baseTableV2`、`File`、`SearchSelectUser`、`WorkFlowDetail`。
4. 运行 `ghdi-component-registry-build`。
5. 运行 `ghdi-design-memory-scan`，扫描一个代表性页面。
6. 人工确认页面模式 card。
7. 运行 `ghdi-design-memory-build`。
8. 用 `ghdi-intent-to-ir` 输入自然语言需求。
9. 用 `ghdi-plan-page` 生成计划。
10. 用 `ghdi-generate-page` 生成页面。
11. 用 `ghdi-score-page` 评分。
12. 用 `ghdi-update-guidelines` 沉淀反馈。

这个闭环跑通后，harness 就不只是一个文档集合，而是一个可以持续学习团队系统风格的 Codex 页面生成工作流。

# 前端代码库设计记忆系统总体设计

> 文件建议名称：`SYSTEM_DESIGN.md`  
> 适用对象：Claude Code / Codex / Cursor / 前端开发者 / 产品设计者  
> 当前阶段：MVP 总体设计  
> 目标技术栈：Vue2 + Element UI 企业前端代码库优先，后续可扩展到其他技术栈

---

## 1. 系统定位

本系统不是传统的 Figma-to-Code 工具，也不是单纯的设计规范生成器。

本系统的核心定位是：

> 基于现有企业前端代码库，自动提取视觉风格、组件资产和页面模式；结合 Figma 原型意图和新页面需求，为 Claude Code / Codex / Cursor 等 AI 编程工具提供结构化设计上下文，使其能生成符合现有系统风格、优先复用已有组件的新页面，并通过评分与人工反馈持续修正规则。

更简洁地说：

> 这是一个“前端代码库设计记忆系统”。

它要解决的问题是：

1. AI 不知道现有系统的视觉风格，容易生成“不像当前系统”的页面。
2. AI 不知道代码库已有组件，容易重复造组件或绕过组件库。
3. AI 不知道企业后台页面的既有模式，容易把 CRUD 页面做成营销页、卡片流或不符合业务习惯的结构。
4. Figma 原型只能表达设计意图，无法直接保证代码复用、样式一致和工程落地。
5. 人工反馈如果只改页面，无法沉淀为长期可复用的设计准则。

因此，本系统的核心价值是：

```txt
现有代码库
→ 提取设计记忆
→ 建立组件索引
→ 建立页面模式索引
→ 接入 Figma 原型意图
→ 生成页面实现计划
→ AI 编程工具生成页面
→ 自动评分
→ 人工反馈
→ 更新设计记忆
```

---

## 2. 非目标

为了避免系统设计失控，以下内容暂不作为 MVP 目标：

1. 不做完整的 Figma-to-Code 平台。
2. 不追求 Figma 像素级 100% 还原。
3. 不依赖 Figma Code Connect 作为主路径。
4. 不依赖 Figma Variables REST API 作为主路径。
5. 不做完整 Web UI / Daemon / 多 Agent 管理平台。
6. 不自动替代前端工程师进行最终业务判断。
7. 不从零设计一套全新的 UI 体系。
8. 不强制改造现有项目组件库。
9. 不在第一阶段支持所有页面类型。
10. 不以“审美打分”作为主要评分目标。

MVP 阶段只关注：

```txt
让 AI 在现有企业前端代码库中，稳定生成“像当前系统、用当前组件、符合当前页面模式”的新页面。
```

---

## 3. 总体架构

系统由七个层次组成：

```txt
┌──────────────────────────────────────────────┐
│  1. Existing Frontend Codebase                │
│  Vue2 / Element UI / src/views / components   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  2. Codebase Design Miner                     │
│  提取风格、组件、页面模式、样例                 │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  3. Repo Design Index                         │
│  DESIGN.md / tokens / components / patterns   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  4. Figma Intent Adapter                      │
│  MCP / REST API / 截图 / intent.md             │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  5. Page Planning Agent                       │
│  页面类型判断 / 组件匹配 / 实现计划             │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  6. Coding Agent                              │
│  Claude Code / Codex / Cursor 生成页面代码     │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  7. Scoring & Feedback Loop                   │
│  组件复用评分 / 风格一致性 / Figma 意图对齐      │
└──────────────────────────────────────────────┘
```

---

## 4. 核心原则

### 4.1 代码库优先于 Figma

Figma 表达页面意图，代码库决定最终落地方式。

```txt
Figma 是设计意图输入
代码库是生产约束来源
组件索引是实现依据
页面模式是结构约束
DESIGN.md 是风格约束
```

禁止将 Figma 图层结构直接机械翻译成最终代码。

### 4.2 先规划，再生成

AI 不允许直接根据需求写代码。

必须先输出 `Page Implementation Plan`，明确：

1. 页面类型。
2. 匹配页面模式。
3. 推荐复用组件。
4. Figma 意图映射。
5. 文件修改范围。
6. 风格规则。
7. 风险点。
8. 自检项。

通过计划后，才能进入代码生成。

### 4.3 优先复用已有组件

AI 必须优先使用组件索引中的现有组件。

禁止：

1. 已有组件可满足需求时重复造组件。
2. 手写已有业务组件的等价逻辑。
3. 绕过组件库直接堆 `div` / `el-card` / `el-table`。
4. 未说明原因就新增全局组件。

### 4.4 风格来自设计记忆，不来自模型想象

页面视觉规则必须来自：

```txt
.repo-design-index/style/DESIGN.md
.repo-design-index/style/tokens.css
.repo-design-index/style/component-style-rules.md
.repo-design-index/style/anti-patterns.md
```

禁止 AI 随意发明：

1. 新主色。
2. 新阴影。
3. 新圆角体系。
4. 新页面密度。
5. 新按钮层级。
6. 新卡片风格。

### 4.5 评分服务于规则进化

评分不是为了做“好看不好看”的主观评价，而是为了发现：

1. 组件索引是否缺失。
2. 页面模式是否总结不清。
3. 设计准则是否过于抽象。
4. Figma 意图是否表达不足。
5. AI 是否绕过已有工程习惯。
6. 哪些人工反馈应该沉淀为长期规则。

---

## 5. 推荐项目目录结构

本系统建议以内嵌目录的形式放在现有前端项目根目录下。

```txt
frontend-project/
├── src/
├── package.json
│
├── SYSTEM_DESIGN.md
│
├── .repo-design-index/
│   ├── style/
│   │   ├── DESIGN.md
│   │   ├── TOKENS.md
│   │   ├── tokens.css
│   │   ├── layout-patterns.md
│   │   ├── component-style-rules.md
│   │   ├── anti-patterns.md
│   │   └── style-changelog.md
│   │
│   ├── components/
│   │   ├── COMPONENT_REGISTRY.json
│   │   ├── COMPONENT_MAPPING.json
│   │   ├── COMPONENT_CARDS.md
│   │   └── cards/
│   │       ├── SearchPanel.md
│   │       ├── BaseTable.md
│   │       ├── DictSelect.md
│   │       ├── OrgTreeSelect.md
│   │       └── NoticePanel.md
│   │
│   ├── patterns/
│   │   ├── PAGE_PATTERNS.md
│   │   ├── crud-list-page.md
│   │   ├── config-management-page.md
│   │   ├── tree-table-page.md
│   │   ├── dashboard-page.md
│   │   ├── detail-page.md
│   │   └── form-dialog-page.md
│   │
│   ├── examples/
│   │   ├── canonical-pages.md
│   │   ├── source-page-map.json
│   │   └── snippets/
│   │
│   ├── generation/
│   │   ├── GENERATION_RULES.md
│   │   ├── PAGE_PLAN_TEMPLATE.md
│   │   └── REVIEW_RUBRIC.md
│   │
│   └── reports/
│       ├── latest-score.md
│       └── guideline-patches/
│
├── .design-agent/
│   ├── skills/
│   │   ├── 01-scan-style/
│   │   │   └── SKILL.md
│   │   ├── 02-index-components/
│   │   │   └── SKILL.md
│   │   ├── 03-index-page-patterns/
│   │   │   └── SKILL.md
│   │   ├── 04-import-figma-intent/
│   │   │   └── SKILL.md
│   │   ├── 05-plan-page/
│   │   │   └── SKILL.md
│   │   ├── 06-generate-page/
│   │   │   └── SKILL.md
│   │   ├── 07-score-page/
│   │   │   └── SKILL.md
│   │   └── 08-update-guidelines/
│   │       └── SKILL.md
│   │
│   ├── prompts/
│   │   ├── system-prompt.md
│   │   ├── page-plan-prompt.md
│   │   ├── component-index-prompt.md
│   │   └── scoring-prompt.md
│   │
│   ├── scripts/
│   │   ├── scan-style.js
│   │   ├── scan-components.js
│   │   ├── scan-usages.js
│   │   ├── build-index.js
│   │   ├── score-component-reuse.js
│   │   ├── score-token-usage.js
│   │   └── screenshot-score.js
│   │
│   └── config/
│       ├── project.config.json
│       ├── scan.config.json
│       └── scoring.config.json
│
└── design-inputs/
    └── example-page/
        ├── frame.png
        ├── intent.md
        └── design_ir.json
```

---

## 6. Repo Design Index 说明

`.repo-design-index/` 是本系统的核心资产。

它不是普通文档目录，而是给 AI 编程工具读取的“代码库设计记忆”。

### 6.1 style/

用于保存现有系统的视觉规则。

```txt
style/
├── DESIGN.md
├── TOKENS.md
├── tokens.css
├── layout-patterns.md
├── component-style-rules.md
├── anti-patterns.md
└── style-changelog.md
```

#### DESIGN.md

描述系统整体设计语言，包括：

1. 视觉气质。
2. 页面密度。
3. 色彩风格。
4. 字体层级。
5. 组件风格。
6. 布局节奏。
7. 交互特点。
8. 企业后台使用约束。

#### tokens.css

机器可读的视觉变量。

示例：

```css
:root {
  --app-color-primary: #1677ff;
  --app-color-bg-page: #f5f7fb;
  --app-color-bg-card: #ffffff;
  --app-color-border: #e5eaf3;

  --app-radius-card: 8px;
  --app-radius-control: 4px;

  --app-shadow-card: 0 4px 16px rgba(15, 35, 80, 0.06);

  --app-font-title: 16px;
  --app-font-body: 14px;
  --app-font-meta: 12px;

  --app-space-page: 16px;
  --app-space-card: 16px;
  --app-space-section: 20px;
}
```

#### anti-patterns.md

记录禁止事项，例如：

1. 禁止把配置管理页做成营销 Banner。
2. 禁止大面积赛博朋克渐变。
3. 禁止无业务含义的插画。
4. 禁止随意添加 KPI。
5. 禁止为了美观隐藏关键操作。
6. 禁止把表格类页面改成卡片瀑布流。
7. 禁止绕过已有组件重新造相似组件。

### 6.2 components/

用于保存组件索引。

```txt
components/
├── COMPONENT_REGISTRY.json
├── COMPONENT_MAPPING.json
├── COMPONENT_CARDS.md
└── cards/
```

#### COMPONENT_REGISTRY.json

机器可读组件索引。

示例：

```json
{
  "components": [
    {
      "name": "SearchPanel",
      "path": "src/components/SearchPanel/index.vue",
      "category": "search-filter",
      "framework": "Vue2",
      "uiBase": "Element UI",
      "props": [
        {
          "name": "model",
          "type": "Object",
          "required": true
        }
      ],
      "events": ["search", "reset"],
      "slots": ["default", "actions"],
      "usedBy": [
        "src/views/system/user/index.vue",
        "src/views/notice/manage/index.vue"
      ],
      "keywords": ["查询", "筛选", "搜索", "过滤条件"]
    }
  ]
}
```

#### COMPONENT_MAPPING.json

用于把业务意图、Figma 区域、页面结构映射到代码组件。

示例：

```json
{
  "mappings": [
    {
      "intent": "查询筛选区域",
      "keywords": ["查询", "筛选", "搜索", "过滤"],
      "figmaNames": ["Search", "Filter", "查询区", "筛选区"],
      "recommendedComponent": "SearchPanel",
      "path": "src/components/SearchPanel/index.vue",
      "example": "src/views/system/user/index.vue"
    },
    {
      "intent": "数据表格",
      "keywords": ["表格", "列表", "数据列表"],
      "figmaNames": ["Table", "Data List", "表格区"],
      "recommendedComponent": "BaseTable",
      "path": "src/components/BaseTable/index.vue",
      "example": "src/views/notice/manage/index.vue"
    }
  ]
}
```

#### COMPONENT_CARDS.md

人和 AI 都能读的组件说明文档。

每个组件建议包含：

1. Path。
2. Purpose。
3. When to Use。
4. Do Not Use。
5. Props。
6. Events。
7. Slots。
8. Typical Usage。
9. Related Page Patterns。
10. Visual Rules。
11. Known Limitations。

### 6.3 patterns/

用于保存页面模式。

MVP 阶段优先支持：

1. CRUD 列表页。
2. 配置管理页。
3. 左树右表页。
4. 工作台卡片页。
5. 详情页。
6. 弹窗表单页。

页面模式文档示例：

```md
# config-management-page

## 用途
用于维护配置类、字典类、场景类、面板类数据。

## 标准结构
1. 页面标题区
2. 查询区
3. 操作按钮区
4. 表格区
5. 分页区
6. 新增 / 编辑弹窗

## 推荐组件
- PageContainer
- SearchPanel
- BaseTable
- DictSelect
- StatusTag
- FormDialog

## 禁止事项
- 不要使用瀑布流卡片替代表格。
- 不要把新增编辑做成整页跳转，除非字段极多。
- 不要在表格操作列展示超过 3 个一级按钮。

## Canonical Examples
- src/views/system/user/index.vue
- src/views/system/role/index.vue
- src/views/notice/scene/index.vue
```

---

## 7. Figma Intent Adapter 设计

Figma 在本系统中的角色是“原型意图输入”，不是最终代码来源。

### 7.1 输入优先级

优先级如下：

```txt
1. Figma MCP Server
2. Figma REST API + Images API
3. Figma frame 截图 + intent.md
```

考虑到不同账号、教育版权限、seat 类型和额度限制，MVP 阶段必须支持截图兜底模式。

### 7.2 design-inputs 目录

每个页面需求可以放在 `design-inputs/` 下。

```txt
design-inputs/
└── notice-scene-page/
    ├── frame.png
    ├── intent.md
    └── design_ir.json
```

### 7.3 intent.md

当无法自动读取完整 Figma 结构时，由人工或 AI 辅助补充页面意图。

示例：

```md
# 页面意图

页面名称：通知公告场景管理

页面类型：配置管理页

主要区域：
1. 顶部标题区
2. 查询区
3. 操作区
4. 表格区
5. 新增 / 编辑弹窗

关键字段：
- 名称
- 应用场景编号
- 所属级别
- 级别编号
- 布局类型
- 是否展示
- 操作

交互说明：
- 查询区为单行紧凑布局
- 新增和编辑使用弹窗
- 表格是主内容
- 状态类字段使用标签
```

### 7.4 design_ir.json

`design_ir.json` 是 Figma / 截图 / intent.md 转换后的中间结构。

示例：

```json
{
  "source": "figma",
  "frameName": "通知公告场景管理",
  "viewport": {
    "width": 1440,
    "height": 900
  },
  "pageIntent": {
    "pageType": "config-management-page",
    "businessObject": "通知公告场景"
  },
  "regions": [
    {
      "name": "页面标题区",
      "intent": "page-header",
      "texts": ["通知公告场景管理"]
    },
    {
      "name": "查询区",
      "intent": "search-filter",
      "texts": ["场景名称", "所属级别", "是否展示", "查询", "重置"]
    },
    {
      "name": "表格区",
      "intent": "data-table",
      "texts": ["名称", "应用场景编号", "所属级别", "级别编号", "布局类型", "操作"]
    }
  ],
  "visualHints": {
    "density": "compact",
    "layout": "top-search-table",
    "primaryAction": "新增场景"
  }
}
```

---

## 8. Skill 体系设计

本系统借鉴 Skill 思路，但不做重型平台。

Skill 本质上是给 Claude Code / Codex / Cursor 使用的“任务说明包”。

```txt
.design-agent/skills/
├── 01-scan-style/
├── 02-index-components/
├── 03-index-page-patterns/
├── 04-import-figma-intent/
├── 05-plan-page/
├── 06-generate-page/
├── 07-score-page/
└── 08-update-guidelines/
```

### 8.1 01-scan-style

目标：

从现有代码库中提取视觉风格，生成或更新：

```txt
.repo-design-index/style/DESIGN.md
.repo-design-index/style/tokens.css
.repo-design-index/style/layout-patterns.md
.repo-design-index/style/component-style-rules.md
.repo-design-index/style/anti-patterns.md
```

要求：

1. 不只依赖 LLM 总结。
2. 需要结合静态扫描结果。
3. 输出规则时必须带证据来源。
4. 对推断类规则标注置信度。
5. 不要把单个页面的特殊样式误判为全局规则。

### 8.2 02-index-components

目标：

扫描 `src/components/` 与典型页面使用情况，生成组件索引。

输出：

```txt
COMPONENT_REGISTRY.json
COMPONENT_MAPPING.json
COMPONENT_CARDS.md
components/cards/*.md
```

要求：

1. 识别组件 props / events / slots。
2. 收集真实使用样例。
3. 总结适用场景和禁用场景。
4. 为组件添加业务语义关键词。
5. 标注组件与页面模式的关系。

### 8.3 03-index-page-patterns

目标：

总结现有企业后台页面模式。

输出：

```txt
PAGE_PATTERNS.md
crud-list-page.md
config-management-page.md
tree-table-page.md
dashboard-page.md
detail-page.md
form-dialog-page.md
```

要求：

1. 每个页面模式必须包含标准结构。
2. 每个页面模式必须列出推荐组件。
3. 每个页面模式必须列出反模式。
4. 每个页面模式必须绑定典型代码样例。

### 8.4 04-import-figma-intent

目标：

把 Figma 原型或截图转换成 `design_ir.json`。

支持三类输入：

1. Figma MCP。
2. Figma REST API。
3. frame.png + intent.md。

MVP 阶段优先实现第三类。

### 8.5 05-plan-page

目标：

根据需求和索引输出页面实现计划。

输入：

```txt
用户需求
design_ir.json
DESIGN.md
COMPONENT_REGISTRY.json
COMPONENT_MAPPING.json
PAGE_PATTERNS.md
GENERATION_RULES.md
```

输出：

```txt
Page Implementation Plan
```

### 8.6 06-generate-page

目标：

基于 Page Plan 生成页面代码。

要求：

1. Vue2 + Element UI 兼容。
2. 优先复用组件索引中的组件。
3. 不随意新增全局样式。
4. 不改变业务语义。
5. 不绕过已有页面模式。
6. 生成后输出自检报告。

### 8.7 07-score-page

目标：

对生成页面进行工程化评分。

评分维度：

```txt
25 分：组件复用度
20 分：页面模式匹配度
20 分：代码库风格一致性
15 分：Figma 意图对齐度
10 分：Token / 样式规则遵循度
10 分：业务结构完整性
```

输出：

```txt
.repo-design-index/reports/latest-score.md
```

### 8.8 08-update-guidelines

目标：

把人工反馈转成设计规则补丁。

输入示例：

```txt
这个查询区太高。
表格操作列太乱。
卡片阴影不像我们系统。
按钮层级不对。
```

输出：

```txt
.repo-design-index/reports/guideline-patches/*.md
```

补丁经人工确认后，再合并进正式规则。

---

## 9. 页面生成标准流程

每次新增页面时，必须遵循以下流程：

```txt
1. 读取用户需求
2. 读取 design-inputs/<page>/design_ir.json
3. 读取 .repo-design-index/style/DESIGN.md
4. 读取 .repo-design-index/components/COMPONENT_REGISTRY.json
5. 读取 .repo-design-index/components/COMPONENT_MAPPING.json
6. 读取 .repo-design-index/patterns/PAGE_PATTERNS.md
7. 输出 Page Implementation Plan
8. 检查 Plan 是否匹配页面模式与组件索引
9. 生成页面代码
10. 运行自检
11. 运行评分
12. 输出 score-report
13. 根据人工反馈生成 guideline-patch
```

禁止跳过第 7 步直接写代码。

---

## 10. Page Implementation Plan 模板

```md
# Page Implementation Plan

## 1. 需求摘要

页面名称：

业务对象：

目标用户：

主要功能：

## 2. 页面类型判断

匹配页面类型：

判断依据：

## 3. 匹配页面模式

使用模式：

参考文档：

参考样例页面：

## 4. Figma 意图映射

| Figma / design_ir 区域 | 页面意图 | 推荐代码组件 |
|---|---|---|
| 查询区 | search-filter | SearchPanel |
| 表格区 | data-table | BaseTable |
| 新增编辑弹窗 | form-dialog | FormDialog |

## 5. 推荐复用组件

| 组件 | 路径 | 用途 | 使用原因 |
|---|---|---|---|

## 6. 页面结构

1. 页面标题区
2. 查询区
3. 操作区
4. 表格区
5. 分页区
6. 新增 / 编辑弹窗

## 7. 数据结构与字段

### 查询条件

### 表格列

### 表单字段

### 状态字典

## 8. 交互设计

### 查询

### 重置

### 新增

### 编辑

### 删除 / 下架

### 状态切换

## 9. 文件修改范围

| 文件 | 操作 | 说明 |
|---|---|---|

## 10. 风格规则

引用规则：

- DESIGN.md:
- component-style-rules.md:
- page pattern:

## 11. 风险点

1.
2.
3.

## 12. 自检清单

- [ ] 是否复用推荐组件
- [ ] 是否符合页面模式
- [ ] 是否遵循 DESIGN.md
- [ ] 是否没有新增无来源样式
- [ ] 是否没有改变业务语义
- [ ] 是否 Vue2 + Element UI 兼容
```

---

## 11. 评分系统设计

评分不是为了主观审美，而是为了工程质量和规则迭代。

### 11.1 总分构成

```txt
总分 100 =
25 分：组件复用度
20 分：页面模式匹配度
20 分：代码库风格一致性
15 分：Figma 意图对齐度
10 分：Token / 样式规则遵循度
10 分：业务结构完整性
```

### 11.2 组件复用度

检查：

1. 是否使用 Page Plan 推荐组件。
2. 是否遗漏关键组件。
3. 是否手写已有组件可覆盖的逻辑。
4. 是否新增了不必要组件。
5. 是否正确使用 props / events / slots。

### 11.3 页面模式匹配度

检查：

1. 是否符合匹配页面模式。
2. CRUD 页面是否包含查询区、操作区、表格区、分页区。
3. 配置管理页是否使用标准弹窗表单。
4. 工作台页是否符合卡片布局规则。
5. 是否错误采用不适合的页面模式。

### 11.4 代码库风格一致性

检查：

1. 页面背景是否一致。
2. 卡片风格是否一致。
3. 查询区密度是否一致。
4. 表格行高和表头风格是否一致。
5. 按钮层级是否一致。
6. 标题区结构是否一致。
7. 阴影、边框、圆角是否克制。

### 11.5 Figma 意图对齐度

检查：

1. 是否保留主要区域。
2. 是否保留主要字段。
3. 是否保留主要操作。
4. 是否保留布局主次关系。
5. 是否没有机械复刻不合理图层结构。

### 11.6 Token / 样式规则遵循度

检查：

1. 是否使用已有 token。
2. 是否出现未知颜色。
3. 是否出现未知阴影。
4. 是否出现大量任意 px。
5. 是否绕过现有样式体系。

### 11.7 业务结构完整性

检查：

1. 字段是否完整。
2. 操作是否完整。
3. 状态是否完整。
4. 数据结构是否合理。
5. 是否存在接口字段乱猜。
6. 是否存在业务语义被视觉设计覆盖的问题。

---

## 12. 自动化脚本建议

MVP 阶段可以逐步实现以下脚本。

```txt
.design-agent/scripts/
├── scan-style.js
├── scan-components.js
├── scan-usages.js
├── build-index.js
├── score-component-reuse.js
├── score-token-usage.js
└── screenshot-score.js
```

### 12.1 scan-style.js

扫描：

1. CSS / SCSS / LESS。
2. Vue style block。
3. 常用颜色。
4. 字号。
5. 圆角。
6. 阴影。
7. 间距。
8. class 命名。

输出静态统计结果，供 AI 总结 `DESIGN.md`。

### 12.2 scan-components.js

扫描组件：

1. 组件名称。
2. 文件路径。
3. props。
4. emits / events。
5. slots。
6. imports。
7. dependencies。

### 12.3 scan-usages.js

扫描页面中组件使用情况：

1. 哪些页面使用了该组件。
2. 如何传参。
3. 如何监听事件。
4. 是否存在典型使用片段。

### 12.4 score-component-reuse.js

根据 Page Plan 和生成代码，计算组件复用度。

### 12.5 score-token-usage.js

扫描生成页面样式，检查 token 使用和违规样式。

### 12.6 screenshot-score.js

通过 Playwright 截图，对比：

1. Figma frame。
2. 现有同类页面基准图。
3. 新生成页面截图。

MVP 阶段可先输出视觉差异说明，后续再加入 SSIM / pixel diff。

---

## 13. AI 编程工具使用规则

本项目后续会使用 Claude Code / Codex / Cursor 开发。

所有 AI 编程工具必须遵守以下规则。

### 13.1 开发前必须阅读

每次任务开始前，必须优先读取：

```txt
SYSTEM_DESIGN.md
.repo-design-index/style/DESIGN.md
.repo-design-index/components/COMPONENT_REGISTRY.json
.repo-design-index/components/COMPONENT_MAPPING.json
.repo-design-index/patterns/PAGE_PATTERNS.md
.repo-design-index/generation/GENERATION_RULES.md
```

### 13.2 禁止直接开始编码

在未输出 `Page Implementation Plan` 之前，不允许直接修改页面代码。

### 13.3 代码修改原则

1. 最小可用改动。
2. 优先复用已有组件。
3. 保持 Vue2 + Element UI 兼容。
4. 不引入重型新依赖。
5. 不破坏现有路由和权限体系。
6. 不改变原有业务语义。
7. 不为了视觉效果牺牲信息密度。
8. 不新增难以维护的深层样式覆盖。
9. 不把一次性页面样式写成全局污染。
10. 不隐藏关键操作按钮。

### 13.4 输出要求

每次完成生成或修改后，必须输出：

1. 修改文件列表。
2. 复用组件列表。
3. 遵循的页面模式。
4. 遵循的风格规则。
5. 自检结果。
6. 未解决风险。
7. 是否需要更新设计索引。

---

## 14. MVP 实施计划

### 阶段 0：项目骨架

目标：

建立目录和基础文档。

产物：

```txt
SYSTEM_DESIGN.md
.repo-design-index/
.design-agent/
design-inputs/
```

### 阶段 1：人工选择典型页面

目标：

选择 5 到 10 个现有典型页面作为初始样本。

建议覆盖：

1. 配置管理页。
2. CRUD 列表页。
3. 左树右表页。
4. 工作台卡片页。
5. 详情页。
6. 弹窗表单页。

产物：

```txt
.repo-design-index/examples/canonical-pages.md
.repo-design-index/examples/source-page-map.json
```

### 阶段 2：初版设计记忆

目标：

结合静态扫描和 AI 总结，生成初版设计记忆。

产物：

```txt
style/DESIGN.md
style/tokens.css
style/component-style-rules.md
style/anti-patterns.md
```

### 阶段 3：初版组件索引

目标：

扫描公共组件和典型页面使用情况。

产物：

```txt
COMPONENT_REGISTRY.json
COMPONENT_MAPPING.json
COMPONENT_CARDS.md
components/cards/*.md
```

### 阶段 4：初版页面模式

目标：

总结 3 个高频页面模式。

优先：

```txt
crud-list-page.md
config-management-page.md
dashboard-page.md
```

### 阶段 5：Figma 输入兜底链路

目标：

支持 `frame.png + intent.md → design_ir.json`。

产物：

```txt
design-inputs/example-page/frame.png
design-inputs/example-page/intent.md
design-inputs/example-page/design_ir.json
```

### 阶段 6：页面计划生成

目标：

根据需求、设计索引和 Figma 意图生成 `Page Implementation Plan`。

### 阶段 7：页面代码生成

目标：

使用 Claude Code / Codex / Cursor 生成首个新页面。

### 阶段 8：评分和反馈

目标：

输出首份评分报告和规则补丁。

产物：

```txt
.repo-design-index/reports/latest-score.md
.repo-design-index/reports/guideline-patches/*.md
```

---

## 15. 第一版验收标准

MVP 第一版通过标准如下：

1. 能从现有代码库生成初版 `DESIGN.md`。
2. 能生成至少 10 个可用组件卡片。
3. 能生成至少 3 类页面模式文档。
4. 能将 `frame.png + intent.md` 转换为 `design_ir.json`。
5. 能根据新页面需求输出 Page Implementation Plan。
6. 能指导 Claude Code / Codex / Cursor 生成 Vue2 + Element UI 页面。
7. 生成页面能复用至少 2 个已有组件。
8. 生成页面符合目标页面模式。
9. 能输出评分报告。
10. 能根据人工反馈生成 guideline patch。

---

## 16. 示例任务流程

用户输入：

```txt
请根据 design-inputs/notice-scene-page 下的原型意图，
新增通知公告场景管理页面。
要求复用现有组件，符合当前系统风格。
```

AI 应执行：

```txt
1. 读取 SYSTEM_DESIGN.md
2. 读取 .repo-design-index/style/DESIGN.md
3. 读取 COMPONENT_REGISTRY.json
4. 读取 COMPONENT_MAPPING.json
5. 读取 PAGE_PATTERNS.md
6. 读取 design-inputs/notice-scene-page/design_ir.json
7. 输出 Page Implementation Plan
8. 检查 Plan 是否符合配置管理页模式
9. 生成 Vue2 + Element UI 页面
10. 运行自检
11. 输出评分报告
12. 必要时生成 guideline-patch
```

AI 不应直接跳到第 9 步。

---

## 17. 长期演进方向

MVP 稳定后，可逐步扩展：

### 17.1 Figma MCP 接入

目标：

通过 Figma MCP Server 读取 Frame 上下文，减少人工 `intent.md` 编写。

### 17.2 Figma REST API 接入

目标：

自动读取 Figma file / node JSON，并导出 frame 截图。

### 17.3 组件向量检索

目标：

在结构化索引基础上增加语义检索。

注意：

```txt
向量检索只能作为召回层，不能替代 COMPONENT_REGISTRY.json。
```

### 17.4 Storybook / Playwright 视觉回归

目标：

对组件和页面进行截图对比。

### 17.5 更细粒度评分

目标：

支持：

1. 组件级评分。
2. 页面级评分。
3. 模式级评分。
4. 设计规则覆盖率。
5. 规则变更影响分析。

### 17.6 多技术栈支持

目标：

从 Vue2 + Element UI 扩展到：

1. Vue3 + Element Plus。
2. React + Ant Design。
3. uni-app / 小程序。
4. 移动端 H5。

---

## 18. 当前阶段最重要的判断

本系统的核心资产不是 Figma，不是 LLM，也不是评分算法。

真正的核心资产是：

```txt
.repo-design-index/
```

只要这个索引足够准确，Claude Code / Codex / Cursor 都可以成为执行器。

系统成功的关键不是“AI 会不会设计”，而是：

```txt
AI 是否能继承现有代码库的设计记忆。
AI 是否能识别已有组件并正确复用。
AI 是否能按页面模式生成结构稳定的页面。
AI 是否能把人工反馈沉淀成长期规则。
```

---

## 19. 给后续 AI Agent 的总提示

后续任何 Claude Code / Codex / Cursor 任务，都应遵守以下总提示：

```txt
你不是在从零设计页面。

你正在一个已有企业前端代码库中工作。
你的目标是继承当前系统的视觉风格、组件资产和页面模式。

在生成或修改页面前，必须先读取：
1. SYSTEM_DESIGN.md
2. .repo-design-index/style/DESIGN.md
3. .repo-design-index/components/COMPONENT_REGISTRY.json
4. .repo-design-index/components/COMPONENT_MAPPING.json
5. .repo-design-index/patterns/PAGE_PATTERNS.md
6. .repo-design-index/generation/GENERATION_RULES.md

你必须先输出 Page Implementation Plan，再写代码。

你必须优先复用现有组件。
你必须遵循现有页面模式。
你必须遵循 DESIGN.md 和 tokens.css。
你不得随意发明新视觉风格。
你不得为了视觉效果改变业务语义。
你不得绕过已有组件重复造轮子。

完成后必须输出：
1. 修改文件列表
2. 复用组件列表
3. 页面模式匹配说明
4. 风格规则遵循说明
5. 自检结果
6. 风险点
7. 是否建议更新设计索引
```

---

## 20. 结论

本系统是一个面向企业前端代码库的设计记忆与 AI 辅助开发系统。

它通过：

```txt
代码库风格提取
+ 组件索引
+ 页面模式索引
+ Figma 意图输入
+ 页面计划
+ AI 代码生成
+ 工程化评分
+ 人工反馈更新规则
```

实现一个长期可进化的前端设计开发闭环。

最终目标不是让 AI 生成“好看的页面”，而是让 AI 生成：

```txt
像当前系统的页面
用当前组件的页面
符合当前业务习惯的页面
可以进入现有工程维护体系的页面
```

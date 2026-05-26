# Harness 系统可行性与协作方式讨论记录

> 主题：先做最小闭环的 harness 系统，暂不接 Figma 原型图直出页面代码，优先支持自然语言需求生成，并继承现有系统风格。

## 1. 讨论结论

当前更适合先做一个以自然语言为入口的最小闭环，而不是先做完整的 Figma-to-Code 链路。

原因很直接：

1. 现有 `SYSTEM_DESIGN.md` 已经明确系统定位是“前端代码库设计记忆系统”，而不是纯 Figma 还原工具。
2. `seed` 目录里已经积累了风格、组件、主题和页面模式的探索成果，足以作为第一版设计记忆的起点。
3. `open-design-main` 提供了很好的 workflow / skill / artifact / checklist 思路，可以借鉴，但不适合直接整套照搬。
4. 自然语言输入比 Figma 图层输入更容易先跑通“需求理解 -> 规则约束 -> 页面计划 -> 代码生成 -> 评分反馈”的闭环。

结论是：

> 先用自然语言描述生成页面，再用系统固有风格和组件索引约束生成结果，让页面长得像当前系统、用当前系统的组件、符合当前系统的页面模式。

---

## 2. 是否需要建立本地组件索引

结论：**需要，而且很关键。**

不能完全依赖 Codex 在生成页面时自己去代码里找组件。它可以找源码，但很难稳定判断以下事情：

- 哪个组件是推荐优先使用的
- 哪个组件是历史遗留
- 哪些组件适合新页面
- 哪些组件虽然能用，但不建议继续新写
- 一个组件的业务语义和典型适用场景是什么
- 某个页面模式下，优先复用哪些组件

### 2.1 组件索引的作用

组件索引不是替代源码搜索，而是给 Codex 一张“优先级地图”。

推荐关系是：

```txt
组件索引 = 推荐路线图
源码搜索 = 细节确认
```

### 2.2 第一版组件索引建议覆盖

优先建立以下组件族：

1. 页面骨架类：壳层、标题条、页面容器
2. 列表表格类：`baseTableV2`、旧 `baseTable`
3. 查询筛选类：搜索条件、部门选择、人员选择、日期范围
4. 表单输入类：上传、富文本、字典选择、组织人员选择
5. 业务反馈类：状态标签、附件预览、弹窗、抽屉
6. 高频业务组合组件：流程、审批、配置中心相关组件

### 2.3 每个组件卡片至少要有

```txt
name
path
推荐程度：preferred / allowed / legacy / avoid
适用场景
不适用场景
关键 props/events
典型使用页面
生成时注意事项
```

---

## 3. seed 是否要持续沉淀

结论：**要，而且必须持续沉淀。**

不过 seed 不应该变成“随便堆内容”的知识仓库，而应该逐步升级成正式的 `.repo-design-index`，成为 Codex 生成页面前必须读取的设计记忆。

### 3.1 沉淀的标准

沉淀内容建议满足三条标准：

1. **可复用**  
   一次性的页面特例不要直接沉淀成全局规则。

2. **有证据**  
   每条风格规则、组件推荐、页面模式最好能关联来源页面、来源组件和置信度。

3. **能约束生成行为**  
   如果一条内容不能帮助 Codex 做选择，就不该进入核心索引。

### 3.2 建议的沉淀分层

```txt
style/
视觉规则、主题色、密度、控件风格、反模式

components/
组件索引、组件卡片、组件映射、legacy/avoid 列表

patterns/
列表页、配置页、表单页、详情页、看板页等页面模式

feedback/
人工反馈、评分报告、待合并规则补丁
```

### 3.3 需要人为介入的地方

需要人工介入的主要是“判断”和“定规矩”，不是机械扫描。

人工需要介入的内容包括：

- 选择 canonical pages
- 标记组件状态：推荐、可用、遗留、禁止新用
- 确认页面模式归属
- 审核风格规则是否属于全局规则
- 处理历史页面之间的规则冲突
- 审核 guideline patch 是否应该沉淀为长期规则
- 验收生成页面的业务语义和交互是否正确

### 3.4 适合机器自动做的事情

以下内容可以主要交给自动化：

- 扫描颜色、字号、class、组件引用
- 统计组件使用页面
- 抽取 props / events / slots
- 生成初版组件卡片
- 生成评分报告初稿
- 把自然语言需求转成 `design_ir.json` 初稿

### 3.5 人工介入的方式

最好的方式是：

> 人只改 Markdown 和 JSON，不碰复杂系统。

例如：

```md
这个查询区太高，列表页查询区应该保持一行紧凑布局。
```

然后 harness 生成一个 guideline patch，再由人工确认是否合并进正式规则。

---

## 4. Harness 如何配合 Codex 使用

结论：harness 不应该替代 Codex，而应该给 Codex 提供上下文、约束和验收。

### 4.1 harness 的职责

harness 主要做三件事：

1. **任务前：收敛上下文**  
   把自然语言需求变成结构化的 `design_ir.json` 和 `page-plan.md`。

2. **任务中：提供规则**  
   告诉 Codex 应该用哪些组件、参考哪些页面、哪些做法不要做。

3. **任务后：评分反馈**  
   检查生成结果是否偏离组件复用、页面模式和风格规则。

### 4.2 推荐工作流

```txt
用户输入自然语言需求
↓
harness 生成 design_ir.json
↓
harness 读取 .repo-design-index，生成 page-plan.md
↓
Codex 读取 page-plan.md + index + 目标代码库
↓
Codex 生成页面代码
↓
harness 评分
↓
人反馈
↓
harness 生成 guideline patch
```

### 4.3 给 Codex 的任务包

建议 harness 输出一个任务目录，例如：

```txt
.codex-task/
├── TASK.md
├── design_ir.json
├── page-plan.md
├── context/
│   ├── DESIGN.md
│   ├── COMPONENT_REGISTRY.json
│   ├── COMPONENT_CARDS.md
│   ├── PAGE_PATTERNS.md
│   └── GENERATION_RULES.md
└── checklist.md
```

然后直接让 Codex 读取这个任务包执行，不要让它自己在无约束状态下自由发挥。

### 4.4 推荐的最小命令

第一版可以只做两个命令：

```bash
design-harness plan xxx.intent.md
design-harness score path/to/generated.vue
```

后续再扩展为：

```bash
design-harness init
design-harness plan inputs/notice-scene.intent.md
design-harness generate-prompt outputs/notice-scene/page-plan.md
design-harness score outputs/notice-scene/generated
design-harness patch-feedback outputs/notice-scene/feedback.md
```

---

## 5. 第一版建议的落地范围

建议第一版只验证一个页面类型，例如：

- `list-management-page`
- `config-management-page`

### 5.1 验收标准

1. 输入自然语言需求。
2. 自动生成 `design_ir.json`。
3. 自动生成 `Page Implementation Plan`。
4. 计划里能明确推荐 `baseTableV2`、Element UI Dialog 和已有表单控件。
5. 生成页面不乱加营销式视觉，不发明新风格。
6. 页面使用 `var(--theme-color)`，遵守 Element UI 控件密度。
7. 输出评分，指出组件复用、页面模式、风格一致性问题。

---

## 6. 总结判断

这一套系统的核心不是“AI 会不会设计”，而是：

```txt
AI 是否能继承现有代码库的设计记忆
AI 是否能识别并正确复用已有组件
AI 是否能按页面模式生成结构稳定的页面
AI 是否能把人工反馈沉淀成长期规则
```

因此建议路线是：

1. 先建本地组件索引
2. 先把 seed 持续沉淀为正式设计记忆
3. 先做自然语言驱动的 harness
4. 让 harness 配合 Codex 做“计划 -> 生成 -> 评分 -> 反馈”的闭环
5. 之后再把 Figma 作为额外 intent 输入接进来


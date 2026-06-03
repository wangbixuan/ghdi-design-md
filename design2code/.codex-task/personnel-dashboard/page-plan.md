# Page Implementation Plan

## 1. 需求摘要

页面名称：人员情况

业务对象：员工花名册、入离职、在岗状态、请假、出差、设计代表、人员构成。

目标用户：部门管理、人力资源管理、经营管理人员。

主要功能：

- 展示核心人员指标。
- 展示员工花名册、入职、离职摘要列表。
- 展示人员构成：年龄、职称、岗位、性别、司龄、学历。
- 展示部门人数分布。

## 2. 页面类型判断

匹配页面类型：`dashboard-page`

判断依据：

- 需求核心是统计概览和构成分析，不是 CRUD 列表。
- 需要 KPI、图表、列表摘要、结构分布。
- 与 `.repo-design-index/patterns/dashboard-page.md` 的“人员/组织级运营概览”适配。

## 3. 匹配页面模式

使用模式：`dashboard-page`

参考文档：

- `.repo-design-index/patterns/cards/dashboard-page.md`
- `.repo-design-index/patterns/dashboard-page.md`

参考组件：

- `chartsLine`：趋势/柱状结构图。
- `chartsFunnel`：可承载漏斗/排行类图表，但本页优先使用 `chartsLine` 的 ECharts option。
- `countTo`：KPI 数字动画。

## 4. 区域映射

| IR 区域 | 页面意图 | 实现方式 |
|---|---|---|
| 页面上下文 | page-context | 顶部标题、更新时间、刷新按钮 |
| 核心指标区 | kpi-summary | 5 个 KPI 卡片，数字使用 `countTo` |
| 人员数据区 | task-list-panels | 三个列表：花名册、入职、离职 |
| 人员构成区 | chart-panels | 6 个小图表，年龄/职称/岗位/性别/司龄/学历 |
| 部门人数分布 | wide-structure-chart | 宽图表展示部门人数 |

## 5. 数据结构与字段

### API

当前已存在：

- `headcount()`：人数统计。
- `deptEmpNum()`：部门人数统计。

### 页面状态

- `loading`
- `lastUpdated`
- `summaryCards`
- `deptChartOption`
- `compositionCards`
- `rosterList`
- `entryList`
- `leaveList`

### 未知接口

- 员工花名册明细。
- 入职离职名单明细。
- 年龄、职称、岗位、性别、司龄、学历构成。
- 在岗、请假、出差、设计代表统计口径。

实现时用本地占位数据，后续接口明确后替换。

## 6. 交互设计

- 页面 mounted 后调用 `loadDashboard()`。
- “刷新”按钮重新调用 `loadDashboard()`。
- API 返回异常时保留占位数据，不中断页面结构。
- 列表卡片提供“查看”文本按钮，但目标路由未知，先用提示占位。

## 7. 文件修改范围

| 文件 | 操作 | 说明 |
|---|---|---|
| `bigboss-wedo/src/module/main/depart/personnelManagement/index.vue` | 修改 | 替换不存在的 `left/right` 子组件壳，生成独立 dashboard 页面。 |

## 8. 风格规则

- 使用 `var(--theme-color)` 和 `var(--line-color)` 表达强调。
- 保持 Element UI 企业后台密度。
- 使用白底、浅边框、克制阴影。
- 不做营销化大屏，不使用强渐变或装饰背景。
- 图表容器保持固定高度，避免空数据时塌陷。

## 9. 风险点

1. 需求中的大部分业务数据接口未提供，当前实现只能做 mock 占位。
2. `headcount`、`deptEmpNum` 的返回结构未知，需要兼容常见结构。
3. 员工花名册/入离职明细的目标路由未知，查看动作暂不跳转。
4. 当前目标文件原先引用不存在的 `left.vue/right.vue`，替换后会改变原页面结构，但可以修复当前不可用状态。

## 10. 自检清单

- [ ] 使用 dashboard-page 模式。
- [ ] 复用 `chartsLine` 和 `countTo`。
- [ ] 不新增全局样式。
- [ ] 不编造接口名称。
- [ ] 未知业务数据标成 mock 占位。
- [ ] Vue2 + Element UI 语法兼容。

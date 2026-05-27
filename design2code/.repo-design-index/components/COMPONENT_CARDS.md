# Component Cards

> 本文件由 `.design-agent/scripts/build-component-registry.mjs` 根据 `.repo-design-index/components/cards/*.md` 生成。单组件详细说明以对应 card 为准。

## 总览

- 组件数：63
- `preferred`：5
- `allowed`：40
- `specialized`：17
- `legacy`：1
- `internal`：0

## actionTitle

Path: `bigboss-base/src/components/form/actionTitle.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [actionTitle](./cards/actionTitle.md)

Use when:

- 适合在表单分组、详情区块、操作区块前展示统一标题。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 不要用于页面主标题或导航标题。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合在表单分组、详情区块、操作区块前展示统一标题”明确匹配时，才优先使用该组件。
- 不要用于页面主标题或导航标题。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## baseTableV2

Path: `bigboss-base/src/components/baseTableV2/index.vue`

Status: `preferred`

Review: `human-reviewed`

Card: [baseTableV2](./cards/baseTableV2.md)

Use when:

- 标准“查询条件 + 表格 + 分页 + 操作列”的管理列表页。
- 需要读取后端配置表头的页面，通常会传 `id` 和 `name`。
- 需要自定义单元格渲染的列表页，通过 `v-slot:<columnKey>` 写操作按钮、链接、状态展示等。
- 需要新增按钮、导出按钮、列配置、附件列或多选能力的列表页。

Do not use when:

- 纯展示小表格、弹窗内简单表格，直接用 `el-table` 更轻。
- 完全自定义布局、非分页、非查询驱动的复杂页面。
- 需要从零定义表格交互但不想接入系统列配置机制的场景。

Generation notes:

- 生成列表页时，优先组织 searchForm、tableData、id、name 和 handleSearch，这是最小可运行骨架。
- handleSearch 收到的是组件处理后的搜索/分页对象，页面里要重新补业务固定参数，例如状态、类型、应用编码等。
- 操作列不要在 tableColumns 里硬编码按钮，应该用 v-slot:action。
- 如果页面不需要新增按钮，显式传 :isShowAddBtn="false"，避免出现无效按钮。
- 如果使用远程列配置，id 要稳定且唯一，否则不同页面可能共用或污染配置。
- 附件列由组件内部使用 File，如果只是普通表单附件上传，不要为了附件功能强行套 baseTableV2。

## BaseUserInfo

Path: `bigboss-base/src/components/user/BaseUserInfo.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [BaseUserInfo](./cards/BaseUserInfo.md)

Use when:

- 适合用户详情、个人信息卡、人员相关业务详情。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 如果只是选择人员，应使用 SearchSelectUser。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合用户详情、个人信息卡、人员相关业务详情”明确匹配时，才优先使用该组件。
- 如果只是选择人员，应使用 SearchSelectUser。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## BizData

Path: `bigboss-base/src/module/admin/BizData/components/detail.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [BizData](./cards/BizData.md)

Use when:

- 适合列表页顶部业务数据快捷入口。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 不要作为通用统计卡片直接复用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合列表页顶部业务数据快捷入口”明确匹配时，才优先使用该组件。
- 不要作为通用统计卡片直接复用。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## businessConf

Path: `bigboss-base/src/components/form/businessConfiguration/index.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [businessConf](./cards/businessConf.md)

Use when:

- 适合嵌入系统配置相关页面。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 不建议在普通业务页面随意引用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合嵌入系统配置相关页面”明确匹配时，才优先使用该组件。
- 不建议在普通业务页面随意引用。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## CarouselList

Path: `bigboss-base/src/components/bigboss-app/app-infoDrawer/components/table.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [CarouselList](./cards/CarouselList.md)

Use when:

- 适合 app 信息抽屉、滚动展示类区域。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 不是通用表格，普通列表优先 baseTableV2。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合 app 信息抽屉、滚动展示类区域”明确匹配时，才优先使用该组件。
- 不是通用表格，普通列表优先 baseTableV2。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## CarouselVue

Path: `bigboss-base/src/components/form/CarouselVue.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [CarouselVue](./cards/CarouselVue.md)

Use when:

- 适合需要配置或回显多张图片轮播的表单字段。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通附件上传用 File。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合需要配置或回显多张图片轮播的表单字段”明确匹配时，才优先使用该组件。
- 普通附件上传用 File。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## chartsFunnel

Path: `bigboss-base/src/components/charts/funnel.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [chartsFunnel](./cards/chartsFunnel.md)

Use when:

- 适合 dashboard 漏斗分析、转化分析。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 不要用于普通列表或非漏斗图。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合 dashboard 漏斗分析、转化分析”明确匹配时，才优先使用该组件。
- 不要用于普通列表或非漏斗图。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## chartsLine

Path: `bigboss-base/src/components/charts/line.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [chartsLine](./cards/chartsLine.md)

Use when:

- 适合 dashboard 趋势、时间序列数据。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 不要在没有明确图表需求时使用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合 dashboard 趋势、时间序列数据”明确匹配时，才优先使用该组件。
- 不要在没有明确图表需求时使用。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## countTo

Path: `bigboss-base/src/components/count-to/count-to.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [countTo](./cards/countTo.md)

Use when:

- 适合 dashboard 指标、统计数字。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通文本数字不必使用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合 dashboard 指标、统计数字”明确匹配时，才优先使用该组件。
- 普通文本数字不必使用。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## currentYearMonth

Path: `bigboss-base/src/components/form/currentYearMonth/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [currentYearMonth](./cards/currentYearMonth.md)

Use when:

- 适合年月筛选、年月字段。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 完整日期范围请选择日期组件。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合年月筛选、年月字段”明确匹配时，才优先使用该组件。
- 完整日期范围请选择日期组件。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## depart

Path: `bigboss-base/src/components/form/depart.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [depart](./cards/depart.md)

Use when:

- 适合选择单个或受控部门字段。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 选择人员不要用它。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合选择单个或受控部门字段”明确匹配时，才优先使用该组件。
- 选择人员不要用它。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## DepartmentSelection

Path: `bigboss-base/src/components/form/departmentSelection.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [DepartmentSelection](./cards/DepartmentSelection.md)

Use when:

- 适合需要展示部门选择入口的表单。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 复杂组织树需求需人工确认。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合需要展示部门选择入口的表单”明确匹配时，才优先使用该组件。
- 复杂组织树需求需人工确认。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## DepartPage

Path: `bigboss-base/src/module/admin/DepartManage/index.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [DepartPage](./cards/DepartPage.md)

Use when:

- 适合系统管理中的部门管理入口。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 不是普通表单控件，不建议生成业务页面时随意嵌入。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合系统管理中的部门管理入口”明确匹配时，才优先使用该组件。
- 不是普通表单控件，不建议生成业务页面时随意嵌入。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## Description

Path: `bigboss-base/src/module/admin/systemDescription/index.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [Description](./cards/Description.md)

Use when:

- 适合系统初始化说明或平台描述配置。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通富文本说明应使用 HtmlView 或 EditorVue。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合系统初始化说明或平台描述配置”明确匹配时，才优先使用该组件。
- 普通富文本说明应使用 HtmlView 或 EditorVue。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## documentDesc

Path: `bigboss-base/src/module/admin/doc/documentDesc.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [documentDesc](./cards/documentDesc.md)

Use when:

- 适合文档管理相关说明页。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通描述文本不要直接用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合文档管理相关说明页”明确匹配时，才优先使用该组件。
- 普通描述文本不要直接用。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## EditorVue

Path: `bigboss-base/src/components/form/EditorVue.vue`

Status: `preferred`

Review: `human-reviewed`

Card: [EditorVue](./cards/EditorVue.md)

Use when:

- 适合公告、说明、反馈、工单描述等富文本字段。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通短文本用 el-input。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合公告、说明、反馈、工单描述等富文本字段”明确匹配时，才优先使用该组件。
- 普通短文本用 el-input。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## Excel

Path: `bigboss-base/src/components/excel/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [Excel](./cards/Excel.md)

Use when:

- 适合需要上传 Excel 或下载导入模板的业务。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通附件上传用 File。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合需要上传 Excel 或下载导入模板的业务”明确匹配时，才优先使用该组件。
- 普通附件上传用 File。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## File

Path: `bigboss-base/src/components/form/uploadFile/newFile.vue`

Status: `preferred`

Review: `human-reviewed`

Card: [File](./cards/File.md)

Use when:

- 表单里的普通附件上传。
- 详情页或列表单元格里的附件只读展示。
- 图片、视频、文档等混合附件。
- 需要设置封面图的图片附件场景。
- 需要通过 `cptCode` 传入文件上传业务编码的场景。

Do not use when:

- 只允许 PDF 且需要 PDF 专用校验时，优先看 `uploadPdfFile`。
- 只展示已上传文件且不需要上传弹窗时，可以传 `:uploadBtn="false"`，不要再包一层额外上传逻辑。
- 复杂文件管理页面如果需要批量审批、目录树、权限列表等，不能只靠这个组件完成。

Generation notes:

- 普通附件字段优先使用 File，不要重新写 el-upload。
- 页面数据里附件字段建议初始化为 []，避免 watcher 遇到非数组数据时出现不可预期行为。
- 新增/编辑表单通常传 multiple 和业务 cptCode。
- 详情页或只读场景必须显式传 :uploadBtn="false"，否则会显示上传/删除入口。
- 组件会把对象 URL 和字符串 URL 提取为 URL 数组并通过 input 回写，页面保存前以组件回写后的数组为准。
- cptCode 不要随意编造，应该沿用业务已有编码或由后端/平台约定。

## Flowchart

Path: `bigboss-base/src/components/mvpFlow/Diagram.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [Flowchart](./cards/Flowchart.md)

Use when:

- 适合流程图展示、流程建模、图形关系展示。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通流程审批详情不应直接使用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合流程图展示、流程建模、图形关系展示”明确匹配时，才优先使用该组件。
- 普通流程审批详情不应直接使用。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## FlowInstance

Path: `bigboss-base/src/components/flow/instance/index.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [FlowInstance](./cards/FlowInstance.md)

Use when:

- 适合流程实例列表或管理入口。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通业务审批按钮不要直接嵌入。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合流程实例列表或管理入口”明确匹配时，才优先使用该组件。
- 普通业务审批按钮不要直接嵌入。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## FlowTemplate

Path: `bigboss-base/src/components/flow/template/index.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [FlowTemplate](./cards/FlowTemplate.md)

Use when:

- 适合流程模板配置入口。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 不是通用表单控件。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合流程模板配置入口”明确匹配时，才优先使用该组件。
- 不是通用表单控件。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## FlowUserRule

Path: `bigboss-base/src/module/open/flow/user_rule/index.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [FlowUserRule](./cards/FlowUserRule.md)

Use when:

- 适合流程规则管理。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 业务页面生成时谨慎使用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合流程规则管理”明确匹配时，才优先使用该组件。
- 业务页面生成时谨慎使用。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## HrProfile

Path: `bigboss-base/src/components/hrProfile/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [HrProfile](./cards/HrProfile.md)

Use when:

- 适合人事档案、人员详情页。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通用户信息展示先看 BaseUserInfo 或 PersonCard。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合人事档案、人员详情页”明确匹配时，才优先使用该组件。
- 普通用户信息展示先看 BaseUserInfo 或 PersonCard。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## HtmlView

Path: `bigboss-base/src/components/form/HtmlView.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [HtmlView](./cards/HtmlView.md)

Use when:

- 适合展示后端返回的富文本 HTML。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 用户可编辑富文本用 EditorVue。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合展示后端返回的富文本 HTML”明确匹配时，才优先使用该组件。
- 用户可编辑富文本用 EditorVue。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## iconPicker

Path: `bigboss-base/src/components/iconPicker/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [iconPicker](./cards/iconPicker.md)

Use when:

- 适合菜单、配置项、业务入口图标选择。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 仅展示图标时不需要使用选择器。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合菜单、配置项、业务入口图标选择”明确匹配时，才优先使用该组件。
- 仅展示图标时不需要使用选择器。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## MeetingManage

Path: `bigboss-base/src/module/infor-syn/meeting/index.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [MeetingManage](./cards/MeetingManage.md)

Use when:

- 适合会议信息同步/会议管理入口。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通页面不要当控件使用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合会议信息同步/会议管理入口”明确匹配时，才优先使用该组件。
- 普通页面不要当控件使用。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## MenuManage

Path: `bigboss-base/src/module/admin/MenuManage/menuManage.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [MenuManage](./cards/MenuManage.md)

Use when:

- 适合系统菜单配置。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 业务页面生成时不应默认引用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合系统菜单配置”明确匹配时，才优先使用该组件。
- 业务页面生成时不应默认引用。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## mindMap

Path: `bigboss-base/src/components/mindMap/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [mindMap](./cards/mindMap.md)

Use when:

- 适合脑图、知识结构、方案结构展示。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通树形数据用树组件。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合脑图、知识结构、方案结构展示”明确匹配时，才优先使用该组件。
- 普通树形数据用树组件。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## MultipleChoice

Path: `bigboss-base/src/module/admin/SelectProject/multipleChoice.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [MultipleChoice](./cards/MultipleChoice.md)

Use when:

- 适合项目类多选场景。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通枚举多选用 el-select。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合项目类多选场景”明确匹配时，才优先使用该组件。
- 普通枚举多选用 el-select。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## newSelectDepart

Path: `bigboss-base/src/components/form/newSelectDepart.vue`

Status: `preferred`

Review: `human-reviewed`

Card: [newSelectDepart](./cards/newSelectDepart.md)

Use when:

- 适合新页面中的部门选择。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 选择人员或部门人员混选时看 selectDepartUser。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合新页面中的部门选择”明确匹配时，才优先使用该组件。
- 选择人员或部门人员混选时看 selectDepartUser。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## NoticeConfig

Path: `bigboss-base/src/components/notice/module/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [NoticeConfig](./cards/NoticeConfig.md)

Use when:

- 适合通知公告配置管理。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通通知详情不要用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合通知公告配置管理”明确匹配时，才优先使用该组件。
- 普通通知详情不要用。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## NoticeDetail

Path: `bigboss-base/src/components/notice/detail/index.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [NoticeDetail](./cards/NoticeDetail.md)

Use when:

- 适合查看通知公告内容、附件、阅读记录。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 编辑通知用通知编辑页面或 File/EditorVue 组合。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合查看通知公告内容、附件、阅读记录”明确匹配时，才优先使用该组件。
- 编辑通知用通知编辑页面或 File/EditorVue 组合。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## NoticeLayout

Path: `bigboss-base/src/components/notice/layout/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [NoticeLayout](./cards/NoticeLayout.md)

Use when:

- 适合通知中心或公告面板布局。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通卡片布局不应强行使用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合通知中心或公告面板布局”明确匹配时，才优先使用该组件。
- 普通卡片布局不应强行使用。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## NoticeSubscribe

Path: `bigboss-base/src/components/notice/subscribe/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [NoticeSubscribe](./cards/NoticeSubscribe.md)

Use when:

- 适合订阅通知场景。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通弹窗不用它。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合订阅通知场景”明确匹配时，才优先使用该组件。
- 普通弹窗不用它。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## PdfCard

Path: `bigboss-base/src/components/pdfCard/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [PdfCard](./cards/PdfCard.md)

Use when:

- 适合 PDF 文件卡片化展示。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 上传 PDF 用 uploadPdfFile。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合 PDF 文件卡片化展示”明确匹配时，才优先使用该组件。
- 上传 PDF 用 uploadPdfFile。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## PersonalResume

Path: `bigboss-base/src/components/form/personalResume/index.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [PersonalResume](./cards/PersonalResume.md)

Use when:

- 适合人员履历展示。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通用户卡片用 PersonCard。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合人员履历展示”明确匹配时，才优先使用该组件。
- 普通用户卡片用 PersonCard。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## PersonCard

Path: `bigboss-base/src/components/PersonCard.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [PersonCard](./cards/PersonCard.md)

Use when:

- 适合列表或详情中展示单个人员名片。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 选择人员用 SearchSelectUser。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合列表或详情中展示单个人员名片”明确匹配时，才优先使用该组件。
- 选择人员用 SearchSelectUser。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## PicPreview

Path: `bigboss-base/src/components/PicPreview.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [PicPreview](./cards/PicPreview.md)

Use when:

- 适合只读图片预览。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 上传图片用 File。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合只读图片预览”明确匹配时，才优先使用该组件。
- 上传图片用 File。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## QaDetail

Path: `bigboss-base/src/module/order/work/module/order_qa_detail.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [QaDetail](./cards/QaDetail.md)

Use when:

- 适合订单/工单 QA 详情。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通详情页不应复用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合订单/工单 QA 详情”明确匹配时，才优先使用该组件。
- 普通详情页不应复用。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## quarter

Path: `bigboss-base/src/components/form/quarter.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [quarter](./cards/quarter.md)

Use when:

- 适合季度筛选或季度字段。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 日期和年月字段不要用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合季度筛选或季度字段”明确匹配时，才优先使用该组件。
- 日期和年月字段不要用。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## RankingTag

Path: `bigboss-base/src/components/form/RankingTag.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [RankingTag](./cards/RankingTag.md)

Use when:

- 适合排名、等级、徽标展示。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通状态标签用 UTag 或 el-tag。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合排名、等级、徽标展示”明确匹配时，才优先使用该组件。
- 普通状态标签用 UTag 或 el-tag。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## Roll

Path: `bigboss-base/src/components/bigboss-app/app-infoDrawer/components/table.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [Roll](./cards/Roll.md)

Use when:

- 适合滚动展示、轮播信息区域。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 不要替代 baseTableV2。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合滚动展示、轮播信息区域”明确匹配时，才优先使用该组件。
- 不要替代 baseTableV2。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## searchPersonnel

Path: `bigboss-base/src/components/form/searchPersonnel.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [searchPersonnel](./cards/searchPersonnel.md)

Use when:

- 适合已有页面继续维护。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 新页面优先考虑 SearchSelectUser。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合已有页面继续维护”明确匹配时，才优先使用该组件。
- 新页面优先考虑 SearchSelectUser。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## SearchSelectUser

Path: `bigboss-base/src/components/form/SearchSelectUser.vue`

Status: `preferred`

Review: `human-reviewed`

Card: [SearchSelectUser](./cards/SearchSelectUser.md)

Use when:

- 表单中选择单个人员，例如交接人、提单人、负责人。
- 表单中选择多个人员，例如管理员、查阅人员、执行人员。
- 需要按姓名或登录名远程搜索人员。
- 需要限制根部门范围时，通过 `rootDepartIds` 传参。
- 需要一键导入某部门人员时，开启 `importDept`。

Do not use when:

- 只需要展示人员姓名，不需要搜索选择时，直接展示文本。
- 选择部门而非人员时，应使用部门选择组件，如 `newSelectDepart`、`selectDepart` 等。
- 需要复杂组织树、角色树、权限树选择时，这个组件不够。

Generation notes:

- 页面需要拿到人员对象时，优先监听 @selectPersonnel，不要只依赖 v-model。
- 单选事件返回对象，多选事件返回数组，生成代码时要分别处理。
- 多选场景必须显式传 :multiple="true"。
- 如果字段是只读态，传 :readonly="true"，不要用外层 v-if 简单隐藏已选值。
- 组件会写入 LocalSearchUserList 作为最近使用人员，适合业务系统内复用，但不要在隐私敏感页面额外扩散这些数据。
- 如果需要部门选择，不要误用 SearchSelectUser。

## selectDepart

Path: `bigboss-base/src/components/form/selectDepart.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [selectDepart](./cards/selectDepart.md)

Use when:

- 适合传统部门选择字段。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 新页面优先确认是否应使用 newSelectDepart。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合传统部门选择字段”明确匹配时，才优先使用该组件。
- 新页面优先确认是否应使用 newSelectDepart。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## selectDepartUser

Path: `bigboss-base/src/components/form/selectDepartUser/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [selectDepartUser](./cards/selectDepartUser.md)

Use when:

- 适合需要按部门组织选择人员的字段。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 纯人员远程搜索优先 SearchSelectUser。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合需要按部门组织选择人员的字段”明确匹配时，才优先使用该组件。
- 纯人员远程搜索优先 SearchSelectUser。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## SelectProject

Path: `bigboss-base/src/module/admin/SelectProject/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [SelectProject](./cards/SelectProject.md)

Use when:

- 适合选择项目或工程项目对象。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 非项目实体不要套用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合选择项目或工程项目对象”明确匹配时，才优先使用该组件。
- 非项目实体不要套用。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## SelectUser

Path: `bigboss-base/src/module/admin/SelectUser/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [SelectUser](./cards/SelectUser.md)

Use when:

- 适合后台管理中的用户选择模块。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通表单选人优先 SearchSelectUser。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合后台管理中的用户选择模块”明确匹配时，才优先使用该组件。
- 普通表单选人优先 SearchSelectUser。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## Tab

Path: `bigboss-base/src/components/form/Tabs.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [Tab](./cards/Tab.md)

Use when:

- 适合表单内简单标签页。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 页面级导航要结合页面布局判断。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合表单内简单标签页”明确匹配时，才优先使用该组件。
- 页面级导航要结合页面布局判断。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## TableBase

Path: `bigboss-base/src/components/baseTable/TableBase.vue`

Status: `legacy`

Review: `human-reviewed`；替代组件：`baseTableV2`

Card: [TableBase](./cards/TableBase.md)

Use when:

- 仅适合维护仍然依赖 `TableBase` 的历史页面。
- 仅在已有页面局部修 bug、补字段、保持旧页面兼容时保留。

Do not use when:

- 新列表页、管理页、配置页、业务查询页都不推荐使用 `TableBase`。
- 新页面统一使用 `baseTableV2`。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 页面生成时不要为了复刻旧引用样例而继续使用 `TableBase`。

Generation notes:

- Codex 生成新页面时不要选择 TableBase。
- 表格类页面、列表管理页、配置管理页统一使用 baseTableV2。
- 只有在用户明确要求维护历史 TableBase 页面时，才读取该组件源码并沿用旧写法。
- 如果旧页面需要迁移或重构，优先规划从 TableBase 迁移到 baseTableV2。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## Tabs

Path: `bigboss-base/src/components/tabs.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [Tabs](./cards/Tabs.md)

Use when:

- 适合通用标签切换。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 复杂路由页签不要直接用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合通用标签切换”明确匹配时，才优先使用该组件。
- 复杂路由页签不要直接用。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## Tags

Path: `bigboss-base/src/components/form/Tags.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [Tags](./cards/Tags.md)

Use when:

- 适合标签字段、分类标签。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通状态展示可用 UTag。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合标签字段、分类标签”明确匹配时，才优先使用该组件。
- 普通状态展示可用 UTag。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## UCard

Path: `bigboss-base/src/components/card/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [UCard](./cards/UCard.md)

Use when:

- 适合需要统一卡片视觉的业务块。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 页面大区块不要过度卡片化。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合需要统一卡片视觉的业务块”明确匹配时，才优先使用该组件。
- 页面大区块不要过度卡片化。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## uploadPdfFile

Path: `bigboss-base/src/components/form/uploadPdf/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [uploadPdfFile](./cards/uploadPdfFile.md)

Use when:

- 表单字段明确要求上传 PDF。
- 需要阻止图片、Word、Excel、压缩包等非 PDF 文件。
- PDF 文件需要回显、删除、下载或查看。
- 需要传 `cptCode` 给上传接口做业务归类。

Do not use when:

- 普通附件上传，优先使用 `File`。
- 多种格式混合上传，使用 `File`。
- 仅展示 PDF 且不需要上传按钮时，可以考虑 `File` 或 PDF 展示类组件，视业务展示方式而定。
- 需要在线 PDF 阅读器、分页预览、批注等复杂能力时，这个组件不够。

Generation notes:

- 只有需求明确写了“PDF 上传”“上传 PDF 文件”时才优先使用它。
- 普通“附件上传”“上传材料”“上传图片/视频/文档”不要用它，应该用 File。
- uploadBtn 默认是 false，新增/编辑表单如果需要上传，必须显式传 :uploadBtn="true" 或按只读态控制。
- 组件会校验文件后缀，只接受 pdf / PDF。
- 页面字段建议初始化为 []，以匹配内部按数组处理和 v-model 回写的行为。
- 当前没有真实业务引用样例，人工评审时应重点确认是否仍推荐进入页面生成索引。

## UserManage

Path: `bigboss-base/src/module/admin/UserManage/index.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [UserManage](./cards/UserManage.md)

Use when:

- 适合系统管理用户列表。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 不建议嵌入普通业务页面。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合系统管理用户列表”明确匹配时，才优先使用该组件。
- 不建议嵌入普通业务页面。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## uSwiper

Path: `bigboss-base/src/components/uSwiper/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [uSwiper](./cards/uSwiper.md)

Use when:

- 适合移动或门户类轮播内容。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通后台管理页面慎用。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合移动或门户类轮播内容”明确匹配时，才优先使用该组件。
- 普通后台管理页面慎用。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## UTag

Path: `bigboss-base/src/components/form/UTag.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [UTag](./cards/UTag.md)

Use when:

- 适合状态、分类、标记等轻量标签。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 复杂多标签列表用 Tags。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合状态、分类、标记等轻量标签”明确匹配时，才优先使用该组件。
- 复杂多标签列表用 Tags。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## viewFile

Path: `bigboss-base/src/components/form/viewFile.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [viewFile](./cards/viewFile-form-viewFile.md)

Use when:

- 页面已有文件 URL，只需要通过组件方法触发预览。
- 需要兼容图片、视频和普通文档预览跳转。
- 旧页面已经通过 `ref` 调用 `init(url)`。

Do not use when:

- 普通附件上传、附件回显、附件删除，优先使用 `File`。
- 附件列表内部预览，通常由 `File` 或其内部 list 模块处理。
- 只是展示一个下载链接时，不需要这个组件。

Generation notes:

- 新页面普通附件能力不要优先使用 viewFile，应使用 File。
- 只有当需求明确是“已有 URL 的文件预览触发器”时才考虑。
- 该组件通过方法调用工作，生成代码时要确保 ref 存在且 url 非空。
- 它与 ViewFile 不是同一个组件：ViewFile 是 uploadFile 模块内的附件展示组件，viewFile 是表单目录下的预览触发组件。

## viewFile

Path: `bigboss-base/src/components/form/viewFile.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [viewFile](./cards/ViewFile.md)

Use when:

- 适合兼容旧页面的文件展示。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 新页面优先 File 只读模式。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合兼容旧页面的文件展示”明确匹配时，才优先使用该组件。
- 新页面优先 File 只读模式。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## viewWord

Path: `bigboss-base/src/components/form/viewWord/index.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [viewWord](./cards/viewWord.md)

Use when:

- 适合 Word 附件预览。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通附件展示用 File。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合 Word 附件预览”明确匹配时，才优先使用该组件。
- 普通附件展示用 File。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## workFlow

Path: `bigboss-base/src/components/workFlow/setting.vue`

Status: `allowed`

Review: `human-reviewed`

Card: [workFlow](./cards/workFlow.md)

Use when:

- 适合流程配置场景。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 普通审批详情用 WorkFlowDetail。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合流程配置场景”明确匹配时，才优先使用该组件。
- 普通审批详情用 WorkFlowDetail。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## WorkFlowDetail

Path: `bigboss-base/src/components/flow/WorkFlowDetail.vue`

Status: `specialized`

Review: `human-reviewed`

Card: [WorkFlowDetail](./cards/WorkFlowDetail.md)

Use when:

- 适合展示流程审批详情、节点、附件等。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

Do not use when:

- 不用于流程规则配置。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

Generation notes:

- 只有当需求与“适合展示流程审批详情、节点、附件等”明确匹配时，才优先使用该组件。
- 不用于流程规则配置。
- 该组件更像页面级/模块级组件，生成新页面时不要把它当成普通表单控件或小组件嵌入。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。


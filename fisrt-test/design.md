# Design System of Enterprise Operations Console

> 基于 `数据可视化1.vue`、`数据可视化2.vue`、`列表页.vue`、`详情页.vue`、`表单页.vue` 的界面结构与样式抽取，结合现有 Element UI / iView 实现方式整理。

## 1. Visual Theme & Atmosphere

这套系统的视觉基调不是营销型官网，而是典型的企业业务后台: 白色画布、浅边框、高信息密度、低装饰、强调流程状态与操作可达性。它同时覆盖 4 类典型场景:

- 数据看板: 卡片化、图表驱动、主题色可配置
- 列表管理: 表格优先、操作入口集中在文本按钮和下拉菜单
- 详情配置: 双列表单、富文本编辑、浮层辅助提示
- 审批长表单: 类文档/类台账布局、强结构化表格、固定右侧锚点导航

**Key Characteristics:**

- 白底主界面，文本主色偏深灰而非纯黑
- 主品牌色由 `var(--theme-color)` 驱动，默认接近暖橙色 `#F19E38`
- 看板图表额外使用 `--accent-main-color` / `--accent-sub-color`
- 以 13px-16px 的业务字体为主，19px 页面标题与 28px 指标数字用于强调
- 圆角整体克制，常用值集中在 4px / 6px / 8px
- 阴影轻量，仅用于卡片、浮层、固定导航
- 设计优先级为“清晰、可操作、可扫描”，而不是“品牌展示感”

## 2. Color Palette & Roles

### Primary

- **Theme Accent** (`var(--theme-color)`, default `#F19E38`): 主按钮、激活态、文本操作、导航高亮、审批进度
- **Accent Main** (`--accent-main-color`): 看板主图表色、数字强调、柱状图填充
- **White** (`#FFFFFF`): 主背景、卡片背景、表单背景、弹窗背景
- **Success Green** (`#6AB588`): 已完成状态、正向结果、成功类状态块

### Semantic

- **Danger Red** (`#D73925`): 上传触发按钮、需要强提醒的动作
- **Danger Hover** (`#B82F1F`): 红色按钮 hover
- **Info Text** (`#606266`): 表单标签、说明文字、次级正文
- **Muted Text** (`#909399`): 浮层关闭图标、弱提示
- **Empty / Disabled** (`#ADADAD`): 空状态、次级图表轴线、弱视觉反馈

### Neutral

- **Heading** (`#262626`): 卡片标题、一级信息
- **Body Strong** (`#333333`): 表格正文、导航文本、常规业务文字
- **Body Secondary** (`#3D3D3D`): 次一级正文、列表数值、图表标签
- **Soft Border** (`#E5E6EB`): 卡片边框、图表分隔线
- **Overlay Border** (`#EBEEF5`): 浮层、提示条边框
- **Dense Table Border** (`#CCCCCC`): 审批表单、台账式表格边线
- **Light Fill** (`#F2F3F5`): 排名圆点、进度条轨道、浅底衬色

### Shadows

- **Card Shadow** (`0 2px 12px rgba(0, 0, 0, 0.06)`): 看板卡片标准阴影
- **Nav Shadow** (`0 3px 16px rgba(31, 39, 51, 0.2)`): 固定右侧锚点导航
- **Floating Panel Shadow** (`0 8px 24px rgba(15, 34, 58, 0.12)`): 规则变更提示、强浮层

### Token Convention

- 现有兼容 token: `--theme-color`
- 看板专用 token: `--accent-main-color`, `--accent-sub-color`
- 新增令牌时应优先围绕现有命名扩展，避免另起一套体系

## 3. Typography Rules

### Font Families

- **Primary**: `Microsoft YaHei`, `PingFang SC`, `Hiragino Sans GB`, `sans-serif`
- **Numeric / Chart**: 与主字体保持一致，不单独引入展示字体

### Hierarchy

| Role | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Page Title | 19px | 600 | 1.4-1.5 | 页面头部主标题 |
| Card Title | 16px | 700 | 1.4-1.5 | 看板卡片标题 |
| Section Title | 14px | 600 | 1.4-1.5 | 表单区块、规则提示标题 |
| Body | 14px | 400 | 1.5 | 表单内容、普通说明 |
| Dense Table Body | 13px | 400 | 1.4 | 审批台账、结构化表格 |
| Dense Table Head | 13px | 600 | 1.4 | 审批表头、导航文本 |
| Caption / Helper | 12px | 400 | 1.4-1.6 | 图表标签、弱提示、辅助说明 |
| Metric Number | 28px | 700 | 1.2 | 看板核心指标 |
| Status Badge | 15px | 600 | 1.3 | 流程状态块 |

### Typography Notes

- 正文偏业务密度型，优先使用 13px-14px
- 标题层级依赖字号和字重，不依赖复杂字族切换
- 图表与表格内文本应保持稳定灰阶，不做大面积彩色文字

## 4. Component Stylings

### Buttons

- **Primary Button**: 使用 `var(--theme-color)`，白字，适用于提交、保存、登记、导入、打印
- **Text Button**: 文字使用 `var(--theme-color)`，字重 600，适用于表格行内操作
- **Secondary Button**: 保持 Element 默认浅底按钮，用于取消、关闭、次级操作
- **Danger Upload Trigger**: `#D73925` 背景，4px 圆角，hover 切换到 `#B82F1F`

### Cards

- 背景统一为白色
- `1px solid #E5E6EB`
- `6px` 圆角
- 使用轻阴影，不叠加重描边与重投影
- 卡片头部通过左侧 4px 主题色竖条强化识别

### Tables

- **Data Table**: 依赖 `baseTableV2` / `el-table`，操作集中在行内文本按钮与更多下拉
- **Dense Document Table**: 使用 `#CCC` 实线边框、13px 字体、固定列结构，强调“表单即文档”
- 表格中的删除、查看等小操作应保持文本化，避免按钮堆叠

### Forms

- 常规配置页采用双列网格布局
- 标签宽度基准为 `120px`
- 列间距为 `24px`
- 富文本编辑器与附件区按主编辑区对齐
- 校验、规则说明、状态提示通过浮层和横向提示条补充

### Dialogs & Overlays

- 列表操作常见弹窗宽度: `30%`, `50%`, `90%`, `fullscreen`
- 底部操作按钮宜固定为 1-2 个主要动作
- 浮动提示条采用白底、浅描边、6px 圆角、较深阴影

### Dashboard Modules

- 指标卡片使用大数字居中展示
- 图表支持折线、柱状、仪表盘、词云、排行榜
- 空状态必须居中展示 `el-empty`
- 图表配色以主题色渐变带展开，不应引入过多独立品牌色

### Flow Navigation

- 长表单右侧使用固定锚点导航
- 导航项宽度约 `115px`，高度 `40px`
- 激活态使用主题色或暖橙底色，圆角 `8px`
- 流程状态块尺寸约 `115px * 115px`

## 5. Layout

- 页面背景统一为白色主画布
- 看板主布局为 `3fr / 6fr` 双列网格，间距 `10px`，高度约 `85vh`
- 左侧看板区域使用纵向分区，右侧使用三列信息卡片网格
- 配置详情页使用 `16px 24px 24px` 内边距
- 详情表单默认双列，`<1200px` 时切为单列
- 长表单/审批页为桌面优先布局，并为右侧固定导航预留约 `126px` 空间

### Spacing Scale

- 常用间距: `4px`, `6px`, `8px`, `10px`, `12px`, `16px`, `20px`, `24px`
- 大块内容之间优先使用 `16px-24px`
- 表格和行内操作之间优先使用 `6px-10px`

### Radius Scale

- `4px`: 小型功能按钮、上传按钮
- `5px`: 状态块等中小型胶囊
- `6px`: 卡片、浮层、条形图轨道
- `8px`: 导航激活块、固定导航容器
- `50%`: 序号圆点、状态圆点

## 6. Depth

系统的层次表达遵循“能区分即可”的原则，不使用厚重阴影或大面积渐变。

- 卡片层: 轻阴影 + 浅边框
- 固定导航层: 中等阴影，强调悬浮关系
- 浮动提醒层: 较深阴影，但仍保持白底和轻边框
- 审批大表单本体以描边结构为主，而不是阴影分层

## 7. Do's and Don'ts

### Do

- 使用 `var(--theme-color)` 作为统一主操作色
- 保持白底、浅边框、深灰文本的企业后台基调
- 在看板中复用主题色衍生色带，保证图表统一
- 在密集业务表单中坚持 13px-14px 正文字号
- 让空状态、流程状态、按钮优先服务“任务完成”

### Don't

- 不要把页面做成营销官网式的大留白、大标题风格
- 不要在同一页面混入多套主色
- 不要使用超过 12px 的大圆角卡片或强拟物阴影
- 不要让列表操作全部变成实体按钮，优先文本按钮和下拉菜单
- 不要破坏审批表单的台账感和固定结构

## 8. Responsive Behavior

这套系统是明显的桌面优先后台，不是移动优先产品。

- `>= 1200px`: 保持双列表单、双列/三列看板布局
- `< 1200px`: 详情配置页切换为单列
- 固定右侧锚点导航在窄屏下应考虑折叠或下移
- 图表卡片需保证内部滚动，不让整体页面出现失控溢出

## 9. Agent Prompt Guide

- **Theme**: 企业业务后台，功能优先，白底浅边框
- **Primary Accent**: `var(--theme-color)`，默认 `#F19E38`
- **Success**: `#6AB588`
- **Danger**: `#D73925`
- **Background**: `#FFFFFF`
- **Heading Text**: `#262626`
- **Body Text**: `#333333` / `#3D3D3D`
- **Secondary Text**: `#606266`
- **Muted Text**: `#909399` / `#ADADAD`
- **Card Border**: `#E5E6EB`
- **Dense Table Border**: `#CCCCCC`
- **Radius**: 优先 `4px`, `6px`, `8px`
- **Shadow**: 仅使用轻量后台阴影，不做重视觉特效
- **Component Stack**: Element UI + iView 混合体系，新增样式应优先兼容现有组件外观

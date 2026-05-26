# `bigboss-base/src/components` 组件索引

## 1. 范围说明

这份索引主要面向 `bigboss-base/src/components` 目录下的主组件、公共复用组件和核心组件族。

- 重点覆盖：对外导出组件、业务高频使用组件、流程/表格/表单/应用壳层入口组件

- 适度收敛：`mvpFlow/icon/*`、`flowchart/components/*`、`workFlow/dialog/*` 这类叶子子组件不逐个平铺，而按组件族归纳

- 页面入口列给的是“常见接入页示例”，不是全量引用清单

## 2. 目录概览

按一级目录粗分，`src/components` 里比较重要的组件族如下：

| 目录 | 规模 | 说明 |

| --- | ---: | --- |

| `form` | 58 | 表单控件、选人选部门、文件上传、富文本、预览、履历相关 |

| `mvpFlow` | 40 | LogicFlow 风格图形流程图编辑器，含大量图元/图标子组件 |

| `workFlow` | 17 | 审批流模板设计器、节点配置、选人弹窗 |

| `bigboss-app` | 14 | 系统壳层、左侧菜单、顶部导航、个人信息抽屉 |

| `flowchart` | 12 | 流程图编辑器 |

| `baseTableV2` | 10 | 新版通用表格 |

| `flow` | 9 | 流程运行态详情、实例、模板、日志 |

| `home` | 7 | 门户首页组件 |

| `baseTable` | 6 | 旧版通用表格 |

| `flowchartExplanation` | 5 | 流程说明展示组件 |

## 3. 公开组件索引

说明：

- 本节以 [`expose.js`](./expose.js) 为主，补充少数虽然未统一导出但在项目里很重的组件

- `关键 props`、`关键事件` 只列高频项；完整定义以源码为准

- `常见页面入口` 优先列直接引入的页面或模块

### 3.1 应用壳层 / 页面框架

| 组件名 | 路径 | 功能 | 关键 props | 关键事件 | 常见页面入口 |

| --- | --- | --- | --- | --- | --- |

| `bigboss-app` | `bigboss-app/index.vue` | 系统主壳，承载左侧菜单、顶部导航、`router-view`、文档页/配置页切换 | `menuData`、`keyPathMap`、`systemName`、`navigation`、`allMenuList` | 无显式对外事件 | `app/app.vue`，系统主布局 |

| `AppHeadImg` | `bigboss-app/app-head-img/index.vue` | 顶部用户区、导航切换、主题色切换、消息入口 | `showMsg` | `selectNav`、`systemColor`、`goRouter` | `bigboss-app/index.vue` |

| `AppMenu` | `bigboss-app/app-side-menu/index.vue` | 左侧菜单树、菜单跳转、文档/业务配置入口 | `keyPathMap`、`systemColor` | `goRouter`、`value` | `bigboss-app/index.vue` |

| `HomeSelectTab` | `bigboss-app/home-select-tab/index.vue` | 顶部标签页 / 已打开页面切换 | `menuData` | `closeTag`、`showLeftMenu` | `bigboss-app/index.vue` |

| `Description` | `../module/admin/systemDescription/index.vue` | 系统说明页转出组件 | `isInit` 等页面级 props | 页面级事件为主 | `bigboss-app/index.vue`、`/admin/docs` |

| `businessConf` | `form/businessConfiguration/index.vue` | 业务配置中心入口组件，内嵌到壳层里展示配置页 | `isInit`、`setCode` | 无 | `bigboss-app/index.vue` |

### 3.2 表格 / 查询 / 列表

| 组件名 | 路径 | 功能 | 关键 props | 关键事件 | 常见页面入口 |

| --- | --- | --- | --- | --- | --- |

| `TableBase` | `baseTable/TableBase.vue` | 旧版通用表格，集成搜索、分页、导出、列配置、图表切换 | `tableData`、`tableColumns`、`searchForm`、`searchCriteria`、`showExportBtn` | `handleSearch`、`handleAdd`、`changePage`、`changeSize`、`getExportData`、`cell-click` | 旧业务页和部分 `ehr/attendance` 页面 |

| `baseTableV2` | `baseTableV2/index.vue` | 新版通用表格，支持高级搜索、列设置、极简模式、图表切换、自动刷新 | 完整 props 见 `baseTableV2/props.js`；高频有 `tableData`、`tableColumns`、`searchCriteria`、`searchForm`、`showExportBtn`、`tableTitle` | `handleSearch`、`handleAdd`、`changePage`、`changeSize`、`getExportData`、`cell-click`、`on-selection-change` | `admin/UserManage/index.vue`、`open/pro/wwr/index.vue`、`ema/assetFlow/repair/index.vue`、`fma/bid/willBid/index.vue` |

| `Excel` | `excel/index.vue` | 在线 Excel 模板预览/编辑/导入，输出结构化数据 | `templateUrl` | `confirm` | `fma/potentialProjectInfo/index.vue`、`fma/bid/willBid/index.vue` |

| `chartsLine` | `charts/line.vue` | ECharts 折线图封装 | `option` | 无 | 各类统计页、图表看板 |

| `chartsFunnel` | `charts/funnel.vue` | ECharts 漏斗图封装 | `option` | 无 | 各类统计页、图表看板 |

| `countTo` | `count-to/count-to.vue` | 数字滚动动画 | `startVal`、`end`、`duration`、`decimals` | 无 | 首页、数据看板、统计卡片 |

### 3.3 文件 / 富文本 / 预览

| 组件名 | 路径 | 功能 | 关键 props | 关键事件 | 常见页面入口 |

| --- | --- | --- | --- | --- | --- |

| `File` | `form/uploadFile/newFile.vue` | 文件上传与展示总组件，支持图片/视频/普通文件、预览、删改、极简模式 | 完整 props 见 `form/uploadFile/props.js`；高频有 `value`、`multiple`、`uploadBtn`、`downBtn`、`cptCode`、`minimalistMode`、`selectImg` | `input`、`change`、`del`、`selectImg`、`close` | `ema/assetFlow/purchase/table.vue`、`ppm/ds/projectDetail/workTasks/index.vue`、`fma/projectList/index.vue` |

| `uploadPdfFile` | `form/uploadPdf/index.vue` | PDF 上传组件，适合只收集 PDF 附件 | `value`、`multiple`、`uploadBtn`、`downBtn`、`cptCode` | `input` | `ppm/psa/biddingPhase/table.vue` |

| `ViewFile` | `form/uploadFile/module/ViewFile.vue` | 文件列表/附件预览页内组件 | `attachments`、`attachmentsList`、`downBtn` | 无 | 被 `File` 及附件查看逻辑复用 |

| `viewFile` | `form/viewFile.vue` | 以 `init(url)` 方式打开文件预览，统一接入 `kkFileView` / 图片 / 视频 | 无显式 props，偏命令式调用 | 无 | 各类附件查看场景 |

| `EditorVue` | `form/EditorVue.vue` | WangEditor 富文本封装，支持粘贴图片、Word 转 HTML、HTML 回显 | `content`、`placeholder`、`readOnlys` | `changeData` | `form/doc.vue`、`open/pro/wwr/rule.vue`、业务富文本表单 |

| `HtmlView` | `form/HtmlView.vue` | 安全渲染 HTML 片段 | `html` | 无 | `form/doc.vue`、`HrProfile`、`EditorVue` 预览弹窗 |

| `viewWord` | `form/viewWord/index.vue` | Word/PDF 模板查看与导出弹窗，底层交给 `module/view.vue` | `attachTitle` | `close` | `ppm/ds/projectDetail/workTasks/serviceLetter/index.vue` |

| `PicPreview` | `PicPreview.vue` | 单图预览包装组件，内部调用 `preview-image` | `src`、`copy`、`del` | 无 | 图片预览、上传后查看 |

| `PdfCard` | `pdfCard/index.vue` | PDF 列表卡片，支持查看、下载、我的评价等动作 | `pdfList`、`showMyEvaluation`、`width`、`height` | `viewEvent`、`downEvent`、`tomy` | 文档列表、资料库、培训/知识类页面 |

### 3.4 选人 / 选部门 / 表单控件

| 组件名 | 路径 | 功能 | 关键 props | 关键事件 | 常见页面入口 |

| --- | --- | --- | --- | --- | --- |

| `SearchSelectUser` | `form/SearchSelectUser.vue` | 远程搜索用户，支持单选/多选、最近使用、按部门导入 | `selectList`、`multiple`、`showRecent`、`readonly`、`clearBtn`、`rootDepartIds`、`importDept` | `selectPersonnel`、`clear`、`focus` | `workFlow/setting.vue`、`open/pro/wwr/rule.vue`、`bigboss-app/app-infoDrawer/module/bottom/index.vue` |

| `searchPersonnel` | `form/searchPersonnel.vue` | 轻量选人控件，返回人员对象/数组 | `selectList`、`multiple`、`clearBtn`、`placeholder` | `selectPersonnel`、`clear` | `ema/assetFlow/contract/table.vue`、`ppm/ds/projectDetail/start/module/memberProject.vue` |

| `selectDepart` | `form/selectDepart.vue` | 旧版部门选择器 | `value`、`disabled`、`multiple`、`init_depart` | `select`、`clear` | `ema/assetFlow/allocation/table.vue`、`ppm/memberList.vue` |

| `newSelectDepart` | `form/newSelectDepart.vue` | 新版部门选择器，接口和交互更轻 | `depart`、`multiple`、`placeholder` | `on-change` | `baseTableV2/module/searchContent.vue`、业务搜索栏 |

| `depart` | `form/depart.vue` | 基础部门下拉封装，支持 `v-model` | `value`、`disabled`、`multiple`、`init_depart` | `input`、`change` | 表单页、筛选项、基础资料编辑 |

| `selectDepartUser` | `form/selectDepartUser/index.vue` | 级联部门人员选择弹窗 | `disabled`、`selectData` | `change` | 人员/部门关联选择场景 |

| `DepartmentSelection` | `form/departmentSelection.vue` | 部门类型 + 部门切换控件 | `showDepart`、`deptTypeList` | `changeType`、`changeDepart` | 组织口径筛选、统计页 |

| `selectUnit` | `selectUnit/index.vue` | 单位/人员选择器，按 `id` 去重回传 | `selectList`、`type` | `selectPersonnel`、`clear` | 单位/组织选取场景 |

| `selectBiz` | `form/selectBiz.vue` | 业务选择下拉 | `value` | `input` | 业务配置页、文档配置 |

| `quarter` | `form/quarter.vue` | 季度选择器，输出起止时间 | `quarterValue` | `quarterChange` | 统计页、考核页 |

| `currentYearMonth` | `form/currentYearMonth/index.vue` | 年/月可视化选择组件 | 无显式 props | 无 | 时间分析面板、统计类页面 |

| `YearPicker` | `form/YearPicker.vue` | 年份区间选择器，主要供 `baseTableV2` 搜索区复用 | `width` 等 | `updateTimeRange`、`clearTimeRange` | `baseTableV2/module/searchContent.vue` |

| `Tabs` | `form/Tabs.vue` | 简单文字 Tab 切换器 | `tabs` | `changeTab` | `form/doc.vue`、若干弹窗切页 |

| `tabs` | `tabs.vue` | 顶部切换标签组件 | `tabs` | `currentTab` | 轻量标签切换场景 |

| `UTag` | `form/UTag.vue` | 标签组件，支持删除/撤销/点击 | `label`、`closable`、`deleted`、`backgroundColor`、`fontColor` | `tag-click`、`tag-close`、`tag-revocation` | 资产标签、状态标签、标签输入场景 |

| `Tags` | `form/Tags.vue` | 标签选择/维护组件 | `tagList`、`color` | `tagsData` | 标签管理、表单标签录入 |

| `iconPicker` | `iconPicker/index.vue` | 图标选择器 | `fontIcon`、`value` | `input` | 菜单配置、图标字段录入 |

| `RankingTag` | `form/RankingTag.vue` | 排名徽标/角标展示 | `imageUrl` | 无 | 排名、荣誉、榜单类页面 |

| `actionTitle` | `form/actionTitle.vue` | 页面头部标题条，按当前菜单自动取标题 | 无 | 无 | 各类详情页头部 |

| `CarouselVue` | `form/CarouselVue.vue` | 轮播图/轮播附件展示 | `value`、`autoPlay`、`duration` | 无 | 首页、图文轮播场景 |

| `uSwiper` | `uSwiper/index.vue` | 图片/视频轮播展示组件 | `type` | 无 | 媒体轮播、视频图集场景 |

### 3.5 流程 / 图形 / 文档

| 组件名 | 路径 | 功能 | 关键 props | 关键事件 | 常见页面入口 |

| --- | --- | --- | --- | --- | --- |

| `WorkFlowDetail` | `flow/WorkFlowDetail.vue` | 流程实例详情、审批、传阅、催办、转办、加签等运行态面板 | 以方法调用为主，无显式公开 props | `optFlow`、`flowBizParam`、`flowBizCurrentApprover` | `ema/assetFlow/*/table.vue`、`ppm/ds/projectDetail/workTasks/designChange/index.vue`、`iwork/production/publish/detail/index.vue` |

| `FlowTemplate` | `flow/template/index.vue` | 流程模板列表/管理入口 | `appCode` | 无 | 业务流程模板管理场景 |

| `FlowInstance` | `flow/instance/index.vue` | 流程实例列表/查看入口 | `appCode` | 无 | 业务流程实例查询场景 |

| `workFlow` | `workFlow/setting.vue` | 流程模板设计器，支持节点编排、审批人/条件/抄送人配置 | `modalType`、`hidden` | `close` | 流程配置、开放平台流程规则场景 |

| `Flowchart` | `mvpFlow/Diagram.vue` | 可编辑图形流程图组件，支持拖拽图元、设置样式、导出图数据 | `readOnlyMode`、`flowChartData` | `$_saveGraph` | 流程图设计、图形化业务建模 |

| `flowchartExplanation` | `flowchartExplanation/index.vue` | 流程说明展示/编辑组件，适合“文档里的流程说明” | `readonly`、`nodeConfig.sync` | `update:nodeConfig` | `form/doc.vue` |

| `mindMap` | `mindMap/index.vue` | 思维导图编辑/只读查看 | `readOnlyMode`、`theme`、`lineColor` | `$_mindMap` | 知识梳理、脑图编辑页 |

| `documentDesc` | `../module/admin/doc/documentDesc.vue` | 文档说明页组件转出 | 页面级 props | 页面级事件 | 壳层文档模式、系统文档页 |

### 3.6 展示 / 人员 / 资料卡

| 组件名 | 路径 | 功能 | 关键 props | 关键事件 | 常见页面入口 |

| --- | --- | --- | --- | --- | --- |

| `HrProfile` | `hrProfile/index.vue` | 员工履历/简历组件，支持选人、模块勾选、Word 导出 | `userName`、`showLeftSidebar`、`showUserTable`、`showExportModulePanel`、`exportModulePanelPosition` | 无 | `bigboss-wedo/src/module/main/ehr/hrProfile/index.vue` |

| `PersonalResume` | `form/personalResume/index.vue` | 个人业绩/履历子模块组合组件 | 以内部数据加载为主 | 无 | `admin/UserManage/index.vue`、多个人员详情弹窗 |

| `PersonCard` | `PersonCard.vue` | 个人名片生成/导出图片 | `username` | 无 | 人员名片、分享卡片场景 |

| `BaseUserInfo` | `user/BaseUserInfo.vue` | 基础用户信息展示组件 | `userInfo` 等 | 无 | 个人信息页、信息抽屉 |

| `UCard` | `card/index.vue` | 通用卡片容器 | `width`、`height`、`borderColor`、`backgroundImage`、`backgroundColor` | `click` | 首页卡片、信息卡片 |

## 4. 核心内部组件族

这些目录虽然不是全部通过 `expose.js` 导出，但在系统里非常关键，阅读源码时建议按“入口组件 -> 子组件”方式理解。

| 组件族 | 入口组件 | 主要子组件 | 用途 | 常见页面入口 |

| --- | --- | --- | --- | --- |

| `bigboss-app/*` | `bigboss-app/index.vue` | `app-side-menu/*`、`app-head-img/*`、`app-infoDrawer/*`、`home-select-tab/*` | 系统壳层、导航、用户信息抽屉、主题切换 | 应用主布局 |

| `workFlow/*` | `workFlow/setting.vue` | `nodeWrap.vue`、`addNode.vue`、`drawer/*.vue`、`dialog/*.vue` | 审批流模板设计 | 流程配置页 |

| `flow/*` | `flow/WorkFlowDetail.vue` | `module/FlowCheck.vue`、`FlowCirculate.vue`、`FlowDataCount.vue`、`FlowUrgeLog.vue` | 审批流运行态 | 各业务 `table.vue` 详情页 |

| `baseTableV2/module/*` | `baseTableV2/index.vue` | `module/searchContent.vue`、`module/drawer/*`、`module/chart/index.vue` | 搜索栏、列配置、图表、导出配置 | 各类列表页 |

| `baseTable/module/*` | `baseTable/TableBase.vue` | `module/Drawer/*`、`module/chart/index.vue` | 旧版搜索/列配置/图表逻辑 | 旧业务列表页 |

| `flowchart/*` | `flowchart/flowchartEditor.vue` | `components/Toolbar.vue`、`ItemPanel.vue`、`DetailPanel.vue`、`ContextMenu.vue` | 流程图编辑器 | 流程图配置页 |

| `flowchartExplanation/*` | `flowchartExplanation/index.vue` | `nodeWrap.vue`、`addNode.vue`、`drawer/*` | 轻量流程说明编辑/展示 | `form/doc.vue` |

| `mvpFlow/*` | `mvpFlow/Diagram.vue` | `DiagramToolbar.vue`、`DiagramSidebar.vue`、`PropertyPanel.vue`、`icon/*` | 可拖拽的图元编辑器 | 图形化建模页 |

| `mindMap/*` | `mindMap/index.vue` | `data.json`、`customThemes/*` | 思维导图 | 脑图类页面 |

| `form/personalResume/*` | `form/personalResume/index.vue` | `PersonalPerformance/*`、`projectDetail/*` | 个人履历、业绩、项目明细 | 员工详情、人才信息页 |

| `home/*` | `home/index.vue` | `module/SystemList.vue`、`Carousel.vue`、`New.vue`、`Footer.vue` | 门户首页 | `/home` |

## 5. 查询类型速查

如果后续要查“某个列表页支持哪些查询控件类型”，优先看：

- `baseTable`：`baseTable/TableBase.vue`

- `baseTableV2`：`baseTableV2/module/searchContent.vue`

### 5.1 `baseTable` 支持的 `item.type`

`input`、`matchingKey`、`date`、`dateTime`、`shortcutKeyDate`、`provinceCity`、`year`、`yearMonth`、`select`、`apiSelect`、`multipleChoice`、`apiMultipleChoice`、`depart`、`yearInterval`、`cascade`、`selectMajorInput`、`selectPersonnelInput`、`radius`、`personnel`、`radiusSelect`、`multipleProvince`、`multipleArea`

### 5.2 `baseTableV2` 额外支持的类型

在上面基础上，`baseTableV2` 额外补了：

`apiRadio`、`checkbox`、`apiCheckbox`

## 6. 页面路径 / 路由入口文件

如果要把“组件”反查到“页面路径”，优先看下面这些文件：

### 6.1 `bigboss-base`

- `src/common/menuConfig.js`

- `src/router/index.js`

- `src/module/admin/menu.admin.js`

- `src/module/system/menu.system.js`

- `src/module/open/menu.open.js`

- `src/module/my/menu.my.js`

- `src/module/lab/menu.lab.js`

- `src/module/order/menu.order.js`

### 6.2 `bigboss-wedo`

- `src/js/pageMenuConfig.js`

- `src/module/main/menu.main.js`

- `src/module/main/ema/menu.ema.js`

- `src/module/main/fma/menu.fma.js`

- `src/module/main/ppm/menu.ppm.js`

- `src/module/main/ehr/menu.ehr.js`

- `src/module/main/home/menu.home.js`

- `src/module/main/iwork/menu.iwork.js`

- `src/module/main/klog/menu.klog.js`

## 7. 补充说明

- `expose.js` 里有一部分“转出页面组件”，例如 `DepartPage`、`UserManage`、`MenuManage`、`Description`、`documentDesc`；它们不完全属于 `src/components` 目录内部组件，但会在业务侧被当成“公共组件入口”使用。

- 对于 `File`、`baseTableV2` 这类“大而全”的组件，建议同时看：

- `form/uploadFile/props.js`

- `baseTableV2/props.js`

- `baseTableV2/module/searchContent.vue`

- 对于 `HrProfile`，目录内已经有独立文档：

- `hrProfile/docs/组件使用.md`

- `hrProfile/docs/开发纪要.md`
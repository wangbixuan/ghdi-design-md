# Component Config Requirements

这份清单用于页面生成前判断：哪些组件不能只靠自然语言需求自动填值，必须先向业务方确认配置、编码、接口上下文或系统约定。

## 使用原则

- 不要编造业务编码、上传编码、流程编码、表格配置 ID、通知场景编码。
- 能从目标项目同模块现有页面中稳定继承的，优先继承现有写法。
- 目标模块没有同类样例时，先向用户确认，再生成页面代码。
- 生成计划中应把这些配置写进“待确认项”或“接口/配置占位”。

## 必须先确认

| 组件 | 前置配置 | 需要确认什么 | 不确认的风险 |
|---|---|---|---|
| `File` | `cptCode` | 文件上传业务编码，例如 `CMP.WEDO.FILEUPLOAD.NOTICE`、`CMP.BASE.FILEUPLOAD.BASEWORKORDER`；是否多文件；是否只读；是否允许封面图。 | 上传进入错误业务分类，权限、下载、预览、安全等级可能不对。 |
| `uploadPdfFile` | `cptCode`、`fileConfig`、`UploadUrl` | PDF 上传业务编码；是否只允许 PDF；是否使用默认上传接口；上传按钮是否显示。 | PDF 校验、上传目录、下载权限或接口地址错误。 |
| `baseTableV2` | `id`、`name`、`cptCode` | 表格远程配置 ID 是否已有；表格名称；附件列上传编码；是否启用远程列配置。 | 多页面共用或污染表格列配置；附件列上传编码错误。 |
| `WorkFlowDetail` | `flowData.bizCode`、`flowData.projectName`、`flowData.flowId`、`modelType` | 审批业务编号；流程标题来源；是发起、查看还是重新申请；已有流程实例 ID。 | 找不到流程模板，审批无法发起，重新申请或详情态错误。 |
| `FlowTemplate` | `appCode` | 流程模板所属应用编码。通常来自系统配置或目标业务应用。 | 展示或维护了错误应用下的流程模板。 |
| `FlowInstance` | `appCode` | 流程实例所属应用编码。 | 查询到错误应用的流程实例。 |
| `workFlow` | `appCode`、`bizCode`、流程配置字段 | 流程模板配置所属应用、业务编号、业务名称、跳转路径、接口路径、通知/优先级等规则。 | 流程配置错误会影响审批流全链路。 |
| `businessConf` | `setCode`、`type`、`isInit` | 业务配置编码、配置类型、是否初始化模式。 | 进入错误配置项或覆盖错误配置。 |
| `Description` | `setCode`、`type`、`isInit` | 系统说明/文档配置编码和模式。 | 打开或编辑错误系统说明内容。 |
| `BizData` | `flowKey`、`type`、`btnTile` | 业务数据入口对应的流程/业务 key、展示类型、按钮标题。 | 快捷入口指向错误业务数据。 |
| `Excel` | `templateUrl`、`type` | 导入模板地址；导入类型；上传后数据解析规则。 | 用户下载错误模板，导入字段无法匹配。 |
| `NoticeAddNew` | 通知模板、发文规则、`noticeMode`、`editId`、路由上下文 | 新增/编辑/查看模式；公告实例 ID；通知模板和发文规则是否已配置；附件 `cptCode`；审批业务编号。 | 通知公告表单无法正确加载、保存、预览或提交审批。 |
| `NoticeConfig` | 通知模块后端配置 | 是否已有场景、面板、分类、模板、发文规则、订阅配置。 | 生成页面只搭出壳，实际通知配置不可用。 |
| `NoticeLayout` | `layoutType`、`panels`、`system`、`appScene`、`identity` | 通知布局类型；面板/分类数据；系统标识；应用场景；身份。 | 通知面板展示结构、订阅范围或数据来源错误。 |
| `NoticeSubscribe` | `items`、`system`、`appScene`、`identity` | 可订阅项；系统标识；应用场景；身份。 | 订阅保存到错误场景或身份范围。 |

## 建议先确认

| 组件 | 前置配置 | 需要确认什么 |
|---|---|---|
| `SearchSelectUser` | `rootDepartIds`、`importDept`、`multiple`、`maxSelectCount` | 是否限制部门范围；是否允许按部门导入；单选/多选；最大选择人数。 |
| `searchPersonnel` | `selectList`、`multiple`、`clearBtn` | 旧页面维护时的已选人员结构；是否多选；是否允许清空。新页面优先评估 `SearchSelectUser`。 |
| `newSelectDepart` | `depart`、`multiple` | 初始部门值结构；单选/多选。 |
| `selectDepart` / `depart` | `init_depart`、`multiple`、`disabled` | 旧部门选择器的初始值格式；是否延续旧页面交互。 |
| `selectDepartUser` | `selectData` | 部门人员混选的已选数据结构。 |
| `SelectUser` / `SelectProject` / `MultipleChoice` | `type`、`selectList`、`keyword` | 选择范围、已选数据结构、搜索关键字和业务类型。 |
| `HrProfile` | `userName`、导出模块配置 | 查看哪个人员；是否显示左侧栏、人员表、导出模块面板。 |
| `MenuManage` | `dev`、`type` | 菜单管理模式和环境类型。普通业务页不应默认使用。 |
| `DepartPage` | `selectDepart`、`selectUser`、`dev`、`dType` | 组织管理页面模式、是否选部门/选人、部门类型。 |

## 按页面数据配置

这些组件通常不需要平台级编码，但仍需要由页面需求或接口数据提供配置。

| 组件 | 页面数据配置 |
|---|---|
| `chartsLine` / `chartsFunnel` | `option`，包括图表维度、指标、颜色、空态。 |
| `countTo` | `startVal`、`end`、`duration`、小数位和分隔符。 |
| `Tabs` / `Tab` | `tabs` 列表、当前激活项、切换后数据加载逻辑。 |
| `Tags` / `UTag` | 标签列表、状态颜色、是否可关闭/撤销。 |
| `UCard` | 尺寸、背景、边框、是否可选中。 |
| `CarouselVue` / `uSwiper` | 图片/视频列表、自动播放、时长。 |
| `PdfCard` | PDF 列表、查看/下载权限、是否展示“我的评价”。 |
| `PicPreview` | 图片地址、是否允许复制/删除。 |
| `viewFile` / `ViewFile` / `viewWord` | 文件 URL、标题、下载权限和预览服务是否可用。 |
| `EditorVue` / `HtmlView` | 富文本内容、只读状态、保存字段。 |

## 页面生成时的问法模板

当页面需求命中上述“必须先确认”的组件，但没有给出配置时，优先问这些短问题：

```txt
这个附件上传字段使用哪个 cptCode？如果没有新编码，我可以沿用同模块现有页面的编码吗？
```

```txt
这个列表是否已有 baseTableV2 的表格配置 ID 和名称？如果没有，我会按模块名生成一个稳定 ID，但需要你确认。
```

```txt
这个审批页对应的流程 bizCode 是什么？是否已有 flowId，还是新增时发起新流程？
```

```txt
这个通知页面对应哪个 system、appScene、identity 和 layoutType？
```

```txt
这个 Excel 导入使用哪个模板地址 templateUrl？导入后字段如何映射？
```


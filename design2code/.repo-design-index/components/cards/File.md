# File

> 说明：这是 Codex 根据源码和真实引用样例补充后的组件说明 card，待人工审阅。

## 1. 索引元信息

| 字段 | 值 |
|---|---|
| 组件名 | `File` |
| 暴露来源 | `expose.js` |
| importPath | `./form/uploadFile/newFile.vue` |
| 源码路径 | `bigboss-base/src/components/form/uploadFile/newFile.vue` |
| 初步分类 | `upload-preview` |
| 说明状态 | `human-reviewed` |
| 推荐状态 | `preferred` |

## 2. 组件定位

`File` 是系统通用附件上传、回显、预览和删除组件。它会按文件类型区分图片、视频和普通文件，图片可以缩略图/列表切换，普通文件通过内置 list 模块展示。它使用 `v-model` 双向绑定附件 URL 数组。

这是普通附件字段的首选组件，例如反馈附件、工单附件、通知附件、项目资料附件等。

## 3. 适用场景

- 表单里的普通附件上传。
- 详情页或列表单元格里的附件只读展示。
- 图片、视频、文档等混合附件。
- 需要设置封面图的图片附件场景。
- 需要通过 `cptCode` 传入文件上传业务编码的场景。

## 4. 不适用场景

- 只允许 PDF 且需要 PDF 专用校验时，优先看 `uploadPdfFile`。
- 只展示已上传文件且不需要上传弹窗时，可以传 `:uploadBtn="false"`，不要再包一层额外上传逻辑。
- 复杂文件管理页面如果需要批量审批、目录树、权限列表等，不能只靠这个组件完成。

## 5. 常用 Props

- `value: Array | String`：双向绑定值。实际使用中建议传 URL 数组。
- `multiple: Boolean`：是否允许多文件，默认 `false`。
- `uploadBtn: Boolean`：是否显示上传/删除等上传相关按钮，默认 `true`。
- `downBtn: Boolean`：是否显示下载能力，默认 `true`。
- `cptCode: String`：文件上传业务编码，常见如 `CMP.BASE.FILEUPLOAD.BASEWORKORDER`。
- `fileConfig: Object`：上传格式、大小等配置，传给内部上传模块。
- `selectImg: Boolean`：是否允许选择图片作为封面。
- `coverUrl: String`：回显已选封面图。
- `isRestrictedImgFormat: Boolean`：是否限制图片格式。
- `isRestrictedVideoFormat: Boolean`：是否限制视频格式。
- `minimalistMode: Boolean`：极简列表展示模式。
- `collapsed: Boolean`：是否默认折叠。
- `fileName: String`：自定义文件名。

## 6. 常用事件

- `input(urls)`：附件变化时触发，也是 `v-model` 的更新事件。
- `change`：确认上传、删除后触发。
- `del(index)`：删除单个附件后触发。
- `del`：一键删除全部附件后触发。
- `selectImg(url)`：选择封面图片时触发。
- `close`：取消上传弹窗时触发。

## 7. 常用插槽

暂无外部业务插槽。组件内部通过 `upload` 和 `list` 子模块组织 UI。

## 8. 典型用法

表单附件上传：

```vue
<File
  v-model="orderForm.attachments"
  cptCode="CMP.BASE.FILEUPLOAD.BASEWORKORDER"
  multiple
  ref="file"
/>
```

通知附件，可根据只读状态控制上传按钮：

```vue
<File
  v-model="attachmentList"
  cptCode="CMP.WEDO.FILEUPLOAD.NOTICE"
  :uploadBtn="!isReadonly"
  ref="upload"
  multiple
/>
```

列表或详情中的只读附件展示：

```vue
<File
  v-model="scope.row"
  cptCode="CMP.BASE.FILEUPLOAD.BASETABLE"
  :multiple="true"
  :uploadBtn="false"
/>
```

## 9. 生成页面时的注意事项

- 普通附件字段优先使用 `File`，不要重新写 `el-upload`。
- 页面数据里附件字段建议初始化为 `[]`，避免 watcher 遇到非数组数据时出现不可预期行为。
- 新增/编辑表单通常传 `multiple` 和业务 `cptCode`。
- 详情页或只读场景必须显式传 `:uploadBtn="false"`，否则会显示上传/删除入口。
- 组件会把对象 URL 和字符串 URL 提取为 URL 数组并通过 `input` 回写，页面保存前以组件回写后的数组为准。
- `cptCode` 不要随意编造，应该沿用业务已有编码或由后端/平台约定。

## 10. 人工修订记录

- 2026-05-27：人工确认该组件已过审，可以正式使用。
- 2026-05-27：Codex 首次根据 `newFile.vue`、`props.js` 和反馈、工单、通知等真实引用补充。

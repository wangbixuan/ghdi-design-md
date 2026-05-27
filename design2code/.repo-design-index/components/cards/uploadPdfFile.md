# uploadPdfFile

> 说明：这是 Codex 根据源码补充后的组件说明 card，待人工审阅。当前代码库中只发现组件暴露，未发现业务页面直接引用样例。

## 1. 索引元信息

| 字段 | 值 |
|---|---|
| 组件名 | `uploadPdfFile` |
| 暴露来源 | `expose.js` |
| importPath | `./form/uploadPdf/index.vue` |
| 源码路径 | `bigboss-base/src/components/form/uploadPdf/index.vue` |
| 初步分类 | `upload-preview` |
| 说明状态 | `human-reviewed` |
| 推荐状态 | `allowed` |

## 2. 组件定位

`uploadPdfFile` 是 PDF 专用上传和展示组件。它基于 `el-upload` 和通用文件 `list` 模块实现，只允许上传 `pdf` / `PDF` 文件，并通过 `v-model` 回写文件 URL 数组。

相比 `File`，它的边界更窄：不是通用附件组件，而是“明确要求只能上传 PDF”的字段组件。

## 3. 适用场景

- 表单字段明确要求上传 PDF。
- 需要阻止图片、Word、Excel、压缩包等非 PDF 文件。
- PDF 文件需要回显、删除、下载或查看。
- 需要传 `cptCode` 给上传接口做业务归类。

## 4. 不适用场景

- 普通附件上传，优先使用 `File`。
- 多种格式混合上传，使用 `File`。
- 仅展示 PDF 且不需要上传按钮时，可以考虑 `File` 或 PDF 展示类组件，视业务展示方式而定。
- 需要在线 PDF 阅读器、分页预览、批注等复杂能力时，这个组件不够。

## 5. 常用 Props

- `value: String | Array`：双向绑定值。建议传 URL 数组。
- `multiple: Boolean`：是否允许多文件，默认 `false`。
- `uploadBtn: Boolean`：是否显示上传按钮，默认 `false`。
- `fileConfig: Object`：上传配置，会与默认 PDF 配置合并。
- `disabled: Boolean`：是否禁用。
- `isShowLoad: Boolean`：是否显示上传 loading。
- `cptCode: String`：文件上传业务编码。
- `downBtn: Boolean`：是否需要下载链接。
- `region: String`：上传地区名，默认 `id`。
- `UploadUrl: String`：自定义上传地址。
- `config: Object`：当前字段配置。
- `isShowBtn: Boolean`：是否展示按钮。
- `viewBtn: Boolean`：是否展示查看按钮。

## 6. 常用事件

- `input(urls)`：文件变化后触发，也是 `v-model` 更新事件。

源码中删除后会刷新内部文件列表，但没有像 `File` 那样额外触发 `change` 或 `del`，生成页面时不要依赖这些事件。

## 7. 常用插槽

暂无外部业务插槽。

## 8. 典型用法

当前代码库未发现业务页面直接引用 `uploadPdfFile`。推荐用法如下：

```vue
<uploadPdfFile
  v-model="form.pdfFiles"
  cptCode="CMP.BASE.FILEUPLOAD.PDF"
  :uploadBtn="!readonly"
  :multiple="true"
/>
```

只读展示：

```vue
<uploadPdfFile
  v-model="form.pdfFiles"
  cptCode="CMP.BASE.FILEUPLOAD.PDF"
  :uploadBtn="false"
/>
```

## 9. 生成页面时的注意事项

- 只有需求明确写了“PDF 上传”“上传 PDF 文件”时才优先使用它。
- 普通“附件上传”“上传材料”“上传图片/视频/文档”不要用它，应该用 `File`。
- `uploadBtn` 默认是 `false`，新增/编辑表单如果需要上传，必须显式传 `:uploadBtn="true"` 或按只读态控制。
- 组件会校验文件后缀，只接受 `pdf` / `PDF`。
- 页面字段建议初始化为 `[]`，以匹配内部按数组处理和 `v-model` 回写的行为。
- 当前没有真实业务引用样例，人工评审时应重点确认是否仍推荐进入页面生成索引。

## 10. 人工修订记录

- 2026-05-27：人工确认该组件已过审，可以正式使用。
- 2026-05-27：Codex 首次根据 `bigboss-base/src/components/form/uploadPdf/index.vue` 补充；未找到业务页面直接引用。

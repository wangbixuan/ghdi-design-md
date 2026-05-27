# viewFile

> 说明：这是 Codex 根据源码和引用扫描补充后的组件说明 card，待人工审阅。注意它与 `ViewFile` 大小写不同，在 Windows 文件系统下 card 文件名使用了路径后缀避免冲突。

## 1. 索引元信息

| 字段 | 值 |
|---|---|
| 组件名 | `viewFile` |
| 暴露来源 | `expose.js` |
| importPath | `./form/viewFile.vue` |
| 源码路径 | `bigboss-base/src/components/form/viewFile.vue` |
| 说明状态 | `human-reviewed` |
| 推荐状态 | `allowed` |
| 引用样例数量 | `0` |

## 2. 组件定位

`viewFile` 是一个文件预览触发组件，本身几乎不渲染业务内容，主要通过对外方法 `init(url)` 接收文件 URL，然后调用 `viewFileJS` 或 kkFile 服务打开预览。

它更像文件预览能力的轻量桥接模块，不是上传组件，也不是附件列表组件。

## 3. 适用场景

- 页面已有文件 URL，只需要通过组件方法触发预览。
- 需要兼容图片、视频和普通文档预览跳转。
- 旧页面已经通过 `ref` 调用 `init(url)`。

## 4. 不适用场景

- 普通附件上传、附件回显、附件删除，优先使用 `File`。
- 附件列表内部预览，通常由 `File` 或其内部 list 模块处理。
- 只是展示一个下载链接时，不需要这个组件。

## 5. 常用 Props

- 暂无显式 props。

## 6. 常用事件

- 暂无自动识别到的对外事件。

## 7. 常用插槽

- 暂无外部业务插槽。

## 8. 典型用法

当前扫描未发现业务页面直接以标签方式引用该组件。若必须使用，通常应通过 `ref` 调用方法：

```vue
<viewFile ref="viewFile" />
```

```js
this.$refs.viewFile.init(fileUrl)
```

## 9. 生成页面时的注意事项

- 新页面普通附件能力不要优先使用 `viewFile`，应使用 `File`。
- 只有当需求明确是“已有 URL 的文件预览触发器”时才考虑。
- 该组件通过方法调用工作，生成代码时要确保 `ref` 存在且 `url` 非空。
- 它与 `ViewFile` 不是同一个组件：`ViewFile` 是 uploadFile 模块内的附件展示组件，`viewFile` 是表单目录下的预览触发组件。

## 10. 人工修订记录

- 2026-05-27：人工确认该组件已过审，可以正式使用。
- 2026-05-27：Codex 根据 `bigboss-base/src/components/form/viewFile.vue` 和引用扫描补充；未发现业务页面直接引用。

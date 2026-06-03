# NoticeAddNew

> 说明：这是脚本初始化生成的组件说明 card 骨架。它还不是完成版组件索引，需要 Codex 继续阅读源码和真实引用样例后补充语义说明，再由人工审阅修订。

## 1. 索引元信息

| 字段 | 值 |
|---|---|
| 组件名 | `NoticeAddNew` |
| 暴露来源 | `expose.js` |
| importPath | `@/components/notice/module/noticeManage/addNew.vue` |
| 源码路径 | `bigboss-base/src/components/notice/module/noticeManage/addNew.vue` |
| 初步分类 | `notice-business` |
| 说明状态 | `codex-drafted` |

## 2. 组件定位

`NoticeAddNew` 是通知公告实例的新增、编辑、查看和审批发布表单页。它组合通知模板填值、发文规则、附件/封面上传、抄送人员、富文本预览、审批流提交等能力，属于通知公告业务域的页面级组件，不是通用表单控件。

它通常与通知公告管理列表页配套使用：列表页通过 `/notice/manage/form` 路由打开新增、编辑或查看页面，并通过 `noticeMode`、`editId` 等 query 控制页面模式。

## 3. 适用场景

- 通知公告模块中创建新的公告实例。
- 编辑草稿、待发布、已取消或审批退回/撤销后的公告实例。
- 查看需要展示审批流的公告实例详情。
- 需要基于通知模板变量进行实例填值，并支持主公告内容、抄送内容、附件、封面图片和预览。
- 需要走 `WorkFlowDetail` 发起审批发布或重新申请的通知公告发布场景。

## 4. 不适用场景

- 不要作为普通新增/编辑表单模板复用；它强绑定通知公告接口、模板变量模型、发文规则和发布状态。
- 不要用于通用富文本编辑场景；通用富文本优先看 `EditorVue`，通知模板/变量编辑需看通知模块内部的 `TemplateEditor`。
- 不要用于普通附件上传；附件场景优先使用 `File`。
- 不要在普通 CRUD 页面中直接嵌入这个页面级组件，除非目标页面就是通知公告实例表单。

## 5. 常用 Props

自动识别到的 props：

- `editId`

补充说明：

- `editId: String`：公告实例 id。传入时组件进入编辑/详情数据加载流程；如果没有传入，会继续从 `$route.query.editId` 读取。配合 `$route.query.noticeMode` 为 `edit` 或 `view` 时，组件可区分编辑和只读查看。

## 6. 常用事件

- `cancel`：当父组件监听了 `cancel` 事件时，点击取消/返回后会向外抛出；否则组件默认跳转回 `/notice/config`。

## 7. 常用插槽

无对外插槽。页面内部组合 `File`、`searchPersonnel`、`TemplateEditor`、`RichTextPreview`、`PublishRuleAddNew`、`WorkFlowDetail` 等子组件。

## 8. 典型用法

路由页接入示例：

```js
{
  path: '/notice/manage/form',
  name: 'noticeManageForm',
  component: resolve => {
    return require(['@/module/main/home/module/notice/module/noticeManage/addNew.vue'], resolve)
  }
}
```

列表页打开新增：

```js
window.open(this.buildNoticeFormPageUrl({
  noticeMode: 'add',
  sceneId: scene.sceneId,
  orgId: scene.orgId || '',
  categoryId: nav.categoryId
}), '_blank')
```

列表页打开编辑：

```js
window.open(this.buildNoticeFormPageUrl({
  noticeMode: 'edit',
  editId: String(row.id)
}), '_blank')
```

列表页打开只读查看：

```js
window.open(this.buildNoticeFormPageUrl({
  noticeMode: 'view',
  editId: String(row.id)
}), '_blank')
```

来源参考：

- `bigboss-base/src/components/notice/module/noticeManage/index.vue`
- `bigboss-wedo/src/module/main/home/menu.home.js`
- `bigboss-wedo/src/module/main/home/module/notice/module/noticeManage/index.vue`

## 9. 生成页面时的注意事项

- 生成通知公告管理功能时，列表页优先使用 `NoticeConfig` 或通知模块现有 `noticeManage/index.vue` 模式；表单页才考虑 `NoticeAddNew`。
- 进入新增、编辑、查看应优先通过 `/notice/manage/form` 路由和 query 参数控制，不建议在普通页面局部直接嵌入。
- `noticeMode=view` 时组件会只读展示，并隐藏保存、审批发布、重新申请等编辑动作。
- 该组件内部依赖通知模板、发文规则、预览、附件上传和审批流接口；迁移到非通知模块前必须确认这些接口和路由上下文存在。
- 若只是需要人员选择、附件上传、审批流、富文本等单项能力，应使用对应基础组件，而不是复用整个 `NoticeAddNew` 页面。

## 10. 人工修订记录

- 2026-05-29：Codex 根据 `bigboss-base/src/components/notice/module/noticeManage/addNew.vue`、通知管理列表页和 `bigboss-wedo` 通知路由补充初稿，待人工确认。

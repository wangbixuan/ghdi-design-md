# EditorVue

> 说明：这是 Codex 根据源码和引用扫描批量补充后的组件说明 card，待人工审阅。

## 1. 索引元信息

| 字段 | 值 |
|---|---|
| 组件名 | `EditorVue` |
| 暴露来源 | `expose.js` |
| importPath | `./form/EditorVue.vue` |
| 源码路径 | `bigboss-base/src/components/form/EditorVue.vue` |
| 说明状态 | `human-reviewed` |
| 推荐状态 | `preferred` |
| 引用样例数量 | `8` |

## 2. 组件定位

富文本编辑器组件，通过 content 传入内容并通过事件回传编辑结果。

源码位于 `bigboss-base/src/components/form/EditorVue.vue`。扫描到 8 个直接或间接引用样例。

## 3. 适用场景

- 适合公告、说明、反馈、工单描述等富文本字段。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

## 4. 不适用场景

- 普通短文本用 el-input。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

## 5. 常用 Props

- `content`：源码中识别到的入参，使用前应结合业务含义传值。
- `type`：源码中识别到的入参，使用前应结合业务含义传值。
- `placeholder`：源码中识别到的入参，使用前应结合业务含义传值。
- `readOnlys`：源码中识别到的入参，使用前应结合业务含义传值。

## 6. 常用事件

- `changeData`：组件会向父级抛出的事件。

## 7. 常用插槽

- 暂无外部业务插槽。

## 8. 典型用法

```vue
<EditorVue
  :content="content"
  :type="type"
  @changeData="handleChangeData"
/>
```

真实引用样例文件：
- `bigboss-base/src/components/baseTable/module/Drawer/businessBtn.vue`
- `bigboss-base/src/components/baseTableV2/module/drawer/businessBtn.vue`
- `bigboss-base/src/components/form/doc.vue`
- `bigboss-base/src/components/notice/module/conponents/RichTextEditor.vue`

## 9. 生成页面时的注意事项

- 只有当需求与“适合公告、说明、反馈、工单描述等富文本字段”明确匹配时，才优先使用该组件。
- 普通短文本用 el-input。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## 10. 人工修订记录

- 2026-05-27：人工确认该组件已过审，可以正式使用。
- 2026-05-27：Codex 批量读取源码、props、事件和引用样例后补充，待人工评审。

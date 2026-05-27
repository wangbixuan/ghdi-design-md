# Tags

> 说明：这是 Codex 根据源码和引用扫描批量补充后的组件说明 card，待人工审阅。

## 1. 索引元信息

| 字段 | 值 |
|---|---|
| 组件名 | `Tags` |
| 暴露来源 | `expose.js` |
| importPath | `./form/Tags.vue` |
| 源码路径 | `bigboss-base/src/components/form/Tags.vue` |
| 说明状态 | `human-reviewed` |
| 推荐状态 | `allowed` |
| 引用样例数量 | `7` |

## 2. 组件定位

标签展示/编辑组件，通过 tagList 传入标签列表。

源码位于 `bigboss-base/src/components/form/Tags.vue`。扫描到 7 个直接或间接引用样例。

## 3. 适用场景

- 适合标签字段、分类标签。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

## 4. 不适用场景

- 普通状态展示可用 UTag。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

## 5. 常用 Props

- `tagList`：源码中识别到的入参，使用前应结合业务含义传值。
- `type`：源码中识别到的入参，使用前应结合业务含义传值。
- `color`：源码中识别到的入参，使用前应结合业务含义传值。

## 6. 常用事件

- `tagsData`：组件会向父级抛出的事件。

## 7. 常用插槽

- 暂无外部业务插槽。

## 8. 典型用法

```vue
<Tags
  :tagList="tagList"
  :type="type"
  :color="color"
  @tagsData="handleTagsData"
/>
```

真实引用样例文件：
- `bigboss-base/src/common/pageHandler.js`
- `bigboss-base/src/components/notice/module/conponents/editor/template-variable/helpers.js`
- `bigboss-base/src/module/admin/BizManage/Page/index.vue`
- `bigboss-base/src/module/admin/BizSet/components/detail.vue`

## 9. 生成页面时的注意事项

- 只有当需求与“适合标签字段、分类标签”明确匹配时，才优先使用该组件。
- 普通状态展示可用 UTag。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## 10. 人工修订记录

- 2026-05-27：人工确认该组件已过审，可以正式使用。
- 2026-05-27：Codex 批量读取源码、props、事件和引用样例后补充，待人工评审。

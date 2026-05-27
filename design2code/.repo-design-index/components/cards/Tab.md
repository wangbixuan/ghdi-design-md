# Tab

> 说明：这是 Codex 根据源码和引用扫描批量补充后的组件说明 card，待人工审阅。

## 1. 索引元信息

| 字段 | 值 |
|---|---|
| 组件名 | `Tab` |
| 暴露来源 | `expose.js` |
| importPath | `./form/Tabs.vue` |
| 源码路径 | `bigboss-base/src/components/form/Tabs.vue` |
| 说明状态 | `human-reviewed` |
| 推荐状态 | `allowed` |
| 引用样例数量 | `8` |

## 2. 组件定位

表单区域 tabs 组件，使用 tabs 配置。

源码位于 `bigboss-base/src/components/form/Tabs.vue`。扫描到 8 个直接或间接引用样例。

## 3. 适用场景

- 适合表单内简单标签页。
- 与组件命名、源码路径和现有引用样例一致的业务场景。
- 需要保持 GHDI / bigboss-base 现有页面风格和交互习惯的场景。

## 4. 不适用场景

- 页面级导航要结合页面布局判断。
- 需求只是普通 Element UI 基础控件即可完成时，不要强行引入该组件。
- 缺少业务上下文、props 含义不明确时，应先查源码或让人工确认。

## 5. 常用 Props

- `tabs`：源码中识别到的入参，使用前应结合业务含义传值。
- `type`：源码中识别到的入参，使用前应结合业务含义传值。

## 6. 常用事件

- `changeTab`：组件会向父级抛出的事件。

## 7. 常用插槽

- 暂无外部业务插槽。

## 8. 典型用法

```vue
<Tab
  :tabs="tabs"
  :type="type"
  @changeTab="handleChangeTab"
/>
```

真实引用样例文件：
- `bigboss-base/src/App.vue`
- `bigboss-base/src/common/pageHandler.js`
- `bigboss-base/src/components/app/app.vue`
- `bigboss-base/src/components/baseTable/api.js`
- `bigboss-base/src/components/baseTable/module/Drawer/businessBtn.vue`

## 9. 生成页面时的注意事项

- 只有当需求与“适合表单内简单标签页”明确匹配时，才优先使用该组件。
- 页面级导航要结合页面布局判断。
- 组件名、props 和事件应保持源码写法，不要在生成代码时擅自改名。

## 10. 人工修订记录

- 2026-05-27：人工确认该组件已过审，可以正式使用。
- 2026-05-27：Codex 批量读取源码、props、事件和引用样例后补充，待人工评审。

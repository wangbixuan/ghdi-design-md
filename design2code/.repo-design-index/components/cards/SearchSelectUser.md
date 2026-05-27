# SearchSelectUser

> 说明：这是 Codex 根据源码和真实引用样例补充后的组件说明 card，待人工审阅。

## 1. 索引元信息

| 字段 | 值 |
|---|---|
| 组件名 | `SearchSelectUser` |
| 暴露来源 | `expose.js` |
| importPath | `@/components/form/SearchSelectUser` |
| 源码路径 | `bigboss-base/src/components/form/SearchSelectUser.vue` |
| 初步分类 | `form-control` |
| 说明状态 | `human-reviewed` |
| 推荐状态 | `preferred` |

## 2. 组件定位

`SearchSelectUser` 是系统远程人员选择组件，基于 `el-select` 远程搜索人员，支持单选、多选、最近使用人员、按部门导入人员。选择后不会只返回 username，而是通过 `selectPersonnel` 事件返回人员对象或人员对象数组。

它适合“负责人、管理员、查阅人员、执行人员、交接人、代提单人”等需要从组织人员库中选择用户的字段。

## 3. 适用场景

- 表单中选择单个人员，例如交接人、提单人、负责人。
- 表单中选择多个人员，例如管理员、查阅人员、执行人员。
- 需要按姓名或登录名远程搜索人员。
- 需要限制根部门范围时，通过 `rootDepartIds` 传参。
- 需要一键导入某部门人员时，开启 `importDept`。

## 4. 不适用场景

- 只需要展示人员姓名，不需要搜索选择时，直接展示文本。
- 选择部门而非人员时，应使用部门选择组件，如 `newSelectDepart`、`selectDepart` 等。
- 需要复杂组织树、角色树、权限树选择时，这个组件不够。

## 5. 常用 Props

- `selectList: Array`：`v-model` 绑定值，组件内部作为已选人员列表。
- `multiple: Boolean`：是否多选，默认 `false`。
- `showRecent: Boolean`：是否显示最近使用人员，默认 `true`。
- `readonly: Boolean`：是否禁用选择。
- `clearBtn: Boolean`：是否显示“清空”按钮。
- `rootDepartIds: String`：限制搜索的根部门 ID。
- `importDept: Boolean`：是否显示部门选择和“导入该部门人员”按钮。
- `placeholder: String`：输入提示，默认 `请输入名字或登录名搜索`。
- `maxSelectCount: Number`：多选最大数量，不传则不限制。

## 6. 常用事件

- `selectPersonnel(userOrUsers)`：选择人员后触发。单选返回对象，多选返回数组。
- `clear`：清空选择后触发。
- `focus`：选择框聚焦时触发，会刷新最近使用人员。
- `input(selectList)`：作为 `v-model` 事件定义存在，但实际业务更常用 `selectPersonnel` 接收完整对象。

## 7. 常用插槽

暂无外部业务插槽。

## 8. 典型用法

单选交接人：

```vue
<SearchSelectUser
  @selectPersonnel="getTurnToUser"
  :multiple="false"
  ref="turnToUser"
  style="width: 100%"
/>
```

多选管理员：

```vue
<SearchSelectUser
  @selectPersonnel="getAdmins($event)"
  :multiple="true"
  :readonly="false"
  ref="admins"
  style="width: 100%;"
  placeholder="请选择管理员"
/>
```

代他人提单：

```vue
<SearchSelectUser
  @selectPersonnel="getReporterUser"
  v-show="isReporter === '2'"
  :multiple="false"
  ref="reporterUser"
  style="width: 250px;"
/>
```

## 9. 生成页面时的注意事项

- 页面需要拿到人员对象时，优先监听 `@selectPersonnel`，不要只依赖 `v-model`。
- 单选事件返回对象，多选事件返回数组，生成代码时要分别处理。
- 多选场景必须显式传 `:multiple="true"`。
- 如果字段是只读态，传 `:readonly="true"`，不要用外层 `v-if` 简单隐藏已选值。
- 组件会写入 `LocalSearchUserList` 作为最近使用人员，适合业务系统内复用，但不要在隐私敏感页面额外扩散这些数据。
- 如果需要部门选择，不要误用 `SearchSelectUser`。

## 10. 人工修订记录

- 2026-05-27：人工确认该组件已过审，可以正式使用。
- 2026-05-27：Codex 首次根据 `SearchSelectUser.vue` 和待办、工单、项目、会议等真实引用补充。

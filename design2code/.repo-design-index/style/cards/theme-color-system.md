# 主题色系统

## 1. 定位

GHDI 的主题色不是单个固定色，而是系统配置、菜单节点颜色、全局 CSS 变量和组件消费共同形成的运行时主题机制。

## 2. 来源

- `seed/theme-color-logic.md`
- `src/module/admin/System/index.vue`
- `src/module/admin/MenuManage/menuManage.vue`
- `src/components/bigboss-app/app-head-img/components/menu.vue`
- `src/App.vue`

## 3. 规则

主题链路：

```txt
系统默认主题色 / 菜单节点颜色
-> App 和顶部菜单写入 CSS 变量
-> --theme-color / --line-color
-> 共享组件和页面强调样式消费变量
```

优先级：

1. 当前激活菜单的 `item.color`
2. 本地缓存中的 `customizedColor`
3. 本地缓存中的 `systemColor`
4. 系统配置中的 `ext.systemColor`

## 4. 生成页面时的注意事项

- 主题强调色使用 `var(--theme-color)`。
- 标题竖线、强调线使用 `var(--line-color)`。
- 不要在页面中硬编码当前主题色。
- 不要用主题色替代 success / warning / danger 等语义状态色。
- 图片、SVG、内联固定色不会自动跟随主题，生成时要谨慎。

## 5. 人工修订记录

- 2026-05-27：由 `seed/theme-color-logic.md` 初始化。

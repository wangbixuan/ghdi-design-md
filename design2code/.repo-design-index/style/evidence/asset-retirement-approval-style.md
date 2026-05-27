# 资产处置审批详情页风格 Evidence

## 来源

页面：

```txt
bigboss-wedo/src/module/main/ema/assetMaintenance/retirement/table.vue
```

样式：

```txt
bigboss-wedo/src/css/applyTable.css
```

## 可沉淀风格点

- 白底文书式申请详情。
- 右侧固定状态块和锚点导航。
- `var(--theme-color)` 控制进行态、按钮和强调色。
- `var(--line-color)` 控制区块竖线和表格顶部强调线。
- 表格式表单使用 `#ccc` 边框和 `13px` 字号。
- 居中申请标题使用 `19px`、`600`。
- 区块标题使用 `16px`、`600`。

## 风格边界

这是审批文书类页面风格，不应作为普通列表页或配置页的默认风格。

普通 CRUD 页面仍应遵循：

- `baseTableV2`
- Element UI 浅边框表格
- 操作型列表布局

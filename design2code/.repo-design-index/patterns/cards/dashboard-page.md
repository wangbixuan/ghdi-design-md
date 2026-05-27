# dashboard-page

## 1. 定位

运营看板 / 统计概览页面，用于展示 KPI、趋势图、任务列表和业务概览。

## 2. 适用需求

- 首页工作台
- 数据概览
- 统计趋势
- 业务监控
- 快捷入口

## 3. 推荐结构

```txt
页面上下文
KPI / 指标卡
图表区
任务 / 待办列表
通知 / 快捷入口
```

## 4. 推荐组件

- `chartsLine`
- `chartsFunnel`
- `countTo`
- `UCard`（仅在目标模块已有卡片风格时）

## 5. 详细说明

详细 Design MD：`../dashboard-page.md`

## 6. 生成页面时的注意事项

- 只有真实概览 / 统计需求才使用 dashboard 模式。
- 不要把 CRUD 列表页包装成 dashboard。
- 卡片数量和图表层级应服务业务扫描。

## 7. 状态

`human-reviewed-seed`

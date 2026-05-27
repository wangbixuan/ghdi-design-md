# 旧页面模式来源映射

## 初始来源

| Seed 文件 | 详细 Design MD | Pattern Card | 说明 |
|---|---|---|---|
| `seed/page-designs/list.md` | `patterns/list-management-page.md` | `patterns/cards/list-management-page.md` | 表格优先列表 / CRUD |
| `seed/page-designs/config.md` | `patterns/config-management-page.md` | `patterns/cards/config-management-page.md` | 配置详情 / 富文本编辑 |
| `seed/page-designs/dashboard.md` | `patterns/dashboard-page.md` | `patterns/cards/dashboard-page.md` | 运营看板 / 统计概览 |
| `seed/page-designs/form.md` | `patterns/form-ledger-page.md` | `patterns/cards/form-ledger-page.md` | 审批台账式表单 |
| `seed/page-designs/controls.md` | `patterns/foundation-controls-page.md` | `patterns/cards/foundation-controls-page.md` | 控件状态参考 |
| `seed/page-designs/theme.md` | `patterns/theme-engine-page.md` | `patterns/cards/theme-engine-page.md` | 主题管理 / 预览 |
| `seed/page-designs/status.md` | `patterns/status-page.md` | `patterns/cards/status-page.md` | 404 / 空状态 |

## 使用方式

页面规划时：

1. 先读 `PATTERN_REGISTRY.json`。
2. 再读命中的 `patterns/cards/<pattern>.md`。
3. 如果要更多细节，再读对应详细 Design MD。

## 后续证据来源

后续真实页面扫描应补充：

- `bigboss-base/src/module/**/index.vue`
- 高频 `baseTableV2` 页面
- 通知 / 工单 / 流程 / 会议 / 项目等业务模块页面
- 人工确认过的 canonical pages

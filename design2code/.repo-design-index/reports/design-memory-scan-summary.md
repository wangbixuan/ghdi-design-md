# 设计记忆扫描摘要

## 2026-05-27 asset-retirement approval detail

扫描页面：

```txt
bigboss-wedo/src/module/main/ema/assetMaintenance/retirement/table.vue
```

识别结论：

- 该页面是典型审批流详情 / 申请单详情页面。
- 它应沉淀为新的候选页面模式：`approval-flow-detail-page`。
- 它同时补充一种特定视觉风格：`approval-document-visual-style`。
- 该风格是审批文书特例，不应扩散到普通 CRUD 列表页。

本次新增产物：

- `.repo-design-index/patterns/cards/approval-flow-detail-page.md`
- `.repo-design-index/patterns/approval-flow-detail-page.md`
- `.repo-design-index/patterns/evidence/asset-retirement-approval-page.md`
- `.repo-design-index/style/cards/approval-document-visual-style.md`
- `.repo-design-index/style/evidence/asset-retirement-approval-style.md`

后续 build 阶段建议：

- 将 `approval-flow-detail-page` 加入 `PATTERN_REGISTRY.json`。
- 将 `approval-document-visual-style` 加入 `STYLE_REGISTRY.json`。
- 在 `PAGE_PATTERNS.md` 中补充审批流详情页简版索引。

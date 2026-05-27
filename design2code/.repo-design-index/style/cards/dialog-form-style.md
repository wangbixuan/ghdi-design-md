# 弹窗和表单风格

## 1. 定位

弹窗、抽屉和表单是列表页中的辅助任务层。它们应该服务新增、编辑、详情、导入、预览、关联对象配置，而不是抢占主页面视觉中心。

## 2. 来源

- `seed/design.md`
- `seed/page-designs/config.md`
- `.repo-design-index/patterns/config-management-page.md`
- `.repo-design-index/patterns/list-management-page.md`

## 3. 规则

- Dialog 使用 Element UI 默认层级、圆角和阴影。
- 标题字号约 `18px`，内容字号 `14px`。
- 基础内边距约 `20px`。
- 密集配置可以使用两列表单。
- 富文本、附件、预览等属于业务增强区，不改变基础表单语义。

## 4. 生成页面时的注意事项

- 轻量新增 / 编辑优先弹窗或抽屉，不随意整页跳转。
- 大型文档编辑页可以使用整页布局，但要保持表单层级清楚。
- Dialog footer 按钮位置和主次关系要稳定。
- 删除、取消上传、覆盖规则等危险动作需要确认。

## 5. 人工修订记录

- 2026-05-27：由旧 config page 和控件基础规范初始化。

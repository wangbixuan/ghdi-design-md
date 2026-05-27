# 组件说明 Card 工作流

## 目标

`bigboss-base` 是团队已经沉淀下来的基础组件库。组件索引的目标不是重新评判这些组件能不能用，而是把组件说明整理成 LLM 和团队成员都能快速理解的知识库。

核心问题是：

```txt
这个组件是什么
什么时候用
怎么用
生成页面时如何避免误用
```

## 三层产物

```txt
1. 机器扫描事实
   .repo-design-index/components/generated/component-scan-summary.json

2. LLM 生成 + 人工修订的组件说明
   .repo-design-index/components/cards/<ComponentName>.md

3. 面向页面生成的正式索引
   .repo-design-index/components/COMPONENT_REGISTRY.json
   .repo-design-index/components/COMPONENT_CARDS.md
```

## 标准流程

1. 扫描本地组件代码库。

```bash
node .design-agent/scripts/scan-components.mjs
```

如果每个人本地路径不同，可以传入路径：

```bash
node .design-agent/scripts/scan-components.mjs "<你的 bigboss-base 路径>"
```

也可以更新：

```txt
.design-agent/config/project.config.json
```

2. 生成组件说明 card 草稿。

```bash
node .design-agent/scripts/generate-component-cards.mjs
```

3. 生成 card 列表。

```bash
node .design-agent/scripts/build-component-registry.mjs
```

4. Codex 根据源码和真实使用样例补充 card 内容。

5. 人工审阅 card，可以直接改 md，也可以通过 `ghdi-component-card-feedback` 用中文反馈让 Codex 修改。

6. 使用 `ghdi-component-registry-build` 从已修订 card 汇总正式索引。

## Card 编写原则

每个组件 card 应该用中文描述，代码标识保持原样。

必须包含：

- 组件定位
- 适用场景
- 不适用场景
- 常用 props
- 常用事件
- 常用插槽
- 典型用法
- 生成页面时的注意事项
- 人工修订记录

## 路径配置

基础组件代码库路径来自：

```txt
.design-agent/config/project.config.json
```

关键字段：

```json
{
  "componentCodebaseRoot": "<你的本地 bigboss-base 绝对路径>"
}
```

如果路径不存在，扫描 skill 应停止并请用户提供本地 `bigboss-base` 路径，不要猜测路径。

本机绝对路径只用于运行时读取源码。写入组件 card、evidence、registry、report 的路径必须使用逻辑仓库路径，例如：

```txt
bigboss-base/src/components/baseTableV2/index.vue
```

import fs from 'node:fs';
import path from 'node:path';

const scanPath = path.resolve('.repo-design-index/components/generated/component-scan-summary.json');
const cardsDir = path.resolve('.repo-design-index/components/cards');
const cardIndexPath = path.resolve('.repo-design-index/components/cards/README.md');

function readJson(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`缺少扫描结果：${file}。请先运行 scan-components.mjs。`);
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function categoryFromPath(componentPath = '') {
  if (componentPath.includes('/baseTableV2/') || componentPath.includes('/baseTable/')) return 'table-list-container';
  if (componentPath.includes('/upload') || componentPath.includes('/File') || componentPath.includes('/pdf')) return 'upload-preview';
  if (componentPath.includes('/form/')) return 'form-control';
  if (componentPath.includes('/flow') || componentPath.includes('/workFlow')) return 'workflow';
  if (componentPath.includes('/bigboss-app/')) return 'app-shell';
  if (componentPath.includes('/charts/')) return 'chart';
  if (componentPath.includes('/notice/')) return 'notice-business';
  return 'needs-description';
}

function safeName(name) {
  return name.replace(/[^A-Za-z0-9_-]/g, '-');
}

function suffixFromPath(componentPath = '') {
  const parts = componentPath
    .replace(/\\/g, '/')
    .replace(/\.(vue|js|ts)$/i, '')
    .split('/')
    .filter(Boolean)
    .slice(-2);
  return parts.join('-').replace(/[^A-Za-z0-9_-]/g, '-');
}

function cardFileMap(items) {
  const used = new Map();
  const result = new Map();
  for (const item of items) {
    const base = safeName(item.name);
    const key = base.toLowerCase();
    let fileBase = base;
    if (used.has(key)) {
      fileBase = `${base}-${suffixFromPath(item.path || item.importPath)}`;
    }
    used.set(key, true);
    result.set(item.name, `${fileBase}.md`);
  }
  return result;
}

function cardTemplate(item) {
  const category = categoryFromPath(item.path || '');
  const props = (item.props || []).map((prop) => `- \`${prop}\``).join('\n') || '- 暂无自动识别结果';
  return `# ${item.name}

> 说明：这是脚本初始化生成的组件说明 card 骨架。它还不是完成版组件索引，需要 Codex 继续阅读源码和真实引用样例后补充语义说明，再由人工审阅修订。

## 1. 索引元信息

| 字段 | 值 |
|---|---|
| 组件名 | \`${item.name}\` |
| 暴露来源 | \`${item.source}\` |
| importPath | \`${item.importPath}\` |
| 源码路径 | \`${item.path || '未解析'}\` |
| 初步分类 | \`${category}\` |
| 说明状态 | \`initialized\` |

## 2. 组件定位

待 Codex 根据源码和使用样例补充：这个组件解决什么问题，属于哪类业务或基础能力。

## 3. 适用场景

待补充。

## 4. 不适用场景

待补充。

## 5. 常用 Props

自动识别到的 props：

${props}

请由 Codex / 人工补充每个 prop 的含义、类型和使用注意事项。

## 6. 常用事件

待补充。

## 7. 常用插槽

待补充。

## 8. 典型用法

待补充。建议由 Codex 从真实引用页面中摘取最小可读片段。

## 9. 生成页面时的注意事项

待补充。重点说明 Codex 生成页面时应该如何使用、哪些误用要避免。

## 10. 人工修订记录

- 暂无。
`;
}

const scan = readJson(scanPath);
fs.mkdirSync(cardsDir, { recursive: true });
const fileMap = cardFileMap(scan.exposedComponents);

for (const item of scan.exposedComponents) {
  const file = path.join(cardsDir, fileMap.get(item.name));
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, cardTemplate(item), 'utf8');
  }
}

const rows = scan.exposedComponents.map((item) => {
  const category = categoryFromPath(item.path || '');
  return `| \`${item.name}\` | \`${item.path || '未解析'}\` | \`${category}\` | [${item.name}](./${fileMap.get(item.name)}) |`;
});

const index = `# 组件说明 Cards

> 这里存放脚本初始化、Codex 补全、人工修订后的组件说明。页面生成时，Codex 应先读 \`COMPONENT_REGISTRY.json\` 定位组件，再按需读取具体 card。

## 组件列表

| 组件 | 源码路径 | 初步分类 | Card |
|---|---|---|---|
${rows.join('\n')}
`;

fs.writeFileSync(cardIndexPath, index, 'utf8');
console.log(`Wrote ${cardsDir}`);

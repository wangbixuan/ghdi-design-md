import fs from 'node:fs';
import path from 'node:path';

const scanPath = path.resolve('.repo-design-index/components/generated/component-scan-summary.json');
const registryPath = path.resolve('.repo-design-index/components/COMPONENT_REGISTRY.json');
const outputPath = path.resolve('.repo-design-index/reports/components/README.md');
const componentsReportDir = path.resolve('.repo-design-index/reports/components');

function readJson(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
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
  return 'needs-classification';
}

function suggestedStatus(name, componentPath = '') {
  const preferred = new Set([
    'baseTableV2',
    'File',
    'EditorVue',
    'SearchSelectUser',
    'newSelectDepart'
  ]);
  const legacy = new Set(['TableBase', 'selectDepart']);
  const specialized = new Set(['WorkFlowDetail', 'workFlow', 'Flowchart', 'mindMap', 'HrProfile']);
  if (preferred.has(name)) return 'preferred';
  if (legacy.has(name)) return 'legacy';
  if (specialized.has(name)) return 'specialized';
  if (componentPath.includes('/module/admin/') || componentPath.includes('/module/order/')) return 'specialized';
  return 'needs-human-review';
}

const scan = readJson(scanPath);
const registry = readJson(registryPath);
const registered = new Map(registry.components.map((item) => [item.name, item]));

const rows = scan.exposedComponents.map((item) => {
  const current = registered.get(item.name);
  const category = current?.category || categoryFromPath(item.path);
  const status = current?.status || suggestedStatus(item.name, item.path);
  return {
    name: item.name,
    path: item.path || '(unresolved)',
    category,
    status,
    registry: current ? 'registered' : 'candidate',
    props: item.props || []
  };
});

const groups = rows.reduce((acc, row) => {
  const key = row.registry;
  acc[key] ||= [];
  acc[key].push(row);
  return acc;
}, {});

function table(items) {
  return [
    '| 组件 | 路径 | 分类 | 建议状态 | props 样例 |',
    '|---|---|---|---|---|',
    ...items.map((item) => `| \`${item.name}\` | \`${item.path}\` | \`${item.category}\` | \`${item.status}\` | ${item.props.map((prop) => `\`${prop}\``).join(', ')} |`)
  ].join('\n');
}

function slugify(name) {
  return name.replace(/[^A-Za-z0-9_-]/g, '-');
}

function componentReport(item) {
  return `# 组件评审：${item.name}

> 说明：这是单组件评审文件，不是正式组件索引。人工反馈和 Codex 结论确认后，再提升到 \`COMPONENT_REGISTRY.json\` 和 \`COMPONENT_CARDS.md\`。

## 1. 扫描事实

| 字段 | 值 |
|---|---|
| 组件名 | \`${item.name}\` |
| 路径 | \`${item.path}\` |
| 当前状态 | \`${item.registry}\` |
| 初步分类 | \`${item.category}\` |
| 建议状态 | \`${item.status}\` |
| props 样例 | ${item.props.map((prop) => `\`${prop}\``).join(', ') || '-'} |

## 2. Codex 初步判断

- 是否建议进入正式索引：待评审
- 建议原因：待补充
- 不建议原因：待补充
- 适用页面类型：待补充
- 不适用场景：待补充

## 3. 人工反馈

请直接用自然语言写在这里，中文即可，不需要使用固定术语。

示例：

\`\`\`txt
这个组件只适合流程配置，不要推荐给普通列表页。
这个组件可以进入索引，但状态不要是 preferred。
这个组件是内部子组件，不要让 Codex 生成页面时直接使用。
\`\`\`

## 4. 建议提升结果

- registry 状态：待定
- registry 分类：待定
- 是否写入 \`COMPONENT_REGISTRY.json\`：待定
- 是否写入 \`COMPONENT_CARDS.md\`：待定

## 5. 需要人工确认的问题

- 待补充
`;
}

fs.mkdirSync(componentsReportDir, { recursive: true });

for (const item of rows) {
  const filename = `${slugify(item.name)}.md`;
  fs.writeFileSync(path.join(componentsReportDir, filename), componentReport(item), 'utf8');
}

const markdown = `# 组件索引候选评审总览

> 来源：\`.repo-design-index/components/generated/component-scan-summary.json\`  
> 说明：这是给人工评审和 Codex 语义审核使用的候选总览，不是正式组件索引。单组件评审文件位于同目录下。

## 1. 扫描摘要

\`\`\`txt
扫描文件数: ${scan.totals.files}
Vue 文件数: ${scan.totals.vueFiles}
expose 导出组件数: ${scan.totals.exposedComponents}
已进入正式索引: ${groups.registered?.length || 0}
待评审候选组件: ${groups.candidate?.length || 0}
\`\`\`

## 2. 已在正式索引中的组件

${table(groups.registered || [])}

## 3. 待评审候选组件

${table(groups.candidate || [])}

## 4. 提升到正式索引的规则

只有当候选组件对后续页面生成有明确复用价值时，才建议提升到 \`COMPONENT_REGISTRY.json\`。

提升前必须补全以下字段：

- stable path
- status: \`preferred\`, \`allowed\`, \`legacy\`, \`specialized\`, or \`avoid\`
- category
- purpose
- key props/events
- keywords
- examples
- generation notes

任何 \`preferred\` 或 \`avoid\` 决策都必须经过人工确认。

## 5. 给 Codex 的批量评审建议

建议按类别分批处理，而不是一次性处理所有组件：

- \`table-list-container\`
- \`upload-preview\`
- \`form-control\`
- \`workflow\`
- \`notice-business\`
- \`app-shell\`
- \`chart\`
- \`needs-classification\`

每一批输出中文评审结论，并明确哪些可以进入正式索引，哪些需要继续人工确认。
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, markdown, 'utf8');
console.log(`Wrote ${outputPath}`);

import fs from 'node:fs';
import path from 'node:path';

const cardsDir = path.resolve('.repo-design-index/components/cards');
const listOutPath = path.resolve('.repo-design-index/components/generated/component-card-list.json');
const registryOutPath = path.resolve('.repo-design-index/components/COMPONENT_REGISTRY.json');
const cardsOutPath = path.resolve('.repo-design-index/components/COMPONENT_CARDS.md');
const logPath = path.resolve('.repo-design-index/components/component-registry-build-log.md');

if (!fs.existsSync(cardsDir)) {
  throw new Error(`缺少组件 cards 目录：${cardsDir}`);
}

function extract(content, pattern, fallback = '') {
  return content.match(pattern)?.[1]?.trim() || fallback;
}

function extractSection(content, title) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const normalized = content.replace(/\r\n/g, '\n');
  const match = normalized.match(new RegExp(`##\\s+\\d+\\.\\s+${escaped}\\n+([\\s\\S]*?)(?=\\n##\\s+\\d+\\.|$)`));
  return match?.[1]?.trim() || '';
}

function listItems(section) {
  return section
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.replace(/^- /, '').trim());
}

function listCodeNames(section) {
  return section
    .split('\n')
    .map((line) => line.trim().match(/^- `([^`]+)`/)?.[1])
    .map((name) => name?.split(':')[0]?.trim())
    .filter(Boolean)
    .filter((name) => !name.includes('/') && !name.includes(' '));
}

function plainText(markdown = '') {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^[-#>]+\s*/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function inferCategory(sourcePath, name) {
  if (/baseTable/i.test(sourcePath) || /Table/.test(name)) return 'table-list-container';
  if (/upload|File|Pdf|Word/i.test(sourcePath + name)) return 'upload-preview';
  if (/SearchSelectUser|select.*User|Personnel/i.test(name)) return 'person-selector';
  if (/Depart/i.test(name + sourcePath)) return 'department-selector';
  if (/Editor|Html/i.test(name)) return 'rich-text';
  if (/chart/i.test(name + sourcePath)) return 'chart';
  if (/flow|workflow/i.test(name + sourcePath)) return 'workflow';
  if (/notice/i.test(name + sourcePath)) return 'notice';
  if (/Manage|Page|Detail|Config|Description/i.test(name)) return 'page-module';
  return 'general';
}

function inferRegistryStatus(name, recommendStatus, cardStatus, notes) {
  if (recommendStatus === 'deprecated-for-new-pages') return 'legacy';
  if (recommendStatus === 'internal') return 'internal';
  if (recommendStatus === 'preferred') return 'preferred';
  if (/内部模块|不要.*直接|不建议.*直接|页面级|模块级/.test(notes)) return 'specialized';
  if (['baseTableV2', 'File', 'SearchSelectUser', 'EditorVue', 'newSelectDepart'].includes(name)) return 'preferred';
  if (cardStatus === 'human-reviewed') return 'allowed';
  return 'allowed';
}

function keywordsFor(name, category, purpose, applicable) {
  const text = `${name} ${category} ${purpose} ${applicable}`;
  const pairs = [
    ['table-list-container', ['表格', '列表', '查询', '分页', '管理页']],
    ['upload-preview', ['附件', '上传', '文件', '预览']],
    ['person-selector', ['人员', '用户', '选人']],
    ['department-selector', ['部门', '组织']],
    ['rich-text', ['富文本', '编辑器', '正文']],
    ['chart', ['图表', '看板', '统计']],
    ['workflow', ['流程', '审批', '工作流']],
    ['notice', ['通知', '公告', '订阅']]
  ];
  const base = pairs.find(([key]) => key === category)?.[1] || [];
  const extra = [];
  for (const word of ['PDF', 'Word', 'Excel', '标签', '季度', '轮播', '菜单', '会议', '用户管理']) {
    if (text.includes(word)) extra.push(word);
  }
  return [...new Set([name, ...base, ...extra])];
}

function examplesFrom(section) {
  return [...section.matchAll(/`((?:[\w.-]+\/)?src\/[^`]+)`/g)].map((match) => match[1]).slice(0, 6);
}

const cardFiles = fs.readdirSync(cardsDir)
  .filter((file) => file.endsWith('.md') && file !== 'README.md')
  .sort((a, b) => a.localeCompare(b));

const components = cardFiles.map((file) => {
  const fullPath = path.join(cardsDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const name = extract(content, /^#\s+(.+)$/m, path.basename(file, '.md'));
  const sourcePath = extract(content, /\| 源码路径 \| `([^`]+)` \|/);
  const cardStatus = extract(content, /\| 说明状态 \| `([^`]+)` \|/, 'draft');
  const recommendStatus = extract(content, /\| 推荐状态 \| `([^`]+)` \|/, '');
  const replacement = extract(content, /\| 替代组件 \| `([^`]+)` \|/, '');
  const purpose = plainText(extractSection(content, '组件定位')).split('\n')[0] || '';
  const applicable = extractSection(content, '适用场景');
  const unsuitable = extractSection(content, '不适用场景');
  const propsSection = extractSection(content, '常用 Props');
  const eventsSection = extractSection(content, '常用事件');
  const usageSection = extractSection(content, '典型用法');
  const notesSection = extractSection(content, '生成页面时的注意事项');
  const category = inferCategory(sourcePath, name);
  const status = inferRegistryStatus(name, recommendStatus, cardStatus, notesSection);

  return {
    name,
    path: sourcePath,
    status,
    reviewStatus: cardStatus,
    recommendation: recommendStatus || (status === 'preferred' ? 'preferred' : 'allowed'),
    replacement: replacement || undefined,
    category,
    framework: 'Vue2',
    uiBase: 'Element UI',
    purpose,
    useWhen: listItems(applicable).slice(0, 5),
    doNotUseWhen: listItems(unsuitable).slice(0, 5),
    keyProps: listCodeNames(propsSection).slice(0, 12),
    keyEvents: listCodeNames(eventsSection).slice(0, 12),
    keywords: keywordsFor(name, category, purpose, applicable),
    examples: examplesFrom(usageSection),
    card: path.relative(process.cwd(), fullPath).replaceAll('\\', '/'),
    notes: plainText(notesSection).split('\n').slice(0, 6)
  };
});

const cardList = components.map((component) => ({
  name: component.name,
  cardPath: component.card,
  sourcePath: component.path,
  category: component.category,
  status: component.reviewStatus,
  recommendation: component.recommendation
}));

const registry = {
  schemaVersion: 2,
  generatedAt: new Date().toISOString(),
  source: 'components/cards/*.md',
  framework: 'Vue2',
  uiBase: 'Element UI',
  components,
  mappings: [
    {
      intent: 'data-table',
      keywords: ['表格', '列表', '数据列表', 'CRUD', '管理页'],
      recommendedComponent: 'baseTableV2',
      avoidComponents: ['TableBase']
    },
    {
      intent: 'file-upload',
      keywords: ['附件', '上传', '文件'],
      recommendedComponent: 'File'
    },
    {
      intent: 'pdf-upload',
      keywords: ['PDF 上传', '上传 PDF', 'pdf'],
      recommendedComponent: 'uploadPdfFile',
      fallbackComponent: 'File'
    },
    {
      intent: 'rich-text-editor',
      keywords: ['富文本', '公告正文', '内容编辑'],
      recommendedComponent: 'EditorVue'
    },
    {
      intent: 'user-selector',
      keywords: ['选人', '用户', '审批人', '负责人'],
      recommendedComponent: 'SearchSelectUser'
    },
    {
      intent: 'department-selector',
      keywords: ['部门', '组织'],
      recommendedComponent: 'newSelectDepart'
    }
  ]
};

function componentSummary(component) {
  const replacement = component.replacement ? `；替代组件：\`${component.replacement}\`` : '';
  const useWhen = component.useWhen.length
    ? component.useWhen.map((item) => `- ${item}`).join('\n')
    : '- 参见单组件 card。';
  const doNotUseWhen = component.doNotUseWhen.length
    ? component.doNotUseWhen.map((item) => `- ${item}`).join('\n')
    : '- 参见单组件 card。';
  return `## ${component.name}

Path: \`${component.path || '未解析'}\`

Status: \`${component.status}\`

Review: \`${component.reviewStatus}\`${replacement}

Card: [${component.name}](./cards/${path.basename(component.card)})

Use when:

${useWhen}

Do not use when:

${doNotUseWhen}

Generation notes:

${component.notes.length ? component.notes.map((item) => `- ${item}`).join('\n') : '- 参见单组件 card。'}
`;
}

const cardsMd = `# Component Cards

> 本文件由 \`.design-agent/scripts/build-component-registry.mjs\` 根据 \`.repo-design-index/components/cards/*.md\` 生成。单组件详细说明以对应 card 为准。

## 总览

- 组件数：${components.length}
- \`preferred\`：${components.filter((item) => item.status === 'preferred').length}
- \`allowed\`：${components.filter((item) => item.status === 'allowed').length}
- \`specialized\`：${components.filter((item) => item.status === 'specialized').length}
- \`legacy\`：${components.filter((item) => item.status === 'legacy').length}
- \`internal\`：${components.filter((item) => item.status === 'internal').length}

${components.map(componentSummary).join('\n')}
`;

fs.mkdirSync(path.dirname(listOutPath), { recursive: true });
fs.writeFileSync(listOutPath, `${JSON.stringify({ cards: cardList }, null, 2)}\n`, 'utf8');
fs.writeFileSync(registryOutPath, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');
fs.writeFileSync(cardsOutPath, cardsMd, 'utf8');

const logEntry = `## ${new Date().toISOString()} registry build

- cards: ${components.length}
- preferred: ${components.filter((item) => item.status === 'preferred').length}
- allowed: ${components.filter((item) => item.status === 'allowed').length}
- specialized: ${components.filter((item) => item.status === 'specialized').length}
- legacy: ${components.filter((item) => item.status === 'legacy').length}
- internal: ${components.filter((item) => item.status === 'internal').length}
- outputs:
  - \`.repo-design-index/components/COMPONENT_REGISTRY.json\`
  - \`.repo-design-index/components/COMPONENT_CARDS.md\`
  - \`.repo-design-index/components/generated/component-card-list.json\`

`;

const existingLog = fs.existsSync(logPath) ? fs.readFileSync(logPath, 'utf8') : '# 组件索引构建日志\n\n';
fs.writeFileSync(logPath, `${existingLog.trimEnd()}\n\n${logEntry}`, 'utf8');

console.log(`Wrote ${registryOutPath}`);
console.log(`Wrote ${cardsOutPath}`);
console.log(`Wrote ${listOutPath}`);

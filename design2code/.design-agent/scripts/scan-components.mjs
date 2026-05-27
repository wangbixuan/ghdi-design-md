import fs from 'node:fs';
import path from 'node:path';

const configPath = path.resolve('.design-agent/config/project.config.json');

function readJson(file) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
}

const config = readJson(configPath);
const configuredRoot = config.componentCodebaseRoot;
const root = process.argv[2] || configuredRoot;
const repoName = root ? path.basename(path.resolve(root)) : 'bigboss-base';

if (!root) {
  throw new Error(
    '未配置基础组件代码库路径。请在 .design-agent/config/project.config.json 中设置 componentCodebaseRoot，或运行脚本时传入路径。'
  );
}

if (!fs.existsSync(root)) {
  throw new Error(
    `基础组件代码库路径不存在：${root}\n请更新 .design-agent/config/project.config.json 的 componentCodebaseRoot，或运行：node .design-agent/scripts/scan-components.mjs "<你的 bigboss-base 路径>"`
  );
}

const componentRoot = path.join(root, 'src/components');
const exposePath = path.join(componentRoot, 'expose.js');
const outDir = path.resolve('.repo-design-index/components/generated');

function logicalPath(file) {
  return path.join(repoName, path.relative(root, file)).replaceAll('\\', '/');
}

if (!fs.existsSync(componentRoot)) {
  throw new Error(`未找到组件目录：${componentRoot}`);
}

if (!fs.existsSync(exposePath)) {
  throw new Error(`未找到组件导出文件：${exposePath}`);
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    if (entry.isFile()) files.push(full);
  }
  return files;
}

function parseExpose(source) {
  const items = [];
  const withoutLineComments = source
    .split(/\r?\n/)
    .filter((line) => !line.trimStart().startsWith('//'))
    .join('\n');
  const re = /export\s+\{\s+default\s+as\s+(\w+)\s+\}\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = re.exec(withoutLineComments))) {
    items.push({
      name: match[1],
      importPath: match[2],
      source: 'expose.js'
    });
  }
  return items;
}

function countByTopLevel(files) {
  const counts = new Map();
  for (const file of files) {
    const rel = path.relative(componentRoot, file).replaceAll('\\', '/');
    const top = rel.includes('/') ? rel.split('/')[0] : '(root)';
    counts.set(top, (counts.get(top) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, fileCount: count }))
    .sort((a, b) => b.fileCount - a.fileCount || a.name.localeCompare(b.name));
}

function extractPropNames(file) {
  const source = read(file);
  if (!source) return [];
  const propsBlock = source.match(/props\s*:\s*\{([\s\S]*?)\n\s*\}/);
  if (!propsBlock) return [];
  const names = [];
  const propRe = /^\s{4,}([A-Za-z_$][\w$-]*)\s*:/gm;
  let match;
  while ((match = propRe.exec(propsBlock[1]))) names.push(match[1]);
  const configKeys = new Set(['type', 'default', 'required', 'validator']);
  return [...new Set(names)].filter((name) => !configKeys.has(name)).slice(0, 30);
}

function resolveComponentPath(item) {
  let importPath = item.importPath.replace(/^@\//, 'src/');
  if (importPath.startsWith('./')) importPath = `src/components/${importPath.slice(2)}`;
  if (importPath.startsWith('../')) importPath = `src/components/${importPath}`;
  const candidates = [
    path.join(root, importPath),
    path.join(root, `${importPath}.vue`),
    path.join(root, `${importPath}.js`),
    path.join(root, importPath, 'index.vue'),
    path.join(root, importPath, 'index.js')
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

fs.mkdirSync(outDir, { recursive: true });

const allFiles = walk(componentRoot);
const vueFiles = allFiles.filter((file) => file.endsWith('.vue'));
const exposed = parseExpose(read(exposePath)).map((item) => {
  const resolved = resolveComponentPath(item);
  return {
    ...item,
    path: resolved ? logicalPath(resolved) : null,
    status: 'needs-review',
    props: resolved ? extractPropNames(resolved) : []
  };
});

const summary = {
  scannedAt: new Date().toISOString(),
  root: repoName,
  componentRoot: `${repoName}/src/components`,
  totals: {
    files: allFiles.length,
    vueFiles: vueFiles.length,
    exposedComponents: exposed.length
  },
  topLevelDirectories: countByTopLevel(allFiles),
  exposedComponents: exposed
};

fs.writeFileSync(
  path.join(outDir, 'component-scan-summary.json'),
  `${JSON.stringify(summary, null, 2)}\n`,
  'utf8'
);

console.log(`Wrote ${path.join(outDir, 'component-scan-summary.json')}`);

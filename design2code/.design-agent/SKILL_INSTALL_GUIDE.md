# Codex Skill 安装指引

这份文档用于帮助团队成员把本项目的 harness skills 安装到自己的 Codex 环境中。

## 适用对象

适用于已经拿到本项目代码的同事。项目里已经包含完整的 skill 源文件：

```txt
.design-agent/skills/
├── 00-component-scan/
├── 01-component-card-feedback/
├── 02-component-registry-build/
├── 03-design-memory-scan/
├── 04-design-memory-feedback/
├── 05-design-memory-build/
├── 10-page-intent-to-ir/
├── 11-page-plan/
├── 12-page-generate/
├── 13-page-score/
└── 14-guideline-update/
```

## 安装目标目录

Codex 默认从个人 `CODEX_HOME` 下的 skills 目录读取自定义 skill。如果没有显式设置 `CODEX_HOME`，安装脚本会使用当前用户主目录下的 `.codex/skills`。

如果设置了 `CODEX_HOME`，安装目标是：

```txt
%CODEX_HOME%\skills
```

## 推荐安装方式

在项目根目录打开 PowerShell，执行：

```powershell
$sourceRoot = Resolve-Path -LiteralPath ".design-agent/skills"
$targetRoot = if ($env:CODEX_HOME) {
  Join-Path $env:CODEX_HOME "skills"
} else {
  Join-Path $HOME ".codex\skills"
}

New-Item -ItemType Directory -Force -Path $targetRoot | Out-Null

Get-ChildItem -LiteralPath $sourceRoot -Directory | ForEach-Object {
  $destination = Join-Path $targetRoot $_.Name
  if (Test-Path -LiteralPath $destination) {
    Remove-Item -LiteralPath $destination -Recurse -Force
  }
  Copy-Item -LiteralPath $_.FullName -Destination $destination -Recurse
  Write-Output "installed $destination"
}
```

这会把 `.design-agent/skills/` 下的全部 skill 复制到当前用户的 Codex skills 目录。

## 安装后验证

执行：

```powershell
$targetRoot = if ($env:CODEX_HOME) {
  Join-Path $env:CODEX_HOME "skills"
} else {
  Join-Path $HOME ".codex\skills"
}

Get-ChildItem -LiteralPath $targetRoot -Directory |
  Where-Object { $_.Name -match "component|page|guideline" } |
  Select-Object -ExpandProperty Name |
  Sort-Object
```

应该能看到：

```txt
00-component-scan
01-component-card-feedback
02-component-registry-build
03-design-memory-scan
04-design-memory-feedback
05-design-memory-build
10-page-intent-to-ir
11-page-plan
12-page-generate
13-page-score
14-guideline-update
```

如果当前 Codex 会话里还看不到新 skill，请新开一个 Codex 会话，或重启 Codex 后再试。

## 配置本地组件代码库路径

每个人本地的 `bigboss-base` 路径可能不一样，所以安装 skill 后还需要确认项目配置。

打开：

```txt
.design-agent/config/project.config.json
```

修改：

```json
{
  "componentCodebaseRoot": "<你的本地 bigboss-base 绝对路径>",
  "componentRoot": "<你的本地 bigboss-base 绝对路径>/src/components"
}
```

这里的本机绝对路径只用于 Codex 运行时读取源码，不应该写入 `.repo-design-index` 的 card、evidence、registry 或 report。沉淀产物里的路径统一写成 `bigboss-base/src/...`、`bigboss-wedo/src/...` 这样的逻辑仓库路径。

如果路径没有配置，或者路径不存在，`ghdi-component-scan` 会停止扫描，并要求你提供本机的 `bigboss-base` 路径。

也可以临时在命令里显式传入路径：

```powershell
node .design-agent/scripts/scan-components.mjs "<你的本地 bigboss-base 绝对路径>"
```

## 安装后如何使用

可以在 Codex 里直接这样说：

```txt
用 ghdi-component-scan 扫描组件并生成组件说明卡片
```

完成后组件卡片会生成在：

```txt
.repo-design-index/components/cards/
```

刚生成的卡片只是 `initialized` 状态的骨架。如果希望得到真正可用的组件说明，需要继续要求 Codex 按批次补全，例如：

```txt
用 ghdi-component-scan 补全 uploadPdfFile、File、baseTableV2 这三个组件卡片，阅读源码和真实引用样例后把状态改成 codex-drafted。
```

人工看完某个组件卡片后，可以继续说：

```txt
用 ghdi-component-card-feedback 修改 uploadPdfFile 的组件卡片：
这个组件只用于 PDF 上传，不要作为普通附件上传组件推荐。
```

一批组件卡片修订完成后，可以说：

```txt
用 ghdi-component-registry-build 从组件卡片构建正式组件索引
```

页面生成链路可以按下面顺序使用：

```txt
ghdi-design-memory-scan
ghdi-design-memory-feedback
ghdi-design-memory-build
ghdi-intent-to-ir
ghdi-plan-page
ghdi-generate-page
ghdi-score-page
ghdi-update-guidelines
```

## 常见问题

### 1. Codex 里看不到新 skill

先确认 skill 已经复制到个人 Codex skills 目录。如果文件存在但 Codex 仍看不到，通常需要新开一个 Codex 会话，或重启 Codex。

### 2. 扫描组件时报路径不存在

检查 `.design-agent/config/project.config.json` 里的 `componentCodebaseRoot` 是否是你本机真实路径。

### 3. 是否需要把 `bigboss-base` 代码提交到当前项目

不需要。当前项目只沉淀组件说明、页面规则和生成记录；`bigboss-base` 仍然是外部本地代码库，通过配置路径读取。

### 4. 是否每次都要重新扫描

不需要。只有基础组件代码变化、组件说明卡片需要批量刷新，或新成员第一次初始化时，才需要重新执行组件扫描。

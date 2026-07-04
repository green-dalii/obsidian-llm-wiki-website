---
title: "维护（3）：文件监听、定期巡检、启动健康检查"
description: "三层自动化让 Wiki 保持最新，无需手工维护。Karpathy LLM Wiki 监听你的 Obsidian 库、按计划巡检、每次启动时检查 Wiki 健康状态。"
date: 2026-05-11
tags: ["实践指南"]
series: "maintenance"
related: ["smart-fix-all", "contradiction-detection", "v123-graph-engine-ai-sdk"]
---

## 维护间隙

你花了一个下午精心整理来源。运行了提取。欣赏着崭新的 Wiki——页面干净、链接妥当、图谱视图美不胜收。

然后两周过去了。

一天早上你打开 Obsidian，发现 47 条 Lint 警告。重复页面从重叠的来源中悄悄冒了出来。死链指向上周你重命名的页面。孤立页面孤零零地飘在知识图谱之外。一次失败的提取留下了一个空页面梗概，直勾勾地盯着你。

这就是**维护间隙**——每个知识库在主动整理间隙都会经历的无声衰退。这不是谁的错。它是一个活系统的自然结果：来源在变化、名称在迁移、新内容以批次而非持续流的形式到来。

在自动维护功能出现之前，填补这个间隙意味着要记得手动运行 Lint、解析报告、逐条修复问题。对于一个 500 页的 Wiki，那是 10 分钟的琐事——你会一直拖到警告严重到不可忽视为止。

有了自动维护功能（v1.4.0 引入），插件持续地处理检测。你不需要记得去做什么，不需要安排计划。系统自己监控、扫描、提醒。

## 三个自动化层次

自动维护系统由三个独立的层次构成，每一层针对特定的时间维度和范围设计。

### 第一层：File Watcher

File Watcher 实时监控 `sources/` 和 `wiki/` 目录的变化。当你在任一目录中修改、添加或删除文件时，它会在几秒内触发相应的操作。

**监控内容：**
- `sources/` 文件变化 → 重新提取修改过的来源
- `wiki/` 文件变化 → 重新扫描断链和孤立页面
- 新文件创建 → 根据目录触发提取或链接校验

**配置：**

```yaml
auto_maintenance:
  file_watcher:
    enabled: true
    watch_sources: true
    watch_wiki: true
    delay_ms: 3000
    debounce: true
    exclude_patterns:
      - "*.tmp"
      - ".DS_Store"
      - "_draft_*"
```

`delay_ms` 为 3000 表示监听器在最后一次文件变更后等待 3 秒再执行操作。这防止了你在批量编辑多个文件时触发一连串操作。`debounce` 选项将快速连续的变化合并为一次触发。

**什么时候用：** 始终开启，除非你在用电池运行超大型 Vault。CPU 开销可以忽略不计——监听器使用的是操作系统级文件系统事件（macOS 上的 fsevents，Linux 上的 inotify，Windows 上的 ReadDirectoryChanges），不是轮询。

### 第二层：Periodic Lint

Periodic Lint 按照可配置的时间表执行全面扫描。不同于 File Watcher 的有针对性反应，这是一次全方位排查：重复页面、死链、孤立页面、空页面、缺失别名、以及受污染的页面名称。

**默认间隔：** 每 4 小时。可配置为 30 分钟到 24 小时不等，也可以完全手动。

**每次扫描检查的内容：**

| 检查项 | 发现什么 | 平均扫描时间（1K 页面） |
|--------|----------|------------------------|
| 重复页面 | 内容相似度超过 80% 的页面 | 2–4 秒 |
| 死链 | 指向不存在页面的 `[[wiki-links]]` | <1 秒 |
| 孤立页面 | 零入链的页面 | <1 秒 |
| 空页面 | 无提取内容的页面 | <1 秒 |
| 缺失别名 | 缺少必要别名字段的实体 | <1 秒 |
| 受污染页面 | 页面名称中的文件夹前缀污染 | <1 秒 |

**配置：**

```yaml
auto_maintenance:
  periodic_lint:
    enabled: true
    interval_hours: 4
    run_on_startup: true
    auto_report: true
    checks:
      - duplicates
      - dead_links
      - orphans
      - empty_pages
      - missing_aliases
      - polluted_pages
```

**什么时候增加频率：** 如果你每天多次提取来源，或者与其他人协作使用同一个 Vault，将 `interval_hours` 设为 1 或 2。扫描速度足够快，你几乎感觉不到。

**什么时候降低频率：** 如果你的 Wiki 很稳定（几周都没添加新来源），每天一次就足够了。

### 第三层：Startup Health Check

Startup Health Check 在 Obsidian 打开时运行。它是一次有针对性的、近乎即时的诊断，只回答一个问题："我的 Wiki 现在健康吗？"

不同于 Periodic Lint 的全面扫描，Startup Health Check 只运行快速子集检查：
- 关键死链（顶层 `wiki/index.md` 中的链接）
- 最近修改的页面引用了但缺失的实体页面
- Schema 校验错误
- 上次会话中未完成的提取（检查 `wiki/log.md` 中是否有中断操作）

如果发现问题，它会显示一条**通知提示**，包含摘要和一个"Run Full Lint"操作按钮。

**配置：**

```yaml
auto_maintenance:
  startup_health_check:
    enabled: true
    show_toast: true
    include_schema_validation: true
    max_reported_issues: 5
```

健康检查即使对于最大的 Wiki 也能在 500ms 内完成。它不会扫描每个页面——而是采样最关键路径，只报告最具影响力的问题。

**什么时候用：** 始终开启。没有理由禁用它。性能开销几乎不可感知。及时捕获 schema 损坏或中断的提取，能让你避免一整天都在疑惑为什么 Wiki 感觉不对劲。

## 各层次如何配合

这三个层次不仅并行运行——它们形成了一个**检测管道**，能在问题生命周期的每个阶段捕获它们。

来看一个真实场景：

1. **你在 Obsidian 里编辑了一条来源笔记。** File Watcher 检测到变化，等待 3 秒，然后触发重新提取。
2. **提取完成。** 新的提取内容与已有实体页重叠，产生了重复。File Watcher 不会检测到这个——检测重复不是它的职责。
3. **4 小时后**，Periodic Lint 运行了。它发现了重复项并将其加入 Lint 报告。你看到一个通知徽章。
4. **你晚上关闭了 Obsidian。** 第二天早上，Startup Health Check 运行。它看到昨天报告中未解决的重复，显示一条通知："发现 1 个重复页面。运行 Full Lint 查看详情。"
5. **你打开 Smart Fix All**（v1.7.11 引入），点一个按钮。重复被合并，合并且引起的死链被修复，孤立页面检查自动运行。

每一层处理自己最擅长的工作。File Watcher 即时捕获变更但不做深度分析。Periodic Lint 深度分析但按计划运行。Startup Health Check 提醒你注意遗留问题，但不会用数据轰炸你。

## 性能考虑

自动维护的常见担忧是："这会拖慢我的 Obsidian 吗？"

以下是真实数据：

- **File Watcher：** 空闲时 CPU 占用 0.1%。文件变更触发重新提取时短暂升高（1–2% CPU，持续 2–5 秒）。
- **Periodic Lint：** 扫描 1,000 页的 Wiki 需要 3–8 秒，CPU 占用约 5%。在后台线程运行——Obsidian 保持响应。
- **Startup Health Check：** 100–500ms，CPU 占用 <1%。在 Obsidian 自身启动完成前就已经结束。

全天的总资源影响：累计 CPU 时间不到 30 秒。默认设置针对响应速度和效率做了平衡，适用于 95% 的用户。

## 与 Smart Fix All 的关系

自动维护和 Smart Fix All（维护系列第四篇）是互补系统，分工明确：

| 系统 | 职责 | 时机 |
|------|------|------|
| File Watcher | 即时检测变更 | 文件变更后数秒 |
| Periodic Lint | 全面检测 | 每 4 小时 |
| Startup Health Check | 开机快速诊断 | Obsidian 启动时 |
| Smart Fix All | 一次性修复所有问题 | 按需触发 |

自动维护**检测和报告**。Smart Fix All**修复**。你可以把自动维护想象成监控仪表盘，Smart Fix All 则是"一键全部解决"按钮。

如果你同时运行自动维护（v1.4.0+）和 Smart Fix All（v1.7.11+），组合工作流是：

1. 系统自动检测问题（Periodic Lint 或 Startup Health Check）
2. 你收到通知，包含数量和严重程度
3. 方案 A：运行 Smart Fix All，一键解决所有可修复的问题
4. 方案 B：打开 Lint 报告，逐条手动检查

## 按 Wiki 规模推荐配置

**小型 Wiki（<100 页）：**

```yaml
auto_maintenance:
  file_watcher:
    enabled: true
    delay_ms: 1000
  periodic_lint:
    enabled: true
    interval_hours: 8
  startup_health_check:
    enabled: true
```

**中型 Wiki（100–1,000 页）：**

```yaml
auto_maintenance:
  file_watcher:
    enabled: true
    delay_ms: 3000
    debounce: true
  periodic_lint:
    enabled: true
    interval_hours: 4
    run_on_startup: true
  startup_health_check:
    enabled: true
    max_reported_issues: 5
```

**大型 Wiki（1,000+ 页）：**

```yaml
auto_maintenance:
  file_watcher:
    enabled: true
    delay_ms: 5000
    debounce: true
    exclude_patterns:
      - "*.tmp"
      - "_backup_*"
  periodic_lint:
    enabled: true
    interval_hours: 2
    run_on_startup: false
    checks:
      - duplicates
      - dead_links
      - orphans
      - empty_pages
  startup_health_check:
    enabled: true
    show_toast: true
    include_schema_validation: true
    max_reported_issues: 10
```

对于大型 Wiki，增大 File Watcher 的延迟以避免在批量操作时触发重新提取。你也可以减少 Periodic Lint 的检查项，只保留影响最大的项目，并关闭 `run_on_startup` 以避免初始扫描与 Obsidian 自身的启动负载冲突。

## 下一篇：Smart Fix All

自动维护让你的 Wiki 在主动整理间隙保持健康。但当问题确实积累时，你需要一种方式来解决它们，而不是逐个点击。

这正是 [Smart Fix All](/blog/smart-fix-all) 所做的——一键操作，按因果顺序修复，生成详细报告。它是本文所述检测系统的天然补充。

[在 GitHub 上查看](https://github.com/green-dalii/obsidian-llm-wiki)

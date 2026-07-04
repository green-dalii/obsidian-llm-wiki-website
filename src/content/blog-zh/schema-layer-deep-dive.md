---
title: "深入解析（5）：用自定义 Schema 掌控知识提取"
description: "schema/ 文件夹定义 Karpathy LLM Wiki 如何提取知识——实体类型、属性、别名规则、提取模板。自定义你的 Obsidian 知识库的深度解读。"
date: 2026-05-24
tags: ["深入解析"]
series: "inside-the-system"
related: ["modular-architecture", "research-papers-workflow", "contradiction-detection", "monte-carlo-ppr"]
---

## 第三层

每个 Karpathy LLM Wiki 的根目录下都有三个文件夹：

```
your-vault/
  sources/       ← 输入：你的笔记、文章、研究材料
  wiki/          ← 输出：提取的实体、概念、链接
  schema/        ← 控制：提取方式的定义
```

大多数用户的活动范围在 `sources/` 和 `wiki/` 之间。加内容、跑摄入、看结果。`schema/` 文件夹在后台默默工作，用合理的默认值完成它的任务。

但对于进阶用户来说，`schema/` 才是真正神奇的地方。它是提取的控制面板——定义存在哪些类型的实体、它们有什么属性、名字怎么规范化、最终页面用什么模板生成。

从 v1.3.0 引入、v1.9.0 大幅扩展之后，Schema 层把插件从一个通用知识提取器变成了**领域专属的知识系统**——它能理解你所在领域的词汇、惯例和关系。

## Schema 文件夹结构

`schema/` 文件夹包含五个 YAML 文件，各负责提取控制的一个方面：

```
schema/
  entities.yaml      ← 定义实体类型及其属性
  concepts.yaml      ← 定义概念类型及其属性
  aliases.yaml       ← 名称规范化规则
  templates.yaml     ← 页面生成模板（Handlebars）
  settings.yaml      ← 全局提取设置
```

每个文件都是可选的。如果缺少某个文件，插件会使用内置的默认值。你可以从只有 `entities.yaml` 开始，随着需求增长逐步添加其他文件。

## 实体类型定义

`entities.yaml` 是 Schema 系统的核心。它定义你的 Wiki 识别哪些类型的实体，以及每种类型应该有哪些属性。

这是一个最小示例：

```yaml
# schema/entities.yaml
entity_types:
  person:
    description: "有专业或研究贡献的个人"
    properties:
      name:
        type: string
        required: true
        description: "全名"
      birth_year:
        type: integer
        required: false
      affiliation:
        type: string
        required: false
        description: "当前或主要机构"
      known_for:
        type: list<string>
        required: false
      h_index:
        type: integer
        required: false
        description: "Google Scholar h-index"
    entity_references:
      - affiliation  # 链接到组织实体

  organization:
    description: "机构、公司或研究实验室"
    properties:
      name:
        type: string
        required: true
      founded_year:
        type: integer
        required: false
      type:
        type: enum
        values: [university, research_lab, company, nonprofit]
        required: false
      headquarters:
        type: string
        required: false

  product:
    description: "软件产品、模型或工具"
    properties:
      name:
        type: string
        required: true
      vendor:
        type: string
        required: true
        description: "创建它的公司或组织"
      release_date:
        type: date
        required: false
      version:
        type: string
        required: false
      license:
        type: enum
        values: [MIT, Apache-2.0, GPL-3.0, Proprietary, BSD]
        required: false
    entity_references:
      - vendor  # 链接到组织实体
```

实体类型定义中的几个关键概念：

- **`type`** ——属性的数据类型。支持：`string`、`integer`、`float`、`date`、`boolean`、`enum`、`list<string>`、`list<integer>`、`url`。
- **`required`** ——如果为 true，LLM 会被指示提取这个属性，没有它就不会创建页面。谨慎使用——要求太多属性会增加提取失败的概率。
- **`enum`** ——将值限制为预定义集合。LLM 会把提取到的文本映射到最接近的枚举值。这对一致性至关重要——如果每个产品都有 `license` 字段，值来自 `[MIT, Apache-2.0, GPL-3.0, Proprietary, BSD]`，你就可以按许可证筛选、排序和交叉引用，不用担心拼写不一致。
- **`entity_references`** ——标记某个属性为链接到另一个实体类型。当提取发现 `vendor` 的值时，它会创建指向对应组织页面的 `[[wiki-link]]`（如果不存在则创建）。这就是图谱自动增长的方式。

## 概念类型定义

概念是实体的抽象对应物。实体代表具体的事物（一个人、一家公司、一个产品），而概念代表思想、方法、理论和指标。

`concepts.yaml` 和 `entities.yaml` 结构相同：

```yaml
# schema/concepts.yaml
concept_types:
  method:
    description: "研究方法、技术或途径"
    properties:
      name:
        type: string
        required: true
      field:
        type: string
        required: false
      year_introduced:
        type: integer
        required: false
      known_applications:
        type: list<string>
        required: false

  theory:
    description: "科学理论或框架"
    properties:
      name:
        type: string
        required: true
      proponents:
        type: list<string>
        required: false
      year_proposed:
        type: integer
        required: false
      status:
        type: enum
        values: [widely_accepted, contested, historical, speculative]
        required: false

  metric:
    description: "定量测量或评估标准"
    properties:
      name:
        type: string
        required: true
      acronym:
        type: string
        required: false
      range:
        type: string
        required: false
        description: "例如 0-100、0.0-1.0"
      typical_use:
        type: string
        required: false
```

实体和概念的区分很重要，它影响了插件如何组织你的 Wiki。实体放在 `wiki/entities/`，概念放在 `wiki/concepts/`。这让大型 Wiki 变得好浏览——你可以浏览所有人物，而不必在方法列表里翻找。

## 别名规范化规则

v1.9.0 中最强大的功能之一就是别名系统。`aliases.yaml` 定义了名称应该如何规范化、扩展以及跨来源匹配。

```yaml
# schema/aliases.yaml
aliases:
  expansions:
    - pattern: "AI"
      expansions:
        - "Artificial Intelligence"
        - "artificial intelligence"
    - pattern: "ML"
      expansions:
        - "Machine Learning"
        - "machine learning"
    - pattern: "LLM"
      expansions:
        - "Large Language Model"
        - "large language model"
    - pattern: "NLP"
      expansions:
        - "Natural Language Processing"
        - "natural language processing"

  stripping:
    - pattern: "^(Dr\\.|Professor)\\s+"
    - pattern: "\\s+(PhD|MD|Esq\\.)$"
    - pattern: "[™©®]"

  cross_language:
    - canonical: "Transformer"
      variants:
        - "Transformer"
        - "Transformer模型"
        - "Transformer 模型"
        - "Transformateur"
    - canonical: "Deep Learning"
      variants:
        - "Deep Learning"
        - "深度学习"
        - "深層学習"
        - "Apprentissage profond"
```

**扩展（Expansions）**确保"LLM"和"Large Language Model"被视为同一个实体。当系统遇到首字母缩写时，它会检查扩展列表，并规范化到标准形式。

**剥离（Stripping）**在匹配前去掉头衔、后缀和特殊字符。"Dr. Geoffrey Hinton"和"Geoffrey Hinton"成为同一个实体。"TensorFlow™"和"TensorFlow"也能匹配。

**跨语言（Cross-language）**匹配把翻译后的名称映射到标准形式。这对于多语言 Wiki 至关重要（参见我们的[八种语言](/zh/blog/eight-languages)文章）。如果没有这个功能，中文来源中提到"Transformer模型"和英文来源中提到"Transformer"会生成两个独立的实体页面。

## 提取模板

`templates.yaml` 使用 Handlebars 语法来控制实体和概念页面如何生成。

```yaml
# schema/templates.yaml
templates:
  entity_default: |
    # {{name}}

    > **Type:** {{entity_type}}

    {{#if description}}
    {{description}}
    {{/if}}

    ## Properties

    {{#each properties}}
    - **{{@key}}:** {{this}}
    {{/each}}

    ## Sources

    {{#each sources}}
    - [[{{this}}]]
    {{/each}}

    ---
    *Extracted on {{date}}*

  person: |
    # {{name}}

    {{#if properties.affiliation}}
    **Affiliation:** {{properties.affiliation}}
    {{/if}}
    {{#if properties.h_index}}
    **h-index:** {{properties.h_index}}
    {{/if}}

    {{#if description}}
    {{description}}
    {{/if}}

    ## Profile

    {{#each properties}}
    {{#unless @last}}
    - **{{@key}}:** {{this}}
    {{/unless}}
    {{/each}}

    ## Known For

    {{#if properties.known_for}}
    {{#each properties.known_for}}
    - {{this}}
    {{/each}}
    {{else}}
    *No specific contributions recorded yet.*
    {{/if}}

    ## Related Pages

    {{#each related_entities}}
    - [[{{this}}]]
    {{/each}}

    ## Sources

    {{#each sources}}
    - [[{{this}}]]
    {{/each}}
```

模板系统有以下几种类型：

- `entity_default` —— 用于没有特定模板的实体类型
- `concept_default` —— 用于没有特定模板的概念类型
- 命名模板（如 `person`、`organization`）—— 覆盖特定类型的默认模板

在模板中，你可以使用 `{{#if}}`、`{{#each}}`、`{{#unless}}` 和条件运算符。支持完整的 Handlebars 语法，包括 partials 和 helpers。

## 全局提取设置

`settings.yaml` 控制提取引擎的行为：

```yaml
# schema/settings.yaml
settings:
  extraction:
    granularity: medium  # low, medium, high
    property_confidence: 0.7  # 0.0-1.0
    relation_types:
      - affiliation
      - collaboration
      - citation
      - derived_from
    max_entities_per_source: 50
    max_concepts_per_source: 30
    prefer_recent_sources: true

  quality:
    min_description_length: 50
    require_source_citation: true
    deduplicate_on_extraction: true
    cross_reference_on_extraction: false

  output:
    page_format: markdown
    include_frontmatter: true
    frontmatter_fields:
      - title
      - type
      - source
      - extracted
      - aliases
```

关键设置项：

- **`granularity`** —— `low` 只提取实体名称和类型。`medium` 添加属性。`high` 提取子实体和嵌套关系。粒度越高，每个来源消耗的 token 越多。
- **`property_confidence`** —— 属性被包含的最低置信度（0.0-1.0）。设为 0.7 时，LLM 必须相当确定才会提取。更低的数值会提取更多属性，但也包含更多噪音。
- **`relation_types`** —— 系统应该跟踪的实体间关系类型。每种类型都会生成双向 wiki-link。
- **`prefer_recent_sources`** —— 为 true 时，较新的源材料对同一实体具有更高优先级（与[矛盾检测](/zh/blog/contradiction-detection)相关）。
- **`deduplicate_on_extraction`** —— 创建新页面前检查已有实体。为 true 时，新的提取内容会合并到已有页面中。
- **`cross_reference_on_extraction`** —— 为 true 时，立即将新提取的实体与已有实体建立链接。这会减慢摄入速度，但能产生更丰富的初始图谱结构。

## 领域专属示例：学术研究 Schema

下面展示一位研究者如何为 AI/ML 文献配置 Schema：

**entities.yaml 节选：**

```yaml
entity_types:
  author:
    properties:
      name: { type: string, required: true }
      h_index: { type: integer }
      institution: { type: string, entity_references: [institution] }
      google_scholar_id: { type: string }
      primary_field: { type: string }
      notable_papers: { type: list<string> }

  institution:
    properties:
      name: { type: string, required: true }
      ranking: { type: integer }
      country: { type: string }
      type: { type: enum, values: [university, corporate_lab, government, nonprofit] }

  paper:
    properties:
      title: { type: string, required: true }
      year: { type: integer, required: true }
      venue: { type: string }
      authors: { type: list<string>, entity_references: [author] }
      citation_count: { type: integer }
      arxiv_id: { type: string }
      status: { type: enum, values: [published, preprint, workshop, under_review] }
```

使用这个 Schema，一份关于新论文的源材料会提取：
- **论文**实体，包含年份、发表平台和引用数
- 每位**作者**（或链接到已有的作者页面）
- 每位作者的**机构**（或链接到已有的机构页面）
- 三者之间的双向链接

结果：摄入 50 篇论文后，你自动拥有了一个研究者目录，包含作者资料、机构页面和论文索引——全都不需要手动录入。

## 调试与验证

Schema 验证器（通过 `Cmd+P` → "Validate Schema" 访问）会检查：

- 无效的 YAML 语法（捕获 90% 的错误）
- 引用的类型是否缺失（例如 `entity_references: [institution]` 但 `institution` 未定义）
- 实体类型之间的循环引用
- 模板语法错误（无效的 Handlebars）
- 已弃用的属性类型

**调试模式**（`Cmd+P` → "Toggle Schema Debug Mode"）会显示：

- 每条提取匹配了哪些 Schema 规则
- 某些属性为什么被跳过（置信度低于阈值、缺少必填字段）
- 页面创建前的模板渲染输出
- 每个实体名称的别名解析决策

排查问题时，先从 Validate Schema 开始。如果通过了，开启调试模式，跑一次单条源材料的摄入，实时观察提取的决策树。

## 什么时候用 Schema（以及什么时候不用）

**用 Schema 的时候：**
- 你的领域有默认类型覆盖不了的实体类型（比如"专利"、"临床试验"、"物种"）
- 你需要一致的属性提取（比如每篇论文必须有年份和发表平台）
- 你处理多语言内容，需要名称规范化
- 你希望按实体类型定制页面布局
- 你在构建大型 Wiki（1000+ 页面），按实体类型排序和过滤是刚需

**跳过 Schema 的时候：**
- 你的 Wiki 不到 100 页——默认值完全够用
- 你的来源都是同一主题、结构相似
- 你还在摸索阶段，不确定自己需要什么属性
- 你更倾向于在提取后手动组织页面

Schema 系统的美妙之处在于：你可以从不用它开始，等默认值不够用了再加一个 `entities.yaml`，然后随着需求演变逐步添加 `aliases.yaml` 和 `templates.yaml`。每个文件都是可选的，而且每个都在默认值的基础上构建。

## 下一篇：第一个 100 页

有了调优后的 Schema，你的提取更精准，实体类型也定义清晰。现在是时候把一切整合起来了。

[入门指南（四）：创建你的前 100 个 Wiki 页面](/zh/blog/first-100-pages) 会带你走完完整流程——从一个空的 Vault 到一个有生命力的、持续增长的知识库，配有完善的 Schema、别名和提取模板。

[在 GitHub 上查看](https://github.com/green-dalii/obsidian-llm-wiki)

# Cloudflare Pages 部署指南

## 项目状态

✅ **已成功推送到GitHub：** `git@github.com:green-dalii/obsidian-llm-wiki-website.git`
- main分支：生产版本
- astro-migrate分支：开发备份

## Cloudflare Pages部署步骤

### 1. 登录Cloudflare Dashboard

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 登录账号（或注册免费账号）
3. 点击左侧菜单 **"Pages"**

### 2. 创建项目

1. 点击 **"Create a project"**
2. 选择 **"Connect to Git"**
3. 选择 **GitHub** 作为Git提供商
4. 授权Cloudflare访问GitHub仓库
5. 选择仓库：**`green-dalii/obsidian-llm-wiki-website`**

### 3. 配置构建参数

填写以下配置：

```
项目名称: llm-wiki（或 obsidian-llm-wiki-website）

生产分支: main

构建配置:
- Framework preset: Astro
- Build command: npm run build
- Build output directory: dist

环境变量:
- NODE_VERSION: 18（可选，自动检测）

Root directory: / (保持默认)
```

点击 **"Save and Deploy"**

### 4. 等待首次部署

- 构建时间：约1-2分钟
- 实时查看构建日志
- 部署完成后获得URL：
  - 生产URL：`https://llm-wiki.pages.dev/`
  - 或项目名称URL：`https://obsidian-llm-wiki-website.pages.dev/`

### 5. 验证部署

访问生成的URL，检查：

- ✅ 英文页面正常显示：`https://[your-project].pages.dev/`
- ✅ 中文页面正常显示：`https://[your-project].pages.dev/zh/`
- ✅ 所有静态section渲染正确
- ✅ Hero动画（KnowledgeGrowth）正常运行
- ✅ WikiDemo交互正常
- ✅ 语言切换正常工作
- ✅ 移动端响应式布局正常

## 自动部署配置

**生产部署：**
- 每次push到 `main` 分支自动触发生产部署
- 部署URL：`https://[project-name].pages.dev/`

**预览部署：**
- 每个commit自动生成预览URL
- 预览URL格式：`https://[commit-hash].[project-name].pages.dev/`
- 可测试修改效果后再合并

**回滚：**
- Cloudflare Dashboard → Pages → 项目 → Deployments
- 选择任意历史部署，点击 **"Rollback to this deployment"**
- 一键回滚到任意版本

## 自定义域名配置（可选）

### 选项1：使用免费Pages域名

保持默认域名：`https://llm-wiki.pages.dev/`
- 完全免费
- 自动HTTPS
- 无需额外配置

### 选项2：绑定自定义域名

1. Cloudflare Dashboard → Pages → 项目 → Custom domains
2. 点击 **"Set up a custom domain"**
3. 输入域名：如 `llmwiki.app` 或 `obsidian-llm-wiki.com`
4. 选择DNS配置方式：
   - **如果域名在Cloudflare：** 自动配置DNS和证书
   - **如果域名在其他DNS：** 添加CNAME记录指向 `[project-name].pages.dev`

### DNS配置示例（外部域名）

```
类型: CNAME
名称: llmwiki（或 @）
值: llm-wiki.pages.dev
TTL: Auto
```

等待DNS生效（几分钟到几小时），自动启用HTTPS证书。

## 性能优化建议

### 已完成优化

✅ **静态HTML渲染：** 88KB HTML直接输出
✅ **SEO优化：** 100/100 Lighthouse SEO分数
✅ **CLS为0：** 零布局偏移
✅ **IntersectionObserver：** 替代GSAP滚动动画
✅ **React Islands：** 仅交互组件加载JS

### 建议进一步优化

#### 1. 字体优化（可选）

当前加载42%体积为字体（64KB），可优化：
- 减少Outfit权重：6个 → 4个（去掉300和800）
- 减少JetBrains Mono权重：3个 → 2个（去掉600）
- 预估节省：21.5KB

修改 `src/pages/index.astro` 和 `src/pages/zh/index.astro`：
```html
<!-- 当前 -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

<!-- 优化后 -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

#### 2. Accessibility优化（可选）

当前Accessibility分数75/100，可提升：
- 添加ARIA标签到按钮元素
- 提升颜色对比度到4.5:1标准
- 增大触摸目标尺寸到24px

详细优化任务见MEMORY.md中的待办任务列表。

## Cloudflare Pages特性利用

### 1. 预览环境测试

每次commit自动生成预览URL，可以：
- 测试新功能效果
- 验证修改是否正确
- PR审查时提供预览链接

### 2. Analytics监控

Cloudflare Pages内置免费Analytics：
- Dashboard → Pages → 项目 → Analytics
- 查看访问量、带宽、性能数据
- 无需集成第三方Analytics

### 3. Workers扩展（未来）

可集成Cloudflare Workers实现：
- API endpoints
- 动态功能
- A/B测试
- 缓存控制

### 4. Headers和重定向

添加 `_headers` 文件控制缓存：
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

添加 `_redirects` 文件处理重定向：
```
# 示例：重定向旧URL
/old-path /new-path 301
```

## 监控和维护

### 构建状态检查

- Dashboard → Pages → 项目 → Deployments
- 查看每次构建状态、日志、时间
- 构建失败会显示错误原因

### 性能监控

- Dashboard → Pages → 项目 → Analytics
- 监控：
  - 页面访问量
  - 响应时间
  - 带宽使用
  - 错误率

### 成本

✅ **完全免费：**
- 无构建限制
- 无带宽限制
- 无站点大小限制
- 无功能限制

## 对比GitHub Pages

| 特性 | GitHub Pages | Cloudflare Pages |
|------|--------------|------------------|
| **中国访问速度** | 慢（GFW影响） | **快**（香港节点） |
| **Base path配置** | 需要配置 | **无需配置** |
| **URL简洁度** | 长（带repo路径） | **短**（pages.dev） |
| **预览环境** | 无 | **有** |
| **带宽限制** | 100GB/月 | **无限制** |
| **构建速度** | 2-10分钟 | **30秒-2分钟** |

**结论：** Cloudflare Pages更适合本项目，中国用户访问更快，配置更简单。

## 问题排查

### 构建失败

查看构建日志：
1. Dashboard → Pages → 项目 → Deployments
2. 点击失败的部署
3. 查看 **"View build log"**

常见问题：
- **依赖安装失败：** 检查package.json版本兼容性
- **构建超时：** Astro构建通常快速，如超时检查代码是否有循环
- **路径错误：** 确认Build output directory设置为 `dist`

### 页面显示异常

- **空白页面：** 检查astro-island是否正确加载React组件
- **样式丢失：** 检查CSS文件是否正确生成（dist/assets/*.css）
- **动画不工作：** 检查IntersectionObserver script是否正确加载

### 语言切换不工作

- 确认Header.tsx语言切换链接正确（`href="/zh/"` ↔ `href="/"`）
- 确认i18n路由配置正确（astro.config.mjs）

## 下一步

1. ✅ 项目已推送到GitHub
2. ⏭️ 登录Cloudflare Dashboard创建Pages项目
3. ⏭️ 配置构建参数并部署
4. ⏭️ 验证部署成功
5. ⏭️ （可选）绑定自定义域名
6. ⏭️ （可选）完成Accessibility优化

---

**部署完成后，项目将自动：**
- 每次push到main自动部署生产版本
- 每个commit生成预览URL
- 全球CDN加速访问
- 自动HTTPS证书
- 无限带宽和构建次数

**预期URL：** `https://llm-wiki.pages.dev/` 或自定义域名
# Aiofix-starter-monorepo


[@clack/prompts](https://www.npmjs.com/package/@clack/prompts)
可以帮助我们轻松地构建美观的命令行应用程序，[试试看](https://stackblitz.com/edit/clack-prompts?file=index.js)

[Commander.js](https://github.com/tj/commander.js)为我们提供了一个完整的`node.js`命令行解决方案。

我们使用这两个工具来构建我们的命令行应用，创建的脚本放置在`scripts`目录下


## 从 Next-Forge 开始

我们从[next-forge](https://www.next-forge.com/)开始。Next-Forge 是 Next.js 应用程序的生产级`turborepo`模板，它旨在帮助您尽可能彻底地构建新的SaaS应用程序，以平衡速度和质量，成为新应用程序的全面起点。

它的确给了我们很多好的建议，然而，众所周知的网络原因，它集成的第三方saas服务并不适合中国大陆地区。我们不得不选择其他的方案来替代这些服务，而这也成为我们需要改造的第一部分内容。

其二，Next-Forge 并没有集成 NestJS，我们需要一个后端的框架来支持我们的开发。这是我们需要改造的第二部分内容。

其三，Nextjs 是 Vercel 的产品，往往与 Vercel 的服务器环境绑定，我们需要尽可能地剥离这些内容，这是我们改造的第三部分内容。

另外，我们还需要把 TanStack-Start 集成进去，它和 Nextjs 相比更接近 SPA，这是我们需要的。

主要包括：

- Arcjet：用于应用程序安全。
- BetterStack：用于日志记录和正常运行时间监控。
- 身份认证部分：由 Clerk 更改为 Better-Auth
- Google Analytics：用于网站分析。
- Posthog：用于产品分析。
- Resend：用于事务性电子邮件。
- Sentry：用于错误跟踪。
- Stripe：用于支付。
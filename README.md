# WisdomSeed College

Web3 教育平台

## 开发环境设置

### 环境变量配置

1. 复制环境变量示例文件：

```bash
cp .env.example .env
```

2. 配置环境变量：
   在 `.env` 文件中设置以下变量：

```plaintext
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=你的项目ID  # 从 reown cloud 获取
```

3. 获取 WalletConnect Project ID:

- 访问 [cloud.reown.com](https://cloud.reown.com)
- 注册/登录账号
- 创建新项目
- 复制项目 ID 到 `.env` 文件

### 启动开发服务器

```bash
pnpm dev
```

注意：

- 环境变量修改后需要重启开发服务器
- 不要将 `.env` 文件提交到版本控制
- 请确保 `.env` 已添加到 `.gitignore`

## 技术栈

- Next.js
- Wagmi/RainbowKit
- TailwindCSS
- shadcn/ui

```

```

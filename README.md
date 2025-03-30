# WisdomSeed College

Web3 教育平台

## 环境配置

### AWS S3 配置

1. 登录 AWS 控制台：https://aws.amazon.com/console/

2. 创建 IAM 用户：

   - 进入 IAM 服务
   - 点击"用户" -> "创建用户"
   - 输入用户名（如：wisdom-seed-admin）
   - 选择"访问类型"为"编程访问"

3. 设置权限：

   - 选择"直接附加策略"
   - 搜索并添加 "AmazonS3FullAccess" 策略

4. 保存密钥：
   - 复制生成的 Access Key ID 和 Secret Access Key
   - 将密钥添加到 .env 文件：
   ```env
   AWS_ACCESS_KEY_ID=你的访问密钥ID
   AWS_SECRET_ACCESS_KEY=你的私有访问密钥
   AWS_REGION=us-east-1
   AWS_BUCKET_NAME=你的存储桶名称
   ```

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

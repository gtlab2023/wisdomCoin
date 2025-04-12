import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig: NextConfig = {
  /* config options here */
  experimental: {},
  images: {
    domains: ['cover-image-bucket2025.s3.us-east-1.amazonaws.com'], // 允许 dummyimage.com
    // 如果还有其他域名（如用户头像服务），可继续添加
    // domains: ['dummyimage.com', 'example.com'],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

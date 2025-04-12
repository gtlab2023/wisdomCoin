import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {},
  images: {
    domains: ['cover-image-bucket2025.s3.us-east-1.amazonaws.com'], // 允许 dummyimage.com
    // 如果还有其他域名（如用户头像服务），可继续添加
    // domains: ['dummyimage.com', 'example.com'],
  },
};

export default nextConfig;

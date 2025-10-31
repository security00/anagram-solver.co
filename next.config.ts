import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 确保正确的渲染模式
  reactStrictMode: true,
  // 确保页面预渲染
  trailingSlash: false,
  // 优化构建输出
  output: 'standalone',
};

export default nextConfig;

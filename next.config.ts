import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  experimental: {
    // The CLI type-checker loses child-process stdout in the Codex runtime.
    // The compiler API performs the same build-time check without spawning tsc.
    useTypeScriptCli: false,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

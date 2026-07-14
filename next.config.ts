import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 靜態輸出：核心功能完全不依賴後端服務，可部署到任何靜態主機
  output: "export",
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

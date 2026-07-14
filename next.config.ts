import type { NextConfig } from "next";

// 子路徑部署（如 GitHub Pages 專案頁 /MBTI-64）時設定 NEXT_PUBLIC_BASE_PATH
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // 靜態輸出：核心功能完全不依賴後端服務，可部署到任何靜態主機
  output: "export",
  ...(basePath ? { basePath } : {}),
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

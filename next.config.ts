import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/ash-detailing.site" : "";

const nextConfig: NextConfig = {
  // 1. Static Export Settings
  output: "export",
  images: { unoptimized: true }, // Required for static hosting
  trailingSlash: true,           // Avoids 404s on static refresh
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  // 2. Other Experimental & Turbopack Configurations
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Uncomment and modify if deploying to username.github.io/repo-name
  // basePath: "/repo-name",
};

export default nextConfig;
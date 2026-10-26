import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Static Export Settings
  output: "export",
  images: { unoptimized: true }, // Required for static hosting
  trailingSlash: true,           // Avoids 404s on static refresh
  basePath: "/ash-detailing.site",

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
import type { NextConfig } from "next";

/**
 * Static export so the site can be hosted anywhere (GitHub Pages, Netlify, Vercel…).
 *
 * If you deploy to a sub-path (e.g. https://user.github.io/portfolio), set
 * NEXT_PUBLIC_BASE_PATH=/portfolio at build time. For a user site
 * (https://mimahfujulislam.github.io) or a custom domain, leave it empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

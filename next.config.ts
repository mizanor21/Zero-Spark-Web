import type { NextConfig } from "next";

// GitHub Pages can only serve static files, so the deploy workflow sets
// STATIC_EXPORT=true to build an `out/` folder instead of a Node server build.
// Local `next dev` and `next build` are unaffected, and a server host later
// only has to leave this variable unset.
const staticExport = process.env.STATIC_EXPORT === "true";

// A project site lives under /<repository-name>. The workflow passes the path
// GitHub reports, which is empty once a custom domain is attached.
const basePath = process.env.PAGES_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  // Cache Components turns on Partial Prerendering, which a static export
  // rejects ("PPR cannot be enabled in export mode"), so it is server-only.
  ...(staticExport
    ? // trailingSlash emits apply/index.html, the form every static host resolves.
      { output: "export" as const, basePath, trailingSlash: true }
    : { cacheComponents: true, partialPrefetching: true }),
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

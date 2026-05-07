import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : "standalone",
  basePath: isGitHubPages ? "/asahiner" : undefined,
  assetPrefix: isGitHubPages ? "/asahiner/" : undefined,
  images: {
    unoptimized: isGitHubPages,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  trailingSlash: isGitHubPages,
};

export default nextConfig;

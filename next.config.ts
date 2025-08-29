import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // build a static site into ./out (required for S3 hosting)
  output: 'export',
  // disable Next/Image optimizer (it needs a server; we’re static)
  images: { unoptimized: true },
};

export default nextConfig;

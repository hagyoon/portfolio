/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.PORTFOLIO_DIST_DIR || ".next",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;

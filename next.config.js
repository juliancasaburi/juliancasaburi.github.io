/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ["raw.githubusercontent.com", "avatars.githubusercontent.com"],
    unoptimized: true, // Disable server-based image optimization. Next.js does not support dynamic features with static exports.
  },
};

module.exports = nextConfig;

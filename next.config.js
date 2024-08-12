/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "https://eyalp.southindia.cloudapp.azure.com",
    API_URL: "https://eyalp.southindia.cloudapp.azure.com/hrtp-api",
  },
  trailingSlash: true,
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  basePath: "/htrp",
};
module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "http://0.0.0.0:3000",
    API_URL: "https://eyalp.southindia.cloudapp.azure.com/hrtp-api",
  },
  trailingSlash: true,
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;

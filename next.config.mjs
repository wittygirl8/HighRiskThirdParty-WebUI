/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "http://0.0.0.0:1000",
    API_URL: "https://highriskthirdparty-backend-66af.onrender.com",
  },
  trailingSlash: true,
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;

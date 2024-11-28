/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fk-api.adbiyas.com"], // Just the domain without 'https://'
  },
  reactStrictMode: true,
};

export default nextConfig;

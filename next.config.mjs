/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.yes24.com",
        port: "",
        // pathname: '/',
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "80",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "host.docker.internal",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

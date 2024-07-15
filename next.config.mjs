/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "nl.go.kr"],
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
      {
        protocol: "http",
        hostname: "www.nl.go.kr",
        port: "",
        // pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.nl.go.kr",
        port: "",
        // pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

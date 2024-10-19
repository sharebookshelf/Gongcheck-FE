/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_BASE_HOST: process.env.NEXT_PUBLIC_BASE_HOST,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
  },
  publicRuntimeConfig: {
    IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    BASE_HOST: process.env.NEXT_PUBLIC_BASE_HOST,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
  },
  images: {
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
      {
        protocol: "https",
        hostname: "nl.go.kr",
        port: "",
        // pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shopping-phinf.pstatic.net",
        port: "",
      },
    ],
  },
};

export default nextConfig;

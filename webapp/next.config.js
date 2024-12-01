/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images6.alphacoders.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;

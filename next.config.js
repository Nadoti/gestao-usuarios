/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@pqina/pintura", "@pqina/react-pintura"],
  images: {
    domains: ['http://localhost:3000']
  }
}

module.exports = nextConfig

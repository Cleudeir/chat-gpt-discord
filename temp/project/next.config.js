/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s1.static.brasilescola.uol.com.br'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }, 
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig

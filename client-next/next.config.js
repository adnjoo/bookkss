/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  transpilePackages: ['@uiw/react-md-editor'],
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig

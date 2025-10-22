/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@madrasah/ui', '@madrasah/utils', '@madrasah/types', '@madrasah/hooks', '@madrasah/services', '@madrasah/mocks'],
  experimental: {
    optimizePackageImports: ['@madrasah/icons', '@madrasah/icons/ssr', '@phosphor-icons/react'],
  },
}

export default nextConfig

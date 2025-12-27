import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@madrasah/ui', '@madrasah/utils', '@madrasah/types', '@madrasah/hooks', '@madrasah/services'],
  experimental: {
    optimizePackageImports: ['@madrasah/icons', '@madrasah/icons/ssr', '@phosphor-icons/react'],
  },
}

export default withNextIntl(nextConfig)

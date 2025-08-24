import { createJiti } from 'jiti'
const jiti = createJiti(import.meta.url, { debug: true })

// Import env here to validate during build. Using jiti@^1 we can import .ts files :)
jiti.import('./env.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@madrasah/ui', '@madrasah/utils', '@madrasah/types', '@madrasah/hooks', '@madrasah/services', '@madrasah/msw'],
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      // allowing images from any domain
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig

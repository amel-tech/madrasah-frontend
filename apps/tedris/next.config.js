/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@madrasah/ui', '@madrasah/utils', '@madrasah/types', '@madrasah/hooks', '@madrasah/services'],
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
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig

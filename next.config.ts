import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
        search: '',
      },
    ],
  },

  logging: {
    incomingRequests: {
      ignore: [/\.well-known\/appspecific\/com\.chrome\.devtools\.json/],
    },
  },
}

export default nextConfig

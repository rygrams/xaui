import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  transpilePackages: [
    '@xaui/native',
    '@xaui/core',
    '@xaui/icons',
    'react-native-web',
  ],
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    }
    return config
  },
  turbopack: {},
}

export default nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  transpilePackages: [
    '@xaui/hybrid-legacy',
    '@xaui/native-legacy',
    '@xaui/core',
    '@xaui/native',
    '@xaui/icons',
    'react-native-web',
    'react-native-svg',
  ],
  turbopack: {
    resolveAlias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg/src/ReactNativeSVG.web',
    },
    resolveExtensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
    ],
  },
}

export default nextConfig

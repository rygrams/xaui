import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  transpilePackages: [
    '@xaui/native',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-web',
    'react-native-svg',
    'react-native-worklets',
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

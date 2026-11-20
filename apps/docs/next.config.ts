import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  transpilePackages: [
    '@xaui/native',
    '@xaui/tram',
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
      // The demo screens' safe-area hook; see the shim.
      'react-native-safe-area-context': './lib/safe-area-shim.tsx',
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

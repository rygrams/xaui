# @xaui/hybrid

XAUI's React Native components, rendered for the web. `@xaui/hybrid` depends on
[`@xaui/native`](https://www.npmjs.com/package/@xaui/native) and re-exports it;
[`react-native-web`](https://necolas.github.io/react-native-web/) turns those components
into DOM nodes. A Hybrid `Button` **is** the Native `Button` — same props, same slots, same
theme — in a browser, a Next.js or Vite app, or a mobile webview.

**[Documentation → ui.xtartapp.com](https://ui.xtartapp.com/docs/introduction)**

There is nothing to learn twice: the component documentation describes both packages. The
only thing that differs is telling your bundler that `react-native` means
`react-native-web`.

## Installation

```bash
npm i @xaui/hybrid react-native-web react-dom react-native-reanimated react-native-worklets
```

Add `react-native-svg` for charts and icons and `react-native-gesture-handler` for
draggable components. Emotion and Framer Motion are needed only by the few web-only
components:

```bash
npm i @emotion/react @emotion/styled framer-motion
```

## Bundler setup

Two rules, whatever the bundler:

1. `react-native` resolves to `react-native-web`.
2. `.web.tsx` / `.web.ts` files win over their platform-neutral siblings.

With Next.js and Turbopack:

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    '@xaui/hybrid',
    '@xaui/native',
    'react-native-web',
    'react-native-reanimated',
    'react-native-worklets',
    'react-native-gesture-handler',
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
```

Webpack, Vite and TypeScript are covered in the
[setup guide](https://github.com/rygrams/xaui/blob/main/HYBRID-SETUP.md).

## Usage

```tsx
import { XAUIProvider } from '@xaui/hybrid/theme'
import { Button } from '@xaui/hybrid/button'

export default function App() {
  return (
    <XAUIProvider>
      <Button variant="primary" onPress={save}>
        <Button.Label>Save</Button.Label>
      </Button>
    </XAUIProvider>
  )
}
```

Every `@xaui/native` subpath resolves from `@xaui/hybrid`. One Native point is one CSS
pixel, and components that measure layout or attach a gesture run on the client — mark them
`'use client'` in Next.js.

## Links

- [Documentation](https://ui.xtartapp.com/docs/introduction)
- [Components](https://ui.xtartapp.com/docs/components)
- [Setup guide](https://github.com/rygrams/xaui/blob/main/HYBRID-SETUP.md)
- [Issues](https://github.com/rygrams/xaui/issues)

## License

MIT

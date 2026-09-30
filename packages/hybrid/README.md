# @xaui/hybrid

XAUI's React Native components, rendered for the web. `@xaui/hybrid` depends on
[`@xaui/native`](https://www.npmjs.com/package/@xaui/native) and re-exports it;
[`react-native-web`](https://necolas.github.io/react-native-web/) turns those components
into DOM nodes. A Hybrid `Button` **is** the Native `Button` — same props, same slots, same
theme — in a browser, a Next.js or Vite app, or a mobile webview.

[![npm](https://img.shields.io/npm/v/@xaui/hybrid)](https://www.npmjs.com/package/@xaui/hybrid)
[![downloads](https://img.shields.io/npm/dm/@xaui/hybrid)](https://www.npmjs.com/package/@xaui/hybrid)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://github.com/rygrams/xaui/blob/main/LICENSE)

![XAUI — ui.xtartapp.com: a Button, a Switch and a Slider](https://raw.githubusercontent.com/rygrams/xaui/main/assets/readme/cover.png)

[Docs][docs] · [Components][components] · [Setup guide][setup]

> **Pre-1.0.** `0.9.x` releases are patch versions, and a patch can still rename or remove
> a prop until `1.0.0`. Read the [release notes][releases] before you update.

There is nothing to learn twice: the component documentation describes both packages. The
only thing that differs is telling your bundler that `react-native` means
`react-native-web`.

## Installation

```bash
npm i @xaui/hybrid react-native-web react-dom react-native-reanimated react-native-worklets
```

Add `react-native-svg` for charts and icons and `react-native-gesture-handler` for
draggable components.

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

Webpack, Vite and TypeScript are covered in the [setup guide][setup].

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

## Coding with an AI agent

Install the XAUI skill so your agent reads the real API instead of guessing it:

```bash
npx skills add https://ui.xtartapp.com/skills/xaui/SKILL.md
```

The docs also publish an [llms.txt][llms] and a Markdown version of every component page.

## Links

- [Documentation][docs]
- [Release notes][releases]
- [GitHub](https://github.com/rygrams/xaui)
- [Issues](https://github.com/rygrams/xaui/issues)

## License

[MIT](https://github.com/rygrams/xaui/blob/main/LICENSE)

[docs]: https://ui.xtartapp.com/?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-hybrid
[components]: https://ui.xtartapp.com/docs/components?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-hybrid
[llms]: https://ui.xtartapp.com/docs/llms-txt?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-hybrid
[releases]: https://ui.xtartapp.com/docs/releases?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-hybrid
[setup]: https://github.com/rygrams/xaui/blob/main/HYBRID-SETUP.md

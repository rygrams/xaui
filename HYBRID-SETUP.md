# `@xaui/hybrid` — setup

`@xaui/hybrid` is `@xaui/native` rendered for the web. The package depends on
`@xaui/native` and re-exports it; [`react-native-web`](https://necolas.github.io/react-native-web/)
turns those React Native components into DOM nodes. A Hybrid `Button` **is** the Native
`Button` — same props, same slots, same defaults, same theme.

So there is nothing to learn twice: the component documentation at
[ui.xtartapp.com](https://ui.xtartapp.com) describes both packages. What follows is the only
thing that differs — telling your bundler that `react-native` means `react-native-web`.

```bash
pnpm add @xaui/hybrid@beta
pnpm add react-native-web react-dom
```

Emotion and Framer Motion are peers too, used by the handful of web-only components Hybrid
adds on top of the shared API:

```bash
pnpm add @emotion/react @emotion/styled framer-motion
```

Add the optional peers for the components that need them — `react-native-reanimated` and
`react-native-worklets` for animation, `react-native-svg` for charts and icons,
`react-native-gesture-handler` for draggable components.

---

## 1. The alias

Every bundler needs the same two things:

1. `react-native` resolves to `react-native-web`.
2. `.web.tsx` / `.web.ts` files win over their platform-neutral siblings.

### Next.js

This is the configuration `apps/docs` runs in this repository, rendering `@xaui/native`
directly in the browser.

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

On webpack rather than Turbopack, the same two rules go in `webpack`:

```ts
webpack(config) {
  config.resolve.alias['react-native$'] = 'react-native-web'
  config.resolve.extensions = [
    '.web.tsx', '.web.ts', '.web.jsx', '.web.js',
    ...config.resolve.extensions,
  ]
  return config
}
```

### Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: { 'react-native': 'react-native-web' },
    extensions: [
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
  optimizeDeps: {
    esbuildOptions: { resolveExtensions: ['.web.js', '.js', '.ts', '.tsx'] },
  },
})
```

### TypeScript

Nothing to alias. Hybrid's types come from `@xaui/native`, which types against
`react-native`; `react-native-web` is a runtime substitution, not a type-level one.

---

## 2. The provider

Identical to Native — one `XAUIProvider` at the root of the app, from `@xaui/hybrid`:

```tsx
import { XAUIProvider } from '@xaui/hybrid'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <XAUIProvider>{children}</XAUIProvider>
      </body>
    </html>
  )
}
```

There is no CSS file to import and no `--xui-*` custom property to override. Tokens live in
the theme object, and a custom theme is built the same way on both platforms:

```tsx
import { createTheme, XAUIProvider } from '@xaui/hybrid'

const theme = createTheme({ colors: { primary: '#0ea5e9' } })

;<XAUIProvider theme={theme}>{children}</XAUIProvider>
```

---

## 3. Sizing

At scale 1, one Native point is one CSS logical pixel — `react-native-web` does that
conversion. `padding={16}` is `16px`, on both platforms, and browser zoom, the reader's root
font-size and device DPR keep their natural effect. XAUI never applies a density multiplier
of its own.

---

## 4. Server rendering

`react-native-web` renders on the server. Components that read layout, measure a node or
attach a gesture need the client — mark the page or the component `'use client'` in Next.js,
as you would for any interactive component.

---

## 5. What is web-only

A small set of components exists only in `@xaui/hybrid`, where `react-native-web` cannot
supply the behaviour or where the component makes no sense on a device. They are written with
Emotion Styled and Framer Motion, follow the same v1 API vocabulary as every other XAUI
component, and are marked **web-only** on their documentation page. Everything else you
import from `@xaui/hybrid` is the Native component itself.

---

## Summary

| Step                | Where                                                            |
| ------------------- | ---------------------------------------------------------------- |
| Dependency          | `package.json` — `@xaui/hybrid`, `react-native-web`, `react-dom` |
| Alias + extensions  | `next.config.ts` / `vite.config.ts` / webpack `resolve`          |
| Transpile           | `transpilePackages` (Next.js)                                    |
| Provider            | the app root — `XAUIProvider` from `@xaui/hybrid`                |
| Component reference | [ui.xtartapp.com](https://ui.xtartapp.com) — shared with Native  |

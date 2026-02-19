# @xaui/hybrid — Setup in docs

This document explains how `@xaui/hybrid` was installed and configured in the `apps/docs` Next.js application.

---

## 1. Package installation

Added `@xaui/hybrid` as a workspace dependency in `apps/docs/package.json`:

```json
{
  "dependencies": {
    "@xaui/hybrid": "workspace:*"
  }
}
```

Then ran `pnpm install` from the repo root.

---

## 2. Transpile in Next.js

`apps/docs/next.config.ts` — `@xaui/hybrid` added to `transpilePackages` so Next.js
processes its ESM source:

```ts
const nextConfig: NextConfig = {
  transpilePackages: [
    '@xaui/hybrid',
    '@xaui/native',
    // ...
  ],
}
```

---

## 3. CSS setup — Tailwind v4

`@xaui/hybrid` ships a `dist/index.css` that:

- Defines `--xui-*` CSS custom properties for all theme tokens (light + dark)
- Registers Tailwind v4 utilities via `@theme inline` (`bg-primary`, `text-primary-fg`, `rounded-xui-md`, etc.)
- Defines `data-xui-state` CSS animations (`xui-fade-in`, `xui-fade-out`)

### Import order matters

The docs app uses **shadcn** which also registers `--color-primary` etc. via `@theme inline`.
To prevent XUI from overriding shadcn's color tokens, import `@xaui/hybrid/dist/index.css`
**before** `@import 'tailwindcss'`:

```css
/* apps/docs/app/globals.css */

/* XUI imported first — shadcn @theme tokens take precedence */
@import '@xaui/hybrid/dist/index.css';

@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';
```

> **Why this order?** Tailwind v4 merges all `@theme` blocks; the last definition of a
> variable wins. By importing XUI first, shadcn's `--color-primary: var(--primary)` overrides
> XUI's `--color-primary: var(--xui-primary)`. XUI CSS variables (`--xui-*`) and animations
> remain available globally.

#### Screenshot — globals.css after setup

![globals.css import order](docs/screenshots/globals-css-import.png)

---

## 4. XUIProvider

`XUIProvider` is a Client Component (it uses React hooks and `document`). A thin wrapper
was created in `components/providers/xui-provider.tsx`:

```tsx
// apps/docs/components/providers/xui-provider.tsx
'use client'

import { XUIProvider } from '@xaui/hybrid/core'
import type { ReactNode } from 'react'

export function HybridProvider({ children }: { children: ReactNode }) {
  return <XUIProvider>{children}</XUIProvider>
}
```

Then wrapped in `apps/docs/app/layout.tsx` (Server Component):

```tsx
import { HybridProvider } from '@/components/providers/xui-provider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HybridProvider>
          {/* ... sidebar + main */}
        </HybridProvider>
      </body>
    </html>
  )
}
```

**What XUIProvider does in hybrid:**
- Provides theme tokens via React context (read by `useXUITheme`, `useXUIColors`, etc.)
- Sets `document.documentElement.dataset.colorScheme = 'light' | 'dark'` reactively,
  enabling the CSS `[data-color-scheme="dark"]` overrides defined in `xui.css`

#### Screenshot — layout.tsx with HybridProvider

![layout.tsx with HybridProvider](docs/screenshots/layout-provider.png)

---

## 5. BrowserPreview — equivalent of WebPreview for native

The docs already uses `WebPreview` to render native components inside a `<device-frame>`
custom element (phone shape). For hybrid, the equivalent is `BrowserPreview`: a minimalist
browser chrome (traffic lights + URL bar) wrapping hybrid components.

```
components/ui/browser-preview.tsx   — browser frame wrapper
```

```tsx
// Usage
import { BrowserPreview } from '@/components/ui/browser-preview'

<BrowserPreview url="localhost">
  <div className="p-4">
    <Alert title="Hello" themeColor="primary" />
  </div>
</BrowserPreview>
```

`BrowserPreview` wraps children with `HybridProvider` internally so components have access
to the XUI theme context.

#### Screenshot — BrowserPreview frame

![BrowserPreview — browser chrome frame](docs/screenshots/browser-preview-frame.png)

---

## 6. Playground page

An interactive playground was added at `/playground` to showcase `@xaui/hybrid` components,
following the same pattern as native component pages (live preview in device frame + controls).

**Files created:**

```
apps/docs/app/playground/
  page.tsx              — Next.js page (Server Component, metadata)
  alert-playground.tsx  — Interactive demo + AllColors grid (Client Components)
```

The playground is also accessible from the sidebar under **Hybrid (Web) → Playground**.

Structure on the page:
- **Interactive** — controls (variant, color, closable, hideIcon) + live preview in browser frame
- **All colors — flat** — grid of all 6 colors in flat variant inside browser frame
- **All colors — solid** — grid in solid variant
- **All colors — bordered** — grid in bordered variant

#### Screenshot — Playground interactive section

![Playground — Interactive controls + browser preview](docs/screenshots/playground-interactive.png)

#### Screenshot — Playground all colors

![Playground — All colors flat](docs/screenshots/playground-all-colors-flat.png)

---

## 7. How XUI animations work (no animation library)

Instead of Framer Motion or Reanimated, `@xaui/hybrid` uses **CSS keyframe animations**
toggled via a `data-xui-state` attribute:

```css
/* dist/index.css — generated from src/styles/xui.css */
@keyframes xui-fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes xui-fade-out {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.95); }
}

[data-xui-state='open']   { animation: xui-fade-in  250ms ease forwards; }
[data-xui-state='closed'] { animation: xui-fade-out 250ms ease forwards; }
```

Components set `data-xui-state` and listen to `onAnimationEnd` to unmount after the exit
animation completes — the same pattern native uses with Reanimated's `withTiming` + `runOnJS`.

---

## 8. Dynamic theming

Users can override any `--xui-*` variable in their CSS to customize the theme:

```css
:root {
  --xui-primary: #0ea5e9;       /* sky-500 */
  --xui-primary-fg: #ffffff;
  --xui-primary-bg: #e0f2fe;
}
```

Dark mode is handled automatically when `XUIProvider` detects the system preference and sets
`data-color-scheme="dark"` on `<html>`. Users can also switch themes programmatically by
updating that attribute.

---

## Summary

| Step | File |
|------|------|
| Dependency | `apps/docs/package.json` |
| Transpile | `apps/docs/next.config.ts` |
| CSS import | `apps/docs/app/globals.css` |
| Provider wrapper | `apps/docs/components/providers/xui-provider.tsx` |
| Layout | `apps/docs/app/layout.tsx` |
| Browser frame | `apps/docs/components/ui/browser-preview.tsx` |
| Playground | `apps/docs/app/playground/page.tsx` + `alert-playground.tsx` |
| Navigation | `apps/docs/lib/data/navigation.ts` |

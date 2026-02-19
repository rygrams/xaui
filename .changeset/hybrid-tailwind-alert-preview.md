---
'@xaui/hybrid': patch
---

feat(hybrid): implement Tailwind v4 theming, CSS animations, and Alert component

- Add `useXUIPalette` and `useBorderRadiusStyles` hooks to core for native parity
- Sync `data-color-scheme` on `<html>` via `XUIProvider` for dark mode CSS selectors
- Add `src/styles/xui.css` with `--xui-*` CSS custom properties, `@theme inline` Tailwind v4 token registration, and CSS keyframe animations (`xui-fade-in`, `xui-fade-out`)
- Ship `dist/index.css` via tsup `onSuccess` hook
- Implement hybrid `Alert` component faithful to native: web-adapted types (`CSSProperties`), CSS animation via `data-xui-state` + `onAnimationEnd`, inline SVG icons
- Clean package.json exports (remove non-existent entries)

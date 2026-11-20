# @xaui/tram

## 0.1.0

### First release

- The XAUI components redrawn in the Tram language — Metro, modernised — on the
  `@xaui/native` engine: the same names, slots and props as their Native counterparts, with
  the Tram `variant` (`contained`, `flat`, `outline`, `text`), the twenty Metro accents
  (`accent`) and the `sm` / `md` / `lg` sizes. Each component has its own subpath
  (`@xaui/tram/button`).
- The Metro signature components: `Tile`, `Pivot`, `Panorama`, `AppBar`, `JumpList`, and
  `Page`, the turnstile page transition with `usePageLeave`.
- `TramProvider` (`@xaui/tram/theme`): `XAUIProvider` with the Tram theme — black and white
  grounds, square corners, Selawik — plus the app's own haptics, focus and safe-area hooks.
  `createTramTheme` builds a variant of the theme.
- `@xaui/tram/motion`: the Metro eases, durations and springs, and `useTramMotion`, which
  falls back to a short fade when the user reduces motion.

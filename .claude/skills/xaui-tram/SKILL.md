---
name: xaui-tram
description: Build @xaui/tram — the XAUI components redrawn in the modernised Metro language ("Tram") on top of the @xaui/native engine, plus the Metro-only components (Tile, Pivot, Panorama, AppBar, JumpList). Use for any work in packages/tram, a Tram demo screen, the Tram theme or motion tokens, or when a task mentions Metro, Tram, tiles, pivot or Windows Phone styling.
---

# XAUI — `@xaui/tram`

`@xaui/tram` is **roughly the component set of `@xaui/native`, drawn in Metro**: flat fills,
giant type, a 3 px border, one accent colour, motion that says where you came from. Same
API, different drawing.

Two documents own the detail. Read the relevant part before writing anything:

- `.project-specs/TRAM-PLAN.md` — what the package is, rules TR1–TR9, the phasing.
- `.project-specs/TRAM-DESIGN.md` — the drawing: tokens, sizes, curves, every control. The
  **"Tram" column is the spec**; the "Metro" column is where the identity comes from.

Tram tasks are the `T*` refs of `.project-specs/ROADMAP.md`.

## What Tram is made of

| Layer                      | Comes from                                                          |
| -------------------------- | ------------------------------------------------------------------- |
| Recipe engine, style cache | `@xaui/native/system` — never forked                                |
| Slots, `asChild`, portal   | `@xaui/native/system`                                               |
| Shared hooks               | `@xaui/native` (`useControllableState`, `usePressState`, …)         |
| Theme shape, provider      | `@xaui/native/theme` — `createTheme`, `XAUIProvider`                |
| Theme **values**           | `packages/tram/src/theme/` — `tramTheme`, the Tram-only tokens      |
| Motion tokens              | `packages/tram/src/motion/`                                         |
| Components                 | Written here. None is a wrapper around a Native component.          |

**Share the engine, not the components.** Wrapping `@xaui/native/button` and overriding its
styles is a defect: the Native recipe, its paddings and its press feedback would leak
through. A Tram component has its own recipe, context, root and slots.

Import Native through its entrypoints only — `@xaui/native/system`, `@xaui/native/theme`,
`@xaui/native`. Never a deep path, never Native's private `utils/`. If Tram needs a helper
Native keeps private, promote it into Native's `system/` first (`xaui-system`), in its own
commit.

## The API does not change

Everything in `xaui-component` applies — R1 to R14, the folder shape, the file suffixes.
The reference is `packages/tram/src/components/button/` once T1 has landed; until then it
is the Native `Button` for the shape and `TRAM-DESIGN.md` §Boutons for the drawing.

- **Same name, same slots, same props as the Native component of that name.** Swapping
  `@xaui/native/switch` for `@xaui/tram/switch` should be the whole migration. Open the
  Native component first: it is the contract.
- A prop or slot Native does not have needs a reason in the Metro drawing. One Native has
  and Tram drops is recorded in the roadmap line.
- `displayName` is `'XAUI.Tram.<Component>.<Slot>'`.
- A Metro component with no Native equivalent is **its own component**: `Tile`, `Pivot`,
  `Panorama`, `AppBar`, `JumpList`. `Pivot` is not a `Tabs` variant — Tram ships both.

## The drawing rules

| Rule            | Value                                                                                  |
| --------------- | -------------------------------------------------------------------------------------- |
| Depth           | None. No shadow, no blur, no gradient, no elevation.                                   |
| Radius          | 2 at most. Circles (radio, App Bar button) are the only exception.                     |
| Border          | 3, from `theme.borderWidth`. Small sizes may drop to 2 where the design table says so. |
| Fill            | Flat: `background`, `foreground`, the accent, the discreet `surface`.                  |
| Text on accent  | `onAccent(hex)` — black on lime, yellow, amber. Never assume white.                    |
| Type            | The Tram scale, in roles (`caption` … `hero`). Light / SemiLight for titles.           |
| Touch target    | 48 minimum — `hitSlop` when the drawn control is smaller.                              |
| Pressed         | Metro **inverts** (filled → `foreground` fill; outline → filled), plus scale 0.96.     |
| Text case       | Never transformed by the component.                                                    |
| Card            | The discreet surface only — no border, no shadow. Content sits on the ground.          |

A value comes from the theme or from the Tram tokens. A hex, a duration or a spring config
written inside a component is a defect, with one exception: geometry tables that belong to
a single control (the switch track and thumb per size) live in that component's recipe.

RTL holds as everywhere: `start` / `end`, never `left` / `right`. A pivot header "stuck to
the left" is stuck to the **start**.

## Theme

`tramTheme` is an `XAUIThemeSet` built with `createTheme` — true black ground, radius
capped at 2, border 3, shadows zeroed, `Selawik`. `createTramTheme({ accent })` takes one
of the twenty named accents or a raw colour and computes `accentForeground` with
`onAccent`. `TramProvider` is `XAUIProvider` with `tramTheme` as its default.

- What `XAUITheme` cannot carry lives in `theme/tram-tokens.ts` as hand-written data: the
  twenty accents, the type scale, `tileColumns`, `touchTarget`.
- A knob missing from `XAUIThemeConfig` is added **in Native** (`xaui-theme`) — never a
  second theme type, never a second recipe engine.
- The package ships no font. The app loads Selawik; the theme only names it.
- Light theme is not optional: every screen is checked in dark **and** light.

## Motion

`motion/` exports data and one hook: `ease.metro` `(0.1, 0.9, 0.2, 1)`, `ease.exit`,
`duration` (80 / 250 / 400, `reduced` 150), `spring` (`press`, `navigation`, `tile`), and
`useTramMotion()` which returns the spring or — when the user reduced motion — a 150 ms
fade.

- 100% Reanimated. Every worklet declares `'worklet'`; `scheduleOnRN`, not `runOnJS`.
- Every animation goes through `useTramMotion` or checks `useReducedMotion` itself.
- Springs are interruptible: animate shared values to a target, never a fixed sequence
  that has to finish.
- Tilt, turnstile, continuum, swivel and the content cascade move to `system/` at their
  second use; before that they stay in the component folder.
- `transformOrigin`, `backfaceVisibility` and `perspective` are checked on Android, not
  only on the web demo.
- **No haptic dependency.** Call `useTramHaptic()` at the moment — `haptic('press')` —
  and expose the event (`onPressIn`, `onValueChange`, `onTabChange`). Nothing vibrates
  until the app hands `TramProvider` an `onHaptic`, where it wires `expo-haptics`.

## Not now

Until a task says otherwise (T5):

- No `apps/docs` page, no preview, no `llms.txt` entry.
- No `README.md` — not the package one, not per-folder ones. Native's folder READMEs
  describe the same boundaries.
- No `@xaui/hybrid` re-export of Tram.
- No publish. `package.json` stays `"private": true`, and a Tram-only change carries **no
  changeset**. A change that also touches `@xaui/native` gets Native's patch changeset as
  usual.

## Verifying

A component is verified on its demo screen, `apps/demo/app/tram/<component>.tsx`, under a
`TramProvider` — dark, light, and with reduced motion on. No component, slot, hook or
animation test. Pure functions get a mirrored test: `onAccent`, a header-order helper, a
tile-grid layout computation.

```bash
pnpm --filter @xaui/tram lint
pnpm --filter @xaui/tram type-check
pnpm --filter @xaui/tram test
pnpm worklets:check            # after a build
```

## Per-component loop

1. Read the Native component of the same name — API, slots, states.
2. Read its section of `TRAM-DESIGN.md`. No section: it is drawn from the tokens alone.
3. Types → recipe → context → root → slots.
4. Demo screen, dark and light, reduced motion.
5. Subpath in `package.json` **and** `tsup.config.ts`; export from the barrel.
6. The `T*` roadmap line, in the same commit.
7. `xaui-review`, then the checklist below.

## Review checklist

- [ ] No Native component is wrapped, re-exported or copy-pasted; only `system`, `theme`
      and root hooks are imported, through entrypoints.
- [ ] Names, slots and props match the Native component of the same name; every
      difference is deliberate and recorded.
- [ ] No shadow, blur, gradient; no radius above 2 outside circles.
- [ ] No literal colour, duration or spring in a component; text on accent uses `onAccent`.
- [ ] Pressed state inverts and scales through the recipe's states, not an ad-hoc style.
- [ ] Touch target reaches 48.
- [ ] Reduced motion is honoured; worklets are declared; nothing uses RN's `Animated`.
- [ ] No `left` / `right`.
- [ ] Demo screen checked in dark and light.
- [ ] No docs page, no README, no changeset for a Tram-only change; `private` untouched.
- [ ] Subpath declared in both `package.json` and `tsup.config.ts`; roadmap line updated.

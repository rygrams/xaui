# Icon

An icon, given the size and colour of whatever it sits in. The web renderer of Native's
`Icon`, on the identical API.

## Import

```tsx
import {
  ChevronDownIcon,
  Icon,
  IconContext,
  useIconContext,
} from '@xaui/hybrid/system'
```

`Icon` reads the theme for its fallbacks, so it needs an `XAUIProvider` above it.

## Anatomy

The gap nobody else closes: an icon is a third-party component, so a slot context does not
reach it and every call site ends up computing the colour by hand.

```tsx
<Button variant="danger">
  <Button.Icon as={TrashIcon} />
  <Button.Label>Supprimer</Button.Label>
</Button>
```

Three accepted forms, and the type says which one you are in:

- **`as`** — an icon component. `size` and `color` are injected into it.
- **`children`** — a raw `<svg>` element, cloned with the resolved size and colour.
- **`source`** — an image URL, painted in the resolved colour.

## Usage

### Inside a slot — nothing to pass

```tsx
<Icon as={TrashIcon} />
```

A component root publishes what its icons should be through `IconContext`, so the call site
names the glyph and nothing else. Every icon package whose components take `size` and
`color` fits `as` — Lucide, Heroicons, your own.

### A raw SVG, its baked-in size overridden

```tsx
<Icon>
  <svg viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth={2}
      fill="none"
    />
  </svg>
</Icon>
```

The resolved values win over the element's own `width`, `height` and `color`. An SVG pasted
out of a design tool carries a size baked in, and inheriting the slot's instead is the
entire point of putting it in an `Icon`.

`color` is set as the SVG presentation attribute, so a `stroke="currentColor"` or a
`fill="currentColor"` anywhere inside the element follows it. That is the one thing to get
right in the SVG you paste: a hardcoded `stroke="#000"` will not inherit, here or on
Native.

### An image

```tsx
<Icon source="/glyphs/trash.png" />
<Icon source={{ uri: '/glyphs/trash.png' }} resizeMode="contain" />
```

Where Native takes an `ImageSourcePropType`, the web takes a URL — there is no bundler
`require()` returning an asset number here. The two shapes a Native call site already
writes, a string and a `{ uri }`, both work.

**The image is painted, not displayed.** React Native's `tintColor` recolours an image and
CSS has no such property, so the renderer uses the image as a mask and paints the resolved
colour through it: the glyph comes out in exactly that colour rather than near it, which a
`filter` could not promise. The node is therefore a box, not an `<img>` — an `<img>` would
show its own pixels through the paint. Give it a monochrome glyph with transparency, as you
would on Native.

`tintColor` overrides the resolved colour, and `resizeMode` picks how the glyph fits —
`cover` by default, as on Native.

### Outside any slot

```tsx
<Icon as={TrashIcon} size={32} color="#7c3aed" />
```

Nothing above it is required. With no context, the theme decides.

### The cascade

An explicit prop, else what the surrounding slot published, else the theme:

```tsx
<IconContext.Provider value={{ size: 12, color: '#dc2626' }}>
  <Icon as={TrashIcon} /> {/* 12, #dc2626 — from the context */}
  <Icon as={TrashIcon} size={32} /> {/* 32, #dc2626 — size overridden      */}
</IconContext.Provider>
```

Defaults are `theme.fontSizes.md` and `theme.colors.foreground`. `useIconContext()` reads
what is published, for a component that needs to resolve the same values itself.

## Props

| Prop       | Type                                | Default                   | Notes                      |
| ---------- | ----------------------------------- | ------------------------- | -------------------------- |
| `as`       | `ComponentType<IconComponentProps>` | —                         | An icon component          |
| `children` | `ReactNode`                         | —                         | A raw `<svg>` element      |
| `source`   | `string \| { uri: string }`         | —                         | An image URL               |
| `size`     | `number`                            | `theme.fontSizes.md`      | Overrides the slot's       |
| `color`    | `string`                            | `theme.colors.foreground` | A raw value, never a token |
| `style`    | `StyleProp<ImageStyle>`             | —                         | **`source` only**          |

The three forms are mutually exclusive, and the union enforces it at compile time.

## Why R14 stops at one form

Style props — and `style` — exist on the `source` form alone, because it is the only one
where we render the node. On the other two the node belongs to somebody else: a third
party's component, or the caller's own element. When every form declared the style props,
`<Icon as={Trash2} marginEnd={8} />` compiled and did nothing at all — the prop was dropped
silently, and only a comment said so. Now it is a compile error that points at `size` and
`color`, which are the levers those forms actually have.

Wrapping the other two in a box to make the props work would add a level of depth to every
icon in the library. Style them where you wrote them, or put the margin on the slot.

## Failure

`<Icon />` with no form throws by name rather than rendering nothing:

> XAUI: Icon needs one of `as` (an icon component), a raw `<svg>` element as its child, or
> `source` (an image URL). It renders nothing on its own.

## `ChevronDownIcon`

The one glyph the library ships, rather than requiring an icon package for a chevron:

```tsx
<ChevronDownIcon size={20} color="currentColor" />
```

It takes `IconComponentProps`, so it also goes through `Icon` — `<Icon as={ChevronDownIcon} />`
inherits the slot's size and colour like any other.

## Differences from Native

- `source` is a URL, not an `ImageSourcePropType`.
- The `children` form takes a DOM `<svg>` where Native takes a `react-native-svg` element.
- The `source` form renders a masked box rather than an `Image` with `tintColor`.

Everything else — the three forms, the cascade, the context, the defaults, the failure —
is identical.

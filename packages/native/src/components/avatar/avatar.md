# Avatar

A person or a thing, in a circle.

## Import

```tsx
import { Avatar } from '@xaui/native/avatar'
```

## Anatomy

```tsx
<Avatar>
  <Avatar.Image />
  <Avatar.Fallback>
    <Avatar.Initials />
  </Avatar.Fallback>
</Avatar>
```

- **`Avatar`** — the frame. It resolves the recipe once (R5) and publishes it to its slots.
- **`Avatar.Image`** — the photo. Absolutely positioned over the fallback.
- **`Avatar.Fallback`** — what shows when there is no photo, and what shows behind one that
  is still loading.
- **`Avatar.Initials`** — the letters. The fallback inserts one around a stringifiable
  child, so it is rarely written by hand.

## Usage

The whole component, most of the time:

```tsx
<Avatar>AT</Avatar>
```

With a photo, and initials underneath it:

```tsx
<Avatar>
  <Avatar.Image source={{ uri: user.photo }} />
  <Avatar.Fallback>AT</Avatar.Fallback>
</Avatar>
```

A glyph instead of letters — and it needs no props:

```tsx
<Avatar variant="tertiary">
  <Avatar.Fallback>
    <Icon as={PersonIcon} />
  </Avatar.Fallback>
</Avatar>
```

A logo, squared:

```tsx
<Avatar radius="lg" variant="secondary">
  <Avatar.Image source={require('./logo.png')} />
</Avatar>
```

## Props

### `Avatar`

| Prop      | Type                           | Default     |
| --------- | ------------------------------ | ----------- |
| `variant` | `AvatarVariant` — eleven names | `'default'` |
| `size`    | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'`      |
| `radius`  | `RadiusKey`                    | `'full'`    |
| `color`   | `string` — a raw hex tint (R7) | —           |
| `asChild` | `boolean`                      | `false`     |
| `style`   | `StyleProp<ViewStyle>`         | —           |

### `Avatar.Image`

Every `Image` prop, plus `animation?: boolean` (default `true`) and the `ImageStyle` keys
as props (R14).

### `Avatar.Fallback` · `Avatar.Initials`

Every `View` / `Text` prop, plus that node's style keys as props (R14).

### `variant` colours the frame

The `Chip`'s eleven names, meaning here what they mean there — an avatar is a token _about_
a person or a thing, which is the category the `Chip` established. The three status families
are here because an avatar reports as often as it identifies: a red frame for the account
that failed to sync, a green one for the person who is online.

It is HeroUI's `variant × color` matrix said once. Their `default` is this `default`, and
their `soft` crossed with five colours is `secondary` plus the five `-soft` names.

### `size` sets both sides

Thirty-two, forty, forty-eight and sixty-four — HeroUI's three steps plus the `xs` our
ladder adds below them, which is the size an avatar is inside a `Chip` or a list row. An
avatar is a square before it is a circle, so there is one measurement rather than a width
and a height that can drift apart.

The glyph inside the fallback runs ahead of the initials at the top of the scale — 12, 14,
16, 20 against 12, 12, 14, 16 — because two letters fill a circle that one person-icon has
to sit inside with air around it.

### `radius` — a circle at every size

Where HeroUI fixes one large radius for all three sizes, which makes their small avatars
round and their large ones squircles. `full` says the shape the name means once, and
`radius` is still there for the logo that wants a square.

## Notes

### The fallback is not a state, it is the layer underneath

`Avatar.Image` is absolutely positioned over `Avatar.Fallback`, and an `Image` with nothing
decoded yet draws nothing. So the initials show while the photo loads and **stay if the URL
is wrong** — with no load-state machine, no `onError` to remember, and nothing to get out of
sync. HeroUI runs a status enum for this; a stacking order says the same thing and cannot
disagree with itself.

JSX order between the two is therefore free. Write the image first, as the anatomy reads.

### No default glyph

XAUI publishes no icon set — `@xaui/icons` was deleted in P0 — so the mark is always the
caller's. What `Avatar.Fallback` does instead is publish the frame's resolved size and
colour to `IconContext`, so an `Icon` written inside it needs no props at all.

### The fade

`Avatar.Image` fades in over 200ms on `onLoad` — HeroUI's timing. It runs off a shared value
rather than off a mount animation, because the node has to be mounted from the first render
or it never fetches: the moment worth animating is the decode, not the mount.
`animation={false}` skips it and mounts no worklet.

## Accessibility

No default `accessibilityRole`: a face is an image, and what a screen reader should read is
the name beside it — announcing "image" on every row of a list is noise. Give the avatar an
`accessibilityLabel` when it really is the only label there is.

`Avatar.Initials` is hidden from the reader for the same reason: two letters standing in for
a photo are decoration, and "A T" on every row is noise. Both stay overridable (R9).

## Migration

| Legacy                                   | v1                                                 |
| ---------------------------------------- | -------------------------------------------------- |
| `<Avatar source={photo} />`              | `<Avatar><Avatar.Image source={photo} /></Avatar>` |
| `<Avatar name="Amina" />`                | `<Avatar>AT</Avatar>`                              |
| `<Avatar size={64} />`                   | `<Avatar size="lg" />`                             |
| `<Avatar themeColor="success" />`        | `<Avatar variant="success" />`                     |
| `<Avatar customAppearance={{ text }} />` | `<Avatar.Initials style={…} />` or its style props |

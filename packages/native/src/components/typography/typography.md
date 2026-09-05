# Typography

Text, by the role it plays. Ten roles fix size, line height, weight and family together, so
a heading cannot be set in a body weight and a caption cannot be set in a display size.

## Import

```tsx
import { TextSpan, Typography } from '@xaui/native/typography'
```

## Anatomy

Two components, and neither is a slot of the other.

```tsx
<Typography variant="h4">
  Supprimer <TextSpan fontWeight="700">trois projets</TextSpan>
</Typography>
```

- **`Typography`** — one text node, carrying a role.
- **`TextSpan`** — a bare React Native `Text`, for a fragment styled apart from the text
  around it.

`Typography` publishes no slot and no context. A span is not a slot of a paragraph: React
Native already makes a nested `Text` inherit its parent's font, size, weight and colour, so
`TextSpan` needs nothing from `Typography` to work. Reimplementing that inheritance is
exactly what the legacy `TextSpanContext` did, and it is gone.

## Usage

### Basic

```tsx
<Typography>Trois projets en cours, un archivé.</Typography>
```

`variant` defaults to `body`.

### The roles

```tsx
<Typography variant="h1">Projets</Typography>
<Typography variant="h2">Projets</Typography>
<Typography variant="h3">Projets</Typography>
<Typography variant="h4">Projets</Typography>
<Typography variant="h5">Projets</Typography>
<Typography variant="h6">Projets</Typography>
<Typography variant="body">Trois en cours, un archivé.</Typography>
<Typography variant="body-sm">Trois en cours, un archivé.</Typography>
<Typography variant="body-xs">Trois en cours, un archivé.</Typography>
<Typography variant="code">npm i @xaui/native</Typography>
```

`code` is the one role that is a shape as well as a scale: it sits on the `default` fill,
rounded, padded, and `alignSelf: 'flex-start'` so it hugs the word. A `Text` carrying a
background stretches to its container otherwise, and the fill would paint a band across the
line instead of a chip. The fill is a token and not a role, so `color` on a `code` tints
its ink and leaves the chip neutral — see [Colour](#colour).

`h1`–`h6` name a **step on the scale**, not an HTML tag — React Native has no document
outline. Announcing a heading to a screen reader stays explicit, see
[Accessibility](#accessibility).

There is no `size` prop and no `weight` prop. A role is chosen as a whole, which is what
makes `weight="light"` on a heading, or `size="lg"` on a caption, unwritable rather than
merely discouraged.

### A fragment of a line

```tsx
<Typography variant="h4">
  Supprimer <TextSpan fontWeight="700">trois projets</TextSpan> définitivement
</Typography>
```

A `TextSpan` overrides **only what it names** and inherits the rest. It nests as deep as
you like:

```tsx
<Typography>
  italic,{' '}
  <TextSpan fontStyle="italic">
    then <TextSpan fontWeight="700">bold as well</TextSpan>
  </TextSpan>
</Typography>
```

To change role mid-sentence, nest a `Typography` rather than a `TextSpan` — a span that
named a role would be a `Typography`.

### Colour

```tsx
<Typography color="#7c3aed">a tinted paragraph</Typography>
```

`color` is a **raw value**, never a token. In a text component there is only one thing to
tint, so nothing has to say where it lands. A theme token is passed as the raw value it is:

```tsx
<Typography color={theme.colors.danger}>Suppression définitive</Typography>
```

### Alignment and truncation

Neither has a prop, and neither needs one.

```tsx
<Typography textAlign="center">Centré</Typography>
<Typography numberOfLines={1}>Une seule ligne, puis une ellipse…</Typography>
```

`textAlign` is a `TextStyle` key, so the style props below already expose it. `numberOfLines`
is React Native's own prop, forwarded like every other. A prop of ours would be a second
name for the same thing, and a layer to keep honest.

### Style as props

```tsx
<Typography fontSize={17} letterSpacing={1}>off the scale, and it says so</Typography>
<Typography variant="h5" marginBottom={8}>a heading with room under it</Typography>
```

Full React Native names, full React Native values: `fontSize={17}` is 17 points, never a
step on a scale. They resolve after the role and before `style`.

### As another element

```tsx
<Typography variant="h5" asChild>
  <Link href="/projects">Voir les projets</Link>
</Typography>
```

The child element receives the ref, the role's style and the props.

**It has to render text.** A `View`-based child — a `Pressable`, say — takes a `fontSize`
it cannot use, and breaks the `Text` inheritance a nested `TextSpan` depends on. For a
press on text, `Text` carries its own `onPress`:

```tsx
<Typography variant="h5" asChild>
  <Text onPress={open}>a Text with its own onPress</Text>
</Typography>
```

### Everything else goes through `style`

A gradient, a shadow, a text decoration colour: `style`. It is applied last and wins over
everything above.

## Props

### `Typography`

| Prop      | Type                                                                                         | Default  | Notes                                                  |
| --------- | -------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------ |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body' \| 'body-sm' \| 'body-xs' \| 'code'` | `'body'` | The role: size, line height, weight and family at once |
| `color`   | `string`                                                                                     | —        | A raw tint (`'#7c3aed'`), never a token (R7)           |
| `asChild` | `boolean`                                                                                    | `false`  | The child element becomes the text node (R12)          |
| `style`   | `StyleProp<TextStyle>`                                                                       | —        | Applied last, wins over the role and the style props   |

Plus every `TextStyle` key as a prop (R14), minus the directional keys R13 bans and the
names above, and every `TextProps` React Native defines — `numberOfLines`, `ellipsizeMode`,
`selectable`, `onPress`, `testID`, the accessibility props.

### `TextSpan`

| Prop      | Type                   | Default | Notes                                    |
| --------- | ---------------------- | ------- | ---------------------------------------- |
| `asChild` | `boolean`              | `false` | The child element becomes the span (R12) |
| `style`   | `StyleProp<TextStyle>` | —       | Applied last                             |

Plus every `TextStyle` key as a prop and every `TextProps`. **No `variant`, on purpose** —
see [Anatomy](#anatomy).

## The role table

| `variant` | size       | line height | weight   | family  |
| --------- | ---------- | ----------- | -------- | ------- |
| `h1`      | `4xl` · 36 | 40          | bold     | heading |
| `h2`      | `3xl` · 30 | 36          | bold     | heading |
| `h3`      | `2xl` · 24 | 32          | bold     | heading |
| `h4`      | `xl` · 20  | 28          | semibold | heading |
| `h5`      | `lg` · 18  | 28          | semibold | heading |
| `h6`      | `md` · 16  | 24          | semibold | heading |
| `body`    | `md` · 16  | 24          | regular  | body    |
| `body-sm` | `sm` · 14  | 20          | regular  | body    |
| `body-xs` | `xs` · 12  | 16          | regular  | body    |
| `code`    | `sm` · 14  | 20          | regular  | mono    |

`h1`–`h3` are tracked slightly tighter than the rest: the letter spacing that keeps 14pt
legible reads as loose and unset at 36.

`code` is the one role that names a fill as well as ink — inline code reads as code by
sitting on a surface rather than by its font alone.

## Accessibility

A `Text` announces as text, so the component sets **no** `accessibilityRole` default —
setting one would override whatever a caller's element brought through `asChild`.

Because `h1`–`h6` name a step on the scale rather than a document outline, a heading a
screen reader should announce as one says so:

```tsx
<Typography variant="h3" accessibilityRole="header">
  Projets
</Typography>
```

## Migration from legacy

| Legacy                                  | v1                                                       |
| --------------------------------------- | -------------------------------------------------------- |
| `<Typography variant="displayLarge">`   | `<Typography variant="h1">`                              |
| `<Typography variant="headlineMedium">` | `<Typography variant="h3">`                              |
| `<Typography variant="bodyMedium">`     | `<Typography>`                                           |
| `<Typography variant="bodySmall">`      | `<Typography variant="body-sm">`                         |
| `size` + `weight` props                 | the role alone — the combination is chosen, not composed |
| `<TextSpan color fontWeight …>`         | the same keys, now every `TextStyle` key (R14)           |
| `<TextSpan align="left">`               | `textAlign` — `left` and `right` are gone (R13)          |
| `TextSpanContext`                       | removed — React Native's own `Text` inheritance does it  |

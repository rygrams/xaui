# Typography

Text, by the role it plays. The web renderer of Native's `Typography` and `TextSpan`, on
the identical API: ten roles that fix size, line height, weight and family together, so a
heading cannot be set in a body weight and a caption cannot be set in a display size.

## Import

```tsx
import { TextSpan, Typography } from '@xaui/hybrid/typography'
```

Both components read the theme, so they need a provider above them:

```tsx
import { XAUIProvider } from '@xaui/hybrid/theme'
;<XAUIProvider>
  <App />
</XAUIProvider>
```

Without it the hook throws by name — `useXAUITheme must be used within <XAUIProvider>` —
rather than rendering unstyled text.

## Anatomy

Two components, and neither is a slot of the other.

```tsx
<Typography variant="h4">
  Supprimer <TextSpan fontWeight="700">trois projets</TextSpan>
</Typography>
```

- **`Typography`** — one `<span>`, carrying a role.
- **`TextSpan`** — a bare `<span>`, for a fragment styled apart from the text around it.

`Typography` publishes no slot and no context. CSS inheritance already gives a nested span
its parent's font, size, weight and colour, so `TextSpan` needs nothing from `Typography`
to work — the same reason it needs nothing on Native, where the nested `Text` inherits.

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
<Typography variant="code">npm i @xaui/hybrid</Typography>
```

`code` is the one role that is a shape as well as a scale: it sits on the `default` fill,
rounded, padded, and `align-self: flex-start` so it hugs the word instead of painting a
band across the line. The fill is a token and not a role, so `color` on a `code` tints its
ink and leaves the chip neutral — see [Colour](#colour).

`h1`–`h6` name a **step on the scale, not an HTML tag**. They all render a `<span>`, which
is deliberate: a component cannot know whether a given line is a section heading in the
page's outline. Say it explicitly — see [Accessibility](#accessibility) — or render the
real element with [`asChild`](#as-another-element).

There is no `size` prop and no `weight` prop. A role is chosen as a whole, which is what
makes `weight="light"` on a heading unwritable rather than merely discouraged.

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
const theme = useXAUITheme()

<Typography color={theme.colors.danger}>Suppression définitive</Typography>
```

Hex only (`#rgb` or `#rrggbb`). The contrasted and soft slices of a tint are derived in
OKLab, which cannot read `rgba()` or a named colour; transparency goes in `style`.

### Alignment and truncation

Neither has a prop, and neither needs one.

```tsx
<Typography textAlign="center">Centré</Typography>
<Typography numberOfLines={1}>Une seule ligne, puis une ellipse…</Typography>
<Typography numberOfLines={3}>Trois lignes, puis une ellipse…</Typography>
```

`textAlign` is a text-style key, so the style props below already expose it.
`numberOfLines` keeps its React Native name and meaning here: one line becomes
`text-overflow: ellipsis`, several become a `-webkit-line-clamp`. `ellipsizeMode="clip"`
cuts instead of eliding.

### Style as props

```tsx
<Typography fontSize={17} letterSpacing={1}>off the scale, and it says so</Typography>
<Typography variant="h5" marginBottom={8}>a heading with room under it</Typography>
```

**React Native names, React Native values** — this is the part that surprises a web
developer first. `fontSize={17}` is 17 CSS pixels, not a step on a scale and not an `em`:
each length is converted against the document root, so a nested component never inherits a
parent's text size as its unit. Write `marginStart`, not `marginLeft` — the directional
keys are banned, and the logical property is what keeps the layout right in RTL.

They resolve after the role and before `style`.

### As another element

`asChild` hands the role's style, the ref and the props to your element. It is how a
heading becomes a real `<h2>`, and how a role lands on a link:

```tsx
<Typography variant="h2" asChild>
  <h2>Projets</h2>
</Typography>

<Typography variant="h5" asChild>
  <a href="/projects">Voir les projets</a>
</Typography>
```

The child keeps its own attributes, and its `style` and `className` are merged rather than
replaced — the child wins on any key both sides set. Prefer this over
`accessibilityRole="header"` when the page really has an outline: an `<h2>` is a heading to
a screen reader, to the browser's own navigation and to the document itself.

### Pressing text

```tsx
<Typography variant="body-sm" onPress={openDetails}>
  Voir le détail
</Typography>
```

`onPress` keeps its Native name and becomes a click. The span is given `tabindex="0"` and
also fires on `Enter` and `Space`, so the behaviour is not mouse-only. For a real control —
anything that should look and announce as a button — reach for `Button` or `asChild` with
your own element instead; this is for a press on a line of text.

### Everything else goes through `style`

A gradient, a shadow, a text decoration: `style`. It is applied last and wins over
everything above. It takes **React Native keys** too, and accepts an array:

```tsx
<Typography style={{ textDecorationLine: 'underline' }}>souligné</Typography>
<Typography style={[base, isActive && { opacity: 1 }]}>composé</Typography>
```

## Props

### `Typography`

| Prop      | Type                                                                                         | Default  | Notes                                                  |
| --------- | -------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------ |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body' \| 'body-sm' \| 'body-xs' \| 'code'` | `'body'` | The role: size, line height, weight and family at once |
| `color`   | `string`                                                                                     | —        | A raw hex tint (`'#7c3aed'`), never a token            |
| `asChild` | `boolean`                                                                                    | `false`  | The child element becomes the text node                |
| `style`   | `StyleProp<TextStyle>`                                                                       | —        | Applied last, wins over the role and the style props   |

Plus every text-style key as a prop, minus the directional keys and the names above, and
the Native text props — `numberOfLines`, `ellipsizeMode`, `selectable`, `onPress`,
`testID`, the accessibility props.

`ref` is an `HTMLElement`. Handlers receive React DOM events.

### `TextSpan`

| Prop      | Type                   | Default | Notes                              |
| --------- | ---------------------- | ------- | ---------------------------------- |
| `asChild` | `boolean`              | `false` | The child element becomes the span |
| `style`   | `StyleProp<TextStyle>` | —       | Applied last                       |

Plus every text-style key as a prop and the same Native text props. **No `variant`, on
purpose** — see [Anatomy](#anatomy).

## The role table

Sizes are the Native points, and they are the rendered CSS pixels at a default root.

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

`h1`–`h3` are tracked slightly tighter than the rest: the letter spacing that keeps 14px
legible reads as loose and unset at 36.

`heading` and `body` resolve to the **same system stack** by default — the roles differ by
size and weight, not by face, until a theme gives `heading` a display family of its own.
`mono` is `ui-monospace` with the platform faces behind it.

## Accessibility

A `<span>` announces as text, so the component sets **no** role by default — setting one
would override whatever a caller's element brought through `asChild`.

Because a role names a step on the scale rather than a place in the document outline, a
heading says so:

```tsx
<Typography variant="h3" accessibilityRole="header">
  Projets
</Typography>
```

`accessibilityRole` keeps its Native spelling and maps to the ARIA role — `header` becomes
`role="heading"`, `image` becomes `img`, `togglebutton` becomes `button`. Where the page has
a real outline, `asChild` with an `<h3>` is better than the ARIA role: it carries the level
with it.

`accessibilityLabel`, `accessibilityHint`, `accessibilityState` and `accessibilityValue`
map to `aria-label`, `aria-description`, and the matching `aria-*` attributes. The plain
`aria-*` props are accepted too and win over their Native spelling.

## Server rendering

The provider resolves `colorMode="system"` from `prefers-color-scheme`, which a server
cannot read: it renders **light** and switches on hydration. Pass an explicit
`colorMode="light"` or `"dark"` when the server already knows the answer — from a cookie,
say — and the markup will match.

## Differences from Native

The API is identical; only what the platform makes impossible to share differs.

- `ref` is an `HTMLElement`, not a `Text`.
- Handlers receive React DOM events. `onPress` is also keyboard-reachable.
- Props naming an iOS or Android mechanism — `dynamicTypeRamp`, `adjustsFontSizeToFit`,
  `lineBreakStrategyIOS` — stay accepted so the same source compiles against either
  package, and are dropped before the DOM rather than forwarded as unknown attributes.
- `fontFamily` takes a CSS font stack where Native takes a family name.

For migration from a legacy component, see the Native page — the legacy mapping is the
same, and it is documented once.

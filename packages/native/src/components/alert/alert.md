# Alert

A message the interface has to make sure is read — an outcome, a warning, a failure.

## Import

```tsx
import { Alert } from '@xaui/native/alert'
```

## Anatomy

```tsx
<Alert>
  <Alert.Icon />
  <Alert.Content>
    <Alert.Title />
    <Alert.Description />
  </Alert.Content>
  <Alert.Close />
</Alert>
```

- **`Alert`** — the root. A `View` with `accessibilityRole="alert"`, laid out as a row of
  three columns. It resolves the recipe once and publishes the resolved styles to its
  slots. A string child is wrapped in an `Alert.Description` automatically.
- **`Alert.Icon`** — the mark of what the message is. It takes the alert's size and colour
  without being told either. **It renders a box**, unlike `Button.Icon` and `Chip.Icon`:
  an alert's icon sits beside a block of text, and lining the glyph up with the first
  line's cap-height means offsetting it by half the leading — which needs a node.
- **`Alert.Content`** — the middle column, and the one that takes the width the other two
  leave. It exists because the root is a row: without it the title and the description
  would be laid out _beside_ the icon rather than under each other.
- **`Alert.Title`** — the heading. It wraps; `numberOfLines` is a prop for a title that
  has to fit a row.
- **`Alert.Description`** — the message. It sits behind the title on a fraction of the
  title's own colour.
- **`Alert.Close`** — the dismiss affordance, and **the only control an alert contains**.

**No slot carries a margin** (R4). What separates the three columns is the root's `gap`,
and what separates the title from its description is the content's own — so JSX order is
screen order and a leading cross is a matter of where you wrote the slot.

**The alert is never a control.** There is no `isPressable` and no press behaviour on the
type: an alert reports, and what you press is its `Alert.Close`.

## Usage

### Basic

```tsx
<Alert>Le fichier dépasse la taille autorisée.</Alert>

<Alert variant="success-soft">
  <Alert.Icon as={CheckIcon} />
  <Alert.Content>
    <Alert.Title>Facture payée</Alert.Title>
    <Alert.Description>Le reçu part par courriel dans un instant.</Alert.Description>
  </Alert.Content>
</Alert>
```

### Dismissible

```tsx
<Alert variant="danger-soft">
  <Alert.Icon as={WarningIcon} />
  <Alert.Content>
    <Alert.Title>Connexion perdue</Alert.Title>
    <Alert.Description>
      Les modifications sont enregistrées localement.
    </Alert.Description>
  </Alert.Content>
  <Alert.Close accessibilityLabel="Fermer l’alerte" onPress={dismiss} />
</Alert>
```

The alert does not hide itself. Mounting is the caller's, which is why there is no
`isVisible`, no `onVisibleChange` and no exit animation baked in — a component that
unmounts itself cannot be animated out by whatever holds it.

### An action inside the message

```tsx
<Alert variant="secondary">
  <Alert.Icon as={InfoIcon} />
  <Alert.Content>
    <Alert.Title>Mise à jour disponible</Alert.Title>
    <Alert.Description>Une nouvelle version est prête.</Alert.Description>
    <Button size="sm" alignSelf="flex-start" marginTop={4}>
      Redémarrer
    </Button>
  </Alert.Content>
</Alert>
```

### Single line

```tsx
<Alert variant="success-soft" alignItems="center">
  <Alert.Icon as={CheckIcon} paddingTop={0} />
  <Alert.Content>
    <Alert.Title>Profil mis à jour</Alert.Title>
  </Alert.Content>
</Alert>
```

The root aligns its columns to the top, because an alert's message can run to three lines
and an icon floating beside the middle of a paragraph reads as decoration. An alert with
no description centres itself with one style prop, and drops the icon's optical offset
with another.

### An icon that disagrees with its alert

```tsx
<Alert>
  <Alert.Icon as={CheckIcon} color={theme.colors.success} />
  <Alert.Content>
    <Alert.Title>Profil enregistré</Alert.Title>
  </Alert.Content>
</Alert>
```

This is HeroUI's alert written out: a neutral surface with the status carried by the icon
alone. There it is what `status` does; here the variant decides both the surface and the
foreground, so an icon that has to disagree says so with a raw `color` (R7).

### As another element

```tsx
<Alert asChild>
  <Animated.View entering={FadeInDown}>…</Animated.View>
</Alert>
```

The caller's element **is** the alert, so the auto-wrap does not apply — write the slots
yourself inside it.

### Sizes

`size` drives the padding, the gaps, the radius and the type — **never a height**. An
alert is a surface: it is as tall as the message it carries.

| `size` | Padding | Gap | Title | Description | Icon | Icon offset |
| ------ | ------- | --- | ----- | ----------- | ---- | ----------- |
| `xs`   | 8       | 8   | 12/16 | 12/16       | 14   | 1           |
| `sm`   | 10      | 10  | 14/20 | 12/16       | 16   | 2           |
| `md`   | 12      | 12  | 16/24 | 14/20       | 18   | 3           |
| `lg`   | 16      | 14  | 18/28 | 16/24       | 20   | 4           |

`md` is HeroUI's alert measured: 12pt of padding, a 12pt gap, a 24pt radius, a 16/24 title
above a 14/20 description, an 18pt icon. The icon's offset is **half the title's leading**
rather than their hard-coded 3.5px — it lands on the same 3 at `md`, and stays right at
the other three sizes.

### Variants

Nine names. An alert is the one component that is **both** a surface and a report, so it
takes the `Card`'s vocabulary for its neutral level and the `Chip`'s for the rest.

| `variant`      | Background    | Text                    | Shadow |
| -------------- | ------------- | ----------------------- | ------ |
| `default`      | `surface`     | `surfaceForeground`     | yes    |
| `primary`      | `accent`      | `accentForeground`      | —      |
| `secondary`    | `accentSoft`  | `accentSoftForeground`  | —      |
| `success`      | `success`     | `successForeground`     | —      |
| `success-soft` | `successSoft` | `successSoftForeground` | —      |
| `warning`      | `warning`     | `warningForeground`     | —      |
| `warning-soft` | `warningSoft` | `warningSoftForeground` | —      |
| `danger`       | `danger`      | `dangerForeground`      | —      |
| `danger-soft`  | `dangerSoft`  | `dangerSoftForeground`  | —      |

`default` is the `Card`'s `default`, token for token — the surface fill and the surface
shadow, which is HeroUI's alert root exactly. The elevation belongs to that one variant: a
tinted alert already separates itself by its fill, and a shadow under it would read as dirt.

`tertiary` and `ghost` are absent: an alert without a surface is a paragraph. The outlined
alert is `default` with `borderWidth` and `borderColor` as style props.

**The icon takes the title's colour**, not a status colour of its own — on a `danger` alert
the readable colour is the one the title already uses, and on a `danger-soft` one that token
_is_ the red.

### Colour

```tsx
<Alert color="#7c3aed">
  <Alert.Icon as={InfoIcon} />
  <Alert.Content>
    <Alert.Title>Sprint 12 ouvert</Alert.Title>
  </Alert.Content>
</Alert>
```

A raw tint, never a token (R7). It paints the fill, and its OKLab-contrasted slice paints
the title, the icon and the cross — so a brand-coloured alert stays readable without being
told a second colour. It resolves outside the style cache, which is why it must be a hex
value.

### Style as props

Every node takes its own style keys as props (R14) — full React Native names, full React
Native values, no hidden scale:

```tsx
<Alert alignItems="center" maxWidth={480}>
  <Alert.Icon paddingTop={0} />
  <Alert.Content gap={2}>
    <Alert.Title letterSpacing={0.2}>…</Alert.Title>
  </Alert.Content>
</Alert>
```

### Everything else goes through `style`

- **A gradient fill, a tinted shadow, a coloured left edge** — the variant names one token
  for the surface, and a second one is not a variant.
- **`overflow: 'hidden'`** is not set on the root, deliberately: on iOS it clips the node's
  own shadow, and a `default` alert would lose the elevation its variant just gave it.

## Props

### `Alert`

Everything `View` accepts, every `ViewStyle` key it does not already claim (R14), plus:

| Prop                      | Type                                | Default     | Notes                                                       |
| ------------------------- | ----------------------------------- | ----------- | ----------------------------------------------------------- |
| `variant`                 | `AlertVariant`                      | `'default'` | The nine names above                                        |
| `size`                    | `'xs' \| 'sm' \| 'md' \| 'lg'`      | `'md'`      | Padding, gaps, radius, type. Never a height                 |
| `radius`                  | `RadiusKey`                         | —           | Overrides the radius `size` implies                         |
| `color`                   | `string`                            | —           | A hex tint, placed by the variant                           |
| `isDisabled`              | `boolean`                           | `false`     | Dims, and reaches the close inside                          |
| `asChild`                 | `boolean`                           | `false`     | Merge into the single child instead of rendering            |
| `accessibilityRole`       | `AccessibilityRole`                 | `'alert'`   | Overridable                                                 |
| `accessibilityLiveRegion` | `'none' \| 'polite' \| 'assertive'` | `'polite'`  | Android announces it on change. `'none'` for a static alert |

### `Alert.Icon`

The three forms of `Icon` — `as`, a raw SVG child, `source` — plus the `ViewStyle` keys of
its box as props (R14). `size` and `color` default to what the root resolved.

**No default glyph**, where HeroUI ships three. XAUI publishes no icon set — `@xaui/icons`
was deleted in P0 — so the icon is always yours, and the alert's job is to size and colour
it rather than to choose it.

### `Alert.Content`

Everything `View` accepts, plus the `ViewStyle` keys as props (R14). It takes the width the
icon and the close leave.

### `Alert.Title`, `Alert.Description`

Everything `Text` accepts, plus the `TextStyle` keys as props (R14). Both wrap.

### `Alert.Close`

Everything the shared `CloseButtonBase` accepts — `accessibilityRole` is `'button'` and
`hitSlop` is `8` by default, and `isDisabled` falls back to the alert's. With no children it
draws its own cross, so a dismissible alert works in a project that has installed no icon
set.

## Accessibility

- The root is `accessibilityRole="alert"` and `accessibilityLiveRegion="polite"` by
  default: on Android an alert that _appears_ announces itself instead of waiting to be
  found, and queues behind whatever is being read rather than cutting it off. An alert that
  is part of the page rather than a response to something sets `'none'`.
- **`Alert.Close` needs an `accessibilityLabel`**, and warns in development without one. A
  cross is not text, and the title beside it names the message, not the action.
- **The icon is decoration.** An alert whose meaning is carried only by its colour or its
  glyph is unreadable to a screen reader and to anyone who does not distinguish the hue —
  put it in the title.
- `Title` and `Description` are real `Text`, so they are read in order and they reflow at
  large font sizes rather than truncating.

## Migration from `@xaui/native-legacy`

| Legacy                            | v1                                                            |
| --------------------------------- | ------------------------------------------------------------- |
| `title="…"`                       | `<Alert.Title>…</Alert.Title>`                                |
| `description="…"`                 | `<Alert.Description>…</Alert.Description>`, or a string child |
| `icon={<X />}`                    | `<Alert.Icon as={X} />` — sized and coloured by the alert     |
| `hideIcon`                        | removed — do not write the slot                               |
| `themeColor="success"`            | `variant="success-soft"` (or `"success"` for the solid fill)  |
| `themeColor="primary"`            | `color={theme.colors.accent}`                                 |
| `variant="flat"` / `"faded"`      | the `-soft` slice                                             |
| `variant="solid"`                 | the full slice: `variant="danger"`                            |
| `variant="bordered"`              | `variant="default"` + `borderWidth` / `borderColor`           |
| `variant="glass"`                 | removed — a theme, not an alert prop. Out of 1.0              |
| `radius={8}`                      | `radius="sm"`, or `borderRadius={8}` as a style prop          |
| `isClosable` / `closeButton`      | `<Alert.Close />` — composed, so you place it                 |
| `isVisible` / `onVisibleChange`   | removed — the caller mounts and unmounts the alert            |
| `onClose`                         | `onPress` on `Alert.Close`                                    |
| `style`                           | `style` on the root                                           |
| `titleStyle` / `descriptionStyle` | `style` on `Alert.Title` / `.Description`                     |
| `children`                        | anything inside `Alert.Content`, after the description        |

# Select

A field that opens a list. It is the `TextField`'s twin: the same `field*` tokens, the
same four levels, the same heights — so the two sit in a form and read as one control.

## Import

```tsx
import { Select } from '@xaui/native/select'
```

## Anatomy

```tsx
<Select>
  <Select.Trigger>
    <Select.Value />
    <Select.Indicator />
  </Select.Trigger>
  <Select.Overlay />
  <Select.Content>
    <Select.Label>…</Select.Label>
    <Select.Item value="…">
      <Select.ItemLabel>…</Select.ItemLabel>
      <Select.ItemDescription>…</Select.ItemDescription>
      <Select.ItemIndicator />
    </Select.Item>
  </Select.Content>
</Select>
```

- **`Select`** — state and resolved style. **It renders no node.**
- **`Select.Trigger`** — the control. The field the user sees, and the only node a `ref`
  can reach.
- **`Select.Value`** — what is chosen, or the placeholder until something is.
- **`Select.Indicator`** — the chevron, turning on a spring with the list.
- **`Select.Overlay`** — the backdrop. Optional, and what closes the list on an outside
  press.
- **`Select.Content`** — the list, positioned against the trigger and rendered in a portal.
- **`Select.Label`** — a heading over a run of rows.
- **`Select.Item`** — one row.
- **`Select.ItemLabel`** / **`Select.ItemDescription`** — its two lines.
- **`Select.ItemIndicator`** — the check on the chosen row.

**The root renders no node**, which is where this component differs from every other one
in the library. `ref`, `style`, `testID`, the a11y props and R14's style props are all on
`Select.Trigger`: the trigger is the control, and a wrapper view around it would exist
only to receive props the field already takes.

`Select.Overlay` and `Select.Content` render into the nearest `PortalHost` rather than
where they are written. Their place in the JSX says **when** they exist, not where they
appear.

## Usage

### Basic

```tsx
<Select onValueChange={setLocale}>
  <Select.Trigger>
    <Select.Value placeholder="Choisir une langue" />
    <Select.Indicator />
  </Select.Trigger>
  <Select.Overlay />
  <Select.Content>
    <Select.Item value="fr">Français</Select.Item>
    <Select.Item value="en">English</Select.Item>
  </Select.Content>
</Select>
```

A stringifiable child becomes the row's label (R3), and that same string is what the
trigger shows once the row is chosen — the label is written once.

### Composed rows

```tsx
<Select.Item value="fr" label="Français">
  <View>
    <Select.ItemLabel>Français</Select.ItemLabel>
    <Select.ItemDescription>La langue par défaut</Select.ItemDescription>
  </View>
  <Select.ItemIndicator />
</Select.Item>
```

`label` is what the trigger shows. It is needed as soon as the children are not one
string: an avatar and two lines of text have no single label to infer.

The labels are read off the **elements**, before any row mounts. That matters because the
list lives in a portal that only exists while it is open — without it, a select with a
`defaultValue` would show its placeholder until the user had opened it once. A row wrapped
in a component of your own is not reachable that way, and `children` on `Select.Value` is
the answer for that case.

### Controlled

```tsx
const [value, setValue] = useState('fr')

<Select value={value} onValueChange={setValue}>…</Select>
```

Open state is controllable the same way, with `isOpen` / `onOpenChange`. Which half is
controlled is decided on the first render and then held — a component that changes hands
mid-life produces a bug nobody can read from the call site.

### Placement

```tsx
<Select.Content placement="top" align="start" width="content-fit" offset={12} />
```

`width` defaults to `'trigger'`, because a list wider than the control it drops out of
reads as a different surface. `'content-fit'` hugs the longest label instead, bounded by
the screen insets.

`avoidCollisions` is on by default: the list flips to the other side when the one it was
asked for does not fit. It flips only when the other side has strictly **more** room, so
a list two points short stays where it was put rather than jumping.

### No backdrop

```tsx
<Select>
  <Select.Trigger>…</Select.Trigger>
  {/* no Select.Overlay */}
  <Select.Content>…</Select.Content>
</Select>
```

Omit `Select.Overlay` and only a choice closes the list. That is the answer for a select
inside a sheet that already dims its own background.

### Style as props

```tsx
<Select.Trigger paddingHorizontal={20} borderRadius={8} />
<Select.Content backgroundColor="#111" padding={8} />
<Select.ItemLabel fontSize={18} />
```

Full RN names, full RN values (R14). Every node takes them — the trigger, the panel, the
overlay, each row and each of its texts.

### Everything else goes through `style`

A gradient panel, a tinted shadow, a transform — `style` is the last word and wins over
everything above it.

## Props

### `Select`

| prop            | type                        | default   | description                             |
| --------------- | --------------------------- | --------- | --------------------------------------- |
| `variant`       | `SelectVariant`             | `primary` | The field's four emphasis levels        |
| `size`          | `'sm' \| 'md' \| 'lg'`      | `md`      | The **control's** scale, not the list's |
| `radius`        | `RadiusKey`                 | —         | Overrides the field radius              |
| `color`         | `string`                    | —         | The tint (R7) — a raw value             |
| `value`         | `string`                    | —         | Controlled selection                    |
| `defaultValue`  | `string`                    | —         | Uncontrolled selection                  |
| `onValueChange` | `(value: string) => void`   | —         | Fires on every choice                   |
| `isOpen`        | `boolean`                   | —         | Controlled open state                   |
| `defaultOpen`   | `boolean`                   | `false`   | Uncontrolled open state                 |
| `onOpenChange`  | `(isOpen: boolean) => void` | —         | Fires on open and on close              |
| `isDisabled`    | `boolean`                   | `false`   | Dims the trigger, stops the press       |
| `isInvalid`     | `boolean`                   | `false`   | Moves the border to `danger`            |

### `Select.Trigger`

Everything `Pressable` takes, plus `ViewStyle` as props. `asChild` renders the caller's
element as the control.

### `Select.Value`

`placeholder`, plus everything `Text` takes and `TextStyle` as props. Single-line by
default: a value long enough to wrap would grow a control whose height is fixed.

### `Select.Indicator`

`as`, `size`, `color`. Defaults to the chevron this component ships.

### `Select.Overlay`

`isDismissable` (default `true`), plus `ViewProps` and `ViewStyle` as props. It paints
nothing until a `backgroundColor` says so.

### `Select.Content`

| prop              | type                                   | default     |
| ----------------- | -------------------------------------- | ----------- |
| `placement`       | `'top' \| 'bottom'`                    | `bottom`    |
| `align`           | `'start' \| 'center' \| 'end'`         | `center`    |
| `width`           | `number \| 'trigger' \| 'content-fit'` | `trigger`   |
| `offset`          | `number`                               | `8`         |
| `alignOffset`     | `number`                               | `0`         |
| `avoidCollisions` | `boolean`                              | `true`      |
| `insets`          | `SelectInsets`                         | `12` a side |

### `Select.Item`

`value` (required), `label`, `isDisabled`, `asChild`. `children` may be a function taking
`{ isSelected, isPressed, isDisabled }`, which is the escape hatch for a row that paints
its own selected state instead of showing the check.

### `Select.Label` · `Select.ItemLabel` · `Select.ItemDescription`

Everything `Text` takes, plus `TextStyle` as props. The label truncates; the description
wraps, because the thing it exists to carry is the sentence a label was too short for.

### `Select.ItemIndicator`

`as`, `size`, `color`. Its 20-point box renders on every row and only the glyph comes and
goes, so choosing never shifts a label.

## Motion

Three animations, HeroUI's values throughout.

**The chevron** turns 0 → −180° on a spring: damping 140, stiffness 1000, mass 4. Heavily
damped against a very high stiffness, so it arrives in about a fifth of a second and does
not overshoot — an oscillating chevron reads as a bug rather than as motion. It is a
worklet, so it keeps turning while JavaScript mounts the rows.

**The panel** grows out of the trigger: 200 ms in from `scale: 0.95` and eight points
offset **towards** the trigger, so a list below enters upwards and one above enters
downwards. Exit mirrors it at 150 ms — closing is an acknowledgement, not an arrival, and
a dismissal as long as the opening feels like the control is arguing.

**The overlay** fades on the same two durations.

**The measuring pass.** The panel mounts invisibly for one frame to learn how tall it
wants to be, then places itself and plays its entrance. Without it `avoidCollisions` has
nothing to compare, and a list that does not fit below would open downwards off the
screen.

## Accessibility

The trigger is a `button` carrying `expanded`, so a screen reader announces whether the
list is open. Rows are `menuitem` and carry `selected`. `Select.Label` is a `header`, so
the group it opens is announced with it. The overlay announces nothing at all — it is the
absence of the list, and "button" spoken over the whole screen is worse than silence.

## The portal

`Select.Overlay` and `Select.Content` need a `PortalHost`. `XAUIProvider` mounts one, so
there is nothing to do. An app that needs the host elsewhere — under a gesture root, or
inside its own navigation container — sets `hasPortalHost={false}` on the provider and
mounts a `PortalHost` itself.

Without a host anywhere, `Portal` renders nothing: the select opens onto an empty screen
with no error. That silence is why the provider mounts one by default.

## Migration from `@xaui/native-legacy`

The legacy component is `Select`, with `SelectItem`.

| Legacy                       | v1                                              |
| ---------------------------- | ----------------------------------------------- |
| `<SelectItem value label />` | `<Select.Item value label>` with its own slots  |
| `label="…"` on the root      | a `TextField.Label` beside it, or your own text |
| `placeholder="…"`            | `placeholder` on `<Select.Value>`               |
| `variant="colored"`          | `variant="primary"`                             |
| `variant="light"`            | `variant="secondary"`                           |
| `variant="bordered"`         | `variant="tertiary"`                            |
| `themeColor="primary"`       | `color={theme.colors.accent}`                   |
| `selectionMode="multiple"`   | not in v1 — one value, one control              |
| `customAppearance={{ … }}`   | `style` on the slot that key named              |

**`selectionMode` is gone.** A select that returns several values is a different control
with a different affordance, and calling both by one name is what made the legacy props
list as long as it is. It comes back as its own component or not at all.

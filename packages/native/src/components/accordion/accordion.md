# Accordion

A list of rows that open. Replaces the legacy `ExpansionPanel`.

## Import

```tsx
import { Accordion } from '@xaui/native/accordion'
```

## Anatomy

```tsx
<Accordion>
  <Accordion.Item value="…">
    <Accordion.Trigger>
      …
      <Accordion.Indicator />
    </Accordion.Trigger>
    <Accordion.Content>…</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

- **`Accordion`** — the container. Holds what is open, resolves every slot's style, and
  draws the separators between its children.
- **`Accordion.Item`** — one row. It owns the height animation, because the height that
  changes is the row's.
- **`Accordion.Trigger`** — the part you press. Carries `expanded` for a screen reader.
- **`Accordion.Indicator`** — the chevron, turning with the panel.
- **`Accordion.Content`** — the panel. Mounted when open, absent when not.

## Usage

### Basic

```tsx
<Accordion defaultValue="shipping">
  <Accordion.Item value="shipping">
    <Accordion.Trigger>
      Livraison
      <Accordion.Indicator />
    </Accordion.Trigger>
    <Accordion.Content>
      <Text>Sous trois jours ouvrés.</Text>
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
```

A stringifiable child of the trigger is wrapped in a `Text` for you (R3) and takes the
type the recipe put on the row. Anything else is yours to place — the trigger is a row of
views, and a bare string in one is a crash on React Native.

### Several at a time

```tsx
<Accordion selectionMode="multiple" defaultValue={['a', 'b']}>
  …
</Accordion>
```

The value becomes a list, in the order the rows were opened.

### Always one open

```tsx
<Accordion defaultValue="a" isCollapsible={false}>
  …
</Accordion>
```

Pressing the open row refuses rather than closing it, and `onValueChange` never fires for
a change that did not happen. That is a set of tabs wearing an accordion.

### A row that paints its own state

```tsx
<Accordion.Item value="a">
  {({ isExpanded }) => (
    <>
      <Accordion.Trigger>
        <Text style={{ color: isExpanded ? accent : foreground }}>Facturation</Text>
        <Accordion.Indicator />
      </Accordion.Trigger>
      <Accordion.Content>…</Accordion.Content>
    </>
  )}
</Accordion.Item>
```

The escape hatch for a row whose whole appearance changes when it opens, without wiring
`useAccordionItem` yourself.

### Controlled

```tsx
const [value, setValue] = useState('a')

<Accordion value={value} onValueChange={next => setValue(next as string)}>…</Accordion>
```

Which half is controlled is decided on the first render and then held — a component that
changes hands mid-life produces a bug nobody can read from the call site.

### Style as props

```tsx
<Accordion borderRadius={8} />
<Accordion.Trigger paddingVertical={20} />
<Accordion.Content paddingBottom={24} />
```

Full RN names, full RN values (R14). Every node takes them.

### Everything else goes through `style`

A gradient container, a tinted shadow, a transform — `style` is the last word.

## Props

### `Accordion`

| prop            | type                              | default  | description                              |
| --------------- | --------------------------------- | -------- | ---------------------------------------- |
| `variant`       | `AccordionVariant`                | `ghost`  | The `Card`'s four levels                 |
| `size`          | `'xs' \| 'sm' \| 'md' \| 'lg'`    | `md`     | Row inset, gap and type                  |
| `radius`        | `RadiusKey`                       | —        | Overrides the container radius           |
| `color`         | `string`                          | —        | The tint (R7) — a raw value              |
| `selectionMode` | `'single' \| 'multiple'`          | `single` | One row open, or as many as asked        |
| `value`         | `string \| readonly string[]`     | —        | Controlled                               |
| `defaultValue`  | `string \| readonly string[]`     | —        | Uncontrolled                             |
| `onValueChange` | `(value: AccordionValue) => void` | —        | Fires only on an actual change           |
| `isDisabled`    | `boolean`                         | `false`  | Dims the container, stops every row      |
| `isCollapsible` | `boolean`                         | `true`   | Whether the open row can be closed       |
| `hasSeparator`  | `boolean`                         | `true`   | The hairline between rows                |
| `asChild`       | `boolean`                         | `false`  | Renders the caller's element as the root |

### `Accordion.Item`

`value` (required), `isDisabled`. `children` may be a function taking
`{ isExpanded, isDisabled, value }`.

### `Accordion.Trigger`

Everything `Pressable` takes, plus `ViewStyle` as props. `asChild` renders the caller's
element as the row.

### `Accordion.Indicator`

`as`, `size`, `color`. Defaults to the chevron the library ships from `system/icon`.

### `Accordion.Content`

Everything `View` takes, plus `ViewStyle` as props.

## Motion

**The height is never measured.** The panel is mounted or it is not, and Reanimated's
layout transition animates the row between the two — `LinearTransition.springify()` on
HeroUI's numbers, damping 140 against stiffness **1600**. Stiffer than the chevron's 1000
on purpose: a height is a longer distance than a rotation, and at the chevron's stiffness
the same damping makes a long panel take almost half a second to settle.

Measuring it ourselves would mean a hidden pass on every open, and a panel whose content
grows afterwards — an image loading, a list filling — would be stuck at the height it had
when it was measured. `overflow: 'hidden'` on the row is what turns the mounted panel into
one unrolling rather than content drawn outside its row from the first frame.

The container carries the same transition. Without it the accordion's own height jumps to
its new total in one frame while the rows inside it are still animating.

**The content fades**, 200 ms each way. The height is already moving underneath it, and
two things travelling at once reads as the panel fighting itself.

**The chevron** turns 0 → −180° on the `Select`'s spring — damping 140, stiffness 1000,
mass 4. It is a worklet, so it keeps turning while the panel's content mounts.

## The four levels

| ours        | HeroUI    | fill               |
| ----------- | --------- | ------------------ |
| `primary`   | `surface` | `surface`          |
| `secondary` | —         | `surfaceSecondary` |
| `tertiary`  | —         | a border, no fill  |
| `ghost`     | `default` | none — the default |

The tokens are the `Card`'s — an accordion in `primary` **is** a card with rows in it, and
two containers that look alike but are declared apart drift. Only the names differ, and
they differ on purpose: the ladder descends in one direction, which `default` sitting in
the middle of the `Card`'s order does not.

## The separators

Drawn by the root, **between** its children — never by a row. A row that drew its own
would draw one under the last item too, and every accordion would start by hiding it.

They are built from `Children.toArray`, which drops nulls, so a conditionally rendered row
cannot leave a hairline hanging where nothing is.

In `primary`, `secondary` and `tertiary` the container is inset from its own edge and the
separators are inset with it. `ghost` has no edge to be inset from, so its rows run the
full width and the hairline runs with them — the difference between a list on a page and a
list in a box.

## Accessibility

The trigger is a `button` carrying `expanded`, which is the only thing telling a screen
reader whether the panel under it is open: the chevron says nothing out loud.

## Migration from `@xaui/native-legacy`

The legacy components are `ExpansionPanel` and `ExpansionPanelItem`.

| Legacy                     | v1                                             |
| -------------------------- | ---------------------------------------------- |
| `<ExpansionPanel>`         | `<Accordion>`                                  |
| `<ExpansionPanelItem>`     | `<Accordion.Item value="…">`                   |
| `title="…"`                | a stringifiable child of `<Accordion.Trigger>` |
| the item's `children`      | `<Accordion.Content>`                          |
| `isExpanded` per item      | `value` / `defaultValue` on the root           |
| `allowMultiple`            | `selectionMode="multiple"`                     |
| `themeColor="primary"`     | `color={theme.colors.accent}`                  |
| `customAppearance={{ … }}` | `style` on the slot that key named             |

**The open state moves to the root.** Legacy asked each item whether it was open, which is
what made "only one at a time" the caller's problem. One value on the container is what
`selectionMode` needs to mean anything.

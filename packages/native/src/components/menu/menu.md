# Menu

A list of actions, anchored to whatever opened it. The `Popover`'s positioning with rows in
it.

## Import

```tsx
import { Menu } from '@xaui/native/menu'
```

## Anatomy

```tsx
<Menu>
  <Menu.Trigger>…</Menu.Trigger>
  <Menu.Overlay />
  <Menu.Content>
    <Menu.Label>…</Menu.Label>
    <Menu.Group>
      <Menu.Item>
        <Menu.ItemIndicator />
        <Menu.ItemTitle>…</Menu.ItemTitle>
        <Menu.ItemDescription>…</Menu.ItemDescription>
      </Menu.Item>
    </Menu.Group>
  </Menu.Content>
</Menu>
```

- **`Menu`** — state and resolved style. **It renders no node.**
- **`Menu.Trigger`** — what opens it, and the rectangle it anchors to.
- **`Menu.Overlay`** — the backdrop, and what closes it on a press outside.
- **`Menu.Content`** — the panel, positioned against the trigger, in a portal.
- **`Menu.Label`** — a heading over a run of rows.
- **`Menu.Group`** — that run, announced as a group.
- **`Menu.Item`** — one action.
- **`Menu.ItemTitle`** / **`Menu.ItemDescription`** — its two lines.
- **`Menu.ItemIndicator`** — a fixed box at either end of a row.

## Usage

### Basic

```tsx
<Menu>
  <Menu.Trigger asChild>
    <Button variant="tertiary">Actions</Button>
  </Menu.Trigger>
  <Menu.Overlay />
  <Menu.Content>
    <Menu.Item onPress={rename}>
      <Menu.ItemTitle>Renommer</Menu.ItemTitle>
    </Menu.Item>
    <Menu.Item variant="danger" onPress={remove}>
      <Menu.ItemTitle>Supprimer</Menu.ItemTitle>
    </Menu.Item>
  </Menu.Content>
</Menu>
```

Choosing a row closes the menu, **after** the caller's `onPress` has run: a handler that
reads the menu's state has to run while there is still a menu.

### A row that does not close

```tsx
<Menu.Item closesOnPress={false} onPress={() => setCount(n => n + 1)}>
  <Menu.ItemTitle>Encore une</Menu.ItemTitle>
</Menu.Item>
```

For a row that toggles something the reader will want to toggle again.

### Headings and groups

```tsx
<Menu.Label>Ce document</Menu.Label>
<Menu.Group>
  <Menu.Item>…</Menu.Item>
</Menu.Group>
```

Neither draws anything. What separates two groups is the heading over the second one, and
a rule as well would be saying it twice.

### Style as props

```tsx
<Menu.Content padding={8} />
<Menu.Item paddingVertical={12} />
<Menu.ItemTitle fontSize={18} />
```

Full RN names, full RN values (R14). Every node takes them.

## Props

### `Menu`

| prop           | type                        | default | description                  |
| -------------- | --------------------------- | ------- | ---------------------------- |
| `radius`       | `RadiusKey`                 | —       | Overrides the panel's corner |
| `isOpen`       | `boolean`                   | —       | Controlled                   |
| `defaultOpen`  | `boolean`                   | `false` | Uncontrolled                 |
| `onOpenChange` | `(isOpen: boolean) => void` | —       | Fires on open and on close   |
| `isDisabled`   | `boolean`                   | `false` | Dims the trigger, stops it   |

There is no `variant` on the root. A menu is the theme's floating surface, like the
`Popover`. The intent belongs to the **row**.

### `Menu.Content`

The `Popover.Content` props exactly — `placement` (four sides), `align`, `width`, `offset`,
`alignOffset`, `avoidCollisions`, `insets` — with one difference: `offset` defaults to
**6** rather than 9, because a menu belongs to the control it drops out of and a popover
belongs to nothing.

### `Menu.Item`

| prop            | type                    | default   | description                         |
| --------------- | ----------------------- | --------- | ----------------------------------- |
| `variant`       | `'default' \| 'danger'` | `default` | Paints the title and its icon       |
| `isDisabled`    | `boolean`               | `false`   |                                     |
| `closesOnPress` | `boolean`               | `true`    | Whether choosing it closes the menu |
| `asChild`       | `boolean`               | `false`   |                                     |

`children` may be a function taking `{ isPressed, isDisabled }`.

### `Menu.ItemTitle` · `Menu.ItemDescription` · `Menu.Label`

Everything `Text` takes, plus `TextStyle` as props. The title carries the row's intent and
takes the row's width, so an indicator stays pinned to the end whatever the label's length.
The description stays **muted whatever the intent**: a `danger` row says what it does in
red once, and a red sentence under it says it twice.

### `Menu.ItemIndicator`

A fixed 20-point box. Its size does not depend on what is in it, so two rows whose
indicators differ still line their titles up. It renders nothing on its own, unlike the
`Select`'s — a menu has no selected row to mark.

## What it shares

The positioning is the `Popover`'s, hook for hook: `utils/placement.ts`,
`hooks/use-anchor-ref.ts`, `hooks/use-anchored-position.ts`, `system/anchored/`. This is
the third component to read them, after the `Select` and the `Popover`.

## Not here yet

**`SubMenu`.** HeroUI ships it as its own component and it needs a second anchored panel
whose trigger is a row of the first — worth its own change rather than a corner of this one.

## Accessibility

The trigger is a `button` carrying `expanded`. Rows are `menuitem`, groups are `menu`, and
`Menu.Label` is a `header` so the group it opens is announced with it. The overlay announces
nothing — it is the absence of the menu.

## Migration from `@xaui/native-legacy`

The legacy component is `Menu`, with `MenuItem`.

| Legacy                     | v1                                        |
| -------------------------- | ----------------------------------------- |
| `<MenuItem title="…" />`   | `<Menu.Item><Menu.ItemTitle>…`            |
| `description="…"`          | `<Menu.ItemDescription>`                  |
| `isDestructive`            | `variant="danger"`                        |
| `icon={…}`                 | an `<Icon>` inside `<Menu.ItemIndicator>` |
| `customAppearance={{ … }}` | `style` on the slot that key named        |

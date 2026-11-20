# Menu

A list of actions anchored to whatever opened it, drawn as the Metro context menu: a band in
the theme's contrast colour, the width of the screen, set against its trigger, with large
light rows and no line, shadow or corner.

The band swivels in on the edge it shares with the trigger and its rows arrive in a cascade.
With `Menu.Overlay`, the ground is dimmed everywhere but over the trigger, and a focused
`Page` recedes behind it while the trigger stays in front, in place and at its size.

## Import

```tsx
import { Menu } from '@xaui/tram/menu'
```

## Anatomy

```tsx
<Menu>
  <Menu.Trigger />
  <Menu.Overlay />
  <Menu.Content>
    <Menu.Label />
    <Menu.Group>
      <Menu.Item>
        <Menu.ItemIndicator />
        <Menu.ItemTitle />
        <Menu.ItemDescription />
      </Menu.Item>
    </Menu.Group>
    <Menu.Separator />
  </Menu.Content>
</Menu>
```

- **`Menu`** — the open state and the resolved styles. It renders no node.
- **`Menu.Trigger`** — what opens it. It paints nothing of its own: with `asChild` it is your
  element, and a string is set in `body`. It is wrapped in one view, the one that stays in
  front while the page recedes.
- **`Menu.Overlay`** — the dimmed ground, and what closes the menu on a touch outside.
  Optional: without it nothing is dimmed, nothing recedes and a touch outside closes
  nothing.
- **`Menu.Content`** — the band, in a `Modal`. Each child is one step of the cascade, in the
  order written.
- **`Menu.Label`** — a heading over a run of rows, in the band's quieter ink.
- **`Menu.Group`** — that run, announced as a group.
- **`Menu.Separator`** — a gap of 12 between two runs. It draws no line.
- **`Menu.Item`** — one action.
- **`Menu.ItemTitle`** — its title. It takes the row's intent and wraps rather than cutting.
- **`Menu.ItemDescription`** — a second line, in the band's quieter ink.
- **`Menu.ItemIndicator`** — a fixed box of 24 at either end of a row, for a check or a
  glyph, so titles line up whatever it holds.

## Usage

### Basic

```tsx
<Menu>
  <Menu.Trigger asChild>
    <Button variant="outline">actions</Button>
  </Menu.Trigger>
  <Menu.Overlay />
  <Menu.Content>
    <Menu.Item onPress={rename}>
      <Menu.ItemTitle>rename</Menu.ItemTitle>
    </Menu.Item>
    <Menu.Separator />
    <Menu.Item variant="danger" onPress={remove}>
      <Menu.ItemTitle>delete</Menu.ItemTitle>
    </Menu.Item>
  </Menu.Content>
</Menu>
```

Choosing a row closes the menu after its `onPress` has run. `closesOnPress={false}` keeps it
open, for a row the reader will want to press again.

### The context menu

```tsx
<Menu>
  <Menu.Trigger asChild opensOn="longPress">
    <ListBox.ItemButton onPress={() => open(mail)}>{/* … */}</ListBox.ItemButton>
  </Menu.Trigger>
  <Menu.Overlay />
  <Menu.Content>
    <Menu.Item onPress={() => reply(mail)}>
      <Menu.ItemTitle>reply</Menu.ItemTitle>
    </Menu.Item>
  </Menu.Content>
</Menu>
```

With `opensOn="longPress"`, the element keeps its own press — the row still opens the mail —
and the menu opens on a hold.

### Headings and indicators

```tsx
<Menu.Content>
  <Menu.Label>sort by</Menu.Label>
  <Menu.Group>
    {sorts.map(item => (
      <Menu.Item
        key={item.id}
        accessibilityRole="radio"
        accessibilityState={{ checked: item.id === sort }}
        onPress={() => setSort(item.id)}
      >
        <Menu.ItemTitle>{item.label}</Menu.ItemTitle>
        <Menu.ItemIndicator>
          {item.id === sort ? <Icon as={CheckIcon} /> : null}
        </Menu.ItemIndicator>
      </Menu.Item>
    ))}
  </Menu.Group>
</Menu.Content>
```

### Placement

`placement` on `Menu.Content` is `bottom` (the default) or `top`. The band takes the other
side when it only fits there, and the roomier side, scrolled, when it fits on neither. It
always keeps clear of the screen's edges and of the safe area handed to `TramProvider`.

For a menu that must be answered, `isDismissable={false}` on `Menu.Overlay`: neither a
touch outside nor the system's back closes it.

## Variants

`variant` on `Menu.Item` is the row's intent: `default` writes the title in the band's ink,
`danger` in the danger ink, on the band. Nothing else changes. A disabled row has a grey
title and does not move.

## Accessibility

- `Menu.Content` is a `menu` and a modal view; the focus moves to it when it opens and back
  to the trigger when it closes.
- `Menu.Item` is a `menuitem`, `Menu.Group` a `menu`, `Menu.Label` a `header`; the role
  stays overridable, as in the radio rows above. The separator is hidden.
- The trigger is a `button`. With `opensOn="longPress"` the hold is offered to a screen
  reader as an action.
- A row presses with a tilt and a `press` haptic; the hold that opens a context menu is felt
  as a `longPress`.
- With motion reduced, the ground fades, the page stays where it is and the rows do not
  lean.

## Differences from Native

- **`opensOn`** is added on `Menu.Trigger`: `press` by default, or `longPress`.
- **The trigger** is wrapped in one view, the one that stays in front.
- **`placement`** is `top` or `bottom` only.
- **`align`, `width`, `offset`, `alignOffset`, `avoidCollisions` and `insets`** are dropped:
  the band runs the width of the screen, touches its trigger and always avoids the edges.
- **`radius`** is kept so the two roots take the same props, and draws nothing.
- **`Menu.ItemTitle`** wraps instead of staying on one line.
- **The band** is drawn in a `Modal`, not a portal.

# List

Rows on a ground.

## Import

```tsx
import { List } from '@xaui/native/list'
```

## Usage

```tsx
<List>
  <List.Item onPress={openWifi}>
    <List.ItemPrefix>
      <Icon as={WifiIcon} />
    </List.ItemPrefix>
    <List.ItemContent>
      <List.ItemTitle>Wi-Fi</List.ItemTitle>
      <List.ItemDescription>Maison</List.ItemDescription>
    </List.ItemContent>
    <List.ItemSuffix>
      <Switch isSelected={isOn} onSelectedChange={setOn} size="sm" />
    </List.ItemSuffix>
  </List.Item>
</List>
```

## Anatomy

| slot                   | what it is                                             |
| ---------------------- | ------------------------------------------------------ |
| `List`                 | The ground, and the thing that draws the separators    |
| `List.Item`            | One row                                                |
| `List.ItemPrefix`      | What leads it — an icon, an avatar, a checkbox         |
| `List.ItemContent`     | The text column, and what pushes the suffix to the end |
| `List.ItemTitle`       | What the row is                                        |
| `List.ItemDescription` | What it is currently set to, usually                   |
| `List.ItemSuffix`      | What trails it — a value, a switch, a chevron          |

## It is the `Accordion` with rows that do not open

Same ladder, same separator inset, same one variant lifted. That is deliberate: a list in
`primary` **is** a card with rows in it, and two containers that look alike but are declared
apart drift until a list on a card sits one shade off it.

They will eventually share a container — the `Surface` refactor that `Card`, `Popover`,
`Accordion` and `Dialog` are all waiting on. Until then they at least name the same tokens.

## The separators are the root's

Drawn **between** the children rather than by them. A row that drew its own would draw one
under the last row too, and every list would start by hiding it.

The fill is the root's for the same reason: a row that painted its own would stack two fills
where the hairline sits, and the hairline would disappear into the seam.

The hairline stops where the text starts rather than running the full width — a separator
under a row's own inset reads as a rule the rows hang off, where one that starts with them
reads as the gap between two rows, which is what it is.

`ghost` has no edge for its separators to be inset from, so its rows run the full width and
the hairline runs with them. That is the difference between a list in a box and a list on a
page.

`hasSeparator={false}` leaves the rows to run together.

## It does not select

There is **no `selectionMode` and no `selectedKeys`**. Picking one of several things is what
`Select` and `Menu` are; a list that owned a selection would be a second, quieter menu with
none of the affordances.

A row that toggles carries the control that toggles it:

```tsx
<List.Item>
  <List.ItemContent>
    <List.ItemTitle>Wi-Fi</List.ItemTitle>
  </List.ItemContent>
  <List.ItemSuffix>
    <Switch isSelected={isOn} onSelectedChange={setOn} size="sm" />
  </List.ItemSuffix>
</List.Item>
```

which says out loud what it does, and is reachable by a screen reader as the control it
actually is.

## The suffix draws nothing of its own

HeroUI's puts a chevron there by default. The trailing end of a settings row is a `Switch`
at least as often, and a slot that guesses makes you pass a child in order to render
nothing. The library ships `ChevronDownIcon`; a row that wants one says so.

## A row's role follows its handler

`List.Item` is a `PressableFeedback` whether or not you give it an `onPress` — a row with
nothing to do simply has nothing to do — but it announces itself as a **button only when it
has a handler**. A screen reader offering to activate a line that does nothing is worse than
saying nothing at all. `accessibilityRole` stays overridable (R9).

`isDisabled` on the root stops every row; on a row it stops that one.

The root announces itself as a `list`. That is overridable too — a list of one row is a row,
and a list used as a plain container is neither.

## Props

| prop           | type                                                | default   | description                  |
| -------------- | --------------------------------------------------- | --------- | ---------------------------- |
| `variant`      | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost'` | `primary` | Which ground                 |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg'`                      | `md`      | Inset, type and corner       |
| `radius`       | `RadiusKey`                                         | —         | Overrides the corner         |
| `color`        | `string`                                            | —         | The tint (R7) — a raw value  |
| `hasSeparator` | `boolean`                                           | `true`    | Hairlines between the rows   |
| `isDisabled`   | `boolean`                                           | `false`   | Stops every row              |
| `asChild`      | `boolean`                                           | `false`   | Renders the caller's element |

## Two layers, and one of them is a platform constraint

The root carries the shadow and the border and must **not** clip: on iOS
`overflow: 'hidden'` sets `masksToBounds`, which cuts the layer's own shadow off with
everything else, and a lifted `primary` would have none.

So the clipping is one layer in. It is the only extra node in this component, and without it
the press wash on the first and last rows paints square over the container's rounded corner.
The `Accordion` carries the same pair, for the same reason.

## Everything else is a style prop

`padding`, `gap`, `backgroundColor` — full RN names, full RN values (R14), on the root and on
every slot. There is nothing here a prop had to be invented for.

# List

Rows on a ground.

## Import

```tsx
import { List, ListGroup } from '@xaui/native/list'
```

One import, because they are one component and a group with no lists in it is nothing.
`List.Group` is the same object as `ListGroup`, for a call site that already has `List`.

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
| `List.Item`            | One row, inert                                         |
| `List.ItemButton`      | One row you can press, in place of `List.Item`         |
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

## A plain row does nothing, and shows nothing

**A list is not necessarily a list of buttons.** Most of them are a table of facts: a value
beside a label, a switch that is its own control. `List.Item` is therefore a `View` — no
press state, no wash, no role — because a row that lights up under a finger it never
responds to is a promise the component does not keep.

A row you can press is `List.ItemButton`, used **in place of** `List.Item`:

```tsx
<List>
  <List.Item>
    <List.ItemContent>
      <List.ItemTitle>Wi-Fi</List.ItemTitle>
    </List.ItemContent>
    <List.ItemSuffix>
      <Switch isSelected={isOn} onSelectedChange={setOn} size="sm" />
    </List.ItemSuffix>
  </List.Item>

  <List.ItemButton onPress={openSecurity}>
    <List.ItemContent>
      <List.ItemTitle>Sécurité</List.ItemTitle>
    </List.ItemContent>
  </List.ItemButton>
</List>
```

It is the same row — same inset, same slots, same separators around it — plus the two things
a plain row must not have: the wash under the finger and the `button` to announce.

**Structural rather than inferred.** A single `Item` that turned pressable when it was given
an `onPress` would still be guessing, and the guess would be invisible in the JSX: two rows
that read identically would behave differently. Which of the two a row is, the JSX says.

`isDisabled` on the root stops every `ItemButton`; on one of them it stops that one.
`accessibilityRole` stays overridable (R9).

The root announces itself as a `list`. That is overridable too — a list of one row is a row,
and a list used as a plain container is neither.

## `ListGroup` — the sectioned list

```tsx
<ListGroup>
  <ListGroup.Section>
    <ListGroup.Header>Réseau</ListGroup.Header>
    <List>
      <List.Item>
        <List.ItemContent>
          <List.ItemTitle>Wi-Fi</List.ItemTitle>
        </List.ItemContent>
        <List.ItemSuffix>
          <Switch isSelected={isOn} onSelectedChange={setOn} />
        </List.ItemSuffix>
      </List.Item>
    </List>
    <ListGroup.Footer>Le Wi-Fi se coupe en veille.</ListGroup.Footer>
  </ListGroup.Section>

  <ListGroup.Section>
    <ListGroup.Header>Confidentialité</ListGroup.Header>
    <List>…</List>
  </ListGroup.Section>
</ListGroup>
```

**It is a group of lists, not a list with headings in it.** A `List` draws its container and
its separators **between its own children**, so a heading placed among the rows would get a
hairline above and below it and would sit inside the card it names. Sections are containers
side by side; a heading belongs outside them.

**`ListGroup.Section` exists because proximity is the only thing grouping a header with its
list** — nothing draws a box around a section. One gap on the group would put a heading
exactly as far from its own rows as from the section above it, so there are two gaps, on the
two roots that own them (R4). The ratio is the whole design.

**The header is inset by the row's own padding**, read off the `List`'s size table rather
than guessed, so the heading and the text it heads share a left edge. `ListGroup.Footer` is
inset with it — the sentence under a settings block that says what the switch actually does.

**Nothing is walked and nothing is counted.** The group publishes two gaps and a type scale;
the sections are ordinary children, and a section can be built out of something that is not
a `List` at all.

### What the group hands down

`variant`, `size`, `radius`, `color` and `hasSeparator` are **defaults**, and a list that
names its own wins: a settings screen is uniform, and setting `variant` on five lists is
five chances to set it differently. `isDisabled` is the one that is not a default — a
disabled group has no live list in it.

```tsx
<ListGroup variant="tertiary" size="sm" color="#7c3aed">
  <ListGroup.Section>
    <ListGroup.Header>Du groupe</ListGroup.Header>
    <List>…</List>
  </ListGroup.Section>
  <ListGroup.Section>
    <ListGroup.Header>À elle</ListGroup.Header>
    <List variant="primary">…</List>
  </ListGroup.Section>
</ListGroup>
```

A `List` outside any group is unchanged.

### Alignment with `heroui-native`

Their `ListGroup` **is our `List`** — a Surface container with Item · ItemPrefix ·
ItemContent · ItemTitle · ItemDescription · ItemSuffix, slot for slot. What is here under
that name is the thing neither of us had: the sections, their headings and the spacing
between them. Two components rather than one renamed, because a settings screen is a column
of lists and a list is a column of rows, and those are two different columns.

### `ListGroup` props

Everything `View` accepts, every `ViewStyle` key it does not claim (R14), plus:

| prop           | type                                                | default | description                   |
| -------------- | --------------------------------------------------- | ------- | ----------------------------- |
| `variant`      | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost'` | —       | Default for every list        |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg'`                      | `md`    | Gaps, heading type, the inset |
| `radius`       | `RadiusKey`                                         | —       | Default for every list        |
| `color`        | `string`                                            | —       | Default for every list        |
| `hasSeparator` | `boolean`                                           | —       | Default for every list        |
| `isDisabled`   | `boolean`                                           | `false` | Every list, and none opts out |
| `asChild`      | `boolean`                                           | `false` | Renders the caller's element  |

`ListGroup.Section` takes `View`'s props, `ListGroup.Header` and `ListGroup.Footer` take
`Text`'s, all three plus their style props (R14). `useListGroup()` is exported (R10).

`ListGroup.Header` carries `accessibilityRole="header"`, overridable — that is what lets a
screen reader jump between sections. The footer carries none: a footnote is prose, and
announcing it as a heading would put it in the list a reader jumps between.

## Props

| prop           | type                                                | default   | description                    |
| -------------- | --------------------------------------------------- | --------- | ------------------------------ |
| `variant`      | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost'` | `primary` | Which ground                   |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg'`                      | `md`      | Inset, type and corner         |
| `radius`       | `RadiusKey`                                         | —         | Overrides the corner           |
| `color`        | `string`                                            | —         | The tint (R7) — a raw value    |
| `hasSeparator` | `boolean`                                           | `true`    | Hairlines. The group's, in one |
| `isDisabled`   | `boolean`                                           | `false`   | Stops every row                |
| `asChild`      | `boolean`                                           | `false`   | Renders the caller's element   |

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

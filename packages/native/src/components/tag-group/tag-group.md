# TagGroup

A wrapping set of tags you can turn on, and take off.

## Import

```tsx
import { TagGroup } from '@xaui/native/tag-group'
```

## Anatomy

```tsx
<TagGroup>
  <TagGroup.List>
    <TagGroup.Item id="…">
      <TagGroup.ItemLabel>…</TagGroup.ItemLabel>
      <TagGroup.ItemRemoveButton />
    </TagGroup.Item>
  </TagGroup.List>
</TagGroup>
```

- **`TagGroup`** — what is selected, what is disabled, and every slot's resolved style.
- **`TagGroup.List`** — the wrapping row.
- **`TagGroup.Item`** — one tag.
- **`TagGroup.ItemLabel`** — its text.
- **`TagGroup.ItemRemoveButton`** — takes it off.

## This is not a row of `Chip`s

A **chip** is a piece of metadata that is always the same. A **tag** is one you can turn on,
take off, or both.

The selection state and the removal are the component; the pill around them is the least of
it. That is also why the two do not share a recipe — a chip has ten variants because it
reports an intent, and a tag has two grounds because it reports nothing at all until it is
selected.

## Usage

### Selectable

```tsx
<TagGroup selectionMode="multiple" defaultSelectedKeys={['fr']}>
  <TagGroup.List>
    <TagGroup.Item id="fr">Français</TagGroup.Item>
  </TagGroup.List>
</TagGroup>
```

A stringifiable child becomes the label (R3). `selectionMode` is `'none'` by default: a
group of tags is a set of labels until you say otherwise.

### Removable

```tsx
<TagGroup onRemove={id => setTags(t => t.filter(x => x !== id))}>
  <TagGroup.Item id="fr">
    <TagGroup.ItemLabel>Français</TagGroup.ItemLabel>
    <TagGroup.ItemRemoveButton accessibilityLabel="Retirer Français" />
  </TagGroup.Item>
</TagGroup>
```

**The cross renders nothing without an `onRemove`.** Removing a tag is your list changing,
and a cross that appeared to work while the list stayed put would be worse than one that is
plainly not there.

It is also written out rather than drawn by the item, because a tag you can turn on and a
tag you can take off are different controls and most groups are only one of the two.

### Style as props

```tsx
<TagGroup.List gap={12} />
<TagGroup.Item paddingHorizontal={16} />
<TagGroup.ItemLabel fontSize={15} />
```

Full RN names, full RN values (R14). Every node takes them.

## Props

### `TagGroup`

| prop                  | type                                | default   |
| --------------------- | ----------------------------------- | --------- |
| `variant`             | `'default' \| 'surface'`            | `default` |
| `size`                | `'sm' \| 'md' \| 'lg'`              | `md`      |
| `radius`              | `RadiusKey`                         | —         |
| `color`               | `string`                            | —         |
| `selectionMode`       | `'none' \| 'single' \| 'multiple'`  | `none`    |
| `selectedKeys`        | `readonly string[]`                 | —         |
| `defaultSelectedKeys` | `readonly string[]`                 | —         |
| `onSelectionChange`   | `(keys: readonly string[]) => void` | —         |
| `onRemove`            | `(id: string) => void`              | —         |
| `disabledKeys`        | `readonly string[]`                 | `[]`      |
| `isDisabled`          | `boolean`                           | `false`   |
| `isDeselectable`      | `boolean`                           | `true`    |

### `TagGroup.Item`

`id` (required), `isDisabled`, `asChild`. `children` may be a function taking
`{ isSelected, isPressed, isDisabled }`.

## Two grounds, not two emphases

`default` is the theme's neutral fill; `surface` is the card colour. **They swap** so a tag
never disappears into what is behind it — a group on a card wants `default`, a group on the
page wants `surface`.

A selected tag leaves both and takes the accent's soft slice, which is the only place this
component uses colour.

## Wrapping is the point

A tag group is a set of the same kind of thing, and a set that scrolls sideways hides how
many of it there are — which is the one fact a reader wants from a row of tags.

## The selection rule

One pure function, and it returns the list **unchanged** whenever a press changes nothing:
`'none'` refuses every press, `'single'` on the already-selected tag clears it unless that
would empty a group the caller asked to keep one. `useControllableState` drops a set to the
value it already holds, so `onSelectionChange` never fires for a change that did not happen.

Ten tests cover it.

## Accessibility

The list is a `list`, each tag a `button` carrying `selected` and `disabled`. The cross
takes the tag's own `isDisabled` — a disabled tag that can still be removed is not disabled
— and warns in development when it has no `accessibilityLabel`, because a cross announces
as nothing on its own.

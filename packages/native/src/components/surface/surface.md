# Surface

A ground for other things to sit on.

## Import

```tsx
import { Surface } from '@xaui/native/surface'
```

## Usage

```tsx
<Surface>
  <Typography>Sur le fond de la page</Typography>
  <Surface variant="secondary">Et un cran dedans</Surface>
</Surface>
```

**One node and no slots**, which is the point: a surface is a fill, a corner and some
padding, and every other component in this library that needed those three has been writing
them out again.

## It is not a `Card`

A card has **decided things for you**. It is always lifted, it has a header, a body and a
footer, and its levels carry an emphasis.

A surface has decided nothing: the levels are a ladder, the shadow is asked for, and what
goes on it is entirely yours. Reach for a card when the thing is a card; reach for a surface
when you need a ground.

## A ladder, not four emphases

| variant     | fill               | typical place              |
| ----------- | ------------------ | -------------------------- |
| `primary`   | `surface`          | on the page                |
| `secondary` | `surfaceSecondary` | inside a `primary`         |
| `tertiary`  | `surfaceTertiary`  | inside a `secondary`       |
| `ghost`     | none               | padding and a corner alone |

A surface reports nothing — it is the thing other reporting sits on — so the levels say
**where** something belongs rather than how loud it is. Three is as deep as that reading
survives; a fourth would be a shade nobody could place.

`ghost` is not a level but the absence of one.

## Props

| prop         | type                           | default   | description                  |
| ------------ | ------------------------------ | --------- | ---------------------------- |
| `variant`    | `SurfaceVariant`               | `primary` | Which ground                 |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg'` | `md`      | Padding, gap and corner      |
| `radius`     | `RadiusKey`                    | —         | Overrides the corner         |
| `color`      | `string`                       | —         | The tint (R7) — a raw value  |
| `isElevated` | `boolean`                      | see below | Whether it is lifted         |
| `asChild`    | `boolean`                      | `false`   | Renders the caller's element |

`size` moves the padding, the gap and the corner — **never a height**. A surface is a
ground: how tall it is, is how tall what is on it is.

## Elevation is asked for

`isElevated` defaults to **true for `primary` only**. A shadow under a ground that barely
differs from the page reads as dirt rather than as height, so the quieter three are flat
until you say otherwise.

That is the second thing separating this from a `Card`, which is always lifted. Whether a
ground is above the one under it is the layout's business: the same `secondary` is flat
inside a card and lifted floating over a list.

## Everything else is a style prop

`padding`, `borderRadius`, `borderWidth`, `borderColor` — full RN names, full RN values
(R14). There is nothing here a prop had to be invented for, which is why this component's
props list is six lines long.

## Where it should be reused

`Card`, `Popover`, `Accordion` and `Dialog` each write out a fill, a corner and a shadow of
their own. None of them reads this yet — that is a refactor, not a component, and it wants
its own change so a regression in one of the four is not hidden inside a new file.

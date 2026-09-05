# Popover

A panel anchored to whatever opened it. The component the `Select` was written before: the
two share their positioning, their measuring pass and their entrance.

## Import

```tsx
import { Popover } from '@xaui/native/popover'
```

## Anatomy

```tsx
<Popover>
  <Popover.Trigger>…</Popover.Trigger>
  <Popover.Overlay />
  <Popover.Content>
    <Popover.Title>…</Popover.Title>
    <Popover.Description>…</Popover.Description>
    <Popover.Close>…</Popover.Close>
  </Popover.Content>
</Popover>
```

- **`Popover`** — state and resolved style. **It renders no node.**
- **`Popover.Trigger`** — what opens the panel, and the rectangle it anchors to.
- **`Popover.Overlay`** — the backdrop. Optional, and what closes the panel on a press
  outside.
- **`Popover.Content`** — the panel, positioned against the trigger, in a portal.
- **`Popover.Title`** / **`Popover.Description`** — its two texts.
- **`Popover.Close`** — anything that closes it.

`Popover.Overlay` and `Popover.Content` render into the nearest `PortalHost` rather than
where they are written. Their place in the JSX says **when** they exist, not where they
appear.

## Usage

### Basic

```tsx
<Popover>
  <Popover.Trigger asChild>
    <Button variant="tertiary">Détails</Button>
  </Popover.Trigger>
  <Popover.Overlay />
  <Popover.Content placement="top">
    <Popover.Title>Livraison</Popover.Title>
    <Popover.Description>Sous trois jours ouvrés.</Popover.Description>
  </Popover.Content>
</Popover>
```

`asChild` is the normal way to write the trigger. It paints nothing of its own — a
popover's trigger is usually a `Button`, an `Icon` or a word in a sentence, and giving it a
surface would put a second box around one of those.

### Placement

```tsx
<Popover.Content placement="end" align="start" offset={12} width={280} />
```

`placement` takes all four sides, which is what separates this from `Select.Content`. A
select's list is as wide as the field it drops out of, and one hanging off the side of that
field reads as a menu; a popover belongs to nothing, so it can sit anywhere.

`align` runs along the axis the side does **not** pin — horizontal for a panel above or
below, vertical for one beside — and clamps to the screen insets.

`avoidCollisions` is on by default and flips to the opposite side, but only when that side
has strictly **more** room. A panel two points short stays where it was asked, because a
flip on a near miss reads as a glitch.

**Both axes are clamped to the insets**, whether or not it flips. The side decides where
the panel wants to go; the insets decide where it is allowed to be. A panel beside a
trigger with no room for it is pushed inside the screen and may overlap the trigger — which
is the right trade: a panel covering the button that opened it is legible, and a panel past
the edge of the screen is not.

### No backdrop

Omit `Popover.Overlay` and nothing captures the press outside: a `Popover.Close`, or your
own state, is what closes the panel. That is the answer for a popover inside a sheet that
already dims its background.

### Controlled

```tsx
const [isOpen, setOpen] = useState(false)

<Popover isOpen={isOpen} onOpenChange={setOpen}>…</Popover>
```

### Style as props

```tsx
<Popover.Content padding={20} backgroundColor="#111" />
<Popover.Title fontSize={22} />
```

Full RN names, full RN values (R14). Every node takes them.

## Props

### `Popover`

| prop           | type                        | default | description                  |
| -------------- | --------------------------- | ------- | ---------------------------- |
| `radius`       | `RadiusKey`                 | —       | Overrides the panel's corner |
| `isOpen`       | `boolean`                   | —       | Controlled                   |
| `defaultOpen`  | `boolean`                   | `false` | Uncontrolled                 |
| `onOpenChange` | `(isOpen: boolean) => void` | —       | Fires on open and on close   |
| `isDisabled`   | `boolean`                   | `false` | Dims the trigger, stops it   |

There is no `variant`. A popover is the theme's floating surface: it has no emphasis to
report and no intent to carry, so a `variant` would name a decision nobody makes.

### `Popover.Content`

| prop              | type                                    | default       |
| ----------------- | --------------------------------------- | ------------- |
| `placement`       | `'top' \| 'bottom' \| 'start' \| 'end'` | `bottom`      |
| `align`           | `'start' \| 'center' \| 'end'`          | `center`      |
| `width`           | `number \| 'trigger' \| 'content-fit'`  | `content-fit` |
| `offset`          | `number`                                | `9`           |
| `alignOffset`     | `number`                                | `0`           |
| `avoidCollisions` | `boolean`                               | `true`        |
| `insets`          | `PopoverInsets`                         | `12` a side   |

`width` defaults to `content-fit` where the `Select`'s defaults to `trigger`: matching the
width of a word or an icon would give the panel no room at all.

**`content-fit` stops at a measure, not at the screen.** Twenty ems of the body size — around
sixty characters, the top of the range a line stays readable over. A paragraph always wants
more room than it has, so a panel bounded only by the edges is a full-width panel the moment
it holds a sentence, and a popover is an aside rather than a sheet.

`width="full"` is how you say "yes, actually, all of it" — the screen less its insets.
Nothing else in the union can: a number is a guess at the screen's width, and `content-fit`
refuses on purpose.

### `Popover.Trigger` · `Popover.Close`

Everything `Pressable` takes, plus `ViewStyle` as props, plus `asChild`.

### `Popover.Title` · `Popover.Description`

Everything `Text` takes, plus `TextStyle` as props. The title is a `header` for a screen
reader, so the panel announces as one.

## Motion

The panel grows out of the trigger: 200 ms in from `scale: 0.95`, offset eight points
**towards** it, so a panel below enters upwards, one above enters downwards, one beside
enters sideways. Exit mirrors it at 150 ms — closing is an acknowledgement rather than an
arrival, and a dismissal as long as the opening feels like the control is arguing.

**The measuring pass.** The panel mounts invisibly for one frame to learn how big it wants
to be, then places itself and plays its entrance. Without it `avoidCollisions` has nothing
to compare, and a panel that does not fit on the side it was asked for would open off the
screen. That frame is why the entrance is keyed on the resolved placement rather than
started at mount.

## What it shares with the `Select`

| shared                            | where                            |
| --------------------------------- | -------------------------------- |
| the placement arithmetic          | `utils/placement.ts`             |
| the trigger's measurement         | `hooks/use-anchor-ref.ts`        |
| the measuring pass and the origin | `hooks/use-anchored-position.ts` |
| the entrance and exit keyframes   | `system/anchored/`               |

Written for the `Select` first, extracted here — §2 bis: at the second use, never by
anticipation. `Menu`, `SubMenu` and `Tooltip` read the same four.

Two of them exist because of bugs rather than tidiness. The trigger measures again on
every open, because `onLayout` never fires on scroll and a trigger inside a `ScrollView`
otherwise reports where it used to be. And the position is computed in the **host's**
coordinates rather than the window's, because the trigger reports itself against the window
while the panel is laid out inside the `PortalHost` — anything the two differ by is exactly
the distance the panel would be wrong by.

## Accessibility

The trigger is a `button` carrying `expanded`. The overlay announces nothing at all — it is
the absence of the panel, and "button" spoken over the whole screen is worse than silence.

## The portal

`XAUIProvider` mounts the `PortalHost` these render into, so there is nothing to do.
Without a host anywhere, `Portal` renders nothing: the popover opens onto an empty screen
with no error. That silence is why the provider mounts one by default.

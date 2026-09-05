# Dialog

A question the page has to be answered before it goes on.

## Import

```tsx
import { Dialog } from '@xaui/native/dialog'
```

## Anatomy

```tsx
<Dialog>
  <Dialog.Trigger>…</Dialog.Trigger>
  <Dialog.Overlay />
  <Dialog.Content>
    <Dialog.Close />
    <Dialog.Title>…</Dialog.Title>
    <Dialog.Description>…</Dialog.Description>
    <Dialog.Close>…</Dialog.Close>
  </Dialog.Content>
</Dialog>
```

- **`Dialog`** — state and resolved style. **It renders no node.**
- **`Dialog.Trigger`** — what asks the question.
- **`Dialog.Overlay`** — the backdrop. It dims, and closes on a press.
- **`Dialog.Content`** — the panel, centred and inset from the screen's edges.
- **`Dialog.Title`** / **`Dialog.Description`** — the question and what it costs.
- **`Dialog.Close`** — the way out. A cross when it is empty, whatever you put in it
  otherwise.

## Usage

### Basic

```tsx
<Dialog>
  <Dialog.Trigger asChild>
    <Button variant="danger">Supprimer</Button>
  </Dialog.Trigger>
  <Dialog.Overlay />
  <Dialog.Content>
    <Dialog.Title>Supprimer ce document ?</Dialog.Title>
    <Dialog.Description>Définitif, sans corbeille.</Dialog.Description>
    <Dialog.Close asChild>
      <Button variant="danger">Supprimer</Button>
    </Dialog.Close>
  </Dialog.Content>
</Dialog>
```

### One that must be answered

```tsx
<Dialog.Overlay isDismissable={false} />
```

A press outside does nothing, so the only way out is through a `Dialog.Close`.

### Style as props

```tsx
<Dialog.Content padding={24} borderRadius={16} />
<Dialog.Title fontSize={22} />
```

Full RN names, full RN values (R14). Every node takes them.

## Props

### `Dialog`

| prop           | type                        | default | description                  |
| -------------- | --------------------------- | ------- | ---------------------------- |
| `radius`       | `RadiusKey`                 | —       | Overrides the panel's corner |
| `isOpen`       | `boolean`                   | —       | Controlled                   |
| `defaultOpen`  | `boolean`                   | `false` | Uncontrolled                 |
| `onOpenChange` | `(isOpen: boolean) => void` | —       | Fires on open and on close   |
| `isDisabled`   | `boolean`                   | `false` | Stops the trigger            |

No `variant`. A dialog is the theme's floating surface: the question it asks is in its
words, not in its fill.

### `Dialog.Overlay`

`isDismissable` (default `true`), plus `ViewProps` and `ViewStyle` as props.

### `Dialog.Trigger`

Everything `Pressable` takes, plus `ViewStyle` as props and `asChild`. It paints nothing of
its own — a dialog is asked by a button, and giving the trigger a surface would put a
second box around one.

### `Dialog.Close`

Everything the shared `CloseButton` takes, minus `name`, `baseStyle` and `glyphStyle`,
which the dialog supplies. Two shapes, and the empty one is the default:

```tsx
<Dialog.Close accessibilityLabel="Fermer" />        {/* a 32pt disc, muted cross */}
<Dialog.Close asChild>                              {/* the answer, in words */}
  <Button variant="danger">Supprimer</Button>
</Dialog.Close>
```

**Empty, it draws a cross** — the shared button's, from two rotated bars rather than an
icon, so the corner affordance works in a project that has installed no icon set.

Every measurement is HeroUI's, read off their CSS. `close-button.css` sets
`height: calc(var(--spacing) * 8)` on a spacing base of 4, so the box is **32 points**, and
`isIconOnly` gives it `aspect-ratio: 1` and a radius past half its height — a circle. It is
**filled**, not a bare glyph: their `CloseButton` is a `tertiary` button, and their
`tertiary` is `background-color: var(--color-default)`, the same token our `secondary`
names. The cross itself is `muted`. A cross floating on the panel with nothing under it
reads as decoration; the disc is what makes it a target.

**It places itself nowhere.** `alignSelf="flex-end"` above the title, or `position`,
`top` and `end` over content that has room for it — a title with space beside it and one
without want different answers, and that is layout, which is the caller's (R4). This is
what HeroUI does too: their own examples use `absolute top-3 inset-e-2.5`, `items-end` and
`self-end me-4` in three different dialogs. The placement is in the example, not in the
component.

Under `asChild` the box is not applied, and the missing-label warning does not fire: the
caller's element has a height and a shape of its own, and its text is the label.

## How it differs from the `Popover`

Same portal, same context re-provision, same overlay keyframes. What it drops is everything
that needs an anchor: the measuring pass, the host origin, the collision flip. A centred box
has nothing to be measured against.

What it adds is two things:

**The backdrop dims.** A popover is an aside you read the page around; a dialog is a
question, and the page behind it is not available until it is answered.

**It grows from its own centre**, 200 ms from `scale: 0.94`, rather than out of a trigger.
A popover's entrance is offset towards the thing that opened it so the motion points back
at it; a dialog belongs to the screen rather than to a control, so the absence of a
direction is the message.

## Two layers on the content

A centred box cannot also be the thing that centres it. An outer layer fills the portal and
does the centring; the panel is the box. The outer one takes **no touches**, so a press that
misses the panel reaches the overlay under it and closes the dialog.

## Accessibility

The panel is `accessibilityViewIsModal`, so a screen reader stops at the dialog rather than
reading the page behind it — the spoken half of what the backdrop says visually. The title
is a `header`. The overlay announces nothing.

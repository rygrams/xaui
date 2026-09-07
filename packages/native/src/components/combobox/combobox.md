# Combobox

A field you type in, over a list you must choose from.

## Import

```tsx
import { Combobox } from '@xaui/native/combobox'
```

## Usage

```tsx
<Combobox value={animal} onValueChange={setAnimal}>
  <Combobox.Trigger>
    <Combobox.Input placeholder="Chercher un animal…" />
    <Combobox.Indicator accessibilityLabel="Ouvrir la liste" />
  </Combobox.Trigger>
  <Combobox.Overlay />
  <Combobox.Content>
    <Combobox.Item value="cat">Chat</Combobox.Item>
    <Combobox.Item value="dog">Chien</Combobox.Item>
    <Combobox.Empty>Aucun animal ne correspond</Combobox.Empty>
  </Combobox.Content>
</Combobox>
```

## Anatomy

| slot                 | what it is                                           |
| -------------------- | ---------------------------------------------------- |
| `Combobox`           | State and resolved style. It renders no node         |
| `Combobox.Trigger`   | The field box — a `View`, not a pressable            |
| `Combobox.Input`     | The field. The query while open, the label while not |
| `Combobox.Indicator` | The chevron, and the way in without typing           |
| `Combobox.Overlay`   | The backdrop. Optional                               |
| `Combobox.Content`   | The panel                                            |
| `Combobox.Item`      | One row                                              |
| `Combobox.Empty`     | What the panel says when nothing matches             |

## It is the `Autocomplete` with the search moved into the trigger

In an [`Autocomplete`](../autocomplete/autocomplete.md) the control shows the **chosen row**
and you type in a box inside the panel. Here the field **is** the trigger: what you have
typed is what you see, on the line where a `TextField` would be, rather than a button that
opens a search.

That is the ARIA combobox, and it is the shape a form wants. The autocomplete's shape is
what a filter bar or a "jump to" wants — the control keeps saying what is currently chosen
while you look for something else.

## The list is closed

What is typed **narrows the rows and never becomes the value**. The query goes with the
panel, so closing without choosing puts the chosen row's label back in the field.

A combobox that kept the half-typed word would be a text field with a dropdown attached —
which is a real control, and a different one. Here the field can only ever end up holding
something that is in the list.

```tsx
value={isOpen ? query : labelFor(value)}
```

is the whole of it, and it is why there is no `onInputChange` separate from
`onQueryChange`: there is one string being typed, and it is the query.

## What it shares, and why

**The root is the `Autocomplete`'s**, wrapped rather than aliased. A value, an open panel
and a query narrowing the list is all either component holds, and a second copy of that
would be a second thing to keep in step.

**The panel, the rows and the empty line are the `Autocomplete`'s own objects** —
`Combobox.Content` **is** `Autocomplete.Content`. Two reasons, and the second is the
load-bearing one:

- A row is a row whichever field opened it. A second set would drift, and it would show as
  a combobox and an autocomplete in one form with panels half a shade apart.
- `Autocomplete.Content` tells its children apart **by identity** (`type === Item`), not by
  name. A `Combobox.Item` that were a different component would be sorted into "not a row",
  would never be filtered and would never register its label.

What this component owns is the three slots that make the field the control: the trigger,
the input and the chevron. `useCombobox()` is `useAutocomplete()`, for the same reason
(R10).

## Three slots, and why each is what it is

**`Combobox.Trigger` is a `View`, not a `Pressable`.** The thing you press is the input
inside it, and a pressable wrapper around a text field is a second target laid over the one
that already takes the tap — same pixels, different effect. The autocomplete's trigger is a
pressable because it holds no field; this one holds nothing else.

It carries `accessibilityRole="combobox"` and measures itself in window coordinates on every
open, because that rectangle is what the panel positions against and `onLayout` fires once.

**`Combobox.Input` fills the box**, so the box is one target and it is the one that raises
the keyboard. It takes the trigger's own text style: it stands where the chosen value stands
in a `Select`, and a query that read smaller than the answer it replaces would make the
control change size as you typed.

Typing opens the panel and focusing opens it — `opensOnChange={false}` and
`opensOnFocus={false}` turn either off, for a control that should only open from the chevron.

**`Combobox.Indicator` is a control**, where the autocomplete's is a decoration. That
component's trigger is itself pressable, so its chevron only has to point; this one sits
inside a field that takes the tap and raises a keyboard, so the way into the list _without_
typing has to be the chevron itself. It presses with a `hitSlop`, and it takes an
`accessibilityLabel` because a chevron is not text.

## Variants, sizes and colour

All of them are the `Select`'s, resolved through `selectRecipe` exactly as the
`Autocomplete`'s are: four field levels, three sizes, `radius`, `color`, `isInvalid`,
`isDisabled`. A second table would be a third one to keep in step.

## Alignment with `heroui-native`

Theirs is `ComboBox` with `InputGroup` · `Value` · `Trigger` · `Popover`.

| Theirs                     | Ours               | Why                                                                                                                          |
| -------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `ComboBox.InputGroup`      | `Combobox.Trigger` | The box that holds the field is the trigger — it is what the panel anchors to, and naming it twice would hide that.          |
| `ComboBox.Value`           | `Combobox.Input`   | One node. The value and the query are the same string in the same box; two slots for it is two things that can disagree.     |
| `selectionMode="multiple"` | —                  | One value, as everywhere else here. Several is a `TagGroup` beside a field, which says what it holds without a popover open. |

## Props

The root's props are the `Autocomplete`'s, to the prop: `variant`, `size`, `radius`,
`color`, `value` / `defaultValue` / `onValueChange`, `isOpen` / `defaultOpen` /
`onOpenChange`, `query` / `defaultQuery` / `onQueryChange`, `isDisabled`, `isInvalid`.

### `Combobox.Input`

Everything `TextInput` accepts, plus the `TextStyle` keys as props (R14), plus:

| Prop            | Type      | Default | Notes                  |
| --------------- | --------- | ------- | ---------------------- |
| `opensOnChange` | `boolean` | `true`  | Typing opens the panel |
| `opensOnFocus`  | `boolean` | `true`  | Focusing opens it      |

### `Combobox.Trigger`

Everything `View` accepts, plus the `ViewStyle` keys as props (R14), plus `asChild`.

### `Combobox.Indicator`

`as` for the glyph, and `accessibilityLabel`.

## Accessibility

- `accessibilityRole="combobox"` on the trigger, with `accessibilityState.expanded`
  following the panel — on the box rather than on the input, because it is the box that
  expands and a screen reader reads the field inside it as the field it is.
- The chevron is a `button` and needs an `accessibilityLabel`: it is not text.
- `aria-invalid` follows `isInvalid`.
- The panel keeps taps through the keyboard (`keyboardShouldPersistTaps`), so choosing a row
  while the keyboard is up takes one tap rather than two.

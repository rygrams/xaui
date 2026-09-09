# TextArea

A multiline field, with the label, the hint and the error that make it usable.

> **Not part of the 1.0 core.** The fifteen are listed in the plan and this is not one of
> them; it ships under `1.x` as a P5 component.

## Import

```tsx
import { TextArea } from '@xaui/native/text-area'
```

## Anatomy

```tsx
<TextArea rows={3} maxRows={6}>
  <TextArea.Label />
  <TextArea.Field />
  <TextArea.Description />
  <TextArea.Error />
</TextArea>
```

### It is a `TextField`

Not "like" one — it **is** one. `TextArea` renders the `TextField`'s root: the same recipe, the
same resolved context, the same four variants, the same `size`, `radius`, `color`,
`labelPlacement`, `isInvalid` and `isDisabled`. `TextArea.Label`, `TextArea.Description` and
`TextArea.Error` are literally the `TextField`'s slots, re-exported rather than wrapped — a
wrapper would add three components to the tree to change a `displayName`, and the string it
would change is the one telling you the truth.

**Only `TextArea.Field` differs**, by three things: `multiline`, the text pinned to the top,
and a height counted in lines.

That is also HeroUI's answer — [their `TextArea`](https://github.com/heroui-inc/heroui-native/tree/main/src/components/text-area)
is twenty lines rendering their `TextField` with the same three defaults. A component of its own
is what a caller looks for; sharing every line of it is what keeps the two from drifting.

So **everything in [`input.md`](../text-field/text-field.md) applies here**, and this page only covers
what is added.

## Usage

### Basic

```tsx
<TextArea>
  <TextArea.Label>Message</TextArea.Label>
  <TextArea.Field value={message} onChangeText={setMessage} />
  <TextArea.Description>Trois lignes suffisent.</TextArea.Description>
</TextArea>
```

### `rows` and `maxRows`

```tsx
<TextArea rows={3} maxRows={6}>
  …
</TextArea>
```

`rows` is the starting height, in lines. `maxRows` is the ceiling: past it the field stops
growing and scrolls. **Unset, it grows for as long as the text does** — and has nothing to
scroll, which is why `scrollEnabled` follows `maxRows` rather than being a prop of its own.

Both sit on the **root** rather than on the field, for the reason `size` does: the root is
where the field's shape is decided, and the slot reads what it resolved.

**They are raw values** (R6), like `color`: they resolve outside the style cache from the
line height the size chose, which is what lets `rows={7}` exist without seven entries in the
cache.

| `size` | Line | Padding | `rows={3}` | `rows={4}` |
| ------ | ---- | ------- | ---------- | ---------- |
| `xs`   | 20   | 6       | 72         | 92         |
| `sm`   | 24   | 8       | 88         | 112        |
| `md`   | 24   | 8       | 88         | 112        |
| `lg`   | 28   | 10      | 104        | 132        |

### A fixed height

HeroUI's text area is a **fixed** 128 that scrolls rather than one that grows. That is a
style prop away (R14), rather than a second API:

```tsx
<TextArea>
  <TextArea.Field height={128} />
</TextArea>
```

### Everything the `TextField` does

```tsx
<TextArea rows={2} variant="tertiary" size="lg" labelPlacement="inside" isInvalid>
  <TextArea.Label>Message</TextArea.Label>
  <TextArea.Field />
  <TextArea.Error>Au moins vingt caractères.</TextArea.Error>
</TextArea>
```

`labelPlacement="inside"` composes: the label keeps its room at the top and the first line
starts below it, because the four inside-label compounds write the same `paddingTop` to the
text area as they do to the field.

## Props

### `TextArea`

Everything the [`TextField` root](../text-field/text-field.md#input) accepts, plus:

| Prop      | Type     | Default | Notes                                          |
| --------- | -------- | ------- | ---------------------------------------------- |
| `rows`    | `number` | `3`     | The starting height, in lines                  |
| `maxRows` | `number` | —       | The ceiling. Past it the field scrolls instead |

### `TextArea.Field`

Everything [`TextField.Field`](../text-field/text-field.md#inputfield) accepts except `multiline`, which
it sets. `scrollEnabled` defaults to whether `maxRows` was given.

### `TextArea.Label`, `TextArea.Description`, `TextArea.Error`

The `TextField`'s, unchanged. See [`input.md`](../text-field/text-field.md).

## Extending it

`useTextArea()` carries **only** the two row counts — the one thing the `TextField`'s own
context cannot, because `rows` is not the `TextField`'s business and a prop that does nothing in
the common case reads as broken. Everything visual comes from `useTextField()`, because the
styles were resolved there.

```tsx
import { useTextField } from '@xaui/native/text-field'
import { useTextArea } from '@xaui/native/text-area'
```

## Accessibility

The `TextField`'s, unchanged: the wrapper has no role, the field points at the label with
`aria-labelledby` and at the description with `aria-describedby`, and `aria-invalid` follows
`isInvalid`. See [`input.md`](../text-field/text-field.md#accessibility).

## Migration from `@xaui/native-legacy`

| Legacy               | v1                                                          |
| -------------------- | ----------------------------------------------------------- |
| `<TextArea minRows>` | `<TextArea rows>` — the same idea under React Native's word |
| `maxRows`            | `maxRows`, unchanged                                        |
| `label="…"`          | `<TextArea.Label>…</TextArea.Label>`                        |
| everything else      | see the `TextField`'s table — it is the same component      |

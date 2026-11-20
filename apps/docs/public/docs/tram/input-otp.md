# InputOTP

A one-time code, one character to a box, drawn as a row of Tram fields one character wide:
a faint line while a box is empty, the ink once it holds a character, the accent on the
box being typed in.

There is one input, and it is hidden: it covers the row, holds the whole code as one
string, and the boxes are a drawing of it.

## Import

```tsx
import { InputOTP, OTP_ALPHANUMERIC } from '@xaui/tram/input-otp'
```

## Anatomy

```tsx
<InputOTP maxLength={6}>
  <InputOTP.Group>
    {({ slots }) => slots.map(s => <InputOTP.Box key={s.index} index={s.index} />)}
  </InputOTP.Group>
</InputOTP>
```

- **`InputOTP`** — the root. It owns the code as one string, renders the hidden
  `TextInput` over the row, and hands the resolved styles and each box's state to its
  slots. Its `ref` is `focus`, `blur` and `clear`.
- **`InputOTP.Group`** — a row of boxes. It takes a render function as well as elements:
  the number of boxes is data.
- **`InputOTP.Box`** — one character's box, read by its `index`. With no children it draws
  the value, the placeholder and the caret.
- **`InputOTP.Value`** — the character, or nothing while the box is empty.
- **`InputOTP.Placeholder`** — what stands in for it before anything is typed.
- **`InputOTP.Caret`** — a bar 2 wide that blinks in the box the next character lands in.
  `animation={false}` stops the blink.
- **`InputOTP.Separator`** — a 10 × 2 dash in `muted` between two groups.

## Usage

### Basic

```tsx
<InputOTP maxLength={6} onComplete={verify}>
  <InputOTP.Group>
    {({ slots }) => slots.map(s => <InputOTP.Box key={s.index} index={s.index} />)}
  </InputOTP.Group>
</InputOTP>
```

`onComplete` fires once the last box is filled. Leave `value` out and the component keeps
the code itself; `defaultValue` seeds it.

### Two groups

```tsx
<InputOTP maxLength={6}>
  <InputOTP.Group>{({ slots }) => boxes(slots.slice(0, 3))}</InputOTP.Group>
  <InputOTP.Separator />
  <InputOTP.Group>{({ slots }) => boxes(slots.slice(3))}</InputOTP.Group>
</InputOTP>
```

### Letters and digits

```tsx
<InputOTP maxLength={4} pattern={OTP_ALPHANUMERIC} inputMode="text">
  …
</InputOTP>
```

`pattern` is tested against the whole value; `OTP_DIGITS`, `OTP_LETTERS` and
`OTP_ALPHANUMERIC` are the three usual answers. `inputMode` is `numeric` by default.
`textInputProps` carries anything else the hidden input should have.

### Your own box

```tsx
<InputOTP.Box index={slot.index}>
  <InputOTP.Value />
  <MyOwnCaret />
</InputOTP.Box>
```

## Variants

| Variant     | Drawn as                                                        |
| ----------- | --------------------------------------------------------------- |
| `primary`   | the ground inside a line of 2 (default)                         |
| `secondary` | the discreet surface, no line until the box is the one typed in |
| `tertiary`  | drawn as `primary`                                              |

## Sizes

```tsx
<InputOTP size="sm" maxLength={6}>…</InputOTP>
<InputOTP size="md" maxLength={6}>…</InputOTP>
<InputOTP size="lg" maxLength={6}>…</InputOTP>
```

The box is 36 × 44, 44 × 52 or 52 × 60, narrowing to fit the row and never growing; the
character is on `subtitle`, `title` or `section` in tabular figures.

## Colour

`accent` takes one of the twenty named accents for the line and the caret of the box
being typed in, read as ink. `color` takes a raw `#RRGGBB` and wins when both are set.
`isInvalid` puts every line in `danger`, with no active line, and outranks both.

## Accessibility

- The hidden input is the control. It carries a label ("6-character code"), the disabled
  state and an `accessibilityValue` reading "n of m entered", so a screen reader never
  walks the boxes one by one.
- `autoComplete="one-time-code"` and `textContentType="oneTimeCode"` are set, which puts
  the code in the keyboard's suggestion strip.
- `InputOTP.Separator` is hidden from the accessibility tree: the dash is not in the
  value.
- The caret stands still with motion reduced or animations off.

## Differences from Native

- **`variant`** defaults to `primary`, the ground inside the line; Native's default is
  `secondary`. `tertiary` draws as `primary`.
- **`accent`** is added.
- **The box** is sharp, 36 × 44 / 44 × 52 / 52 × 60, in the `TextField`'s line of 2: 60 %
  of `muted` while empty, the ink once filled, the accent on the box being typed in.
- **`isInvalid`** puts every line in `danger`.
- **The separator** is a 10 × 2 dash in `muted`.

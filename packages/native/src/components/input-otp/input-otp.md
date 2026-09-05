# InputOTP

A one-time code, one character to a box.

> **Not part of the 1.0 core.** The fifteen are listed in the plan and this is not one of
> them; it ships under `1.x` as a P5 component. Nothing about its API differs — it follows
> the same fourteen rules as the `Input` it sits beside.

## Import

```tsx
import { InputOTP } from '@xaui/native/input-otp'
```

## Anatomy

```tsx
<InputOTP maxLength={6}>
  <InputOTP.Group>
    {({ slots }) => slots.map(s => <InputOTP.Box key={s.index} index={s.index} />)}
  </InputOTP.Group>
</InputOTP>
```

- **`InputOTP`** — the root. It owns the code as **one string**, renders a hidden
  `TextInput` over the row, and publishes the resolved styles and the per-box state.
- **`InputOTP.Group`** — a row of boxes. It takes a **render function** as well as
  elements.
- **`InputOTP.Box`** — one character's box. With no children it draws the value, the
  placeholder and the caret.
- **`InputOTP.Value`** — the character, or nothing while the box is empty.
- **`InputOTP.Placeholder`** — what stands in for it before anything is typed.
- **`InputOTP.Caret`** — the blinking bar, in the box the next character lands in.
- **`InputOTP.Separator`** — the dash between two groups.

### There is one input, and it is hidden

Six focusable boxes is the design every OTP component starts with and every one of them
abandons: the caret has to be moved by hand, a backspace at the start of a box has to jump
backwards, and a paste arrives in one box out of six.

Here a single `TextInput` covers the row and holds the whole code. The boxes are a
_rendering_ of that string, so a keystroke, a backspace, a paste and an autofilled
`one-time-code` all take the same path — and the state that can disagree with itself does
not exist.

Two consequences worth knowing:

- **The hidden input takes every touch on the row.** That is what opens the keyboard from
  a tap anywhere. A control that has to stay pressable goes _beside_ the `InputOTP`, not
  inside it.
- **The input cannot be hidden by size or `display`.** An input the platform thinks is
  invisible is one iOS refuses to focus and one the autofill heuristics skip — which would
  cost the `one-time-code` suggestion that is the point of the component. It is
  transparent instead, at a hair of opacity on iOS and zero on Android.

## Usage

### Basic

```tsx
const [code, setCode] = useState('')

<InputOTP maxLength={6} value={code} onChangeText={setCode} onComplete={verify}>
  <InputOTP.Group>
    {({ slots }) => slots.map(s => <InputOTP.Box key={s.index} index={s.index} />)}
  </InputOTP.Group>
</InputOTP>
```

Leave `value` out and the component keeps the code itself; `defaultValue` seeds it.
`onComplete` fires once the last box is filled, which is the only event most callers need.

### Groups and a separator

```tsx
<InputOTP maxLength={6}>
  <InputOTP.Group>{({ slots }) => slots.slice(0, 3).map(box)}</InputOTP.Group>
  <InputOTP.Separator />
  <InputOTP.Group>{({ slots }) => slots.slice(3).map(box)}</InputOTP.Group>
</InputOTP>
```

Splitting is a matter of slicing what you are handed, which is why there is no `groupSize`
prop.

### What `InputOTP.Group` is, and is not

It is **the unit a `Separator` sits between**, and the node the render function belongs to.
It is not an input, and there is never more than one of those however many groups you
write — the hidden `TextInput` is the root's, it covers the whole row, and every box in
every group reads the same string.

**It buys no spacing today.** Its resolved style is the root's, line for line: a row, centred,
with the same gap. The break you see between `482` and `913` comes from the separator's own
width plus the gap on either side of it — `8 + 8 + 8` — which a flat row of boxes and a
separator would produce identically:

```
□ □ □ [8] ▬ [8] □ □ □
   └8┘
        └──── 24 ────┘
```

What it keeps open is the ability to make those two gaps differ — a tight one inside a
group, a loose one around the separator — which is a change to one number in the recipe
rather than a change of shape. That is the reason it stays: a single-group code pays one
nested view for it, and that is the whole cost.

### The render function

`InputOTP.Group` is the one slot in the library that takes a function, because the number
of children here is **data** — `maxLength` — rather than markup. Writing six boxes by hand
is a list that silently disagrees with the prop the moment either changes.

It is handed `{ slots, value, maxLength, isFocused, isDisabled, isInvalid }`. Elements
still work if you want to write them out.

### Composing a box

```tsx
<InputOTP.Box index={slot.index}>
  <InputOTP.Value />
  <MyOwnCaret />
</InputOTP.Box>
```

The three built-in children each return `null` when they do not apply, so all three stay
mounted and the box never changes its tree as the code is typed.

### Pattern

```tsx
import { OTP_DIGITS, OTP_LETTERS, OTP_ALPHANUMERIC } from '@xaui/native/input-otp'
;<InputOTP maxLength={5} pattern={OTP_ALPHANUMERIC} inputMode="text">
  …
</InputOTP>
```

Tested against the **whole value**, not each character, so a rule about the shape of a code
works as well as one about its alphabet. A string is compiled once; a `RegExp` you built is
used as it is, so its flags stay yours.

### Paste

Nothing to configure. A one-time code arrives surrounded by prose far more often than
alone — _"Your code is 482913, it expires in 10 minutes"_ — and a naïve `slice(0, 6)` takes
`"Your c"`. The component looks for a run of exactly `maxLength` digits with **no digit on
either side**, which is what rules out the `10` in that sentence and the year in a date.

`maxLength` is deliberately **not** set on the hidden input: the platform would truncate the
message before there was anything to look inside.

### Placeholder

```tsx
<InputOTP maxLength={4} placeholder="•" />   {/* every box */}
<InputOTP maxLength={4} placeholder="1234" /> {/* one per box */}
```

Shown only where there is neither a typed character nor the caret. That three-way choice is
made in one place, so two of them never appear at once.

### Imperative

```tsx
const otp = useRef<InputOTPHandle>(null)

<InputOTP ref={otp} maxLength={6}>…</InputOTP>

otp.current?.focus()
otp.current?.clear()
```

**`ref` is not the view.** It is `focus`, `blur` and `clear` — the three things only the
hidden input can do, and the reason the usual "the root forwards its node" shape is
inverted here. `clear` empties both halves, the native buffer and the value; emptying one
and not the other is how a cleared field comes back on the next keystroke.

### Sizes

| `size` | Box     | Character | Gap |
| ------ | ------- | --------- | --- |
| `sm`   | 40 × 36 | 16/24     | 8   |
| `md`   | 48 × 44 | 18/28     | 8   |
| `lg`   | 56 × 52 | 20/28     | 10  |

`md` is HeroUI's OTP measured. The width is the control height less one spacing step, which
reproduces their 48 × 44 and holds the proportion at the other two.

### The corner

The box takes `lg`, 12 points — **not `field`**, which is what the rest of this family uses.
A field is wide, so 21 on a 48-tall one reads as a rounded rectangle. A code box is very
nearly square — 44 by 48 at `md`, 36 by 40 at `sm` — where the geometric maximum is 22, so
the same 21 is a pill in all but name and is clamped to one outright at the small end.

Twelve is where HeroUI lands for the same box from the other direction: their `field` radius
is their `xl`, and their scale's base is 8 where ours is 12.

**There is no `xs`**, where the rest of the library has four sizes. That box would be 28 by
32, and it still has to carry an 18pt character to stay legible — 18 in 28 leaves no room
for the two-point active ring without the digit touching it. A code is also the one field a
user reads back to themselves character by character, which is the worst place to save eight
points. Below `sm`, use fewer boxes rather than smaller ones.

### Variants

Three of the `Input`'s four, token for token — a box of a code is a field one character wide.

| `variant`   | Background        | Border        | Active ring | Shadow  |
| ----------- | ----------------- | ------------- | ----------- | ------- |
| `primary`   | `fieldBackground` | `fieldBorder` | `accent`    | `field` |
| `secondary` | `default`         | `fieldBorder` | `accent`    | —       |
| `tertiary`  | transparent       | `fieldBorder` | `accent`    | —       |

**The active box takes a two-point ring** in the accent. HeroUI uses `outline-width: 2px`;
React Native has no `outline`, so it is a border — and two points rather than one, because a
box that gains a colour without gaining weight reads as a rendering artefact next to five
that did not. The box has a fixed width and height and centres what it holds, so the extra
point eats into the padding rather than moving anything.

**Three levels, not the `Input`'s four.** There is no `ghost`, and the shape of the
component is what removes it: an input is one wide field whose position the caret and the
label already give away, so it survives having neither fill nor edge. A code is six boxes,
and their only job before anything is typed is to say **how many characters are expected
and where they go** — with no fill and no border there is nothing to count. It is the
reason the `Checkbox` has no `ghost` either.

### `isInvalid`

Every box goes `danger`, and the active ring is **taken off**: the red is already on all of
them, and a seventh colour on one says nothing it did not.

### Colour

```tsx
<InputOTP variant="tertiary" color="#7c3aed">
  …
</InputOTP>
```

A raw tint, never a token (R7). It lands where the variant put its tokens **and** becomes
the active ring — the active colour is a role like any other, so nothing extra is passed.

## Props

### `InputOTP`

Everything `View` accepts, every `ViewStyle` key it does not already claim (R14), plus:

| Prop             | Type                          | Default       | Notes                                    |
| ---------------- | ----------------------------- | ------------- | ---------------------------------------- |
| `maxLength`      | `number`                      | — (required)  | How many boxes, and how long the code is |
| `variant`        | `InputOTPVariant`             | `'secondary'` | The three levels above                   |
| `size`           | `'sm' \| 'md' \| 'lg'`        | `'md'`        | The box, the character, the gaps         |
| `radius`         | `RadiusKey`                   | —             | Overrides the theme's `lg` radius        |
| `color`          | `string`                      | —             | A hex tint, placed by the variant        |
| `value`          | `string`                      | —             | Controlled                               |
| `defaultValue`   | `string`                      | `''`          | Uncontrolled seed                        |
| `onChangeText`   | `(value: string) => void`     | —             | Every change, controlled or not          |
| `onComplete`     | `(value: string) => void`     | —             | Fires when the last box fills            |
| `pattern`        | `string \| RegExp`            | —             | Tested against the whole value           |
| `placeholder`    | `string`                      | —             | One per box, or one for all              |
| `isInvalid`      | `boolean`                     | `false`       | Danger boxes, no active ring             |
| `isDisabled`     | `boolean`                     | `false`       | Dims the row, stops the input            |
| `inputMode`      | `TextInputProps['inputMode']` | `'numeric'`   | The keyboard the hidden input asks for   |
| `textInputProps` | `TextInputProps`              | —             | Anything else for the hidden input       |

**No `asChild`** — the one root in the library without it. This root is not a pass-through
container: it owns a hidden `TextInput` that has to be its own child, and `Slot` merges into
a _single_ element. Wrap the `InputOTP` instead of replacing it.

### `InputOTP.Group`

Everything `View` accepts plus the `ViewStyle` keys (R14). `children` is a node **or** a
function of `{ slots, value, maxLength, isFocused, isDisabled, isInvalid }`.

### `InputOTP.Box`

Everything `View` accepts plus the `ViewStyle` keys (R14), and `index` — which box this is.
With no children it renders the placeholder, the value and the caret.

### `InputOTP.Value`, `InputOTP.Placeholder`

Everything `Text` accepts plus the `TextStyle` keys (R14). `maxFontSizeMultiplier` is capped
at `1.6`: a box has a fixed width, so a character scaled to 200% would be cut in half rather
than made larger.

### `InputOTP.Caret`

The `ViewStyle` keys as props (R14), plus `animation` — `false` stops the blink and leaves
the bar, so nothing moves.

### `InputOTP.Separator`

Everything `View` accepts plus the `ViewStyle` keys (R14).

## Extending it

Two hooks are exported: `useInputOTP()` for the whole component's resolved styles and
state, and `useInputOTPBox()` for one box's own slot. `buildSlots` and `extractPastedCode`
are exported too, because a caller reimplementing the paste rule is a caller who will get it
subtly different.

```tsx
import { useInputOTP } from '@xaui/native/input-otp'

function OTPProgress() {
  const { value, maxLength } = useInputOTP()
  return (
    <Text>
      {value.length} / {maxLength}
    </Text>
  )
}
```

## Accessibility

- **The hidden input is the control**, and it carries the label, the disabled state and an
  `accessibilityValue` reading "n of m entered" — so the boxes are decoration and a screen
  reader never walks six separate elements.
- `autoComplete="one-time-code"` and `textContentType="oneTimeCode"` are set, which is what
  puts the code in the keyboard's suggestion strip. Both depend on the input being
  _transparent_ rather than hidden.
- **`InputOTP.Separator` is hidden from the accessibility tree.** The value is read off the
  hidden input, which has no gap in it — announcing a dash in the middle of a code would be
  reading punctuation that is not in the value.
- The caret is ours rather than the platform's, because the real one belongs to an input
  stretched across the whole row and would sit wherever the invisible text ends.

## Migration from `@xaui/native-legacy`

There is none: the legacy package has no OTP component. This is a new one.

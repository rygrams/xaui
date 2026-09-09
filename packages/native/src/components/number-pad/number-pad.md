# NumberPad

The keypad a PIN, a code and an amount are typed on.

## Import

```tsx
import { NumberPad } from '@xaui/native/number-pad'
```

## Usage

```tsx
<NumberPad maxLength={4} onComplete={unlock} />
```

```tsx
<NumberPad maxLength={4} value={pin} onChangeText={setPin}>
  <NumberPad.Action onPress={faceId} accessibilityLabel="Unlock with Face ID">
    <NumberPad.Icon as={FaceIdIcon} color={theme.colors.accent} />
  </NumberPad.Action>
</NumberPad>
```

## The grid is data, not markup

`1` through `9`, the `0` and the backspace are not a decision a caller makes, so the root
renders them. Eleven hand-written cells is a layout that disagrees with itself the moment one
of them is edited, and there is no `maxLength`-shaped prop driving the count the way there is
in `InputOTP` — which is the one component here whose children genuinely are data and which
therefore takes a render function.

What **is** composed is the one free corner of the bottom row, opposite the backspace, and
that is what `children` is. One cell. Left out, the corner is still a cell — without it the
`0` slides to the start of its row and stops being the middle column.

`NUMBER_PAD_ROWS` is exported, for a caller building a different pad out of the same cells.

## It draws no display

What the value looks like is the screen's — an `InputOTP`'s boxes, a row of dots, an amount in
a `Typography`. A pad that also rendered the value would be two components that have to agree
on a string, and the interesting half of that pair is always the one the pad did not
anticipate.

## The value

One string, controlled or not: `value` / `defaultValue` / `onChangeText`, as everywhere in the
library. `onComplete` fires the moment it reaches `maxLength` — the PIN screen's only event.

`maxLength` **clamps rather than truncating**. A press past the limit changes nothing at all,
so `onChangeText` does not fire and a full PIN cannot be completed twice by leaning on a key.
The insert is measured whole rather than as one character, because a key may carry more than
one: a `00` key on a currency pad that landed halfway over the limit would produce a value one
character longer than the pad promised.

Unset, `maxLength` is unbounded — which is what a pad in front of an amount wants.

## The cells

- **`NumberPad.Key`** — one filled key. `value` is what it inserts, and what it shows when
  nothing is composed inside it. Exported for the eleventh key: a decimal separator, a `00`.
- **`NumberPad.Backspace`** — the delete key, bare. **A long press clears the whole value**,
  the gesture every platform's own keypad carries; without it a mistyped sixteen-digit card
  is sixteen presses to undo.
- **`NumberPad.Action`** — the free corner. It does nothing on its own, because what belongs
  there is the caller's: a fingerprint that unlocks, a `Clear`, a decimal separator.
- **`NumberPad.Label`** and **`NumberPad.Icon`** — the character or the glyph on a cell.

### A cell owns its press state

The root cannot see which of eleven keys is down, so it resolves **both faces** of the cell
style and each cell picks. That is the `Menu`'s arrangement, for the same reason: nothing
re-resolves per key, so a pad of eleven costs what a pad of two would. R5 stays intact —
no slot touches the recipe.

### Bare cells read the page's foreground

`NumberPad.Label` and `NumberPad.Icon` need no prop to know which colour they take: the cell
they are in publishes it. A filled key reads the variant's foreground; a bare corner reads
the page's.

That distinction is load-bearing rather than cosmetic. A `primary` pad puts
`accentForeground` on its digits, and a backspace with no ground of its own would take white
on white. It is also why a raw `color` does not reach the bare cells — a glyph with nothing
tinted behind it has nothing tinted to read against.

## The backspace arrow is a character

`←`, not an icon, so the pad needs no `react-native-svg` for the one glyph it draws itself. It
flips to `→` under RTL, because a backspace points at what it removes and that is the other
way round in a right-to-left layout. Compose a `NumberPad.Icon` to replace it.

## Appearance

Five emphasis levels and no intent among them — there is no `danger` keypad, and `success`
and `warning` are outcomes rather than something you press.

`default` is what the pad ships as, where the `Button` ships as `primary`: eleven keys in the
accent is a wall of colour, and the digit is what the eye is looking for.

| `size` | key height | gap | corner | digit |
| ------ | ---------- | --- | ------ | ----- |
| `sm`   | 60         | 8   | 18     | 24    |
| `md`   | 72         | 10  | 18     | 30    |
| `lg`   | 84         | 12  | 24     | 36    |

The height is **a control and a half**, derived from `controlHeights` rather than written out,
so a theme that raises its controls raises its keypad with them. A key is hit with a thumb
rather than pointed at, and it is hit eleven times in a row — a control-height key turns a PIN
into an exercise in precision. `xs` is absent for the same reason: 48 points holding a
24-point digit is a control pretending to be a key.

The gap is one value for both axes. A grid whose rows sit closer than its columns reads as
three separate rows rather than as one pad.

**No width anywhere in the recipe.** Every cell is `flex: 1`, so the pad is as wide as it is
given and the three columns divide that between them.

## Accessibility

Each cell is a `keyboardkey` — the trait that exists for exactly this, and what makes a screen
reader announce "1, key" rather than "1, button".

The root is `none`. There is no keypad role in React Native, and reaching for `toolbar` or
`list` would have a screen reader announce the box as something it is not.

## See also

- **`InputOTP`** — the boxes this pad usually types into.
- **`NumberField`** — the same value with a keyboard instead of a pad.

import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'
import type { Size } from '../../theme/theme.type'

export type SpinnerSlot = 'root' | 'arc'

/**
 * Seven names, and each one is **an ink** — a spinner has no fill for a variant to paint.
 *
 * That is what makes this a narrowing of §1 bis rather than a second vocabulary. On a
 * `Chip`, `fg` means "the colour that reads *on* this variant's surface", which is why
 * `primary` resolves to `accentForeground` — white. A spinner has no surface, so here a
 * variant names the colour of the thing itself:
 *
 * - **`primary`** — `accent`. The brand, waiting.
 * - **`secondary`** — the accent as it reads on the page rather than on a fill.
 * - **`default`** — `foreground`. A spinner beside text, in the text's own ink.
 * - **`tertiary`** — `muted`. The quiet one, for a refresh nobody is waiting on.
 * - **`success` / `warning` / `danger`** — the three status families, for the wait whose
 *   outcome is already named: deleting is a `danger` wait.
 *
 * **No `ghost`**, because a spinner with no ink is not a spinner, and **no `-soft`
 * slices**, because a soft slice is a fill softened and there is no fill here. Both are
 * absences with a reason, which is the test §1 bis sets for narrowing the union.
 */
export type SpinnerVariant =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'

export type SpinnerSize = Size

/**
 * What the `Spinner` itself understands. R14 — a name in here is the component's, so the
 * style prop that shares it is not exposed: `size` is the spinner's scale and never
 * `ViewStyle`'s, and `color` is R7's tint.
 */
type SpinnerOwnProps = {
  variant?: SpinnerVariant
  /** The diameter, and the thickness that goes with it. */
  size?: SpinnerSize
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). There is one thing to colour on a
   * spinner, so it lands on the ring — and on the track behind it, at the same fraction
   * the variant's own ink is faded to.
   */
  color?: string
  /**
   * `false` stops the rotation and mounts no worklet. The ring stays, so a list of rows
   * switched off with `animation={false}` does not change height.
   *
   * A boolean rather than the `AnimationProp` union `PressableFeedback` takes: there is
   * one animation here, so there is nothing for an object to switch off one at a time.
   */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

export type SpinnerProps = Omit<ViewProps, 'style'> &
  SpinnerOwnProps &
  Omit<ViewStyleProps, keyof SpinnerOwnProps | keyof ViewProps>

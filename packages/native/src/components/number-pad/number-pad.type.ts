import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { IconContextValue, IconProps } from '../../system/icon'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type NumberPadSlot =
  | 'root'
  | 'row'
  | 'key'
  | 'label'
  | 'icon'
  | 'ghost'
  | 'ghostLabel'
  | 'ghostIcon'

/**
 * The five emphasis levels, and no intent among them. A keypad is furniture — there is no
 * such thing as a `danger` keypad, and `success` and `warning` are outcomes rather than
 * something you press.
 *
 * `default` is the default here, where the `Button` takes `primary`: eleven keys in the
 * accent is a wall of colour, and the digit is what the eye is looking for.
 */
export type NumberPadVariant =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'tertiary'
  | 'ghost'

/**
 * Three steps, and `xs` is the one missing. A key is hit with a thumb rather than pointed
 * at, so its height is a control and a half; at `xs` that is 48 points holding a 24-point
 * digit, which is a control-sized target pretending to be a key.
 */
export type NumberPadSize = Exclude<Size, 'xs'>

type NumberPadOwnProps = {
  variant?: NumberPadVariant
  /** The key's height, its corner, the gaps and the digit. Never a width. */
  size?: NumberPadSize
  /** Overrides the corner `size` chose. */
  radius?: RadiusKey
  /**
   * A raw tint (R7), landing where the variant put its tokens — the filled keys only. The
   * backspace and the free cell keep the page's foreground, because a bare glyph on a
   * tinted pad has no tinted ground to read against.
   */
  color?: string
  /** Controlled. Leave it out and the pad keeps the value itself. */
  value?: string
  /** The starting value when uncontrolled. */
  defaultValue?: string
  onChangeText?: (value: string) => void
  /** Fired once the value reaches `maxLength` — the PIN screen's only event. */
  onComplete?: (value: string) => void
  /**
   * How long the value may get. Unset it is unbounded, which is what a pad in front of an
   * amount wants; set, a press past it changes nothing at all rather than truncating.
   */
  maxLength?: number
  /** Dims every key and stops all of them. */
  isDisabled?: boolean
  /**
   * **One cell**, and it fills the free corner of the bottom row — beside the `0` and
   * opposite the backspace. `NumberPad.Action` is what usually goes there: a fingerprint,
   * a decimal separator, a `Clear`.
   *
   * The digits and the backspace are not composed, because they are not a decision (see
   * `NUMBER_PAD_ROWS`). Left out, the corner is an empty cell that keeps the `0` centred.
   */
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

/** R14 — it renders a `View`, so it carries that node's style keys. */
export type NumberPadProps = NumberPadOwnProps &
  Omit<ViewProps, 'style' | 'children'> &
  Omit<ViewStyleProps, keyof NumberPadOwnProps>

/**
 * What every cell takes: the press behaviour of a `PressableFeedback`, minus the state the
 * cell owns itself.
 */
type CellProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'layout' | 'style' | 'children'
> & {
  /** Overrides the pad's own — a single key can be out while the rest are live. */
  isDisabled?: boolean
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

export type NumberPadKeyProps = CellProps & {
  /**
   * What this key inserts. Usually the digit it shows, which is also what it renders when
   * nothing is composed inside it.
   */
  value: string
}

export type NumberPadBackspaceProps = CellProps

export type NumberPadActionProps = CellProps

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type NumberPadLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

export type NumberPadIconProps = IconProps

/**
 * Which cell a label or a glyph is inside, and how that cell is doing.
 *
 * `tone` is what lets `NumberPad.Label` and `NumberPad.Icon` pick the right foreground with
 * no prop of their own: a filled key's is the variant's, a bare corner's is the page's.
 */
export type NumberPadCellContextValue = {
  tone: NumberPadCellTone
  isPressed: boolean
  isDisabled: boolean
}

/**
 * Whether a cell is filled or bare. Not a public prop: the three cells have already made
 * that decision, and a caller choosing it would be choosing which cell they meant.
 */
export type NumberPadCellTone = 'key' | 'ghost'

/**
 * R5 — resolved styles, not props for a cell to resolve a second time.
 *
 * Both faces of a cell are in here because **a cell owns its own press state and the root
 * cannot see it**: the root resolves pressed and unpressed once, and each cell picks. That
 * is the `Menu`'s arrangement, for the same reason — nothing re-resolves per key, so a pad
 * of eleven costs what a pad of two would.
 */
export type NumberPadContextValue = {
  rowStyle: StyleProp<ViewStyle>
  keyStyle: StyleProp<ViewStyle>
  keyPressedStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  ghostStyle: StyleProp<ViewStyle>
  ghostPressedStyle: StyleProp<ViewStyle>
  ghostLabelStyle: StyleProp<TextStyle>
  /**
   * Values, not a style: `Icon` hands `size` and `color` to a third-party component, so
   * the root flattens each icon slot once here rather than in every icon it contains.
   */
  icon: IconContextValue
  ghostIcon: IconContextValue
  /** Appends, clamped to `maxLength`, and fires `onComplete` when it arrives. */
  insert: (text: string) => void
  /** Drops the last character. */
  backspace: () => void
  /** Empties it — what a long press on the backspace does. */
  clear: () => void
  value: string
  maxLength: number | undefined
  isDisabled: boolean
}

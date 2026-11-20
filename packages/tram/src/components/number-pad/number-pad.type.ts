import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type {
  IconContextValue,
  IconProps,
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { TramSize } from '../../theme/tram-tokens'

export type NumberPadSlot =
  | 'root'
  | 'row'
  | 'key'
  | 'label'
  | 'icon'
  | 'ghostLabel'
  | 'ghostIcon'

export type NumberPadSize = TramSize

type NumberPadOwnProps = {
  /** The keys' height — 48, 56, 64 — the gaps and the digits. Never a width. */
  size?: NumberPadSize
  /** Controlled. Leave it out and the pad keeps the value itself. */
  value?: string
  /** The starting value when uncontrolled. */
  defaultValue?: string
  onChangeText?: (value: string) => void
  /** Fired once the value reaches `maxLength` — the code screen's only event. */
  onComplete?: (value: string) => void
  /**
   * How long the value may get. Unset it is unbounded; set, a press past it changes
   * nothing at all rather than truncating.
   */
  maxLength?: number
  /** Greys every key and stops all of them. */
  isDisabled?: boolean
  /**
   * **One cell**, the free corner of the bottom row, beside the `0` and opposite the
   * backspace — usually a `NumberPad.Action`. Left out, the corner is an empty cell that
   * keeps the `0` centred.
   */
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

/**
 * Its own props, the pad's `View`'s and its `ViewStyle` keys. **No `variant`, `radius`
 * or `color`**, where Native fills its keys five ways: the Metro dialer draws its digits on
 * the ground, in the page's ink, with no box to fill, round or tint.
 */
export type NumberPadProps = NumberPadOwnProps &
  Omit<ViewProps, 'style' | 'children'> &
  Omit<ViewStyleProps, keyof NumberPadOwnProps>

/** What every cell takes: the press behaviour of a `PressableFeedback`. */
type CellProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'layout' | 'style' | 'children'
> & {
  /** Overrides the pad's own — a single key can be out while the rest are live. */
  isDisabled?: boolean
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

export type NumberPadKeyProps = CellProps & {
  /** What this key inserts — and what it shows when nothing is composed inside it. */
  value: string
}

export type NumberPadBackspaceProps = CellProps

export type NumberPadActionProps = CellProps

/** `Text`'s own props win over the `TextStyle` keys of the same name. */
export type NumberPadLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

export type NumberPadIconProps = IconProps

/** Whether a cell holds a digit or something else — an action, the backspace. */
export type NumberPadCellTone = 'key' | 'ghost'

/** Which cell a label or a glyph is inside, so it needs no prop to pick its type. */
export type NumberPadCellContextValue = {
  tone: NumberPadCellTone
  isPressed: boolean
  isDisabled: boolean
}

/** Resolved styles and the edits, decided once on the root. */
export type NumberPadContextValue = {
  rowStyle: StyleProp<ViewStyle>
  keyStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  ghostLabelStyle: StyleProp<TextStyle>
  /** Values, not a style: `Icon` hands `size` and `color` to a third-party component. */
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

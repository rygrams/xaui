import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type {
  IconContextValue,
  IconProps,
  PressableFeedbackProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type RatingSlot = 'root' | 'item' | 'glyph' | 'glyphFill'

export type RatingSize = TramSize

/** Which layer of a mark a glyph is drawn in. */
export type RatingTone = 'empty' | 'fill'

type RatingOwnProps = {
  /** The mark's side — 16, 24, 32 — and the gap between marks. */
  size?: RatingSize
  /**
   * One of the twenty named accents, for the filled marks of a rating that is not in the
   * theme's accent. `color` wins when both are set.
   */
  accent?: TramAccentName
  /** A raw tint for the filled marks — the amber of a store, the page's ink. */
  color?: string
  /** How many marks. @default 5 */
  max?: number
  /** Controlled. Leave it out and the rating keeps the value itself. */
  value?: number
  /** The starting value when uncontrolled. @default 0 */
  defaultValue?: number
  onValueChange?: (value: number) => void
  /**
   * The step a press lands on. `1` is whole marks, `0.5` halves. It governs input only: a
   * `value` of any precision is shown as it is, so 4.3 fills the fifth mark three tenths
   * of the way. @default 1
   */
  precision?: number
  /** A display rather than a control: the marks take no press and read as an image. */
  isReadOnly?: boolean
  isDisabled?: boolean
  /** The glyph, written once and drawn once per mark. Left out, the mark is a star. */
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

/**
 * Its own props, the row's, and its `ViewStyle` keys. **No `variant`**, where Native has
 * three fills for the given marks: Tram fills them with the accent, `accent` names another
 * and `color` writes one.
 */
export type RatingProps = RatingOwnProps &
  Omit<ViewProps, 'style' | 'children'> &
  Omit<ViewStyleProps, keyof RatingOwnProps>

export type RatingItemProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'layout' | 'style' | 'children'
> & {
  /** Which mark this is, counted from zero. */
  index: number
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

export type RatingIconProps = IconProps

/** Resolved styles and values, decided once on the root. */
export type RatingContextValue = {
  itemStyle: StyleProp<ViewStyle>
  glyphStyle: StyleProp<TextStyle>
  glyphFillStyle: StyleProp<TextStyle>
  /** Values, not a style: `Icon` hands `size` and `color` to a third-party component. */
  icon: IconContextValue
  iconFill: IconContextValue
  /** How wide one mark is, which is what the fill layer is clipped against. */
  markSize: number
  /** How far a mark's touch reaches past it, so a mark of 16 is pressed like one of 48. */
  reach: number
  value: number
  max: number
  precision: number
  /** What a mark calls with the fraction of itself that was pressed. */
  select: (index: number, ratio: number) => void
  isReadOnly: boolean
  isDisabled: boolean
}

/** Which layer a glyph is in, so it needs no prop to know which colour it takes. */
export type RatingLayerContextValue = {
  tone: RatingTone
}

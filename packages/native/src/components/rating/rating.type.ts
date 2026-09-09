import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { IconContextValue, IconProps } from '../../system/icon'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { ViewStyleProps } from '../../system/style-props'
import type { Size } from '../../theme/theme.type'

export type RatingSlot = 'root' | 'item' | 'glyph' | 'glyphFill'

/**
 * Three, naming **which colour a filled mark takes** — the only thing this component paints
 * that is a decision. The unfilled marks keep a neutral fill, which is the ground the filled
 * ones are read against.
 *
 * - `primary` — the accent.
 * - `secondary` — the neutral foreground.
 * - `tertiary` — the page's own foreground, for a rating on a coloured card.
 *
 * The amber every store uses is not a token here, because it is not a role the theme has an
 * opinion about — it is `color="#f59e0b"`, which is what a raw tint is for (R7). `warning`
 * is deliberately not offered in its place: it is a status, and a four-star review is not a
 * warning.
 */
export type RatingVariant = 'primary' | 'secondary' | 'tertiary'

export type RatingSize = Size

/** Which layer of a mark a glyph is drawn in. */
export type RatingTone = 'empty' | 'fill'

type RatingOwnProps = {
  variant?: RatingVariant
  /** The mark's size and the gap between marks. */
  size?: RatingSize
  /** A raw tint (R7) for the filled marks. The unfilled ones keep their neutral ground. */
  color?: string
  /** How many marks. @default 5 */
  max?: number
  /** Controlled. Leave it out and the rating keeps the value itself. */
  value?: number
  /** The starting value when uncontrolled. @default 0 */
  defaultValue?: number
  onValueChange?: (value: number) => void
  /**
   * The step a press lands on. `1` is whole marks, `0.5` halves.
   *
   * It governs **input only** — a `value` of any precision displays as it is, so an average
   * of 4.3 fills the fifth mark three tenths of the way whatever this says.
   *
   * @default 1
   */
  precision?: number
  /**
   * A display rather than a control: the marks stop responding and announce themselves as
   * an image showing a value, not as buttons.
   */
  isReadOnly?: boolean
  isDisabled?: boolean
  /**
   * **The glyph**, drawn once per mark, in each of the two layers a mark has:
   *
   * ```tsx
   * <Rating max={5} value={value} onValueChange={setValue}>
   *   <Rating.Icon as={HeartIcon} />
   * </Rating>
   * ```
   *
   * One element rather than a row of them, because the number of marks is `max` — data, not
   * markup — and five hand-written marks is a row that disagrees with the prop the moment
   * either changes. Left out, the mark is a star.
   *
   * A label beside the row is **not** in here: that is a `Typography` in a `Row`, and it is
   * the screen's rather than the rating's (R1).
   */
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

/** R14 — it renders a `View`, so it carries that node's style keys. */
export type RatingProps = RatingOwnProps &
  Omit<ViewProps, 'style' | 'children'> &
  Omit<ViewStyleProps, keyof RatingOwnProps>

export type RatingItemProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'layout' | 'style' | 'children'
> & {
  /** Which mark this is, counted from zero. */
  index: number
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

export type RatingIconProps = IconProps

/** R5 — resolved styles, not props for a slot to resolve a second time. */
export type RatingContextValue = {
  itemStyle: StyleProp<ViewStyle>
  glyphStyle: StyleProp<TextStyle>
  glyphFillStyle: StyleProp<TextStyle>
  /**
   * Values, not a style: `Icon` hands `size` and `color` to a third-party component, so the
   * root flattens each layer once here rather than in every glyph it contains.
   */
  icon: IconContextValue
  iconFill: IconContextValue
  /** How wide one mark is, which is what the fill layer is clipped against. */
  markSize: number
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

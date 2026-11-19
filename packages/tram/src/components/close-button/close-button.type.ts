import type { ReactNode } from 'react'
import type { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native'
import type { PressableFeedbackProps, ViewStyleProps } from '@xaui/native/system'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type CloseButtonSlot = 'root' | 'glyph'

/**
 * How the circle is drawn. The `Fab`'s two drawings, and the `Button`'s `text` for a
 * cross with no circle round it.
 *
 * | Variant     | Drawn as                                                          |
 * | ----------- | ----------------------------------------------------------------- |
 * | `outline`   | the App Bar's button: a thin circle and a cross, in the page's ink |
 * | `contained` | a flat disc, the cross in the ink that reads on it                 |
 * | `text`      | the cross alone, for the corner of a panel                         |
 */
export type CloseButtonVariant = 'outline' | 'contained' | 'text'

/** The circle's diameter: 32, 40 and 48 points, around a cross drawn in 16, 20 and 24. */
export type CloseButtonSize = TramSize

type CloseButtonOwnProps = {
  /**
   * A thin circle, a flat disc, or the cross alone. All three take the same room: the
   * line of an `outline` is drawn in the fill of a `contained`, and is there but clear on
   * `text`.
   *
   * @default 'outline'
   */
  variant?: CloseButtonVariant
  /** The circle's diameter. Every size is pressed as 48: `hitSlop` makes up the rest. */
  size?: CloseButtonSize
  /**
   * One of the twenty named accents. Unset, the button is the page's ink, not the
   * theme's accent: closing is not the action a screen puts forward. A `contained` disc
   * is filled with the accent's true colour; an `outline` or a `text` cross is drawn in
   * its ink, moved until it reads on the ground. `color` wins when both are set.
   */
  accent?: TramAccentName
  /** A raw tint for the disc, or for the line and cross — never corrected. */
  color?: string
  /**
   * A grey line and cross — or a grey disc with the cross cut out of it — that does not
   * answer. The grey is the state: nothing is dimmed.
   */
  isDisabled?: boolean
  /**
   * Replaces the built-in cross — an `Icon`, which takes the cross's size and ink without
   * being told. Unset, the button draws its own from two bars, so a dismissible screen
   * works in a project that has installed no icon set.
   */
  children?: ReactNode
  /** `Pressable`'s function form as much as an object or an array. Lands on the circle. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}

type CloseButtonBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children'
>

/**
 * The Native `CloseButton`'s props, less `radius`: a Tram close button is a circle. Its
 * `variant` is Tram's three drawings rather than Native's four emphasis levels, `size`
 * has no `xs`, and `accent` is Tram's.
 */
export type CloseButtonProps = CloseButtonOwnProps &
  CloseButtonBehaviourProps &
  Omit<ViewStyleProps, keyof CloseButtonOwnProps>

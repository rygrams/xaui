import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type {
  AnimationProp,
  IconContextValue,
  IconProps,
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { DiscGround } from '../../system/disc-paint'
import type { CascadeTurns } from '../../system/cascade-turns'
import type { DockEdge } from '../../system/float-place'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type AppBarSlot =
  | 'root'
  | 'row'
  | 'button'
  | 'label'
  | 'more'
  | 'dot'
  | 'menu'
  | 'menuItem'
  | 'menuItemLabel'
  | 'scrim'

/**
 * The edge the bar is docked on. `bottom` is the Metro App Bar's place; `top` lays the
 * same bar under the status bar, in the same order — circles, labels, then the menu —
 * so that it opens downward, over the page.
 */
export type AppBarPlacement = DockEdge

/**
 * `default` shows the circles; `minimal` folds the bar to a thin strip of its "…", which
 * unfolds to the circles, their labels and the menu — the Metro App Bar's `Minimized`.
 */
export type AppBarMode = 'default' | 'minimal'

/** The circles' diameter: 32, 40 and 48 points, around a glyph of 16, 20 and 24 — the `Fab`'s. */
export type AppBarSize = TramSize

type AppBarOwnProps = {
  /**
   * The edge of the nearest positioned ancestor the bar is docked on. There is no way to
   * lay it in the flow. A change is a way out by the old edge, then a way in by the new one.
   *
   * @default 'bottom'
   */
  placement?: AppBarPlacement
  /** @default 'default' */
  mode?: AppBarMode
  /** The circles' diameter. Every size is pressed as 48: `hitSlop` makes up the rest. */
  size?: AppBarSize
  /**
   * One of the twenty named accents: the circles and their glyphs are drawn in its ink, moved
   * until it reads on the bar. Left out, they are in the bar's own ink, white or black —
   * the Metro App Bar's — and the accent is left to the page. `color` wins when both are set.
   */
  accent?: TramAccentName
  /** A raw colour for the circles and their glyphs — never corrected. */
  color?: string
  /**
   * The labels under the circles stay shown with the bar closed. Tram's own: Metro showed
   * them only once the "…" had opened the bar.
   */
  hasLabels?: boolean
  /** Open: the labels under the circles and the menu are shown. */
  isOpen?: boolean
  /** @default false */
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /**
   * `false` sends the bar back past its edge, where it stays laid out but can be neither
   * seen, pressed nor read; `true` brings it back. Hiding an open bar closes it.
   *
   * @default true
   */
  isVisible?: boolean
  /**
   * Adds the safe area of the edge the bar is on — the home indicator under a `bottom` bar,
   * the status bar and the notch over a `top` one — so that the band runs under it. The
   * insets come from the hook the app handed `TramProvider` (`safeArea={{ useSafeAreaInsets }}`);
   * without one they are 0. `false` for a bar docked in a box that does not reach the
   * screen's edge.
   *
   * @default true
   */
  hasSafeArea?: boolean
  /**
   * What a screen reader calls the "…". The case and the language are the app's.
   *
   * @default 'more'
   */
  moreLabel?: string
  /** `disable-all` sets everything down without a movement, the bar and every button. */
  animation?: AnimationProp
  style?: StyleProp<ViewStyle>
  /** Up to four `AppBar.Button`, and an `AppBar.Menu`. */
  children?: ReactNode
}

/** The band is a view: its own props, then the style props, which `style` wins over. */
export type AppBarProps = AppBarOwnProps &
  Omit<ViewProps, keyof AppBarOwnProps> &
  Omit<ViewStyleProps, keyof AppBarOwnProps>

type PressableOwnProps = {
  /** A grey line and glyph — and a grey label — that do not answer. Nothing is dimmed. */
  isDisabled?: boolean
  /** `Pressable`'s function form as much as an object or an array. Lands on the circle. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}

type PressableBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children' | 'animation' | 'asChild'
>

export type AppBarButtonProps = PressableOwnProps &
  PressableBehaviourProps &
  Omit<ViewStyleProps, keyof PressableOwnProps> & {
    /** The glyph — an `AppBar.Icon` — and an `AppBar.Label`. A bare string is the label. */
    children?: ReactNode
  }

export type AppBarLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/** `size` and `color` default to what the button resolved; passing either wins. */
export type AppBarIconProps = IconProps

export type AppBarMenuProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & {
    /** `AppBar.MenuItem`s. */
    children?: ReactNode
  }

export type AppBarMenuItemProps = PressableOwnProps &
  PressableBehaviourProps &
  Omit<ViewStyleProps, keyof PressableOwnProps> & {
    /** The entry's text — the bar sets it — or the caller's own content. */
    children?: ReactNode
  }

/** Resolved values, not props for a slot to resolve a second time. */
export type AppBarContextValue = {
  styles: {
    button: StyleProp<ViewStyle>
    label: StyleProp<TextStyle>
    menu: StyleProp<ViewStyle>
    menuItem: StyleProp<ViewStyle>
    menuItemLabel: StyleProp<TextStyle>
  }
  /** The circle and its glyph, in points. */
  diameter: number
  glyph: number
  /** The width a button takes in the row: its circle and the room for its label. */
  cell: number
  /** The bar's colours: what the circles and the menu are drawn on. */
  ground: DiscGround
  accent: TramAccentName | undefined
  color: string | undefined
  isOpen: boolean
  hasLabels: boolean
  /** 0 closed, 1 open, on the `navigation` spring: what opens the room for the labels. */
  open: SharedValue<number>
  /** 0 closed, 1 open, on the Metro curve: what fades the labels in. */
  arrival: SharedValue<number>
  /** The turns of the menu's cascade. */
  turns: CascadeTurns
  /** A press leans the control: motion is neither reduced nor switched off. */
  isTilting: boolean
  /** An ancestor, or the bar itself, asked for no animation at all. */
  isStill: boolean
  /** What a press on a button or an entry does once the caller's handler has run. */
  close: () => void
}

/** What a button hands its glyph and its label. */
export type AppBarButtonContextValue = {
  /** Values, not a style: `Icon` hands them to a third-party component. */
  icon: IconContextValue
  /** The label's ink: the bar's, or the grey of a disabled button. */
  labelColor: string
}

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
  IconContextValue,
  IconProps,
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { TramAccentName } from '../../theme/tram-tokens'

export type TileSlot = 'root' | 'bare' | 'face' | 'label' | 'count' | 'icon'

/**
 * How many cells of the start screen a tile takes: one, four (2 × 2) or eight (4 × 2).
 *
 * **Not `TramSize`, deliberately.** `sm` / `md` / `lg` grow a control in every direction;
 * a wide tile is not a large one, it is a medium one twice as long.
 */
export type TileSize = 'small' | 'medium' | 'wide'

/**
 * Three ways to fill the square. A start screen where every tile shouts the accent is
 * Metro's; Tram spends it on a few and lets the rest sit back.
 *
 * | Variant     | Drawn as                                         |
 * | ----------- | ------------------------------------------------ |
 * | `contained` | filled with the true colour                      |
 * | `flat`      | filled with its soft slice, the accent as ink    |
 * | `surface`   | the discreet surface — `accent` paints nothing   |
 */
export type TileVariant = 'contained' | 'flat' | 'surface'

export type TileFaceName = 'front' | 'back'

/**
 * How a tile goes from one face to the other: turned over around its horizontal axis, or
 * the front rising out as the back follows it in.
 */
export type TileTransition = 'flip' | 'slide'

type TileOwnProps = {
  variant?: TileVariant
  /** The cells the tile takes in a `Tile.Grid`, and its shape outside one. */
  size?: TileSize
  /**
   * One of the twenty named accents, for a tile that is not in the theme's accent.
   * `color` wins when both are set. A `surface` tile has no accent to repaint.
   */
  accent?: TramAccentName
  /** A raw `#RRGGBB` tint, never a token: the fill of a `contained`, the slice of a `flat`. */
  color?: string
  /**
   * The face that shows. The tile never turns on its own: the app holds the face, with
   * `useTileFace` for a cadence, so a tile out of sight is not left turning.
   *
   * @default 'front'
   */
  face?: TileFaceName
  /** @default 'flip' */
  transition?: TileTransition
  isDisabled?: boolean
  /** `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

type TileBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children'
>

export type TileProps = TileOwnProps &
  TileBehaviourProps &
  Omit<ViewStyleProps, keyof TileOwnProps>

type TileFaceOwnProps = { children?: ReactNode }

export type TileFaceProps = TileFaceOwnProps &
  Omit<ViewProps, keyof TileFaceOwnProps> &
  Omit<ViewStyleProps, keyof TileFaceOwnProps | keyof ViewProps>

type TileTextOwnProps = { children?: ReactNode }

export type TileLabelProps = TileTextOwnProps &
  Omit<TextProps, keyof TileTextOwnProps> &
  Omit<TextStyleProps, keyof TileTextOwnProps | keyof TextProps>

export type TileCountProps = TileLabelProps

/** `size` and `color` default to what the root resolved; passing either wins. */
export type TileIconProps = IconProps

type TileGridOwnProps = {
  /**
   * How many cells across: 4 on a phone, 6 on a tablet, 8 on an open foldable —
   * `tramTileColumns`. @default 4
   */
  columns?: number
  /** The space between two tiles, in points. @default the theme's second spacing step */
  gap?: number
  /**
   * The tiles. Each child's `size` prop is read to place it, so a component wrapping a
   * `Tile` has to take `size` and hand it down.
   */
  children?: ReactNode
}

export type TileGridProps = TileGridOwnProps &
  Omit<ViewProps, keyof TileGridOwnProps> &
  Omit<ViewStyleProps, keyof TileGridOwnProps | keyof ViewProps>

/** Resolved styles and the turn the faces follow — nothing a slot resolves again. */
export type TileContextValue = {
  faceStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  countStyle: StyleProp<TextStyle>
  /** Values, not a style: `Icon` hands them to a third-party component. */
  icon: IconContextValue
  /** What is drawn on the tile reads in this colour — for the app's own text. */
  foreground: string | undefined
  face: TileFaceName
  transition: TileTransition
  /** 0 on the front, 1 on the back, and on a spring in between. */
  turn: SharedValue<number>
  /** The tile's height once measured, which a sliding face travels. */
  height: SharedValue<number>
  isDisabled: boolean
}

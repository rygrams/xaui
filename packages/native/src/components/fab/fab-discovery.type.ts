import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { DiscoveryGeometry } from '../../utils/discovery'
import type { Anchor } from '../../utils/placement'
import type { FabProps } from './fab.type'

export type FabDiscoverySlot =
  | 'overlay'
  | 'circle'
  | 'halo'
  | 'content'
  | 'title'
  | 'description'
  | 'action'

export type FabDiscoveryAnchor = Anchor

type FabDiscoveryOwnProps = {
  /**
   * Whether the coach mark is up.
   *
   * Controlled far more often than not: a discovery is shown because the app decided this
   * reader has not seen the feature, which is a question only the app can answer.
   */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /**
   * A raw tint (R7) for the disc and the text on it. Unset it is the theme's `accent`,
   * which is what a coach mark is for — the one thing on this screen worth pointing at.
   */
  color?: string
  /** The disc's diameter, as a multiple of the window's width. @default 1.65 */
  scale?: number
  /** How far the ring stands off the target, in points. @default 14 */
  padding?: number
  children?: ReactNode
}

/** The root renders **no node** — `Fab.Discovery.Target` is where `ref` and `style` live. */
export type FabDiscoveryProps = FabDiscoveryOwnProps

/**
 * Everything a `Fab` takes. The press is the caller's own: a coach mark is opened because
 * the app decided to teach something, so pressing the thing being taught does what it
 * always did, and dismisses.
 */
export type FabDiscoveryTargetProps = FabProps

type FabDiscoveryOverlayOwnProps = { children?: ReactNode; isDismissable?: boolean }

export type FabDiscoveryOverlayProps = FabDiscoveryOverlayOwnProps &
  Omit<ViewProps, keyof FabDiscoveryOverlayOwnProps> &
  Omit<ViewStyleProps, keyof FabDiscoveryOverlayOwnProps | keyof ViewProps>

export type FabDiscoveryContentProps = ViewProps &
  ViewStyleProps & { children?: ReactNode }

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
type FabDiscoveryTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

export type FabDiscoveryTitleProps = FabDiscoveryTextProps
export type FabDiscoveryDescriptionProps = FabDiscoveryTextProps

type FabDiscoveryActionOwnProps = {
  children?: ReactNode
  /** Whether pressing it takes the coach mark down. @default true */
  closesOnPress?: boolean
  asChild?: boolean
}

export type FabDiscoveryActionProps = FabDiscoveryActionOwnProps &
  Omit<PressableProps, keyof FabDiscoveryActionOwnProps> &
  Omit<ViewStyleProps, keyof FabDiscoveryActionOwnProps | keyof PressableProps>

/** R5 — resolved style ids, the measured geometry, and the state the slots read. */
export type FabDiscoveryContextValue = {
  overlayStyle: StyleProp<ViewStyle>
  circleStyle: StyleProp<ViewStyle>
  haloStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  actionStyle: StyleProp<TextStyle>
  /**
   * Where every part goes, in the portal host's own coordinates — `null` until the target
   * has been measured, which is the frame before the mark can be drawn at all.
   */
  geometry: DiscoveryGeometry | null
  /** Records the rendered message height so its next layout uses the right circle chord. */
  setMessageHeight: (height: number) => void
  /**
   * Which way the **lines** of the text set, which is not the same as which way the block
   * is pushed. `alignItems` makes a paragraph's box hug the trailing edge and leaves every
   * line inside it starting at the leading one — a right-aligned block of left-aligned
   * text, which is the ragged shape on the screenshot.
   *
   * `left` and `right` because React Native's `textAlign` has no logical value to offer
   * (R13's exception, and the reason this is derived here rather than written in a style).
   */
  textAlign: 'left' | 'right'
  isOpen: boolean
  open: () => void
  close: () => void
  anchor: FabDiscoveryAnchor | null
  setAnchor: (anchor: FabDiscoveryAnchor) => void
}

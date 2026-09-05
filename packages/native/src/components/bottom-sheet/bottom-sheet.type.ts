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
import type { RadiusKey } from '../../theme/theme.type'

export type BottomSheetSlot =
  | 'overlay'
  | 'content'
  | 'handle'
  | 'title'
  | 'description'

type BottomSheetOwnProps = {
  children?: ReactNode
  radius?: RadiusKey
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  isDisabled?: boolean
  /**
   * How far down the sheet has to be dragged before letting go closes it, as a fraction
   * of its own height.
   *
   * @default 0.35
   */
  dismissThreshold?: number
  /**
   * How much of a long sheet shows when it is reduced, in points.
   *
   * Setting it gives the sheet a second state between up and gone: the tail below this
   * height slides off the bottom of the screen and comes back when it expands. The sheet
   * is **not re-laid out** — it is the same box, moved — so what is cut is cut wherever the
   * line happens to fall.
   *
   * Left unset the sheet has no reduced state and behaves as it always has.
   */
  collapsedHeight?: number
  /**
   * Whether the sheet is at its full height. Only means anything alongside
   * `collapsedHeight` — without one there is nothing to be reduced to.
   *
   * @default true
   */
  isExpanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (isExpanded: boolean) => void
}

/** The root renders **no node** — `ref` and `style` live on the parts that draw. */
export type BottomSheetProps = BottomSheetOwnProps

type TriggerOwnProps = { children?: ReactNode; asChild?: boolean }

export type BottomSheetTriggerProps = TriggerOwnProps &
  Omit<PressableProps, keyof TriggerOwnProps> &
  Omit<ViewStyleProps, keyof TriggerOwnProps | keyof PressableProps>

type OverlayOwnProps = { children?: ReactNode; isDismissable?: boolean }

export type BottomSheetOverlayProps = OverlayOwnProps &
  Omit<ViewProps, keyof OverlayOwnProps> &
  Omit<ViewStyleProps, keyof OverlayOwnProps | keyof ViewProps>

type ContentOwnProps = {
  children?: ReactNode
  /** Whether dragging the sheet down closes it. */
  isSwipeable?: boolean
}

export type BottomSheetContentProps = ContentOwnProps &
  Omit<ViewProps, keyof ContentOwnProps> &
  Omit<ViewStyleProps, keyof ContentOwnProps | keyof ViewProps>

/**
 * The grab bar. It draws a pill and holds nothing — and on a sheet with a
 * `collapsedHeight` it is also the control that reduces and restores it, so it takes
 * `Pressable`'s props there.
 */
export type BottomSheetHandleProps = Omit<PressableProps, 'children'> &
  ViewStyleProps

type SummaryOwnProps = { children?: ReactNode }

/** The part that stays when the sheet is reduced. A direct child of `Content`. */
export type BottomSheetSummaryProps = SummaryOwnProps &
  Omit<ViewProps, keyof SummaryOwnProps> &
  Omit<ViewStyleProps, keyof SummaryOwnProps | keyof ViewProps>

type TextOwnProps = { children?: ReactNode }

export type BottomSheetTitleProps = TextOwnProps &
  Omit<TextProps, keyof TextOwnProps> &
  Omit<TextStyleProps, keyof TextOwnProps | keyof TextProps>

export type BottomSheetDescriptionProps = BottomSheetTitleProps

type CloseOwnProps = { children?: ReactNode; asChild?: boolean }

export type BottomSheetCloseProps = CloseOwnProps &
  Omit<PressableProps, keyof CloseOwnProps> &
  Omit<ViewStyleProps, keyof CloseOwnProps | keyof PressableProps>

/** R5 — resolved style ids and the state the slots read. */
export type BottomSheetContextValue = {
  overlayStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  handleStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  isOpen: boolean
  isDisabled: boolean
  dismissThreshold: number
  /**
   * How much of the sheet shows when reduced, resolved: a `Summary`'s bottom edge if there
   * is one, else the `collapsedHeight` prop. `undefined` when the sheet has no reduced
   * state at all.
   */
  collapsedHeight?: number
  /** How `BottomSheet.Summary` reports the edge the sheet should cut at. */
  setSummaryExtent: (extent: number) => void
  /**
   * How `BottomSheet.Content` reports the padding it ends with, which the seam a summary
   * measured is extended by — a reduced sheet keeps the air its expanded self has.
   */
  setPaddingBottom: (padding: number) => void
  /** Always `true` on a sheet that cannot be reduced. */
  isExpanded: boolean
  isCollapsible: boolean
  open: () => void
  close: () => void
  toggle: () => void
  expand: () => void
  collapse: () => void
  toggleExpanded: () => void
}

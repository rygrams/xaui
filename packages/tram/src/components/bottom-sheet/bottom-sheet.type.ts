import type { ReactNode, RefObject } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type { TextStyleProps, ViewStyleProps } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { NodeSlot } from '../../system/node-slot'

export type BottomSheetSlot =
  | 'overlay'
  | 'content'
  | 'title'
  | 'description'
  | 'trigger'
  | 'triggerLabel'
  | 'close'
  | 'closeLabel'
  | 'closeCorner'
  | 'closeBar'

type BottomSheetOwnProps = {
  children?: ReactNode
  /**
   * Native's prop, kept so the two roots take the same props. It draws nothing here: the
   * band runs from one edge of the screen to the other, and its top is straight.
   */
  radius?: RadiusKey
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /** The trigger is grey and opens nothing. */
  isDisabled?: boolean
  /**
   * How far down the band has to be dragged before letting go closes it, as a fraction
   * of its own height.
   *
   * @default 0.35
   */
  dismissThreshold?: number
}

/**
 * The root renders **no node** — `ref` and `style` live on the parts that draw.
 *
 * No `accent`, no `color` and no `size`: the band is the theme's contrast and carries no
 * accent — what is put on it has its own — and Native's sheet has no size.
 *
 * **One height, the content's.** Native's reduced state — `collapsedHeight`,
 * `isExpanded`, `defaultExpanded`, `onExpandedChange` and the `Summary` slot — is not
 * here, and neither is the `Handle`: the band opens as tall as what is in it, and goes.
 */
export type BottomSheetProps = BottomSheetOwnProps

type PressOwnProps = { children?: ReactNode; asChild?: boolean }

type BottomSheetPressProps = PressOwnProps &
  Omit<PressableProps, keyof PressOwnProps> &
  Omit<ViewStyleProps, keyof PressOwnProps | keyof PressableProps>

/**
 * What brings the band up. It paints nothing of its own: `asChild` makes it a `Button`,
 * which is then grey while the sheet is disabled; a string is set in `body`.
 */
export type BottomSheetTriggerProps = BottomSheetPressProps

type OverlayOwnProps = {
  children?: ReactNode
  /**
   * Off for a band that has to be answered: neither a touch on the dimmed page nor the
   * system's back closes it. The drag is a separate refusal — `isSwipeable={false}` on
   * the content, as in Native.
   */
  isDismissable?: boolean
}

export type BottomSheetOverlayProps = OverlayOwnProps &
  Omit<ViewProps, keyof OverlayOwnProps> &
  Omit<ViewStyleProps, keyof OverlayOwnProps | keyof ViewProps>

type ContentOwnProps = {
  children?: ReactNode
  /** Whether dragging the band down closes it. */
  isSwipeable?: boolean
}

/**
 * The band. It ends at the very bottom of the screen and is padded clear of the home
 * indicator by the safe area handed to `TramProvider`.
 */
export type BottomSheetContentProps = ContentOwnProps &
  Omit<ViewProps, keyof ContentOwnProps> &
  Omit<ViewStyleProps, keyof ContentOwnProps | keyof ViewProps>

type TextOwnProps = { children?: ReactNode }

export type BottomSheetTitleProps = TextOwnProps &
  Omit<TextProps, keyof TextOwnProps> &
  Omit<TextStyleProps, keyof TextOwnProps | keyof TextProps>

export type BottomSheetDescriptionProps = BottomSheetTitleProps

/**
 * Anything that sends the band back down. **Left empty it is the cross in the band's
 * top-end corner** — the `CloseButton`'s, without its circle, in the band's ink — where
 * Native's draws nothing: with no handle, it is the band's way out beside its title.
 * `asChild` makes it a `Button`; a string is set in `body`, in the flow of the content.
 */
export type BottomSheetCloseProps = BottomSheetPressProps

/** The band's shared values: what the slide, the finger and the backdrop all read. */
export type BottomSheetMotion = {
  /** Whether the band is still there to slide — `isOpen`, and the way out after it. */
  isMounted: boolean
  /** How far down the band sits, in points: 0 when up, its height when gone. */
  offset: SharedValue<number>
  /** The band's measured height, in points; 0 before its first layout. */
  height: SharedValue<number>
  /** 1 while the band is there; what fades with motion reduced. */
  presence: SharedValue<number>
  /** The slide, as the band's last style. */
  slid: StyleProp<ViewStyle>
}

/** Resolved style ids and the state the slots read. */
export type BottomSheetContextValue = {
  overlayStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  triggerStyle: StyleProp<ViewStyle>
  triggerLabelStyle: StyleProp<TextStyle>
  closeStyle: StyleProp<ViewStyle>
  closeLabelStyle: StyleProp<TextStyle>
  closeCornerStyle: StyleProp<ViewStyle>
  closeBarStyle: StyleProp<ViewStyle>
  isOpen: boolean
  isDisabled: boolean
  /** An ancestor said `disable-all`: everything is set without animation. */
  isStill: boolean
  dismissThreshold: number
  /** How `BottomSheet.Content` reports its measured height. */
  setHeight: (height: number) => void
  open: () => void
  close: () => void
  toggle: () => void
  motion: BottomSheetMotion
  /** `BottomSheet.Overlay`'s word. True without one. */
  isDismissable: boolean
  setDismissable: (isDismissable: boolean) => void
  /** Where `BottomSheet.Overlay` hands its backdrop to the band's `Modal`. */
  backdrop: NodeSlot
  /** The trigger's node: where the focus goes back to. */
  trigger: RefObject<View | null>
  titleId: string
  descriptionId: string
}

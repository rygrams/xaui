import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type Animated from 'react-native-reanimated'
import type { AnimatedRef, SharedValue } from 'react-native-reanimated'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { AsChildProps } from '../../system/slot'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { CarouselMetrics } from '../../utils/carousel'

export type CarouselSlot =
  | 'root'
  | 'content'
  | 'item'
  | 'control'
  | 'chevron'
  | 'indicator'
  | 'dot'
  | 'dotActive'
  | 'counter'
  | 'thumbnails'
  | 'thumbnail'
  | 'thumbnailActive'

/**
 * The four emphases, narrowed as `Card` and `Surface` narrow them: a carousel reports
 * nothing — it is a way of arranging what does — so `success` or `danger` would be an
 * intent nothing here has.
 *
 * The variant paints the **controls**: the arrows, the dots and the counter. The slides are
 * the caller's own content and this never touches them.
 */
export type CarouselVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type CarouselSize = Size

type CarouselOwnProps = {
  /** The arrows' and the dots' size, the gap between slides, the controls' corner. */
  size?: CarouselSize
  variant?: CarouselVariant
  /** A raw value (R7) for the controls. The slides are yours and it never reaches them. */
  color?: string
  /** The slides' corner. */
  radius?: RadiusKey
  /** Which slide is shown. Present means controlled. */
  index?: number
  /** Where it starts when uncontrolled. */
  defaultIndex?: number
  onIndexChange?: (index: number) => void
  /**
   * How many whole slides are in view at once.
   *
   * @default 1
   */
  itemsPerView?: number
  /**
   * How much of the neighbouring slide shows at each edge, in points.
   *
   * Zero — the default — is a carousel whose slides fill the track. Anything above it is
   * the promise that there is more to the side, which is worth more than the pixels it
   * costs on a series nobody would otherwise scroll.
   */
  peek?: number
  /** Between two slides, in points. Defaults to what `size` says. */
  gap?: number
  /** Whether the arrows wrap round the ends rather than stopping at them. */
  hasLoop?: boolean
  /**
   * Advance on its own every this many milliseconds. Unset is off.
   *
   * **It stops at the first interaction and does not come back.** A carousel that resumes
   * moving under a reader who has taken hold of it is a carousel fighting them.
   */
  autoPlayInterval?: number
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — the carousel's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type CarouselProps = CarouselOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof CarouselOwnProps> &
  Omit<ViewStyleProps, keyof CarouselOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type CarouselViewSlotProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type CarouselTextSlotProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

type CarouselControlOwnProps = {
  /** An arrow of your own — an icon, a word. Unset draws the built-in chevron. */
  children?: ReactNode
}

/** R14 — it renders a `PressableFeedback`, so it carries that node's style keys through it. */
export type CarouselControlProps = CarouselControlOwnProps &
  Omit<PressableFeedbackProps, 'isPressed' | 'style' | 'children'> & {
    /** R9 — `Pressable`'s function form as much as an object or an array. */
    style?:
      | StyleProp<ViewStyle>
      | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  }

type CarouselDotOwnProps = {
  /** Which slide it stands for. */
  index: number
  children?: ReactNode
}

export type CarouselDotProps = CarouselDotOwnProps &
  Omit<ViewProps, keyof CarouselDotOwnProps> &
  Omit<ViewStyleProps, keyof CarouselDotOwnProps | keyof ViewProps>

type CarouselThumbnailOwnProps = {
  /** Which slide pressing it goes to. */
  index: number
  children?: ReactNode
}

export type CarouselThumbnailProps = CarouselThumbnailOwnProps &
  Omit<ViewProps, keyof CarouselThumbnailOwnProps> &
  Omit<ViewStyleProps, keyof CarouselThumbnailOwnProps | keyof ViewProps>

/** R5 — resolved style ids, plus the state a slot cannot work out on its own. */
export type CarouselContextValue = {
  contentStyle: StyleProp<ViewStyle>
  itemStyle: StyleProp<ViewStyle>
  controlStyle: StyleProp<ViewStyle>
  /** The same arrow at the end of a series that does not loop: in place, and quiet. */
  controlInactiveStyle: StyleProp<ViewStyle>
  chevronStyle: StyleProp<ViewStyle>
  indicatorStyle: StyleProp<ViewStyle>
  dotStyle: StyleProp<ViewStyle>
  /**
   * The two colours and the two widths a dot travels between, as values rather than as
   * style ids.
   *
   * A worklet interpolates numbers and strings; it cannot read a `StyleSheet` id. This is
   * where R5 lands for an indicator that follows a drag — the recipe still owns every value
   * and the root reads them back off it once, exactly as `useChartInk` does for SVG.
   */
  dotInk: { rest: string; active: string; width: number; pill: number }
  counterStyle: StyleProp<TextStyle>
  thumbnailsStyle: StyleProp<ViewStyle>
  thumbnailStyle: StyleProp<ViewStyle>
  thumbnailActiveStyle: StyleProp<ViewStyle>

  /** The slide the track has settled on. */
  index: number
  /** How many slides `Carousel.Content` was given. */
  count: number
  /** How `Carousel.Content` tells everything else how many slides there are. */
  setCount: (count: number) => void
  metrics: CarouselMetrics
  /** Zero until the root has been laid out. Nothing draws a track before then. */
  width: number
  /** The track's own height, so an arrow can centre itself on the slides rather than on
   * the root — which also holds the dots, and would put the arrows below the middle. */
  trackHeight: number
  setTrackHeight: (height: number) => void
  /** An arrow's diameter and its inset from the track's edge. */
  controlBox: { size: number; inset: number }
  hasLoop: boolean
  isDisabled: boolean
  /** The scroll offset in points, on the UI thread — what a live indicator follows. */
  offset: SharedValue<number>
  /**
   * The track itself, so the controls and the thumbnails can move it.
   *
   * An **animated** ref, not a plain one: the ref `Animated.ScrollView` hands back is the
   * wrapper Reanimated built, and it carries none of the scroller's own methods —
   * `useAnimatedRef` is the documented way to reach them, and the one that also works on
   * the web renderer.
   */
  trackRef: AnimatedRef<Animated.ScrollView>
  goTo: (index: number) => void
  /** `+1` for the next slide, `−1` for the one before. Wraps when `hasLoop`. */
  moveBy: (delta: number) => void
  /** What the reader did. It is what stops autoplay, and it never restarts it. */
  onInteract: () => void
  onSettle: (index: number) => void
}

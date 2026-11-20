import type { ReactNode } from 'react'
import type {
  GestureResponderEvent,
  PressableStateCallbackType,
  ScrollViewProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type Animated from 'react-native-reanimated'
import type { AnimatedRef, SharedValue } from 'react-native-reanimated'
import type {
  AsChildProps,
  CarouselMetrics,
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

/**
 * `controlInactive` and `chevronInactive` are the arrow at the end of a series that does
 * not loop; `counterTotal` the " / 12" after the figure; `ring` and `ringLine` the two
 * bands a thumbnail always wears, and `ringOn` / `ringLineOn` their colours on the chosen
 * one.
 */
export type CarouselSlot =
  | 'root'
  | 'content'
  | 'item'
  | 'control'
  | 'controlInactive'
  | 'chevron'
  | 'chevronInactive'
  | 'indicator'
  | 'dot'
  | 'dotActive'
  | 'counter'
  | 'counterTotal'
  | 'thumbnails'
  | 'thumbnailsContent'
  | 'thumbnail'
  | 'ring'
  | 'ringOn'
  | 'ringLine'
  | 'ringLineOn'

/** The arrows, the squares, the thumbnails and the gap between slides. Never a slide. */
export type CarouselSize = TramSize

type CarouselOwnProps = {
  /** The arrows' and the thumbnails' key, the squares, the gap between slides. */
  size?: CarouselSize
  /**
   * One of the twenty named accents — `accent="lime"` — for the indicator's bar, which is
   * the one thing here in a colour. `color` wins when both are set.
   */
  accent?: TramAccentName
  /** A raw tint, never a token, for the indicator's bar. The slides never see it. */
  color?: string
  /** The slides' corner, and the thumbnails'. Every key stays within 2; unset is square. */
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
  /** How much of the neighbouring slide shows at each edge, in points. @default 0 */
  peek?: number
  /** Between two slides, in points. Defaults to what `size` says: 8, 12 or 16. */
  gap?: number
  /** Whether the arrows wrap round the ends rather than stopping at them. */
  hasLoop?: boolean
  /**
   * Advance on its own every this many milliseconds. Unset is off. It always wraps, and
   * it stops at the first interaction for good.
   */
  autoPlayInterval?: number
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * The Native `Carousel`'s props, with the Tram vocabulary: `accent` beside `color`, `size`
 * without `xs`, and no `variant` — the arrow is always a square of the page's ground.
 */
export type CarouselProps = CarouselOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof CarouselOwnProps> &
  Omit<ViewStyleProps, keyof CarouselOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type CarouselViewSlotProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/**
 * The track and the thumbnail strip are `ScrollView`s, so they take that node's props —
 * `onScroll`, `contentContainerStyle`… — composed with their own rather than replaced.
 */
export type CarouselScrollSlotProps = ScrollViewProps &
  Omit<ViewStyleProps, keyof ScrollViewProps> & { children?: ReactNode }

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
  /** Runs before the square goes to its slide. */
  onPress?: (event: GestureResponderEvent) => void
  children?: ReactNode
}

export type CarouselDotProps = CarouselDotOwnProps &
  Omit<ViewProps, keyof CarouselDotOwnProps> &
  Omit<ViewStyleProps, keyof CarouselDotOwnProps | keyof ViewProps>

type CarouselThumbnailOwnProps = {
  /** Which slide pressing it goes to. */
  index: number
  /** Runs before the thumbnail goes to its slide. */
  onPress?: (event: GestureResponderEvent) => void
  onPressIn?: (event: GestureResponderEvent) => void
  onPressOut?: (event: GestureResponderEvent) => void
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
  /** The quiet arrow's chevron, in the faint grey. */
  chevronInactiveStyle: StyleProp<ViewStyle>
  indicatorStyle: StyleProp<ViewStyle>
  dotStyle: StyleProp<ViewStyle>
  /**
   * The two colours a square travels between and its side, as values rather than as style
   * ids: a worklet interpolates strings and numbers, it cannot read a `StyleSheet` id. The
   * recipe still owns every one; the root reads them back off it once.
   */
  dotInk: { rest: string; active: string; size: number }
  counterStyle: StyleProp<TextStyle>
  /** The " / 12" after the figure, in the muted ink. */
  counterTotalStyle: StyleProp<TextStyle>
  thumbnailsStyle: StyleProp<ViewStyle>
  /** On the strip's content view: a horizontal `ScrollView` lays its children out there. */
  thumbnailsContentStyle: StyleProp<ViewStyle>
  thumbnailStyle: StyleProp<ViewStyle>
  ringStyle: StyleProp<ViewStyle>
  ringOnStyle: StyleProp<ViewStyle>
  ringLineStyle: StyleProp<ViewStyle>
  ringLineOnStyle: StyleProp<ViewStyle>

  /** The slide the track has settled on. */
  index: number
  /** How many slides `Carousel.Content` was given. */
  count: number
  /** The positions the track can rest on — fewer than `count` with several slides in view. */
  stops: number
  /** How `Carousel.Content` tells everything else how many slides there are. */
  setCount: (count: number) => void
  metrics: CarouselMetrics
  /** Zero until the root has been laid out. Nothing draws a track before then. */
  width: number
  /** The track's own height, so an arrow centres itself on the slides, not on the root. */
  trackHeight: number
  setTrackHeight: (height: number) => void
  /** An arrow's side — the key — and its inset from the track's edge. */
  controlBox: { size: number; inset: number }
  /** A thumbnail's side: the same key. */
  thumbnailSize: number
  hasLoop: boolean
  isDisabled: boolean
  /** Under an ancestor's `disable-all`: nothing leans. */
  isStill: boolean
  /** The scroll offset in points, on the UI thread — what a live indicator follows. */
  offset: SharedValue<number>
  /**
   * The slide a glide — an arrow, a square, autoplay, a controlled index — is carrying
   * the track to, or `-1`. While it is set the track settles on nothing it crosses; the
   * glide's end, a new one and a drag clear it.
   */
  glideTarget: SharedValue<number>
  /** The track itself, so the controls and the thumbnails can move it. */
  trackRef: AnimatedRef<Animated.ScrollView>
  /** Put the track on the index at once: what the track calls once its slides are laid out. */
  placeTrack: () => void
  goTo: (index: number) => void
  /** `+1` for the next slide, `−1` for the one before. Wraps when `hasLoop`. */
  moveBy: (delta: number) => void
  /** What the reader did. It is what stops autoplay, and it never restarts it. */
  onInteract: () => void
  /** The track settled on a slide by itself, during a drag. */
  onSettle: (index: number) => void
}

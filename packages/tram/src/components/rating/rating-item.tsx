import { forwardRef, useMemo } from 'react'
import { I18nManager, StyleSheet, View } from 'react-native'
import type { GestureResponderEvent } from 'react-native'
import { ratingFill, usePressState } from '@xaui/native'
import {
  PressableFeedback,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { PressRow } from '../../system/press-row'
import { RatingStar } from './rating-star'
import { pressedShare } from './rating.utils'
import { RatingLayerProvider, useRating } from './rating.context'
import type { RatingItemProps } from './rating.type'

const EMPTY = { tone: 'empty' as const }
const FILLED = { tone: 'fill' as const }

/**
 * One mark: the same glyph twice, the faint one in the flow and the given one pinned over
 * it, clipped to the fraction of the mark the value covers — from the start edge, so a row
 * read right to left fills from the right.
 *
 * The press reads where it landed: the fraction of the mark under the finger, snapped up
 * to the next `precision` step. It shrinks the mark a little and springs back — the press
 * of a row, since a mark has no box to lean.
 */
export const RatingItem = forwardRef<View, RatingItemProps>(function RatingItem(
  {
    index,
    children,
    accessibilityRole,
    accessibilityState,
    hitSlop,
    style,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const { itemStyle, markSize, reach, value, max, select, isReadOnly, isDisabled } =
    useRating()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const motion = resolveAnimation(undefined, useAnimationDisabled())
  const Press = motion.scale ? PressRow : PressableFeedback

  const fill = ratingFill(value, index)
  const inert = isReadOnly || isDisabled
  const clip = useMemo(
    () => [sheet.clip, { width: markSize * fill }],
    [markSize, fill]
  )

  const handlePress = (event: GestureResponderEvent) => {
    onPress?.(event)
    const share = pressedShare({
      x: event.nativeEvent.locationX,
      markSize,
      isRTL: I18nManager.isRTL,
    })
    select(index, share)
  }

  const glyph = children ?? <RatingStar />

  return (
    <Press
      ref={ref}
      isPressed={isPressed}
      isDisabled={inert}
      animation={motion.disableAll ? 'disable-all' : false}
      accessibilityRole={accessibilityRole ?? (isReadOnly ? 'image' : 'button')}
      accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
      accessibilityValue={isReadOnly ? undefined : { now: index + 1, min: 1, max }}
      hitSlop={hitSlop ?? reach}
      {...rest}
      style={[
        itemStyle,
        styleProps,
        typeof style === 'function' ? style({ pressed: isPressed }) : style,
      ]}
      onPress={handlePress}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      <RatingLayerProvider value={EMPTY}>{glyph}</RatingLayerProvider>
      {/* Nothing rather than a clip of no width: an empty mark mounts one glyph, not two. */}
      {fill > 0 ? (
        <View pointerEvents="none" style={clip}>
          <RatingLayerProvider value={FILLED}>{glyph}</RatingLayerProvider>
        </View>
      ) : null}
    </Press>
  )
})

const sheet = StyleSheet.create({
  clip: { position: 'absolute', top: 0, bottom: 0, start: 0, overflow: 'hidden' },
})

RatingItem.displayName = 'XAUI.Tram.Rating.Item'

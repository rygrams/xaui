import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import type { GestureResponderEvent } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { RatingStar } from './rating-star'
import { RatingLayerProvider, useRating } from './rating.context'
import { ratingSheet } from './rating.style'
import type { RatingItemProps } from './rating.type'
import { fillFor } from './rating.utils'

/**
 * One mark.
 *
 * **It is the same glyph twice.** The neutral one sits in the flow and decides how wide the
 * mark is; the filled one is pinned over it inside a clip whose width is the fraction given,
 * so a value of 4.3 shows three tenths of the fifth mark. That fraction is what lets one
 * component be both an input and a display of an average — a boolean per mark would have to
 * round 4.3 to 4 and lose the thing the average was for.
 *
 * **The press reads where it landed.** `locationX` over the mark's width is the fraction the
 * finger meant, and `snapValue` rounds it up to the nearest `precision` step: a tap anywhere
 * in the first mark is one star rather than zero, and with `precision={0.5}` the left half of
 * the third is 2.5 while the right half is 3.
 *
 * A mark owns its own press state, which is why the root publishes resolved styles and not
 * the recipe (R5).
 */
export const RatingItem = forwardRef<View, RatingItemProps>(function RatingItem(
  {
    index,
    children,
    accessibilityRole,
    accessibilityState,
    style,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const { itemStyle, markSize, value, max, select, isReadOnly, isDisabled } =
    useRating()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const fill = fillFor(value, index)
  const inert = isReadOnly || isDisabled

  const empty = useMemo(() => ({ tone: 'empty' as const }), [])
  const filled = useMemo(() => ({ tone: 'fill' as const }), [])

  const handlePress = (event: GestureResponderEvent) => {
    onPress?.(event)
    // `nativeEvent.locationX` is the touch's offset inside this mark, so the ratio needs no
    // measurement of its own — the width is already the one the root published.
    const ratio = markSize > 0 ? event.nativeEvent.locationX / markSize : 1
    select(index, ratio)
  }

  const glyph = children ?? <RatingStar />

  return (
    <PressableFeedback
      ref={ref}
      isPressed={isPressed}
      isDisabled={inert}
      // A display announces the value once, on the row, rather than five buttons that do
      // nothing. `image` and not `none`, because the marks *are* the information.
      accessibilityRole={accessibilityRole ?? (isReadOnly ? 'image' : 'button')}
      accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
      accessibilityValue={isReadOnly ? undefined : { now: index + 1, min: 1, max }}
      // No feedback overlay: the mark filling *is* the answer to the press, and a wash over
      // a glyph that is already changing colour reads as two things happening to it.
      animation={false}
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
      <RatingLayerProvider value={empty}>{glyph}</RatingLayerProvider>

      {/* Nothing at all rather than a zero-width clip: an empty mark should mount one glyph,
          not two, and a clip of width zero is a node per mark for every mark not yet given. */}
      {fill > 0 ? (
        <View style={[ratingSheet.clip, { width: markSize * fill }]}>
          <RatingLayerProvider value={filled}>{glyph}</RatingLayerProvider>
        </View>
      ) : null}
    </PressableFeedback>
  )
})

RatingItem.displayName = 'XAUI.Rating.Item'

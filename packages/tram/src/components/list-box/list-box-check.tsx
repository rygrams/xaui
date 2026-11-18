import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated'
import { useAnimationDisabled } from '@xaui/native/system'
import { cascade } from '../../motion/motion-tokens'
import { useTramMotion } from '../../motion/use-tram-motion'
import { cascadeDelay } from '../../system/list-picker'
import { clamp } from '../../system/selection-mark'
import { SpringingMark } from '../../system/springing-mark'
import { useListBoxRow } from './list-box.context'

type ListBoxCheckProps = {
  /** The boxes are out. */
  isSelecting: boolean
  isTicked: boolean
  /** The box and the space after it: how wide the column opens. */
  span: number
  /** The row's place in the list: the boxes slide in one after the other. */
  order: number
}

/**
 * The column at the start of a row of a `multiple` list, and the box in it — the Tram
 * `Checkbox`'s drawing, a line of the page's ink with a square of the accent inside.
 *
 * While the list is selecting the column opens on the `navigation` spring, a cascade
 * stagger behind the row above, so the boxes slide in from the start one after the other
 * and push the rows' content along; it closes the same way. With motion reduced it is
 * there or not, and only fades; under `disable-all` it is placed.
 *
 * Hidden from a screen reader: the row says whether it is ticked.
 */
export function ListBoxCheck({
  isSelecting,
  isTicked,
  span,
  order,
}: ListBoxCheckProps) {
  const { checkStyle, checkBoxStyle, checkMarkStyle } = useListBoxRow()
  const animate = useTramMotion()
  const isReduced = useReducedMotion()
  const isStill = useAnimationDisabled()
  const open = useSharedValue(isSelecting ? 1 : 0)

  useEffect(() => {
    const target = isSelecting ? 1 : 0
    open.value = isStill
      ? target
      : withDelay(
          cascadeDelay(Math.min(order, cascade.most)),
          animate(target, 'navigation')
        )
  }, [isSelecting, isStill, order, animate, open])

  const opening = useAnimatedStyle(() => {
    'worklet'
    const shown = clamp(open.value, 0, 1)
    // With motion reduced the content does not travel: the column is open or shut, and
    // the box fades.
    const width = isReduced ? (isSelecting ? span : 0) : shown * span

    return { width, opacity: shown }
  }, [open, span, isReduced, isSelecting])

  return (
    <Animated.View
      style={[checkStyle, opening]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={checkBoxStyle}>
        {isStill ? (
          isTicked ? (
            <View style={checkMarkStyle} />
          ) : null
        ) : (
          <SpringingMark style={checkMarkStyle} isShown={isTicked} />
        )}
      </View>
    </Animated.View>
  )
}

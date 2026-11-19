import { forwardRef, useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import type { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
} from 'react-native-reanimated'
import { mergeRefs, useStyleProps } from '@xaui/native/system'
import { usePivot } from './pivot.context'
import { closeness, loopDelta } from './pivot.loop'
import type { PivotSectionProps } from './pivot.type'

/**
 * What a title names: the whole body under the row, one section over the other. The loop
 * moves it aside — a whole screen toward the end for the next one, toward the start for
 * the previous one — and it follows the finger in, fading in as it comes. What it holds
 * is the caller's: a list, a `ScrollView` for what runs long.
 *
 * Every section stays mounted, so one keeps its scroll and its state while away. Only the
 * current one is read by a screen reader — a `tabpanel`, named by its title — and on the
 * web only the current one is reached by Tab: the others are `inert`.
 *
 * With motion reduced it does not slide: it fades in where it stands.
 */
export const PivotSection = forwardRef<View, PivotSectionProps>(
  function PivotSection({ children, value, style, ...props }, ref) {
    const {
      sectionStyle,
      values,
      current,
      position,
      viewport,
      way,
      tabId,
      panelId,
    } = usePivot()
    const [styleProps, rest] = useStyleProps(props)
    const isReduced = useReducedMotion()

    const index = values.indexOf(value)
    const count = values.length
    const isAway = current !== value

    // Hidden, faded and out of the finger's reach is not out of the keyboard's on the web:
    // a section away is `inert`, so Tab cannot reach the controls it holds.
    const node = useRef<View>(null)
    useEffect(() => {
      if (Platform.OS !== 'web') return
      const element = node.current as unknown as { inert: boolean } | null
      if (element) element.inert = isAway
    }, [isAway])

    const moved = useAnimatedStyle(() => {
      'worklet'
      const delta = index < 0 ? 1 : loopDelta(index, position.value, count)
      // A whole screen away or more, it is out of sight — and out of the finger's reach.
      const along = isReduced && Math.abs(delta) < 1 ? 0 : delta * viewport.value

      return {
        opacity: closeness(delta),
        transform: [{ translateX: along * way }],
      }
    }, [index, count, position, viewport, way, isReduced])

    return (
      <Animated.View
        // The animated wrapper types its ref as itself; at runtime it is the host view.
        ref={mergeRefs(node, ref) as never}
        id={panelId(value)}
        role="tabpanel"
        aria-labelledby={tabId(value)}
        accessibilityElementsHidden={isAway}
        importantForAccessibility={isAway ? 'no-hide-descendants' : 'auto'}
        {...rest}
        style={[
          sectionStyle,
          { pointerEvents: isAway ? 'none' : 'auto' },
          moved,
          styleProps,
          style,
        ]}
      >
        {children}
      </Animated.View>
    )
  }
)

PivotSection.displayName = 'XAUI.Tram.Pivot.Section'

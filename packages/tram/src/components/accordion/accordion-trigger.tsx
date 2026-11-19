import { Children, forwardRef } from 'react'
import { Text } from 'react-native'
import type { GestureResponderEvent, StyleProp, TextStyle, View } from 'react-native'
import type { ReactNode } from 'react'
import { useReducedMotion } from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  IconContext,
  PressableFeedback,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { scale } from '../../motion/motion-tokens'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useAccordion, useAccordionItem } from './accordion.context'
import type { AccordionTriggerProps } from './accordion.type'

/**
 * The row you press. The press is the Metro one: the row leans toward the finger and
 * shrinks a little, its colours unchanged — a row is wide, so by the row's depth. Felt as
 * the finger lands, through `TramProvider`'s `onHaptic`. With motion reduced, or under
 * `disable-all`, it does not lean.
 *
 * It carries `expanded` for a screen reader, which is the only thing telling one whether
 * the panel under it is open.
 */
export const AccordionTrigger = forwardRef<View, AccordionTriggerProps>(
  function AccordionTrigger(
    {
      children,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const {
      triggerStyle,
      triggerDisabledStyle,
      labelStyle,
      labelOpenStyle,
      glyph,
      toggle,
    } = useAccordion()
    const { value, isExpanded, isDisabled } = useAccordionItem()
    const [styleProps, rest] = useStyleProps(props)
    const haptic = useTramHaptic()
    const isStill = useAnimationDisabled()
    const isReduced = useReducedMotion()
    const [isPressed, press] = usePressState({
      onPressIn: event => {
        haptic('press')
        onPressIn?.(event)
      },
      onPressOut,
    })

    const handlePress = (event: GestureResponderEvent) => {
      onPress?.(event)
      toggle(value)
    }

    const isFlat = isStill || isReduced
    const Row = isFlat ? PressableFeedback : PressTilt
    const lean = isFlat ? undefined : { depth: scale.row }

    return (
      <IconContext.Provider value={glyph}>
        <Row
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          // Native's scale, highlight and ripple stay off: the press is the tilt alone.
          animation={isStill ? 'disable-all' : false}
          accessibilityRole={accessibilityRole}
          // Merged rather than spread over: a caller adding `selected` keeps `expanded`.
          accessibilityState={{
            disabled: isDisabled,
            expanded: isExpanded,
            ...accessibilityState,
          }}
          {...lean}
          {...rest}
          style={[
            triggerStyle,
            isDisabled && triggerDisabledStyle,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {asChild
            ? children
            : wrapText(children, isExpanded ? labelOpenStyle : labelStyle)}
        </Row>
      </IconContext.Provider>
    )
  }
)

AccordionTrigger.displayName = 'XAUI.Tram.Accordion.Trigger'

/**
 * Each loose string in its own `Text`, rather than all-or-nothing: a trigger's shape is a
 * title **and** an indicator, and a string left in a `View` is dropped.
 */
function wrapText(children: ReactNode, style: StyleProp<TextStyle>): ReactNode {
  return Children.map(children, child =>
    typeof child === 'string' || typeof child === 'number' ? (
      <Text style={[style, TITLE]}>{child}</Text>
    ) : (
      child
    )
  )
}

/** The title takes the row's width and leaves the indicator its square. */
const TITLE = { flexShrink: 1 } as const

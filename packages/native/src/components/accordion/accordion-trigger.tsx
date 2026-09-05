import { forwardRef, useCallback } from 'react'
import { Text } from 'react-native'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { IconContext } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useAccordion, useAccordionItem } from './accordion.context'
import type { AccordionTriggerProps } from './accordion.type'

/**
 * The row you press. It carries `expanded` for a screen reader, which is the only thing
 * telling one whether the panel under it is open — the chevron says nothing out loud.
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
    const { triggerStyle, triggerPressedStyle, labelStyle, glyph, toggle } =
      useAccordion()
    const { value, isExpanded, isDisabled } = useAccordionItem()

    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const handlePress = useCallback(
      (event: Parameters<NonNullable<AccordionTriggerProps['onPress']>>[0]) => {
        onPress?.(event)
        toggle(value)
      },
      [onPress, toggle, value]
    )

    const text = childrenToString(children)

    return (
      <IconContext.Provider value={glyph}>
        <PressableFeedback
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          accessibilityRole={accessibilityRole}
          // Merged rather than spread over: a caller adding `selected` must not drop the
          // expanded state, which is the row's only spoken affordance.
          accessibilityState={{
            disabled: isDisabled,
            expanded: isExpanded,
            ...accessibilityState,
          }}
          {...rest}
          style={[
            triggerStyle,
            isPressed && triggerPressedStyle,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {/* R3 — a stringifiable tree becomes the row's label. It is wrapped rather than
              passed through because the trigger is a row of views, and a bare string in
              one is a crash on React Native. */}
          {asChild || text === null ? (
            children
          ) : (
            <Text style={labelStyle}>{text}</Text>
          )}
        </PressableFeedback>
      </IconContext.Provider>
    )
  }
)

AccordionTrigger.displayName = 'XAUI.Accordion.Trigger'

import { Children, forwardRef, useCallback } from 'react'
import { Text } from 'react-native'
import type { StyleProp, TextStyle, View } from 'react-native'
import type { ReactNode } from 'react'
import { usePressState } from '../../hooks/use-press-state'
import { IconContext } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
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
          {/* R3, per child — see `wrapText` below for why not for the whole tree. */}
          {asChild ? children : wrapText(children, labelStyle)}
        </PressableFeedback>
      </IconContext.Provider>
    )
  }
)

AccordionTrigger.displayName = 'XAUI.Accordion.Trigger'

/**
 * R3, per child rather than for the whole tree.
 *
 * `childrenToString` is all-or-nothing: it returns `null` the moment any element is
 * present, which is right for a `Button` whose children are either a label or slots. A
 * trigger's normal shape is a label **and** an indicator, so the all-or-nothing reading
 * dropped every loose string into a `View` — where React Native discards it, and the row
 * renders as a chevron with nothing beside it.
 *
 * Wrapping each string on its own keeps `<Accordion.Trigger>Livraison<Accordion.Indicator
 * /></Accordion.Trigger>` working, which is the shape the API is written for.
 */
function wrapText(children: ReactNode, style: StyleProp<TextStyle>): ReactNode {
  return Children.map(children, child =>
    typeof child === 'string' || typeof child === 'number' ? (
      <Text style={style}>{child}</Text>
    ) : (
      child
    )
  )
}

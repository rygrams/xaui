import { forwardRef, useMemo } from 'react'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { AccordionItemProvider, useAccordion } from './accordion.context'
import type { AccordionItemProps } from './accordion.type'

/**
 * One row: its trigger, and the panel under it. The height that changes is the row's, so
 * the layout transition is here, and the row clips — the panel unrolls rather than
 * spilling out under the next row.
 *
 * `children` may be a function, which is how a row paints its own open state.
 */
export const AccordionItem = forwardRef<View, AccordionItemProps>(
  function AccordionItem(
    { value, children, isDisabled = false, style, ...props },
    ref
  ) {
    const {
      itemStyle,
      motion,
      isDisabled: isRootDisabled,
      isExpanded,
    } = useAccordion()
    const [styleProps, rest] = useStyleProps(props)

    const expanded = isExpanded(value)
    const disabled = isRootDisabled || isDisabled

    const context = useMemo(
      () => ({ value, isExpanded: expanded, isDisabled: disabled }),
      [value, expanded, disabled]
    )

    return (
      <AccordionItemProvider value={context}>
        <Animated.View
          ref={ref}
          layout={motion.layout}
          {...rest}
          style={[itemStyle, styleProps, style]}
        >
          {typeof children === 'function' ? children(context) : children}
        </Animated.View>
      </AccordionItemProvider>
    )
  }
)

AccordionItem.displayName = 'XAUI.Tram.Accordion.Item'

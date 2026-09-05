import { forwardRef, useMemo } from 'react'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { LAYOUT } from './accordion.animation'
import { AccordionItemProvider, useAccordion } from './accordion.context'
import type { AccordionItemProps } from './accordion.type'

/**
 * One row: its trigger, and the panel under it.
 *
 * The height animation lives here rather than on the content, because the height that
 * changes is the row's. `overflow: 'hidden'` on it is what turns a mounted panel into one
 * unrolling — without it the content is drawn outside the row from the first frame.
 *
 * `children` may be a function, which is how a row paints its own open state without the
 * caller wiring `useAccordionItem` themselves.
 */
export const AccordionItem = forwardRef<View, AccordionItemProps>(
  function AccordionItem(
    { value, children, isDisabled = false, style, ...props },
    ref
  ) {
    const { itemStyle, isDisabled: isRootDisabled, isExpanded } = useAccordion()
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
          layout={LAYOUT}
          {...rest}
          style={[itemStyle, styleProps, style]}
        >
          {typeof children === 'function' ? children(context) : children}
        </Animated.View>
      </AccordionItemProvider>
    )
  }
)

AccordionItem.displayName = 'XAUI.Accordion.Item'

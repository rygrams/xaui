import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useAccordion, useAccordionItem } from './accordion.context'
import type { AccordionContentProps } from './accordion.type'

/**
 * The panel. It is mounted or it is not — no measured height — and the row's layout
 * transition carries the height between the two, so a panel that grows afterwards grows
 * with it. It fades in over the same length as the height moves.
 */
export const AccordionContent = forwardRef<View, AccordionContentProps>(
  function AccordionContent({ children, style, ...props }, ref) {
    const { contentStyle, motion } = useAccordion()
    const { isExpanded } = useAccordionItem()
    const [styleProps, rest] = useStyleProps(props)

    if (!isExpanded) return null

    return (
      <Animated.View
        ref={ref}
        entering={motion.entering}
        exiting={motion.exiting}
        {...rest}
        style={[contentStyle, styleProps, style]}
      >
        {children}
      </Animated.View>
    )
  }
)

AccordionContent.displayName = 'XAUI.Tram.Accordion.Content'

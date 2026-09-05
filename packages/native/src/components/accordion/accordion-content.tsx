import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { contentEntering, contentExiting } from './accordion.animation'
import { useAccordion, useAccordionItem } from './accordion.context'
import type { AccordionContentProps } from './accordion.type'

/**
 * The panel.
 *
 * **It is mounted or it is not** — there is no measured height anywhere in this component,
 * and no `maxHeight` either. The row's layout transition animates the height between the
 * two states, which is what lets a panel whose content grows afterwards — an image
 * loading, a list filling — grow with it instead of being stuck at whatever it measured.
 *
 * It fades rather than sliding. The height is already moving underneath it, and two
 * things travelling at once reads as the panel fighting itself.
 */
export const AccordionContent = forwardRef<View, AccordionContentProps>(
  function AccordionContent({ children, style, ...props }, ref) {
    const { contentStyle } = useAccordion()
    const { isExpanded } = useAccordionItem()
    const [styleProps, rest] = useStyleProps(props)

    if (!isExpanded) return null

    return (
      <Animated.View
        ref={ref}
        entering={contentEntering}
        exiting={contentExiting}
        {...rest}
        style={[contentStyle, styleProps, style]}
      >
        {children}
      </Animated.View>
    )
  }
)

AccordionContent.displayName = 'XAUI.Accordion.Content'

import React from 'react'
import { View } from 'react-native'
import { AccordionContext } from './accordion-context'
import { useAccordionStyles, useAccordionContextValue } from './accordion.hook'
import {
  buildAccordionContextParams,
  getItemKey,
  isAccordionItem,
  normalizeElementKey,
} from './accordion.utils'
import type { AccordionProps } from './accordion.type'
import { Divider } from '../divider'

export const Accordion: React.FC<AccordionProps> = (props: AccordionProps) => {
  const {
    children,
    variant = 'light',
    showDivider = false,
    fullWidth = true,
    customAppearance,
  } = props

  const { containerStyles, dividerColor } = useAccordionStyles({
    variant,
    fullWidth,
  })

  const contextParams = buildAccordionContextParams(props)
  const contextValue = useAccordionContextValue(contextParams)

  const childrenArray = React.Children.toArray(children)

  return (
    <AccordionContext.Provider value={contextValue}>
      <View style={[containerStyles, customAppearance?.container]}>
        {childrenArray.map((child, index) => {
          const isLast = index === childrenArray.length - 1
          const showBottomDivider =
            (showDivider || variant === 'bordered') &&
            !isLast &&
            variant !== 'splitted'

          const resolvedChildKey = isAccordionItem(child)
            ? getItemKey(
                child.props.itemKey ?? normalizeElementKey(child.key),
                index
              )
            : getItemKey(
                React.isValidElement(child)
                  ? normalizeElementKey(child.key)
                  : undefined,
                index
              )

          return (
            <View key={resolvedChildKey} style={customAppearance?.item}>
              {isAccordionItem(child)
                ? React.cloneElement(child, { itemKey: resolvedChildKey })
                : child}
              {showBottomDivider && <Divider color={dividerColor} size={2} />}
            </View>
          )
        })}
      </View>
    </AccordionContext.Provider>
  )
}

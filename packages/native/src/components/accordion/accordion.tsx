import React, { useMemo } from 'react'
import { View } from 'react-native'
import { AccordionContext } from './accordion-context'
import { styles } from './accordion.style'
import { useAccordionStyles, useAccordionSelection } from './accordion.hook'
import { getItemKey, isAccordionItem, normalizeElementKey } from './accordion.utils'
import type { AccordionProps } from './accordion.type'

export const Accordion: React.FC<AccordionProps> = ({
  children,
  variant = 'light',
  selectionMode = 'toggle',
  showDivider = false,
  hideIndicator = false,
  fullWidth = true,
  expandedKeys,
  defaultExpandedKeys = [],
  disabledKeys = [],
  disableAnimation = false,
  isCompact = false,
  containerStyle,
  itemStyle,
  onSelectionChange,
}) => {
  const { containerStyles, dividerColor, dividerOpacity } = useAccordionStyles(
    variant,
    fullWidth
  )

  const { currentExpandedKeys, toggleItem } = useAccordionSelection(
    selectionMode,
    expandedKeys,
    defaultExpandedKeys,
    onSelectionChange
  )

  const contextValue = useMemo(
    () => ({
      variant,
      hideIndicator,
      disableAnimation,
      isCompact,
      showDivider,
      expandedKeys: currentExpandedKeys,
      disabledKeys,
      toggleItem,
    }),
    [
      variant,
      hideIndicator,
      disableAnimation,
      isCompact,
      showDivider,
      currentExpandedKeys,
      disabledKeys,
      toggleItem,
    ]
  )

  const childrenArray = React.Children.toArray(children)

  return (
    <AccordionContext.Provider value={contextValue}>
      <View style={[containerStyles, containerStyle]}>
        {childrenArray.map((child, index) => {
          const isLast = index === childrenArray.length - 1
          const showBottomDivider =
            (showDivider || variant === 'bordered') && !isLast && variant !== 'splitted'

          const resolvedChildKey = isAccordionItem(child)
            ? getItemKey(child.props.itemKey ?? normalizeElementKey(child.key), index)
            : getItemKey(
                React.isValidElement(child) ? normalizeElementKey(child.key) : undefined,
                index
              )

          return (
            <View key={resolvedChildKey} style={itemStyle}>
              {isAccordionItem(child)
                ? React.cloneElement(child, { itemKey: resolvedChildKey })
                : child}
              {showBottomDivider && (
                <View
                  style={[
                    styles.divider,
                    {
                      backgroundColor: dividerColor,
                      opacity: dividerOpacity,
                    },
                  ]}
                />
              )}
            </View>
          )
        })}
      </View>
    </AccordionContext.Provider>
  )
}

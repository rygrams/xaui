import React from 'react'
import { View } from 'react-native'
import { ExpansionPanelContext } from './expansion-panel-context'
import {
  useExpansionPanelStyles,
  useExpansionPanelContextValue,
} from './expansion-panel.hook'
import {
  buildExpansionPanelContextParams,
  getItemKey,
  isExpansionPanelItem,
  normalizeElementKey,
} from './expansion-panel.utils'
import type { ExpansionPanelProps } from './expansion-panel.type'
import { Divider } from '../divider'

export const ExpansionPanel: React.FC<ExpansionPanelProps> = (
  props: ExpansionPanelProps
) => {
  const {
    children,
    variant = 'light',
    showDivider = false,
    fullWidth = true,
    customAppearance,
  } = props

  const { containerStyles, dividerColor } = useExpansionPanelStyles({
    variant,
    fullWidth,
  })

  const contextParams = buildExpansionPanelContextParams(props)
  const contextValue = useExpansionPanelContextValue(contextParams)

  const childrenArray = React.Children.toArray(children)

  return (
    <ExpansionPanelContext.Provider value={contextValue}>
      <View style={[containerStyles, customAppearance?.container]}>
        {childrenArray.map((child, index) => {
          const isLast = index === childrenArray.length - 1
          const showBottomDivider =
            (showDivider || variant === 'bordered') &&
            !isLast &&
            variant !== 'splitted'

          const resolvedChildKey = isExpansionPanelItem(child)
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
              {isExpansionPanelItem(child)
                ? React.cloneElement(child, { itemKey: resolvedChildKey })
                : child}
              {showBottomDivider && <Divider color={dividerColor} size={2} />}
            </View>
          )
        })}
      </View>
    </ExpansionPanelContext.Provider>
  )
}

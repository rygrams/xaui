import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { useBottomTabBarColors, useBottomTabBarSizeStyles } from './bottom-tab-bar.hook'
import { BottomTabBarContext } from './bottom-tab-bar-context'
import { BottomTabBarItem } from './bottom-tab-bar-item'
import { styles } from './bottom-tab-bar.style'
import type {
  BottomTabBarComposableProps,
  BottomTabBarProps,
  ExpoRouterBottomTabBarCompatibleProps,
  ExpoRouterTabDescriptorOptions,
  ExpoRouterTabRoute,
} from './bottom-tab-bar.type'

const isExpoRouterMode = (
  props: BottomTabBarProps
): props is BottomTabBarProps & ExpoRouterBottomTabBarCompatibleProps => {
  return (
    'state' in props &&
    'navigation' in props &&
    'descriptors' in props &&
    !!props.state &&
    !!props.navigation &&
    !!props.descriptors
  )
}

const getRouteLabel = (
  route: ExpoRouterTabRoute,
  options: ExpoRouterTabDescriptorOptions,
  focused: boolean,
  color: string
) => {
  if (typeof options.tabBarLabel === 'function') {
    return options.tabBarLabel({
      focused,
      color,
      children: options.title ?? route.name,
      position: 'below-icon',
    })
  }

  if (typeof options.tabBarLabel === 'string') {
    return options.tabBarLabel
  }

  if (typeof options.title === 'string') {
    return options.title
  }

  return route.name
}

export const BottomTabBar: React.FC<BottomTabBarProps> = props => {
  const {
    themeColor = 'primary',
    size = 'md',
    isDisabled = false,
    showLabel = true,
    insetBottom = 0,
    indicatorColor,
    activeColor,
    inactiveColor,
    style,
    customAppearance,
  } = props

  const sizeStyles = useBottomTabBarSizeStyles(size)
  const colors = useBottomTabBarColors(
    themeColor,
    activeColor,
    inactiveColor,
    indicatorColor
  )

  if (isExpoRouterMode(props)) {
    const { state, descriptors, navigation, insets } = props
    const currentRoute = state.routes[state.index]
    const focusedOptions = descriptors[currentRoute.key]?.options
    const focusedStyle = focusedOptions?.tabBarStyle as { display?: string } | undefined

    if (focusedStyle?.display === 'none') {
      return null
    }

    const routerInsetBottom = insets?.bottom ?? insetBottom

    return (
      <View
        style={[
          styles.container,
          {
            minHeight: sizeStyles.minHeight + routerInsetBottom,
            paddingBottom: routerInsetBottom,
            backgroundColor: colors.containerColor,
            borderTopColor: colors.borderColor,
          },
          style,
          customAppearance?.container,
        ]}
      >
        {state.routes
          .filter(route => descriptors[route.key]?.options.href !== null)
          .map(route => {
            const routeOptions = descriptors[route.key]?.options ?? {}
            const focused = currentRoute.key === route.key
            const routeActiveColor = routeOptions.tabBarActiveTintColor ?? activeColor
            const routeInactiveColor =
              routeOptions.tabBarInactiveTintColor ?? inactiveColor
            const labelColor = focused
              ? routeActiveColor ?? colors.activeColor
              : routeInactiveColor ?? colors.inactiveColor

            return (
              <BottomTabBarItem
                key={route.key}
                itemKey={route.key}
                label={getRouteLabel(route, routeOptions, focused, labelColor)}
                icon={routeOptions.tabBarIcon}
                isSelected={focused}
                showLabel={routeOptions.tabBarShowLabel ?? showLabel}
                activeColor={routeActiveColor}
                inactiveColor={routeInactiveColor}
                badge={routeOptions.tabBarBadge}
                accessibilityLabel={routeOptions.tabBarAccessibilityLabel}
                testID={routeOptions.tabBarButtonTestID}
                style={routeOptions.tabBarItemStyle}
                isDisabled={isDisabled}
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  })

                  if (!focused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params)
                  }
                }}
                onLongPress={() => {
                  navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                  })
                }}
              />
            )
          })}
      </View>
    )
  }

  const {
    children,
    selectedKey,
    defaultSelectedKey,
    onSelectionChange,
  } = props as BottomTabBarComposableProps

  const firstItemKey = React.useMemo(() => {
    const child = React.Children.toArray(children)[0]

    if (React.isValidElement<{ itemKey?: string }>(child)) {
      return child.props.itemKey
    }

    return undefined
  }, [children])

  const isControlled = typeof selectedKey === 'string'
  const [internalSelectedKey, setInternalSelectedKey] = useState(
    defaultSelectedKey ?? firstItemKey
  )
  const resolvedSelectedKey = isControlled ? selectedKey : internalSelectedKey

  const handleSelectionChange = (nextKey: string) => {
    if (!isControlled) {
      setInternalSelectedKey(nextKey)
    }

    onSelectionChange?.(nextKey)
  }

  const contextValue = useMemo(
    () => ({
      selectedKey: resolvedSelectedKey,
      onSelectionChange: handleSelectionChange,
      isDisabled,
      showLabel,
      size,
      themeColor,
      indicatorColor,
      activeColor,
      inactiveColor,
    }),
    [
      activeColor,
      inactiveColor,
      indicatorColor,
      isDisabled,
      resolvedSelectedKey,
      showLabel,
      size,
      themeColor,
    ]
  )

  return (
    <BottomTabBarContext.Provider value={contextValue}>
      <View
        style={[
          styles.container,
          {
            minHeight: sizeStyles.minHeight + insetBottom,
            paddingBottom: insetBottom,
            backgroundColor: colors.containerColor,
            borderTopColor: colors.borderColor,
          },
          style,
          customAppearance?.container,
        ]}
      >
        {children}
      </View>
    </BottomTabBarContext.Provider>
  )
}

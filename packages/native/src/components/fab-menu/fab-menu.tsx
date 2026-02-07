import React from 'react'
import { Pressable, Text, View, Animated } from 'react-native'
import { Fab } from '../fab'
import { Portal } from '../../core/portal/portal'
import { styles } from './fab-menu.style'
import {
  useFabMenuState,
  useFabMenuItemStyles,
  useFabMenuOverlayColor,
} from './fab-menu.hook'
import {
  runMenuExpandAnimation,
  runMenuCollapseAnimation,
  runFabRotateAnimation,
  runMenuVisibilityAnimation,
} from './fab-menu.animation'
import type { FabMenuProps } from './fab-menu.type'

export const FabMenu: React.FC<FabMenuProps> = ({
  icon,
  expandedIcon,
  items,
  themeColor = 'primary',
  variant = 'solid',
  size = 'md',
  elevation = 0,
  isExpanded: controlledExpanded,
  onToggle,
  showOverlay = true,
  customAppearance,
}: FabMenuProps) => {
  const { expanded, toggle, close } = useFabMenuState(controlledExpanded, onToggle)
  const itemStyles = useFabMenuItemStyles(themeColor, variant)
  const overlayColor = useFabMenuOverlayColor()
  const [isMenuVisible, setIsMenuVisible] = React.useState(expanded)

  const overlayOpacity = React.useRef(new Animated.Value(expanded ? 1 : 0)).current
  const rotateValue = React.useRef(new Animated.Value(expanded ? 1 : 0)).current
  const visibilityValue = React.useRef(new Animated.Value(expanded ? 1 : 0)).current
  const itemAnimationsRef = React.useRef(items.map(() => new Animated.Value(0)))
  const itemAnimations = itemAnimationsRef.current

  const prevExpanded = React.useRef(expanded)

  React.useEffect(() => {
    if (itemAnimations.length === items.length) return
    itemAnimationsRef.current = items.map(
      (_, index) => itemAnimations[index] ?? new Animated.Value(expanded ? 1 : 0)
    )
  }, [expanded, itemAnimations, items])

  React.useEffect(() => {
    if (prevExpanded.current === expanded) return
    prevExpanded.current = expanded

    if (expanded) {
      setIsMenuVisible(true)
      runMenuExpandAnimation(overlayOpacity, itemAnimations)
      runFabRotateAnimation(rotateValue, true)
      runMenuVisibilityAnimation(visibilityValue, true)
    } else {
      runMenuCollapseAnimation(overlayOpacity, itemAnimations)
      runFabRotateAnimation(rotateValue, false)
      runMenuVisibilityAnimation(visibilityValue, false, () => {
        setIsMenuVisible(false)
      })
    }
  }, [
    expanded,
    overlayOpacity,
    itemAnimations,
    rotateValue,
    visibilityValue,
  ])

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  })

  const currentIcon = (expanded || isMenuVisible) && expandedIcon ? expandedIcon : icon
  const shouldRenderBackdrop = isMenuVisible && showOverlay

  const renderMenuIcon = (menuIcon: React.ReactNode) => {
    if (!React.isValidElement(menuIcon)) return menuIcon

    return React.cloneElement(
      menuIcon as React.ReactElement<Record<string, unknown>>,
      { color: itemStyles.iconColor }
    )
  }

  return (
    <View style={[styles.container, customAppearance?.container]}>
      {shouldRenderBackdrop && (
        <Portal>
          <Animated.View
            style={[
              styles.overlay,
              { backgroundColor: overlayColor, opacity: overlayOpacity },
              customAppearance?.overlay,
            ]}
          >
            <Pressable
              style={{ flex: 1 }}
              onPress={close}
            />
          </Animated.View>
        </Portal>
      )}

      <Animated.View
        style={{
          opacity: visibilityValue,
          transform: [
            {
              translateY: visibilityValue.interpolate({
                inputRange: [0, 1],
                outputRange: [24, 0],
              }),
            },
            {
              scale: visibilityValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.98, 1],
              }),
            },
          ],
        }}
      >
        {isMenuVisible && (
          <View style={[styles.menuContainer, customAppearance?.menuContainer]}>
            {items.map((item, index) => (
              <Animated.View
                key={item.key}
                style={[
                  styles.menuItem,
                  item.isDisabled && styles.disabled,
                  {
                    opacity: itemAnimations[index],
                    transform: [
                      {
                        translateY: itemAnimations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                      {
                        scale: itemAnimations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        }),
                      },
                    ],
                  },
                  customAppearance?.menuItem,
                ]}
              >
                <Pressable
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={(event) => {
                    if (item.isDisabled) return
                    item.onPress?.(event)
                    close()
                  }}
                  disabled={item.isDisabled}
                >
                  <Text
                    style={[
                      styles.menuItemLabel,
                      {
                        backgroundColor: itemStyles.labelStyles.backgroundColor,
                        borderRadius: itemStyles.labelStyles.borderRadius,
                        color: itemStyles.labelStyles.color,
                        fontSize: itemStyles.labelStyles.fontSize,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>

                  <View
                    style={[
                      styles.menuItemIcon,
                      {
                        width: itemStyles.iconStyles.width,
                        height: itemStyles.iconStyles.height,
                        borderRadius: itemStyles.iconStyles.borderRadius,
                        backgroundColor: itemStyles.iconStyles.backgroundColor,
                      },
                    ]}
                  >
                    {renderMenuIcon(item.icon)}
                  </View>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        )}

        <Animated.View
          style={{
            transform: [
              { rotate: expandedIcon ? '0deg' : rotation },
            ],
          }}
        >
          <Fab
            icon={currentIcon}
            themeColor={themeColor}
            variant={variant}
            size={size}
            elevation={elevation}
            onPress={toggle}
            customAppearance={{ fab: customAppearance?.fab }}
          />
        </Animated.View>
      </Animated.View>
    </View>
  )
}

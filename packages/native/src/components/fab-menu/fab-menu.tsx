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
  const itemStyles = useFabMenuItemStyles(themeColor)
  const overlayColor = useFabMenuOverlayColor()
  const [isPortalVisible, setIsPortalVisible] = React.useState(expanded)

  const overlayOpacity = React.useRef(new Animated.Value(expanded ? 1 : 0)).current
  const rotateValue = React.useRef(new Animated.Value(expanded ? 1 : 0)).current
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
      setIsPortalVisible(true)
      runMenuExpandAnimation(overlayOpacity, itemAnimations)
      runFabRotateAnimation(rotateValue, true)
    } else {
      runMenuCollapseAnimation(overlayOpacity, itemAnimations, () => {
        setIsPortalVisible(false)
      })
      runFabRotateAnimation(rotateValue, false)
    }
  }, [expanded, overlayOpacity, itemAnimations, rotateValue])

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  })

  const currentIcon = expanded && expandedIcon ? expandedIcon : icon

  const renderMenuIcon = (menuIcon: React.ReactNode) => {
    if (!React.isValidElement(menuIcon)) return menuIcon

    return React.cloneElement(
      menuIcon as React.ReactElement<Record<string, unknown>>,
      { color: itemStyles.iconColor }
    )
  }

  const renderFabToggle = () => (
    <Animated.View
      style={{
        alignSelf: 'flex-end',
        transform: [{ rotate: expandedIcon ? '0deg' : rotation }],
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
  )

  const renderMenuItems = () => (
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
            style={[
              styles.menuItemChip,
              {
                backgroundColor: itemStyles.chipStyles.backgroundColor,
                borderRadius: itemStyles.chipStyles.borderRadius,
              },
            ]}
            onPress={(event) => {
              if (item.isDisabled) return
              item.onPress?.(event)
              close()
            }}
            disabled={item.isDisabled}
          >
            {renderMenuIcon(item.icon)}
            <Text
              style={[
                styles.menuItemLabel,
                {
                  color: itemStyles.chipStyles.color,
                  fontSize: itemStyles.chipStyles.fontSize,
                },
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        </Animated.View>
      ))}
    </View>
  )

  return (
    <View style={[styles.container, customAppearance?.container]}>
      {isPortalVisible && (
        <Portal>
          <View style={styles.portalRoot}>
            {showOverlay && (
              <Animated.View
                style={[
                  styles.overlay,
                  { backgroundColor: overlayColor, opacity: overlayOpacity },
                  customAppearance?.overlay,
                ]}
              >
                <Pressable style={styles.overlayPressable} onPress={close} />
              </Animated.View>
            )}

            <View style={styles.portalContent}>
              {renderMenuItems()}
              {renderFabToggle()}
            </View>
          </View>
        </Portal>
      )}

      {!isPortalVisible && renderFabToggle()}
    </View>
  )
}

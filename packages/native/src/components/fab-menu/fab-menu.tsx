import React from 'react'
import { Pressable, View, Animated } from 'react-native'
import { Fab } from '../fab'
import { Portal } from '../../core/portal/portal'
import { styles } from './fab-menu.style'
import { useFabMenuState, useFabMenuOverlayColor } from './fab-menu.hook'
import {
  runMenuExpandAnimation,
  runMenuCollapseAnimation,
  runFabRotateAnimation,
} from './fab-menu.animation'
import type { FabMenuProps } from './fab-menu.type'
import type { FabMenuItemProps } from './fab-menu.type'

export const FabMenu: React.FC<FabMenuProps> = ({
  icon,
  label,
  expandedIcon,
  children,
  themeColor = 'primary',
  variant = 'solid',
  size = 'md',
  elevation = 0,
  isExpanded: controlledExpanded,
  onToggle,
  showOverlay = true,
  customAppearance,
}: FabMenuProps) => {
  const { expanded, toggle, close } = useFabMenuState(
    controlledExpanded,
    onToggle
  )
  const overlayColor = useFabMenuOverlayColor()
  const [isPortalVisible, setIsPortalVisible] = React.useState(expanded)

  const childArray = React.Children.toArray(children)

  const overlayOpacity = React.useRef(
    new Animated.Value(expanded ? 1 : 0)
  ).current
  const rotateValue = React.useRef(
    new Animated.Value(expanded ? 1 : 0)
  ).current
  const itemAnimationsRef = React.useRef(
    childArray.map(() => new Animated.Value(0))
  )
  const itemAnimations = itemAnimationsRef.current

  const prevExpanded = React.useRef(expanded)

  React.useEffect(() => {
    if (itemAnimations.length === childArray.length) return
    itemAnimationsRef.current = childArray.map(
      (_, index) =>
        itemAnimations[index] ?? new Animated.Value(expanded ? 1 : 0)
    )
  }, [expanded, itemAnimations, childArray])

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

  const renderFabToggle = () => (
    <Animated.View
      style={{
        alignSelf: 'flex-end',
        transform: [{ rotate: expandedIcon ? '0deg' : rotation }],
      }}
    >
      <Fab
        icon={currentIcon}
        label={label}
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
      {childArray.map((child, index) => {
        const childElement = child as React.ReactElement<FabMenuItemProps>
        const isDisabled = childElement.props?.isDisabled

        return (
          <Animated.View
            key={childElement.key ?? index}
            style={[
              styles.menuItem,
              isDisabled && styles.disabled,
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
            {React.cloneElement(childElement, {
              _onClose: close,
              themeColor: childElement.props?.themeColor ?? themeColor,
            })}
          </Animated.View>
        )
      })}
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

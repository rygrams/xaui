import React from 'react'
import { View, Text, Pressable, Animated } from 'react-native'
import { styles } from './expansion-panel-item.style'
import {
  useExpansionPanelItemState,
  useExpansionPanelItemAnimation,
  useBaseStyles,
  useTriggerStyles,
  useTitleTextStyle,
  useSubtitleTextStyle,
  useContentContainerStyle,
  useForegroundColor,
} from './expansion-panel-item.hook'
import { ChevronRightIcon } from './chevron-right-icon'
import type { ExpansionPanelItemProps } from './expansion-panel-item.type'

export const ExpansionPanelItem: React.FC<ExpansionPanelItemProps> = ({
  itemKey,
  children,
  title,
  subtitle,
  startContent,
  indicator,
  customAppearance,
  onSelected,
}) => {
  const {
    variant,
    hideIndicator,
    disableAnimation,
    isCompact,
    isExpanded,
    isDisabled,
    handlePress: togglePress,
  } = useExpansionPanelItemState(itemKey)

  const handlePress = () => {
    togglePress()
    onSelected?.(!isExpanded)
  }

  const { onContentLayout, heightInterpolation, rotationInterpolation } =
    useExpansionPanelItemAnimation(isExpanded, disableAnimation)

  const baseStyles = useBaseStyles(variant, isDisabled)
  const triggerStyles = useTriggerStyles(variant, isCompact)
  const titleTextStyle = useTitleTextStyle(isCompact)
  const subtitleTextStyle = useSubtitleTextStyle()
  const contentContainerStyle = useContentContainerStyle(isCompact, variant)
  const foregroundColor = useForegroundColor()

  return (
    <View style={[baseStyles, customAppearance?.base]}>
      <View style={customAppearance?.heading}>
        <Pressable
          style={[triggerStyles, customAppearance?.trigger]}
          onPress={handlePress}
          disabled={isDisabled}
          accessibilityRole="button"
          accessibilityState={{ expanded: isExpanded, disabled: isDisabled }}
        >
          {startContent && (
            <View style={[styles.startContent, customAppearance?.startContent]}>
              {startContent}
            </View>
          )}

          <View style={styles.titleWrapper}>
            {typeof title === 'string' ? (
              <Text style={[titleTextStyle, customAppearance?.title]}>{title}</Text>
            ) : (
              title
            )}
            {subtitle &&
              (typeof subtitle === 'string' ? (
                <Text style={[subtitleTextStyle, customAppearance?.subtitle]}>
                  {subtitle}
                </Text>
              ) : (
                subtitle
              ))}
          </View>

          {!hideIndicator && (
            <Animated.View
              style={[
                styles.indicator,
                customAppearance?.indicator,
                { transform: [{ rotate: rotationInterpolation }] },
              ]}
            >
              {indicator || <ChevronRightIcon color={foregroundColor} />}
            </Animated.View>
          )}
        </Pressable>
      </View>

      <View style={styles.hiddenMeasure} pointerEvents="none">
        <View
          onLayout={onContentLayout}
          style={[contentContainerStyle, customAppearance?.content]}
        >
          {children}
        </View>
      </View>

      <Animated.View
        style={[
          styles.contentOverflow,
          disableAnimation
            ? { height: isExpanded ? undefined : 0 }
            : { height: heightInterpolation },
        ]}
      >
        <View style={[contentContainerStyle, customAppearance?.content]}>
          {children}
        </View>
      </Animated.View>
    </View>
  )
}

ExpansionPanelItem.displayName = 'ExpansionPanelItem'

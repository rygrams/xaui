import React from 'react'
import { View, Text, Pressable, Animated } from 'react-native'
import { styles } from './accordion-item.style'
import {
  useAccordionItemState,
  useAccordionItemAnimation,
  useAccordionItemStyles,
} from './accordion-item.hook'
import { ChevronRightIcon } from './chevron-right-icon'
import type { AccordionItemProps } from './accordion-item.type'

export const AccordionItem: React.FC<AccordionItemProps> = ({
  itemKey,
  children,
  title,
  subtitle,
  startContent,
  indicator,
  baseStyle,
  headingStyle,
  triggerStyle,
  titleStyle,
  subtitleStyle,
  contentStyle,
  startContentStyle,
  indicatorStyle,
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
  } = useAccordionItemState(itemKey)

  const handlePress = () => {
    togglePress()
    onSelected?.(!isExpanded)
  }

  const { onContentLayout, heightInterpolation, rotationInterpolation } =
    useAccordionItemAnimation(isExpanded, disableAnimation)

  const {
    baseStyles,
    triggerStyles,
    titleTextStyle,
    subtitleTextStyle,
    contentContainerStyle,
    foregroundColor,
  } = useAccordionItemStyles(variant, isCompact, isDisabled)

  return (
    <View style={[baseStyles, baseStyle]}>
      <View style={headingStyle}>
        <Pressable
          style={[triggerStyles, triggerStyle]}
          onPress={handlePress}
          disabled={isDisabled}
          accessibilityRole="button"
          accessibilityState={{ expanded: isExpanded, disabled: isDisabled }}
        >
          {startContent && (
            <View style={[styles.startContent, startContentStyle]}>{startContent}</View>
          )}

          <View style={styles.titleWrapper}>
            {typeof title === 'string' ? (
              <Text style={[titleTextStyle, titleStyle]}>{title}</Text>
            ) : (
              title
            )}
            {subtitle &&
              (typeof subtitle === 'string' ? (
                <Text style={[subtitleTextStyle, subtitleStyle]}>{subtitle}</Text>
              ) : (
                subtitle
              ))}
          </View>

          {!hideIndicator && (
            <Animated.View
              style={[
                styles.indicator,
                indicatorStyle,
                { transform: [{ rotate: rotationInterpolation }] },
              ]}
            >
              {indicator || <ChevronRightIcon color={foregroundColor} />}
            </Animated.View>
          )}
        </Pressable>
      </View>

      <View style={styles.hiddenMeasure} pointerEvents="none">
        <View onLayout={onContentLayout} style={[contentContainerStyle, contentStyle]}>
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
        <View style={[contentContainerStyle, contentStyle]}>{children}</View>
      </Animated.View>
    </View>
  )
}

AccordionItem.displayName = 'AccordionItem'

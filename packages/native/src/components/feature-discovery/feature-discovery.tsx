import React, { useEffect } from 'react'
import {
  Animated,
  Modal,
  Pressable,
  Text,
  View,
  type StyleProp,
  type TextStyle,
} from 'react-native'
import { withOpacity } from '@xaui/core'
import type { FeatureDiscoveryProps } from './feature-discovery.type'
import { styles } from './feature-discovery.style'
import {
  useFeatureDiscoveryAnimations,
  useFeatureDiscoveryLayout,
  useFeatureDiscoveryGeometry,
  useFeatureDiscoveryTheme,
} from './feature-discovery.hook'

const DEFAULT_SPOTLIGHT_PADDING = 14
const DEFAULT_CIRCLE_SCALE = 1.65

export const FeatureDiscovery: React.FC<FeatureDiscoveryProps> = ({
  isVisible,
  targetRef,
  title,
  description,
  actionText,
  onActionPress,
  onDismiss,
  dismissOnBackdropPress = true,
  themeColor = 'primary',
  overlayColor,
  spotlightPadding = DEFAULT_SPOTLIGHT_PADDING,
  circleScale = DEFAULT_CIRCLE_SCALE,
  highlightContent,
  customAppearance,
}: FeatureDiscoveryProps) => {
  const {
    backdropOpacity,
    circleAnimScale,
    contentOpacity,
    haloScale,
    startAnimations,
    resetAnimations,
  } = useFeatureDiscoveryAnimations()

  const {
    target,
    measureTarget,
    setTargetLayout,
    viewportWidth,
    viewportHeight,
  } = useFeatureDiscoveryLayout(targetRef)

  const {
    targetCenterX,
    targetCenterY,
    spotlightSize,
    circleDiameter,
    messageTop,
    msgLeft,
    msgRight,
    msgMaxHeight,
    isTargetOnLeft,
    highlightX,
    highlightY,
  } = useFeatureDiscoveryGeometry(
    target,
    viewportWidth,
    viewportHeight,
    spotlightPadding,
    circleScale
  )

  const { colorScheme, resolvedOverlayColor } = useFeatureDiscoveryTheme(
    themeColor,
    overlayColor
  )

  useEffect(() => {
    if (!isVisible) {
      setTargetLayout(null)
      return
    }

    resetAnimations()

    const timer = setTimeout(() => {
      measureTarget()
      startAnimations()
    }, 0)

    return () => clearTimeout(timer)
  }, [isVisible, measureTarget, resetAnimations, setTargetLayout, startAnimations])

  if (!isVisible) return null

  const renderContent = (
    content: React.ReactNode,
    textStyle: StyleProp<TextStyle>
  ) => {
    if (typeof content === 'string' || typeof content === 'number') {
      return <Text style={textStyle}>{content}</Text>
    }

    return content
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <View style={[styles.root, customAppearance?.root, customAppearance?.container]}>
        <Pressable
          style={styles.absoluteFill}
          onPress={dismissOnBackdropPress ? onDismiss : undefined}
        >
          <Animated.View
            style={[
              styles.absoluteFill,
              {
                backgroundColor: resolvedOverlayColor,
                opacity: backdropOpacity,
              },
            ]}
          />
        </Pressable>

        <Animated.View
          style={[
            styles.circle,
            {
              width: circleDiameter,
              height: circleDiameter,
              borderRadius: circleDiameter / 2,
              left: targetCenterX - circleDiameter / 2,
              top: targetCenterY - circleDiameter / 2,
              backgroundColor: colorScheme.main,
              opacity: contentOpacity,
              transform: [{ scale: circleAnimScale }],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.spotlightHalo,
            {
              width: spotlightSize,
              height: spotlightSize,
              borderRadius: spotlightSize / 2,
              left: targetCenterX - spotlightSize / 2,
              top: targetCenterY - spotlightSize / 2,
              opacity: contentOpacity,
              transform: [{ scale: haloScale }],
            },
          ]}
        />

        {highlightContent && (
          <Animated.View
            style={[
              styles.highlightContainer,
              {
                left: highlightX,
                top: highlightY,
                width: target.width,
                height: target.height,
                opacity: contentOpacity,
              },
              customAppearance?.highlightContainer,
            ]}
            pointerEvents="none"
          >
            {highlightContent}
          </Animated.View>
        )}

        <Animated.View
          style={[
            styles.messageContainer,
            {
              top: messageTop,
              left: msgLeft,
              right: msgRight,
              maxHeight: msgMaxHeight,
              opacity: contentOpacity,
            },
            customAppearance?.messageContainer,
          ]}
          pointerEvents="box-none"
        >
          <View style={styles.messageHeader}>
            <View style={styles.messageTitleWrapper}>
              {renderContent(title, [
                styles.title,
                { color: colorScheme.foreground },
                { textAlign: isTargetOnLeft ? 'left' : 'right' },
                customAppearance?.title,
              ])}
            </View>

            <Pressable
              onPress={onDismiss}
              style={styles.closeButton}
              accessibilityRole="button"
            >
              <Text style={[styles.closeIcon, { color: colorScheme.foreground }]}>
                ✕
              </Text>
            </Pressable>
          </View>

          {description
            ? renderContent(description, [
                styles.description,
                { color: withOpacity(colorScheme.foreground, 0.9) },
                { textAlign: isTargetOnLeft ? 'left' : 'right' },
                customAppearance?.description,
              ])
            : null}

          {actionText ? (
            <Pressable
              onPress={onActionPress}
              style={[
                styles.actionPressable,
                { alignSelf: isTargetOnLeft ? 'flex-start' : 'flex-end' },
              ]}
              accessibilityRole="button"
            >
              {renderContent(actionText, [
                styles.actionText,
                { color: colorScheme.foreground },
                customAppearance?.actionText,
              ])}
            </Pressable>
          ) : null}
        </Animated.View>
      </View>
    </Modal>
  )
}

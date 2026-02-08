import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Modal,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  type StyleProp,
  type TextStyle,
} from 'react-native'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { FeatureDiscoveryProps } from './feature-discovery.type'
import { styles } from './feature-discovery.style'

type TargetLayout = {
  x: number
  y: number
  width: number
  height: number
}

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
  style,
  customAppearance,
}: FeatureDiscoveryProps) => {
  const theme = useXUITheme()
  const { width: viewportWidth, height: viewportHeight } = useWindowDimensions()
  const [targetLayout, setTargetLayout] = useState<TargetLayout | null>(null)

  const backdropOpacity = useRef(new Animated.Value(0)).current
  const circleAnimScale = useRef(new Animated.Value(0.2)).current
  const contentOpacity = useRef(new Animated.Value(0)).current
  const haloScale = useRef(new Animated.Value(0.8)).current

  const measureTarget = useCallback(() => {
    targetRef.current?.measureInWindow((x, y, width, height) => {
      if (!width && !height) {
        setTargetLayout({
          x: viewportWidth / 2 - 28,
          y: viewportHeight / 2 - 28,
          width: 56,
          height: 56,
        })
        return
      }

      setTargetLayout({ x, y, width, height })
    })
  }, [targetRef, viewportHeight, viewportWidth])

  useEffect(() => {
    if (!isVisible) {
      setTargetLayout(null)
      return
    }

    backdropOpacity.setValue(0)
    circleAnimScale.setValue(0.2)
    contentOpacity.setValue(0)
    haloScale.setValue(0.8)

    const timer = setTimeout(() => {
      measureTarget()

      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(circleAnimScale, {
          toValue: 1,
          friction: 8,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.spring(haloScale, {
          toValue: 1,
          friction: 8,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start()
    }, 0)

    return () => clearTimeout(timer)
  }, [
    backdropOpacity,
    circleAnimScale,
    contentOpacity,
    haloScale,
    isVisible,
    measureTarget,
  ])

  const colorScheme = theme.colors[getSafeThemeColor(themeColor)]
  const resolvedOverlayColor =
    overlayColor ?? withOpacity(theme.colors.foreground, 0.42)

  const circleDiameter = useMemo(() => {
    return viewportWidth * circleScale
  }, [circleScale, viewportWidth])

  if (!isVisible) return null

  const fallbackTarget = {
    x: viewportWidth / 2 - 28,
    y: viewportHeight / 2 - 28,
    width: 56,
    height: 56,
  }

  const target = targetLayout ?? fallbackTarget
  const targetCenterX = target.x + target.width / 2
  const targetCenterY = target.y + target.height / 2
  const spotlightSize = Math.max(target.width, target.height) + spotlightPadding * 2

  const isTargetInTopHalf = targetCenterY < viewportHeight * 0.55
  const messageTop = isTargetInTopHalf
    ? Math.min(viewportHeight - 180, target.y + target.height + 30)
    : Math.max(28, target.y - 150)

  const circleRadius = circleDiameter / 2
  const TEXT_PADDING = 24
  const textDy = messageTop - targetCenterY
  const textHalfChord =
    Math.abs(textDy) < circleRadius
      ? Math.sqrt(circleRadius ** 2 - textDy ** 2)
      : 0
  const msgLeft = Math.max(TEXT_PADDING, targetCenterX - textHalfChord + TEXT_PADDING)
  const msgRight = Math.max(
    TEXT_PADDING,
    viewportWidth - (targetCenterX + textHalfChord - TEXT_PADDING)
  )
  const msgMaxHeight = isTargetInTopHalf
    ? Math.max(80, targetCenterY + circleRadius - messageTop - TEXT_PADDING)
    : Math.max(80, target.y - spotlightSize / 2 - messageTop - TEXT_PADDING)

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
      <View style={[styles.root, style, customAppearance?.container]}>
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
                left: target.x,
                top: target.y,
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
              backgroundColor: colorScheme.main,
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
                customAppearance?.description,
              ])
            : null}

          {actionText ? (
            <Pressable
              onPress={onActionPress}
              style={styles.actionPressable}
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

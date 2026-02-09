import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import { CheckmarkIcon, LockClosedIcon } from '@xaui/icons'
import { useStepperContext } from './stepper-context'
import { useStepperColors, useStepperSizeStyles } from './stepper.hook'
import { styles } from './stepper.style'
import type {
  StepperItemIndicatorState,
  StepperItemProps,
  StepperSize,
} from './stepper.type'

const isStringOrNumber = (
  value: React.ReactNode
): value is string | number => typeof value === 'string' || typeof value === 'number'

export const StepperItem: React.FC<StepperItemProps> = ({
  itemKey,
  title,
  description,
  indicator,
  isLocked = false,
  isDisabled = false,
  children,
  onPress,
  style,
  customAppearance,
}) => {
  const context = useStepperContext()

  const direction = context?.direction ?? 'horizontal'
  const showLines = context?.showLines ?? true
  const lineDisplayMode = context?.lineDisplayMode ?? 'progress'
  const groupDisabled = context?.isDisabled ?? false
  const size = (context?.size ?? 'md') as StepperSize
  const themeColor = context?.themeColor ?? 'primary'

  const sizeStyles = useStepperSizeStyles(size)
  const colors = useStepperColors(themeColor)

  const index = context?.keys.indexOf(itemKey) ?? -1
  const isActive = context?.activeKey === itemKey
  const hasActiveStep = (context?.activeIndex ?? -1) >= 0
  const isCompleted = hasActiveStep && index >= 0 && index < (context?.activeIndex ?? -1)
  const isLast = index === (context?.keys.length ?? 0) - 1
  const lineTargetProgress = isCompleted ? 1 : 0
  const lineProgress = useRef(new Animated.Value(lineTargetProgress)).current

  const disabled = groupDisabled || isDisabled
  const blocked = disabled || isLocked

  const indicatorState: StepperItemIndicatorState = {
    index: Math.max(index, 0),
    isActive,
    isCompleted,
    isLocked,
    isDisabled: disabled,
  }

  const indicatorNode = useMemo(() => {
    if (typeof indicator === 'function') {
      return indicator(indicatorState)
    }

    if (indicator !== undefined) {
      return indicator
    }

    const iconSize = Math.max(12, Math.floor(sizeStyles.indicatorSize * 0.54))

    if (isLocked) {
      return (
        <LockClosedIcon
          key={`lock-${itemKey}-${isLocked ? 'on' : 'off'}`}
          size={iconSize}
          color={colors.lockedIndicatorText}
          isAnimated
        />
      )
    }

    if (isCompleted) {
      return (
        <CheckmarkIcon
          key={`done-${itemKey}-${isCompleted ? 'on' : 'off'}`}
          size={iconSize}
          color={colors.completedIndicatorText}
          isAnimated
        />
      )
    }

    return String(indicatorState.index + 1)
  }, [indicator, indicatorState, sizeStyles.indicatorSize, isLocked, isCompleted, itemKey, colors])

  useEffect(() => {
    Animated.timing(lineProgress, {
      toValue: lineTargetProgress,
      duration: 240,
      useNativeDriver: true,
    }).start()
  }, [lineProgress, lineTargetProgress])

  const indicatorText = isStringOrNumber(indicatorNode) ? (
    <Text
      style={{
        color: isLocked
          ? colors.lockedIndicatorText
          : isActive
            ? colors.activeIndicatorText
            : isCompleted
              ? colors.completedIndicatorText
              : colors.inactiveIndicatorText,
        fontSize: sizeStyles.titleFontSize,
        fontWeight: '700',
      }}
    >
      {indicatorNode}
    </Text>
  ) : (
    indicatorNode
  )

  const lineStyle = [
    styles.line,
    direction === 'horizontal'
      ? {
          height: sizeStyles.lineThickness,
          marginHorizontal: sizeStyles.horizontalSpacing,
        }
      : {
          width: sizeStyles.lineThickness,
          marginVertical: sizeStyles.verticalSpacing,
          minHeight: sizeStyles.verticalGap,
        },
    {
      backgroundColor: lineDisplayMode === 'all' ? colors.line : 'transparent',
    },
    context?.customAppearance?.line,
  ]

  return (
    <Pressable
      onPress={() => {
        if (blocked) return
        context?.onStepChange?.(itemKey)
        onPress?.(itemKey)
      }}
      disabled={blocked}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isActive, disabled: blocked }}
      style={[
        direction === 'horizontal' ? styles.horizontalItem : styles.verticalItem,
        blocked && (isLocked ? styles.locked : styles.disabled),
        style,
        customAppearance?.container,
        context?.customAppearance?.itemContainer,
      ]}
    >
      {direction === 'horizontal' ? (
        <>
          <View style={styles.horizontalTopRow}>
            <View
              style={[
                styles.indicator,
                {
                  width: sizeStyles.indicatorSize,
                  height: sizeStyles.indicatorSize,
                  borderRadius: sizeStyles.indicatorSize / 2,
                  borderWidth: sizeStyles.indicatorBorderWidth,
                  borderColor: isLocked
                    ? colors.lockedIndicatorBorder
                    : isActive
                      ? colors.activeIndicatorBorder
                      : isCompleted
                        ? colors.completedIndicatorBorder
                        : colors.inactiveIndicatorBorder,
                  backgroundColor: isLocked
                    ? colors.lockedIndicatorBackground
                    : isActive
                      ? colors.activeIndicatorBackground
                      : isCompleted
                        ? colors.completedIndicatorBackground
                        : colors.inactiveIndicatorBackground,
                },
                customAppearance?.indicator,
                isActive && customAppearance?.activeIndicator,
                isCompleted && customAppearance?.completedIndicator,
                isLocked && customAppearance?.lockedIndicator,
              ]}
            >
              {indicatorText}
            </View>
            {showLines && !isLast ? (
              <View style={lineStyle}>
                <View
                  style={[
                    styles.lineProgressWrap,
                    direction === 'horizontal'
                      ? styles.lineProgressHorizontal
                      : styles.lineProgressVertical,
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.lineProgress,
                      {
                        backgroundColor: colors.activeLine,
                        transform: [
                          direction === 'horizontal'
                            ? { scaleX: lineProgress }
                            : { scaleY: lineProgress },
                        ],
                      },
                      context?.customAppearance?.activeLine,
                    ]}
                  />
                </View>
              </View>
            ) : null}
          </View>

          <View
            style={[
              styles.horizontalContent,
              { marginTop: sizeStyles.verticalSpacing },
            ]}
          >
            {title ? (
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: sizeStyles.titleFontSize,
                    color: colors.title,
                  },
                  customAppearance?.title,
                ]}
              >
                {title}
              </Text>
            ) : null}
            {description ? (
              <Text
                style={[
                  styles.description,
                  {
                    fontSize: sizeStyles.descriptionFontSize,
                    color: colors.description,
                    marginTop: 2,
                  },
                  customAppearance?.description,
                ]}
              >
                {description}
              </Text>
            ) : null}
            {children}
          </View>
        </>
      ) : (
        <View style={styles.verticalRow}>
          <View style={{ alignItems: 'center' }}>
            <View
              style={[
                styles.indicator,
                {
                  width: sizeStyles.indicatorSize,
                  height: sizeStyles.indicatorSize,
                  borderRadius: sizeStyles.indicatorSize / 2,
                  borderWidth: sizeStyles.indicatorBorderWidth,
                  borderColor: isLocked
                    ? colors.lockedIndicatorBorder
                    : isActive
                      ? colors.activeIndicatorBorder
                      : isCompleted
                        ? colors.completedIndicatorBorder
                        : colors.inactiveIndicatorBorder,
                  backgroundColor: isLocked
                    ? colors.lockedIndicatorBackground
                    : isActive
                      ? colors.activeIndicatorBackground
                      : isCompleted
                        ? colors.completedIndicatorBackground
                        : colors.inactiveIndicatorBackground,
                },
                customAppearance?.indicator,
                isActive && customAppearance?.activeIndicator,
                isCompleted && customAppearance?.completedIndicator,
                isLocked && customAppearance?.lockedIndicator,
              ]}
            >
              {indicatorText}
            </View>
            {showLines && !isLast ? (
              <View style={styles.verticalLineWrap}>
                <View style={lineStyle}>
                  <View
                    style={[styles.lineProgressWrap, styles.lineProgressVertical]}
                  >
                    <Animated.View
                      style={[
                        styles.lineProgress,
                        {
                          backgroundColor: colors.activeLine,
                          transform: [{ scaleY: lineProgress }],
                        },
                        context?.customAppearance?.activeLine,
                      ]}
                    />
                  </View>
                </View>
              </View>
            ) : null}
          </View>

          <View
            style={[
              styles.verticalContent,
              { paddingBottom: sizeStyles.verticalGap },
              { marginLeft: sizeStyles.horizontalSpacing },
            ]}
          >
            {title ? (
              <Text
                style={[
                  styles.title,
                  styles.titleVertical,
                  {
                    fontSize: sizeStyles.titleFontSize,
                    color: colors.title,
                  },
                  customAppearance?.title,
                ]}
              >
                {title}
              </Text>
            ) : null}
            {description ? (
              <Text
                style={[
                  styles.description,
                  styles.descriptionVertical,
                  {
                    fontSize: sizeStyles.descriptionFontSize,
                    color: colors.description,
                    marginTop: 2,
                  },
                  customAppearance?.description,
                ]}
              >
                {description}
              </Text>
            ) : null}
            {children}
          </View>
        </View>
      )}
    </Pressable>
  )
}

StepperItem.displayName = 'StepperItem'

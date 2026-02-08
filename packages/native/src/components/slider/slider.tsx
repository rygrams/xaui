import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  PanResponder,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native'
import { useXUITheme } from '../../core'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import {
  runSliderThumbPressInAnimation,
  runSliderThumbPressOutAnimation,
} from './slider.animation'
import { useSliderColorStyles, useSliderSizeStyles } from './slider.hook'
import { styles } from './slider.style'
import type { SliderMark, SliderProps } from './slider.type'

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const roundToStep = (value: number, min: number, step: number) => {
  const safeStep = step <= 0 ? 1 : step
  return Math.round((value - min) / safeStep) * safeStep + min
}

const valueToPercent = (value: number, min: number, max: number) => {
  const range = max - min
  if (range <= 0) return 0
  return ((value - min) / range) * 100
}

const percentToValue = (percent: number, min: number, max: number, step: number) => {
  const raw = min + ((max - min) * percent) / 100
  return clamp(roundToStep(raw, min, step), min, max)
}

const getInitialValue = ({
  value,
  defaultValue,
  minValue,
  maxValue,
}: {
  value?: number
  defaultValue?: number
  minValue: number
  maxValue: number
}) => {
  if (value !== undefined) return clamp(value, minValue, maxValue)
  if (defaultValue !== undefined) return clamp(defaultValue, minValue, maxValue)
  return minValue
}

const getRelativePosition = (
  location: number,
  trackLength: number,
  orientation: 'horizontal' | 'vertical'
) => {
  if (trackLength <= 0) return 0
  const ratio = clamp(location / trackLength, 0, 1)
  return orientation === 'vertical' ? (1 - ratio) * 100 : ratio * 100
}

const renderMarkLabel = (mark: SliderMark) => {
  if (mark.label === undefined) return null
  return mark.label
}

const getPixelPosition = (percent: number, length: number) => {
  if (length <= 0) return 0
  return (clamp(percent, 0, 100) / 100) * length
}

export const Slider: React.FC<SliderProps> = ({
  value: controlledValue,
  defaultValue,
  minValue = 0,
  maxValue = 100,
  step = 1,
  label,
  showValueLabel = false,
  formatOptions,
  marks,
  showSteps = false,
  orientation = 'horizontal',
  size = 'md',
  color = 'primary',
  radius = 'full',
  startContent,
  endContent,
  isDisabled = false,
  isReadOnly = false,
  trackLength,
  onChange,
  onChangeEnd,
  customAppearance,
}) => {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(
    getInitialValue({
      value: controlledValue,
      defaultValue,
      minValue,
      maxValue,
    })
  )
  const [measuredTrackLength, setMeasuredTrackLength] = useState(
    trackLength && trackLength > 0 ? trackLength : 0
  )

  const currentValue = isControlled
    ? clamp(controlledValue as number, minValue, maxValue)
    : internalValue

  const sizeStyles = useSliderSizeStyles(size)
  const colorStyles = useSliderColorStyles(color, isDisabled)
  const radiusStyles = useBorderRadiusStyles(radius)
  const theme = useXUITheme()
  const thumbScale = useRef(new Animated.Value(1)).current
  const initialTouchTrackPosition = useRef(0)
  const animatedTrackPosition = useRef(new Animated.Value(0)).current
  const isDragging = useRef(false)
  const currentValueRef = useRef(currentValue)
  currentValueRef.current = currentValue
  const onChangeEndRef = useRef(onChangeEnd)
  onChangeEndRef.current = onChangeEnd
  const thumbOverlapInset = Math.max(
    0,
    (sizeStyles.thumbSize - sizeStyles.trackThickness) / 2
  )

  const formattedValue = useMemo(() => {
    try {
      return new Intl.NumberFormat(undefined, formatOptions).format(currentValue)
    } catch {
      return String(currentValue)
    }
  }, [currentValue, formatOptions])

  const activePercent = valueToPercent(currentValue, minValue, maxValue)
  const effectiveTrackLength =
    trackLength && trackLength > 0 ? trackLength : measuredTrackLength
  const thumbCenterPosition = getPixelPosition(activePercent, effectiveTrackLength)
  const trackContainerLengthStyle =
    orientation === 'vertical'
      ? {
          height:
            (trackLength && trackLength > 0 ? trackLength : 220) +
            thumbOverlapInset * 2,
        }
      : trackLength && trackLength > 0
        ? { width: trackLength + thumbOverlapInset * 2 }
        : null

  useEffect(() => {
    if (!isDragging.current && effectiveTrackLength > 0) {
      animatedTrackPosition.setValue(
        clamp(thumbCenterPosition, 0, effectiveTrackLength)
      )
    }
  }, [thumbCenterPosition, effectiveTrackLength, animatedTrackPosition])

  const animatedFillSize = useMemo(() => {
    const safeLength = Math.max(effectiveTrackLength, 1)
    return animatedTrackPosition.interpolate({
      inputRange: [0, safeLength],
      outputRange: [0, safeLength],
      extrapolate: 'clamp',
    })
  }, [animatedTrackPosition, effectiveTrackLength])

  const animatedThumbOffset = useMemo(() => {
    const base = thumbOverlapInset - sizeStyles.thumbSize / 2
    const safeLength = Math.max(effectiveTrackLength, 1)
    return animatedTrackPosition.interpolate({
      inputRange: [0, safeLength],
      outputRange: [base, safeLength + base],
      extrapolate: 'clamp',
    })
  }, [
    animatedTrackPosition,
    effectiveTrackLength,
    thumbOverlapInset,
    sizeStyles.thumbSize,
  ])

  const setValue = useCallback(
    (nextValue: number) => {
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      onChange?.(nextValue)
    },
    [isControlled, onChange]
  )

  const setValueFromPosition = useCallback(
    (position: number) => {
      const nextPercent = getRelativePosition(
        position,
        effectiveTrackLength,
        orientation
      )
      const nextValue = percentToValue(nextPercent, minValue, maxValue, step)
      setValue(nextValue)
      return nextValue
    },
    [effectiveTrackLength, maxValue, minValue, orientation, setValue, step]
  )

  const isInteractive = !isDisabled && !isReadOnly

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => isInteractive,
        onMoveShouldSetPanResponder: (_evt, gs) => {
          if (!isInteractive) return false
          return orientation === 'horizontal'
            ? Math.abs(gs.dx) >= Math.abs(gs.dy)
            : Math.abs(gs.dy) >= Math.abs(gs.dx)
        },
        onPanResponderTerminationRequest: () => !isDragging.current,
        onPanResponderGrant: (event) => {
          if (!isInteractive) return
          isDragging.current = true
          runSliderThumbPressInAnimation(thumbScale)
          const point =
            orientation === 'vertical'
              ? event.nativeEvent.locationY
              : event.nativeEvent.locationX
          const rawPosition = point - thumbOverlapInset
          initialTouchTrackPosition.current = rawPosition
          const clamped = clamp(rawPosition, 0, effectiveTrackLength)
          animatedTrackPosition.setValue(
            orientation === 'vertical' ? effectiveTrackLength - clamped : clamped
          )
          setValueFromPosition(rawPosition)
        },
        onPanResponderMove: (_event, gestureState) => {
          if (!isInteractive) return
          const delta =
            orientation === 'vertical' ? gestureState.dy : gestureState.dx
          const rawPosition = initialTouchTrackPosition.current + delta
          const clamped = clamp(rawPosition, 0, effectiveTrackLength)
          animatedTrackPosition.setValue(
            orientation === 'vertical' ? effectiveTrackLength - clamped : clamped
          )
          setValueFromPosition(rawPosition)
        },
        onPanResponderRelease: (_event, gestureState) => {
          isDragging.current = false
          runSliderThumbPressOutAnimation(thumbScale)
          if (!isInteractive) return
          const delta =
            orientation === 'vertical' ? gestureState.dy : gestureState.dx
          const nextValue = setValueFromPosition(
            initialTouchTrackPosition.current + delta
          )
          const snappedPercent = valueToPercent(nextValue, minValue, maxValue)
          animatedTrackPosition.setValue(
            getPixelPosition(snappedPercent, effectiveTrackLength)
          )
          onChangeEndRef.current?.(nextValue)
        },
        onPanResponderTerminate: () => {
          isDragging.current = false
          runSliderThumbPressOutAnimation(thumbScale)
          const val = currentValueRef.current
          const pct = valueToPercent(val, minValue, maxValue)
          animatedTrackPosition.setValue(
            getPixelPosition(pct, effectiveTrackLength)
          )
          onChangeEndRef.current?.(val)
        },
      }),
    [
      animatedTrackPosition,
      effectiveTrackLength,
      isInteractive,
      minValue,
      maxValue,
      orientation,
      setValueFromPosition,
      thumbScale,
      thumbOverlapInset,
    ]
  )

  const handleTrackLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (trackLength && trackLength > 0) return
      const nextLength =
        orientation === 'vertical'
          ? event.nativeEvent.layout.height
          : event.nativeEvent.layout.width
      setMeasuredTrackLength(nextLength)
    },
    [orientation, trackLength]
  )

  const steps = useMemo(() => {
    if (!showSteps || step <= 0 || maxValue <= minValue) return []
    const count = Math.floor((maxValue - minValue) / step)
    if (count > 200) return []
    return Array.from({ length: count + 1 }, (_, index) => minValue + index * step)
  }, [maxValue, minValue, showSteps, step])

  return (
    <View style={[styles.container, customAppearance?.container]}>
      {(label !== undefined || showValueLabel) && (
        <View style={[styles.header, customAppearance?.header]}>
          {label !== undefined ? (
            <Text
              style={[
                styles.label,
                { color: colorStyles.labelColor, fontSize: sizeStyles.fontSize },
                customAppearance?.label,
              ]}
            >
              {label}
            </Text>
          ) : (
            <View />
          )}
          {showValueLabel && (
            <Text
              style={[
                styles.value,
                { color: colorStyles.valueColor, fontSize: sizeStyles.fontSize },
                customAppearance?.value,
              ]}
            >
              {formattedValue}
            </Text>
          )}
        </View>
      )}

      <View
        style={[
          orientation === 'vertical' ? styles.verticalRow : styles.row,
          (isDisabled || isReadOnly) && styles.disabled,
        ]}
      >
        {startContent}
        <View
          {...panResponder.panHandlers}
          style={[
            styles.trackContainer,
            orientation === 'vertical' && styles.verticalTrackContainer,
            {
              padding: thumbOverlapInset,
            },
            trackContainerLengthStyle,
            customAppearance?.trackContainer,
          ]}
        >
          <View
            onLayout={handleTrackLayout}
            style={[
              styles.track,
              orientation === 'vertical' && styles.verticalTrack,
              {
                borderRadius: radiusStyles.borderRadius,
                backgroundColor: colorStyles.trackColor,
                height:
                  orientation === 'vertical' ? '100%' : sizeStyles.trackThickness,
                width:
                  orientation === 'vertical' ? sizeStyles.trackThickness : '100%',
              },
              customAppearance?.track,
            ]}
          >
            <Animated.View
              style={[
                styles.fill,
                orientation === 'vertical' && styles.verticalFill,
                {
                  backgroundColor: colorStyles.fillColor,
                  height:
                    orientation === 'vertical'
                      ? effectiveTrackLength > 0
                        ? animatedFillSize
                        : `${activePercent}%`
                      : sizeStyles.trackThickness,
                  width:
                    orientation === 'vertical'
                      ? sizeStyles.trackThickness
                      : effectiveTrackLength > 0
                        ? animatedFillSize
                        : `${activePercent}%`,
                },
                customAppearance?.fill,
              ]}
            />

            {showSteps &&
              steps.map(stepValue => {
                const percent = valueToPercent(stepValue, minValue, maxValue)
                const isActive = stepValue <= currentValue
                return (
                  <View
                    key={`step-${stepValue}`}
                    style={[
                      styles.stepDot,
                      {
                        width: sizeStyles.stepDotSize,
                        height: sizeStyles.stepDotSize,
                        backgroundColor: isActive
                          ? colorStyles.activeStepColor
                          : colorStyles.stepColor,
                        left:
                          orientation === 'vertical'
                            ? (sizeStyles.trackThickness - sizeStyles.stepDotSize) /
                              2
                            : getPixelPosition(percent, effectiveTrackLength) -
                              sizeStyles.stepDotSize / 2,
                        bottom:
                          orientation === 'vertical'
                            ? getPixelPosition(percent, effectiveTrackLength) -
                              sizeStyles.stepDotSize / 2
                            : (sizeStyles.trackThickness - sizeStyles.stepDotSize) /
                              2,
                      },
                      customAppearance?.step,
                      isActive && customAppearance?.activeStep,
                    ]}
                  />
                )
              })}
          </View>

          <Animated.View
            pointerEvents="none"
            style={[
              styles.thumb,
              {
                width: sizeStyles.thumbSize,
                height: sizeStyles.thumbSize,
                borderRadius: sizeStyles.thumbSize / 2,
                left: orientation === 'vertical' ? 0 : animatedThumbOffset,
                top: orientation === 'vertical' ? undefined : 0,
                bottom:
                  orientation === 'vertical' ? animatedThumbOffset : undefined,
                backgroundColor: theme.colors.background,
                borderWidth: 2,
                borderColor: colorStyles.fillColor,
                ...theme.shadows.md,
                transform: [{ scale: thumbScale }],
              },
              customAppearance?.thumb,
            ]}
          />

          {marks?.map(mark => {
            const percent = valueToPercent(mark.value, minValue, maxValue)
            return (
              <View
                key={`mark-${mark.value}`}
                style={[
                  styles.mark,
                  {
                    left:
                      orientation === 'vertical'
                        ? thumbOverlapInset + sizeStyles.trackThickness + 8
                        : thumbOverlapInset +
                          getPixelPosition(percent, effectiveTrackLength) -
                          10,
                    top:
                      orientation === 'vertical'
                        ? undefined
                        : thumbOverlapInset + sizeStyles.trackThickness,
                    bottom:
                      orientation === 'vertical'
                        ? thumbOverlapInset +
                          getPixelPosition(percent, effectiveTrackLength) -
                          8
                        : undefined,
                  },
                  customAppearance?.mark,
                ]}
              >
                <Text
                  style={[
                    styles.markLabel,
                    { color: colorStyles.markColor },
                    customAppearance?.markLabel,
                  ]}
                >
                  {renderMarkLabel(mark)}
                </Text>
              </View>
            )
          })}
        </View>
        {endContent}
      </View>
    </View>
  )
}

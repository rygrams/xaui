import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useTimePickerState, useTimePickerColors } from './timepicker.hook'
import { styles } from './timepicker.style'
import {
  getHourAngle,
  getMinuteAngle,
  clampHour,
  clampMinute,
} from './timepicker.utils'
import type { TimePickerProps } from './timepicker.type'

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  is24Hour = false,
  themeColor = 'primary',
  style,
}) => {
  const {
    time,
    displayHours,
    period,
    mode,
    handleHourChange,
    handleMinuteChange,
    handlePeriodToggle,
    handleManualInput,
    setMode,
  } = useTimePickerState(value, is24Hour, onChange)

  const colors = useTimePickerColors(themeColor)

  const hourAngle = useMemo(() => getHourAngle(displayHours, is24Hour), [displayHours, is24Hour])
  const minuteAngle = useMemo(() => getMinuteAngle(time.minutes), [time.minutes])

  const currentAngle = mode === 'hour' ? hourAngle : minuteAngle
  const handRotation = useSharedValue(currentAngle)
  const [hourInput, setHourInput] = useState(displayHours.toString().padStart(2, '0'))
  const [minuteInput, setMinuteInput] = useState(time.minutes.toString().padStart(2, '0'))

  useEffect(() => {
    handRotation.value = withTiming(currentAngle - 180, {
      duration: 120,
      easing: Easing.out(Easing.cubic),
    })
  }, [currentAngle, handRotation])

  useEffect(() => {
    setHourInput(displayHours.toString().padStart(2, '0'))
  }, [displayHours])

  useEffect(() => {
    setMinuteInput(time.minutes.toString().padStart(2, '0'))
  }, [time.minutes])

  const handStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${handRotation.value}deg` }],
  }))

  const commitHourInput = () => {
    if (hourInput.trim() === '') {
      setHourInput(displayHours.toString().padStart(2, '0'))
      return
    }

    const hours = parseInt(hourInput, 10)
    if (isNaN(hours)) {
      setHourInput(displayHours.toString().padStart(2, '0'))
      return
    }

    const clampedHours = clampHour(hours, is24Hour)
    const finalHours = is24Hour
      ? clampedHours
      : period === 'PM' && clampedHours !== 12
        ? clampedHours + 12
        : clampedHours === 12 && period === 'AM'
          ? 0
          : clampedHours

    handleManualInput(finalHours, time.minutes)
  }

  const commitMinuteInput = () => {
    if (minuteInput.trim() === '') {
      setMinuteInput(time.minutes.toString().padStart(2, '0'))
      return
    }

    const minutes = parseInt(minuteInput, 10)
    if (isNaN(minutes)) {
      setMinuteInput(time.minutes.toString().padStart(2, '0'))
      return
    }

    handleManualInput(time.hours, clampMinute(minutes))
  }

  const renderClockNumbers = () => {
    if (mode === 'hour' && is24Hour) {
      const outerRadius = 104
      const innerRadius = 70

      return Array.from({ length: 12 }, (_, slot) => {
        const angle = slot * 30
        const radian = ((angle - 90) * Math.PI) / 180

        const outerValue = slot === 0 ? 12 : slot
        const innerValue = slot === 0 ? 0 : slot + 12

        const outerX = outerRadius * Math.cos(radian)
        const outerY = outerRadius * Math.sin(radian)
        const innerX = innerRadius * Math.cos(radian)
        const innerY = innerRadius * Math.sin(radian)

        const outerSelected = outerValue === displayHours
        const innerSelected = innerValue === displayHours

        return (
          <React.Fragment key={`hour-24-slot-${slot}`}>
            <Pressable
              onPress={() => handleHourChange(outerValue)}
              style={[
                styles.clockNumber,
                {
                  transform: [{ translateX: outerX }, { translateY: outerY }],
                  backgroundColor: outerSelected ? colors.primary : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  styles.clockNumberText,
                  { color: outerSelected ? colors.onPrimary : colors.text },
                ]}
              >
                {outerValue}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleHourChange(innerValue)}
              style={[
                styles.clockNumber,
                {
                  transform: [{ translateX: innerX }, { translateY: innerY }],
                  backgroundColor: innerSelected ? colors.primary : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  styles.clockNumberText,
                  { color: innerSelected ? colors.onPrimary : colors.text },
                ]}
              >
                {innerValue === 0 ? 24 : innerValue}
              </Text>
            </Pressable>
          </React.Fragment>
        )
      })
    }

    const numbers = mode === 'hour' ? 12 : 60
    const step = mode === 'hour' ? 1 : 5
    const radius = 100

    return Array.from({ length: numbers / step }, (_, i) => {
      const value = mode === 'hour' ? (i === 0 ? 12 : i * step) : i * step
      const angle = (value / (mode === 'hour' ? 12 : 60)) * 360
      const radian = ((angle - 90) * Math.PI) / 180

      const x = radius * Math.cos(radian)
      const y = radius * Math.sin(radian)

      const isSelected =
        mode === 'hour' ? value === displayHours : value === time.minutes

      return (
        <Pressable
          key={`${mode}-${value}`}
          onPress={() => {
            if (mode === 'hour') {
              handleHourChange(value === 12 && period === 'PM' ? 12 : value)
            } else {
              handleMinuteChange(value)
            }
          }}
          style={[
            styles.clockNumber,
            {
              transform: [{ translateX: x }, { translateY: y }],
              backgroundColor: isSelected ? colors.primary : 'transparent',
            },
          ]}
        >
          <Text
            style={[
              styles.clockNumberText,
              { color: isSelected ? colors.onPrimary : colors.text },
            ]}
          >
            {mode === 'minute' && value < 10 ? `0${value}` : value}
          </Text>
        </Pressable>
      )
    })
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textSecondary }]}>Select time</Text>

        <View
          style={[
            styles.timeDisplay,
            !is24Hour && styles.timeDisplayWithPeriod,
          ]}
        >
          <View style={styles.timeSection}>
            <TextInput
              style={[
                styles.timeDigit,
                {
                  color: mode === 'hour' ? colors.primary : colors.text,
                  backgroundColor:
                    mode === 'hour' ? colors.selectedDigit : 'transparent',
                },
              ]}
              value={hourInput}
              onChangeText={(text) => {
                const numeric = text.replace(/[^0-9]/g, '')
                if (numeric.length > 2) return
                setHourInput(numeric)

                if (numeric === '') return
                const hours = parseInt(numeric, 10)
                if (isNaN(hours)) return

                const clampedHours = clampHour(hours, is24Hour)
                const finalHours = is24Hour
                  ? clampedHours
                  : period === 'PM' && clampedHours !== 12
                    ? clampedHours + 12
                    : clampedHours === 12 && period === 'AM'
                      ? 0
                      : clampedHours

                handleManualInput(finalHours, time.minutes)
              }}
              onFocus={() => setMode('hour')}
              onBlur={commitHourInput}
              onSubmitEditing={commitHourInput}
              keyboardType="number-pad"
              maxLength={2}
              selectTextOnFocus
            />

            <Text style={[styles.timeSeparator, { color: colors.text }]}>:</Text>

            <TextInput
              style={[
                styles.timeDigit,
                {
                  color: mode === 'minute' ? colors.primary : colors.text,
                  backgroundColor:
                    mode === 'minute' ? colors.selectedDigit : 'transparent',
                },
              ]}
              value={minuteInput}
              onChangeText={(text) => {
                const numeric = text.replace(/[^0-9]/g, '')
                if (numeric.length > 2) return
                setMinuteInput(numeric)

                if (numeric === '') return
                const minutes = parseInt(numeric, 10)
                if (isNaN(minutes)) return

                handleManualInput(time.hours, clampMinute(minutes))
              }}
              onFocus={() => setMode('minute')}
              onBlur={commitMinuteInput}
              onSubmitEditing={commitMinuteInput}
              keyboardType="number-pad"
              maxLength={2}
              selectTextOnFocus
            />
          </View>

          {!is24Hour && (
            <View style={styles.periodSelector}>
              <Pressable
                onPress={() => handlePeriodToggle('AM')}
                style={[
                  styles.periodButton,
                  {
                    backgroundColor: period === 'AM' ? colors.surface : 'transparent',
                    borderColor: period === 'AM' ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.periodText,
                    { color: period === 'AM' ? colors.primary : colors.text },
                  ]}
                >
                  AM
                </Text>
              </Pressable>

              <Pressable
                onPress={() => handlePeriodToggle('PM')}
                style={[
                  styles.periodButton,
                  {
                    backgroundColor: period === 'PM' ? colors.surface : 'transparent',
                    borderColor: period === 'PM' ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.periodText,
                    { color: period === 'PM' ? colors.primary : colors.text },
                  ]}
                >
                  PM
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      <View style={styles.clockContainer}>
        <View style={[styles.clockFace, { backgroundColor: colors.clockFace }]}>
          {renderClockNumbers()}

          <View style={[styles.clockCenter, { backgroundColor: colors.primary }]} />

          <Animated.View
            style={[
              styles.clockHand,
              {
                height: 84,
                top: '50%',
                left: '50%',
                marginLeft: -1,
              },
              handStyle,
            ]}
          >
            <View
              style={[
                styles.clockHandLine,
                { height: '100%', backgroundColor: colors.primary },
              ]}
            />
            <View
              style={[styles.clockHandDot, { backgroundColor: colors.primary }]}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  )
}

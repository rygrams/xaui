import React, { forwardRef, useCallback, useMemo } from 'react'
import { TextInput as RNTextInput } from 'react-native'
import { TextInput } from './input'
import type {
  DateInputProps,
  TimeInputProps,
  DateTimeInputProps,
} from './date-time-input.type'
import {
  getDateOrder,
  getDatePlaceholder,
  getTimePlaceholder,
  getDateTimePlaceholder,
  getDateMaxLength,
  getTimeMaxLength,
  getDateTimeMaxLength,
  formatDateInput,
  formatTimeInput,
  formatDateTimeInput,
} from './date-time-input.hook'

export const DateInput = forwardRef<
  React.ElementRef<typeof RNTextInput>,
  DateInputProps
>(
  (
    {
      separator = '-',
      dateOrder,
      locale = 'en-US',
      placeholder,
      maxLength,
      onChangeText,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const resolvedOrder = useMemo(
      () => dateOrder ?? getDateOrder(locale),
      [dateOrder, locale]
    )

    const handleChangeText = useCallback(
      (text: string) => {
        const formatted = formatDateInput(text, resolvedOrder, separator)
        onChangeText?.(formatted)
        onValueChange?.(formatted)
      },
      [resolvedOrder, separator, onChangeText, onValueChange]
    )

    return (
      <TextInput
        ref={ref}
        placeholder={placeholder ?? getDatePlaceholder(resolvedOrder, separator)}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={maxLength ?? getDateMaxLength(separator)}
        onChangeText={handleChangeText}
        {...props}
      />
    )
  }
)

export const TimeInput = forwardRef<
  React.ElementRef<typeof RNTextInput>,
  TimeInputProps
>(
  (
    {
      granularity = 'minute',
      hourCycle = 24,
      placeholder,
      maxLength,
      onChangeText,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const handleChangeText = useCallback(
      (text: string) => {
        const formatted = formatTimeInput(text, granularity, hourCycle)
        onChangeText?.(formatted)
        onValueChange?.(formatted)
      },
      [granularity, hourCycle, onChangeText, onValueChange]
    )

    return (
      <TextInput
        ref={ref}
        placeholder={placeholder ?? getTimePlaceholder(granularity, hourCycle)}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={maxLength ?? getTimeMaxLength(granularity, hourCycle)}
        onChangeText={handleChangeText}
        {...props}
      />
    )
  }
)

export const DateTimeInput = forwardRef<
  React.ElementRef<typeof RNTextInput>,
  DateTimeInputProps
>(
  (
    {
      separator = '-',
      dateOrder,
      locale = 'en-US',
      granularity = 'minute',
      hourCycle = 24,
      placeholder,
      maxLength,
      onChangeText,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const resolvedOrder = useMemo(
      () => dateOrder ?? getDateOrder(locale),
      [dateOrder, locale]
    )

    const handleChangeText = useCallback(
      (text: string) => {
        const formatted = formatDateTimeInput(
          text,
          resolvedOrder,
          separator,
          granularity,
          hourCycle
        )
        onChangeText?.(formatted)
        onValueChange?.(formatted)
      },
      [resolvedOrder, separator, granularity, hourCycle, onChangeText, onValueChange]
    )

    return (
      <TextInput
        ref={ref}
        placeholder={
          placeholder ??
          getDateTimePlaceholder(resolvedOrder, separator, granularity, hourCycle)
        }
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={
          maxLength ?? getDateTimeMaxLength(separator, granularity, hourCycle)
        }
        onChangeText={handleChangeText}
        {...props}
      />
    )
  }
)

DateInput.displayName = 'DateInput'
TimeInput.displayName = 'TimeInput'
DateTimeInput.displayName = 'DateTimeInput'

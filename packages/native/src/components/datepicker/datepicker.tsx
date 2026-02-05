import React, { useCallback, useMemo, useRef } from 'react'
import { Text, View } from 'react-native'
import type { DatePickerProps } from './datepicker.type'
import {
  useDatePickerHelperColor,
  useDatePickerLabelStyle,
  useDatePickerRadiusStyles,
  useDatePickerSizeStyles,
  useDatePickerVariantStyles,
} from './datepicker.hook'
import { useDatePickerOpenState, useDatePickerState } from './datepicker.state.hook'
import { formatDate, getFirstDayOfWeek } from './datepicker.utils'
import { styles } from './datepicker.style'
import { useXUITheme } from '../../core'
import { DatePickerDialog } from '../dialogs/datepicker-dialog'
import { DatePickerTrigger } from './datepicker-trigger'

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  onChange,
  locale = 'en',
  minDate,
  maxDate,
  firstDayOfWeek: firstDayOfWeekProp,
  variant = 'flat',
  themeColor = 'default',
  size = 'md',
  radius = 'md',
  label,
  placeholder = 'Select a date',
  description,
  errorMessage,
  labelPlacement = 'outside',
  fullWidth = false,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isClearable = true,
  customAppearance,
  calendarIcon,
  onOpen,
  onClose,
  onOpenChange,
}) => {
  const theme = useXUITheme()

  const { selectedDate, updateDate } = useDatePickerState({
    value,
    defaultValue,
    onChange,
  })

  const { isOpen, setOpen } = useDatePickerOpenState({
    isDisabled: isDisabled || isReadOnly,
    onOpenChange,
    onOpen,
    onClose,
  })

  const triggerRef = useRef<View>(null)

  const handleTriggerLayout = useCallback(() => {}, [])

  const firstDayOfWeek = useMemo(
    () => firstDayOfWeekProp ?? getFirstDayOfWeek(locale),
    [firstDayOfWeekProp, locale]
  )

  const sizeStyles = useDatePickerSizeStyles(size)
  const radiusStyles = useDatePickerRadiusStyles(radius)
  const variantStyles = useDatePickerVariantStyles(themeColor, variant, isInvalid)
  const labelStyle = useDatePickerLabelStyle(
    themeColor,
    isInvalid,
    sizeStyles.labelSize
  )
  const helperColor = useDatePickerHelperColor(isInvalid)

  const displayValue = useMemo(() => {
    if (!selectedDate) return placeholder
    return formatDate(selectedDate, locale)
  }, [selectedDate, locale, placeholder])

  const handleTriggerPress = useCallback(() => {
    if (!isDisabled && !isReadOnly) {
      setOpen(true)
    }
  }, [isDisabled, isReadOnly, setOpen])

  const handleClear = useCallback(() => {
    if (isDisabled || isReadOnly) return
    updateDate(null)
  }, [isDisabled, isReadOnly, updateDate])

  const handleDateSelect = useCallback(
    (date: Date) => {
      updateDate(date)
    },
    [updateDate]
  )

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const isLabelInside = labelPlacement === 'inside'
  const isLabelOutsideLeft = labelPlacement === 'outside-left'
  const isLabelOutside =
    labelPlacement === 'outside' || labelPlacement === 'outside-top'

  const renderLabel = label ? (
    typeof label === 'string' || typeof label === 'number' ? (
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    ) : (
      <View>{label}</View>
    )
  ) : null

  const shouldShowHelper = Boolean(description || errorMessage)
  const helperContent = isInvalid && errorMessage ? errorMessage : description

  const triggerContent = (
    <DatePickerTrigger
      triggerRef={triggerRef}
      isDisabled={isDisabled || isReadOnly}
      hasValue={!!selectedDate}
      displayValue={displayValue}
      sizeStyles={sizeStyles}
      radiusStyles={radiusStyles}
      variantStyles={variantStyles}
      theme={theme}
      isClearable={isClearable}
      label={renderLabel}
      labelText={typeof label === 'string' ? label : undefined}
      isLabelInside={isLabelInside}
      calendarIcon={calendarIcon}
      style={customAppearance?.trigger}
      textStyle={customAppearance?.text}
      onPress={handleTriggerPress}
      onClear={handleClear}
      onLayout={handleTriggerLayout}
    />
  )

  const labelBlock = isLabelOutside || isLabelInside ? renderLabel : null

  return (
    <View
      style={[
        styles.container,
        fullWidth ? styles.fullWidth : styles.minWidth,
        customAppearance?.container,
      ]}
    >
      {isLabelOutside && labelBlock}
      {isLabelOutsideLeft ? (
        <View style={styles.outsideLeftRow}>
          {renderLabel}
          {triggerContent}
        </View>
      ) : (
        triggerContent
      )}
      {shouldShowHelper && helperContent ? (
        typeof helperContent === 'string' || typeof helperContent === 'number' ? (
          <Text style={[styles.helperText, { color: helperColor }]}>
            {helperContent}
          </Text>
        ) : (
          <View>{helperContent}</View>
        )
      ) : null}

      <DatePickerDialog
        visible={isOpen}
        selectedDate={selectedDate}
        locale={locale}
        firstDayOfWeek={firstDayOfWeek}
        themeColor={themeColor}
        minDate={minDate}
        maxDate={maxDate}
        style={customAppearance?.calendar}
        onDateSelect={handleDateSelect}
        onClose={handleClose}
      />
    </View>
  )
}

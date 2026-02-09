import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { useXUITheme } from '../../core'
import { RadioGroupContext } from './radio-context'
import type { RadioGroupProps } from './radio.type'
import { styles } from './radio.style'

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  value,
  defaultValue,
  onValueChange,
  isDisabled = false,
  themeColor = 'primary',
  variant = 'filled',
  size = 'md',
  radius = 'full',
  labelAlignment = 'right',
  fullWidth = false,
  orientation = 'vertical',
  gap,
  style,
}: RadioGroupProps) => {
  const theme = useXUITheme()
  const isControlled = typeof value === 'string'
  const [internalValue, setInternalValue] = useState(defaultValue)
  const selectedValue = isControlled ? value : internalValue

  const handleValueChange = (nextValue: string) => {
    if (nextValue === selectedValue) return

    if (!isControlled) {
      setInternalValue(nextValue)
    }

    onValueChange?.(nextValue)
  }

  const contextValue = useMemo(
    () => ({
      selectedValue,
      isDisabled,
      themeColor,
      variant,
      size,
      radius,
      labelAlignment,
      fullWidth,
      onValueChange: handleValueChange,
    }),
    [
      fullWidth,
      isDisabled,
      labelAlignment,
      radius,
      selectedValue,
      size,
      themeColor,
      variant,
    ]
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <View
        style={[
          styles.group,
          {
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
            gap: gap ?? theme.spacing.sm,
          },
          style,
        ]}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  )
}

import React from 'react'
import type { Radius, Size, ThemeColor } from '../../types'
import type { RadioLabelAlignment, RadioVariant } from './radio.type'

type RadioGroupContextValue = {
  selectedValue?: string
  isDisabled: boolean
  themeColor: ThemeColor
  variant: RadioVariant
  size: Size
  radius: Radius
  labelAlignment: RadioLabelAlignment
  fullWidth: boolean
  onValueChange?: (value: string) => void
}

export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null
)

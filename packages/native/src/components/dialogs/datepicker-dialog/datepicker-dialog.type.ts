import type { StyleProp, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../../types'

export type DatePickerDialogProps = {
  visible: boolean
  selectedDate: Date | null
  locale: string
  firstDayOfWeek: 0 | 1
  themeColor?: ThemeColor
  minDate?: Date
  maxDate?: Date
  style?: StyleProp<ViewStyle>
  confirmLabel?: string
  todayLabel?: string
  onDateSelect: (date: Date) => void
  onClose: () => void
}

import type { TextInputProps } from './input.type'

export type DateSeparator = '-' | '/' | '.'

export type DateOrder = 'YMD' | 'DMY' | 'MDY'

export type TimeInputGranularity = 'minute' | 'second'

export type DateInputProps = TextInputProps & {
  /**
   * Separator character between date segments.
   * @default '-'
   */
  separator?: DateSeparator
  /**
   * Date segment ordering.
   * Auto-detected from locale if not provided.
   */
  dateOrder?: DateOrder
  /**
   * Locale string used to auto-detect date order.
   * @default 'en-US'
   */
  locale?: string
}

export type TimeInputProps = TextInputProps & {
  /**
   * Smallest time unit shown in the placeholder.
   * @default 'minute'
   */
  granularity?: TimeInputGranularity
  /**
   * 12-hour or 24-hour format placeholder hint.
   * @default 24
   */
  hourCycle?: 12 | 24
}

export type DateTimeInputProps = TextInputProps & {
  /**
   * Separator character between date segments.
   * @default '-'
   */
  separator?: DateSeparator
  /**
   * Date segment ordering.
   * Auto-detected from locale if not provided.
   */
  dateOrder?: DateOrder
  /**
   * Locale string used to auto-detect date order.
   * @default 'en-US'
   */
  locale?: string
  /**
   * Smallest time unit shown in the placeholder.
   * @default 'minute'
   */
  granularity?: TimeInputGranularity
  /**
   * 12-hour or 24-hour format placeholder hint.
   * @default 24
   */
  hourCycle?: 12 | 24
}

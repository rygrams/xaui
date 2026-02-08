import type {
  DateOrder,
  DateSeparator,
  TimeInputGranularity,
} from './date-time-input.type'

const YMD_LOCALES = ['ja', 'zh', 'ko', 'hu', 'lt', 'mn']
const MDY_LOCALES = ['en-US', 'en-PH', 'en-BZ']

export const getDateOrder = (locale: string): DateOrder => {
  try {
    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    const parts = formatter.formatToParts(new Date(2000, 0, 2))
    const order = parts
      .filter(p => p.type === 'year' || p.type === 'month' || p.type === 'day')
      .map(p => p.type)

    if (order[0] === 'year') return 'YMD'
    if (order[0] === 'month') return 'MDY'
    return 'DMY'
  } catch {
    const lang = locale.split('-')[0]
    if (YMD_LOCALES.includes(locale) || YMD_LOCALES.includes(lang)) return 'YMD'
    if (MDY_LOCALES.includes(locale)) return 'MDY'
    return 'DMY'
  }
}

const insertAtPositions = (
  digits: string,
  positions: number[],
  char: string
): string => {
  let result = ''
  let digitIndex = 0

  for (let i = 0; i < positions.length; i++) {
    const segLen = positions[i]
    const segment = digits.slice(digitIndex, digitIndex + segLen)
    if (!segment) break
    if (i > 0) result += char
    result += segment
    digitIndex += segLen
  }

  return result
}

export const formatDateInput = (
  text: string,
  dateOrder: DateOrder,
  separator: DateSeparator
): string => {
  const digits = text.replace(/\D/g, '').slice(0, 8)
  const segments =
    dateOrder === 'YMD' ? [4, 2, 2] : [2, 2, 4]

  return insertAtPositions(digits, segments, separator)
}

export const formatTimeInput = (
  text: string,
  granularity: TimeInputGranularity,
  hourCycle: 12 | 24
): string => {
  const cleaned = text.replace(/[^0-9aApPmM ]/g, '')
  const digits = cleaned.replace(/\D/g, '')
  const maxDigits = granularity === 'second' ? 6 : 4
  const trimmed = digits.slice(0, maxDigits)
  const segments =
    granularity === 'second' ? [2, 2, 2] : [2, 2]
  let result = insertAtPositions(trimmed, segments, ':')

  if (hourCycle === 12 && trimmed.length >= 4) {
    const ampmMatch = cleaned.match(/[aApP][mM]?/i)
    if (ampmMatch) {
      const period = ampmMatch[0].toUpperCase().startsWith('P') ? 'PM' : 'AM'
      result += ' ' + period
    }
  }

  return result
}

export const formatDateTimeInput = (
  text: string,
  dateOrder: DateOrder,
  separator: DateSeparator,
  granularity: TimeInputGranularity,
  hourCycle: 12 | 24
): string => {
  const digits = text.replace(/[^0-9aApPmM]/g, '').replace(/[aApPmM]/g, '')
  const dateDigitCount = 8
  const timeDigitCount = granularity === 'second' ? 6 : 4
  const maxDigits = dateDigitCount + timeDigitCount
  const trimmed = digits.replace(/\D/g, '').slice(0, maxDigits)

  const datePart = trimmed.slice(0, dateDigitCount)
  const timePart = trimmed.slice(dateDigitCount)

  let result = formatDateInput(datePart, dateOrder, separator)

  if (timePart) {
    const timeSegments =
      granularity === 'second' ? [2, 2, 2] : [2, 2]
    result += ' ' + insertAtPositions(timePart, timeSegments, ':')

    if (hourCycle === 12 && timePart.length >= 4) {
      const ampmMatch = text.match(/[aApP][mM]?/i)
      if (ampmMatch) {
        const period = ampmMatch[0].toUpperCase().startsWith('P')
          ? 'PM'
          : 'AM'
        result += ' ' + period
      }
    }
  }

  return result
}

export const getDatePlaceholder = (
  dateOrder: DateOrder,
  separator: DateSeparator
): string => {
  const parts: Record<DateOrder, string[]> = {
    YMD: ['YYYY', 'MM', 'DD'],
    DMY: ['DD', 'MM', 'YYYY'],
    MDY: ['MM', 'DD', 'YYYY'],
  }
  return parts[dateOrder].join(separator)
}

export const getTimePlaceholder = (
  granularity: TimeInputGranularity,
  hourCycle: 12 | 24
): string => {
  const hour = hourCycle === 12 ? 'hh' : 'HH'
  const base = `${hour}:mm`
  const withSeconds = granularity === 'second' ? `${base}:ss` : base
  return hourCycle === 12 ? `${withSeconds} AM` : withSeconds
}

export const getDateTimePlaceholder = (
  dateOrder: DateOrder,
  separator: DateSeparator,
  granularity: TimeInputGranularity,
  hourCycle: 12 | 24
): string => {
  return `${getDatePlaceholder(dateOrder, separator)} ${getTimePlaceholder(granularity, hourCycle)}`
}

export const getDateMaxLength = (separator: DateSeparator): number => {
  return 8 + 2 * separator.length
}

export const getTimeMaxLength = (
  granularity: TimeInputGranularity,
  hourCycle: 12 | 24
): number => {
  const base = granularity === 'second' ? 8 : 5
  return hourCycle === 12 ? base + 3 : base
}

export const getDateTimeMaxLength = (
  separator: DateSeparator,
  granularity: TimeInputGranularity,
  hourCycle: 12 | 24
): number => {
  return getDateMaxLength(separator) + 1 + getTimeMaxLength(granularity, hourCycle)
}

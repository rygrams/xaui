export const getWeekdayNames = (locale: string, firstDayOfWeek: 0 | 1): string[] => {
  const baseDate = new Date(2024, 0, 1)
  const dayIndex = baseDate.getDay()
  const offset = firstDayOfWeek - dayIndex
  const days: string[] = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(2024, 0, 1 + offset + i)
    days.push(
      date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)
    )
  }

  return days
}

export const getMonthNames = (locale: string): string[] => {
  const months: string[] = []
  for (let i = 0; i < 12; i++) {
    const date = new Date(2024, i, 1)
    months.push(date.toLocaleDateString(locale, { month: 'long' }))
  }
  return months
}

export const getMonthName = (month: number, locale: string): string => {
  const date = new Date(2024, month, 1)
  return date.toLocaleDateString(locale, { month: 'long' })
}

export const formatDate = (date: Date, locale: string): string => {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const isSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date())
}

export const isDateInRange = (
  date: Date,
  minDate?: Date,
  maxDate?: Date
): boolean => {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  if (minDate) {
    const minNormalized = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate()
    )
    if (normalized < minNormalized) return false
  }
  if (maxDate) {
    const maxNormalized = new Date(
      maxDate.getFullYear(),
      maxDate.getMonth(),
      maxDate.getDate()
    )
    if (normalized > maxNormalized) return false
  }
  return true
}

type CalendarDay = {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  isDisabled: boolean
}

export const getCalendarDays = (
  year: number,
  month: number,
  firstDayOfWeek: 0 | 1,
  minDate?: Date,
  maxDate?: Date
): CalendarDay[] => {
  const firstOfMonth = new Date(year, month, 1)
  const lastOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastOfMonth.getDate()

  let startDayOfWeek = firstOfMonth.getDay() - firstDayOfWeek
  if (startDayOfWeek < 0) startDayOfWeek += 7

  const days: CalendarDay[] = []
  const prevMonth = new Date(year, month, 0)
  const prevMonthDays = prevMonth.getDate()

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthDays - i
    const date = new Date(year, month - 1, day)
    days.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: isToday(date),
      isDisabled: !isDateInRange(date, minDate, maxDate),
    })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    days.push({
      date,
      day,
      isCurrentMonth: true,
      isToday: isToday(date),
      isDisabled: !isDateInRange(date, minDate, maxDate),
    })
  }

  const remainingSlots = 42 - days.length
  for (let day = 1; day <= remainingSlots; day++) {
    const date = new Date(year, month + 1, day)
    days.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: isToday(date),
      isDisabled: !isDateInRange(date, minDate, maxDate),
    })
  }

  return days
}

export const getYearRange = (minDate?: Date, maxDate?: Date): number[] => {
  const currentYear = new Date().getFullYear()
  const startYear = minDate ? minDate.getFullYear() : currentYear - 50
  const endYear = maxDate ? maxDate.getFullYear() : currentYear + 50

  const years: number[] = []
  for (let year = startYear; year <= endYear; year++) {
    years.push(year)
  }
  return years
}

type DatePickerLabels = {
  selectDate: string
  today: string
  confirm: string
}

const LOCALE_LABELS: Record<string, DatePickerLabels> = {
  fr: { selectDate: 'Choisir une date', today: "Aujourd'hui", confirm: 'OK' },
  de: { selectDate: 'Datum auswählen', today: 'Heute', confirm: 'OK' },
  es: { selectDate: 'Seleccionar fecha', today: 'Hoy', confirm: 'OK' },
  it: { selectDate: 'Seleziona data', today: 'Oggi', confirm: 'OK' },
  pt: { selectDate: 'Selecionar data', today: 'Hoje', confirm: 'OK' },
  nl: { selectDate: 'Datum selecteren', today: 'Vandaag', confirm: 'OK' },
  pl: { selectDate: 'Wybierz datę', today: 'Dzisiaj', confirm: 'OK' },
  ru: { selectDate: 'Выберите дату', today: 'Сегодня', confirm: 'OK' },
  ja: { selectDate: '日付を選択', today: '今日', confirm: 'OK' },
  ko: { selectDate: '날짜 선택', today: '오늘', confirm: '확인' },
  zh: { selectDate: '选择日期', today: '今天', confirm: '确定' },
  ar: { selectDate: 'اختر التاريخ', today: 'اليوم', confirm: 'موافق' },
  tr: { selectDate: 'Tarih seçin', today: 'Bugün', confirm: 'Tamam' },
}

const DEFAULT_LABELS: DatePickerLabels = {
  selectDate: 'Select date',
  today: 'Today',
  confirm: 'OK',
}

export const getDatePickerLabels = (locale: string): DatePickerLabels => {
  const baseLocale = locale.split('-')[0].toLowerCase()
  return LOCALE_LABELS[baseLocale] ?? DEFAULT_LABELS
}

export const getFirstDayOfWeek = (locale: string): 0 | 1 => {
  const mondayLocales = [
    'fr', 'de', 'es', 'it', 'pt', 'nl', 'pl', 'ru', 'sv', 'da',
    'fi', 'nb', 'nn', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sl',
    'uk', 'tr', 'el', 'et', 'lt', 'lv',
  ]

  const baseLocale = locale.split('-')[0].toLowerCase()
  return mondayLocales.includes(baseLocale) ? 1 : 0
}

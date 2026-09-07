import { daysInMonth } from './dates'

/**
 * The four shapes `MaskField` ships ready-made. Anything else is a **pattern string** —
 * `#` a digit, `A` a letter, `*` either, every other character a literal put back in as the
 * parts fill.
 */
export type MaskFieldMask = 'date' | 'time' | 'datetime' | 'credit-card'

export const MASK_FIELD_MASKS = [
  'date',
  'time',
  'datetime',
  'credit-card',
] as const satisfies readonly MaskFieldMask[]

/**
 * Which of the three parts of a date comes first, and which second.
 *
 * Three orders rather than every permutation, because these are the three the world writes:
 * day-first across most of Europe, month-first in the United States, year-first in East
 * Asia and in ISO 8601.
 */
export type DateOrder = 'DMY' | 'MDY' | 'YMD'

/** What a placeholder calls each date part. The letters are a language's, so they are given. */
export type SegmentLabels = { day: string; month: string; year: string }

/** The class of input a fill position accepts. */
type Fill = 'digit' | 'letter' | 'alnum'

/**
 * One run of a resolved mask: a `fill` of positions that accept input, or a `literal` that
 * is typed back in once the parts before it have something in them.
 *
 * A completed fill may `clamp` — a month at 12, a day at the length of its month — reading
 * the parts already written to do it. A fill is never *raised*: a reader halfway through
 * `01` has typed a zero, and moving it under them loses the keystroke.
 */
type Part =
  | {
      kind: 'fill'
      fill: Fill
      width: number
      name: string
      clamp?: (raw: string, written: Record<string, string>) => string
    }
  | { kind: 'literal'; text: string }

/** A mask resolved to the parts a keystroke is walked through. */
export type Mask = {
  parts: readonly Part[]
  /** The shape shown when the box is empty — `DD/MM/YYYY`, `#### #### #### ####`. */
  placeholder: string
  /** The full rendered length, so the field can cap the caret at the end of the shape. */
  length: number
  /** `number-pad` when every fill is digits, `default` otherwise. */
  keyboard: 'number-pad' | 'default'
}

// ── The regexes each fill accepts, and the token each pattern character maps to ────────────

const ACCEPTS: Record<Fill, RegExp> = {
  digit: /[0-9]/,
  letter: /[A-Za-z]/,
  alnum: /[0-9A-Za-z]/,
}

const TOKENS: Record<string, Fill> = { '#': 'digit', A: 'letter', '*': 'alnum' }

// ── Date parts ───────────────────────────────────────────────────────────────────────────

type Segment = { part: 'day' | 'month' | 'year'; width: number }

const SEGMENTS: Record<DateOrder, ReadonlyArray<Segment>> = {
  DMY: [
    { part: 'day', width: 2 },
    { part: 'month', width: 2 },
    { part: 'year', width: 4 },
  ],
  MDY: [
    { part: 'month', width: 2 },
    { part: 'day', width: 2 },
    { part: 'year', width: 4 },
  ],
  YMD: [
    { part: 'year', width: 4 },
    { part: 'month', width: 2 },
    { part: 'day', width: 2 },
  ],
}

const DEFAULT_LABELS: SegmentLabels = { day: 'DD', month: 'MM', year: 'YYYY' }

/**
 * The order that locale writes a date in.
 *
 * Read out of `Intl` rather than off a table of countries: the platform already ships the
 * answer for every locale it supports, and a table here would be a second one, shorter and
 * out of date. A locale `Intl` does not know falls back to day-first, which is what most of
 * the world writes.
 */
export function dateOrderFor(locale: string): DateOrder {
  const parts = new Intl.DateTimeFormat(locale).formatToParts(new Date(2001, 1, 3))
  const order = parts
    .filter(
      part => part.type === 'day' || part.type === 'month' || part.type === 'year'
    )
    .map(part => part.type[0].toUpperCase())
    .join('')

  return order === 'MDY' || order === 'YMD' || order === 'DMY' ? order : 'DMY'
}

/**
 * The separator that locale writes between the date parts.
 *
 * The same argument as the order, and the same fallback. A locale that writes its date with
 * a word between the parts — some do — has no single separator, so anything that is not one
 * character comes back as a slash.
 */
export function dateSeparatorFor(locale: string): string {
  const literal = new Intl.DateTimeFormat(locale)
    .formatToParts(new Date(2001, 1, 3))
    .find(part => part.type === 'literal')?.value

  return literal?.length === 1 ? literal : '/'
}

/** A completed date part, held inside the range it can actually name. */
function clampDatePart(
  part: Segment['part'],
  raw: string,
  written: Record<string, string>
): string {
  const value = Number(raw)

  if (part === 'month') return value > 12 ? '12' : raw
  if (part === 'year') return raw

  // The month and the year may or may not have been typed yet — in `YMD` they always have,
  // in `DMY` they never have. 31 is the honest ceiling until they are known.
  const month = written.month === undefined ? undefined : Number(written.month)
  const year = written.year === undefined ? undefined : Number(written.year)
  const ceiling =
    month === undefined || month < 1 || month > 12
      ? 31
      : daysInMonth(year ?? 2000, month - 1)

  return value > ceiling ? pad(ceiling, 2) : raw
}

/** The date parts as a run of fills separated by `separator`, in `order`. */
function dateParts(order: DateOrder, separator: string): Part[] {
  const out: Part[] = []
  SEGMENTS[order].forEach((segment, index) => {
    if (index > 0) out.push({ kind: 'literal', text: separator })
    out.push({
      kind: 'fill',
      fill: 'digit',
      width: segment.width,
      name: segment.part,
      clamp: (raw, written) => clampDatePart(segment.part, raw, written),
    })
  })
  return out
}

/** `HH:MM`, 24-hour: an hour capped at 23 and a minute at 59, each as it completes. */
function timeParts(): Part[] {
  return [
    {
      kind: 'fill',
      fill: 'digit',
      width: 2,
      name: 'hours',
      clamp: raw => (Number(raw) > 23 ? '23' : raw),
    },
    { kind: 'literal', text: ':' },
    {
      kind: 'fill',
      fill: 'digit',
      width: 2,
      name: 'minutes',
      clamp: raw => (Number(raw) > 59 ? '59' : raw),
    },
  ]
}

// ── Pattern strings ──────────────────────────────────────────────────────────────────────

/**
 * A pattern string to its parts. Runs of the same token become one fill of that width;
 * everything else is a literal.
 *
 *     '#### #### #### ####'  →  fill(4) ' ' fill(4) ' ' fill(4) ' ' fill(4)
 *     '+33 # ## ## ## ##'    →  '+33 ' fill(1) ' ' fill(2) ' ' fill(2) ' ' fill(2) ' ' fill(2)
 */
function patternParts(pattern: string): Part[] {
  const out: Part[] = []
  let literal = ''
  let fill: Fill | null = null
  let width = 0

  const flushLiteral = () => {
    if (literal) out.push({ kind: 'literal', text: literal })
    literal = ''
  }
  const flushFill = () => {
    if (fill) out.push({ kind: 'fill', fill, width, name: `s${out.length}` })
    fill = null
    width = 0
  }

  for (const char of pattern) {
    const token = TOKENS[char]
    if (token) {
      flushLiteral()
      if (fill && fill !== token) flushFill()
      fill = token
      width += 1
    } else {
      flushFill()
      literal += char
    }
  }
  flushFill()
  flushLiteral()

  return out
}

// ── Resolution ───────────────────────────────────────────────────────────────────────────

export type ResolveMaskOptions = {
  /** The order and the separator come from here for `date` / `datetime` when neither is set. */
  locale?: string
  /** Give it when the order is a decision rather than a locale — an ISO field is `YMD`. */
  order?: DateOrder
  /** Between the date parts. Unset, it is the one the locale writes. */
  separator?: string
  /** What the placeholder calls each date part. */
  labels?: SegmentLabels
}

/**
 * A `mask` prop — a preset name or a pattern string — to the parts a keystroke walks.
 *
 * The presets carry rules a pattern cannot: `date` and `datetime` take their order and
 * separator from the locale, and `date`, `datetime` and `time` clamp their parts as they
 * complete. `credit-card` and any pattern are shape only.
 */
export function resolveMask(
  spec: MaskFieldMask | string,
  options: ResolveMaskOptions = {}
): Mask {
  const parts = partsFor(spec, options)
  return finalize(parts, spec, options)
}

function partsFor(spec: string, options: ResolveMaskOptions): Part[] {
  const locale = options.locale ?? 'en-US'
  const order = options.order ?? dateOrderFor(locale)
  const separator = options.separator ?? dateSeparatorFor(locale)

  if (spec === 'date') return dateParts(order, separator)
  if (spec === 'time') return timeParts()
  if (spec === 'datetime')
    return [
      ...dateParts(order, separator),
      { kind: 'literal', text: ' ' },
      ...timeParts(),
    ]
  if (spec === 'credit-card') return patternParts('#### #### #### ####')

  return patternParts(spec)
}

/** Fill in `placeholder`, `length` and `keyboard` from the parts. */
function finalize(parts: Part[], spec: string, options: ResolveMaskOptions): Mask {
  const labels = options.labels ?? DEFAULT_LABELS
  const isDate = spec === 'date' || spec === 'datetime'

  let placeholder = ''
  let length = 0
  let keyboard: Mask['keyboard'] = 'number-pad'

  for (const part of parts) {
    if (part.kind === 'literal') {
      placeholder += part.text
      length += part.text.length
      continue
    }
    length += part.width
    if (part.fill !== 'digit') keyboard = 'default'
    placeholder +=
      isDate && part.name in labels
        ? labels[part.name as keyof SegmentLabels]
        : part.fill === 'letter'
          ? 'A'.repeat(part.width)
          : part.fill === 'alnum'
            ? '*'.repeat(part.width)
            : hint(spec, part.name, part.width)
  }

  return { parts, placeholder, length, keyboard }
}

/** The letters a bare shape shows for its digit fills — `HH`, `MM`, or just `#`. */
function hint(spec: string, name: string, width: number): string {
  if (spec === 'time' || spec === 'datetime') {
    if (name === 'hours') return 'HH'
    if (name === 'minutes') return 'MM'
  }
  return '#'.repeat(width)
}

// ── Masking a keystroke ──────────────────────────────────────────────────────────────────

/**
 * What the reader typed, as this mask writes it.
 *
 * The input and the parts are walked in lockstep: a literal is **eaten** off the input when
 * it is already there and **put back** when it is not, and a fill takes the next characters
 * of its class, skipping anything that is not. That is what makes the field survive a paste,
 * a keyboard that offers its own punctuation, a backspace over a separator — and being run
 * over its own output, which a field re-rendered from a controlled `value` does on every
 * keystroke. `maskInput(maskInput(x))` is `maskInput(x)`.
 *
 * A fill is clamped only once it is full, and never raised.
 */
export function maskInput(input: string, mask: Mask): string {
  const written: Record<string, string> = {}
  const segments: Array<{ literal: string } | { value: string }> = []
  let at = 0

  for (const part of mask.parts) {
    if (part.kind === 'literal') {
      // Eat the literal if the input already carries it here; either way it may be put back
      // below, once we know a fill after it produced something.
      if (input.startsWith(part.text, at)) at += part.text.length
      segments.push({ literal: part.text })
      continue
    }

    const test = ACCEPTS[part.fill]
    let value = ''
    while (at < input.length && value.length < part.width) {
      const char = input[at++]
      if (test.test(char)) value += char
    }
    if (value === '') break

    const full = value.length === part.width
    if (full && part.clamp) value = part.clamp(value, written)
    written[part.name] = value
    segments.push({ value })
  }

  // A literal is written only when a fill after it has something — so a lone separator never
  // sits in an otherwise empty box, and a trailing one never hangs off a finished value.
  let out = ''
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if ('value' in segment) {
      out += segment.value
      continue
    }
    if (segments.slice(i + 1).some(later => 'value' in later)) out += segment.literal
  }
  return out
}

// ── Typed values, for the caller's `convert` ─────────────────────────────────────────────

/**
 * The `Date` a `date` mask's text is, or `null` while it is not one.
 *
 * `null` covers both "not finished" and "not a real day", and deliberately so: a caller
 * holding a `Date | null` needs no third state. A year is taken as written — `0023` is the
 * year 23, not 2023 — since guessing a century is the kind of help that is wrong once and
 * then silently wrong forever.
 */
export function parseMaskedDate(
  text: string,
  locale = 'en-US',
  order: DateOrder = dateOrderFor(locale)
): Date | null {
  const digits = text.replace(/\D/g, '')
  if (digits.length !== 8) return null

  const parts: Partial<Record<Segment['part'], number>> = {}
  let at = 0
  for (const segment of SEGMENTS[order]) {
    parts[segment.part] = Number(digits.slice(at, at + segment.width))
    at += segment.width
  }

  const { day = 0, month = 0, year = 0 } = parts
  if (month < 1 || month > 12) return null
  if (day < 1 || day > daysInMonth(year, month - 1)) return null

  const date = new Date(year, month - 1, day)
  // A two-digit year would otherwise land in the last century: `new Date(23, …)` is 1923.
  date.setFullYear(year)

  return date
}

/** A `Date` as a `date` mask writes it — the inverse of `parseMaskedDate`. */
export function formatMaskedDate(
  date: Date,
  locale = 'en-US',
  order: DateOrder = dateOrderFor(locale),
  separator: string = dateSeparatorFor(locale)
): string {
  const parts = {
    day: pad(date.getDate(), 2),
    month: pad(date.getMonth() + 1, 2),
    year: pad(date.getFullYear(), 4),
  }

  return SEGMENTS[order].map(segment => parts[segment.part]).join(separator)
}

/** The hours and minutes a `time` mask's text is, or `null` while it is not both. */
export function parseMaskedTime(
  text: string
): { hours: number; minutes: number } | null {
  const digits = text.replace(/\D/g, '')
  if (digits.length !== 4) return null

  const hours = Number(digits.slice(0, 2))
  const minutes = Number(digits.slice(2, 4))
  if (hours > 23 || minutes > 59) return null

  return { hours, minutes }
}

/** Hours and minutes as a `time` mask writes them — `09:05`. */
export function formatMaskedTime(time: { hours: number; minutes: number }): string {
  return `${pad(time.hours, 2)}:${pad(time.minutes, 2)}`
}

function pad(value: number, width: number): string {
  return String(value).padStart(width, '0')
}

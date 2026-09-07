/**
 * The three things a number in a control is made of: reading one out of what was typed,
 * writing one back, and moving one by a step. Shared by `NumberField`, which types it, and
 * `NumberStepper`, which only walks it.
 *
 * Pure, because none of the three can be seen in a screenshot. A number field that eats a
 * group separator, that turns `0.1 + 0.2` into `0.30000000000000004`, or that lets a
 * stepper run one press past its own ceiling needs a table of inputs and outputs — which
 * is what a test is.
 */

/** How far a value is allowed to travel. Either end may be absent. */
export type NumberBounds = { min?: number; max?: number }

/** What `en-US` writes, and what a locale that cannot be resolved falls back to. */
const DEFAULT_MARKS = { group: ',', decimal: '.' }

/** A sample with a group and a fraction in it, so both marks show up in the parts. */
const PROBE = 12345.6

/**
 * Which characters this locale separates a number's parts with.
 *
 * Read off `Intl` rather than tabulated: the group mark is a comma in `en-US`, a full stop
 * in `de-DE` and a **narrow no-break space** in `fr-FR`, and a table of those is a table
 * that goes stale. `Intl` is also the thing most likely to be missing — a Hermes build
 * compiled without ICU has no `NumberFormat` at all — so a failure falls back rather than
 * throwing out of a render.
 */
export function numberMarks(locale: string): { group: string; decimal: string } {
  try {
    const parts = new Intl.NumberFormat(locale).formatToParts(PROBE)

    return {
      group: parts.find(part => part.type === 'group')?.value ?? DEFAULT_MARKS.group,
      decimal:
        parts.find(part => part.type === 'decimal')?.value ?? DEFAULT_MARKS.decimal,
    }
  } catch {
    return DEFAULT_MARKS
  }
}

/**
 * The number a reader typed, or `null` while what they typed is not one yet.
 *
 * Everything that is not a digit, a sign or the decimal mark is **dropped rather than
 * rejected**: a field shows its value grouped, and the moment the caret goes back into it
 * the group separators are still there. Refusing them would make the first keystroke on an
 * existing value clear the box.
 *
 * A full stop passes as the decimal mark wherever the locale is not using it to group —
 * so `1.5` reads as one and a half in `fr-FR`, whose number pad offers a full stop, and
 * `1.234` still reads as a thousand-odd in `de-DE`, where it is the grouping.
 *
 * `null` and not `NaN`: "not a number yet" is the state a half-typed field is in for as
 * long as it takes to type a minus sign, and `NaN` is a value that propagates instead of a
 * state a caller can test.
 */
export function parseNumber(text: string, locale = 'en-US'): number | null {
  const { group, decimal } = numberMarks(locale)

  let digits = ''
  let isNegative = false
  let hasDecimal = false

  for (const char of text) {
    if (char >= '0' && char <= '9') {
      digits += char
      continue
    }

    // Only in front of the number, and only once: a minus in the middle of the digits is
    // a stray keystroke, not a second sign. U+2212 is the one a formatted value carries.
    if ((char === '-' || char === '−') && digits === '' && !isNegative) {
      isNegative = true
      continue
    }

    if (!hasDecimal && (char === decimal || (char === '.' && group !== '.'))) {
      digits += '.'
      hasDecimal = true
    }
  }

  // A lone sign, a lone separator, an empty box: all of them are "not yet".
  if (digits === '' || digits === '.') return null

  const value = Number(isNegative ? `-${digits}` : digits)

  return Number.isFinite(value) ? value : null
}

/**
 * The value as the field writes it out.
 *
 * `Intl` again, and the same fallback for the same reason: a locale that cannot be
 * resolved is not a reason for a field to stop rendering its own value.
 */
export function formatNumber(
  value: number,
  locale = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  try {
    return new Intl.NumberFormat(locale, options).format(value)
  } catch {
    return String(value)
  }
}

/** The value, brought back inside its bounds. An absent bound stops nothing. */
export function clampNumber(value: number, { min, max }: NumberBounds): number {
  const lifted = min !== undefined && value < min ? min : value

  return max !== undefined && lifted > max ? max : lifted
}

/**
 * One press of a stepper: the value moved by `step`, then clamped.
 *
 * **From an empty field the step starts at zero**, which is what puts the first press on
 * `min` when the range starts above it — `min={5}` and a step of one gives 5, not 6.
 *
 * A **negative `step` is the decrement**, rather than a direction argument beside it: the
 * two buttons differ by a sign and nothing else, and a `direction` parameter would be a
 * second way to say the same thing that the clamping then has to agree with.
 */
export function stepNumber(
  value: number | null,
  step: number,
  bounds: NumberBounds
): number {
  const base = value ?? 0

  return clampNumber(round(base + step, base, step), bounds)
}

/**
 * Whether that press would change anything — which is exactly when the button is live.
 *
 * Asked of the **result** rather than of the bound, because those two disagree on the last
 * press: a value of 9.5 under a ceiling of 10 cannot take a whole step, but it can still
 * reach the ceiling, and a button disabled there strands the reader half a step short.
 */
export function canStep(
  value: number | null,
  step: number,
  bounds: NumberBounds
): boolean {
  return stepNumber(value, step, bounds) !== value
}

/**
 * To the precision of the numbers that built the value — the `Slider`'s rounding, for the
 * `Slider`'s reason: floating point makes three steps of `0.1` into `0.30000000000000004`,
 * and a field reporting that is one whose value cannot be compared or displayed.
 *
 * **The value counts as much as the step.** A field sitting at `0.05` stepped by `0.1` has
 * two decimals of precision and not one; rounding to the step's alone would drop the value
 * onto `0.15` and quietly lose its hundredths.
 */
function round(next: number, value: number, step: number): number {
  const valuePlaces = decimalsOf(value)
  const stepPlaces = decimalsOf(step)
  // Either number written in exponent form: it has no decimal places to count, and
  // rounding to the other one's would delete the value rather than tidy it.
  if (valuePlaces === UNKNOWN || stepPlaces === UNKNOWN) return next

  const factor = 10 ** Math.max(valuePlaces, stepPlaces)

  return Math.round(next * factor) / factor
}

/** A number too small or too large to be written out has no places to count. */
const UNKNOWN = -1

function decimalsOf(value: number): number {
  const text = String(value)
  if (text.includes('e')) return UNKNOWN

  const dot = text.indexOf('.')

  return dot === -1 ? 0 : text.length - dot - 1
}

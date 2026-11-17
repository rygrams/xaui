import { placeOf } from './value-scale'

/**
 * How far `value` is between `min` and `max`, from 0 to 1.
 *
 * Every argument is a caller's number: one outside the range is held at its end, an empty
 * or inverted range reads as empty, and anything that is not a finite number as zero — a
 * fill of `NaN%` draws nothing, with no error anywhere.
 */
export function progressPlace(value: number, min: number, max: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max)) {
    return 0
  }

  return placeOf(value, { min, max, step: 0 })
}

/**
 * The progress as the text beside the bar — `'40 %'` in French, `'40%'` in English.
 *
 * A percentage is a share of the range, so it formats the place; anything else — a
 * currency, a unit, a count — is about the quantity, so it formats the value. Where
 * `Intl.NumberFormat` is missing, as on a Hermes built without ICU, it is the plain
 * number rather than an exception.
 */
export function progressText(
  place: number,
  value: number,
  options: Intl.NumberFormatOptions = { style: 'percent' }
): string {
  const isShare = options.style === 'percent'

  try {
    return new Intl.NumberFormat(undefined, options).format(isShare ? place : value)
  } catch {
    return isShare ? `${Math.round(place * 100)}%` : `${value}`
  }
}

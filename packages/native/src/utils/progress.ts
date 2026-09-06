/**
 * Where `value` sits between `min` and `max`, as a number from 0 to 1.
 *
 * Every argument is external input, so every argument is validated rather than trusted: a
 * `value` outside the range is clamped, a range that is empty or inverted reads as empty,
 * and anything that is not a finite number reads as zero. A progress bar drawn from `NaN`
 * is a fill of `NaN%` — which React Native accepts, and which draws nothing at all with no
 * error anywhere.
 */
export function progressFraction(value: number, min: number, max: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max))
    return 0
  // An inverted range is a caller's mistake rather than a request to run backwards, and
  // an empty one has no position in it to report.
  if (max <= min) return 0

  return Math.min(Math.max((value - min) / (max - min), 0), 1)
}

/**
 * The progress as the text beside the bar — `'40 %'` in French, `'40%'` in English.
 *
 * **Which number gets formatted follows the style.** A percentage is a share of the range,
 * so it formats the fraction; anything else — a currency, a unit, a plain count — is about
 * the quantity itself, so it formats the value. Formatting the fraction as euros would
 * report a 1 250 € goal as `0,63 €`, which is the bug this branch exists to prevent rather
 * than a convention worth explaining to a caller.
 *
 * `Intl` is what makes the locale difference, and it is also the thing most likely to be
 * missing: a Hermes build compiled without ICU has no `Intl.NumberFormat` at all. The
 * fallback is the same number with a plain percent sign rather than an exception, because a
 * locale that cannot be resolved is not a reason for a progress bar to stop rendering.
 */
export function formatProgress(
  fraction: number,
  value: number,
  options: Intl.NumberFormatOptions = { style: 'percent' }
): string {
  const subject = options.style === 'percent' ? fraction : value

  try {
    return new Intl.NumberFormat(undefined, options).format(subject)
  } catch {
    return options.style === 'percent'
      ? `${Math.round(fraction * 100)}%`
      : `${value}`
  }
}

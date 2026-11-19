/**
 * The pad a number field opens, guessed from its shape: a fractional `step`, or a format
 * that asks for decimals, needs a decimal point on the keyboard; anything else is a whole
 * number. Native's guess, written here because Native keeps it inside its root.
 *
 * A field that has to take a minus sign passes its own `keyboardType`: neither pad has one
 * on every platform.
 */
export function numberKeyboard(
  step: number,
  formatOptions?: Intl.NumberFormatOptions
): 'number-pad' | 'decimal-pad' {
  const hasFraction =
    !Number.isInteger(step) ||
    (formatOptions?.maximumFractionDigits ?? 0) > 0 ||
    (formatOptions?.minimumFractionDigits ?? 0) > 0

  return hasFraction ? 'decimal-pad' : 'number-pad'
}

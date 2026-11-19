import { channels } from '../../theme/on-accent'

/**
 * The decisions this component makes that are worth pinning down — which box shows what,
 * what survives a paste, how faint an empty line is. All pure, so they live here and are
 * tested; the component around them is verified on its demo screen.
 *
 * The first three restate Native's: they are private to Native's `input-otp` folder, and
 * Tram reads Native through its `system`, `theme` and root entrypoints only.
 */

/** What one box knows about itself. */
export type OTPSlotState = {
  index: number
  /** The character typed here, or `null` while the box is empty. */
  char: string | null
  /** The placeholder for this box, or `null` when a char or the caret takes the room. */
  placeholderChar: string | null
  /** The box the next character will land in. Only ever one, and only while focused. */
  isActive: boolean
  /** Active **and** empty: a caret over a character would sit on top of it. */
  isCaretVisible: boolean
}

export type BuildSlotsArgs = {
  value: string
  maxLength: number
  isFocused: boolean
  /** One character per box, or a single character repeated across all of them. */
  placeholder?: string
}

/**
 * The boxes, from the value. The active box is the one **after** the last character —
 * `value.length` — so a full code has none: there is nowhere left to type.
 */
export function buildSlots({
  value,
  maxLength,
  isFocused,
  placeholder,
}: BuildSlotsArgs): OTPSlotState[] {
  return Array.from({ length: maxLength }, (_, index) => {
    const char = value[index] ?? null
    const isActive = isFocused && index === value.length

    return {
      index,
      char,
      placeholderChar:
        char === null && !isActive ? placeholderFor(placeholder, index) : null,
      isActive,
      isCaretVisible: isActive && char === null,
    }
  })
}

function placeholderFor(
  placeholder: string | undefined,
  index: number
): string | null {
  if (!placeholder) return null
  return placeholder.length === 1 ? placeholder : (placeholder[index] ?? null)
}

/**
 * The code inside a pasted message — "Your code is 482913, it expires in 10 minutes".
 * A run of exactly `maxLength` digits with no digit on either side; `''` when there is
 * none, so a paste of unrelated text fills nothing.
 */
export function extractPastedCode(pasted: string, maxLength: number): string {
  const match = pasted.match(new RegExp(`(?<!\\d)(\\d{${maxLength}})(?!\\d)`))
  return match?.[1] ?? ''
}

/** Typing adds one character; anything longer arrived at once. */
export function isPaste(text: string, previous: string): boolean {
  return text.length > previous.length + 1
}

/** The pattern judges the **whole** value: a code's shape is not read one character at a time. */
function fits(code: string, pattern: RegExp | null): boolean {
  return !pattern || pattern.test(code)
}

/**
 * What the hidden input's new text becomes, or `null` to refuse it and keep `previous`.
 *
 * A keystroke is taken as typed, cut to `maxLength`; an empty value always passes, so
 * deleting the last character is never refused.
 *
 * A paste that already is a value the field accepts — `AB12` under the letters pattern,
 * or the rest of a code after what was typed — is taken as it is. Anything longer is a
 * message, searched for a run of digits; a message with no code in it is refused, so
 * what was typed so far stays.
 */
export function nextCode(
  text: string,
  previous: string,
  maxLength: number,
  pattern: RegExp | null
): string | null {
  if (!isPaste(text, previous)) {
    const typed = text.slice(0, maxLength)
    return typed.length === 0 || fits(typed, pattern) ? typed : null
  }

  if (text.length <= maxLength && fits(text, pattern)) return text

  const code = extractPastedCode(text, maxLength)
  return code.length > 0 && fits(code, pattern) ? code : null
}

/** The three patterns a one-time code is normally restricted to. */
export const OTP_DIGITS = '^\\d+$'
export const OTP_LETTERS = '^[a-zA-Z]+$'
export const OTP_ALPHANUMERIC = '^[a-zA-Z0-9]+$'

/**
 * `line` laid over `ground` at `share` opacity, as one opaque `#RRGGBB` — the line of an
 * empty box. A border takes one colour, and the colour engine mixes opaque values, so the
 * translucency is flattened here rather than drawn.
 */
export function faintLine(line: string, ground: string, share: number): string {
  const from = channels(ground)
  const to = channels(line)
  const digits = from.map((channel, index) =>
    Math.round((channel + (to[index] - channel) * share) * 255)
      .toString(16)
      .padStart(2, '0')
  )

  return `#${digits.join('').toUpperCase()}`
}

/**
 * The two decisions this component makes that are worth pinning down: which box shows
 * what, and what survives a paste. Both are pure string work, so they live here and are
 * tested — the component around them is verified by its demo screen like every other.
 */

/** What one box knows about itself. The slots read it; nothing else does. */
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
 * The boxes, from the value. One pass, no state: what a box shows is a function of the
 * value's length and where the caret is, and deriving it is what keeps a paste, a
 * backspace and a keystroke from each needing their own update path.
 *
 * The active box is the one **after** the last character — `value.length` — which is
 * also why a full value has no active box: there is nowhere left to type.
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
      // A box shows its placeholder only when it has neither a character nor the caret.
      placeholderChar:
        char === null && !isActive ? placeholderFor(placeholder, index) : null,
      isActive,
      isCaretVisible: isActive && char === null,
    }
  })
}

/** One character per box, or one character for every box. Anything else is ignored. */
function placeholderFor(
  placeholder: string | undefined,
  index: number
): string | null {
  if (!placeholder) return null
  return placeholder.length === 1 ? placeholder : (placeholder[index] ?? null)
}

/**
 * The code inside whatever the platform handed us on paste.
 *
 * A one-time code arrives surrounded by prose far more often than alone — "Your code is
 * 482913, it expires in 10 minutes" — and the naïve `slice(0, maxLength)` takes "Your c".
 * This looks for a run of exactly `maxLength` digits with no digit on either side, which
 * is what rules out the "10" in that sentence and the year in a date.
 *
 * Returns `''` when nothing matches, so a paste of unrelated text clears nothing and
 * fills nothing.
 */
export function extractPastedCode(pasted: string, maxLength: number): string {
  const match = pasted.match(new RegExp(`(?<!\\d)(\\d{${maxLength}})(?!\\d)`))
  return match?.[1] ?? ''
}

/**
 * Whether the platform gave us a paste rather than a keystroke.
 *
 * Typing adds one character; anything longer arrived at once. React Native reports both
 * through the same `onChangeText`, and there is no event that distinguishes them.
 */
export function isPaste(text: string, previous: string): boolean {
  return text.length > previous.length + 1
}

/** The three patterns a one-time code is normally restricted to. */
export const OTP_DIGITS = '^\\d+$'
export const OTP_LETTERS = '^[a-zA-Z]+$'
export const OTP_ALPHANUMERIC = '^[a-zA-Z0-9]+$'

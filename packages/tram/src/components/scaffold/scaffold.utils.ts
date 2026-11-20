import type { StatusBarStyle } from 'react-native'
import { isHex, onAccent } from '../../theme/on-accent'

/**
 * The status bar's ink on the bar it sits on: the text that reads on `ground`, as
 * `onAccent` decides it for any flat fill — light on black, dark on white, dark on lime.
 *
 * Native's bar follows the mode alone, which is right while the header is the page's
 * ground and wrong on an accent bar: a lime bar in the dark mode wants dark icons. A
 * ground written some other way than `#RGB` / `#RRGGBB` cannot be read here, so it keeps
 * the mode's ink, `fallback`.
 */
export function statusBarStyleOn(
  ground: unknown,
  fallback: StatusBarStyle
): StatusBarStyle {
  if (typeof ground !== 'string' || !isHex(ground)) return fallback

  return onAccent(ground) === '#FFFFFF' ? 'light-content' : 'dark-content'
}

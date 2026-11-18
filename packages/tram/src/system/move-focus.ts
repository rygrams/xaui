import { AccessibilityInfo, Platform } from 'react-native'
import type { View } from 'react-native'

/**
 * Moves the focus to a node: the keyboard's on the web, the screen reader's on a phone.
 * The panel takes it as it opens — a dialog's banner, a menu — and the trigger has it back
 * once it closed. In `system/` since its second use: the `Dialog` and the `Menu`.
 */
export function moveFocusTo(node: View | null) {
  if (!node) return

  if (Platform.OS === 'web') {
    ;(node as unknown as { focus?: () => void }).focus?.()
    return
  }

  AccessibilityInfo.sendAccessibilityEvent(node, 'focus')
}

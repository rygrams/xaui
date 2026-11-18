import { AccessibilityInfo, Platform } from 'react-native'
import type { View } from 'react-native'

/**
 * Moves the focus to a node: the keyboard's on the web, the screen reader's on a phone.
 *
 * In `system/` since its second use: the `Dialog`'s banner takes it as it opens and its
 * trigger has it back once it closed; the `JumpList` header the list lands on takes it
 * once the grid has gone.
 */
export function moveFocusTo(node: View | null) {
  if (!node) return

  if (Platform.OS === 'web') {
    ;(node as unknown as { focus?: () => void }).focus?.()
    return
  }

  AccessibilityInfo.sendAccessibilityEvent(node, 'focus')
}

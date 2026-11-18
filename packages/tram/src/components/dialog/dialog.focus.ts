import { AccessibilityInfo, Platform } from 'react-native'
import type { View } from 'react-native'

/**
 * Moves the focus to a node: the keyboard's on the web, the screen reader's on a phone.
 * The banner takes it as the dialog opens, and the trigger has it back once it closed.
 */
export function moveFocusTo(node: View | null) {
  if (!node) return

  if (Platform.OS === 'web') {
    ;(node as unknown as { focus?: () => void }).focus?.()
    return
  }

  AccessibilityInfo.sendAccessibilityEvent(node, 'focus')
}

import type { AccessibilityActionEvent, AccessibilityActionInfo } from 'react-native'
import type { PanoramaAdjust } from './panorama.type'

const ACTIONS: readonly AccessibilityActionInfo[] = [
  { name: 'increment' },
  { name: 'decrement' },
]

type CallerActions = {
  accessibilityActions?: readonly AccessibilityActionInfo[]
  onAccessibilityAction?: (event: AccessibilityActionEvent) => void
}

/**
 * The props that make a slot the screen reader's way through the sections: an
 * `adjustable` read as the section on screen, whose swipes up and down step to the next
 * or the previous one. The caller's own actions are kept, and its handler runs after ours.
 */
export function adjustableProps(adjust: PanoramaAdjust, caller: CallerActions) {
  return {
    accessible: true,
    accessibilityRole: 'adjustable' as const,
    accessibilityValue: { text: adjust.valueText },
    // The web reads the ARIA attribute and not the value object above.
    'aria-valuetext': adjust.valueText,
    accessibilityActions: [...ACTIONS, ...(caller.accessibilityActions ?? [])],
    onAccessibilityAction: (event: AccessibilityActionEvent) => {
      adjust.onAction(event)
      caller.onAccessibilityAction?.(event)
    },
  }
}

import { useEffect, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { AccessibilityInfo, Platform } from 'react-native'
import type { AccessibilityActionEvent } from 'react-native'
import { childrenToString } from '@xaui/native/system'
import { useToastContext } from './toast.context'
import type { ToastSpokenPart } from './toast.type'

/** The name of the custom action a screen reader lists to send the toast away. */
const DISMISS = 'dismiss'

/**
 * A text slot tells the toast what it reads — when its children are plain text — so the
 * toast can be announced the moment it arrives.
 */
export function useSpokenPart(part: ToastSpokenPart, children: ReactNode) {
  const { report } = useToastContext()
  const text = childrenToString(children)

  useEffect(() => {
    report(part, text)

    return () => report(part, null)
  }, [report, part, text])
}

/**
 * What a screen reader can do from a line of the toast: close it, by the name the host
 * gave, and — when the toast has an `onPress` — activate it. They sit on the text because
 * the toast itself is not one accessible element: its actions have to stay reachable.
 */
export function useSpokenActions() {
  const { dismiss, dismissLabel, activate } = useToastContext()

  return useMemo(() => {
    if (!dismissLabel && !activate) return undefined

    const accessibilityActions = [
      ...(activate ? [{ name: 'activate' }] : []),
      ...(dismissLabel ? [{ name: DISMISS, label: dismissLabel }] : []),
    ]
    const onAccessibilityAction = (event: AccessibilityActionEvent) => {
      if (event.nativeEvent.actionName === DISMISS) dismiss()
      else activate?.()
    }

    return { accessibilityActions, onAccessibilityAction }
  }, [dismiss, dismissLabel, activate])
}

/**
 * Says the toast aloud once, as it arrives. Android does it from the live region; iOS has
 * none, and is told. `read` is called at that moment, after the slots have reported.
 */
export function useAnnouncement(isHosted: boolean, read: () => string) {
  const latest = useRef(read)

  useEffect(() => {
    latest.current = read
  })

  useEffect(() => {
    if (!isHosted || Platform.OS !== 'ios') return

    const text = latest.current()
    if (text) AccessibilityInfo.announceForAccessibility(text)
  }, [isHosted])
}

import { forwardRef, useContext, useMemo } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { ToastDismissContext, ToastProvider } from './toast.context'
import { toastRecipe } from './toast.recipe'
import type { ToastProps } from './toast.type'

/**
 * One notice.
 *
 * ```tsx
 * toast({
 *   render: ({ dismiss }) => (
 *     <Toast variant="success">
 *       <Toast.Title>Enregistré</Toast.Title>
 *       <Toast.Actions>
 *         <Toast.Close asChild><Button size="sm">Fermer</Button></Toast.Close>
 *       </Toast.Actions>
 *     </Toast>
 *   ),
 * })
 * ```
 *
 * **It is presentational.** It does not know it is in a queue, when it will leave, or what
 * is stacked under it — the `ToastHost` owns all three. That split is what lets a toast be
 * written inline in a screen, or replaced wholesale by a caller's own card, without the
 * queue caring.
 *
 * `dismiss` reaches it through the host's context rather than through a prop, so a
 * `Toast.Close` two levels down needs nothing passed to it.
 */

export const Toast = forwardRef<View, ToastProps>(function Toast(
  { children, variant, radius, accessibilityRole = 'alert', style, ...props },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  // The host's, if there is one. A `Toast` written outside a host still renders — it is a
  // card — and its dismiss is honestly a no-op rather than a crash.
  const dismiss = useContext(ToastDismissContext) ?? NOOP

  const styles = toastRecipe.resolve({ theme, selection: { variant, radius } })

  const context = useMemo(
    () => ({
      rootStyle: styles.root,
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      actionsStyle: styles.actions,
      dismiss,
    }),
    [styles, dismiss]
  )

  return (
    <ToastProvider value={context}>
      <View
        ref={ref}
        accessibilityRole={accessibilityRole}
        // Announced when it arrives rather than when the reader reaches it — a toast that
        // waits its turn in the reading order has usually gone by the time it is read.
        accessibilityLiveRegion="polite"
        {...rest}
        style={[styles.root, styleProps, style]}
      >
        {children}
      </View>
    </ToastProvider>
  )
})

/** Stable, so a `Toast` outside a host does not rebuild its context every render. */
const NOOP = () => {}

Toast.displayName = 'XAUI.Toast.Root'

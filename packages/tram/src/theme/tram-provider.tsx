import { XAUIProvider } from '@xaui/native/theme'
import type { XAUIProviderProps } from '@xaui/native/theme'
import { tramTheme } from './create-tram-theme'
import { TramHapticsProvider } from './tram-haptics'
import type { TramHapticHandler } from './tram-haptics'

export type TramProviderProps = XAUIProviderProps & {
  /**
   * Called at each moment a control can be felt. Tram ships no haptic library; the app
   * wires its own, once:
   *
   * ```tsx
   * <TramProvider
   *   onHaptic={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
   * >
   * ```
   *
   * Unset, nothing vibrates. Pass a stable function — it is a context value.
   */
  onHaptic?: TramHapticHandler
}

/**
 * `XAUIProvider` with the Tram theme as its default — the same context, so a Native
 * component rendered under it is themed too, and `useXAUITheme` reads it unchanged.
 */
export function TramProvider({
  theme = tramTheme,
  onHaptic,
  ...props
}: TramProviderProps) {
  const provider = <XAUIProvider theme={theme} {...props} />

  // No provider when there is no handler: a nested `TramProvider` that only re-themes
  // keeps the handler of the one above it.
  if (!onHaptic) return provider

  return <TramHapticsProvider value={onHaptic}>{provider}</TramHapticsProvider>
}

import { useMemo, useRef } from 'react'
import type { ReactElement } from 'react'
import { XAUIProvider } from '@xaui/native/theme'
import type { XAUIProviderProps } from '@xaui/native/theme'
import { tramTheme } from './create-tram-theme'
import { TramHapticsProvider } from './tram-haptics'
import type { TramHapticHandler } from './tram-haptics'
import { TramPagesProvider, resolveTramPages } from './tram-pages'
import type { TramPageLeave, TramPagesConfig } from './tram-pages'

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
  /**
   * How the app's pages leave and arrive — the Metro turnstile by default — and the
   * navigator's focus hook. Tram ships no navigation library; the app hands over its own,
   * once, above the navigator:
   *
   * ```tsx
   * import { Stack, useIsFocused } from 'expo-router'
   *
   * <TramProvider pages={{ useIsFocused }}>
   *   <Stack screenOptions={pageScreenOptions} />
   * </TramProvider>
   * ```
   *
   * Each screen then draws itself in a `Page` (`@xaui/tram/page`).
   */
  pages?: TramPagesConfig
}

/**
 * `XAUIProvider` with the Tram theme as its default — the same context, so a Native
 * component rendered under it is themed too, and `useXAUITheme` reads it unchanged.
 */
export function TramProvider({
  theme = tramTheme,
  onHaptic,
  pages,
  ...props
}: TramProviderProps) {
  const focused = useRef<TramPageLeave | null>(null)
  const transition = pages?.transition
  const useIsFocused = pages?.useIsFocused
  const wired = useMemo(
    () => resolveTramPages({ transition, useIsFocused }, focused),
    [transition, useIsFocused]
  )

  let provider: ReactElement = <XAUIProvider theme={theme} {...props} />

  // No provider for what was not given: a nested `TramProvider` that only re-themes keeps
  // the handler, and the pages, of the one above it.
  if (pages)
    provider = <TramPagesProvider value={wired}>{provider}</TramPagesProvider>
  if (onHaptic) {
    provider = <TramHapticsProvider value={onHaptic}>{provider}</TramHapticsProvider>
  }

  return provider
}

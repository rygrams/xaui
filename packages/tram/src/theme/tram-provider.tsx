import { useMemo, useRef } from 'react'
import type { ReactElement } from 'react'
import { XAUIProvider } from '@xaui/native/theme'
import type { XAUIProviderProps } from '@xaui/native/theme'
import { tramTheme } from './create-tram-theme'
import { TramHapticsProvider } from './tram-haptics'
import type { TramHapticHandler } from './tram-haptics'
import { TramPagesProvider, resolveTramPages } from './tram-pages'
import type { TramPageLeave, TramPageStage, TramPagesConfig } from './tram-pages'
import { TramSafeAreaProvider } from './tram-safe-area'
import type { TramSafeAreaConfig } from './tram-safe-area'

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
   *   <Stack>
   *     <Stack.Screen name="mail" options={pageScreenOptions} />
   *   </Stack>
   * </TramProvider>
   * ```
   *
   * Each such screen then draws itself in a `Page` (`@xaui/tram/page`). The navigator's
   * own animation is turned off on those screens only: a screen that is not a `Page` keeps
   * it, or it would arrive with no motion at all.
   */
  pages?: TramPagesConfig
  /**
   * The app's safe-area hook. Tram ships no safe-area library; the app hands over its
   * own, once, so a control docked on an edge — the `Fab`'s bar — reaches under the home
   * indicator by itself:
   *
   * ```tsx
   * import { useSafeAreaInsets } from 'react-native-safe-area-context'
   *
   * <TramProvider safeArea={{ useSafeAreaInsets }}>
   * ```
   */
  safeArea?: TramSafeAreaConfig
}

/**
 * `XAUIProvider` with the Tram theme as its default — the same context, so a Native
 * component rendered under it is themed too, and `useXAUITheme` reads it unchanged.
 */
export function TramProvider({
  theme = tramTheme,
  onHaptic,
  pages,
  safeArea,
  ...props
}: TramProviderProps) {
  const focused = useRef<TramPageLeave | null>(null)
  const stage = useRef<TramPageStage | null>(null)
  const transition = pages?.transition
  const useIsFocused = pages?.useIsFocused
  const wired = useMemo(
    () => resolveTramPages({ transition, useIsFocused }, focused, stage),
    [transition, useIsFocused]
  )

  let provider: ReactElement = <XAUIProvider theme={theme} {...props} />

  // No provider for what was not given: a nested `TramProvider` that only re-themes keeps
  // the handler, the pages and the safe area of the one above it.
  if (safeArea?.useSafeAreaInsets) {
    provider = (
      <TramSafeAreaProvider value={safeArea.useSafeAreaInsets}>
        {provider}
      </TramSafeAreaProvider>
    )
  }
  if (pages)
    provider = <TramPagesProvider value={wired}>{provider}</TramPagesProvider>
  if (onHaptic) {
    provider = <TramHapticsProvider value={onHaptic}>{provider}</TramHapticsProvider>
  }

  return provider
}

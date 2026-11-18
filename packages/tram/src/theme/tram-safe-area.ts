import { createContext, useContext } from 'react'

/**
 * The insets of the screen's safe area Tram reads, in points: the notch and the home
 * indicator. A hook that returns all four sides — `react-native-safe-area-context`'s —
 * fits as it is.
 */
export type TramInsets = { top: number; bottom: number }

export type TramSafeAreaConfig = {
  /**
   * The app's own safe-area hook, handed over once. Tram depends on no safe-area library,
   * so this is how a control docked on an edge — the `Fab`'s bar — learns how far the home
   * indicator or the navigation bar reaches into it:
   *
   * ```tsx
   * import { useSafeAreaInsets } from 'react-native-safe-area-context'
   *
   * <TramProvider safeArea={{ useSafeAreaInsets }}>
   * ```
   *
   * Without it every inset is 0. Pass the hook itself, always the same one.
   */
  useSafeAreaInsets?: () => TramInsets
}

const NO_INSETS: TramInsets = { top: 0, bottom: 0 }

function noInsets(): TramInsets {
  return NO_INSETS
}

const TramSafeAreaContext = createContext<() => TramInsets>(noInsets)

export const TramSafeAreaProvider = TramSafeAreaContext.Provider

/** The insets of the safe area, from the hook the app handed `TramProvider`; 0 without. */
export function useTramSafeArea(): TramInsets {
  const useInsets = useContext(TramSafeAreaContext)

  return useInsets()
}

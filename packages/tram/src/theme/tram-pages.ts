import { createContext, useContext } from 'react'

/**
 * How a `Page` leaves and arrives.
 *
 * | Transition  | Drawn as                                                    |
 * | ----------- | ----------------------------------------------------------- |
 * | `turnstile` | the page turns around the screen's start edge, like a door  |
 * | `slide`     | the page comes in from the end side, and fades              |
 * | `fade`      | the page fades — what the other two become, motion reduced  |
 * | `none`      | the page is there or it is not                              |
 */
export type TramPageTransition = 'turnstile' | 'slide' | 'fade' | 'none'

/** `forward` goes deeper into the app; `backward` returns from where it came. */
export type TramPageDirection = 'forward' | 'backward'

/** Plays the focused page's way out, then calls `go` — the navigation itself. */
export type TramPageLeave = (go: () => void, direction?: TramPageDirection) => void

export type TramPagesConfig = {
  /** @default 'turnstile' */
  transition?: TramPageTransition
  /**
   * The navigator's own focus hook, handed over once. Tram depends on no navigation
   * library, so this is how a `Page` learns that it was covered or uncovered:
   *
   * ```tsx
   * import { useIsFocused } from 'expo-router' // or '@react-navigation/native'
   *
   * <TramProvider pages={{ useIsFocused }}>
   * ```
   *
   * Without it a page still arrives, but has no way out and no way back to play: it
   * would never know it is on screen again. Pass the hook itself, always the same one.
   */
  useIsFocused?: () => boolean
}

export type TramPages = {
  transition: TramPageTransition
  useIsFocused: () => boolean
  /** Whether the app handed its focus hook over — without it nothing leaves. */
  hasFocus: boolean
  /** The focused page's way out, written by that page and read by `usePageLeave`. */
  focused: { current: TramPageLeave | null }
}

function alwaysFocused(): boolean {
  return true
}

export const DEFAULT_PAGE_TRANSITION: TramPageTransition = 'turnstile'

/** What a `Page` reads with no `pages` on any `TramProvider` above it. */
const UNWIRED: TramPages = {
  transition: DEFAULT_PAGE_TRANSITION,
  useIsFocused: alwaysFocused,
  hasFocus: false,
  focused: { current: null },
}

/** The provider's `pages` prop, completed — one object per provider, made once. */
export function resolveTramPages(
  config: TramPagesConfig,
  focused: TramPages['focused']
): TramPages {
  return {
    transition: config.transition ?? DEFAULT_PAGE_TRANSITION,
    useIsFocused: config.useIsFocused ?? alwaysFocused,
    hasFocus: config.useIsFocused !== undefined,
    focused,
  }
}

const TramPagesContext = createContext<TramPages>(UNWIRED)

export const TramPagesProvider = TramPagesContext.Provider

export function useTramPages(): TramPages {
  return useContext(TramPagesContext)
}

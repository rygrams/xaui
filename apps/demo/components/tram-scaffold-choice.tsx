import { createContext, useContext } from 'react'
import type { ScaffoldVariant } from '@xaui/tram/scaffold'
import type { TramAccentName } from '@xaui/tram/theme'

/**
 * How the Tram section's own `Scaffold` is dressed. The layout holds it, because the
 * scaffold is the layout's; the `scaffold` screen sets it, so the bar it is verified on is
 * the real header over every Tram screen.
 */
export type TramScaffoldChoice = {
  variant: ScaffoldVariant
  accent: TramAccentName | undefined
  setVariant: (variant: ScaffoldVariant) => void
  setAccent: (accent: TramAccentName | undefined) => void
}

const TramScaffoldChoiceContext = createContext<TramScaffoldChoice | null>(null)

export const TramScaffoldChoiceProvider = TramScaffoldChoiceContext.Provider

export function useTramScaffoldChoice(): TramScaffoldChoice {
  const choice = useContext(TramScaffoldChoiceContext)

  if (!choice) {
    throw new Error('useTramScaffoldChoice: render under the Tram layout.')
  }

  return choice
}

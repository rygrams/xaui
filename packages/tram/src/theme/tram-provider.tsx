import { XAUIProvider } from '@xaui/native/theme'
import type { XAUIProviderProps } from '@xaui/native/theme'
import { tramTheme } from './create-tram-theme'

export type TramProviderProps = XAUIProviderProps

/**
 * `XAUIProvider` with the Tram theme as its default — the same context, so a Native
 * component rendered under it is themed too, and `useXAUITheme` reads it unchanged.
 */
export function TramProvider({ theme = tramTheme, ...props }: TramProviderProps) {
  return <XAUIProvider theme={theme} {...props} />
}

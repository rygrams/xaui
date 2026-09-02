import { XAUIProvider } from '@xaui/native/theme'
import type { XAUIProviderProps } from '@xaui/native/theme'
import { PortalHost } from './portal'

export type XUIProviderProps = XAUIProviderProps

/**
 * @deprecated Use `XAUIProvider` from `@xaui/native` directly. This is the same provider —
 * legacy holds no theme of its own — kept only so an app can change its import scope in
 * one step and its provider in the next.
 *
 * It is **not** prop-compatible with the v0 `XUIProvider`: `theme` now takes the set
 * returned by `createTheme`, not a `DeepPartial<XUITheme>`. TypeScript flags the old
 * shape at the call site.
 */
export function XUIProvider({ children, ...props }: XUIProviderProps) {
  return (
    <XAUIProvider {...props}>
      <PortalHost>{children}</PortalHost>
    </XAUIProvider>
  )
}

import { Platform } from 'react-native'
import type { ViewStyle } from 'react-native'

/**
 * No focus ring from the browser. It draws one whatever the outline's width: only `none`
 * removes it, and `none` is the browser's word, not React Native's — so it is written for
 * the web alone.
 *
 * Shared by the circles of the `Fab` and the `AppBar`, where a ring is a second shape
 * around the one Tram draws. The `CloseButton` keeps the ring: it is a way out, and a
 * keyboard user has to see it selected.
 */
export const NO_RING = (
  Platform.OS === 'web' ? { outlineStyle: 'none' } : {}
) as ViewStyle

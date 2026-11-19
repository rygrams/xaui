import { Platform } from 'react-native'
import type { ViewStyle } from 'react-native'

/**
 * No focus ring from the browser. It draws one whatever the outline's width: only `none`
 * removes it, and `none` is the browser's word, not React Native's — so it is written for
 * the web alone.
 *
 * In `system/` since its third use: the circles of the `Fab`, the `AppBar` and the
 * `CloseButton`, where a ring is a second shape around the one Tram draws.
 */
export const NO_RING = (
  Platform.OS === 'web' ? { outlineStyle: 'none' } : {}
) as ViewStyle

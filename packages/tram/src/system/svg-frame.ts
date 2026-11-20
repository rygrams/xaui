import { Platform } from 'react-native'
import type { ViewStyle } from 'react-native'

/**
 * The frame of a box whose children are placed over an SVG figure: left to right, always.
 *
 * SVG coordinates do not mirror, so labels positioned with `start` beside a chart would
 * flip under an RTL layout and land on the wrong marks. Yoga's `direction: 'ltr'` keeps
 * them in the figure's own frame on iOS and Android. React Native Web rejects the key
 * (`direction` is not one of its style properties) and lays out from the document's
 * `dir`, so on the web the box is left as it is.
 */
export const SVG_FRAME: ViewStyle = Platform.OS === 'web' ? {} : { direction: 'ltr' }

import type { TextStyle } from 'react-native'
import type { TramFontWeight } from '../../theme/tram-tokens'

export type Face = {
  fontFamily: string
  fontWeight: NonNullable<TextStyle['fontWeight']>
}

/**
 * What a weight adds to the family's name to name its face — `Selawik-Light`,
 * `Selawik-Semilight`, and `Selawik` alone for Regular. They are the names the app
 * registers the font files under; this package ships none of them.
 */
const FACE_SUFFIX: Record<TramFontWeight, string> = {
  light: '-Light',
  semilight: '-Semilight',
  regular: '',
}

/**
 * The weight sent along with the face. A face is one weight already, so this only matters
 * when the face is not installed: the system font then draws the nearest weight it has.
 * SemiLight is 350, which `fontWeight` cannot say, so it falls to 300 with Light.
 */
const NEAREST_WEIGHT: Record<TramFontWeight, Face['fontWeight']> = {
  light: '300',
  semilight: '300',
  regular: '400',
}

/**
 * A Tram weight is a name, and a name is a face: `faceFor('Selawik', 'semilight')` is
 * `Selawik-Semilight`. The family is the theme's, so an app that swaps Selawik for
 * another font gets `<its family>-Light` by the same rule.
 */
export function faceFor(family: string, weight: TramFontWeight): Face {
  return {
    fontFamily: `${family}${FACE_SUFFIX[weight]}`,
    fontWeight: NEAREST_WEIGHT[weight],
  }
}

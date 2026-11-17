import type { TextStyle } from 'react-native'
import type { XAUITheme } from '@xaui/native/theme'
import { tramType } from '../../theme/tram-tokens'
import type { TramTypeRole } from '../../theme/tram-tokens'
import { faceFor } from './typography.face'
import type { Face } from './typography.face'

export type RoleType = Face & { fontSize: NonNullable<TextStyle['fontSize']> }

/**
 * A role of the Tram scale as a text style: its size, and the face its weight names.
 *
 * A title is set in the heading family and running text in the body one. Both are Selawik
 * in `tramTheme`; the split is for the app that pairs two fonts. No `lineHeight`: the
 * scale fixes none.
 */
export function roleType(role: TramTypeRole, theme: XAUITheme): RoleType {
  const { fontSize, weight } = tramType[role]
  const family = weight === 'regular' ? 'body' : 'heading'

  return { fontSize, ...faceFor(theme.fontFamilies[family], weight) }
}

import { StyleSheet } from 'react-native'
import { NO_RING } from '../../system/no-ring'

/** What does not depend on the theme: the circle's edge and the cross's two bars. */
export const closeButtonSheet = StyleSheet.create({
  /** An exact circle: no outline and no ring from the platform, on touch or on focus. */
  bare: { outlineWidth: 0, ...NO_RING },
  bar: { transform: [{ rotate: '45deg' }] },
  barMirrored: { transform: [{ rotate: '-45deg' }] },
})

import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { FabProvider } from './fab.context'
import { FabSpinner } from './fab-spinner'
import { fabSheet } from './fab.style'
import type { FabContextValue } from './fab.type'

export type FabFaceProps = {
  /** What the slots drawn on this face read — the ink above all. */
  value: FabContextValue
  glyph: ReactNode
  /** The caller's own `Fab.Spinner`, or nothing for the default one. */
  spinner: ReactNode
  hasSpinner: boolean
  glyphStyle: StyleProp<ViewStyle>
  spinnerStyle: StyleProp<ViewStyle>
}

/**
 * What is drawn on the circle, in one ink: the glyph, and over it the busy ring that takes
 * its place. The root draws one face, or two while the ink changes — the same glyph in the
 * ink it had, fading out over the new one.
 *
 * Not a slot: it is how the root lays out the ones it was given.
 */
export function FabFace({
  value,
  glyph,
  spinner,
  hasSpinner,
  glyphStyle,
  spinnerStyle,
}: FabFaceProps) {
  return (
    <FabProvider value={value}>
      <Animated.View style={[fabSheet.layer, glyphStyle]}>{glyph}</Animated.View>
      {hasSpinner ? (
        <Animated.View style={[fabSheet.layer, spinnerStyle]}>
          {spinner ?? <FabSpinner />}
        </Animated.View>
      ) : null}
    </FabProvider>
  )
}

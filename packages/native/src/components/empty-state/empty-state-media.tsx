import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext } from '../../system/icon'
import { useStyleProps } from '../../system/style-props'
import { useEmptyState } from './empty-state.context'
import type { EmptyStateMediaProps } from './empty-state.type'

/**
 * The picture above the words — an illustration, an avatar, a glyph.
 *
 * **`variant="icon"` puts it in a circle**, and that is not decoration: a 24-point mark alone
 * in the middle of a screen reads as an image that failed to load. The circle gives it a
 * size, and the muted fill says it is a mark rather than a photograph.
 *
 * **`plain` is the default**, because an avatar or an illustration brings its own shape and a
 * circle behind it would be a second one.
 *
 * Either way it publishes the glyph's size and colour through `IconContext`, so an `Icon`
 * inside takes them without being told.
 */
export const EmptyStateMedia = forwardRef<View, EmptyStateMediaProps>(
  function EmptyStateMedia({ children, variant = 'plain', style, ...props }, ref) {
    const { mediaStyle, mediaIconStyle, icon } = useEmptyState()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <IconContext.Provider value={icon}>
        <View
          ref={ref}
          {...rest}
          style={[
            mediaStyle,
            variant === 'icon' ? mediaIconStyle : null,
            styleProps,
            style,
          ]}
        >
          {children}
        </View>
      </IconContext.Provider>
    )
  }
)

EmptyStateMedia.displayName = 'XAUI.EmptyState.Media'

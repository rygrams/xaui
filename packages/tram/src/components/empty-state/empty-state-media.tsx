import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext, useStyleProps } from '@xaui/native/system'
import { useEmptyState } from './empty-state.context'
import type { EmptyStateMediaProps } from './empty-state.type'

/**
 * The picture above the words.
 *
 * `variant="icon"` puts the glyph on a square of the accent — a small tile, the Metro
 * list's thumbnail — and hands it the ink that reads on it. `plain`, the default, renders
 * an avatar or an illustration as it is, and a bare glyph in the page's `muted`.
 *
 * Either way the glyph's size and colour come through `IconContext`, so an `Icon` inside
 * takes them without being told.
 */
export const EmptyStateMedia = forwardRef<View, EmptyStateMediaProps>(
  function EmptyStateMedia({ children, variant = 'plain', style, ...props }, ref) {
    const { mediaStyle, mediaIconStyle, icon, plainIcon } = useEmptyState()
    const [styleProps, rest] = useStyleProps(props)
    const isSquare = variant === 'icon'

    return (
      <IconContext.Provider value={isSquare ? icon : plainIcon}>
        <View
          ref={ref}
          {...rest}
          style={[mediaStyle, isSquare ? mediaIconStyle : null, styleProps, style]}
        >
          {children}
        </View>
      </IconContext.Provider>
    )
  }
)

EmptyStateMedia.displayName = 'XAUI.Tram.EmptyState.Media'

import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { emptyStateGlyph, emptyStateRecipe } from './empty-state.recipe'
import { EmptyStateProvider } from './empty-state.context'
import type { EmptyStateProps } from './empty-state.type'

/**
 * What is on the screen when there is nothing on the screen.
 *
 * ```tsx
 * <EmptyState>
 *   <EmptyState.Header>
 *     <EmptyState.Media variant="icon">
 *       <Icon as={InboxIcon} />
 *     </EmptyState.Media>
 *     <EmptyState.Title>Aucun message</EmptyState.Title>
 *     <EmptyState.Description>
 *       Ce qu’on vous envoie arrivera ici.
 *     </EmptyState.Description>
 *   </EmptyState.Header>
 *
 *   <EmptyState.Content>
 *     <Button>Écrire un message</Button>
 *   </EmptyState.Content>
 * </EmptyState>
 * ```
 *
 * **The header and the content are two roots, not one column.** The gap between a mark, a
 * title and a sentence is a different gap from the one between that block and the buttons
 * under it, and R4 puts layout on a root — so two gaps need two roots. It is also what lets
 * an empty state with no action leave `EmptyState.Content` out entirely rather than render
 * an empty row with a gap above it.
 *
 * **`plain` is the default**, and it draws nothing: most empty states fill a screen, and a
 * screen already has a ground. `outlined` is the one that is not a fill — a dashed edge round
 * the space the content would occupy, which is what a drop target and an empty column want.
 *
 * The words are never tinted. An empty state's text is the page's own ink, and `color` lands
 * on the icon's circle and the outline — tinting the sentence would make the quietest thing
 * on the screen the loudest.
 */
export const EmptyStateRoot = forwardRef<View, EmptyStateProps>(function EmptyState(
  {
    children,
    variant,
    size = 'md',
    radius,
    color,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const selection = { variant, size, radius }
  const styles = emptyStateRecipe.resolve({ theme, selection })
  const tint = color ? emptyStateRecipe.tint({ theme, color, selection }) : undefined

  const context = useMemo(() => {
    // A mark in a plain circle is decoration for the words beside it, so it takes the
    // theme's muted ink; on a tinted circle it takes the tint's own contrast colour, which
    // is what `fgSelected` names in the recipe.
    const glyph = StyleSheet.flatten<TextStyle>([
      styles.mediaGlyph,
      tint?.mediaGlyph,
    ])

    return {
      headerStyle: styles.header,
      mediaStyle: styles.media,
      mediaIconStyle: [styles.mediaIcon, tint?.mediaIcon],
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      contentStyle: styles.content,
      icon: {
        size: emptyStateGlyph(size),
        color: typeof glyph.color === 'string' ? glyph.color : theme.colors.muted,
      },
    }
  }, [styles, tint, size, theme])

  const rootStyle = [styles.root, tint?.root, styleProps, style]

  return (
    <EmptyStateProvider value={context}>
      {asChild ? (
        <Slot ref={ref} {...rest} style={rootStyle}>
          {children}
        </Slot>
      ) : (
        <View ref={ref} {...rest} style={rootStyle}>
          {children}
        </View>
      )}
    </EmptyStateProvider>
  )
})

EmptyStateRoot.displayName = 'XAUI.EmptyState.Root'

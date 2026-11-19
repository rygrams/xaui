import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { tramAccents } from '../../theme/tram-tokens'
import { EmptyStateProvider } from './empty-state.context'
import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  emptyStateGlyph,
  emptyStateRecipe,
} from './empty-state.recipe'
import type { EmptyStateProps } from './empty-state.type'

/**
 * What is on the screen when there is nothing on it — as a Metro page says it: to the
 * start, a title on the Tram scale, the detail faded under it, then what to do about it.
 *
 * ```tsx
 * <EmptyState>
 *   <EmptyState.Header>
 *     <EmptyState.Media variant="icon">
 *       <Icon as={FolderIcon} />
 *     </EmptyState.Media>
 *     <EmptyState.Title>aucun fichier</EmptyState.Title>
 *     <EmptyState.Description>
 *       Les fichiers importés ou reçus par mail s'affichent ici.
 *     </EmptyState.Description>
 *   </EmptyState.Header>
 *   <EmptyState.Content>
 *     <Button variant="outline">importer</Button>
 *   </EmptyState.Content>
 * </EmptyState>
 * ```
 *
 * The header and the content are two roots, as in Native: the gap inside the words is
 * not the gap between them and the buttons. The words are never tinted — `accent` and
 * `color` land on the media's square only.
 */
export const EmptyStateRoot = forwardRef<View, EmptyStateProps>(function EmptyState(
  {
    children,
    variant = DEFAULT_VARIANT,
    size = DEFAULT_SIZE,
    radius,
    accent,
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
  // A square is a fill, so a named accent is its true colour, as the `Avatar` paints it.
  // A raw `color` is the caller's word and wins.
  const paint = color ?? (accent ? tramAccents[accent] : undefined)
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? emptyStateRecipe.tint({ theme, color: paint, selection })
    : undefined

  const context = useMemo(() => {
    const glyph = StyleSheet.flatten<TextStyle>([
      styles.mediaGlyph,
      tint?.mediaGlyph,
    ])
    const glyphSize = emptyStateGlyph(size)

    return {
      headerStyle: styles.header,
      mediaStyle: styles.media,
      mediaIconStyle: [styles.mediaIcon, tint?.mediaIcon],
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      contentStyle: styles.content,
      icon: {
        size: glyphSize,
        color:
          typeof glyph.color === 'string'
            ? glyph.color
            : theme.colors.accentForeground,
      },
      plainIcon: { size: glyphSize, color: theme.colors.muted },
    }
  }, [styles, tint, size, theme])

  // Most general to most specific: the cached recipe, the style props, `style`. The tint
  // stays off the root: the ground and the line are the variant's.
  const rootStyle = [styles.root, styleProps, style]

  const Root = asChild ? Slot : View

  return (
    <EmptyStateProvider value={context}>
      <Root ref={ref} {...rest} style={rootStyle}>
        {children}
      </Root>
    </EmptyStateProvider>
  )
})

EmptyStateRoot.displayName = 'XAUI.Tram.EmptyState.Root'

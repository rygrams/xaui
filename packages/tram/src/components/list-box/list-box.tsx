import { Children, cloneElement, forwardRef, isValidElement, useMemo } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Slot, useStyleProps } from '@xaui/native/system'
import type { ResolvedStyles, SlotStyles } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import type { XAUITheme } from '@xaui/native/theme'
import { flatPaint, inkOn } from '../../system/flat-paint'
import { useOptionalListBoxGroup } from './list-box-group.context'
import { ListBoxProvider } from './list-box.context'
import {
  ListBoxEntranceProvider,
  useEntranceFade,
  useEntranceOwner,
  useInheritedEntrance,
} from './list-box.entrance'
import { DEFAULT_SIZE, LIST_BOX_GEOMETRY, listBoxRecipe } from './list-box.recipe'
import { ListBoxRow } from './list-box-row'
import { useRowRoster } from './list-box.roster'
import type {
  ListBoxProps,
  ListBoxRowStyles,
  ListBoxSize,
  ListBoxSlot,
} from './list-box.type'

/**
 * Rows on the ground — the Native `ListBox`'s API, drawn as the Metro settings page: no
 * card, no fill, no line, a title in the page's ink and what it is set to in grey under
 * it.
 *
 * ```tsx
 * <ListBox accent="cobalt">
 *   <ListBox.ItemButton onPress={openWifi}>
 *     <ListBox.ItemPrefix variant="square">
 *       <Icon as={WifiIcon} />
 *     </ListBox.ItemPrefix>
 *     <ListBox.ItemContent>
 *       <ListBox.ItemTitle>Wi-Fi</ListBox.ItemTitle>
 *       <ListBox.ItemDescription>Maison</ListBox.ItemDescription>
 *     </ListBox.ItemContent>
 *   </ListBox.ItemButton>
 * </ListBox>
 * ```
 *
 * The rows arrive in a cascade when the list mounts — `hasEntrance={false}` places them.
 * A row added later opens in place and one removed closes, pushing the rows under it.
 * The separators are the root's, drawn above every row but the first, and move with it.
 *
 * In a `ListBoxGroup` it takes the group's size, accent, separators and cascade; its own
 * props still win, and a disabled group has no live list.
 */
export const ListBoxRoot = forwardRef<View, ListBoxProps>(function ListBox(
  {
    children,
    size,
    accent,
    color,
    hasSeparator,
    isDisabled = false,
    hasEntrance = true,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const group = useOptionalListBoxGroup()
  // In a group, the group's entrance: one cascade through every section.
  const inherited = useInheritedEntrance()
  const own = useEntranceOwner(hasEntrance)
  const entrance = inherited ?? own
  const fade = useEntranceFade(own)

  const resolvedSize = size ?? group?.size ?? DEFAULT_SIZE
  const disabled = isDisabled || (group?.isDisabled ?? false)
  const separated = hasSeparator ?? group?.hasSeparator ?? false
  // The list's own colour wins whole over the group's: an accent named here is not
  // overruled by a raw colour the group was given.
  const paint =
    accent || color
      ? flatPaint({ accent, color })
      : flatPaint({ accent: group?.accent, color: group?.color })

  const selection = { size: resolvedSize }
  const live = listBoxRecipe.resolve({ theme, selection })
  const grey = listBoxRecipe.resolve({
    theme,
    selection,
    states: { disabled: true },
  })
  // Uncached: a raw tint must stay out of the cache key.
  const tint = paint
    ? listBoxRecipe.tint({ theme, color: paint, selection })
    : undefined

  const context = useMemo(() => {
    const ink = paint ? inkOn(paint, theme.colors.accentForeground) : undefined
    const paints = { theme, size: resolvedSize }

    return {
      live: rowStylesFrom(live, { tint, ink }, paints),
      grey: rowStylesFrom(grey, { ink: theme.colors.background }, paints),
      isDisabled: disabled,
    }
  }, [live, grey, tint, paint, theme, resolvedSize, disabled])

  // Under `asChild` the rows are the caller's element's children, drawn inside it.
  const only = asChild && isValidElement(children) ? (children as Parent) : null
  const source = only ? only.props.children : children

  const entries = Children.toArray(source).map((child, index) => ({
    key:
      isValidElement(child) && child.key !== null ? String(child.key) : `${index}`,
    node: child,
  }))
  const [roster, letGo] = useRowRoster(entries, entrance.isSizing)
  const first = roster.findIndex(row => !row.isLeaving)

  const rows = roster.map((row, index) => (
    <ListBoxRow
      key={row.key}
      rowKey={row.key}
      entrance={entrance}
      isLeaving={row.isLeaving}
      separatorStyle={separated && index > first ? live.separator : null}
      onGone={letGo}
    >
      {row.node}
    </ListBoxRow>
  ))

  const rootStyle = [live.root, styleProps, style]

  return (
    <ListBoxEntranceProvider value={entrance}>
      <ListBoxProvider value={context}>
        {only ? (
          <Slot role="list" {...rest} ref={ref} style={rootStyle}>
            {cloneElement(only, undefined, rows)}
          </Slot>
        ) : (
          <Animated.View
            // Announced once, by what holds the rows. Overridable (R9).
            role="list"
            {...rest}
            // The animated wrapper types its ref as itself; at runtime it is the host view.
            ref={ref as never}
            // In a group the group fades; a list fades only when it is the one arriving.
            style={inherited ? rootStyle : [rootStyle, fade]}
          >
            {rows}
          </Animated.View>
        )}
      </ListBoxProvider>
    </ListBoxEntranceProvider>
  )
})

ListBoxRoot.displayName = 'XAUI.Tram.ListBox.Root'

type Parent = ReactElement<{ children?: ReactNode }>

type SquarePaint = {
  /** The tint pass, when the squares are not the theme's accent. */
  tint?: SlotStyles<ListBoxSlot>
  /** The ink on the squares, when it is not the theme's `accentForeground`. */
  ink?: string
}

type GlyphPaints = { theme: XAUITheme; size: ListBoxSize }

/** One set of row styles — live or grey — with what an `Icon` takes in each place. */
function rowStylesFrom(
  styles: ResolvedStyles<ListBoxSlot>,
  square: SquarePaint,
  { theme, size }: GlyphPaints
): ListBoxRowStyles {
  const geometry = LIST_BOX_GEOMETRY[size]
  const title = StyleSheet.flatten<TextStyle>(styles.title)
  const titleInk = typeof title.color === 'string' ? title.color : undefined

  return {
    itemStyle: styles.item,
    prefixStyle: styles.prefix,
    squareStyle: square.tint ? [styles.square, square.tint.square] : styles.square,
    contentStyle: styles.content,
    titleStyle: styles.title,
    descriptionStyle: styles.description,
    suffixStyle: styles.suffix,
    suffixTextStyle: styles.suffixText,
    // A bare glyph is drawn as the title is written; one in the suffix as its value.
    glyph: { size: geometry.glyph, color: titleInk },
    squareGlyph: {
      size: geometry.squareGlyph,
      color: square.ink ?? theme.colors.accentForeground,
    },
    suffixGlyph: { size: geometry.glyph, color: theme.colors.muted },
  }
}

import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react'
import type { ForwardedRef } from 'react'
import { FlatList, View } from 'react-native'
import type {
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import type { ResolvedStyles } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import type { XAUITheme } from '@xaui/native/theme'
import { flatPaint, inkOn } from '../../system/flat-paint'
import { lineInk } from '../../system/line-ink'
import { accentInk, distinctInk } from '../../theme/accent-ink'
import { isHex } from '../../theme/on-accent'
import { tramSubtle } from '../../theme/tram-tokens'
import { ListItemProvider, ListProvider } from './list.context'
import { LIST_GEOMETRY, listRecipe } from './list.recipe'
import type {
  ListOpenRow,
  ListProps,
  ListRootComponent,
  ListRowStyles,
  ListSlot,
} from './list.type'

/**
 * The Metro content list — the Native `List`'s API, a `FlatList` whose `renderItem`
 * composes each row, drawn as the news and mail lists of Metro: a square at the start,
 * a title in the page's ink, a line in the accent, a detail in grey. No card, and no
 * line between the rows: a Metro list reads by the space between them.
 *
 * ```tsx
 * <List
 *   data={articles}
 *   keyExtractor={article => article.id}
 *   renderItem={({ item }) => (
 *     <List.Item onPress={() => open(item)}>
 *       <List.Leading asChild>
 *         <Image source={item.cover} />
 *       </List.Leading>
 *       <List.Content>
 *         <List.Title>{item.title}</List.Title>
 *         <List.Subtitle>{item.category}</List.Subtitle>
 *         <List.Description>{item.lede}</List.Description>
 *       </List.Content>
 *       <List.Swipe>
 *         <List.SwipeAction onPress={() => archive(item)}>archiver</List.SwipeAction>
 *       </List.Swipe>
 *     </List.Item>
 *   )}
 * />
 * ```
 *
 * The three levels of text are told apart at a glance: three sizes — 25, 16, 13 — and
 * three inks kept apart. The detail is in Metro's subtle grey, greyer than `muted`; the
 * subtitle's accent is moved off it when, read on the ground, it would come too close
 * (the grey accents, on white).
 *
 * The first rows arrive in a cascade as the list first shows some — when it mounts with
 * data, or when its data first arrives; `hasEntrance={false}` places them. One row at a
 * time has its actions out: opening another, or scrolling the list, closes it.
 */
function ListRootInner<ItemT>(
  {
    data,
    renderItem,
    accent,
    color,
    hasEntrance = true,
    asChild = false,
    children,
    accessibilityRole = 'list',
    onScrollBeginDrag,
    style,
    ...props
  }: ListProps<ItemT>,
  ref: ForwardedRef<FlatList<ItemT>>
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const itemCount = data?.length ?? 0

  const live = listRecipe.resolve({ theme })
  const grey = listRecipe.resolve({ theme, states: { disabled: true } })
  const fill = flatPaint({ accent, color })
  // Uncached: a raw tint must stay out of the cache key.
  const tint = fill ? listRecipe.tint({ theme, color: fill }) : undefined
  const detailInk = useDetailInk(theme)
  const subtitleInk = useSubtitleInk(theme, accent, color, detailInk)

  // The first rows the list shows take their turn; after that a row is placed.
  const entered = useRef(false)
  useEffect(() => {
    if (itemCount > 0) entered.current = true
  }, [itemCount])

  const openRow = useOpenRow()

  const context = useMemo(() => {
    const ink = fill ? inkOn(fill, theme.colors.accentForeground) : undefined
    const leading = tint ? [live.leading, tint.leading] : live.leading

    return {
      theme,
      live: rowStylesFrom(live, {
        leading,
        subtitleInk,
        detailInk,
        glyphInk: ink ?? theme.colors.accentForeground,
      }),
      grey: rowStylesFrom(grey, { detailInk, glyphInk: theme.colors.background }),
      swipeStyle: live.swipe,
      actionFill: fill,
      hasEntrance,
      hasEntered: () => entered.current,
      openRow,
    }
  }, [live, grey, tint, fill, subtitleInk, detailInk, theme, hasEntrance, openRow])

  const renderRow = useCallback(
    (info: ListRenderItemInfo<ItemT>) => (
      <ListItemProvider value={{ index: info.index }}>
        {renderItem(info)}
      </ListItemProvider>
    ),
    [renderItem]
  )

  // A row's actions go back under it as soon as the list is dragged.
  const handleScrollBeginDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    openRow.closeAll()
    onScrollBeginDrag?.(event)
  }

  const listProps = {
    accessibilityRole,
    ...rest,
    data,
    renderItem: renderRow,
    // The space between two rows, and none before the first or after the last.
    ItemSeparatorComponent: RowSpace,
    onScrollBeginDrag: handleScrollBeginDrag,
    style: [live.root, styleProps, style],
  }

  return (
    <ListProvider value={context}>
      {asChild ? (
        <Slot {...listProps} ref={ref as ForwardedRef<unknown>}>
          {children}
        </Slot>
      ) : (
        <FlatList ref={ref} {...listProps} />
      )}
    </ListProvider>
  )
}

export const ListRoot = forwardRef(ListRootInner) as ListRootComponent

ListRoot.displayName = 'XAUI.Tram.List.Root'

/** Twelve points: a row's breath, as on the Metro news list. */
function RowSpace() {
  const theme = useXAUITheme()

  return <View style={{ height: theme.spacing(3) }} />
}

/**
 * The ink of the detail and of what ends a row: Metro's subtle grey, read on the ground —
 * the same grey on black, darkened on white to the first that reads at 4.5:1. A ground
 * that is not a hex cannot be measured, and takes `muted`.
 */
function useDetailInk(theme: XAUITheme): string {
  const { background, muted } = theme.colors

  return useMemo(
    () => (isHex(background) ? accentInk(tramSubtle, background) : muted),
    [background, muted]
  )
}

/**
 * The ink of a subtitle: the accent read on the ground — the list's, or the theme's
 * `link` — kept apart from the title's ink and the detail's grey. A raw `color` is the
 * caller's word and is never moved.
 */
function useSubtitleInk(
  theme: XAUITheme,
  accent: ListProps<unknown>['accent'],
  color: string | undefined,
  detailInk: string
): string {
  const { background, foreground, link } = theme.colors

  return useMemo(() => {
    if (color) return color

    const ink = lineInk({ accent }, background) ?? link

    return distinctInk(ink, background, [foreground, detailInk])
  }, [accent, color, background, foreground, detailInk, link])
}

/**
 * The row that has its actions out. Opening one closes the last; a row that closes, or
 * leaves the list as it scrolls away, lets go of its place.
 */
function useOpenRow(): ListOpenRow {
  const current = useRef<(() => void) | null>(null)

  return useMemo(
    () => ({
      claim: close => {
        if (current.current && current.current !== close) current.current()
        current.current = close
      },
      release: close => {
        if (current.current === close) current.current = null
      },
      closeAll: () => {
        const close = current.current
        current.current = null
        close?.()
      },
    }),
    []
  )
}

type RowPaint = {
  /** The square, tinted when the list has an accent of its own. */
  leading?: ListRowStyles['leadingStyle']
  /** The subtitle's ink, kept apart from the other two levels. */
  subtitleInk?: string
  /** The grey of the detail and of what ends the row. */
  detailInk: string
  /** A glyph on the square. */
  glyphInk: string
}

/** One set of row styles — live or grey — with what an `Icon` takes in each place. */
function rowStylesFrom(
  styles: ResolvedStyles<ListSlot>,
  paint: RowPaint
): ListRowStyles {
  const detail = { color: paint.detailInk }

  return {
    itemStyle: styles.item,
    leadingStyle: paint.leading ?? styles.leading,
    contentStyle: styles.content,
    titleStyle: styles.title,
    subtitleStyle: paint.subtitleInk
      ? [styles.subtitle, { color: paint.subtitleInk }]
      : styles.subtitle,
    descriptionStyle: [styles.description, detail],
    actionStyle: styles.action,
    actionTextStyle: [styles.actionText, detail],
    leadingGlyph: { size: LIST_GEOMETRY.leadingGlyph, color: paint.glyphInk },
    actionGlyph: { size: LIST_GEOMETRY.actionGlyph, color: paint.detailInk },
  }
}

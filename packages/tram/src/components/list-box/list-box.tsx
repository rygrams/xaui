import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import type { ReactElement, ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useControllableState } from '@xaui/native'
import { Slot, useStyleProps } from '@xaui/native/system'
import type { ResolvedStyles, SlotStyles } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import type { XAUITheme } from '@xaui/native/theme'
import { flatPaint, inkOn } from '../../system/flat-paint'
import { lineInk } from '../../system/line-ink'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useOptionalListBoxGroup } from './list-box-group.context'
import { ListBoxOrderProvider, ListBoxProvider } from './list-box.context'
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
  ListBoxSelection,
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
 * No line between the rows: a Metro list reads by the space between them. The rows
 * arrive in a cascade when the list mounts — `hasEntrance={false}` places them. A row
 * added later opens in place and one removed closes, pushing the rows under it.
 *
 * **Selection.** `selectionMode="single"` makes a press on an `ItemButton` with an `id`
 * choose it: its title turns to the accent, read as ink, and its `onPress` still runs.
 * `selectionMode="multiple"` is the Metro mail list: a press on the start edge of a row
 * puts a box out at the start of every row — they slide in one after the other — and
 * ticks that row; while the list is selecting, a press anywhere on a row ticks it instead
 * of pressing it. Leaving (`isSelecting={false}`) empties the selection.
 *
 * In a `ListBoxGroup` it takes the group's size, accent and cascade; its own props still
 * win, and a disabled group has no live list.
 */
export const ListBoxRoot = forwardRef<View, ListBoxProps>(function ListBox(
  {
    children,
    size,
    accent,
    color,
    selectionMode = 'none',
    selectedKeys,
    defaultSelectedKeys = NO_KEYS,
    onSelectionChange,
    isSelecting: isSelectingProp,
    defaultSelecting = false,
    onSelectingChange,
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
  // The list's own colour wins whole over the group's: an accent named here is not
  // overruled by a raw colour the group was given.
  const paint =
    accent || color
      ? flatPaint({ accent, color })
      : flatPaint({ accent: group?.accent, color: group?.color })

  const variants = { size: resolvedSize }
  const live = listBoxRecipe.resolve({ theme, selection: variants })
  const grey = listBoxRecipe.resolve({
    theme,
    selection: variants,
    states: { disabled: true },
  })
  // Uncached: a raw tint must stay out of the cache key.
  const tint = paint
    ? listBoxRecipe.tint({ theme, color: paint, selection: variants })
    : undefined

  // A chosen title is the accent read on the ground. Left out, the recipe's `link`.
  const chosenInk =
    accent || color
      ? lineInk({ accent, color }, theme.colors.background)
      : lineInk(
          { accent: group?.accent, color: group?.color },
          theme.colors.background
        )

  const selection = useListBoxSelection({
    mode: selectionMode,
    selectedKeys,
    defaultSelectedKeys,
    onSelectionChange,
    isSelecting: isSelectingProp,
    defaultSelecting,
    onSelectingChange,
    checkSpan:
      LIST_BOX_GEOMETRY[resolvedSize].check.box +
      theme.spacing(LIST_BOX_GEOMETRY[resolvedSize].gap),
  })

  const context = useMemo(() => {
    const ink = paint ? inkOn(paint, theme.colors.accentForeground) : undefined
    const paints = { theme, size: resolvedSize }

    return {
      live: rowStylesFrom(live, { tint, ink, chosenInk }, paints),
      grey: rowStylesFrom(grey, { ink: theme.colors.background }, paints),
      isDisabled: disabled,
      selection,
    }
  }, [live, grey, tint, paint, chosenInk, theme, resolvedSize, disabled, selection])

  // Under `asChild` the rows are the caller's element's children, drawn inside it.
  const only = asChild && isValidElement(children) ? (children as Parent) : null
  const source = only ? only.props.children : children

  const entries = Children.toArray(source).map((child, index) => ({
    key:
      isValidElement(child) && child.key !== null ? String(child.key) : `${index}`,
    node: child,
  }))
  const [roster, letGo] = useRowRoster(entries, entrance.isSizing)

  // Each row's place among those that stay: the boxes slide in in this order.
  let order = 0
  const rows = roster.map(row => (
    <ListBoxRow
      key={row.key}
      rowKey={row.key}
      entrance={entrance}
      isLeaving={row.isLeaving}
      onGone={letGo}
    >
      <ListBoxOrderProvider value={row.isLeaving ? 0 : order++}>
        {row.node}
      </ListBoxOrderProvider>
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
  /** The tint pass, when the squares and the marks are not the theme's accent. */
  tint?: SlotStyles<ListBoxSlot>
  /** The ink on the squares, when it is not the theme's `accentForeground`. */
  ink?: string
  /** A chosen title's colour, when it is not the theme's `link`. */
  chosenInk?: string
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
    selectedTitleStyle: square.chosenInk
      ? [styles.selectedTitle, { color: square.chosenInk }]
      : styles.selectedTitle,
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
    checkStyle: styles.check,
    checkBoxStyle: styles.checkBox,
    checkMarkStyle: square.tint
      ? [styles.checkMark, square.tint.checkMark]
      : styles.checkMark,
  }
}

const NO_KEYS: readonly string[] = []

type SelectionOptions = Pick<
  ListBoxProps,
  | 'selectedKeys'
  | 'defaultSelectedKeys'
  | 'onSelectionChange'
  | 'isSelecting'
  | 'defaultSelecting'
  | 'onSelectingChange'
> & { mode: NonNullable<ListBoxProps['selectionMode']>; checkSpan: number }

/**
 * The list's selection: the chosen keys and, in `multiple`, whether the boxes are out —
 * both controllable. A press reaches it through `press`, which says whether it took the
 * press, so the row knows whether its own `onPress` still runs.
 */
function useListBoxSelection({
  mode,
  selectedKeys,
  defaultSelectedKeys = NO_KEYS,
  onSelectionChange,
  isSelecting: isSelectingProp,
  defaultSelecting = false,
  onSelectingChange,
  checkSpan,
}: SelectionOptions): ListBoxSelection {
  const haptic = useTramHaptic()
  const [keys, setKeys] = useControllableState({
    value: selectedKeys,
    defaultValue: defaultSelectedKeys,
    onChange: onSelectionChange,
  })
  const [selecting, setSelecting] = useControllableState({
    value: isSelectingProp,
    defaultValue: defaultSelecting,
    onChange: onSelectingChange,
  })
  const isSelecting = mode === 'multiple' && selecting

  // Leaving empties the selection — whoever closed the boxes, the list or its caller.
  const wasSelecting = useRef(isSelecting)
  useEffect(() => {
    if (wasSelecting.current && !isSelecting && keys.length > 0) setKeys(NO_KEYS)
    wasSelecting.current = isSelecting
  }, [isSelecting, keys.length, setKeys])

  const isSelected = useCallback((id: string) => keys.includes(id), [keys])

  const press = useCallback(
    (id: string, atStart: boolean) => {
      if (mode === 'single') {
        if (!keys.includes(id) || keys.length > 1) {
          haptic('selection')
          setKeys([id])
        }
        return false
      }
      if (mode !== 'multiple') return false
      if (isSelecting) {
        haptic('selection')
        setKeys(keys.includes(id) ? keys.filter(key => key !== id) : [...keys, id])
        return true
      }
      if (!atStart) return false
      haptic('selection')
      setSelecting(true)
      setKeys([id])
      return true
    },
    [mode, keys, isSelecting, haptic, setKeys, setSelecting]
  )

  return useMemo(
    () => ({ mode, isSelecting, isSelected, press, checkSpan }),
    [mode, isSelecting, isSelected, press, checkSpan]
  )
}

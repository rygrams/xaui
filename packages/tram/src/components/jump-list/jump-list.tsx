import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import type { ForwardedRef, ReactElement, Ref } from 'react'
import { SectionList } from 'react-native'
import type { SectionListData } from 'react-native'
import Animated from 'react-native-reanimated'
import { useControllableState, useMergedRef } from '@xaui/native'
import { useAnimationDisabled, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { flatPaint, inkOn } from '../../system/flat-paint'
import { touchReach } from '../../system/touch-reach'
import { JumpListHeader } from './jump-list-header'
import { JumpListOverlay } from './jump-list-overlay'
import { childOfType } from './jump-list.children'
import {
  JumpListGroupProvider,
  JumpListProvider,
  useJumpList,
} from './jump-list.context'
import { useJumpGrid, useLanding } from './jump-list.hook'
import {
  DEFAULT_SIZE,
  JUMP_LIST_GEOMETRY,
  formOf,
  gridSpacing,
  jumpListRecipe,
} from './jump-list.recipe'
import { columnsFor, jumpLayoutFor } from './jump-list.sections'
import type { JumpListSection } from './jump-list.sections'
import type {
  JumpListContextValue,
  JumpListLanding,
  JumpListProps,
  JumpListRef,
} from './jump-list.type'

const DEFAULT_HEADER = <JumpListHeader />
const DEFAULT_OVERLAY = <JumpListOverlay />

/** A jump that missed a row not yet drawn is tried again this many times, no more. */
const RETRIES = 3

/**
 * The Metro grouped list — a contact list, a song list — where every group opens on a
 * square of the accent. Press one and the grid of keys comes up over the page; press a
 * key and the grid turns away, and the list lands on that group. Tram's own: Native has
 * no component of this name.
 *
 * ```tsx
 * const sections = groupByInitial(contacts, contact => contact.name, { locale: 'fr' })
 *
 * <JumpList
 *   sections={sections}
 *   keyExtractor={contact => contact.id}
 *   renderItem={({ item }) => <ContactRow contact={item} />}
 *   accent="cobalt"
 *   onJump={key => analytics.track('jump', { key })}
 * />
 * ```
 *
 * It is a `SectionList`, and takes its props — virtualised, so a list of two thousand
 * names jumps as fast as one of twenty. Its headers are drawn by the list: a group with
 * no row has none, and its key in the grid is grey and does not respond. The keys are
 * `keys`, or the sections' own; one character each, they are a grid of squares four
 * across, otherwise a column of bars (`layout`).
 *
 * `JumpList.Header` and `JumpList.Overlay`, written as children, are the drawing of every
 * header and of the grid — a `JumpList.Key` written inside the overlay, of every key.
 *
 * The grid arrives a row at a time and leaves in a turnstile on the screen's start edge,
 * the key pressed last; the header landed on turns in by the same edge. A header is felt
 * as a `press`, a key as a `selection`. With motion reduced the grid fades; under an
 * ancestor's `disable-all` it is there or it is not.
 *
 * Headers do not stick to the top (`stickySectionHeadersEnabled` is off): a Metro list
 * has none. No `asChild`: the root is a virtualised list, which a caller's element
 * cannot stand in for.
 */
function JumpList<ItemT>(
  {
    sections,
    keys: keysProp,
    layout: layoutProp,
    size = DEFAULT_SIZE,
    accent,
    color,
    isOpen: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    onJump,
    isDisabled = false,
    children,
    stickySectionHeadersEnabled = false,
    onScrollToIndexFailed,
    style,
    ...props
  }: JumpListProps<ItemT>,
  ref: ForwardedRef<JumpListRef<ItemT>>
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const isStill = useAnimationDisabled()
  const list = useRef<JumpListRef<ItemT>>(null)
  const refs = useMergedRef(list, ref)

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const keys = useMemo(
    () => keysProp ?? sections.map(section => section.key),
    [keysProp, sections]
  )
  const layout = layoutProp ?? jumpLayoutFor(keys)
  const columns = columnsFor(layout)
  const filled = useMemo(
    () =>
      new Set(
        sections
          .filter(section => section.data.length > 0)
          .map(section => section.key)
      ),
    [sections]
  )
  const titles = useMemo(
    () =>
      new Map(sections.map(section => [section.key, section.title ?? section.key])),
    [sections]
  )
  const titleOf = useCallback((key: string) => titles.get(key) ?? key, [titles])

  const [picked, setPicked] = useState(-1)
  const [landing, setLanding] = useState<JumpListLanding | null>(null)
  const target = useRef<string | null>(null)
  // The group being scrolled to, set only for the length of the call: the list reports a
  // miss from inside it. Left set, a scroll the app makes later through the ref and
  // misses would be retried toward this group.
  const aim = useRef<string | null>(null)
  const retries = useRef(0)

  const scrollTo = useCallback(
    (key: string) => {
      const sectionIndex = sections.findIndex(section => section.key === key)
      if (sectionIndex < 0) return

      aim.current = key
      // Item 0 of a section is its header.
      list.current?.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        viewOffset: 0,
        animated: false,
      })
      aim.current = null
    },
    [sections]
  )

  // Once the grid has gone: the list is where the key said, and its header lands.
  const land = useCallback(() => {
    const key = target.current
    target.current = null
    setPicked(-1)
    if (key === null) return

    retries.current = 0
    scrollTo(key)
    setLanding(previous => ({
      key,
      count: (previous?.count ?? 0) + 1,
      at: Date.now(),
    }))
  }, [scrollTo])

  // A row the list has not drawn yet has no place to scroll to: go near it, on the
  // heights the list has seen, then try again once it is drawn.
  const handleScrollFailed: NonNullable<typeof onScrollToIndexFailed> = info => {
    onScrollToIndexFailed?.(info)
    const key = aim.current
    if (key === null || retries.current >= RETRIES) return

    retries.current += 1
    list.current
      ?.getScrollResponder()
      ?.scrollTo({ y: info.averageItemLength * info.index, animated: false })
    // A frame later, once the rows near it are drawn.
    setTimeout(() => scrollTo(key), 0)
  }

  const grid = useJumpGrid({
    isOpen,
    isStill,
    leaving: { columns, count: keys.length, picked },
    onGone: land,
  })
  const phase = isOpen ? 'arriving' : grid.isMounted ? 'leaving' : 'closed'

  const open = useCallback(() => {
    if (!isDisabled) setOpen(true)
  }, [isDisabled, setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const jump = useCallback(
    (key: string) => {
      if (!filled.has(key)) return

      target.current = key
      setPicked(keys.indexOf(key))
      onJump?.(key)
      setOpen(false)
    },
    [filled, keys, onJump, setOpen]
  )

  const selection = { form: formOf(layout, size) }
  const states = { disabled: isDisabled }
  const styles = jumpListRecipe.resolve({ theme, selection, states })
  const paint = flatPaint({ accent, color })
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? jumpListRecipe.tint({ theme, color: paint, selection, states })
    : undefined
  const { inset, gap } = gridSpacing(theme)
  const reach = touchReach(JUMP_LIST_GEOMETRY[size].side)

  const header = childOfType(children, JumpListHeader, DEFAULT_HEADER)
  const overlay = childOfType(children, JumpListOverlay, DEFAULT_OVERLAY)

  const context = useMemo<JumpListContextValue>(() => {
    // The ink that reads on the fill: black on lime, amber and yellow.
    const ink = paint
      ? { color: inkOn(paint, theme.colors.accentForeground) }
      : undefined

    return {
      sectionStyle: styles.section,
      headerStyle: [styles.header, tint?.header],
      headerLabelStyle: [styles.headerLabel, tint?.headerLabel, ink],
      overlayStyle: styles.overlay,
      gridStyle: styles.grid,
      rowStyle: styles.row,
      cellStyle: styles.cell,
      keyStyle: [styles.key, tint?.key],
      keyLabelStyle: [styles.keyLabel, tint?.keyLabel, ink],
      emptyKeyStyle: styles.emptyKey,
      emptyKeyLabelStyle: styles.emptyKeyLabel,
      headerReach: reach,
      layout,
      columns,
      inset,
      gap,
      keys,
      filled,
      titleOf,
      isOpen,
      isMounted: grid.isMounted,
      isDisabled,
      isStill,
      phase,
      picked,
      veil: grid.veil,
      landing,
      open,
      close,
      jump,
      header,
    }
  }, [
    styles,
    tint,
    paint,
    theme,
    reach,
    layout,
    columns,
    inset,
    gap,
    keys,
    filled,
    titleOf,
    isOpen,
    grid.isMounted,
    grid.veil,
    isDisabled,
    isStill,
    phase,
    picked,
    landing,
    open,
    close,
    jump,
    header,
  ])

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<ItemT, JumpListSection<ItemT>> }) =>
      section.data.length === 0 ? null : (
        <JumpListSectionHeader groupKey={section.key} />
      ),
    []
  )

  return (
    <JumpListProvider value={context}>
      <SectionList
        ref={refs}
        stickySectionHeadersEnabled={stickySectionHeadersEnabled}
        {...rest}
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        onScrollToIndexFailed={handleScrollFailed}
        // Most general to most specific: the recipe, the style props, `style`.
        style={[styles.root, styleProps, style]}
      />
      {overlay}
    </JumpListProvider>
  )
}

type JumpListSectionHeaderProps = { groupKey: string }

/** The room around a header, the header drawn from the one written, and its landing. */
function JumpListSectionHeader({ groupKey }: JumpListSectionHeaderProps) {
  const { sectionStyle, header, landing, isStill, titleOf } = useJumpList()
  const landed = useLanding(landing, groupKey, isStill)

  const group = useMemo(
    () => ({ key: groupKey, title: titleOf(groupKey), isEmpty: false }),
    [groupKey, titleOf]
  )

  return (
    <Animated.View style={[sectionStyle, landed]}>
      <JumpListGroupProvider value={group}>{header}</JumpListGroupProvider>
    </Animated.View>
  )
}

/** `forwardRef` drops the item's type: it is put back for the caller. */
export const JumpListRoot = forwardRef(JumpList) as (<ItemT>(
  props: JumpListProps<ItemT> & { ref?: Ref<JumpListRef<ItemT>> }
) => ReactElement | null) & { displayName?: string }

JumpListRoot.displayName = 'XAUI.Tram.JumpList.Root'

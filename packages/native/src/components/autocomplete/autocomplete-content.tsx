import { Children, forwardRef, isValidElement, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import { ScrollView } from 'react-native'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useAnchoredPosition } from '../../hooks/use-anchored-position'
import { anchoredEntering, anchoredExiting } from '../../system/anchored'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { collectItemLabels } from '../../utils/item-labels'
import { AutocompleteEmpty } from './autocomplete-empty'
import { AutocompleteItem } from './autocomplete-item'
import { AutocompleteSearch } from './autocomplete-search'
import { AutocompleteProvider, useAutocomplete } from './autocomplete.context'
import type { AutocompleteContentProps } from './autocomplete.type'
import { filterItems } from './autocomplete.utils'

/** HeroUI's, point for point: eight from the trigger, twelve from every screen edge. */
const DEFAULT_OFFSET = 8
const DEFAULT_INSETS = { top: 12, bottom: 12, start: 12, end: 12 }

/** By identity rather than by `displayName`: a minifier keeps the reference, not the string. */
const isItem = (type: unknown) => type === AutocompleteItem
const isSearch = (type: unknown) => type === AutocompleteSearch
const isEmpty = (type: unknown) => type === AutocompleteEmpty

/**
 * The panel. It renders into the nearest `PortalHost`, so it escapes the clipping and the
 * stacking of whatever container held the trigger. The positioning — the measuring pass,
 * the host's origin, the collision flip — is `useAnchoredPosition`, shared with the
 * `Select` and the `Popover`.
 *
 * **It splits its children three ways.** The search field is pinned above the scroller so
 * it stays put while the results move under it; the empty line is held back until there is
 * nothing to show; everything else is filtered by what has been typed and scrolls.
 *
 * The split is by **identity** rather than by reading props, which is the line this library
 * draws: knowing that a child is the search box is knowing which component it is, where
 * knowing what a row says would be reading its insides.
 */
export const AutocompleteContent = forwardRef<View, AutocompleteContentProps>(
  function AutocompleteContent(
    {
      children,
      placement = 'bottom',
      align = 'center',
      width = 'trigger',
      offset = DEFAULT_OFFSET,
      alignOffset = 0,
      avoidCollisions = true,
      insets,
      style,
      onLayout,
      ...props
    },
    ref
  ) {
    // The whole context: our `Portal` copies its children into the host rather than
    // re-parenting them, so the subtree below lands outside the provider the root
    // rendered. Without re-providing it here every row throws on `useAutocomplete`.
    const context = useAutocomplete()
    const { contentStyle, isOpen, anchor, query, registerLabel } = context
    const [styleProps, rest] = useStyleProps(props)

    const { position, onContentLayout, measuringStyle } = useAnchoredPosition({
      anchor,
      isOpen,
      placement,
      align,
      width,
      offset,
      alignOffset,
      avoidCollisions,
      insets: { ...DEFAULT_INSETS, ...insets },
      onLayout,
    })

    // Read off the elements, before anything mounts: the rows live in a portal that only
    // exists while the panel is open, so a control with a `defaultValue` would show its
    // placeholder until the user had opened it once.
    useEffect(() => {
      for (const [value, label] of collectItemLabels(children, isItem)) {
        registerLabel(value, label)
      }
    }, [children, registerLabel])

    const {
      search,
      empty,
      rest: listed,
    } = useMemo(() => partition(children), [children])
    const { children: results, matched } = useMemo(
      () => filterItems(listed, query, isItem),
      [listed, query]
    )

    if (!isOpen || anchor === null) return null

    return (
      <Portal>
        <AutocompleteProvider value={context}>
          <Animated.View
            ref={ref}
            // Keyed on the resolved side so the entrance plays once the panel knows which
            // way it grows — running it on the measuring pass would animate a panel nobody
            // can see.
            key={position?.placement ?? 'measuring'}
            entering={position ? anchoredEntering(position.placement) : undefined}
            exiting={position ? anchoredExiting(position.placement) : undefined}
            onLayout={onContentLayout}
            {...rest}
            style={[
              contentStyle,
              position === null
                ? measuringStyle
                : {
                    top: position.top,
                    start: position.start,
                    width: position.width,
                    maxHeight: position.maxHeight,
                  },
              styleProps,
              style,
            ]}
          >
            {search}
            <ScrollView
              bounces={false}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {matched === 0 && empty !== null ? empty : results}
            </ScrollView>
          </Animated.View>
        </AutocompleteProvider>
      </Portal>
    )
  }
)

AutocompleteContent.displayName = 'XAUI.Autocomplete.Content'

/** The three kinds of child, told apart by which component they are. */
function partition(children: AutocompleteContentProps['children']) {
  let search: ReactNode = null
  let empty: ReactNode = null
  const rest: ReactNode[] = []

  Children.forEach(children, child => {
    if (isValidElement(child) && isSearch(child.type)) {
      search = child
      return
    }
    if (isValidElement(child) && isEmpty(child.type)) {
      empty = child
      return
    }
    rest.push(child)
  })

  return { search, empty, rest }
}

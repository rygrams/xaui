import { useCallback, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useLabelRegistry } from '../select/select.hook'
import { selectRecipe } from '../select/select.recipe'
import { AutocompleteProvider } from './autocomplete.context'
import { autocompleteRecipe } from './autocomplete.recipe'
import type { AutocompleteAnchor, AutocompleteProps } from './autocomplete.type'

/**
 * A field that opens a list you search.
 *
 * ```tsx
 * <Autocomplete onValueChange={setState}>
 *   <Autocomplete.Trigger>
 *     <Autocomplete.Value placeholder="Choisir un état" />
 *     <Autocomplete.Indicator />
 *   </Autocomplete.Trigger>
 *   <Autocomplete.Overlay />
 *   <Autocomplete.Content>
 *     <Autocomplete.Search placeholder="Rechercher…" />
 *     <Autocomplete.Item value="ca">Californie</Autocomplete.Item>
 *     <Autocomplete.Item value="tx">Texas</Autocomplete.Item>
 *     <Autocomplete.Empty>Aucun résultat</Autocomplete.Empty>
 *   </Autocomplete.Content>
 * </Autocomplete>
 * ```
 *
 * **It is not a `Select`, and it wears its clothes.** A select is for a list you read: a
 * dozen options, all of them visible, and choosing is recognising one. An autocomplete is
 * for a list you cannot read — fifty states, four thousand cities — where choosing is
 * *finding*, and the field you type in is the control rather than an extra row in a menu.
 * Same trigger, same panel, same rows; a different thing to do with them.
 *
 * So the two share their style **by construction** rather than by coincidence: the trigger,
 * the panel and the rows resolve through `selectRecipe`, and only the search box and the
 * empty line are this component's own. A second table would be two to keep in step, and
 * the drift would show as a select and an autocomplete side by side in a form with fields
 * half a shade apart.
 *
 * **The root renders no node.** It is state and resolved style around a trigger and a
 * panel, so `ref`, `style` and the a11y props live on `Autocomplete.Trigger`.
 */
export function Autocomplete({
  children,
  variant,
  size,
  radius,
  color,
  value: controlledValue,
  defaultValue,
  onValueChange,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  query: controlledQuery,
  defaultQuery = '',
  onQueryChange,
  isDisabled = false,
  isInvalid = false,
}: AutocompleteProps) {
  const theme = useXAUITheme()
  const { labelFor, registerLabel } = useLabelRegistry()
  const [anchor, setAnchor] = useState<AutocompleteAnchor | null>(null)

  const [value, setValue] = useControllableState<string | undefined>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange as ((next: string | undefined) => void) | undefined,
  })

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const [query, setQueryState] = useControllableState({
    value: controlledQuery,
    defaultValue: defaultQuery,
    onChange: onQueryChange,
  })

  const selection = {
    variant,
    size,
    radius,
    isOpen: isOpen ? ('true' as const) : undefined,
    isInvalid: isInvalid ? ('true' as const) : undefined,
  }

  // The shared half. Two resolutions, not one: the trigger and a row each own a press
  // state the root cannot see, so the root resolves both faces and each slot picks — R5
  // intact, and the second call is a cache hit.
  const styles = selectRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  const pressed = selectRecipe.resolve({
    theme,
    selection,
    states: { pressed: true },
  })
  const tint = color ? selectRecipe.tint({ theme, color, selection }) : undefined

  // The half a select has never had.
  const own = autocompleteRecipe.resolve({ theme, selection: { size } })
  const ownTint = color
    ? autocompleteRecipe.tint({ theme, color, selection: { size } })
    : undefined

  const open = useCallback(() => setOpen(true), [setOpen])

  // The query goes with the panel. A search that survived its own closing would mean the
  // list is already filtered the next time it opens, by a word nobody can see.
  const close = useCallback(() => {
    setOpen(false)
    setQueryState('')
  }, [setOpen, setQueryState])

  const toggle = useCallback(
    () => (isOpen ? close() : open()),
    [close, isOpen, open]
  )

  const select = useCallback(
    (next: string, label?: string) => {
      if (label !== undefined) registerLabel(next, label)
      setValue(next)
      close()
    },
    [close, registerLabel, setValue]
  )

  const context = useMemo(() => {
    const indicator = StyleSheet.flatten<TextStyle>([
      styles.indicator,
      tint?.indicator,
    ])
    // A tint repaints the trigger's fill, and `fieldPlaceholder` was chosen against the
    // theme's field colour rather than an arbitrary one. The tint's own foreground is what
    // stays legible on it.
    const tintedPlaceholder = tint
      ? StyleSheet.flatten<TextStyle>([tint.value]).color
      : undefined

    return {
      triggerStyle: tint ? [styles.trigger, tint.trigger] : styles.trigger,
      triggerPressedStyle: pressed.trigger,
      valueStyle: tint ? [styles.value, tint.value] : styles.value,
      placeholderStyle: tint
        ? [styles.placeholder, { color: tintedPlaceholder }]
        : styles.placeholder,
      indicatorStyle: styles.indicator,
      overlayStyle: styles.overlay,
      contentStyle: styles.content,
      searchStyle: ownTint ? [own.search, ownTint.search] : own.search,
      emptyStyle: own.empty,
      itemStyle: styles.item,
      itemPressedStyle: pressed.item,
      itemLabelStyle: styles.itemLabel,
      glyph: {
        size: indicator.fontSize,
        color: typeof indicator.color === 'string' ? indicator.color : undefined,
      },
      placeholderColor: StyleSheet.flatten<TextStyle>([styles.placeholder]).color as
        | string
        | undefined,
      value,
      query,
      setQuery: setQueryState,
      isOpen,
      isDisabled,
      isInvalid,
      open,
      close,
      toggle,
      select,
      anchor,
      setAnchor,
      labelFor,
      registerLabel,
    }
  }, [
    styles,
    pressed,
    tint,
    own,
    ownTint,
    value,
    query,
    setQueryState,
    isOpen,
    isDisabled,
    isInvalid,
    open,
    close,
    toggle,
    select,
    anchor,
    labelFor,
    registerLabel,
  ])

  return <AutocompleteProvider value={context}>{children}</AutocompleteProvider>
}

Autocomplete.displayName = 'XAUI.Autocomplete.Root'

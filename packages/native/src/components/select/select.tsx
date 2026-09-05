import { useCallback, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle } from 'react-native'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useControllableState, useLabelRegistry } from './select.hook'
import { SelectProvider } from './select.context'
import { selectRecipe } from './select.recipe'
import type { SelectAnchor, SelectProps } from './select.type'

/**
 * A field that opens a list.
 *
 * ```tsx
 * <Select defaultValue="fr" onValueChange={setLocale}>
 *   <Select.Trigger>
 *     <Select.Value placeholder="Choisir une langue" />
 *     <Select.Indicator />
 *   </Select.Trigger>
 *   <Select.Overlay />
 *   <Select.Content>
 *     <Select.Item value="fr" label="Français">
 *       <Select.ItemLabel>Français</Select.ItemLabel>
 *       <Select.ItemIndicator />
 *     </Select.Item>
 *   </Select.Content>
 * </Select>
 * ```
 *
 * **The root renders no node.** It resolves the styles every slot reads and holds the two
 * pieces of state — what is open and what is chosen. `Select.Overlay` and
 * `Select.Content` render into the nearest `PortalHost` rather than where they are
 * written, so their position in the JSX says when they exist, not where they appear.
 */
export function Select({
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
  isDisabled = false,
  isInvalid = false,
}: SelectProps) {
  const theme = useXAUITheme()
  const { labelFor, registerLabel } = useLabelRegistry()
  const [anchor, setAnchor] = useState<SelectAnchor | null>(null)

  const [value, setValue] = useControllableState({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  })

  const [isOpen = false, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const selection = {
    variant,
    size,
    radius,
    isOpen: isOpen ? ('true' as const) : undefined,
    isInvalid: isInvalid ? ('true' as const) : undefined,
  }

  // Two resolutions, not one. The trigger and a row each own a press state the root
  // cannot see, so the root resolves both faces and each slot picks — which keeps R5
  // intact without a slot ever touching the recipe. The second call is a cache hit.
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

  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen])

  const select = useCallback(
    (next: string, label?: string) => {
      if (label !== undefined) registerLabel(next, label)
      setValue(next)
      setOpen(false)
    },
    [registerLabel, setValue, setOpen]
  )

  const context = useMemo(() => {
    const indicator = StyleSheet.flatten<TextStyle>([
      styles.indicator,
      tint?.indicator,
    ])
    const itemLabel = StyleSheet.flatten<TextStyle>([styles.itemLabel])

    return {
      triggerStyle: tint ? [styles.trigger, tint.trigger] : styles.trigger,
      triggerPressedStyle: pressed.trigger,
      valueStyle: tint ? [styles.value, tint.value] : styles.value,
      placeholderStyle: styles.placeholder,
      indicatorStyle: styles.indicator,
      overlayStyle: styles.overlay,
      contentStyle: styles.content,
      labelStyle: styles.label,
      itemStyle: styles.item,
      itemPressedStyle: pressed.item,
      itemLabelStyle: styles.itemLabel,
      itemDescriptionStyle: styles.itemDescription,
      itemIndicatorStyle: styles.itemIndicator,
      glyph: {
        size: indicator.fontSize,
        // `ColorValue` also covers the platform's opaque colours, which `Icon` cannot
        // hand to a third-party component expecting a string.
        color: typeof indicator.color === 'string' ? indicator.color : undefined,
      },
      // The check reads the row's own colour rather than the chevron's: it belongs to the
      // list, and the chevron belongs to the field.
      checkColor: typeof itemLabel.color === 'string' ? itemLabel.color : undefined,
      value,
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
    value,
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

  return <SelectProvider value={context}>{children}</SelectProvider>
}

Select.displayName = 'XAUI.Select.Root'

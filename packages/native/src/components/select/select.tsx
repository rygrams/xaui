import { forwardRef, useCallback, useId, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useControllableState } from '../../hooks/use-controllable-state'
import { textFieldRecipe } from '../text-field/text-field.recipe'
import { useLabelRegistry } from './select.hook'
import { SelectProvider } from './select.context'
import { selectRecipe } from './select.recipe'
import type { SelectAnchor, SelectProps } from './select.type'

/**
 * A field that opens a list.
 *
 * ```tsx
 * <Select defaultValue="fr" onValueChange={setLocale}>
 *   <Select.Label>Langue</Select.Label>
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
 *   <Select.Description>Celle de l'interface.</Select.Description>
 * </Select>
 * ```
 *
 * **The root is the column, not the field** — the `TextField`'s shape, and the
 * `Autocomplete`'s: a `View` stacking `Select.Label`, the trigger and
 * `Select.Description` / `.Error` with one `gap`, so JSX order is screen order. It is the
 * column and the help lines that make this a field on a form rather than a button that
 * opens a list, and they are the `TextField`'s token for token — a text field and a
 * select on the same form read as one control.
 *
 * `Select.Trigger` is the field, and it keeps its own `ref`: it is the node the panel
 * measures and the node a screen reader stops on. `Select.Overlay` and `Select.Content`
 * render into the nearest `PortalHost` rather than where they are written, so their
 * position in the JSX says when they exist, not where they appear — and they add nothing
 * to the column.
 *
 * The heading over a run of rows *inside* the panel is `Select.GroupLabel`. It was
 * `Select.Label` until the field grew a label of its own.
 */
export const Select = forwardRef<View, SelectProps>(function Select(
  {
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
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  // R14 — what is left is `View`'s own props plus whatever style keys the caller wrote.
  const [styleProps, rest] = useStyleProps(props)
  const { labelFor, registerLabel } = useLabelRegistry()
  const [anchor, setAnchor] = useState<SelectAnchor | null>(null)

  const id = useId()
  const labelId = `${id}-label`
  const descriptionId = `${id}-description`

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
  //
  // **`disabled` is the column's, not the trigger's.** Both recipes answer it with an
  // opacity, and a dimmed trigger inside a dimmed column multiplies the two — a quarter
  // of the opacity where the theme asked for half. The column carries it once, which is
  // also what dims the label and the hint with the field they belong to.
  const styles = selectRecipe.resolve({ theme, selection })
  const pressed = selectRecipe.resolve({
    theme,
    selection,
    states: { pressed: true },
  })

  const tint = color ? selectRecipe.tint({ theme, color, selection }) : undefined

  // The column, the label and the help lines are the `TextField`'s, token for token — a
  // select and a text field stacked in one form read as one control, which is why the
  // root composes them rather than owning a second table. The `Autocomplete` and the
  // `DatePicker` borrow the same three slots for the same reason.
  const labelled = textFieldRecipe.resolve({
    theme,
    selection: { size, isInvalid: isInvalid ? ('true' as const) : undefined },
    states: { disabled: isDisabled },
  })

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
    // A tint repaints the trigger's fill, and `fieldPlaceholder` was chosen against the
    // theme's field colour rather than against an arbitrary one — on a purple trigger it
    // is unreadable. The tint's own foreground is what stays legible on it, and it
    // reaches the placeholder only here: the role does not exist in the recipe's
    // vocabulary, and an untinted select must keep the token the `TextField` uses.
    const tintedPlaceholder = tint
      ? StyleSheet.flatten<TextStyle>([tint.value]).color
      : undefined

    return {
      triggerStyle: tint ? [styles.trigger, tint.trigger] : styles.trigger,
      triggerPressedStyle: pressed.trigger,
      valueStyle: tint ? [styles.value, tint.value] : styles.value,
      placeholderStyle: tintedPlaceholder
        ? [styles.placeholder, { color: tintedPlaceholder }]
        : styles.placeholder,
      indicatorStyle: styles.indicator,
      overlayStyle: styles.overlay,
      contentStyle: styles.content,
      groupLabelStyle: styles.groupLabel,
      labelStyle: labelled.label,
      descriptionStyle: labelled.description,
      errorStyle: labelled.error,
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
      labelId,
      descriptionId,
    }
  }, [
    styles,
    pressed,
    tint,
    labelled,
    labelId,
    descriptionId,
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

  // Most general to most specific: the recipe's column, the style props, then `style`.
  const columnStyle = [labelled.root, styleProps, style]

  // No `accessibilityRole` on the column: the control is the trigger inside it, and a
  // role here would give a screen reader a second element to stop on before reaching it.
  const column = asChild ? (
    // R12 — the caller's element is the column.
    <Slot ref={ref} {...rest} style={columnStyle}>
      {children}
    </Slot>
  ) : (
    <View ref={ref} {...rest} style={columnStyle}>
      {children}
    </View>
  )

  return <SelectProvider value={context}>{column}</SelectProvider>
})

Select.displayName = 'XAUI.Select.Root'

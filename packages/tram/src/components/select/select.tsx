import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '@xaui/native'
import { Slot, useAnimationDisabled, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { NO_ROW, cascadeRank } from '../../system/list-picker'
import type { RowSpan } from '../../system/list-picker'
import { lineInk } from '../../system/line-ink'
import { colorOf, pointsOf } from '../../system/style-values'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { textFieldRecipe } from '../text-field/text-field.recipe'
import { SelectProvider } from './select.context'
import { createListSlot, useLabelRegistry, useUnfolding } from './select.hook'
import { ORDER_SEPARATOR } from './select.items'
import { DEFAULT_SIZE, selectRecipe } from './select.recipe'
import type { SelectListing, SelectProps } from './select.type'

const NO_LISTING: SelectListing = { mode: 'inline', order: '' }

/**
 * A field that opens a list — the Native `Select`'s API, drawn as the Metro list picker:
 * the `TextField`'s box, which unfolds in place for a few choices and pushes what is
 * under it, or opens a page of its own for more.
 *
 * ```tsx
 * <Select defaultValue="fr" onValueChange={setLocale}>
 *   <Select.Label>langue</Select.Label>
 *   <Select.Trigger>
 *     <Select.Value placeholder="choisir une langue" />
 *     <Select.Indicator />
 *   </Select.Trigger>
 *   <Select.Overlay />
 *   <Select.Content>
 *     <Select.Item value="fr">français</Select.Item>
 *     <Select.Item value="en">english</Select.Item>
 *   </Select.Content>
 *   <Select.Description>celle de l'interface.</Select.Description>
 * </Select>
 * ```
 *
 * The root is the column, not the field. Open, the border is the accent read as ink and
 * the current choice is written in that same ink; nothing else changes colour. A choice
 * is felt through `TramProvider`'s `onHaptic`, when the app gave it one.
 */
export const SelectRoot = forwardRef<View, SelectProps>(function Select(
  {
    children,
    size = DEFAULT_SIZE,
    radius,
    accent,
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
  const [styleProps, rest] = useStyleProps(props)
  const isStill = useAnimationDisabled()
  const haptic = useTramHaptic()
  const { labelFor, registerLabel } = useLabelRegistry()

  const [listing, setListing] = useState(NO_LISTING)
  const [title, setTitle] = useState<string>()
  const [rowHeight, setRowHeight] = useState(0)
  const [listHeight, setListHeight] = useState(0)
  const [boxTop, setBoxTop] = useState<number | null>(null)
  const [inlineList] = useState(createListSlot)
  const dismissable = useRef(true)
  const spans = useRef(new Map<string, RowSpan>())

  const id = useId()
  const labelId = `${id}-label`
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`
  const listId = `${id}-list`

  const [value, setValue] = useControllableState<string | undefined>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange as ((next: string | undefined) => void) | undefined,
  })

  const [wantsOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  // A disabled select does not open, whoever asks.
  const isOpen = wantsOpen && !isDisabled
  const { mode } = listing

  const motion = useUnfolding({ isOpen, isInline: mode === 'inline', isStill })
  const { current } = motion

  // Where the folded list is drawn from: its current choice lies over the field's value.
  // Declared above nothing that moves — it has to be set before the box starts to fold.
  const chosen = useRef(value)
  chosen.current = value
  useEffect(() => {
    current.value = (value !== undefined && spans.current.get(value)) || NO_ROW
  }, [value, current])

  const reportSpan = useCallback(
    (item: string, span: RowSpan) => {
      spans.current.set(item, span)
      if (item === chosen.current) current.value = span
    },
    [current]
  )

  // The column, the label, the help lines and the box are the `TextField`'s, token for
  // token: a select and a text field stacked in one form read as one control.
  const field = textFieldRecipe.resolve({
    theme,
    selection: {
      size,
      radius,
      isInvalid: isInvalid ? ('true' as const) : undefined,
    },
    states: { disabled: isDisabled },
  })
  const styles = selectRecipe.resolve({
    theme,
    selection: { size, mode },
    states: { disabled: isDisabled },
  })

  // A border in the accent is a line, so a named accent is its ink on the ground.
  const ink = isDisabled
    ? undefined
    : lineInk({ accent, color }, theme.colors.background)
  const reach = touchReach(theme.controlHeights[size])

  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => setOpen(!wantsOpen), [wantsOpen, setOpen])

  const select = useCallback(
    (next: string, label?: string) => {
      if (label !== undefined) registerLabel(next, label)
      haptic('selection')
      setValue(next)
      setOpen(false)
    },
    [registerLabel, haptic, setValue, setOpen]
  )

  const { order } = listing
  const rankOf = useCallback(
    (item: string) => {
      const values = order.split(ORDER_SEPARATOR)

      const current = value === undefined ? -1 : values.indexOf(value)

      return cascadeRank(values.indexOf(item), current)
    },
    [order, value]
  )

  const context = useMemo(() => {
    const box = StyleSheet.flatten<TextStyle>(field.field)
    const focus = StyleSheet.flatten<TextStyle>(field.focus)
    const indicator = StyleSheet.flatten<TextStyle>(styles.indicator)
    const currentText = StyleSheet.flatten<TextStyle>(styles.current)

    const lineWidth = pointsOf(box.borderWidth)
    const atRest = colorOf(box, 'borderColor') ?? theme.colors.fieldBorder
    // An error outranks the accent on the line; the current choice keeps its accent.
    const opened = isInvalid ? colorOf(focus, 'borderColor') : ink
    const currentInk = ink ?? colorOf(currentText, 'color')

    // What the field's text is set in — the value's, and an unfolded choice's.
    const type = {
      fontSize: box.fontSize,
      fontFamily: box.fontFamily,
      fontWeight: box.fontWeight,
    }
    const inset = { paddingHorizontal: box.paddingHorizontal }
    const isInline = mode === 'inline'

    return {
      boxStyle: {
        backgroundColor: box.backgroundColor,
        borderWidth: lineWidth,
        borderRadius: box.borderRadius,
        borderColor: atRest,
        overflow: 'hidden' as const,
      },
      triggerStyle: [
        styles.trigger,
        inset,
        // The row and the line around it add up to the `TextField`'s height.
        { minHeight: pointsOf(box.minHeight) - lineWidth * 2 },
      ],
      valueStyle: [{ ...type, color: box.color }, styles.value],
      placeholderStyle: styles.placeholder,
      overlayStyle: styles.overlay,
      contentStyle: styles.content,
      pageStyle: styles.page,
      titleStyle: styles.title,
      groupLabelStyle: isInline ? [styles.groupLabel, inset] : styles.groupLabel,
      labelStyle: field.label,
      descriptionStyle: field.description,
      errorStyle: field.error,
      itemStyle: isInline ? [styles.item, inset] : styles.item,
      itemLabelStyle: isInline ? [type, styles.itemLabel] : styles.itemLabel,
      itemDescriptionStyle: styles.itemDescription,
      itemIndicatorStyle: styles.itemIndicator,
      currentStyle: ink ? { color: ink } : styles.current,
      itemDisabledStyle: styles.itemDisabled,
      glyph: { size: indicator.fontSize, color: colorOf(indicator, 'color') },
      currentInk,
      border: {
        rest: atRest,
        open: opened ?? colorOf(focus, 'borderColor') ?? atRest,
      },
      lineWidth,
      reach,
      value,
      isOpen,
      isDisabled,
      isInvalid,
      isStill,
      mode,
      open,
      close,
      toggle,
      select,
      labelFor,
      registerLabel,
      title,
      setTitle,
      setListing,
      rankOf,
      cascadeAfter: 0,
      reportSpan,
      inlineList,
      motion,
      rowHeight,
      setRowHeight,
      listHeight,
      setListHeight,
      boxTop,
      setBoxTop,
      dismissable,
      labelId,
      descriptionId,
      errorId,
      listId,
    }
  }, [
    field,
    styles,
    theme,
    ink,
    reach,
    value,
    isOpen,
    isDisabled,
    isInvalid,
    isStill,
    mode,
    open,
    close,
    toggle,
    select,
    labelFor,
    registerLabel,
    title,
    rankOf,
    reportSpan,
    inlineList,
    motion,
    rowHeight,
    listHeight,
    boxTop,
    labelId,
    descriptionId,
    errorId,
    listId,
  ])

  // Under `asChild` the caller's element is the column: `Slot` merges these into it. No
  // role on it either way — the control is the trigger inside.
  const Root = asChild ? Slot : View

  return (
    <SelectProvider value={context}>
      {/* Most general to most specific: the cached recipe, the style props, `style`. */}
      <Root ref={ref} {...rest} style={[field.root, styleProps, style]}>
        {children}
      </Root>
    </SelectProvider>
  )
})

SelectRoot.displayName = 'XAUI.Tram.Select.Root'

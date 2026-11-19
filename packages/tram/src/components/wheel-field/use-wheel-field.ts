import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { useControllableState } from '@xaui/native'
import { useAnimationDisabled } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { useTramMotion } from '../../motion/use-tram-motion'
import { lineInk } from '../../system/line-ink'
import { colorOf, pointsOf } from '../../system/style-values'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { textFieldRecipe } from '../text-field/text-field.recipe'
import {
  BAR_BUTTON,
  DEFAULT_SIZE,
  barPad,
  pageMargin,
  wheelFieldRecipe,
} from './wheel-field.recipe'
import type { WheelFieldContextValue, WheelFieldOwnProps } from './wheel-field.type'

type WheelFieldOptions = Omit<
  WheelFieldOwnProps,
  'children' | 'asChild' | 'locale' | 'formatOptions'
> & {
  /** The chosen moment, as the field reads it. Stable: the label is memoized on it. */
  read: (value: Date) => string
  /**
   * What the wheels stand on when nothing is chosen — today, now. Called as the page
   * opens, so "now" is the moment it opened. Stable.
   */
  seed: () => Date
  /**
   * What the picker accepts, from any moment the wheels make: the bounds, the minute
   * step. A moment it changes is the wheel's cue to turn back. Stable.
   */
  settle: (moment: Date) => Date
}

/**
 * The half of a picker that is not its wheels: the value and the draft, the open state,
 * the field's styles — the `TextField`'s box — and the page's.
 *
 * **Nothing is chosen while the wheels turn.** They stand on a draft, made from the value
 * as the page opens; ✓ makes the draft the value and closes the page, ✕ and the system's
 * back drop it. `onValueChange` fires on ✓ alone.
 */
export function useWheelFieldRoot({
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
  read,
  seed,
  settle,
}: WheelFieldOptions) {
  const theme = useXAUITheme()
  const isStill = useAnimationDisabled()
  const animate = useTramMotion()
  const haptic = useTramHaptic()
  const [title, setTitle] = useState<string>()
  const dismissable = useRef(true)

  const id = useId()
  const labelId = `${id}-label`
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`
  const pageId = `${id}-page`

  const [value, setValue] = useControllableState<Date | undefined>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange as ((next: Date | undefined) => void) | undefined,
  })

  const [wantsOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  // A disabled picker does not open, whoever asks.
  const isOpen = wantsOpen && !isDisabled

  // What the wheels stand on until one is turned: the value, or the seed, settled. Read
  // again at each opening — `isOpen` is what renews "now".
  const resting = useMemo(
    () => settle(value ?? seed()),
    [value, seed, settle, isOpen]
  )
  const [turned, setTurned] = useState<Date>()
  const draft = turned ?? resting

  // A page closed by any road — ✓, ✕, back, a controlled `isOpen` — reopens on the value.
  useEffect(() => {
    if (!isOpen) setTurned(undefined)
  }, [isOpen])

  const setDraft = useCallback((next: Date) => setTurned(settle(next)), [settle])

  // The field's line, between the page's ink and the accent's, on the `navigation` spring.
  const line = useSharedValue(isOpen ? 1 : 0)
  useEffect(() => {
    const to = isOpen ? 1 : 0
    line.value = isStill ? to : animate(to, 'navigation')
  }, [isOpen, isStill, animate, line])

  const open = useCallback(() => setOpen(true), [setOpen])
  const cancel = useCallback(() => setOpen(false), [setOpen])
  const confirm = useCallback(() => {
    haptic('selection')
    setValue(draft)
    setOpen(false)
  }, [haptic, draft, setValue, setOpen])

  const label = useMemo(
    () => (value === undefined ? undefined : read(value)),
    [value, read]
  )

  // The column, the label, the help lines and the box are the `TextField`'s, token for
  // token — as the `Select`'s are.
  const field = textFieldRecipe.resolve({
    theme,
    selection: {
      size,
      radius,
      isInvalid: isInvalid ? ('true' as const) : undefined,
    },
    states: { disabled: isDisabled },
  })
  const styles = wheelFieldRecipe.resolve({
    theme,
    selection: { size },
    states: { disabled: isDisabled },
  })

  // A line in the accent is read, so a named accent is its ink on the ground.
  const ink = isDisabled
    ? undefined
    : lineInk({ accent, color }, theme.colors.background)
  const reach = touchReach(theme.controlHeights[size])

  const wheel = useMemo(
    () => ({ size, accent, color, isDisabled }),
    [size, accent, color, isDisabled]
  )

  const context = useMemo<WheelFieldContextValue>(() => {
    const box = StyleSheet.flatten<TextStyle>(field.field)
    const focus = StyleSheet.flatten<TextStyle>(field.focus)
    const indicator = StyleSheet.flatten<TextStyle>(styles.indicator)
    const lineWidth = pointsOf(box.borderWidth)
    const atRest = colorOf(box, 'borderColor') ?? theme.colors.fieldBorder
    // An error outranks the accent on the line.
    const opened = isInvalid ? colorOf(focus, 'borderColor') : ink

    return {
      boxStyle: {
        backgroundColor: box.backgroundColor,
        borderWidth: lineWidth,
        borderRadius: box.borderRadius,
        borderColor: atRest,
      },
      triggerStyle: [
        styles.trigger,
        { paddingHorizontal: box.paddingHorizontal },
        // The row and the line around it add up to the `TextField`'s height.
        { minHeight: pointsOf(box.minHeight) - lineWidth * 2 },
      ],
      valueStyle: [
        {
          fontSize: box.fontSize,
          fontFamily: box.fontFamily,
          fontWeight: box.fontWeight,
          color: box.color,
        },
        styles.value,
      ],
      placeholderStyle: styles.placeholder,
      labelStyle: field.label,
      descriptionStyle: field.description,
      errorStyle: field.error,
      pageStyle: styles.page,
      titleStyle: styles.title,
      bodyStyle: styles.body,
      barStyle: styles.bar,
      barItemStyle: styles.barItem,
      barButtonStyle: styles.barButton,
      barLabelStyle: styles.barLabel,
      glyph: { size: indicator.fontSize, color: colorOf(indicator, 'color') },
      barGlyph: { size: BAR_BUTTON.glyph, color: theme.colors.surfaceForeground },
      pageInset: { top: pageMargin(theme), bottom: barPad(theme) },
      border: {
        rest: atRest,
        open: opened ?? colorOf(focus, 'borderColor') ?? atRest,
      },
      line,
      reach,
      barReach: touchReach(BAR_BUTTON.diameter),
      label,
      draft,
      setDraft,
      wheel,
      isOpen,
      isDisabled,
      isInvalid,
      isStill,
      open,
      cancel,
      confirm,
      title,
      setTitle,
      dismissable,
      labelId,
      descriptionId,
      errorId,
      pageId,
    }
  }, [
    field,
    styles,
    theme,
    ink,
    isInvalid,
    line,
    reach,
    label,
    draft,
    setDraft,
    wheel,
    isOpen,
    isDisabled,
    isStill,
    open,
    cancel,
    confirm,
    title,
    labelId,
    descriptionId,
    errorId,
    pageId,
  ])

  return { context, rootStyle: field.root }
}

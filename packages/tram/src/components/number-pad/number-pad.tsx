import { forwardRef, useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import {
  NUMBER_PAD_ROWS,
  NUMBER_PAD_ZERO,
  appendPadKey,
  isPadComplete,
  removePadKey,
  useControllableState,
} from '@xaui/native'
import { useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { colorOf } from '../../system/style-values'
import { NumberPadBackspace } from './number-pad-backspace'
import { NumberPadKey } from './number-pad-key'
import { NumberPadProvider } from './number-pad.context'
import { DEFAULT_SIZE, numberPadRecipe } from './number-pad.recipe'
import type { NumberPadProps } from './number-pad.type'

/**
 * A keypad for a code or an amount — the Native `NumberPad`'s API, drawn as the Metro
 * dialer: the digits alone on the ground, light and centred, with no key around them.
 *
 * ```tsx
 * <NumberPad maxLength={4} onChangeText={setCode} onComplete={unlock} />
 *
 * <NumberPad value={amount} onChangeText={setAmount}>
 *   <NumberPad.Action onPress={() => insert(',')}>
 *     <NumberPad.Label>,</NumberPad.Label>
 *   </NumberPad.Action>
 * </NumberPad>
 * ```
 *
 * **The digits are data, not markup**: `1` to `9` and the `0` are drawn by the root, the
 * free corner beside the `0` is the one cell a caller composes. The edits — append within
 * `maxLength`, delete the last, complete — are Native's, from its root entrypoint.
 *
 * A press shrinks the key a little and springs back, and is felt as a `press` through
 * `TramProvider`'s `onHaptic`. It changes no colour. A long press on the backspace empties
 * the value. The field the value is shown in is the screen's.
 */
export const NumberPadRoot = forwardRef<View, NumberPadProps>(function NumberPad(
  {
    children,
    size = DEFAULT_SIZE,
    value: controlledValue,
    defaultValue = '',
    onChangeText,
    onComplete,
    maxLength,
    isDisabled = false,
    accessibilityRole = 'none',
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const [value, setValue] = useControllableState({
    value: controlledValue,
    defaultValue,
    onChange: onChangeText,
  })

  const styles = numberPadRecipe.resolve({
    theme,
    selection: { size },
    states: { disabled: isDisabled },
  })

  const insert = useCallback(
    (text: string) => {
      const next = appendPadKey({ value, insert: text, maxLength })
      if (next === value) return
      setValue(next)
      if (isPadComplete(next, maxLength)) onComplete?.(next)
    },
    [value, maxLength, setValue, onComplete]
  )

  const backspace = useCallback(() => {
    if (value === '') return
    setValue(removePadKey(value))
  }, [value, setValue])

  const clear = useCallback(() => {
    if (value === '') return
    setValue('')
  }, [value, setValue])

  const context = useMemo(() => {
    const glyph = (flat: TextStyle) => ({
      size: flat.fontSize,
      color: colorOf(flat, 'color'),
    })

    return {
      rowStyle: styles.row,
      keyStyle: styles.key,
      labelStyle: styles.label,
      ghostLabelStyle: styles.ghostLabel,
      icon: glyph(StyleSheet.flatten<TextStyle>(styles.icon)),
      ghostIcon: glyph(StyleSheet.flatten<TextStyle>(styles.ghostIcon)),
      insert,
      backspace,
      clear,
      value,
      maxLength,
      isDisabled,
    }
  }, [styles, insert, backspace, clear, value, maxLength, isDisabled])

  return (
    <NumberPadProvider value={context}>
      <View
        ref={ref}
        accessibilityRole={accessibilityRole}
        {...rest}
        style={[styles.root, styleProps, style]}
      >
        {NUMBER_PAD_ROWS.map(row => (
          <View key={row.join('')} style={styles.row}>
            {row.map(digit => (
              <NumberPadKey key={digit} value={digit} />
            ))}
          </View>
        ))}
        <View style={styles.row}>
          {/* The free corner. Empty, it is still a cell — without it the `0` slides to the
              start of its row and stops being the middle column. */}
          {children ?? <View style={sheet.spacer} />}
          <NumberPadKey value={NUMBER_PAD_ZERO} />
          <NumberPadBackspace />
        </View>
      </View>
    </NumberPadProvider>
  )
})

const sheet = StyleSheet.create({ spacer: { flex: 1 } })

NumberPadRoot.displayName = 'XAUI.Tram.NumberPad.Root'

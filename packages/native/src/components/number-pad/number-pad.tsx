import { forwardRef, useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { NumberPadBackspace } from './number-pad-backspace'
import { NumberPadKey } from './number-pad-key'
import { NumberPadProvider } from './number-pad.context'
import { numberPadRecipe } from './number-pad.recipe'
import { numberPadSheet } from './number-pad.style'
import type { NumberPadProps } from './number-pad.type'
import {
  NUMBER_PAD_ROWS,
  NUMBER_PAD_ZERO,
  appendKey,
  isComplete,
  removeLast,
} from './number-pad.utils'

/**
 * The keypad a PIN, a code and an amount are typed on.
 *
 * ```tsx
 * <NumberPad maxLength={4} onComplete={unlock} />
 *
 * <NumberPad maxLength={4} value={pin} onChangeText={setPin}>
 *   <NumberPad.Action onPress={faceId} accessibilityLabel="Unlock with Face ID">
 *     <NumberPad.Icon as={FaceIdIcon} color={theme.colors.accent} />
 *   </NumberPad.Action>
 * </NumberPad>
 * ```
 *
 * **The grid is data, not markup.** `1` through `9`, the `0` and the backspace are not a
 * decision a caller makes, so the root renders them — eleven hand-written cells is a layout
 * that disagrees with itself the moment one of them is edited. What *is* composed is the one
 * free corner of the bottom row, and that is what `children` is.
 *
 * **The pad owns the value as one string**, controlled or not, and clamps it to `maxLength`:
 * a press past the limit changes nothing at all, so `onChangeText` does not fire and a full
 * PIN cannot be completed twice by leaning on a key.
 *
 * **It draws no display.** What the value looks like is the screen's — an `InputOTP`'s boxes,
 * a row of dots, an amount in a `Typography`. A pad that also rendered the value would be
 * two components that have to agree on a string.
 *
 * `useNumberPad()` publishes `insert`, `backspace` and `clear`, so a control beside the pad
 * drives it with no state of its own.
 */
export const NumberPadRoot = forwardRef<View, NumberPadProps>(function NumberPad(
  {
    children,
    variant,
    size,
    radius,
    color,
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

  const selection = { variant, size, radius }
  const states = { disabled: isDisabled }

  const styles = numberPadRecipe.resolve({ theme, selection, states })
  // A cell owns its own press state, which the root cannot see, so the root resolves both
  // faces and each cell picks. R5 stays intact: no slot touches the recipe. Both hit the
  // cache, so a pad of eleven keys costs what a pad of two would.
  const pressed = numberPadRecipe.resolve({
    theme,
    selection,
    states: { ...states, pressed: true },
  })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  const tint = color
    ? numberPadRecipe.tint({ theme, color, selection, states })
    : undefined
  const tintPressed = color
    ? numberPadRecipe.tint({
        theme,
        color,
        selection,
        states: { ...states, pressed: true },
      })
    : undefined

  const insert = useCallback(
    (text: string) => {
      const next = appendKey({ value, insert: text, maxLength })
      if (next === value) return

      setValue(next)
      if (isComplete(next, maxLength)) onComplete?.(next)
    },
    [value, maxLength, setValue, onComplete]
  )

  const backspace = useCallback(() => {
    if (value === '') return
    setValue(removeLast(value))
  }, [value, setValue])

  const clear = useCallback(() => {
    if (value === '') return
    setValue('')
  }, [value, setValue])

  const context = useMemo(() => {
    const glyph = (...layers: (TextStyle | undefined)[]) => {
      const flat = StyleSheet.flatten<TextStyle>(layers)
      return {
        size: flat.fontSize,
        // `ColorValue` also covers the platform's opaque colours, which `Icon` cannot hand
        // to a third-party component expecting a string.
        color: typeof flat.color === 'string' ? flat.color : undefined,
      }
    }

    return {
      rowStyle: styles.row,
      keyStyle: tint ? [styles.key, tint.key] : styles.key,
      keyPressedStyle: tintPressed
        ? [pressed.key, tintPressed.key]
        : (pressed.key as typeof styles.key),
      labelStyle: tint ? [styles.label, tint.label] : styles.label,
      ghostStyle: styles.ghost,
      ghostPressedStyle: pressed.ghost,
      ghostLabelStyle: styles.ghostLabel,
      icon: glyph(styles.icon, tint?.icon),
      // Never tinted, deliberately: the bare corners read the page's foreground, because a
      // glyph with no ground of its own has nothing tinted to read against.
      ghostIcon: glyph(styles.ghostIcon),
      insert,
      backspace,
      clear,
      value,
      maxLength,
      isDisabled,
    }
  }, [
    styles,
    pressed,
    tint,
    tintPressed,
    insert,
    backspace,
    clear,
    value,
    maxLength,
    isDisabled,
  ])

  // The resolution order of §2 ter, most general to most specific: the cached recipe, the
  // uncached tint, the style props, then `style` — the last word.
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  return (
    <NumberPadProvider value={context}>
      <View
        ref={ref}
        // There is no keypad role in React Native, and inventing one from `toolbar` or
        // `list` would have a screen reader announce the box as something it is not. The
        // cells carry `keyboardkey`, which is the trait that matters.
        accessibilityRole={accessibilityRole}
        {...rest}
        style={rootStyle}
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
          {children ?? <View style={numberPadSheet.spacer} />}
          <NumberPadKey value={NUMBER_PAD_ZERO} />
          <NumberPadBackspace />
        </View>
      </View>
    </NumberPadProvider>
  )
})

NumberPadRoot.displayName = 'XAUI.NumberPad.Root'

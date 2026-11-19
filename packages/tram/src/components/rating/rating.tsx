import { forwardRef, useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { snapRating, useControllableState } from '@xaui/native'
import { useStyleProps, warnDev } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { flatPaint } from '../../system/flat-paint'
import { colorOf } from '../../system/style-values'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { RatingItem } from './rating-item'
import { RatingProvider } from './rating.context'
import { DEFAULT_SIZE, RATING_GEOMETRY, ratingRecipe } from './rating.recipe'
import type { RatingProps } from './rating.type'

/**
 * A row of marks, given or shown — the Native `Rating`'s API, drawn in Metro: flat marks,
 * the given ones in the accent and the rest in a faint grey.
 *
 * ```tsx
 * <Rating value={score} onValueChange={setScore} />
 *
 * <Rating value={4.3} isReadOnly size="sm" />
 *
 * <Rating value={score} onValueChange={setScore} precision={0.5} accent="amber">
 *   <Rating.Icon as={HeartIcon} />
 * </Rating>
 * ```
 *
 * **One component for the input and the average**: a mark's fill is a fraction, so 4.3
 * shows three tenths of the fifth. `precision` governs presses only. The fill and the snap
 * are Native's, from its root entrypoint.
 *
 * A press shrinks the mark a little and springs back, and the fill changes at once: a
 * given mark does not grow, glow or bounce. Each change is felt as a `selection`, through
 * `TramProvider`'s `onHaptic`.
 */
export const RatingRoot = forwardRef<View, RatingProps>(function Rating(
  {
    children,
    size = DEFAULT_SIZE,
    accent,
    color,
    max = 5,
    value: controlledValue,
    defaultValue = 0,
    onValueChange,
    precision = 1,
    isReadOnly = false,
    isDisabled = false,
    accessibilityRole = 'none',
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const haptic = useTramHaptic()
  const [styleProps, rest] = useStyleProps(props)
  const [value, setValue] = useControllableState({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  })

  const styles = ratingRecipe.resolve({
    theme,
    selection: { size },
    states: { disabled: isDisabled },
  })
  // A given mark is a fill, so a named accent is its true colour.
  const fill = isDisabled ? undefined : flatPaint({ accent, color })

  const select = useCallback(
    (index: number, ratio: number) => {
      if (isReadOnly || isDisabled) return

      const next = snapRating({ raw: index + ratio, precision, max })
      if (next === value) return
      haptic('selection')
      setValue(next)
    },
    [isReadOnly, isDisabled, precision, max, value, haptic, setValue]
  )

  const { mark } = RATING_GEOMETRY[size]
  // Up to 48 on every side: a neighbour's reach overlaps it, and the mark under the
  // finger reads the press as its own.
  const reach = touchReach(mark)

  const context = useMemo(() => {
    const glyph = StyleSheet.flatten<TextStyle>(styles.glyph)
    const filled = StyleSheet.flatten<TextStyle>([
      styles.glyphFill,
      fill ? { color: fill } : undefined,
    ])

    return {
      itemStyle: styles.item,
      glyphStyle: styles.glyph,
      glyphFillStyle: filled,
      icon: { size: mark, color: colorOf(glyph, 'color') },
      iconFill: { size: mark, color: colorOf(filled, 'color') },
      markSize: mark,
      reach,
      value,
      max,
      precision,
      select,
      isReadOnly,
      isDisabled,
    }
  }, [
    styles,
    fill,
    mark,
    reach,
    value,
    max,
    precision,
    select,
    isReadOnly,
    isDisabled,
  ])

  if (!Number.isInteger(max) || max < 1) {
    warnDev(
      `Tram Rating: \`max\` is ${max}, and it has to be a whole number of at least one — ` +
        'a row of marks cannot be a fraction of a mark long.'
    )
  }

  const count = Math.max(1, Math.floor(max))

  return (
    <RatingProvider value={context}>
      <View
        ref={ref}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={
          isReadOnly ? `${value} out of ${count}` : rest.accessibilityLabel
        }
        {...rest}
        style={[styles.root, styleProps, style]}
      >
        {Array.from({ length: count }, (_, index) => (
          <RatingItem key={index} index={index}>
            {children}
          </RatingItem>
        ))}
      </View>
    </RatingProvider>
  )
})

RatingRoot.displayName = 'XAUI.Tram.Rating.Root'

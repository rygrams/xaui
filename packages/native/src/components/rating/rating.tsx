import { forwardRef, useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { warnDev } from '../../utils/warn-dev'
import { RatingItem } from './rating-item'
import { RatingProvider } from './rating.context'
import { ratingRecipe } from './rating.recipe'
import type { RatingProps } from './rating.type'
import { snapValue } from './rating.utils'

/**
 * A row of marks, given or shown.
 *
 * ```tsx
 * <Rating value={score} onValueChange={setScore} />
 *
 * <Rating value={4.3} isReadOnly />
 *
 * <Rating value={score} onValueChange={setScore} precision={0.5}>
 *   <Rating.Icon as={HeartIcon} />
 * </Rating>
 * ```
 *
 * **One component for the input and the average.** The fill of each mark is a *fraction*,
 * so 4.3 shows three tenths of the fifth mark — a boolean per mark would have had to round
 * it, and rounding is exactly what an average must not do. `precision` governs input only.
 *
 * **The row is data, not markup.** `max` says how many marks there are, so the root renders
 * them; five hand-written marks is a row that disagrees with the prop the moment either
 * changes. `children` is therefore the **glyph**, written once and drawn once per mark.
 *
 * **There is no label.** A "4,3 sur 5" beside the row is a `Typography` in a `Row` — the
 * screen's, not the rating's (R1), and the moment it were a slot it would need an alignment,
 * a format and a language.
 *
 * **There is no `isClearable`**, deliberately. Tapping the mark you already chose to go back
 * to nothing is a gesture half the world's rating inputs have and half do not, so it is not
 * a default either way; a caller who wants it holds the value and compares
 * (`onValueChange={next => setScore(next === score ? 0 : next)}`), which is three words and
 * says which behaviour they picked.
 */
export const RatingRoot = forwardRef<View, RatingProps>(function Rating(
  {
    children,
    variant,
    size,
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
  const [styleProps, rest] = useStyleProps(props)
  const [value, setValue] = useControllableState({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  })

  const selection = { variant, size }
  const states = { disabled: isDisabled }

  const styles = ratingRecipe.resolve({ theme, selection, states })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  const tint = color
    ? ratingRecipe.tint({ theme, color, selection, states })
    : undefined

  const select = useCallback(
    (index: number, ratio: number) => {
      if (isReadOnly || isDisabled) return
      setValue(snapValue({ raw: index + ratio, precision, max }))
    },
    [isReadOnly, isDisabled, setValue, precision, max]
  )

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
    const fill = glyph(styles.glyphFill, tint?.glyphFill)

    return {
      itemStyle: styles.item,
      glyphStyle: styles.glyph,
      glyphFillStyle: tint ? [styles.glyphFill, tint.glyphFill] : styles.glyphFill,
      icon: glyph(styles.glyph),
      iconFill: fill,
      // The mark's width *is* its type size: a glyph is text, and the clip over it has to be
      // measured in the same unit the glyph was set in. Read off the resolved slot rather
      // than recomputed, so the recipe stays the only place a size is decided.
      markSize: fill.size ?? 0,
      value,
      max,
      precision,
      select,
      isReadOnly,
      isDisabled,
    }
  }, [styles, tint, value, max, precision, select, isReadOnly, isDisabled])

  // The resolution order of §2 ter: the cached recipe, the uncached tint, the style props,
  // then `style` — the last word.
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  // A row of zero marks is a component that renders nothing and looks like a layout bug; a
  // fractional one puts a half mark at the end of the row for ever.
  if (!Number.isInteger(max) || max < 1) {
    warnDev(
      `Rating: \`max\` is ${max}, and it has to be a whole number of at least one — a row ` +
        'of marks cannot be a fraction of a mark long.'
    )
  }

  const count = Math.max(1, Math.floor(max))

  return (
    <RatingProvider value={context}>
      <View
        ref={ref}
        // The marks carry the role — buttons when it is an input, an image when it is a
        // display. A role here would have a screen reader describe the box that holds them.
        accessibilityRole={accessibilityRole}
        accessibilityLabel={
          isReadOnly ? `${value} out of ${count}` : rest.accessibilityLabel
        }
        {...rest}
        style={rootStyle}
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

RatingRoot.displayName = 'XAUI.Rating.Root'

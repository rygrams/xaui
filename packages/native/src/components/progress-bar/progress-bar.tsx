import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { Slot, childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { progressFraction } from '../../utils/progress'
import { ProgressBarFill } from './progress-bar-fill'
import { ProgressBarHeader } from './progress-bar-header'
import { ProgressBarLabel } from './progress-bar-label'
import { ProgressBarTrack } from './progress-bar-track'
import { ProgressBarValue } from './progress-bar-value'
import { ProgressBarProvider } from './progress-bar.context'
import { progressBarRecipe } from './progress-bar.recipe'
import type { ProgressBarProps } from './progress-bar.type'

/**
 * How far along something is.
 *
 * ```tsx
 * <ProgressBar value={40}>Téléchargement</ProgressBar>
 *
 * <ProgressBar value={40}>
 *   <ProgressBar.Header>
 *     <ProgressBar.Label>Téléchargement</ProgressBar.Label>
 *     <ProgressBar.Value />
 *   </ProgressBar.Header>
 *   <ProgressBar.Track>
 *     <ProgressBar.Fill />
 *   </ProgressBar.Track>
 * </ProgressBar>
 * ```
 *
 * **There is no `isIndeterminate`.** An unknown duration is a `Spinner` — that is the
 * split the legacy `Indicator` was two components pretending to be one, and a bar that
 * runs a loop across itself is a spinner drawn as a line. This one reports a quantity, and
 * a quantity it does not have is not a state it should be able to be in.
 *
 * **The fill is a child of the rail, not a layer over it.** It grows to `fraction` of the
 * width, the rail clips it, and one `radius` therefore rounds both — an absolutely
 * positioned overlay would have needed its own corner and would have got it wrong at 100%.
 *
 * R3 — a text child becomes the label, **and the bar comes with it**: a progress bar with
 * no bar is a line of text. Written with no children at all it is the rail alone, which is
 * the form a list row wants.
 */
export const ProgressBarRoot = forwardRef<View, ProgressBarProps>(
  function ProgressBar(
    {
      children,
      variant,
      size,
      radius,
      color,
      value = 0,
      minValue = 0,
      maxValue = 100,
      formatOptions,
      isDisabled = false,
      asChild = false,
      accessibilityRole,
      accessibilityValue,
      style,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    // R14 — the vocabulary above is destructured first, which is what keeps `size` the
    // rail's thickness and `color` R7's tint rather than style props of the same name.
    const [styleProps, rest] = useStyleProps(props)

    const selection = { variant, size, radius }
    const styles = progressBarRecipe.resolve({
      theme,
      selection,
      states: { disabled: isDisabled },
    })
    // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
    // letting one into the key would grow the table with the colours users invent.
    const tint = color
      ? progressBarRecipe.tint({ theme, color, selection })
      : undefined

    // Every argument is a caller's number, so the clamp happens once here and the slots
    // read the result — a fill computing its own width from `value` would be a second
    // place for an out-of-range value to get in.
    const fraction = progressFraction(value, minValue, maxValue)

    const context = useMemo(
      () => ({
        headerStyle: styles.header,
        labelStyle: styles.label,
        valueStyle: styles.value,
        trackStyle: tint ? [styles.track, tint.track] : styles.track,
        fillStyle: tint ? [styles.fill, tint.fill] : styles.fill,
        fraction,
        value,
        formatOptions,
        isDisabled,
      }),
      [styles, tint, fraction, value, formatOptions, isDisabled]
    )

    const rootStyle = [styles.root, styleProps, style]

    // R3 — and the rail comes with it, for the reason above.
    const text = childrenToString(children)
    const content =
      text !== null ? (
        <>
          <ProgressBarHeader>
            <ProgressBarLabel>{text}</ProgressBarLabel>
            <ProgressBarValue />
          </ProgressBarHeader>
          <Bar />
        </>
      ) : (
        (children ?? <Bar />)
      )

    const rootProps = {
      // A screen reader reads the number, and it reads the caller's range rather than the
      // clamped fraction: "40 sur 100" is what the caller wrote, and rounding it to a
      // percentage here would be answering a question nobody asked.
      accessibilityRole: accessibilityRole ?? ('progressbar' as const),
      accessibilityValue: accessibilityValue ?? {
        min: minValue,
        max: maxValue,
        now: value,
      },
      ...rest,
    }

    return (
      <ProgressBarProvider value={context}>
        {asChild ? (
          <Slot ref={ref} {...rootProps} style={rootStyle}>
            {children}
          </Slot>
        ) : (
          <View ref={ref} {...rootProps} style={rootStyle}>
            {content}
          </View>
        )}
      </ProgressBarProvider>
    )
  }
)

ProgressBarRoot.displayName = 'XAUI.ProgressBar.Root'

/** The rail and what is filled of it — the two slots R3 supplies together or not at all. */
function Bar() {
  return (
    <ProgressBarTrack>
      <ProgressBarFill />
    </ProgressBarTrack>
  )
}

import { forwardRef, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
  Slot,
  childrenToString,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { flatPaint } from '../../system/flat-paint'
import { progressPlace } from '../../system/progress'
import { ProgressBarFill } from './progress-bar-fill'
import { ProgressBarHeader } from './progress-bar-header'
import { ProgressBarLabel } from './progress-bar-label'
import { ProgressBarTrack } from './progress-bar-track'
import { ProgressBarValue } from './progress-bar-value'
import { ProgressBarProvider } from './progress-bar.context'
import {
  DEFAULT_SIZE,
  PROGRESS_BAR_GEOMETRY,
  progressBarRecipe,
} from './progress-bar.recipe'
import type { ProgressBarProps } from './progress-bar.type'

/**
 * How far along something is — the Native `ProgressBar`'s API, drawn in Metro: a bar of
 * soft grey with nearly square corners, filled with the accent.
 *
 * ```tsx
 * <ProgressBar value={40}>téléchargement</ProgressBar>
 *
 * <ProgressBar value={40} accent="lime">
 *   <ProgressBar.Header>
 *     <ProgressBar.Label>téléchargement</ProgressBar.Label>
 *     <ProgressBar.Value />
 *   </ProgressBar.Header>
 *   <ProgressBar.Track>
 *     <ProgressBar.Fill />
 *   </ProgressBar.Track>
 * </ProgressBar>
 *
 * <ProgressBar isIndeterminate accessibilityLabel="connexion" />
 * ```
 *
 * `isIndeterminate` is the Metro bar's other face, which Native leaves to its `Spinner`:
 * the bar gives way to five bubbles of the accent that run from its start to its end.
 *
 * A text child becomes the label, and the bar comes with it. With no children at all it
 * is the bar alone.
 */
export const ProgressBarRoot = forwardRef<View, ProgressBarProps>(
  function ProgressBar(
    {
      children,
      size = DEFAULT_SIZE,
      radius,
      accent,
      color,
      value = 0,
      minValue = 0,
      maxValue = 100,
      formatOptions,
      isIndeterminate = false,
      isDisabled = false,
      asChild = false,
      accessibilityRole = 'progressbar',
      accessibilityValue,
      accessibilityState,
      style,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const [styleProps, rest] = useStyleProps(props)
    const isStill = useAnimationDisabled()
    const [trackWidth, setTrackWidth] = useState(0)

    const selection = { size, radius }
    const states = { disabled: isDisabled }

    const styles = progressBarRecipe.resolve({ theme, selection, states })
    // Flat fills, so a named accent is the true colour. Uncached: a raw tint must stay
    // out of the cache key.
    const paint = flatPaint({ accent, color })
    const tint = paint
      ? progressBarRecipe.tint({ theme, color: paint, selection, states })
      : undefined

    // Every argument is a caller's number: held and checked once here, read by the slots.
    const place = progressPlace(value, minValue, maxValue)
    const bubbleSize = PROGRESS_BAR_GEOMETRY[size].bubble

    const context = useMemo(
      () => ({
        headerStyle: styles.header,
        labelStyle: styles.label,
        valueStyle: styles.value,
        trackStyle: isIndeterminate ? [styles.track, styles.bare] : styles.track,
        fillStyle: [styles.fill, tint?.fill],
        bubbleStyle: [styles.bubble, tint?.bubble],
        place,
        value,
        formatOptions,
        isIndeterminate,
        isDisabled,
        isStill,
        trackWidth,
        setTrackWidth,
        bubbleSize,
      }),
      [
        styles,
        tint,
        place,
        value,
        formatOptions,
        isIndeterminate,
        isDisabled,
        isStill,
        trackWidth,
        bubbleSize,
      ]
    )

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

    // A screen reader reads the caller's own range, "40 sur 100", and nothing at all for
    // a bar that has no number: it is busy instead.
    const range = isIndeterminate
      ? undefined
      : { min: minValue, max: maxValue, now: value }

    const rootProps = {
      accessibilityRole,
      accessibilityValue: accessibilityValue ?? range,
      // Merged, not spread over: a caller naming another state must not drop these two.
      accessibilityState: {
        busy: isIndeterminate,
        disabled: isDisabled,
        ...accessibilityState,
      },
      // The web reads the ARIA attributes and not the objects above.
      'aria-valuemin': range?.min,
      'aria-valuemax': range?.max,
      'aria-valuenow': range?.now,
      'aria-busy': isIndeterminate || undefined,
      ...rest,
      // Most general to most specific: the cached recipe, the style props, `style`.
      style: [styles.root, styleProps, style],
    }

    return (
      <ProgressBarProvider value={context}>
        {/* Under `asChild` the caller's element is the root: one child, theirs. */}
        {asChild ? (
          <Slot ref={ref} {...rootProps}>
            {children}
          </Slot>
        ) : (
          <View ref={ref} {...rootProps}>
            {content}
          </View>
        )}
      </ProgressBarProvider>
    )
  }
)

ProgressBarRoot.displayName = 'XAUI.Tram.ProgressBar.Root'

/** The track and what is filled of it — the two slots a text child brings with it. */
function Bar() {
  return (
    <ProgressBarTrack>
      <ProgressBarFill />
    </ProgressBarTrack>
  )
}

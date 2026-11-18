import { forwardRef, useCallback, useId, useMemo, useRef } from 'react'
import { I18nManager, View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import { useControllableState } from '@xaui/native'
import { useAnimationDisabled, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { useTramHaptic } from '../../theme/tram-haptics'
import { partsOf } from './pivot.children'
import { PivotProvider } from './pivot.context'
import { usePivotLoop } from './pivot.hook'
import { PIVOT_GAP, PIVOT_MARGIN, pivotRecipe } from './pivot.recipe'
import type { PivotProps } from './pivot.type'

/**
 * The Metro pivot: giant titles in a row that loops, the current one on the margin in the
 * page's ink and the others grey after it, over the section they name. A Pivot filters one
 * set of things several ways; a Panorama shows several things. It is not `Tabs`: no
 * size, no rule, and the row goes round.
 *
 * ```tsx
 * <Pivot defaultValue="all">
 *   <Pivot.Title>MESSAGERIE</Pivot.Title>
 *   <Pivot.Header value="all">tout</Pivot.Header>
 *   <Pivot.Header value="unread">non lus</Pivot.Header>
 *   <Pivot.Section value="all">…</Pivot.Section>
 *   <Pivot.Section value="unread">…</Pivot.Section>
 * </Pivot>
 * ```
 *
 * The order of the sections is the loop's; each title takes its place in it by its
 * `value`. A swipe across the screen slides the sections and the titles together — a
 * whole screen for a section — and past the last one the first comes back. A title
 * pressed is reached going forward, the way the row slides.
 *
 * It fills what holds it and draws the theme's ground. A vertical drag inside a section is
 * the section's — a `ScrollView` there scrolls; only a drag that is mostly across moves the
 * loop. Every section stays mounted; a screen reader reads the titles as tabs and the
 * current section alone.
 */
export const PivotRoot = forwardRef<View, PivotProps>(function Pivot(
  { children, value, defaultValue, onValueChange, style, onLayout, ...props },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const isStill = useAnimationDisabled()
  const haptic = useTramHaptic()
  const id = useId()
  const styles = pivotRecipe.resolve({ theme })
  const { title, headers, sections, values } = partsOf(children)
  // A row laid right to left starts at the screen's right edge, and moves the other way.
  const way: 1 | -1 = I18nManager.isRTL ? -1 : 1

  const [current, setCurrent] = useControllableState({
    value,
    defaultValue: defaultValue ?? values[0],
    onChange: onValueChange,
  })
  const currentIndex = Math.max(0, values.indexOf(current ?? ''))

  const loop = usePivotLoop({
    values,
    currentIndex,
    choose: setCurrent,
    gap: theme.spacing(PIVOT_GAP),
    way,
    isStill,
  })

  // The title to focus once the loop is on it: the keyboard moved there.
  const focusNext = useRef<string | undefined>(undefined)

  const select = useCallback(
    (next: string) => {
      if (next === values[currentIndex]) return
      haptic('selection')
      setCurrent(next)
    },
    [values, currentIndex, haptic, setCurrent]
  )

  const { step } = loop
  const stepFromKey = useCallback(
    (by: 1 | -1) => {
      const next =
        values[
          (((currentIndex + by) % values.length) + values.length) % values.length
        ]
      focusNext.current = next
      step(by)
    },
    [values, currentIndex, step]
  )

  const handleLayout = (event: LayoutChangeEvent) => {
    loop.viewport.value = event.nativeEvent.layout.width
    onLayout?.(event)
  }

  const { position, advances, viewport, measureHeader } = loop
  const context = useMemo(
    () => ({
      titleStyle: styles.title,
      headerStyle: styles.header,
      sectionStyle: styles.section,
      tones: { rest: theme.colors.muted, current: theme.colors.foreground },
      values,
      current: values[currentIndex],
      position,
      advances,
      viewport,
      margin: theme.spacing(PIVOT_MARGIN),
      way,
      isStill,
      select,
      step: stepFromKey,
      focusNext,
      measureHeader,
      tabId: (tab: string) => `${id}-tab-${tab}`,
      panelId: (tab: string) => `${id}-panel-${tab}`,
    }),
    [
      styles,
      theme,
      values,
      currentIndex,
      position,
      advances,
      viewport,
      way,
      isStill,
      select,
      stepFromKey,
      measureHeader,
      id,
    ]
  )

  return (
    <PivotProvider value={context}>
      <GestureDetector gesture={loop.gesture} touchAction="pan-y">
        <View
          ref={ref}
          {...rest}
          style={[styles.root, styleProps, style]}
          onLayout={handleLayout}
        >
          {title}
          <View role="tablist" style={[styles.headers, { height: loop.rowHeight }]}>
            {headers}
          </View>
          <View style={styles.body}>{sections}</View>
        </View>
      </GestureDetector>
    </PivotProvider>
  )
})

PivotRoot.displayName = 'XAUI.Tram.Pivot.Root'

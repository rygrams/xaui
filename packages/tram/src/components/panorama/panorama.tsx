import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import type { AccessibilityActionEvent, LayoutChangeEvent } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { useControllableState } from '@xaui/native'
import { useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { partsOf } from './panorama.children'
import { PanoramaProvider } from './panorama.context'
import { usePanoramaTrack } from './panorama.hook'
import { panoramaRecipe } from './panorama.recipe'
import type { PanoramaProps } from './panorama.type'

/**
 * The Metro hub: one wide page that the finger slides across, section by section, under a
 * giant title. The title and the backdrop slide slower than the sections — the parallax —
 * so the page reads as one surface seen through the screen. A Pivot filters; a Panorama
 * shows.
 *
 * ```tsx
 * <Panorama>
 *   <Panorama.Background>
 *     <Image source={cover} style={{ flex: 1 }} />
 *   </Panorama.Background>
 *   <Panorama.Title>musique + vidéos</Panorama.Title>
 *   <Panorama.Section value="collection">
 *     <Panorama.Header>collection</Panorama.Header>
 *     …
 *   </Panorama.Section>
 *   <Panorama.Section value="nouveautés">…</Panorama.Section>
 * </Panorama>
 * ```
 *
 * A section is the screen's width less 48 points, so the start of the next one always
 * shows at the end: there is more to the side. The last one rests against the screen's
 * end. The track does not loop.
 *
 * It fills what holds it and draws the theme's ground. A vertical drag inside a section is
 * the section's — a `ScrollView` there scrolls; only a drag that is mostly across moves the
 * track. A screen reader reads the current section alone, and its adjust gestures move to
 * the next or the previous one.
 */
export const PanoramaRoot = forwardRef<View, PanoramaProps>(function Panorama(
  {
    children,
    value,
    defaultValue,
    onValueChange,
    style,
    onLayout,
    accessibilityActions,
    onAccessibilityAction,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const styles = panoramaRecipe.resolve({ theme })
  const { background, title, sections, values } = partsOf(children)

  const [current, setCurrent] = useControllableState({
    value,
    defaultValue: defaultValue ?? values[0],
    onChange: onValueChange,
  })
  const currentIndex = Math.max(0, values.indexOf(current ?? ''))

  const track = usePanoramaTrack({ values, currentIndex, select: setCurrent })

  const handleLayout = (event: LayoutChangeEvent) => {
    track.measureViewport(event.nativeEvent.layout.width)
    onLayout?.(event)
  }

  // A screen reader cannot swipe the track: its adjust gestures step through the sections.
  const handleAction = (event: AccessibilityActionEvent) => {
    const step = STEPS[event.nativeEvent.actionName]
    const next = step === undefined ? undefined : values[currentIndex + step]
    if (next !== undefined) setCurrent(next)
    onAccessibilityAction?.(event)
  }

  const { placeSection, measureTitle, sectionWidth } = track
  const context = useMemo(
    () => ({
      sectionStyle: styles.section,
      headerStyle: styles.header,
      titleStyle: styles.title,
      backdropStyle: styles.backdrop,
      sectionWidth,
      current: values[currentIndex],
      placeSection,
      measureTitle,
    }),
    [styles, sectionWidth, values, currentIndex, placeSection, measureTitle]
  )

  return (
    <PanoramaProvider value={context}>
      <GestureDetector gesture={track.gesture} touchAction="pan-y">
        <View
          ref={ref}
          accessibilityActions={[...ADJUST, ...(accessibilityActions ?? [])]}
          {...rest}
          style={[styles.root, styleProps, style]}
          onLayout={handleLayout}
          onAccessibilityAction={handleAction}
        >
          {background ? (
            <Animated.View
              style={[
                styles.backdrop,
                { width: track.backdropWidth || '100%' },
                track.backdropStyle,
              ]}
            >
              {background}
            </Animated.View>
          ) : null}
          {title ? (
            <Animated.View style={[styles.titleRow, track.titleStyle]}>
              {title}
            </Animated.View>
          ) : null}
          <Animated.View style={[styles.track, track.trackStyle]}>
            {sections}
          </Animated.View>
        </View>
      </GestureDetector>
    </PanoramaProvider>
  )
})

PanoramaRoot.displayName = 'XAUI.Tram.Panorama.Root'

const ADJUST = [{ name: 'increment' }, { name: 'decrement' }] as const

const STEPS: Record<string, number | undefined> = { increment: 1, decrement: -1 }

import { forwardRef, useRef } from 'react'
import { I18nManager } from 'react-native'
import type { LayoutChangeEvent, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { useMergedRef } from '@xaui/native'
import { useAnimationDisabled, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { turnstile } from '../../motion/motion-tokens'
import { hingeFor } from '../../system/turnstile'
import { useTramPages } from '../../theme/tram-pages'
import { usePageStage, usePageTurn } from './page.hook'
import { pagePose, recedePose } from './page.pose'
import { pageRecipe } from './page.recipe'
import type { PageProps } from './page.type'

/**
 * A screen that leaves and arrives the Metro way — the turnstile by default: the whole
 * page turns around the screen's start edge, out on the exit curve, in on the
 * `navigation` spring. Tram's own: Native has no component of this name.
 *
 * ```tsx
 * // app/_layout.tsx — the navigator's own animation is off, the pages have theirs
 * <TramProvider pages={{ useIsFocused }}>
 *   <Stack screenOptions={pageScreenOptions} />
 * </TramProvider>
 *
 * // app/mail.tsx
 * export default function Mail() {
 *   return <Page>…</Page>
 * }
 * ```
 *
 * Arriving needs nothing else. Leaving is `usePageLeave`, which turns the page away
 * before it navigates. With motion reduced a page fades; under an ancestor's
 * `disable-all` it is there or it is not.
 *
 * While it is focused it is also the page a context menu makes recede: it shrinks around
 * its centre as the `Menu` opens, and what the menu was opened from stays in place over it.
 */
export const PageRoot = forwardRef<View, PageProps>(function Page(
  { children, transition, style, onLayout, ...props },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const pages = useTramPages()
  const isReduced = useReducedMotion()
  const isStill = useAnimationDisabled()

  const chosen = isStill ? 'none' : (transition ?? pages.transition)
  const drawn = isReduced && chosen !== 'none' ? 'fade' : chosen
  const isRtl = I18nManager.isRTL
  const turn = usePageTurn(drawn === 'none')
  const node = useRef<View>(null)
  const refs = useMergedRef(node, ref)
  const width = useSharedValue(0)
  const depth = usePageStage(node)

  const handleLayout = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width
    onLayout?.(event)
  }

  const styles = pageRecipe.resolve({ theme })

  const posed = useAnimatedStyle(() => {
    'worklet'
    const pose = pagePose(turn.value, { transition: drawn, isRtl })
    const back = recedePose(depth.value, width.value, isRtl)

    return {
      opacity: pose.opacity,
      // The perspective first: a rotation applied before it is a flat squash. The recess
      // last, so it is the first applied: the page shrinks, then turns.
      transform: [
        { perspective: turnstile.perspective },
        { rotateY: `${pose.rotateY}deg` },
        { translateX: pose.translateX + back.translateX },
        { scale: back.scale },
      ],
    }
  }, [turn, depth, width, drawn, isRtl])

  return (
    <Animated.View
      ref={refs}
      {...rest}
      onLayout={handleLayout}
      // Most general to most specific: the recipe, the hinge, the pose, the style props,
      // `style`.
      style={[
        styles.root,
        { transformOrigin: hingeFor(isRtl) },
        posed,
        styleProps,
        style,
      ]}
    >
      {children}
    </Animated.View>
  )
})

PageRoot.displayName = 'XAUI.Tram.Page.Root'

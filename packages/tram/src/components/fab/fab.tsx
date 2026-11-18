import { forwardRef, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { View } from 'react-native'
import Animated, { useReducedMotion } from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
  warnDev,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { discPaint } from '../../system/disc-paint'
import { floatPlace } from '../../system/float-place'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import { partsOf } from './fab.children'
import { FabProvider } from './fab.context'
import { FabFace } from './fab-face'
import {
  useBusy,
  useFabShelf,
  useFabTravel,
  useFillFade,
  useInkSwap,
  useLevel,
} from './fab.hook'
import { FabLabel } from './fab-label'
import { DEFAULT_OFFSET, DEFAULT_SIZE, FAB_GEOMETRY, fabRecipe } from './fab.recipe'
import { fabSheet } from './fab.style'
import type { FabProps } from './fab.type'

/**
 * The one thing to do on a screen, floating over what it does it to — the round button of
 * the Metro App Bar, out of its bar: a flat circle of the accent, its glyph in the ink
 * that reads on it.
 *
 * ```tsx
 * <Fab accessibilityLabel="nouveau message" placement="bottom-end" onPress={compose}>
 *   <Fab.Icon as={PlusIcon} />
 * </Fab>
 *
 * <Fab isExtended placement="bottom-end" offset={16 + insets.bottom}>
 *   <Fab.Icon as={PlusIcon} />
 *   <Fab.Label>nouveau</Fab.Label>
 * </Fab>
 * ```
 *
 * **One drawing.** No `variant` and no `radius`: there is one `Fab`, filled and round, and
 * no shadow under it — it comes up from the bottom edge, and that is what says it floats.
 *
 * **Extended, it does not stretch.** The label is laid under the circle, as under an App
 * Bar button, and the circle moves up to make room for it.
 *
 * **It reads no safe area.** `offset` is the whole distance to the edges.
 *
 * A press leans the circle toward the finger and is felt through `TramProvider`'s
 * `onHaptic`. A round `Fab` has no text, and needs an `accessibilityLabel`.
 */
export const FabRoot = forwardRef<View, FabProps>(function Fab(
  {
    children,
    size = DEFAULT_SIZE,
    accent,
    color,
    isExtended = false,
    placement,
    offset = DEFAULT_OFFSET,
    isVisible = true,
    isDisabled = false,
    isLoading = false,
    asChild = false,
    animation,
    accessibilityRole = 'button',
    accessibilityState,
    style,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const haptic = useTramHaptic()
  const isReduced = useReducedMotion()
  const motion = resolveAnimation(animation, useAnimationDisabled())
  const isStill = motion.disableAll
  const [isPressed, press] = usePressState({
    // Felt as the finger lands, with the tilt — not on release, when it is already over.
    onPressIn: event => {
      haptic('press')
      onPressIn?.(event)
    },
    onPressOut,
  })

  const styles = fabRecipe.resolve({ theme, selection: { size } })
  const paint = discPaint({ accent, color, isDisabled }, theme.colors)
  const { diameter, glyph: glyphSize } = FAB_GEOMETRY[size]

  const { shown, isHere, travel, measure } = useFabTravel({
    isVisible,
    placement,
    offset,
    isStill,
  })
  const shelf = useFabShelf(isExtended, isStill)
  const fill = useFillFade(paint.fill, isStill)
  const busy = useBusy(isLoading, isStill)
  const ink = useInkSwap(paint.glyph, isStill)
  const dim = useLevel(isDisabled, isStill)

  const context = useMemo(
    () => ({
      labelStyle: styles.label,
      labelTone: { ink: theme.colors.foreground, grey: theme.colors.muted, dim },
      isDisabled,
      isLoading,
      isExtended,
      isStill,
    }),
    [styles, theme, dim, isDisabled, isLoading, isExtended, isStill]
  )
  // One face per ink: the glyph and the ring are drawn in it, by slots that read it here.
  const face = useMemo(
    () => (glyphInk: string) => ({
      ...context,
      // The ink first: the ring's open quarter is the recipe's, and is written after it.
      spinnerStyle: [{ borderColor: glyphInk }, styles.spinner],
      icon: { size: glyphSize, color: glyphInk },
    }),
    [context, styles, glyphSize]
  )
  const current = useMemo(() => face(paint.glyph), [face, paint.glyph])
  const previous = useMemo(
    () => (ink.leaving === null ? null : face(ink.leaving)),
    [face, ink.leaving]
  )

  const parts = partsOf(children)
  const name =
    rest.accessibilityLabel ??
    rest['aria-label'] ??
    (isExtended ? (parts.name ?? undefined) : undefined)

  if (name === undefined) {
    warnDev(
      'Tram Fab: a `Fab` with no visible label needs an `accessibilityLabel` — a glyph ' +
        'is not text, so a screen reader announces an unlabelled button.'
    )
  }

  // Most general to most specific: the cached geometry, the fill, the style props, `style`.
  const rootStyle = [
    styles.root,
    { backgroundColor: paint.fill },
    fabSheet.bare,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  const faces = { glyph: parts.glyph, spinner: parts.spinner, ...busy }
  // With motion reduced, or its animations off, the circle does not lean: Native's own
  // scale, highlight and ripple stay off either way.
  const Root = motion.scale && !isReduced ? PressTilt : PressableFeedback

  return (
    <FabProvider value={current}>
      <Animated.View
        // Gone, it is neither pressed nor read.
        aria-hidden={!isHere}
        accessibilityElementsHidden={!isHere}
        importantForAccessibility={isHere ? 'auto' : 'no-hide-descendants'}
        onLayout={measure}
        style={[isHere ? fabSheet.anchor : fabSheet.gone, floatPlace(shown, offset), travel]}
      >
        <Root
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled || isLoading}
          asChild={asChild}
          animation={isStill ? 'disable-all' : false}
          accessibilityRole={accessibilityRole}
          accessibilityLabel={name}
          // Merged, not spread over: a caller adding `selected` must not drop these two.
          accessibilityState={{
            disabled: isDisabled,
            busy: isLoading,
            ...accessibilityState,
          }}
          {...rest}
          style={rootStyle}
          // After `rest`, and composed: the caller's handlers run inside these.
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {/* Under `asChild` the caller's element is the circle: one child, theirs. */}
          {asChild ? (
            onlyChild(parts.glyph)
          ) : (
            <>
              <Animated.View style={[fabSheet.fill, fill]} />
              {previous ? (
                <Animated.View style={[fabSheet.layer, ink.outgoing]}>
                  <FabFace value={previous} {...faces} />
                </Animated.View>
              ) : null}
              <Animated.View style={[fabSheet.layer, ink.incoming]}>
                <FabFace value={current} {...faces} />
              </Animated.View>
            </>
          )}
        </Root>

        <Animated.View style={[fabSheet.shelf, { width: diameter }, shelf.shelf]}>
          {shelf.hasLabel ? (
            <Animated.View
              onLayout={shelf.measure}
              // As wide as the circle and `offset` more on each side: never past the edge.
              style={[
                fabSheet.label,
                { width: diameter + 2 * Math.max(0, offset) },
                shelf.arriving,
              ]}
            >
              {typeof parts.label === 'string' ? (
                <FabLabel>{parts.label}</FabLabel>
              ) : (
                parts.label
              )}
            </Animated.View>
          ) : null}
        </Animated.View>
      </Animated.View>
    </FabProvider>
  )
})

FabRoot.displayName = 'XAUI.Tram.Fab.Root'

/** `Slot` merges into one element: a lone child is handed over as itself, not as a list. */
function onlyChild(children: ReactNode[]): ReactNode {
  return children.length === 1 ? children[0] : children
}

import { forwardRef, useMemo } from 'react'
import type { ReactNode } from 'react'
import { View } from 'react-native'
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
import { dockAlign } from '../../system/float-place'
import { touchReach } from '../../system/touch-reach'
import { useTramSafeArea } from '../../theme/tram-safe-area'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import { partsOf } from './fab.children'
import { FabProvider } from './fab.context'
import { FabFace } from './fab-face'
import {
  useBusy,
  useFabShelf,
  useFabTravel,
  useInkSwap,
  useLevel,
  usePaintFade,
} from './fab.hook'
import { FabLabel } from './fab-label'
import {
  DEFAULT_OFFSET,
  DEFAULT_PLACEMENT,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  BAR_SIDE,
  BAR_TOP,
  FAB_GEOMETRY,
  LINE_WIDTH,
  fabRecipe,
} from './fab.recipe'
import { fabSheet } from './fab.style'
import type { FabProps } from './fab.type'

/**
 * The one thing to do on a screen, in the bar docked at its bottom — the round button of
 * the Metro App Bar, in its band: a flat circle of the accent, its glyph in the ink that
 * reads on it, or the App Bar's own thin circle, a line and a glyph on the band.
 *
 * ```tsx
 * <Fab accessibilityLabel="nouveau message" onPress={compose}>
 *   <Fab.Icon as={PlusIcon} />
 * </Fab>
 *
 * <Fab variant="outline" placement="bottom-end" accessibilityLabel="modifier">
 *   <Fab.Icon as={PencilIcon} />
 * </Fab>
 *
 * <Fab isExtended placement="bottom-end">
 *   <Fab.Icon as={PlusIcon} />
 *   <Fab.Label>nouveau</Fab.Label>
 * </Fab>
 * ```
 *
 * **Two drawings, one shape.** `contained` or `outline`, and no `radius`: a `Fab` is round,
 * with no shadow under it.
 *
 * **Always in its bar, always at the bottom.** A band of the theme's discreet `surface`
 * across the bottom of the nearest positioned ancestor, edge to edge, the
 * circle in its middle unless `placement` says a side. It never sits in the flow. The bar
 * comes up from the bottom edge, and leaves the same way.
 *
 * **Extended, it does not stretch.** The label is laid under the circle, as under an App
 * Bar button, and the bar rises to make room for it.
 *
 * **It reaches under the home indicator.** The bottom safe area, from the hook the app
 * handed `TramProvider` (`safeArea={{ useSafeAreaInsets }}`), is added under the circle,
 * after `offset`; `hasSafeArea={false}` leaves it out, for a bar docked in a box that does
 * not reach the screen's bottom edge.
 *
 * **Small, pressed as 48.** The circle is 32, 40 or 48 across; `hitSlop` makes up the
 * touch target.
 *
 * A press leans the circle toward the finger and is felt through `TramProvider`'s
 * `onHaptic`. A round `Fab` has no text, and needs an `accessibilityLabel`.
 */
export const FabRoot = forwardRef<View, FabProps>(function Fab(
  {
    children,
    variant = DEFAULT_VARIANT,
    size = DEFAULT_SIZE,
    accent,
    color,
    isExtended = false,
    placement = DEFAULT_PLACEMENT,
    offset = DEFAULT_OFFSET,
    hasSafeArea = true,
    isVisible = true,
    isDisabled = false,
    isLoading = false,
    asChild = false,
    animation,
    accessibilityRole = 'button',
    accessibilityState,
    style,
    hitSlop,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const insets = useTramSafeArea()
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
  // The circle is drawn on the bar, not on the page: the discreet surface is its ground.
  const bar = theme.colors.surface
  const ground = {
    ...theme.colors,
    background: bar,
    foreground: theme.colors.surfaceForeground,
  }
  const paint = discPaint({ variant, accent, color, isDisabled }, ground)
  const { diameter, glyph: glyphSize } = FAB_GEOMETRY[size]

  const { shown, isHere, travel, measure } = useFabTravel({
    isVisible,
    placement,
    isStill,
  })
  const shelf = useFabShelf(isExtended, isStill)
  const fill = usePaintFade(paint, isStill)
  const busy = useBusy(isLoading, isStill)
  const ink = useInkSwap(paint.glyph, isStill)
  const dim = useLevel(isDisabled, isStill)

  const context = useMemo(
    () => ({
      labelStyle: styles.label,
      labelTone: { ink: ground.foreground, grey: theme.colors.muted, dim },
      isDisabled,
      isLoading,
      isExtended,
      isStill,
    }),
    [
      styles,
      ground.foreground,
      theme,
      dim,
      isDisabled,
      isLoading,
      isExtended,
      isStill,
    ]
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

  // Most general to most specific: the cached geometry, the paint, the style props, `style`.
  // The paint is the root's own only under `asChild`; otherwise a layer fades it in.
  const rootStyle = [
    styles.root,
    asChild
      ? {
          backgroundColor: paint.fill,
          borderColor: paint.line,
          borderWidth: LINE_WIDTH,
        }
      : null,
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
        style={[
          isHere ? fabSheet.bar : fabSheet.gone,
          {
            backgroundColor: bar,
            paddingTop: BAR_TOP,
            // The home indicator's room is the bar's: the grey runs down under it.
            paddingBottom: Math.max(0, offset) + (hasSafeArea ? insets.bottom : 0),
            paddingHorizontal: BAR_SIDE,
            alignItems: dockAlign(shown),
          },
          travel,
        ]}
      >
        <View style={fabSheet.column}>
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
            // The circle is smaller than a finger: the touch reaches past it to 48.
            hitSlop={hitSlop ?? touchReach(diameter)}
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
                <Animated.View
                  style={[
                    fabSheet.fill,
                    { borderRadius: diameter / 2, borderWidth: LINE_WIDTH },
                    fill,
                  ]}
                />
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
                // As wide as the circle and `offset` more on each side: never past the bar's edge.
                style={[
                  fabSheet.label,
                  { width: diameter + 2 * BAR_SIDE },
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
        </View>
      </Animated.View>
    </FabProvider>
  )
})

FabRoot.displayName = 'XAUI.Tram.Fab.Root'

/** `Slot` merges into one element: a lone child is handed over as itself, not as a list. */
function onlyChild(children: ReactNode[]): ReactNode {
  return children.length === 1 ? children[0] : children
}

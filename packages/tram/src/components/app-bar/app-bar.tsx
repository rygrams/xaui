import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
} from 'react-native-reanimated'
import { useControllableState } from '@xaui/native'
import {
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
  warnDev,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { createCascadeTurns } from '../../system/cascade-turns'
import { DISC_SIZE } from '../../system/disc-size'
import { useDockTravel } from '../../system/dock-travel'
import { useTramSafeArea } from '../../theme/tram-safe-area'
import { barPartsOf } from './app-bar.children'
import { AppBarProvider } from './app-bar.context'
import { useBackCloses, useFold, useOpening } from './app-bar.hook'
import { AppBarMore } from './app-bar-more'
import {
  DEFAULT_MODE,
  DEFAULT_PLACEMENT,
  DEFAULT_SIZE,
  MAX_BUTTONS,
  appBarRecipe,
  cellOf,
} from './app-bar.recipe'
import { appBarSheet } from './app-bar.style'
import type { AppBarContextValue, AppBarProps } from './app-bar.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * The Metro App Bar: a band of round buttons docked on an edge of the screen, and a "…"
 * that opens it to show their labels and a menu of words.
 *
 * ```tsx
 * <AppBar>
 *   <AppBar.Button onPress={compose}>
 *     <AppBar.Icon as={PlusIcon} />
 *     <AppBar.Label>nouveau</AppBar.Label>
 *   </AppBar.Button>
 *   <AppBar.Button onPress={search}>
 *     <AppBar.Icon as={SearchIcon} />
 *     <AppBar.Label>rechercher</AppBar.Label>
 *   </AppBar.Button>
 *   <AppBar.Menu>
 *     <AppBar.MenuItem onPress={openSettings}>paramètres</AppBar.MenuItem>
 *   </AppBar.Menu>
 * </AppBar>
 * ```
 *
 * **A band, docked.** The theme's discreet `surface`, edge to edge across the bottom of
 * the nearest positioned ancestor — or its top, with `placement="top"` — with no line and
 * no shadow. It never sits in the flow: write it last, over the page. It comes in from its
 * edge and leaves by it.
 *
 * **Thin circles, in the bar's ink.** Up to four, centred; `accent` draws them in the
 * accent read as ink instead.
 *
 * **The "…" opens it.** The labels come in under the circles, the menu under them, and
 * the page dims while there is a menu — a touch there, the system's back, or a press on a
 * button or an entry closes it. `hasLabels` keeps the labels shown when closed; `minimal`
 * folds the bar to the "…" alone.
 *
 * **It reaches under the edge.** The safe area of its edge — from the hook the app handed
 * `TramProvider` — is added inside the band, under the home indicator or the status bar.
 */
export const AppBarRoot = forwardRef<View, AppBarProps>(function AppBar(
  {
    children,
    placement = DEFAULT_PLACEMENT,
    mode = DEFAULT_MODE,
    size = DEFAULT_SIZE,
    accent,
    color,
    hasLabels = false,
    isOpen: isOpenProp,
    defaultOpen = false,
    onOpenChange,
    isVisible = true,
    hasSafeArea = true,
    moreLabel = 'more',
    animation,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const insets = useTramSafeArea()
  const [styleProps, rest] = useStyleProps(props)
  const isReduced = useReducedMotion()
  const motion = resolveAnimation(animation, useAnimationDisabled())
  const isStill = motion.disableAll
  const [isOpen, setOpen] = useControllableState({
    value: isOpenProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const [turns] = useState(createCascadeTurns)

  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => setOpen(open => !open), [setOpen])

  const { shown, isHere, travel, measure } = useDockTravel({
    isVisible,
    placement,
    isStill,
  })
  // Hidden, it is closed: a bar coming back does not come back open.
  useEffect(() => {
    if (!isVisible) close()
  }, [isVisible, close])
  useBackCloses(isOpen, close)

  const { open, arrival } = useOpening(isOpen, isStill)
  const isMinimal = mode === 'minimal'
  const row = useFold(open)
  const menuRoom = useFold(open)

  const styles = appBarRecipe.resolve({ theme, selection: { size } })
  const disc = DISC_SIZE[size]
  const parts = barPartsOf(children)
  const hasMenu = parts.menu !== null
  const hasButtons = parts.buttons.length > 0
  // The "…" is drawn only when there is something for it to uncover.
  const hasMore = hasMenu || isMinimal || (hasButtons && !hasLabels)

  if (parts.buttons.length > MAX_BUTTONS) {
    warnDev(
      `Tram AppBar: ${parts.buttons.length} buttons, where the bar holds ${MAX_BUTTONS} — ` +
        'past that they no longer fit a phone. Put the rest in an `AppBar.Menu`.'
    )
  }

  // The bar's colours: the circles and the menu are drawn on the discreet surface, and a
  // circle with no accent is in the bar's ink — the `link` a disc falls back to.
  const ground = useMemo(
    () => ({
      accent: theme.colors.accent,
      accentForeground: theme.colors.accentForeground,
      link: theme.colors.surfaceForeground,
      background: theme.colors.surface,
      foreground: theme.colors.surfaceForeground,
      muted: theme.colors.muted,
    }),
    [theme]
  )

  const context = useMemo<AppBarContextValue>(
    () => ({
      styles: {
        button: styles.button,
        label: styles.label,
        menu: styles.menu,
        menuItem: styles.menuItem,
        menuItemLabel: styles.menuItemLabel,
      },
      diameter: disc.diameter,
      glyph: disc.glyph,
      cell: cellOf(disc),
      ground,
      accent,
      color,
      isOpen,
      hasLabels,
      open,
      arrival,
      turns,
      isTilting: motion.scale && !isReduced,
      isStill,
      close,
    }),
    [
      styles,
      disc,
      ground,
      accent,
      color,
      isOpen,
      hasLabels,
      open,
      arrival,
      turns,
      motion.scale,
      isReduced,
      isStill,
      close,
    ]
  )

  const dimmed = useAnimatedStyle(() => {
    'worklet'
    return { opacity: arrival.value }
  }, [arrival])

  const isTop = shown === 'top'
  const inset = hasSafeArea ? (isTop ? insets.top : insets.bottom) : 0
  const circles = (
    <View style={styles.row} onLayout={isMinimal ? row.measure : undefined}>
      {parts.buttons}
    </View>
  )

  return (
    <AppBarProvider value={context}>
      {hasMenu ? (
        <AnimatedPressable
          // Not a button: it is the absence of the bar, and a screen reader announcing
          // "button" over the whole page is worse than announcing nothing.
          accessibilityRole="none"
          importantForAccessibility="no"
          tabIndex={-1}
          onPress={close}
          style={[appBarSheet.scrim, styles.scrim, reach(isOpen && isHere), dimmed]}
        />
      ) : null}

      <Animated.View
        ref={ref}
        accessibilityRole="toolbar"
        // Gone, it is neither pressed nor read.
        aria-hidden={!isHere}
        accessibilityElementsHidden={!isHere}
        importantForAccessibility={isHere ? 'auto' : 'no-hide-descendants'}
        onAccessibilityEscape={isOpen ? close : undefined}
        onLayout={measure}
        {...rest}
        style={[
          isHere ? appBarSheet.band : appBarSheet.gone,
          isTop ? appBarSheet.top : appBarSheet.bottom,
          styles.root,
          // The safe area's room is the band's: the grey runs under the edge.
          isTop ? { paddingTop: inset } : { paddingBottom: inset },
          styleProps,
          style,
          travel,
        ]}
      >
        {/*
          A start the width of the "…", the circles in the middle, the "…" at the end: the
          circles stay centred, and the "…" follows the direction, as flex does. Never
          shorter than the "…" — a folded bar, or one with a menu and no circle.
        */}
        <View style={appBarSheet.strip}>
          <View style={appBarSheet.side} />
          {isMinimal ? (
            <Animated.View
              // Folded, the circles are neither pressed nor read.
              importantForAccessibility={isOpen ? 'auto' : 'no-hide-descendants'}
              accessibilityElementsHidden={!isOpen}
              style={[appBarSheet.middle, appBarSheet.fold, reach(isOpen), row.fold]}
            >
              {circles}
            </Animated.View>
          ) : (
            <View style={appBarSheet.middle}>{circles}</View>
          )}
          {hasMore ? (
            <AppBarMore
              label={moreLabel}
              isOpen={isOpen}
              isTilting={context.isTilting}
              isStill={isStill}
              boxStyle={styles.more}
              dotStyle={styles.dot}
              onPress={toggle}
            />
          ) : (
            <View style={appBarSheet.side} />
          )}
        </View>

        {hasMenu ? (
          <Animated.View
            importantForAccessibility={isOpen ? 'auto' : 'no-hide-descendants'}
            accessibilityElementsHidden={!isOpen}
            style={[appBarSheet.fold, reach(isOpen), menuRoom.fold]}
          >
            <View onLayout={menuRoom.measure}>{parts.menu}</View>
          </Animated.View>
        ) : null}
      </Animated.View>
    </AppBarProvider>
  )
})

AppBarRoot.displayName = 'XAUI.Tram.AppBar.Root'

/**
 * Whether what is uncovered takes a touch. `auto` is written out rather than left unset,
 * so that opening undoes `none` where styles are applied inline.
 */
function reach(isOpen: boolean) {
  return isOpen ? appBarSheet.reached : appBarSheet.unreached
}

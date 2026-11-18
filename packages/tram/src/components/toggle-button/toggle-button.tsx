import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import type {
  GestureResponderEvent,
  Insets,
  LayoutChangeEvent,
  TextStyle,
  ViewStyle,
} from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
} from 'react-native-reanimated'
import { useControllableState, usePressState } from '@xaui/native'
import {
  PressableFeedback,
  childrenToString,
  mergeRefs,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
  warnDev,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { PressTilt } from '../../system/press-tilt'
import { toggleTones } from '../../system/toggle-tones'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { LINE_WIDTH } from '../button/button.recipe'
import { useOptionalToggleButtonGroup } from './toggle-button-group.context'
import type { CellEntry } from './toggle-button-group.type'
import { ToggleButtonLabel } from './toggle-button-label'
import { ToggleButtonProvider } from './toggle-button.context'
import { useCellKeys, useFocusRing, useSelectionFade } from './toggle-button.hook'
import type { WebNode } from './toggle-button.hook'
import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  cellHeight,
  toggleButtonRecipe,
} from './toggle-button.recipe'
import type { ToggleButtonProps } from './toggle-button.type'

/** Native's pressable, able to take the animated colours. */
const AnimatedFeedback = Animated.createAnimatedComponent(PressableFeedback)

/**
 * A button that keeps whether it is chosen — the Native `ToggleButton`'s API, drawn in
 * Metro: a rectangle with sharp corners, the ground in a line of ink, filled with the
 * accent once chosen.
 *
 * ```tsx
 * <ToggleButton defaultSelected>favori</ToggleButton>
 *
 * <ToggleButton.Group defaultValue="list">
 *   <ToggleButton value="list">liste</ToggleButton>
 *   <ToggleButton value="grid">grille</ToggleButton>
 * </ToggleButton.Group>
 * ```
 *
 * Alone, a press leans the box toward the finger; inside a group, the whole group leans,
 * since a case stuck to its neighbours cannot come away from them. The choice is a fade
 * of the fill, the line and the text together. A press is felt as `press`, and a change
 * of state as `selection`, through `TramProvider`'s `onHaptic`.
 */
export const ToggleButtonRoot = forwardRef<View, ToggleButtonProps>(
  function ToggleButton(
    {
      children,
      variant: ownVariant,
      size: ownSize,
      radius,
      accent: ownAccent,
      color: ownColor,
      value,
      isSelected,
      defaultSelected = false,
      onSelectedChange,
      isDisabled: ownDisabled = false,
      isIconOnly = false,
      asChild = false,
      animation,
      accessibilityRole,
      accessibilityState,
      hitSlop,
      style,
      onPress,
      onPressIn,
      onPressOut,
      onLayout,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const [styleProps, rest] = useStyleProps(props)
    const haptic = useTramHaptic()
    const isReduced = useReducedMotion()
    const group = useOptionalToggleButtonGroup()
    // A button joins its group by naming the value it stands for, as in Native.
    const cell = group !== null && value !== undefined ? group : null

    const size = ownSize ?? group?.size ?? DEFAULT_SIZE
    // The button's own paint wins as a whole: a named accent on it is not overridden by
    // the group's raw colour.
    const isOwnPaint = ownAccent !== undefined || ownColor !== undefined
    const accent = isOwnPaint ? ownAccent : group?.accent
    const color = isOwnPaint ? ownColor : group?.color
    // A disabled group has no enabled button in it.
    const isDisabled = ownDisabled || (group?.isDisabled ?? false)
    // A case of a group is a box of the group's, whatever variant it was given.
    const variant = cell ? DEFAULT_VARIANT : (ownVariant ?? DEFAULT_VARIANT)
    const place = cell
      ? cell.orientation === 'vertical'
        ? 'column'
        : 'row'
      : 'alone'

    const [selected, setSelected] = useControllableState({
      value: isSelected ?? (cell ? cell.value === value : undefined),
      defaultValue: defaultSelected,
      onChange: onSelectedChange,
    })

    const node = useRef<View>(null)
    const entry = useRef<CellEntry>({
      isDisabled,
      focus: () => (node.current as WebNode | null)?.focus?.(),
    })
    entry.current.isDisabled = isDisabled

    const row = cell?.row
    useEffect(() => {
      if (row && value !== undefined) return row.register(value, entry.current)
    }, [row, value])

    const [isPressed, press] = usePressState({
      // Felt as the finger lands, with the tilt.
      onPressIn: (event: GestureResponderEvent) => {
        haptic('press')
        if (cell && value !== undefined) {
          const { locationX, locationY } = event.nativeEvent
          cell.lean(value, { x: locationX, y: locationY })
        }
        onPressIn?.(event)
      },
      onPressOut: (event: GestureResponderEvent) => {
        cell?.settle()
        onPressOut?.(event)
      },
    })

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        if (cell && value !== undefined) {
          // Touching the chosen case changes nothing, and is felt as a press only.
          if (cell.value !== value) haptic('selection')
          setSelected(true)
          cell.select(value)
        } else {
          haptic('selection')
          setSelected(current => !current)
        }
        onPress?.(event)
      },
      [cell, value, haptic, setSelected, onPress]
    )

    const measure = useCallback(
      (event: LayoutChangeEvent) => {
        entry.current.span = event.nativeEvent.layout
        onLayout?.(event)
      },
      [onLayout]
    )

    const handleKey = useCellKeys(cell, value)
    const focusRing = useFocusRing(onFocus, onBlur)

    const selection = {
      size,
      // Square unless asked; a case has no corner of its own.
      radius: cell ? undefined : radius,
      isIconOnly: isIconOnly ? ('true' as const) : undefined,
      place,
    } as const
    const styles = toggleButtonRecipe.resolve({ theme, selection })

    const { colors } = theme
    const tones = useMemo(
      () =>
        toggleTones(
          { accent, color },
          {
            ground: colors.background,
            ink: colors.foreground,
            muted: colors.muted,
            accent: colors.accent,
            onAccent: colors.accentForeground,
            link: colors.link,
          },
          { variant, isDisabled }
        ),
      [accent, color, colors, variant, isDisabled]
    )

    // Native's scale, highlight and ripple stay off. An ancestor's `disable-all` stops
    // the tilt and the fade both, and is handed down.
    const motion = resolveAnimation(animation, useAnimationDisabled())
    const chosen = useSelectionFade(selected, motion.disableAll)

    const { off, on } = tones
    const painted = useAnimatedStyle(() => {
      'worklet'
      return {
        backgroundColor: interpolateColor(chosen.value, [0, 1], [off.fill, on.fill]),
        borderColor: interpolateColor(chosen.value, [0, 1], [off.line, on.line]),
      }
    }, [chosen, off.fill, on.fill, off.line, on.line])

    const context = useMemo(() => {
      const icon = StyleSheet.flatten<TextStyle>(styles.icon)

      return {
        labelStyle: styles.label,
        iconSize: icon.fontSize,
        tones,
        chosen,
        isSelected: selected,
        isPressed,
        isDisabled,
      }
    }, [styles, tones, chosen, selected, isPressed, isDisabled])

    const renderState = useMemo(
      () => ({ isSelected: selected, isPressed, isDisabled }),
      [selected, isPressed, isDisabled]
    )
    const rendered =
      typeof children === 'function' ? children(renderState) : children
    const text = childrenToString(rendered)

    if (isIconOnly && !rest.accessibilityLabel && !rest['aria-label']) {
      warnDev(
        'Tram ToggleButton: an icon-only toggle needs an `accessibilityLabel` — there is ' +
          'no text for a screen reader to read.'
      )
    }

    // A case is as tall as the group's frame leaves it, and shares a stretched row.
    const fitted = cell
      ? {
          height: cellHeight(theme, size),
          ...(cell.isStretched && place === 'row' ? EQUAL_SHARE : undefined),
        }
      : undefined

    const rootStyle = [
      styles.root,
      fitted,
      Platform.OS === 'web' ? NO_RING : undefined,
      styleProps,
      typeof style === 'function' ? style({ pressed: isPressed }) : style,
      cell ? BOX_ONLY : undefined,
    ]

    // Alone, the box tilts; a case leans with its group, and with motion reduced nothing
    // tilts at all — the colours alone fade.
    const isTilting = !cell && motion.scale && !isReduced
    const Root = isTilting ? PressTilt : AnimatedFeedback
    // The tilt reads `style` for its transform, so the colours go beside it.
    const painting = isTilting
      ? { style: rootStyle, animatedStyle: painted }
      : { style: [rootStyle, painted] }

    // Only the web has keys and a tab order: one stop per group, on its chosen button —
    // and while none is chosen, every button is a stop, or the group could not be reached.
    const isStop = !cell || selected || cell.value === undefined
    const web =
      Platform.OS === 'web'
        ? {
            onFocus: focusRing.onFocus,
            onBlur: focusRing.onBlur,
            ...(cell
              ? {
                  onKeyDown: handleKey,
                  tabIndex: isStop ? (0 as const) : (-1 as const),
                }
              : undefined),
          }
        : { onFocus, onBlur }

    return (
      <ToggleButtonProvider value={context}>
        <Root
          // The animated wrapper types its ref as itself; at runtime it is the host view.
          ref={mergeRefs(node, ref) as never}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          animation={motion.disableAll ? 'disable-all' : false}
          accessibilityRole={accessibilityRole ?? (cell ? 'radio' : 'button')}
          // Merged, not spread over: a caller naming another state must not drop these.
          accessibilityState={{
            disabled: isDisabled,
            ...(cell ? { checked: selected } : { selected }),
            ...accessibilityState,
          }}
          aria-checked={cell ? selected : undefined}
          aria-pressed={cell ? undefined : selected}
          hitSlop={hitSlop ?? reachFor(theme.controlHeights[size], place)}
          {...web}
          {...rest}
          onLayout={measure}
          {...painting}
          // After `rest`, and composed: the caller's handlers run inside these.
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {/* Under `asChild` the caller's element is the button: one child, theirs. */}
          {asChild ? (
            rendered
          ) : (
            <>
              {text !== null ? (
                <ToggleButtonLabel>{text}</ToggleButtonLabel>
              ) : (
                rendered
              )}
              {focusRing.isVisible ? (
                <View
                  style={[FOCUS_RING, { borderColor: theme.colors.foreground }]}
                />
              ) : null}
            </>
          )}
        </Root>
      </ToggleButtonProvider>
    )
  }
)

ToggleButtonRoot.displayName = 'XAUI.Tram.ToggleButton.Root'

/**
 * How far a press reaches past the box. Alone, `sm` is drawn under the 48 touch target
 * and the slop makes it up on every side. A case reaches out above and below a row only:
 * to the sides it would land on the next case, and down a column it has no room at all.
 */
function reachFor(
  height: number,
  place: 'alone' | 'row' | 'column'
): Insets | number {
  if (place === 'alone') return touchReach(height)
  if (place === 'column') return 0

  const reach = touchReach(height - 2 * LINE_WIDTH)

  return { top: reach, bottom: reach }
}

const EQUAL_SHARE = { flexGrow: 1, flexBasis: 0 } as const

// `box-only`: a case's touch lands on the case, so its location is measured from the
// case's own corner — which is how the group knows where it was pressed.
const BOX_ONLY = { pointerEvents: 'box-only' } as const

// `none`, which React Native's types do not list: the web's `auto` ignores a width of 0.
const NO_RING = { outlineStyle: 'none' } as unknown as ViewStyle

const FOCUS_RING = {
  ...StyleSheet.absoluteFillObject,
  borderWidth: LINE_WIDTH,
  pointerEvents: 'none',
} as const

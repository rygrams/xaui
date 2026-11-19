import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle, ViewProps } from 'react-native'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  Slot,
  childrenToString,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
  warnDev,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { accentPaintFor } from '../../system/accent-paint'
import { PressTilt } from '../../system/press-tilt'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { tramAccents } from '../../theme/tram-tokens'
import { ChipLabel } from './chip-label'
import { ChipProvider } from './chip.context'
import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  SIZES,
  chipRecipe,
  crossSide,
} from './chip.recipe'
import type { ChipProps } from './chip.type'

/**
 * A tag, a status, a filter: the `Button`'s sharp rectangle made small — 24, 32, 40 tall
 * — drawn the `Button`'s four ways, in the accent or in the colour of what it reports.
 *
 * ```tsx
 * <Chip variant="flat" accent="green">
 *   <Chip.Dot />
 *   <Chip.Label>livré</Chip.Label>
 * </Chip>
 *
 * <Chip isPressable variant={isOn ? 'contained' : 'outline'} onPress={toggle}>
 *   non lus
 * </Chip>
 *
 * <Chip variant="outline">
 *   <Chip.Avatar source={{ uri: photo }} />
 *   <Chip.Label>inès</Chip.Label>
 *   <Chip.Close accessibilityLabel="retirer inès" onPress={remove} />
 * </Chip>
 * ```
 *
 * A static chip is a `View`; `isPressable` makes it a control that tilts toward the
 * finger, as the `Button` does, and changes no colour.
 */
export const ChipRoot = forwardRef<View, ChipProps>(function Chip(
  {
    children,
    variant = DEFAULT_VARIANT,
    size = DEFAULT_SIZE,
    radius,
    accent,
    color,
    isDisabled = false,
    isPressable = false,
    asChild = false,
    animation,
    accessibilityRole,
    accessibilityState,
    hitSlop,
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
  const [isPressed, press] = usePressState({
    // Felt as the finger lands, with the tilt.
    onPressIn: event => {
      haptic('press')
      onPressIn?.(event)
    },
    onPressOut,
  })

  const selection = { variant, size, radius }
  const states = { disabled: isDisabled }

  const styles = chipRecipe.resolve({ theme, selection, states })
  // A named accent is painted as the `Button` paints it: the true colour as a fill, the
  // mode's ink as a line or a label. A raw `color` is the caller's word, never corrected.
  const named =
    accent && !color
      ? accentPaintFor(tramAccents[accent], variant, theme.colors.background)
      : undefined
  const paint = color ?? named?.tint
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? chipRecipe.tint({ theme, color: paint, selection, states })
    : undefined

  const closeReach = touchReach(crossSide(theme, size))
  const ink = named?.label
  // On `flat` the dot is the true colour the soft fill stands for.
  const mark = variant === 'flat' ? (paint ?? theme.colors.accent) : undefined

  const context = useMemo(() => {
    const inked = ink ? { color: ink } : undefined
    const icon = StyleSheet.flatten<TextStyle>([styles.icon, tint?.icon, inked])

    return {
      labelStyle: [styles.label, tint?.label, inked],
      dotStyle: [
        styles.dot,
        tint?.dot,
        mark ? { backgroundColor: mark } : undefined,
      ],
      avatarStyle: styles.avatar,
      closeStyle: styles.close,
      closeGlyphStyle: [
        styles.closeGlyph,
        tint?.closeGlyph,
        ink ? { backgroundColor: ink } : undefined,
      ],
      closeReach,
      icon: {
        size: icon.fontSize,
        color: typeof icon.color === 'string' ? icon.color : undefined,
      },
      isDisabled,
    }
  }, [styles, tint, ink, mark, closeReach, isDisabled])

  // Most general to most specific: the cached recipe, the tint, the style props, `style`.
  const rootStyle = [
    styles.root,
    tint?.root,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  // A stringifiable tree is the label: `<Chip>livré</Chip>` is most chips.
  const text = childrenToString(children)
  const content = text !== null ? <ChipLabel>{text}</ChipLabel> : children

  // A handler on a chip that is not a control reaches a `View`, which never fires it.
  if (
    !isPressable &&
    !asChild &&
    (onPressIn || onPressOut || rest.onPress || rest.onLongPress)
  ) {
    warnDev(
      'Tram Chip: a press handler needs `isPressable`. Without it the chip renders a ' +
        'View, which never receives the touch. A `Chip.Close` is its own control.'
    )
  }

  const motion = resolveAnimation(animation, useAnimationDisabled())

  if (isPressable) {
    const pressable = {
      ref,
      isPressed,
      isDisabled,
      asChild,
      animation: motion.disableAll ? ('disable-all' as const) : false,
      accessibilityRole: accessibilityRole ?? ('button' as const),
      // Merged, not spread over: a caller adding `selected` must not drop this one.
      accessibilityState: { disabled: isDisabled, ...accessibilityState },
      ...rest,
      // Under 48 tall: the touch reaches past the drawn chip.
      hitSlop: hitSlop ?? touchReach(theme.spacing(SIZES[size].height)),
      style: rootStyle,
      onPressIn: press.onPressIn,
      onPressOut: press.onPressOut,
      // Under `asChild` the caller's element is the chip: one child, theirs.
      children: asChild ? children : content,
    }

    return (
      <ChipProvider value={context}>
        {motion.scale ? (
          // A chip can hold its own `Chip.Close`: the tilt leaves that touch to it.
          <PressTilt {...pressable} hasInteractiveContent />
        ) : (
          <PressableFeedback {...pressable} />
        )}
      </ChipProvider>
    )
  }

  const Root = asChild ? Slot : View

  return (
    <ChipProvider value={context}>
      <Root
        ref={ref}
        accessibilityRole={accessibilityRole}
        accessibilityState={accessibilityState}
        // The press props are on the type whatever `isPressable` says; a `View` ignores
        // them, and the warning above says so.
        {...(rest as ViewProps)}
        style={rootStyle}
      >
        {asChild ? children : content}
      </Root>
    </ChipProvider>
  )
})

ChipRoot.displayName = 'XAUI.Tram.Chip.Root'

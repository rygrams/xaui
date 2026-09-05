import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle, ViewProps } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { Slot, childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { warnDev } from '../../utils/warn-dev'
import { ChipLabel } from './chip-label'
import { ChipProvider } from './chip.context'
import { chipRecipe } from './chip.recipe'
import type { ChipProps } from './chip.type'

/**
 * A compact token — a status, a tag, a filter, a person.
 *
 * ```tsx
 * <Chip variant="success-soft">Payée</Chip>
 *
 * <Chip variant="tertiary">
 *   <Chip.Dot />
 *   <Chip.Label>En cours</Chip.Label>
 * </Chip>
 *
 * <Chip variant="default">
 *   <Chip.Avatar source={author.photo} />
 *   <Chip.Label>Amina</Chip.Label>
 *   <Chip.Close onPress={remove} accessibilityLabel="Retirer Amina" />
 * </Chip>
 *
 * <Chip isPressable onPress={toggle} variant={isOn ? 'primary' : 'tertiary'}>
 *   Design
 * </Chip>
 * ```
 *
 * The view depth is one plus the slots the caller writes. Nothing is spaced by hand: the
 * root's `gap` separates a dot from its label and a label from its cross, so JSX order is
 * screen order (R4).
 */
export const ChipRoot = forwardRef<View, ChipProps>(function Chip(
  {
    children,
    variant,
    size,
    radius,
    color,
    isDisabled = false,
    isPressable = false,
    asChild = false,
    accessibilityRole,
    accessibilityState,
    animation,
    style,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  // R14 — what is left is the press behaviour plus whatever style keys the caller wrote.
  // The chip's own vocabulary is already destructured above, which is what keeps `size`
  // the chip's scale and `color` R7's tint rather than style props of the same name.
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const selection = { variant, size, radius }
  const states = { pressed: isPressed, disabled: isDisabled }

  const styles = chipRecipe.resolve({ theme, selection, states })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  const tint = color
    ? chipRecipe.tint({ theme, color, selection, states })
    : undefined

  const context = useMemo(() => {
    const icon = StyleSheet.flatten<TextStyle>([styles.icon, tint?.icon])

    return {
      labelStyle: tint ? [styles.label, tint.label] : styles.label,
      dotStyle: tint ? [styles.dot, tint.dot] : styles.dot,
      avatarStyle: styles.avatar,
      closeStyle: styles.close,
      closeGlyphStyle: tint
        ? [styles.closeGlyph, tint.closeGlyph]
        : styles.closeGlyph,
      icon: {
        size: icon.fontSize,
        // `ColorValue` also covers the platform's opaque colours, which `Icon` cannot
        // hand to a third-party component expecting a string.
        color: typeof icon.color === 'string' ? icon.color : undefined,
      },
      isDisabled,
    }
  }, [styles, tint, isDisabled])

  // The resolution order of §2 ter, most general to most specific: the cached recipe, the
  // uncached tint, the style props, then `style` — the last word, and the escape hatch for
  // what has no readable prop.
  //
  // R9 — `style` may be `Pressable`'s function form. The root owns the press state, so it
  // resolves the function here instead of forwarding it and losing the styles inside.
  const rootStyle = [
    styles.root,
    tint?.root,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  // R3 — a stringifiable tree becomes the chip's label, which is the majority case:
  // `<Chip>Payée</Chip>` is the whole component most of the time.
  const text = childrenToString(children)
  const content = text !== null ? <ChipLabel>{text}</ChipLabel> : children

  // The one mistake this component makes easy: a handler on a chip that is not a control.
  // A `View` receives it and never fires it, which looks like a broken chip rather than
  // like a missing prop. Not under `asChild` — there the handler is merged into the
  // caller's element, which may well be a `Pressable` that does fire it.
  if (
    !isPressable &&
    !asChild &&
    (onPressIn || onPressOut || rest.onPress || rest.onLongPress)
  ) {
    warnDev(
      'Chip: a press handler needs `isPressable`. Without it the chip renders a View, ' +
        'which never receives the touch — add `isPressable` to make it a control. A ' +
        '`Chip.Close` is its own control and needs neither.'
    )
  }

  const surface = isPressable ? (
    <PressableFeedback
      ref={ref}
      isPressed={isPressed}
      isDisabled={isDisabled}
      asChild={asChild}
      animation={animation}
      accessibilityRole={accessibilityRole ?? 'button'}
      // Merged, not spread over: a caller adding `selected` — which is what a filter chip
      // announces — must not silently drop the disabled state a screen reader depends on.
      // Their keys still win, because they said them.
      accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
      {...rest}
      style={rootStyle}
      // After `rest`, and composed rather than replacing: a caller's `onPressIn` runs,
      // and the pressed state its own styles depend on still happens.
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {/* No `PressableFeedback.Highlight`: the recipe's `pressed` state already paints
          the variant's own pressed colour, and a wash on top would darken the chip twice.
          The scale is the root's own and needs nothing rendered.

          R12 — under `asChild` the caller's element *is* the chip, so the auto-wrap does
          not apply: there is one child, and it is theirs. */}
      {asChild ? children : content}
    </PressableFeedback>
  ) : asChild ? (
    // R12 — the caller's element is the chip, so it takes the children it was written
    // with and the auto-wrap does not apply.
    <Slot
      ref={ref}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      {...rest}
      style={rootStyle}
    >
      {children}
    </Slot>
  ) : (
    <View
      ref={ref}
      // No default role: a static chip is a label, and what a screen reader reads is the
      // text inside it. `accessibilityState` is only what the caller passed, for the same
      // reason — announcing "disabled" on something that was never interactive is noise.
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      // `rest` carries the press props unconditionally, because `isPressable` is read at
      // runtime and the type cannot know the answer. A `View` ignores them; the warning
      // above is what makes that visible rather than silent.
      {...(rest as ViewProps)}
      style={rootStyle}
    >
      {content}
    </View>
  )

  return <ChipProvider value={context}>{surface}</ChipProvider>
})

ChipRoot.displayName = 'XAUI.Chip.Root'

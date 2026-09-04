import { forwardRef, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { warnDev } from '../../utils/warn-dev'
import { ButtonLabel } from './button-label'
import { ButtonSpinner } from './button-spinner'
import { ButtonProvider } from './button.context'
import { buttonRecipe } from './button.recipe'
import type { ButtonProps } from './button.type'
import { containsElementOfType } from './button.utils'

/**
 * The reference component. Every other one in the library is this shape.
 *
 * ```tsx
 * <Button onPress={submit}>Envoyer</Button>
 *
 * <Button variant="danger" size="lg">
 *   <Button.Icon as={TrashIcon} />
 *   <Button.Label>Supprimer</Button.Label>
 * </Button>
 *
 * <Button asChild>
 *   <Link href="/projects">Voir les projets</Link>
 * </Button>
 * ```
 *
 * The view depth is one: `PressableFeedback > (Text | Icon)`. There is no wrapper view —
 * it existed only for `fullWidth` and `customAppearance`, and both are gone.
 */
export const ButtonRoot = forwardRef<View, ButtonProps>(function Button(
  {
    children,
    variant,
    size,
    radius,
    color,
    isDisabled = false,
    isLoading = false,
    isIconOnly = false,
    isRipple = false,
    asChild = false,
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
  // R14 — what is left is the press behaviour plus whatever style keys the caller wrote.
  // The button's own vocabulary is already destructured above, which is what keeps `size`
  // the control's scale and `color` R7's tint rather than style props of the same name.
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const selection = {
    variant,
    size,
    radius,
    isIconOnly: isIconOnly ? ('true' as const) : undefined,
  }
  const states = { pressed: isPressed, disabled: isDisabled || isLoading }

  const styles = buttonRecipe.resolve({ theme, selection, states })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  const tint = color
    ? buttonRecipe.tint({ theme, color, selection, states })
    : undefined

  const context = useMemo(() => {
    const icon = StyleSheet.flatten<TextStyle>([styles.icon, tint?.icon])

    return {
      labelStyle: tint ? [styles.label, tint.label] : styles.label,
      spinnerStyle: tint ? [styles.spinner, tint.spinner] : styles.spinner,
      icon: {
        size: icon.fontSize,
        // `ColorValue` also covers the platform's opaque colours, which `Icon` cannot
        // hand to a third-party component expecting a string.
        color: typeof icon.color === 'string' ? icon.color : undefined,
      },
      isDisabled,
      isLoading,
    }
  }, [styles, tint, isDisabled, isLoading])

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

  const text = childrenToString(children)
  const showSpinner = isLoading && !containsElementOfType(children, ButtonSpinner)
  // Same bargain as the spinner: the prop is the shorthand, composing one yourself is how
  // you give it its own `style` or `animation`, and doing both must not stack two waves.
  const showRipple =
    isRipple && !containsElementOfType(children, PressableFeedback.Ripple)

  // An icon-only button has no text for a screen reader to announce, and nothing about
  // the glyph tells it what the button does. It is the one accessibility mistake this
  // component makes easy, so it is the one it warns about.
  if (isIconOnly && !rest.accessibilityLabel && !rest['aria-label']) {
    warnDev(
      'Button: an icon-only button needs an `accessibilityLabel` — there is no text for ' +
        'a screen reader to read, so it announces as an unlabelled button.'
    )
  }

  // `asChild` hands the whole element to the caller, so there is no sibling to insert the
  // wave next to — it has to be composed inside that element. Silence would read as the
  // prop being ignored for no reason.
  if (isRipple && asChild) {
    warnDev(
      'Button: `isRipple` does nothing under `asChild` — the child element is the button, ' +
        'so there is no sibling to insert the wave into. Compose a ' +
        '`<PressableFeedback.Ripple />` inside that element instead.'
    )
  }

  return (
    <ButtonProvider value={context}>
      {/* No overlay unless one is asked for: the recipe's `pressed` state already paints
          the variant's own pressed colour, and a wash on top of it would darken the
          control twice. `isRipple` and a composed `.Ripple` are the two ways to opt in;
          the scale is the root's own either way. */}
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled || isLoading}
        asChild={asChild}
        accessibilityRole={accessibilityRole}
        // Merged, not spread over: a caller adding `expanded` or `selected` must not
        // silently drop the disabled and busy states a screen reader depends on. Their
        // keys still win, because they said them.
        accessibilityState={{
          disabled: isDisabled,
          busy: isLoading,
          ...accessibilityState,
        }}
        {...rest}
        style={rootStyle}
        // After `rest`, and composed rather than replacing: a caller's `onPressIn` runs,
        // and the pressed state its own styles depend on still happens.
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {/* R12 — under `asChild` the caller's element *is* the button, so none of the
            auto-wrap, the auto-spinner or the auto-ripple applies: there is one child,
            and it is theirs. */}
        {asChild ? (
          children
        ) : (
          <>
            {/* Written first, though the root paints its overlays under the content
                whatever the order — the order here is the reading order, not the paint. */}
            {showRipple ? <PressableFeedback.Ripple /> : null}
            {showSpinner ? <ButtonSpinner /> : null}
            {/* R3 — a stringifiable tree becomes a label; anything else is composed slots */}
            {text !== null ? <ButtonLabel>{text}</ButtonLabel> : children}
          </>
        )}
      </PressableFeedback>
    </ButtonProvider>
  )
})

ButtonRoot.displayName = 'XAUI.Button.Root'

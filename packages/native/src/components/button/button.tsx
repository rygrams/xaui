import { forwardRef, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
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
    asChild = false,
    // `scale` and not `scale-highlight`: the recipe's `pressed` state already paints the
    // variant's own pressed colour, and a neutral wash on top would darken it twice.
    feedbackVariant = 'scale',
    accessibilityRole = 'button',
    accessibilityState,
    style,
    onPressIn,
    onPressOut,
    ...rest
  },
  ref
) {
  const theme = useXAUITheme()
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

  // R9 — `style` may be `Pressable`'s function form. The root owns the press state, so it
  // resolves the function here instead of forwarding it and losing the styles inside.
  const rootStyle = [
    styles.root,
    tint?.root,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  const text = childrenToString(children)
  const showSpinner = isLoading && !containsElementOfType(children, ButtonSpinner)

  // An icon-only button has no text for a screen reader to announce, and nothing about
  // the glyph tells it what the button does. It is the one accessibility mistake this
  // component makes easy, so it is the one it warns about.
  if (isIconOnly && !rest.accessibilityLabel && !rest['aria-label']) {
    warnDev(
      'Button: an icon-only button needs an `accessibilityLabel` — there is no text for ' +
        'a screen reader to read, so it announces as an unlabelled button.'
    )
  }

  return (
    <ButtonProvider value={context}>
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled || isLoading}
        asChild={asChild}
        feedbackVariant={feedbackVariant}
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
        {/* R12 — under `asChild` the caller's element *is* the button, so neither the
            auto-wrap nor the auto-spinner applies: there is one child, and it is theirs. */}
        {asChild ? (
          children
        ) : (
          <>
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

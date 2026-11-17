import { forwardRef, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle, View } from 'react-native'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  childrenToString,
  containsElementOfType,
  resolveAnimation,
  useStyleProps,
  warnDev,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { useTramHaptic } from '../../theme/tram-haptics'
import { TRAM_TOUCH_TARGET, tramAccents } from '../../theme/tram-tokens'
import { ButtonLabel } from './button-label'
import { PressTilt } from './button-press-tilt'
import { ButtonSpinner } from './button-spinner'
import { ButtonProvider } from './button.context'
import { DEFAULT_SIZE, buttonRecipe } from './button.recipe'
import type { ButtonProps } from './button.type'

/**
 * The reference Tram component — the Native `Button`'s API, drawn in Metro: a flat
 * rectangle, a thin line, and a press that leans toward the finger.
 *
 * ```tsx
 * <Button onPress={send}>envoyer</Button>
 *
 * <Button variant="outline" size="lg">
 *   <Button.Icon as={TrashIcon} />
 *   <Button.Label>supprimer</Button.Label>
 * </Button>
 * ```
 *
 * A press is felt through `TramProvider`'s `onHaptic`, when the app gave it one.
 */
export const ButtonRoot = forwardRef<View, ButtonProps>(function Button(
  {
    children,
    variant,
    size = DEFAULT_SIZE,
    radius,
    accent,
    color,
    isDisabled = false,
    isLoading = false,
    isIconOnly = false,
    asChild = false,
    animation,
    accessibilityRole = 'button',
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
    // Felt as the finger lands, with the tilt — not on release, when it is already over.
    onPressIn: event => {
      haptic('press')
      onPressIn?.(event)
    },
    onPressOut,
  })

  const selection = {
    variant,
    size,
    radius,
    isIconOnly: isIconOnly ? ('true' as const) : undefined,
  }
  // A loading button keeps its colours: it is busy, not unavailable. Only `isDisabled`
  // draws the disabled state; both stop the press. `pressed` is not a recipe state here —
  // the colours do not move under the finger, so it would only multiply the cache keys.
  const states = { disabled: isDisabled }

  const styles = buttonRecipe.resolve({ theme, selection, states })
  // A named accent is a tint like any other: the palette is data, not theme tokens.
  const paint = color ?? (accent ? tramAccents[accent] : undefined)
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? buttonRecipe.tint({ theme, color: paint, selection, states })
    : undefined

  const context = useMemo(() => {
    const icon = StyleSheet.flatten<TextStyle>([styles.icon, tint?.icon])

    return {
      labelStyle: tint ? [styles.label, tint.label] : styles.label,
      spinnerStyle: tint ? [styles.spinner, tint.spinner] : styles.spinner,
      icon: {
        size: icon.fontSize,
        color: typeof icon.color === 'string' ? icon.color : undefined,
      },
      isDisabled,
      isLoading,
    }
  }, [styles, tint, isDisabled, isLoading])

  // Most general to most specific: the cached recipe, the tint, the style props, `style`.
  const rootStyle = [
    styles.root,
    tint?.root,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  const text = childrenToString(children)
  const showSpinner = isLoading && !containsElementOfType(children, ButtonSpinner)

  if (isIconOnly && !rest.accessibilityLabel && !rest['aria-label']) {
    warnDev(
      'Tram Button: an icon-only button needs an `accessibilityLabel` — there is no ' +
        'text for a screen reader to read, so it announces as an unlabelled button.'
    )
  }

  // Native's scale, highlight and ripple stay off: the press is the Tram tilt alone. `disable-all` is still handed down, so descendants hear it.
  const motion = resolveAnimation(animation)
  const Root = motion.scale ? PressTilt : PressableFeedback
  // `sm` is drawn under the 48 touch target; the slop makes it up.
  const reach = Math.max(0, (TRAM_TOUCH_TARGET - theme.controlHeights[size]) / 2)

  return (
    <ButtonProvider value={context}>
      <Root
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled || isLoading}
        asChild={asChild}
        animation={motion.disableAll ? 'disable-all' : false}
        accessibilityRole={accessibilityRole}
        // Merged, not spread over: a caller adding `selected` must not drop these two.
        accessibilityState={{
          disabled: isDisabled,
          busy: isLoading,
          ...accessibilityState,
        }}
        hitSlop={hitSlop ?? reach}
        {...rest}
        style={rootStyle}
        // After `rest`, and composed: the caller's handlers run inside these.
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {/* Under `asChild` the caller's element is the button: one child, theirs. */}
        {asChild ? (
          children
        ) : (
          <>
            {showSpinner ? <ButtonSpinner /> : null}
            {text !== null ? <ButtonLabel>{text}</ButtonLabel> : children}
          </>
        )}
      </Root>
    </ButtonProvider>
  )
})

ButtonRoot.displayName = 'XAUI.Tram.Button.Root'

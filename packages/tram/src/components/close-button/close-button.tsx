import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { useReducedMotion } from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  IconContext,
  PressableFeedback,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
  warnDev,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { discPaint } from '../../system/disc-paint'
import type { DiscGround } from '../../system/disc-paint'
import { DISC_SIZE } from '../../system/disc-size'
import { PressTilt } from '../../system/press-tilt'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  closeButtonRecipe,
} from './close-button.recipe'
import { closeButtonSheet } from './close-button.style'
import type { CloseButtonProps } from './close-button.type'

const CLEAR = 'transparent'

/**
 * The way out of a page or a panel of the app: the round button of the Metro App Bar,
 * with a cross in it.
 *
 * ```tsx
 * <CloseButton onPress={close} accessibilityLabel="fermer le brouillon" />
 *
 * <CloseButton variant="text" size="sm" onPress={hide} accessibilityLabel="masquer" />
 *
 * <CloseButton accessibilityLabel="retour" onPress={back}>
 *   <Icon as={BackIcon} />
 * </CloseButton>
 * ```
 *
 * **In the page's ink.** A thin circle and a cross in `foreground`, where the `Fab` takes
 * the accent: closing is not the action a screen puts forward. `accent` or `color` paints
 * it on demand; `contained` fills the circle, `text` leaves the cross alone.
 *
 * **Not the `Dialog`'s nor the `Toast`'s.** A `MessageBox` and a toast are closed by
 * their buttons, so their `Close` draws nothing; this one is for what the app owns.
 *
 * **Small, pressed as 48.** The circle is 32, 40 or 48 across, the `Fab`'s; `hitSlop`
 * makes up the touch target. A press leans it toward the finger and is felt through
 * `TramProvider`'s `onHaptic`. A cross is not text, so it needs an `accessibilityLabel`.
 */
export const CloseButton = forwardRef<View, CloseButtonProps>(function CloseButton(
  {
    children,
    variant = DEFAULT_VARIANT,
    size = DEFAULT_SIZE,
    accent,
    color,
    isDisabled = false,
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
  const [styleProps, rest] = useStyleProps(props)
  const haptic = useTramHaptic()
  const isReduced = useReducedMotion()
  const motion = resolveAnimation(animation, useAnimationDisabled())
  const [isPressed, press] = usePressState({
    // Felt as the finger lands, with the tilt — not on release, when it is already over.
    onPressIn: event => {
      haptic('press')
      onPressIn?.(event)
    },
    onPressOut,
  })

  const styles = closeButtonRecipe.resolve({ theme, selection: { size } })
  const { colors } = theme
  // The page's ink stands in for the accent: a filled disc is `foreground` with the cross
  // cut out in the ground, a line is `foreground`, unless `accent` or `color` says else.
  const ground: DiscGround = {
    accent: colors.foreground,
    accentForeground: colors.background,
    link: colors.foreground,
    background: colors.background,
    foreground: colors.foreground,
    muted: colors.muted,
  }
  const paint = discPaint(
    {
      variant: variant === 'contained' ? 'contained' : 'outline',
      accent,
      color,
      isDisabled,
    },
    ground
  )
  const { diameter, glyph } = DISC_SIZE[size]
  const icon = useMemo(
    () => ({ size: glyph, color: paint.glyph }),
    [glyph, paint.glyph]
  )

  const name = rest.accessibilityLabel ?? rest['aria-label']

  // Not under `asChild`: the caller's element is rendered, with its own label or text.
  if (!asChild && name === undefined) {
    warnDev(
      'Tram CloseButton: a close button needs an `accessibilityLabel` — the cross is ' +
        'not text, and the words beside it name what is closed, not the action.'
    )
  }

  // Most general to most specific: the cached geometry, the paint, the style props, `style`.
  const rootStyle = [
    styles.root,
    {
      backgroundColor: paint.fill,
      // `text` keeps the line, clear, so its cross sits where the others' do.
      borderColor: variant === 'text' ? CLEAR : paint.line,
    },
    closeButtonSheet.bare,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]
  const bar = [styles.glyph, { backgroundColor: paint.glyph }]

  // With motion reduced, or its animations off, the circle does not lean: Native's own
  // scale, highlight and ripple stay off either way.
  const Root = motion.scale && !isReduced ? PressTilt : PressableFeedback

  return (
    <Root
      ref={ref}
      isPressed={isPressed}
      isDisabled={isDisabled}
      asChild={asChild}
      animation={motion.disableAll ? 'disable-all' : false}
      accessibilityRole={accessibilityRole}
      // Merged, not spread over: a caller adding `selected` must not drop this one.
      accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
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
        children
      ) : children !== undefined && children !== null ? (
        <IconContext.Provider value={icon}>{children}</IconContext.Provider>
      ) : (
        <>
          <View style={[bar, closeButtonSheet.bar]} />
          <View style={[bar, closeButtonSheet.barMirrored]} />
        </>
      )}
    </Root>
  )
})

CloseButton.displayName = 'XAUI.Tram.CloseButton'

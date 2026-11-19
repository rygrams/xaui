import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import type { ViewProps } from 'react-native'
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
import { groundPaint } from '../../system/ground-paint'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import { CardDescription } from './card-sections'
import { CardProvider } from './card.context'
import { partitionBackground } from './card.layers'
import { DEFAULT_VARIANT, cardRecipe } from './card.recipe'
import type { CardProps } from './card.type'

/**
 * A surface that groups related content — the Native `Card`'s API, drawn as the Tram
 * design asks: the discreet surface, no line and no shadow, the content separated by
 * space and type. With `isPressable` it is the control that opens what it shows, and it
 * leans toward the finger as a Tram button does.
 *
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>marché de nuit</Card.Title>
 *     <Card.Description>ce soir, 21 h</Card.Description>
 *   </Card.Header>
 *   <Card.Footer>
 *     <Button variant="outline" size="sm">j'y vais</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
export const CardRoot = forwardRef<View, CardProps>(function Card(
  {
    children,
    variant = DEFAULT_VARIANT,
    size,
    radius,
    accent,
    color,
    isDisabled = false,
    isPressable = false,
    asChild = false,
    animation,
    accessibilityRole,
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
  const [isPressed, press] = usePressState({
    // Felt as the finger lands, with the tilt.
    onPressIn: event => {
      haptic('press')
      onPressIn?.(event)
    },
    onPressOut,
  })

  const selection = { variant, size, radius }
  // No `pressed` state: a Tram press moves the card and leaves its colours alone.
  const states = { disabled: isDisabled }

  const styles = cardRecipe.resolve({ theme, selection, states })
  const paint = groundPaint({
    accent,
    color,
    // Where nothing is filled, the colour is drawn on the page: the ink.
    isLine: variant === 'tertiary' || variant === 'ghost',
    page: theme.colors.background,
  })
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? cardRecipe.tint({ theme, color: paint, selection, states })
    : undefined

  const context = useMemo(
    () => ({
      backgroundStyle: styles.background,
      headerStyle: styles.header,
      bodyStyle: styles.body,
      footerStyle: styles.footer,
      titleStyle: tint ? [styles.title, tint.title] : styles.title,
      descriptionStyle: tint
        ? [styles.description, tint.description]
        : styles.description,
      isDisabled,
    }),
    [styles, tint, isDisabled]
  )

  // Most general to most specific: the cached recipe, the tint, the style props, `style`.
  const rootStyle = [
    styles.root,
    tint?.root,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  // A stringifiable tree is the card's prose: a description with no title is ordinary.
  const text = childrenToString(children)
  const content =
    text !== null ? <CardDescription>{text}</CardDescription> : children
  const { background, content: body } = partitionBackground(content)
  const layered =
    background === null ? (
      body
    ) : (
      <>
        {background}
        {body}
      </>
    )

  // A handler on a card that is not a control reaches a `View`, which never fires it.
  if (
    !isPressable &&
    !asChild &&
    (onPressIn || onPressOut || rest.onPress || rest.onLongPress)
  ) {
    warnDev(
      'Tram Card: a press handler needs `isPressable`. Without it the card renders a ' +
        'View, which never receives the touch.'
    )
  }

  const motion = resolveAnimation(animation, useAnimationDisabled())

  if (isPressable) {
    const Root = motion.scale ? PressTilt : PressableFeedback

    return (
      <CardProvider value={context}>
        <Root
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          animation={motion.disableAll ? 'disable-all' : false}
          accessibilityRole={accessibilityRole ?? 'button'}
          // Merged, not spread over: a caller adding `selected` must not drop this one.
          accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
          {...rest}
          style={rootStyle}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {/* Under `asChild` the caller's element is the card: one child, theirs. */}
          {asChild ? children : layered}
        </Root>
      </CardProvider>
    )
  }

  const Root = asChild ? Slot : View

  return (
    <CardProvider value={context}>
      <Root
        ref={ref}
        // No default role: a static card is a box, read by the text inside it.
        accessibilityRole={accessibilityRole}
        accessibilityState={accessibilityState}
        // The press props are on the type whatever `isPressable` says; a `View` ignores
        // them, and the warning above says so.
        {...(rest as ViewProps)}
        style={rootStyle}
      >
        {asChild ? children : layered}
      </Root>
    </CardProvider>
  )
})

CardRoot.displayName = 'XAUI.Tram.Card.Root'

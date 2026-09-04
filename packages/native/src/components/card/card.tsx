import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import type { ViewProps } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { Slot, childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { warnDev } from '../../utils/warn-dev'
import { CardDescription } from './card-description'
import { CardProvider } from './card.context'
import { cardRecipe } from './card.recipe'
import type { CardProps } from './card.type'

/**
 * A surface that groups related content — and, with `isPressable`, the control that opens
 * it.
 *
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Facture #1024</Card.Title>
 *     <Card.Description>Émise le 3 mars, échéance le 2 avril.</Card.Description>
 *   </Card.Header>
 *   <Card.Body>…</Card.Body>
 *   <Card.Footer>
 *     <Button size="sm">Payer</Button>
 *     <Button size="sm" variant="ghost">Plus tard</Button>
 *   </Card.Footer>
 * </Card>
 *
 * <Card isPressable onPress={open}>…</Card>
 * ```
 *
 * The view depth is one plus the sections the caller writes: there is no wrapper around
 * the root and no box around the content.
 */
export const CardRoot = forwardRef<View, CardProps>(function Card(
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
  // The card's own vocabulary is already destructured above, which is what keeps `size`
  // the card's scale and `color` R7's tint rather than style props of the same name.
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const selection = { variant, size, radius }
  // No `pressed` here: the press is a wash over the surface, not a change of fill — see
  // the overlay below. So a press resolves the same key and allocates nothing.
  const states = { disabled: isDisabled }

  const styles = cardRecipe.resolve({ theme, selection, states })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  const tint = color
    ? cardRecipe.tint({ theme, color, selection, states })
    : undefined

  const context = useMemo(
    () => ({
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

  // R3 — a stringifiable tree becomes the card's prose. `Description` and not `Title`:
  // a card with a description and no title is ordinary, and the reverse is not.
  const text = childrenToString(children)
  const content =
    text !== null ? <CardDescription>{text}</CardDescription> : children

  // The one mistake this component makes easy: a handler on a card that is not a control.
  // A `View` receives it and never fires it, which looks like a broken card rather than
  // like a missing prop. Not under `asChild` — there the handler is merged into the
  // caller's element, which may well be a `Pressable` that does fire it.
  if (
    !isPressable &&
    !asChild &&
    (onPressIn || onPressOut || rest.onPress || rest.onLongPress)
  ) {
    warnDev(
      'Card: a press handler needs `isPressable`. Without it the card renders a View, ' +
        'which never receives the touch — add `isPressable` to make it a control.'
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
      // Merged, not spread over: a caller adding `expanded` or `selected` must not
      // silently drop the disabled state a screen reader depends on. Their keys still
      // win, because they said them.
      accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
      {...rest}
      style={rootStyle}
      // After `rest`, and composed rather than replacing: a caller's `onPressIn` runs,
      // and the pressed state its own styles depend on still happens.
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {/* A wash, where the `Button` uses its variant's own pressed colour. The two
          treatments exclude each other, and a card has no pressed token per surface level
          to swap to — nor would one read on an area this large, where a flat overlay says
          "under the finger" better than a fill a shade darker.

          R12 — under `asChild` the caller's element *is* the card, so there is no sibling
          to paint under it: there is one child, and it is theirs. */}
      {asChild ? (
        children
      ) : (
        <>
          <PressableFeedback.Highlight />
          {content}
        </>
      )}
    </PressableFeedback>
  ) : asChild ? (
    // R12 — the caller's element is the card, so it takes the children it was written
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
      // No default role: a static card is a box, and what a screen reader reads is the
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

  return <CardProvider value={context}>{surface}</CardProvider>
})

CardRoot.displayName = 'XAUI.Card.Root'

import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle, ViewStyle } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { containsElementOfType } from '../../utils/children'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { FabProvider } from './fab.context'
import { fabGlyph, fabRecipe } from './fab.recipe'
import { FabLabel } from './fab-label'
import { FabSpinner } from './fab-spinner'
import { fabSheet } from './fab.style'
import type { FabProps } from './fab.type'

/** How far in from the edge it floats, in points. Material's, and HeroUI's. */
const DEFAULT_OFFSET = 16

/**
 * The one thing to do on a screen, floating over the thing it does it to.
 *
 * ```tsx
 * <Fab accessibilityLabel="Nouveau message" placement="bottom-end" onPress={compose}>
 *   <Fab.Icon as={PlusIcon} />
 * </Fab>
 *
 * <Fab isExtended>
 *   <Fab.Icon as={PlusIcon} />
 *   <Fab.Label>Nouveau</Fab.Label>
 * </Fab>
 * ```
 *
 * **It is not a `Button`, and it shares the `Button`'s table.** The seven intents are the
 * same seven — the FAB it floats over is as likely to be a delete as a compose — but the
 * boxes are not: a button is a row of text with padding, and this is a fixed square that
 * carries a shadow *at rest*, because floating over content is what it does. Sharing the
 * recipe would have meant a `size` axis meaning a height on one and a side on the other.
 *
 * **`isExtended` is a prop rather than "there is a label in here".** The root's recipe
 * resolves before its children do: the shape has to be known when the box is measured, and
 * the box is measured before the label inside it exists.
 *
 * **A round FAB needs an `accessibilityLabel`.** A mark is not text, and there is nothing
 * beside it to fall back on — the same rule the `CloseButton` states, enforced there by a
 * warning and here by the fact that an extended FAB has a label and a round one does not.
 */
export const FabRoot = forwardRef<View, FabProps>(function Fab(
  {
    children,
    variant,
    size = 'md',
    radius,
    color,
    isExtended = false,
    placement,
    offset = DEFAULT_OFFSET,
    isDisabled = false,
    isLoading = false,
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
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const selection = {
    variant,
    size,
    radius,
    extended: isExtended ? ('true' as const) : undefined,
  }
  const styles = fabRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled || isLoading },
  })
  const tint = color ? fabRecipe.tint({ theme, color, selection }) : undefined

  const context = useMemo(() => {
    const ink = StyleSheet.flatten<TextStyle>([styles.icon, tint?.icon])

    return {
      labelStyle: [styles.label, tint?.label],
      spinnerStyle: [styles.spinner, tint?.spinner],
      icon: {
        size: fabGlyph(size),
        color: typeof ink.color === 'string' ? ink.color : undefined,
      },
      isDisabled,
      isLoading,
    }
  }, [styles, tint, size, isDisabled, isLoading])

  // Where it floats. `start` and `end`, never left and right (R13), and `alignSelf` for the
  // centre — a `start: '50%'` would centre the box's *edge* rather than the box.
  const float: ViewStyle | undefined =
    placement === undefined
      ? undefined
      : placement === 'bottom-center'
        ? { position: 'absolute', bottom: offset, alignSelf: 'center' }
        : {
            position: 'absolute',
            bottom: offset,
            [placement === 'bottom-end' ? 'end' : 'start']: offset,
          }

  // R3, on a FAB: a bare string is a label, so `<Fab isExtended>Nouveau</Fab>` works.
  const text = childrenToString(children)
  const showSpinner = isLoading && !containsElementOfType(children, FabSpinner)

  const rootStyle = [
    styles.root,
    tint?.root,
    float,
    // A round FAB centres one mark in a fixed square, so its children must not spread.
    isExtended ? null : fabSheet.round,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  return (
    <FabProvider value={context}>
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        asChild={asChild}
        accessibilityRole={accessibilityRole}
        accessibilityState={{
          disabled: isDisabled,
          busy: isLoading,
          ...accessibilityState,
        }}
        isDisabled={isDisabled || isLoading}
        {...rest}
        style={rootStyle}
        // After `rest`, and composed rather than replacing: a caller's `onPressIn` runs and
        // the pressed state still happens.
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {showSpinner ? <FabSpinner /> : null}
        {text !== null ? <FabLabel>{text}</FabLabel> : children}
      </PressableFeedback>
    </FabProvider>
  )
})

FabRoot.displayName = 'XAUI.Fab.Root'

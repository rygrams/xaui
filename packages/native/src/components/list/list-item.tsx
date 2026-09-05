import { forwardRef } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { IconContext } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useList } from './list.context'
import type { ListItemProps } from './list.type'

/**
 * One row.
 *
 * It is a `PressableFeedback` whether or not you give it an `onPress` — a row with nothing
 * to do simply has nothing to do — but its **role is not**: without a handler it announces
 * itself as the text it contains rather than as a button, because a screen reader offering
 * to activate a line that does nothing is worse than saying nothing at all.
 *
 * The press wash is the row's and the fill is the root's. A row that painted its own fill
 * would stack two where the separator sits, and the hairline would vanish into the seam.
 */
export const ListItem = forwardRef<View, ListItemProps>(function ListItem(
  {
    children,
    isDisabled = false,
    asChild = false,
    accessibilityRole,
    accessibilityState,
    style,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const {
    itemStyle,
    itemPressedStyle,
    glyph,
    isDisabled: isListDisabled,
  } = useList()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const disabled = isListDisabled || isDisabled

  return (
    <IconContext.Provider value={glyph}>
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={disabled}
        asChild={asChild}
        accessibilityRole={accessibilityRole ?? (onPress ? 'button' : undefined)}
        // Merged rather than spread over, so a caller adding `selected` cannot drop the
        // disabled state a screen reader needs.
        accessibilityState={{ disabled, ...accessibilityState }}
        {...rest}
        style={[
          itemStyle,
          isPressed && itemPressedStyle,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {children}
      </PressableFeedback>
    </IconContext.Provider>
  )
})

ListItem.displayName = 'XAUI.List.Item'

import { forwardRef } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { IconContext } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useListBox } from './list-box.context'
import type { ListBoxItemButtonProps } from './list-box.type'

/**
 * A row you can press, used **in place of** `ListBox.Item` rather than inside it.
 *
 * It is the same row — same inset, same slots, same separators around it — and it adds the
 * two things a plain row must not have: a wash under the finger, and a `button` to
 * announce. Which of the two a row is, is a thing the JSX says rather than something the
 * component works out from whether a handler was passed.
 *
 * The wash is the row's and the fill is the root's. A row that painted its own fill would
 * stack two where the separator sits, and the hairline would vanish into the seam.
 */
export const ListBoxItemButton = forwardRef<View, ListBoxItemButtonProps>(
  function ListBoxItemButton(
    {
      children,
      isDisabled = false,
      asChild = false,
      accessibilityRole = 'button',
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
    } = useListBox()
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
          accessibilityRole={accessibilityRole}
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
  }
)

ListBoxItemButton.displayName = 'XAUI.ListBox.ItemButton'

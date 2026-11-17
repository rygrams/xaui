import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { SpringingMark } from '../../system/springing-mark'
import { useRadio } from './radio.context'
import type { RadioIndicatorProps } from './radio.type'

/**
 * The circle, and the dot inside it, in the accent.
 *
 * ```tsx
 * <Radio.Indicator />
 *
 * <Radio.Indicator>
 *   <Icon as={CheckIcon} size={14} />
 * </Radio.Indicator>
 * ```
 *
 * The dot grows from the centre on a spring and bounces once; when another option is
 * chosen it is gone in a few frames. With motion reduced it fades in and out at its full
 * size.
 *
 * Children replace the dot and keep its motion — and its place, so they are centred in
 * the same inset.
 */
export const RadioIndicator = forwardRef<View, RadioIndicatorProps>(
  function RadioIndicator({ children, animation = true, style, ...props }, ref) {
    const { indicatorStyle, markStyle, isSelected, isStill } = useRadio()
    const [styleProps, rest] = useStyleProps(props)

    // A custom mark is the caller's drawing: it takes the dot's place, not its colour.
    const drawn = children != null ? [markStyle, CLEAR] : markStyle

    return (
      <View ref={ref} {...rest} style={[indicatorStyle, styleProps, style]}>
        {/* Two components rather than a branch in one: "no animation" is only true if
            the Reanimated hooks are never reached. */}
        {animation && !isStill ? (
          <SpringingMark style={drawn} isShown={isSelected}>
            {children}
          </SpringingMark>
        ) : isSelected ? (
          <View style={drawn}>{children}</View>
        ) : null}
      </View>
    )
  }
)

RadioIndicator.displayName = 'XAUI.Tram.Radio.Indicator'

const CLEAR = { backgroundColor: 'transparent' } as const

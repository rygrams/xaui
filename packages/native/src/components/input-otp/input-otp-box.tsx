import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { InputOTPBoxProvider, useInputOTP } from './input-otp.context'
import { InputOTPCaret } from './input-otp-caret'
import { InputOTPPlaceholder } from './input-otp-placeholder'
import { InputOTPValue } from './input-otp-value'
import type { InputOTPBoxProps } from './input-otp.type'

/**
 * One character's box.
 *
 * With no children it draws the three things a box can show — the character, the
 * placeholder standing in for it, and the caret when this is the box the next character
 * lands in. Each returns `null` when it does not apply, so all three are always mounted
 * and the box never changes its tree as the code is typed.
 *
 * ```tsx
 * <InputOTP.Box index={slot.index} />
 *
 * <InputOTP.Box index={slot.index}>
 *   <InputOTP.Value />
 *   <MyOwnCaret />
 * </InputOTP.Box>
 * ```
 *
 * It resolves nothing (R5): the root resolved the box's styles **twice**, idle and
 * active, and this picks the reference that applies. That is what keeps a six-box code
 * from running the recipe six times on every keystroke.
 */
export const InputOTPBox = forwardRef<View, InputOTPBoxProps>(function InputOTPBox(
  { index, children, style, ...props },
  ref
) {
  const { boxStyle, boxActiveStyle, slots } = useInputOTP()
  const [styleProps, rest] = useStyleProps(props)

  const slot = slots[index]
  const context = useMemo(() => ({ slot }), [slot])

  return (
    <InputOTPBoxProvider value={context}>
      <View
        ref={ref}
        style={[slot?.isActive ? boxActiveStyle : boxStyle, styleProps, style]}
        {...rest}
      >
        {children ?? (
          <>
            <InputOTPPlaceholder />
            <InputOTPValue />
            <InputOTPCaret />
          </>
        )}
      </View>
    </InputOTPBoxProvider>
  )
})

InputOTPBox.displayName = 'XAUI.InputOTP.Box'

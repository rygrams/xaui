import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { InputOTPBoxProvider, useInputOTP } from './input-otp.context'
import { InputOTPCaret } from './input-otp-caret'
import { InputOTPPlaceholder } from './input-otp-placeholder'
import { InputOTPValue } from './input-otp-value'
import type { InputOTPBoxProps } from './input-otp.type'

/**
 * One character's box. Its line says where it stands: faint while empty, the ink once it
 * holds a character, the accent while it is the box the next character lands in.
 *
 * With no children it draws the character, the placeholder and the caret — each returns
 * `null` when it does not apply, so the box never changes its tree as the code is typed.
 * It resolves nothing: the root built the three box styles once, and this picks one.
 */
export const InputOTPBox = forwardRef<View, InputOTPBoxProps>(function InputOTPBox(
  { index, children, style, ...props },
  ref
) {
  const { boxStyle, boxFilledStyle, boxActiveStyle, slots } = useInputOTP()
  const [styleProps, rest] = useStyleProps(props)

  const slot = slots[index]
  const context = useMemo(() => ({ slot }), [slot])
  const own = slot?.isActive
    ? boxActiveStyle
    : slot?.char
      ? boxFilledStyle
      : boxStyle

  return (
    <InputOTPBoxProvider value={context}>
      <View ref={ref} style={[own, styleProps, style]} {...rest}>
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

InputOTPBox.displayName = 'XAUI.Tram.InputOTP.Box'

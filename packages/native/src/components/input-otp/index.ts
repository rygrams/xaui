import { InputOTPBox } from './input-otp-box'
import { InputOTPCaret } from './input-otp-caret'
import { InputOTPGroup } from './input-otp-group'
import { InputOTPPlaceholder } from './input-otp-placeholder'
import { InputOTPSeparator } from './input-otp-separator'
import { InputOTPValue } from './input-otp-value'
import { InputOTPRoot } from './input-otp'

export const InputOTP = Object.assign(InputOTPRoot, {
  Group: InputOTPGroup,
  Box: InputOTPBox,
  Value: InputOTPValue,
  Placeholder: InputOTPPlaceholder,
  Caret: InputOTPCaret,
  Separator: InputOTPSeparator,
})

export { useInputOTP, useInputOTPBox } from './input-otp.context'
export { inputOTPRecipe } from './input-otp.recipe'
export {
  OTP_ALPHANUMERIC,
  OTP_DIGITS,
  OTP_LETTERS,
  buildSlots,
  extractPastedCode,
} from './input-otp.utils'
export type { OTPSlotState } from './input-otp.utils'
export type {
  InputOTPBoxContextValue,
  InputOTPBoxProps,
  InputOTPCaretProps,
  InputOTPContextValue,
  InputOTPGroupProps,
  InputOTPHandle,
  InputOTPPattern,
  InputOTPPlaceholderProps,
  InputOTPProps,
  InputOTPRenderState,
  InputOTPSeparatorProps,
  InputOTPSize,
  InputOTPSlot,
  InputOTPValueProps,
  InputOTPVariant,
} from './input-otp.type'

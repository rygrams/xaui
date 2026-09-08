import { createSlotContext } from '../../system/slot'
import type { PhoneNumberFieldContextValue } from './phone-number-field.type'

export const [PhoneNumberFieldProvider, usePhoneNumberField] =
  createSlotContext<PhoneNumberFieldContextValue>('PhoneNumberField')

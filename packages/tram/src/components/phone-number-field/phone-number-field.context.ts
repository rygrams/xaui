import { createSlotContext } from '@xaui/native/system'
import type { PhoneNumberFieldContextValue } from './phone-number-field.type'

/**
 * `usePhoneNumberField` is exported, as on Native: `phoneNumber` is the E.164 read of the
 * number as it stands. Outside a `<PhoneNumberField>` it throws by name.
 */
export const [PhoneNumberFieldProvider, usePhoneNumberField] =
  createSlotContext<PhoneNumberFieldContextValue>('Tram.PhoneNumberField')

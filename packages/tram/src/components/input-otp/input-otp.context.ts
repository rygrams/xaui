import { createSlotContext } from '@xaui/native/system'
import type { InputOTPBoxContextValue, InputOTPContextValue } from './input-otp.type'

/**
 * `useInputOTP` is exported so a third party can draw its own boxes against the values
 * the built-in ones read. Outside an `<InputOTP>` it throws by name.
 */
export const [InputOTPProvider, useInputOTP] =
  createSlotContext<InputOTPContextValue>('Tram.InputOTP')

/**
 * One box's own state, for whatever it contains: the value, the placeholder and the caret
 * each need to know *which* box they are in.
 */
export const [InputOTPBoxProvider, useInputOTPBox] =
  createSlotContext<InputOTPBoxContextValue>('Tram.InputOTP.Box')

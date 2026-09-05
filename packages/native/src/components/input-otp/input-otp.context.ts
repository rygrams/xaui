import { createSlotContext } from '../../system/slot'
import type { InputOTPBoxContextValue, InputOTPContextValue } from './input-otp.type'

/**
 * R10 — `useInputOTP` is exported so a third party can write their own boxes against the
 * same resolved values the built-in ones read. Outside an `<InputOTP>` it throws by name
 * rather than failing three frames later on an undefined style.
 */
export const [InputOTPProvider, useInputOTP] =
  createSlotContext<InputOTPContextValue>('InputOTP')

/**
 * The second context: one box's own state, for whatever it contains. It exists because
 * the value, the placeholder and the caret each need to know *which* box they are in, and
 * threading an index through three components is how that stops being composable.
 */
export const [InputOTPBoxProvider, useInputOTPBox] =
  createSlotContext<InputOTPBoxContextValue>('InputOTP.Box')

import { createContext } from 'react'
import { createSlotContext } from '@xaui/native/system'
import type { ButtonContextValue, ButtonVariant } from './button.type'

/**
 * `useButton` is exported so a third party can write its own slot against the values the
 * built-in ones read. Outside a `<Button>` it throws by name.
 */
export const [ButtonProvider, useButton] =
  createSlotContext<ButtonContextValue>('Tram.Button')

/** How a surface asks the buttons laid on it to be drawn. */
export type ButtonSurface = {
  variant: ButtonVariant
  /** The raw tint a button takes when it names neither `accent` nor `color`. */
  color: string
}

/**
 * Set by a component whose own fill the buttons sit on — the `Toast`, an aplat of the
 * accent where a button in the accent would not be seen. It only moves the defaults: a
 * `variant`, an `accent` or a `color` written on the button still wins.
 *
 * Not exported from the package: it is how two Tram components agree, not a theming API.
 */
export const ButtonSurfaceContext = createContext<ButtonSurface | null>(null)

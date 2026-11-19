import type { ComponentType } from 'react'
import { makeContent, makeOverlay } from './wheel-field-page'
import { makeDescription, makeError, makeLabel } from './wheel-field-texts'
import {
  makeField,
  makeIndicator,
  makeTrigger,
  makeValue,
} from './wheel-field-trigger'

/**
 * The slots a picker shares with the other one, each named after it — the `DatePicker`'s
 * `Label` is `XAUI.Tram.DatePicker.Label`. `Wheel` is what its page holds when the caller
 * writes no children.
 */
export function createWheelFieldSlots(name: string, Wheel: ComponentType) {
  const Trigger = makeTrigger(name)
  const Value = makeValue(name)

  return {
    Label: makeLabel(name),
    Field: makeField(name, Trigger, Value),
    Trigger,
    Value,
    Indicator: makeIndicator(name),
    Overlay: makeOverlay(name),
    Content: makeContent(name, Wheel),
    Description: makeDescription(name),
    Error: makeError(name),
  }
}

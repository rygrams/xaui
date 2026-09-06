import type { StepStatus } from './stepper.type'

/**
 * Where one step stands, from its position and the step the stepper is on.
 *
 * `value` counts from one and `index` from zero, which is the whole of the arithmetic:
 * the caller writes "step 2 of 4" and the root numbers its children from the array it
 * already has. Keeping the two conventions apart in one place is what stops a fencepost
 * from being rediscovered in each slot.
 *
 * Out of range is not an error. A `value` of 0 leaves every step upcoming — the honest
 * reading of a wizard that has not started — and a value past the last one completes them
 * all, which is what a finished flow looks like.
 */
export function stepStatus(index: number, value: number): StepStatus {
  const step = index + 1

  if (step < value) return 'completed'
  if (step === value) return 'current'

  return 'upcoming'
}

/**
 * Whether the line **leaving** a step is drawn as travelled.
 *
 * The line between two steps belongs to the one above it, so it is done exactly when that
 * step is: the connector under the current step is still track, because the stepper has
 * not left it yet.
 */
export function isConnectorDone(status: StepStatus): boolean {
  return status === 'completed'
}

/**
 * Whether the line **arriving** at a step is drawn as travelled — the horizontal half a
 * step draws to its start, which belongs to the step before it.
 *
 * That line is done when the previous step is completed, and a step is preceded by a
 * completed one exactly when it is not upcoming. It has no vertical equivalent: a vertical
 * step draws only the line leaving it, so nothing is drawn twice.
 */
export function isLeadDone(status: StepStatus): boolean {
  return status !== 'upcoming'
}

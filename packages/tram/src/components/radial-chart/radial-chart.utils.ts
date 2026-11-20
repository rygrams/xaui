import { progressPlace } from '../../system/progress'

export type RadialTargetArgs = {
  /** Each row's reading. */
  values: ReadonlyArray<number>
  /** Each row's own target, where it has one (`maxKey`). */
  targets?: ReadonlyArray<number>
  /** One target for every ring (`maxValue`). */
  maxValue?: number
}

/**
 * How far round its ring each row has got, from 0 to 1.
 *
 * A row's own target wins; then the shared `maxValue`; with neither, the largest reading,
 * so the biggest ring closes and the rest are read against it. A negative or missing
 * reading has no arc, and a reading past its target closes its ring.
 */
export function radialFractions({
  values,
  targets,
  maxValue,
}: RadialTargetArgs): number[] {
  const readings = values.map(value =>
    Number.isFinite(value) && value > 0 ? value : 0
  )
  const ceiling = maxValue ?? Math.max(...readings, 0)

  return readings.map((value, index) =>
    progressPlace(value, 0, targets === undefined ? ceiling : targets[index])
  )
}

/**
 * The arithmetic of the Pivot's loop, apart from the views: which section a position
 * stands for, how far a section or a title lies from it, and where a release sends it.
 * The worklets run in the gesture and the animated styles.
 *
 * `position` counts sections and never wraps: 0 is the first, 1 the second, and past the
 * last it goes on — `count` is the first again. A drag is the fraction between two.
 */

/** The section a whole position stands for: the position, wrapped into `0…count - 1`. */
export function loopIndex(position: number, count: number): number {
  'worklet'
  if (count <= 0) return 0

  return ((Math.round(position) % count) + count) % count
}

/**
 * How far section `index` lies from `position`, the short way round: 0 on screen, 1 a
 * whole screen toward the end, -1 toward the start. Always within half the loop.
 */
export function loopDelta(index: number, position: number, count: number): number {
  'worklet'
  if (count <= 1) return 0

  const raw = index - position

  return raw - count * Math.round(raw / count)
}

/**
 * How far the start of title `index` lies from the margin, in points, at `position`. The
 * row is read from the section the position has passed: that title sits on the margin,
 * moved toward the start by the share of its own advance the finger has dragged, and every
 * other title follows it, in the loop's order. `advances` are each title's width plus the
 * gap after it.
 *
 * No title is laid twice. The one before the current one waits at the row's end and comes
 * in from the start only once a drag back has passed it.
 */
export function headerOffset(
  index: number,
  position: number,
  advances: readonly number[]
): number {
  'worklet'
  const count = advances.length
  if (count === 0 || index < 0 || index >= count) return 0

  const passed = Math.floor(position)
  const lead = ((passed % count) + count) % count
  let ahead = 0

  for (let at = lead; at !== index; at = (at + 1) % count) {
    ahead += advances[at] ?? 0
  }

  const dragged = position - passed

  return dragged === 0 ? ahead : ahead - dragged * (advances[lead] ?? 0)
}

/** A release, both counted toward the next section: negative is back. */
export type LoopRelease = {
  /** Points the finger moved toward the next section. */
  distance: number
  /** Points a second, the same way. */
  velocity: number
}

export type LoopThreshold = {
  /** Points: past this, a slow release still moves on. */
  distance: number
  /** Points a second: past this, a short fling still moves on. */
  velocity: number
}

/**
 * Where a release goes: the next section (1) or the previous one (-1) when it was flung
 * that way, or dragged far enough that way; the same one (0) otherwise. A fling is read
 * before the distance — a finger that dragged on and then flung back means back.
 */
export function releaseStep(
  release: LoopRelease,
  threshold: LoopThreshold
): -1 | 0 | 1 {
  'worklet'
  if (Math.abs(release.velocity) > threshold.velocity) {
    return release.velocity > 0 ? 1 : -1
  }
  if (Math.abs(release.distance) > threshold.distance) {
    return release.distance > 0 ? 1 : -1
  }

  return 0
}

/**
 * How many sections forward from `from` to `to`, going round: `0…count - 1`. A title is
 * always reached forward — it is at the row's end, and the row slides toward its start.
 */
export function forwardSteps(from: number, to: number, count: number): number {
  if (count <= 0) return 0

  return (((to - from) % count) + count) % count
}

/** How close a title is to being the current one: 1 on it, 0 a whole section away or more. */
export function closeness(delta: number): number {
  'worklet'
  return Math.max(0, 1 - Math.abs(delta))
}

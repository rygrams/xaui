/**
 * The arithmetic of the Panorama's track, apart from the views: where it rests for each
 * section, where a release sends it, how far it follows a finger past its ends, and how
 * far the slower layers — the title, the backdrop — have travelled with it. The worklets
 * run in the gesture and the animated styles.
 *
 * `offset` is how far the track has moved toward its end, in points: 0 shows the first
 * section, `travel` the end of the last one.
 */

/** How far the track can move: its width less the screen's. Nothing when it fits. */
export function trackTravel(trackWidth: number, viewport: number): number {
  'worklet'
  return Math.max(0, trackWidth - viewport)
}

/**
 * Where the track rests for each section: at its start — the last ones pulled back so the
 * track's end never leaves the screen's.
 */
export function sectionStops(starts: readonly number[], travel: number): number[] {
  return starts.map(start => Math.min(Math.max(start, 0), travel))
}

/** A release, both counted toward the next section: negative is back toward the first. */
export type TrackRelease = {
  /** Points the finger moved the track. */
  distance: number
  /** Points a second. */
  velocity: number
}

export type TrackThreshold = {
  /** Points: past this, a slow release still moves on. */
  distance: number
  /** Points a second: past this, a short fling still moves on. */
  velocity: number
}

/**
 * The section a release lands on: the next or the previous one when it was flung that
 * way, or dragged far enough that way; the same one otherwise. A fling is read before the
 * distance — a finger that dragged on and then flung back means back. Never past either
 * end.
 */
export function releaseTarget(
  current: number,
  count: number,
  release: TrackRelease,
  threshold: TrackThreshold
): number {
  'worklet'
  let step = 0

  if (Math.abs(release.velocity) > threshold.velocity) {
    step = Math.sign(release.velocity)
  } else if (Math.abs(release.distance) > threshold.distance) {
    step = Math.sign(release.distance)
  }

  return Math.min(Math.max(current + step, 0), Math.max(count - 1, 0))
}

/**
 * Where the track is under the finger: where it was asked to go, and past either end only
 * a `rubber`-th of the way further — it resists, and comes back once let go.
 */
export function dragOffset(wanted: number, travel: number, rubber: number): number {
  'worklet'
  if (wanted < 0) return wanted / rubber
  if (wanted > travel) return travel + (wanted - travel) / rubber

  return wanted
}

/**
 * How far a slower layer has moved when the track is at `offset`: the same share of its
 * own way. Held at its ends while the track is pulled past them — the title does not
 * rubber-band, only the sections do.
 */
export function layerShift(
  offset: number,
  travel: number,
  layerTravel: number
): number {
  'worklet'
  if (travel <= 0) return 0

  return (Math.min(Math.max(offset, 0), travel) / travel) * layerTravel
}

/**
 * How far the title travels: far enough for its end to come in by the last section, and
 * at least `least` of the track's way, so a short title still drifts behind the sections.
 */
export function titleTravel(
  titleWidth: number,
  viewport: number,
  travel: number,
  least: number
): number {
  return Math.max(titleWidth - viewport, travel * least, 0)
}

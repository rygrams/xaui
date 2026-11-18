import { wheel } from '../motion/motion-tokens'

/**
 * A column of squares, as its arithmetic sees it: how far apart two squares are — a side
 * and a gap — how many there are, and whether the last is followed by the first.
 *
 * A wheel's `offset` is how far it has turned, in points: 0 with the first square at the
 * middle, one `step` more for each square after it. A looping wheel's offset is not
 * bounded — it keeps counting turn after turn, so nothing ever jumps back.
 */
export type WheelShape = { step: number; count: number; isLooping: boolean }

const DEFAULT_VISIBLE = 5
const MIN_VISIBLE = 3

/**
 * How many squares a wheel shows, from the number a caller asked for: odd, so that one
 * of them is the middle one, and three at least. An even count is rounded up — whoever
 * asked for four wanted more than three.
 */
export function visibleSquares(requested: number = DEFAULT_VISIBLE): number {
  const whole = Number.isFinite(requested)
    ? Math.max(Math.round(requested), MIN_VISIBLE)
    : DEFAULT_VISIBLE

  return whole % 2 === 0 ? whole + 1 : whole
}

/** How tall `visible` squares stand, with a gap between two and none at the ends. */
export function wheelHeight(side: number, gap: number, visible: number): number {
  return visible * side + (visible - 1) * gap
}

/**
 * Whether a wheel of `count` squares can turn without end. It takes one square more than
 * are shown: with fewer, a square leaving at the top would have to be drawn entering at
 * the bottom at the same time.
 */
export function canLoop(count: number, visible: number): boolean {
  return count > visible
}

/** A square counted past either end of a looping wheel, as one of its `count` squares. */
export function loopIndex(index: number, count: number): number {
  'worklet'
  if (count <= 0) return 0

  return ((index % count) + count) % count
}

/** The last offset a wheel that does not loop can reach. */
function lastOffset({ step, count }: WheelShape): number {
  'worklet'
  return Math.max(count - 1, 0) * step
}

/** An offset a finger asked for, held between the two ends of a wheel that has ends. */
export function withinWheel(offset: number, shape: WheelShape): number {
  'worklet'
  if (shape.isLooping) return offset

  return Math.min(Math.max(offset, 0), lastOffset(shape))
}

/** The square nearest to the middle of a wheel turned by `offset` — the current one. */
export function squareAt(offset: number, shape: WheelShape): number {
  'worklet'
  const { step, count, isLooping } = shape
  if (count <= 0 || step <= 0) return 0

  const nearest = Math.round(offset / step)

  return isLooping
    ? loopIndex(nearest, count)
    : Math.min(Math.max(nearest, 0), count - 1)
}

/** The nearest offset at which a square sits exactly at the middle: never between two. */
export function restOffset(offset: number, shape: WheelShape): number {
  'worklet'
  if (shape.step <= 0) return 0

  return withinWheel(Math.round(offset / shape.step) * shape.step, shape)
}

/**
 * Where a wheel caught at `offset`, still moving at `velocity` points a second, is
 * stopped: on the whole square nearest to where it was about to be carried.
 */
export function landingOffset(
  offset: number,
  velocity: number,
  shape: WheelShape
): number {
  'worklet'
  return restOffset(offset + (velocity * wheel.carry) / 1000, shape)
}

/**
 * The offset that puts square `index` at the middle. On a looping wheel that is true
 * once per turn, and the one picked is the nearest to where the wheel already is — the
 * short way round.
 */
export function offsetOf(index: number, offset: number, shape: WheelShape): number {
  'worklet'
  const { step, count, isLooping } = shape
  if (!isLooping || count <= 0 || step <= 0) return index * step

  const turn = count * step

  return index * step + Math.round((offset - index * step) / turn) * turn
}

/**
 * How far square `index` is from the middle, in squares: 0 for the current one, negative
 * above, positive below. On a looping wheel it is the short way round, which is what lets
 * the last square stand right above the first.
 */
export function squareDistance(
  index: number,
  offset: number,
  shape: WheelShape
): number {
  'worklet'
  const { step, count, isLooping } = shape
  if (step <= 0) return 0

  const away = index - offset / step
  if (!isLooping || count <= 0) return away

  return away - Math.round(away / count) * count
}

/**
 * How much of a square is shown, `distance` squares from the middle of a wheel that is
 * `awake` (0 at rest, 1 once touched). The current square is always whole; one square
 * out and further they are the neighbours, there only as far as the wheel is awake.
 * Between the two a square gains what it lacks as it comes in.
 */
export function squareOpacity(distance: number, awake: number): number {
  'worklet'
  const out = Math.min(Math.abs(distance), 1)

  return 1 - out * (1 - awake)
}

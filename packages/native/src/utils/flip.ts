/** Which of the two faces. */
export type FlipFace = 'front' | 'back'

/** Which way round the card turns. */
export type FlipRotation = 'normal' | 'reverse'

/** A face is a half turn away from the other one. */
const HALF_TURN = 180

/**
 * How far a face is turned, in degrees, at that point in the flip.
 *
 * The two faces are **a half turn apart at every moment**, which is the whole trick: the
 * front starts flat and ends face-down, the back starts face-down and ends flat, and because
 * a hidden backface is not drawn, exactly one of them is on screen at any angle.
 *
 * Writing it as one function rather than two expressions in the component is what makes that
 * relationship testable — and it is the one thing a flip gets wrong: a back that is a
 * separate spring, or a back at `progress * 180` rather than `(progress − 1) * 180`, shows
 * two faces at once through the middle of the turn.
 *
 * `reverse` negates both, so the card comes round the other way. Negating one of them would
 * make the two faces meet rather than follow each other.
 */
export function faceAngle(
  progress: number,
  face: FlipFace,
  rotation: FlipRotation = 'normal'
): number {
  'worklet'

  const direction = rotation === 'reverse' ? -1 : 1
  const turns = face === 'front' ? progress : progress - 1

  return turns * HALF_TURN * direction
}

import { Easing, Keyframe } from 'react-native-reanimated'
import type { Placement } from '../../utils/placement'

const ENTER_MS = 200
const EXIT_MS = 150

/** How far the panel starts from where it lands, in points. */
const TRAVEL = 8

/**
 * A panel that grows out of the thing that opened it.
 *
 * It starts slightly small and offset **towards** the trigger, so the motion points back
 * at what opened it: a panel below enters upwards, one above enters downwards, one beside
 * enters sideways. That is the only reason placement reaches the animation at all.
 *
 * Shared by the `Select` and the `Popover`, which is the second use §2 bis waits for. It
 * lives in `system/` rather than in `utils/` because a `Keyframe` is Reanimated's, and
 * `utils/` has to stay importable by a test that never mounts anything.
 */
export function anchoredEntering(placement: Placement) {
  const [x, y] = travel(placement)

  return new Keyframe({
    0: {
      opacity: 0,
      transform: [{ translateX: x }, { translateY: y }, { scale: 0.95 }],
    },
    100: {
      opacity: 1,
      transform: [{ translateX: 0 }, { translateY: 0 }, { scale: 1 }],
      easing: Easing.out(Easing.cubic),
    },
  }).duration(ENTER_MS)
}

/**
 * The mirror, shorter. Closing is an acknowledgement rather than an arrival, and a
 * dismissal that takes as long as the opening feels like the control is arguing.
 */
export function anchoredExiting(placement: Placement) {
  const [x, y] = travel(placement)

  return new Keyframe({
    0: {
      opacity: 1,
      transform: [{ translateX: 0 }, { translateY: 0 }, { scale: 1 }],
    },
    100: {
      opacity: 0,
      transform: [{ translateX: x }, { translateY: y }, { scale: 0.95 }],
      easing: Easing.in(Easing.cubic),
    },
  }).duration(EXIT_MS)
}

/**
 * Towards the trigger, which is the opposite of the side the panel is on. `start` and
 * `end` resolve to a signed X here rather than to RTL-aware keys, because a transform has
 * no `start` — the sign is the one place in this component where the two are not the same.
 */
function travel(placement: Placement): [x: number, y: number] {
  switch (placement) {
    case 'bottom':
      return [0, -TRAVEL]
    case 'top':
      return [0, TRAVEL]
    case 'end':
      return [-TRAVEL, 0]
    case 'start':
      return [TRAVEL, 0]
  }
}

export const overlayEntering = new Keyframe({
  0: { opacity: 0 },
  100: { opacity: 1 },
}).duration(ENTER_MS)

export const overlayExiting = new Keyframe({
  0: { opacity: 1 },
  100: { opacity: 0 },
}).duration(EXIT_MS)

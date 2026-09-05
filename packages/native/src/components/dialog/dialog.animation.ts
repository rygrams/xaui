import { Easing, Keyframe } from 'react-native-reanimated'

const ENTER_MS = 200
const EXIT_MS = 150

/**
 * A dialog grows from its own centre rather than out of anything.
 *
 * That is the whole difference from the `Popover`'s entrance, which is offset towards the
 * trigger so the motion points back at what opened it. A dialog has no trigger to point
 * at — it belongs to the screen, not to a control — so it scales in place and the absence
 * of a direction is the message.
 */
export const contentEntering = new Keyframe({
  0: { opacity: 0, transform: [{ scale: 0.94 }] },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.out(Easing.cubic),
  },
}).duration(ENTER_MS)

/**
 * The mirror, shorter. Closing is an acknowledgement rather than an arrival, and a
 * dismissal that takes as long as the opening feels like the control is arguing.
 */
export const contentExiting = new Keyframe({
  0: { opacity: 1, transform: [{ scale: 1 }] },
  100: {
    opacity: 0,
    transform: [{ scale: 0.94 }],
    easing: Easing.in(Easing.cubic),
  },
}).duration(EXIT_MS)

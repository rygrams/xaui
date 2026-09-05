import {
  Easing,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
} from 'react-native-reanimated'
import type { ToastPlacement } from './toast.type'

const ENTER_MS = 260
const EXIT_MS = 180

/**
 * A toast comes from the edge it will sit against, and leaves the same way.
 *
 * It slides rather than scaling, which is what separates it from every other overlay in
 * this library: a dialog and a popover appear where they are, because they were asked for;
 * a toast arrives, because something happened. Motion across the screen's edge is the
 * difference between the two.
 */
export function toastEntering(placement: ToastPlacement) {
  const slide = placement === 'top' ? SlideInUp : SlideInDown
  return slide.duration(ENTER_MS).easing(Easing.out(Easing.cubic))
}

export function toastExiting(placement: ToastPlacement) {
  const slide = placement === 'top' ? SlideOutUp : SlideOutDown
  return slide.duration(EXIT_MS).easing(Easing.in(Easing.cubic))
}

/**
 * How a card moves when the pile shifts — a dismissal promoting everything forward by one.
 *
 * HeroUI's 300 ms, and a timing rather than a spring: the cards move together, and a
 * spring would have them arrive at slightly different moments and read as a shuffle.
 */
export const STACK_TIMING = { duration: 300 }

/**
 * The swipe that throws a card away, in HeroUI's numbers.
 *
 * `SWIPE_DISTANCE` **or** `SWIPE_VELOCITY` — either alone is enough. Distance without
 * velocity refuses a flick that clearly meant it; velocity without distance refuses a slow,
 * deliberate push. A toast is glanced at, so both readings have to count.
 *
 * `DRAG_RUBBER` is how far the card gives when pulled the wrong way — the whole screen's
 * travel maps onto 40 points, so it moves enough to feel alive and not enough to look
 * draggable in a direction that does nothing.
 *
 * `PRESS_SCALE` is the half-percent it sinks under a finger. It is not meant to be seen so
 * much as felt against the card not moving at all.
 */
export const SWIPE_DISTANCE = 50
export const SWIPE_VELOCITY = 500
export const DRAG_RUBBER = 40
export const PRESS_SCALE = 0.995

/**
 * The throw carries on at the velocity the finger left, rather than easing to a stop at a
 * distance the finger never chose. `1.5` is theirs, and it is what makes a hard flick leave
 * faster than a soft one.
 */
export const SWIPE_DECAY = 1.5

/** Long enough for the decay to read as motion, short enough not to feel like a wait. */
export const SWIPE_HIDE_MS = 200
